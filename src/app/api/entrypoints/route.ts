import { type NextRequest } from 'next/server'
import { fetchEntrypoints } from '@/lib/api'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const contractAddress = request.nextUrl.searchParams.get(
    'contract_address',
  ) as string
  const entrypoints = await fetchEntrypoints(contractAddress)
  return Response.json(entrypoints)
}
