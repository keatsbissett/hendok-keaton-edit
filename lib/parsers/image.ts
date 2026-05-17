/**
 * Convert an image buffer to base64 for Claude's vision API.
 * Never writes to disk — operates entirely in memory.
 */
export function imageToBase64(buffer: Buffer): string {
  return buffer.toString('base64')
}

/**
 * Determine the correct media type for Claude's vision API.
 */
export function getMediaType(
  mimeType: string
): 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' {
  const map: Record<string, 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'> = {
    'image/jpeg': 'image/jpeg',
    'image/jpg': 'image/jpeg',
    'image/png': 'image/png',
    'image/gif': 'image/gif',
    'image/webp': 'image/webp',
  }
  return map[mimeType.toLowerCase()] ?? 'image/png'
}
