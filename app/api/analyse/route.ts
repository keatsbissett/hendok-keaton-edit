import { NextRequest, NextResponse } from 'next/server'
import { detectFramework } from '@/lib/frameworks/detect'
import { processPriceAlert } from '@/lib/frameworks/price-alert'
import { processSageExport } from '@/lib/frameworks/sage-export'
import { processScreenshot } from '@/lib/frameworks/screenshot'
import { processLogistics } from '@/lib/frameworks/logistics'
import { processStockTake } from '@/lib/frameworks/stock-take'

export const maxDuration = 60 // Vercel function timeout — Claude can take up to 30s

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Read file into memory — never write to disk
  const buffer = Buffer.from(await file.arrayBuffer())
  const mimeType = file.type
  const filename = file.name

  const framework = detectFramework(filename, mimeType)

  try {
    let result
    switch (framework) {
      case 'price-alert':
        result = await processPriceAlert(buffer, mimeType, filename)
        break
      case 'sage-export':
        result = await processSageExport(buffer, mimeType, filename)
        break
      case 'screenshot':
        result = await processScreenshot(buffer, mimeType)
        break
      case 'logistics':
        result = await processLogistics(buffer, mimeType, filename)
        break
      case 'stock-take':
        result = await processStockTake(buffer, mimeType, filename)
        break
      default:
        return NextResponse.json(
          { error: 'Document type not recognised. Please upload a price alert, Sage export, screenshot, logistics, or stock take file.' },
          { status: 422 }
        )
    }
    return NextResponse.json(result)
  } catch (err) {
    console.error('Analysis error:', err)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
