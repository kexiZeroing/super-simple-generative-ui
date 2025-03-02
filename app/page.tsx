"use client";

import { useUIState } from "ai/rsc";
import { SearchForm } from "./SearchForm";
import { useScrollToBottom } from "@/components/use-scroll-to-bottom";
import { useState, useEffect } from "react";

export default function Home() {
  const [messages] = useUIState<any>();
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();
    
  // Update thinking state when messages change
  useEffect(() => {
    if (messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];
      setIsAIThinking(lastMessage.role === "user");
    }
  }, [messages]);
    
  return (
    <main className="min-h-dvh bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-4 py-8 flex flex-col min-h-dvh">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
            NBA Player Search AI
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Search for NBA players to get their draft year, pick number, and team
          </p>
        </header>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto space-y-4 pb-20 scroll-smooth"
          >
            {messages.length > 0 && (
              <>
                {messages.map((message: { display?: React.ReactNode; content?: string; role?: string }, i: number) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 mx-auto max-w-2xl
                             border border-zinc-100 dark:border-zinc-700"
                  >
                    {message.display || message.content}
                  </div>
                ))}
                {isAIThinking && (
                  <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 mx-auto max-w-2xl
                               border border-zinc-100 dark:border-zinc-700 flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-.3s]" />
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-.5s]" />
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="fixed bottom-0 left-0 right-0 pt-4 pb-8 bg-gradient-to-t from-white dark:from-zinc-900">
            <SearchForm shouldShowSuggestions={!messages?.length} />
          </div>
        </div>
      </div>
    </main>
  );
}