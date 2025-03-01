"use client";

import { useUIState } from "ai/rsc";
import { SearchForm } from "./SearchForm";

export default function Home() {
  const [result] = useUIState();

  return (
    <main>
      <header
        className={`
        h-[155px] grid max-w-screen-lg mx-auto w-full items-center gap-4 p-4`}
      >
        Search Movies
        <SearchForm shouldShowSuggestions={!result.length} />
      </header>

      {result.length > 0 && (
        <div className="p-4 w-full flex flex-col text-left overflow-auto max-w-screen-lg mx-auto gap-4">
          {result.map((m: any) => m.display)}
        </div>
      )}
    </main>
  );
}