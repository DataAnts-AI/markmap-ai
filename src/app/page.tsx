'use client';

import React, { useState } from 'react';
import PromptForm from '@/components/PromptForm';
import MindmapViewer from '@/components/MindmapViewer';

export default function Home() {
  const [markdown, setMarkdown] = useState<string>('');
  
  const handleSubmit = (generatedMarkdown: string) => {
    setMarkdown(generatedMarkdown);
  };

  const examplePrompts = [
    "Create a mindmap about artificial intelligence and its applications",
    "Generate a mindmap for project management best practices",
    "Make a mindmap explaining the solar system and planets"
  ];
  
  const handleExampleClick = (prompt: string) => {
    const promptFormElement = document.getElementById('prompt-textarea') as HTMLTextAreaElement;
    if (promptFormElement) {
      promptFormElement.value = prompt;
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Markmap AI</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Transform your ideas into beautiful, interactive mindmaps with the power of AI.
            Just enter a prompt and watch your thoughts come to life.
          </p>
        </div>
      </div>
      
      <div className="w-full max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Enter Your Prompt</h2>
            <PromptForm onSubmit={handleSubmit} />
            
            {/* Example Prompts */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Try these examples:</h3>
              <div className="space-y-2">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(prompt)}
                    className="block w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Mindmap</h2>
            <div className="h-[600px] rounded-lg overflow-hidden border border-gray-200">
              {markdown ? (
                <MindmapViewer markdown={markdown} />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-8 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 text-gray-300 mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>
                  <p className="text-gray-500 mb-2">
                    Your mindmap will appear here
                  </p>
                  <p className="text-sm text-gray-400">
                    Enter a prompt on the left and click "Generate Mindmap"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use Markmap AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Generation</h3>
              <p className="text-gray-600">Create complex mindmaps in seconds, not hours. Let AI do the heavy lifting.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Maps</h3>
              <p className="text-gray-600">Explore your ideas with interactive mindmaps that you can expand, collapse, and navigate.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Boost Productivity</h3>
              <p className="text-gray-600">Organize your thoughts, plan projects, and visualize complex topics with ease.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
