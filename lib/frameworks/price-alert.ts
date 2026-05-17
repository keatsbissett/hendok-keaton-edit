import { anthropic, MODEL, MAX_TOKENS } from '@/lib/ai/client'
import { parseExcel, rowsToText } from '@/lib/parsers/excel'
import { parseEmail, emailToText } from '@/lib/parsers/email'
import { getPriceAlertPrompt } from '@/lib/ai/prompts/price-alert'
import { clientConfig } from '@/config/client'
import type { AnalysisResult } from '@/lib/types'

export async function processPriceAlert(
  buffer: Buffer,
  mimeType: string,
  filename: string
): Promise<AnalysisResult> {
  // Parse document into text
  let documentText: string

  if (mimeType.includes('email') || filename.endsWith('.eml')) {
    const email = await parseEmail(buffer)
    documentText = emailToText(email)
  } else {
    // Excel or CSV
    const rows = parseExcel(buffer)
    documentText = rowsToText(rows)
  }

  const systemPrompt = getPriceAlertPrompt(clientConfig.context)

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Here is today's price alert data:\n\n${documentText}`,
      },
    ],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''

  // Parse Claude's JSON response
  const result: AnalysisResult = JSON.parse(text)
  return result
}
