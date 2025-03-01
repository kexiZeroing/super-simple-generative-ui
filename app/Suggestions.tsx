import { Suggestion } from "./Suggestion";

export function Suggestions() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Suggestion>Scary movies set in the woods</Suggestion>
      <Suggestion>Movies that feature large monsters</Suggestion>
      <Suggestion>Movies with a strong female lead</Suggestion>
    </div>
  );
}