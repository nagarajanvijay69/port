'use server';
/**
 * @fileOverview An AI agent that suggests contextually relevant replies for chat conversations.
 *
 * - aiReplySuggestions - A function that generates AI reply suggestions.
 * - AiReplySuggestionsInput - The input type for the aiReplySuggestions function.
 * - AiReplySuggestionsOutput - The return type for the aiReplySuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiReplySuggestionsInputSchema = z.object({
  chatHistory: z
    .array(
      z.object({
        sender: z.string().describe('The name or ID of the sender.'),
        message: z.string().describe('The content of the message.'),
      })
    )
    .describe('An array of previous messages in the chat, including sender and content.'),
  chatType: z
    .enum(['one-to-one', 'group'])
    .describe('The type of chat (e.g., one-to-one or group).'),
  lastMessage: z.string().describe('The content of the most recent message to which to reply.'),
});
export type AiReplySuggestionsInput = z.infer<typeof AiReplySuggestionsInputSchema>;

const AiReplySuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of suggested reply strings.'),
});
export type AiReplySuggestionsOutput = z.infer<typeof AiReplySuggestionsOutputSchema>;

export async function aiReplySuggestions(
  input: AiReplySuggestionsInput
): Promise<AiReplySuggestionsOutput> {
  return aiReplySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiReplySuggestionsPrompt',
  input: { schema: AiReplySuggestionsInputSchema },
  output: { schema: AiReplySuggestionsOutputSchema },
  prompt: `You are an AI assistant designed to suggest quick, concise, and contextually relevant replies for chat conversations.

Consider the following chat history and the last message. Provide 3-5 natural-sounding reply suggestions that fit the tone and context of the conversation.

Chat Type: {{{chatType}}}

Conversation History:
{{#each chatHistory}}
  {{this.sender}}: {{this.message}}
{{/each}}

Last message to reply to:
{{{lastMessage}}}

Please provide only the suggestions as a JSON array of strings. Make sure the output strictly adheres to the AiReplySuggestionsOutputSchema.`,
});

const aiReplySuggestionsFlow = ai.defineFlow(
  {
    name: 'aiReplySuggestionsFlow',
    inputSchema: AiReplySuggestionsInputSchema,
    outputSchema: AiReplySuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
