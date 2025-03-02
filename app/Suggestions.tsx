import { Suggestion } from "./Suggestion";

export function Suggestions() {
  const suggestions = [
    {
      id: "1",
      text: "LeBron James",
    },
    {
      id: "2",
      text: "Kobe Bryant",
    },
    {
      id: "3",
      text: "Michael Jordan",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {suggestions.map((suggestion) => (
        <Suggestion key={suggestion.id} {...suggestion} />
      ))}
    </div>
  );
}