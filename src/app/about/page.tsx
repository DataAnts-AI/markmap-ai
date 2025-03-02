import React from 'react';

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Markmap AI</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg mb-4">
          Markmap AI is a powerful tool that helps you visualize your ideas and concepts as interactive mindmaps.
          Using advanced AI technology, we transform your text prompts into structured, hierarchical mindmaps that
          can be easily shared, exported, and modified.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter a prompt or topic you want to explore</li>
          <li>Our AI analyzes your input and generates a structured mindmap</li>
          <li>View, interact with, and customize your mindmap</li>
          <li>Export or share your creation</li>
        </ol>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Technology</h2>
        <p>
          Markmap AI is built using cutting-edge technologies:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Next.js for the frontend framework</li>
          <li>OpenAI's language models for content generation</li>
          <li>Markmap library for rendering interactive mindmaps</li>
          <li>Tailwind CSS for styling</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <p>Create study guides, organize course content, and visualize complex topics for better understanding and retention.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Business</h3>
            <p>Plan projects, brainstorm ideas, organize meetings, and create presentation outlines quickly and efficiently.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Personal Development</h3>
            <p>Map out goals, organize thoughts, plan life events, and visualize personal growth journeys.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Research</h3>
            <p>Organize research findings, explore connections between concepts, and structure literature reviews.</p>
          </div>
        </div>
      </div>
    </main>
  );
} 