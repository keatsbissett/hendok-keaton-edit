// Auth removed — this page is not reachable until auth is re-added
// Keeping the file so the route exists, but it just redirects to /brief
import { redirect } from 'next/navigation'

export default function SignInPage() {
  redirect('/brief')
}
