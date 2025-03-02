"use client";

import { usePlayerSearch } from "./usePlayerSearch";

type Props = {
  id: string;
  text: string;
};

export function Suggestion({ text }: Props) {
  const { search } = usePlayerSearch();

  return (
    <button
      onClick={() => search(text)}
      className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 
                dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-sm
                hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors
                shadow-sm"
    >
      {text}
    </button>
  );
}