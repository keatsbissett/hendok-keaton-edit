import * as XLSX from 'xlsx'

export interface ParsedRow {
  [key: string]: string | number | null
}

/**
 * Parse .xlsx or .csv buffer into an array of row objects.
 * Returns the first sheet's data as JSON.
 * Never writes to disk — operates entirely in memory.
 */
export function parseExcel(buffer: Buffer): ParsedRow[] {
  const workbook = XLSX.read(buffer, { type: 'buffer' })
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]

  const rows = XLSX.utils.sheet_to_json<ParsedRow>(worksheet, {
    defval: null,
    raw: false, // Return formatted strings for dates/numbers
  })

  return rows
}

/**
 * Serialize parsed rows to a compact string for Claude input.
 * Trims to 400 rows max to stay within context limits.
 */
export function rowsToText(rows: ParsedRow[], maxRows = 400): string {
  const trimmed = rows.slice(0, maxRows)
  return JSON.stringify(trimmed, null, 0)
}
