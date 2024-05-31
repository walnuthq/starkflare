import { Redis } from '@upstash/redis'
import { CommonStats, RawEntrypoints, Entrypoints } from './types'
import camelcaseKeys from 'camelcase-keys'
import { RpcProvider, constants, Contract, hash } from 'starknet'

const CACHE_EXPIRATION = 3600 * 12
const RPC_URL =
  'http://starkf-servi-1yasdoedwfh1-321738969.us-east-1.elb.amazonaws.com/rpc'
const API_URL = 'https://starkflare.pages.dev/api'

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

  const res = await fetch(`${RPC_URL}/get_common_data`, {
    cache: 'no-store',
  })

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
  const res = await fetch(`${API_URL}/common-stats`, {
    cache: 'no-store',
  })
  return (await res.json()) as CommonStats
}

export async function fetchEntrypoints(
  contractAddress: string,
): Promise<Entrypoints> {
  if (process.env.UPSTASH_URL && process.env.UPSTASH_TOKEN) {
    return fetchEntrypointsWithCaching(contractAddress)
  } else {
    return fetchEntrypointsWithoutCaching(contractAddress)
  }
}

async function fetchEntrypointsWithCaching(
  contractAddress: string,
): Promise<Entrypoints> {
  const ENTRYPOINTS_KEY = `entrypoints-${contractAddress}`
  const redis = new Redis({
    url: process.env.UPSTASH_URL,
    token: process.env.UPSTASH_TOKEN,
  })

  const ttl = await redis.ttl(ENTRYPOINTS_KEY)

  if (ttl > 0) {
    return (await redis.get(ENTRYPOINTS_KEY)) as Entrypoints
  }

  const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN })
  const [res, compressedContract] = await Promise.all([
    fetch(
      `${RPC_URL}/get_entrypoints?contract_address_param=${contractAddress}`,
      {
        cache: 'no-store',
      },
    ),
    provider.getClassAt(contractAddress),
  ])

  const rawEntrypoints: RawEntrypoints = camelcaseKeys(
    (await res.json()) as any,
    {
      deep: true,
    },
  )

  const contract = new Contract(
    compressedContract.abi,
    contractAddress,
    provider,
  )
  const entrypointsBySelector: Record<string, string> = {}
  for (let func in contract.functions) {
    const selector = BigInt(hash.getSelectorFromName(func))
    entrypointsBySelector[`0x${selector.toString(16).padStart(64, '0')}`] = func
  }

  const entrypoints = {
    entrypoints: rawEntrypoints.entrypoints.map((entrypoint) => ({
      ...entrypoint,
      entrypoint: entrypointsBySelector[entrypoint.entrypointSelector],
    })),
  }

  await redis.setex(
    ENTRYPOINTS_KEY,
    CACHE_EXPIRATION,
    JSON.stringify(entrypoints),
  )

  return entrypoints
}

async function fetchEntrypointsWithoutCaching(
  contractAddress: string,
): Promise<Entrypoints> {
  const res = await fetch(
    `${API_URL}/entrypoints?contract_address=${contractAddress}`,
    {
      cache: 'no-store',
    },
  )
  return (await res.json()) as Entrypoints
}
