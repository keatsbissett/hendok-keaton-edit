import { anthropic, MODEL, MAX_TOKENS } from '@/lib/ai/client'
import { parseExcel, rowsToText } from '@/lib/parsers/excel'
import { getLogisticsPrompt } from '@/lib/ai/prompts/logistics'
import { clientConfig } from '@/config/client'
import type { AnalysisResult } from '@/lib/types'

export async function processLogistics(
  buffer: Buffer,
  mimeType: string,
  filename: string
): Promise<AnalysisResult> {
  const rows = parseExcel(buffer)
  const documentText = rowsToText(rows)

  const systemPrompt = getLogisticsPrompt(clientConfig.context)

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Here is the logistics report data:\n\n${documentText}`,
      },
    ],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const result: AnalysisResult = JSON.parse(text)
  return result
}
