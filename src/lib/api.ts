import { Redis } from '@upstash/redis'
import { CommonStats } from './types'
import camelcaseKeys from 'camelcase-keys'

const CACHE_EXPIRATION = 3600 * 12

export async function fetchCommonStats(): Promise<CommonStats> {
  if (process.env.UPSTASH_URL && process.env.UPSTASH_TOKEN) {
    return fetchCommonStatsWithCaching()
  } else {
    return fetchCommonStatsWithoutCaching()
  }
}

async function fetchCommonStatsWithCaching(): Promise<CommonStats> {
  const COMMON_STATS_KEY = 'common-stats'
  const redis = new Redis({
    url: process.env.UPSTASH_URL,
    token: process.env.UPSTASH_TOKEN,
  })

  const ttl = await redis.ttl(COMMON_STATS_KEY)

  if (ttl > 0) {
    return (await redis.get(COMMON_STATS_KEY)) as CommonStats
  }

  const res = await fetch(
    'http://starkf-servi-1yasdoedwfh1-321738969.us-east-1.elb.amazonaws.com/rpc/get_common_data',
    {
      cache: 'no-store',
    },
  )

  const commonStats: CommonStats = camelcaseKeys((await res.json()) as any, {
    deep: true,
  })

  await redis.setex(
    COMMON_STATS_KEY,
    CACHE_EXPIRATION,
    JSON.stringify(commonStats),
  )

  return commonStats
}

async function fetchCommonStatsWithoutCaching(): Promise<CommonStats> {
  const res = await fetch('https://starkflare.pages.dev/api/common-stats', {
    cache: 'no-store',
  })
  return (await res.json()) as CommonStats
}
