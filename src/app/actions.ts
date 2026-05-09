'use server'

import {
  aiReplySuggestions,
  type AiReplySuggestionsInput,
} from '@/ai/flows/ai-reply-suggestions'

export async function getAiReplySuggestions(
  input: AiReplySuggestionsInput
): Promise<{ suggestions?: string[]; error?: string }> {
  try {
    // In a real app, you'd add validation and error handling here
    const result = await aiReplySuggestions(input)
    return { suggestions: result.suggestions }
  } catch (error) {
    console.error('Error fetching AI suggestions:', error)
    return { error: 'Failed to fetch suggestions. Please try again.' }
  }
}
