import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  defaultHeaders: {
    'anthropic-beta': 'data-privacy', // Zero data retention — mandatory on every call
  },
})

export const MODEL = 'claude-sonnet-4-20250514'
export const MAX_TOKENS = 4096
