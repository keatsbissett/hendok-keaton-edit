import { redirect } from 'next/navigation'

// Main UI lives at app/page.tsx — keep /brief pointing there
export default function BriefPage() {
  redirect('/')
}
