"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { CoreMessage } from "ai";
import { deepseek } from '@ai-sdk/deepseek';
import Markdown from "react-markdown";
import { z } from "zod";

export const AI = createAI({
  actions: {
    continueConversation: async (input: CoreMessage) => {
      const history = getMutableAIState();

      const result = await streamUI({
        // https://sdk.vercel.ai/providers/ai-sdk-providers/deepseek
        model: deepseek('deepseek-chat'),
        messages: [
          { 
            role: "system", 
            content: "You are an NBA expert. When users ask about players, provide only these 3 pieces of information in a concise list format:\n1. Draft year\n2. Draft pick number\n3. Team that drafted them\nKeep responses extremely brief and only include these 3 facts." 
          },
          ...history.get(),
          input,
        ],
        text: ({ done, content }) => {
          if (done) {
            history.done([...history.get(), { role: "assistant", content }]);
          }

          return (
            <Markdown
              components={{
                p: ({ children }) => <p className="py-2">{children}</p>,
              }}
            >
              {content}
            </Markdown>
          );
        },
        tools: {
          getNBAStats: {
            description: "Use this tool only when a user asks for UI",
            parameters: z.object({
              draftYear: z.string().describe("Draft year of the player"),
              draftPick: z.string().describe("Draft pick number"),
              draftTeam: z.string().describe("Team that drafted the player"),
            }),
            generate: async function* ({ draftYear, draftPick, draftTeam }) {
              yield "Generating draft information...";
              
              return (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Draft Information</h3>
                  <div className="text-sm text-gray-600">
                    <ul className="list-none space-y-1">
                      <li>Draft Year: {draftYear}</li>
                      <li>Draft Pick: {draftPick}</li>
                      <li>Team: {draftTeam}</li>
                    </ul>
                  </div>
                </div>
              );
            },
          },
        },
      });

      return {
        role: "assistant",
        display: result.value,
      };
    },
  },
  initialAIState: [],
  initialUIState: [],
});
