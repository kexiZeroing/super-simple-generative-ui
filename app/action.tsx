"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { CoreMessage } from "ai";
import { deepseek } from '@ai-sdk/deepseek';
import Markdown from "react-markdown";
import { z } from "zod";
import { nanoid } from 'nanoid';

export const AI = createAI({
  actions: {
    continueConversation: async (input: CoreMessage) => {
      const history = getMutableAIState();

      const result = await streamUI({
        // https://sdk.vercel.ai/providers/ai-sdk-providers/deepseek
        model: deepseek('deepseek-chat'),
        messages: [
          { role: "system", content: "You speak extremely concisely and only respond with lists. Maximum 3 items." },
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
          getMovies: {
            description: "Use this tool only when a user asks for UI",
            parameters: z.object({
              listOfMovieNames: z.array(z.string()).length(3).describe("List of movie names"),
            }),
            generate: async function* ({ listOfMovieNames }) {
              yield "Searching...";
              
              return (
                <div>
                  <h2>Here are the movies you requested:</h2>
                  <ul>
                    {listOfMovieNames.map((movieName) => (
                      <li key={movieName} className="p-2 bg-gray-100 my-2">{movieName}</li>
                    ))}
                  </ul>
                </div>
              );
            },
          },
        },
      });

      return {
        id: nanoid(),
        role: "assistant",
        display: result.value,
      };
    },
  },
  initialAIState: [],
  initialUIState: [],
});
