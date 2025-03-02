'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { Toolbar } from 'markmap-toolbar';

interface MindmapViewerProps {
  markdown: string;
}

export default function MindmapViewer({ markdown }: MindmapViewerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const markmapRef = useRef<Markmap | null>(null);
  const [toolbarInstance, setToolbarInstance] = useState<Toolbar | null>(null);
  
  useEffect(() => {
    if (!svgRef.current || !markdown) return;
    
    const transformer = new Transformer();
    const { root, features } = transformer.transform(markdown);
    
    if (!markmapRef.current) {
      markmapRef.current = Markmap.create(svgRef.current, {
        autoFit: true,
        zoom: true,
        pan: true,
      });
    }
    
    markmapRef.current.setData(root);
    markmapRef.current.fit();
    
    // Add toolbar
    if (!toolbarInstance) {
      const toolbar = new Toolbar();
      toolbar.attach(markmapRef.current);
      setToolbarInstance(toolbar);
    }
    
    // No cleanup needed for toolbar
    return () => {
      // Cleanup will happen automatically when component unmounts
    };
  }, [markdown, toolbarInstance]);
  
  const downloadSVG = () => {
    if (!svgRef.current) return;
    
    // Clone the SVG to avoid modifying the displayed one
    const svgClone = svgRef.current.cloneNode(true) as SVGSVGElement;
    
    // Set width and height attributes
    svgClone.setAttribute('width', '1200');
    svgClone.setAttribute('height', '800');
    
    // Convert to string
    const svgData = new XMLSerializer().serializeToString(svgClone);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'mindmap.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Clean up
    URL.revokeObjectURL(svgUrl);
  };
  
  const downloadMarkdown = () => {
    if (!markdown) return;
    
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'mindmap.md';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="markmap-wrapper flex-grow">
        <svg ref={svgRef} className="markmap" />
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={downloadSVG}
          className="btn-secondary flex items-center text-sm"
          title="Download as SVG"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          SVG
        </button>
        
        <button
          onClick={downloadMarkdown}
          className="btn-secondary flex items-center text-sm"
          title="Download as Markdown"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Markdown
        </button>
      </div>
    </div>
  );
} 