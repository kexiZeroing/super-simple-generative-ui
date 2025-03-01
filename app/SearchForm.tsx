"use client";

import { Suggestions } from "./Suggestions";
import { useRef, useState } from "react";
import { useMovieSearch } from "./useMovieSearch";

type Props = {
  shouldShowSuggestions: boolean;
};

export function SearchForm({ shouldShowSuggestions }: Props) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { search } = useMovieSearch();
  
  return (
    <form
      className="grid gap-4 w-full mt-6"
      action={() => search(input).then(() => inputRef.current?.focus())}
    >
      <input
        type="text"
        ref={inputRef}
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={"w-full p-4 rounded-lg border border-[#404040]"}
        placeholder="Type something to search for movies..."
      />
      {shouldShowSuggestions && <Suggestions />}
    </form>
  );
}