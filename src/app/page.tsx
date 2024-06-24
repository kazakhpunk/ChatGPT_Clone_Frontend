'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import Roadmap from '@/components/roadmap';
import useWebSocket from '@/lib/hooks/useWebsocket';
import ReactMarkdown from 'react-markdown';

interface Message {
  title: string;
  details: string;
  timestamp: number;
}

export default function Home() {
  const { messages, sendMessage } = useWebSocket('ws://chatgptclonebackend-production.up.railway.app');
  const [prompt, setPrompt] = useState('');
  const [combinedMessage, setCombinedMessage] = useState<string>('');
  const [lastPromptTime, setLastPromptTime] = useState<number>(0);

  useEffect(() => {
    const newMessages = messages.filter(
      (message: Message) => message.timestamp > lastPromptTime
    );
    // Filter AI messages and concatenate their details
    const concatenatedMessage = messages.map((message) => message.details).join(' ');
    setCombinedMessage(concatenatedMessage);
  }, [messages, lastPromptTime]);

  const handleSend = () => {
    if (prompt.trim() !== '') {
      sendMessage(prompt);
      setPrompt('');
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="bg-primary text-primary-foreground py-6 px-4 md:px-6 w-full">
        <h1 className="text-3xl font-bold">Roadmap Generator via WebSockets</h1>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6 w-full">
        <div className="mb-8 w-full">
          <h2 className="text-xl font-semibold mb-4">Enter Prompt</h2>
          <div className="flex space-x-2 w-full">
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt"
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <Button
              onClick={handleSend}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Send
            </Button>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          <div className="space-y-2 w-full">
            <div key="combined" className="text-lg">
              <ReactMarkdown>{combinedMessage}</ReactMarkdown>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
