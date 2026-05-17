export type FrameworkType =
  | 'price-alert'
  | 'sage-export'
  | 'screenshot'
  | 'logistics'
  | 'stock-take'
  | 'unknown'

export function detectFramework(
  filename: string,
  mimeType: string,
  contentSample?: string
): FrameworkType {
  const name = filename.toLowerCase()
  const mime = mimeType.toLowerCase()

  // Image files → screenshot vision framework
  if (mime.startsWith('image/')) return 'screenshot'

  // Price alert — filename or content signals
  if (name.includes('price') || name.includes('alert') || name.includes('msp'))
    return 'price-alert'
  if (contentSample?.toLowerCase().includes('below msp'))
    return 'price-alert'
  if (contentSample?.toLowerCase().includes('pricing catch'))
    return 'price-alert'

  // Sage export signals
  if (name.includes('sage') || name.includes('invoice') || name.includes('debtor'))
    return 'sage-export'

  // Logistics signals
  if (
    name.includes('ctrack') ||
    name.includes('vantage') ||
    name.includes('fleet') ||
    name.includes('delivery')
  )
    return 'logistics'

  // Stock take signals
  if (name.includes('stock') || name.includes('inventory') || name.includes('dims'))
    return 'stock-take'

  // Meter readings — route to screenshot framework for now
  if (name.includes('mtr') || name.includes('meter'))
    return 'screenshot'

  return 'unknown'
}
