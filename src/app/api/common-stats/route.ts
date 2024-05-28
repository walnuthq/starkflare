import { fetchCommonStats } from '@/lib/api'

export const runtime = 'edge'

export async function GET() {
  const commonStats = await fetchCommonStats()
  return Response.json(commonStats)
}
