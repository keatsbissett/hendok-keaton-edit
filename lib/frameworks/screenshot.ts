import { anthropic, MODEL, MAX_TOKENS } from '@/lib/ai/client'
import { imageToBase64, getMediaType } from '@/lib/parsers/image'
import { getScreenshotPrompt } from '@/lib/ai/prompts/screenshot'
import { clientConfig } from '@/config/client'
import type { AnalysisResult } from '@/lib/types'

export async function processScreenshot(
  buffer: Buffer,
  mimeType: string
): Promise<AnalysisResult> {
  const base64 = imageToBase64(buffer)
  const mediaType = getMediaType(mimeType)
  const systemPrompt = getScreenshotPrompt(clientConfig.context)

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mediaType,
              data: base64,
            },
          },
          {
            type: 'text',
            text: 'Please analyse this operational report and produce the intelligence brief.',
          },
        ],
      },
    ],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const result: AnalysisResult = JSON.parse(text)
  return result
}
