'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

const promptSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters'),
});

type PromptFormValues = z.infer<typeof promptSchema>;

interface PromptFormProps {
  onSubmit: (markdown: string) => void;
}

export default function PromptForm({ onSubmit }: PromptFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<PromptFormValues>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: '',
    },
    mode: 'onChange',
  });
  
  // Watch the prompt field to update character count
  const promptValue = watch('prompt');
  React.useEffect(() => {
    setCharCount(promptValue?.length || 0);
  }, [promptValue]);
  
  const submitPrompt = async (data: PromptFormValues) => {
    try {
      setError(null);
      setShowUpgradePrompt(false);
      setIsLoading(true);
      
      const response = await fetch('/api/generate-mindmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: data.prompt }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        if (result.type === 'UPGRADE_REQUIRED') {
          setShowUpgradePrompt(true);
          setError(`You've reached the limit of ${result.limit} mindmaps on the free tier.`);
          return;
        }
        
        throw new Error(result.error || 'Failed to generate mindmap');
      }
      
      onSubmit(result.content);
    } catch (err) {
      console.error('Error generating mindmap:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'An error occurred while generating the mindmap. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(submitPrompt)} className="space-y-4">
        <div className="relative">
          <label htmlFor="prompt-textarea" className="block text-sm font-medium mb-1 text-gray-700">
            What would you like to create a mindmap about?
          </label>
          <textarea
            id="prompt-textarea"
            {...register('prompt')}
            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="E.g., Create a mindmap about the history of artificial intelligence, including major milestones and key figures..."
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-500">
            {charCount} characters {charCount < 10 ? `(minimum 10)` : ''}
          </div>
        </div>
        
        {errors.prompt && (
          <p className="mt-1 text-sm text-red-600">{errors.prompt.message}</p>
        )}
        
        {error && (
          <div className={`p-4 ${showUpgradePrompt ? 'bg-blue-50 border-blue-500' : 'bg-red-50 border-red-500'} border-l-4 rounded-md`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {showUpgradePrompt ? (
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm ${showUpgradePrompt ? 'text-blue-700' : 'text-red-700'}`}>{error}</p>
                {showUpgradePrompt && (
                  <div className="mt-2">
                    <Link
                      href="/pricing"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Upgrade to Premium
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading || !isValid}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Mindmap...
            </div>
          ) : (
            'Generate Mindmap'
          )}
        </button>
      </form>
    </div>
  );
} 