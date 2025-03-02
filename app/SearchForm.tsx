"use client";

import { Suggestions } from "./Suggestions";
import { useRef, useState } from "react";
import { usePlayerSearch } from "./usePlayerSearch";

type Props = {
  shouldShowSuggestions: boolean;
};

export function SearchForm({ shouldShowSuggestions }: Props) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { search } = usePlayerSearch();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsLoading(true);
    try {
      await search(input);
      setInput("");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };
  
  return (
    <form
      className="flex flex-col gap-3 relative items-center w-full max-w-2xl mx-auto px-4"
      onSubmit={handleSubmit}
    >
      <div className="relative w-full">
        <input
          type="text"
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 
                   bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200
                   shadow-sm transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                   disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Search for NBA players..."
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-zinc-300 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}
      </div>
      
      {shouldShowSuggestions && !isLoading && input.length === 0 && (
        <div className="w-full">
          <Suggestions />
        </div>
      )}
    </form>
  );
}