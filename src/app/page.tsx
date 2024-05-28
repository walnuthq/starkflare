export const runtime = 'edge'

import HomePage from '@/components/home-page'
import { fetchCommonStats } from '@/lib/api'

export default async function Page() {
  const commonStats = await fetchCommonStats()
  return <HomePage commonStats={commonStats} />
}
