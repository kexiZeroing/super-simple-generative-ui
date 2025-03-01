import { PropsWithChildren } from "react";
import { useMovieSearch } from "./useMovieSearch";

export function Suggestion({ children }: PropsWithChildren) {
  const { search } = useMovieSearch();

  return (
    <button
      className="bg-[#250e09] rounded-lg text-white p-4"
      onClick={() => search(children as string)}
      type="button"
    >
      {children}
    </button>
  );
}