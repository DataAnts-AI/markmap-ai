# Markmap AI

Markmap AI is a web application that transforms your ideas into beautiful, interactive mindmaps using artificial intelligence. Simply enter a prompt, and watch as your thoughts come to life in a structured, visual format.

<img width="920" alt="image" src="https://github.com/user-attachments/assets/ab161662-4ef7-4c4a-9f21-9d37b05189d5" />

## Features

- **AI-Powered Mindmap Generation**: Create complex mindmaps in seconds using natural language prompts
- **Interactive Visualization**: Explore your ideas with expandable, collapsible, and navigable mindmaps
- **Beautiful UI**: Clean, modern interface built with Next.js and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: Markmap library
- **Form Handling**: React Hook Form with Zod validation
- **AI Integration**: API endpoints for mindmap generation

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DataAnts-AI/markmap-ai.git
   cd markmap-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Enter a prompt in the text area (e.g., "Create a mindmap about artificial intelligence and its applications")
2. Click "Generate Mindmap"
3. Explore your interactive mindmap
4. You can also try the example prompts provided below the input field

## Project Structure

```
markmap-ai/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/             # API routes
│   │   ├── about/           # About page
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   │   ├── MindmapViewer.tsx # Mindmap visualization component
│   │   └── PromptForm.tsx   # Form for entering prompts
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Project dependencies and scripts
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Markmap](https://markmap.js.org/) for the mindmap visualization library
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
