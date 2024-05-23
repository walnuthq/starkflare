export const runtime = 'edge'

import HomePage from '@/components/home-page'
import { CommonStats } from '@/lib/types'
import camelcaseKeys from 'camelcase-keys'

async function getCommonStats() {
  const res = await fetch(
    'http://starkf-servi-1yasdoedwfh1-321738969.us-east-1.elb.amazonaws.com/rpc/get_common_data',
    {
      cache: 'no-store',
    },
  )
  const commonStats: CommonStats = camelcaseKeys((await res.json()) as any, {
    deep: true,
  })
  return commonStats
}

export default async function Page() {
  const commonStats = await getCommonStats()
  return <HomePage commonStats={commonStats} />
}
