import { simpleParser } from 'mailparser'

export interface ParsedEmail {
  subject: string
  from: string
  date: string
  text: string
  html: string
}

/**
 * Parse .eml buffer using mailparser.
 * Never writes to disk — operates entirely in memory.
 */
export async function parseEmail(buffer: Buffer): Promise<ParsedEmail> {
  const parsed = await simpleParser(buffer)

  return {
    subject: parsed.subject ?? '',
    from: parsed.from?.text ?? '',
    date: parsed.date?.toISOString() ?? '',
    text: parsed.text ?? '',
    html: parsed.html || '',
  }
}

/**
 * Extract the plain text content for Claude input.
 * Prefers text over HTML for token efficiency.
 */
export function emailToText(email: ParsedEmail): string {
  return [
    `Subject: ${email.subject}`,
    `From: ${email.from}`,
    `Date: ${email.date}`,
    '',
    email.text || email.html,
  ].join('\n')
}
