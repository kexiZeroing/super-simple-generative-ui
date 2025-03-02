import { useActions, useUIState } from "ai/rsc";

export function usePlayerSearch() {
  const [, setConversation] = useUIState();
  const { continueConversation } = useActions();

  return {
    search: async (prompt: string) => {
      setConversation((oldState: any) => [
        ...oldState,
        { role: "user", content: prompt },
      ]);

      const response = await continueConversation({
        role: "user",
        content: prompt,
      });

      setConversation((oldState: any) => [...oldState, response]);
    },
  };
}