// Import NextRequest from 'next/server'
import type { NextRequest } from 'next/server'

// Define your edge function
export const runtime = 'edge'

interface Contract {
  contract_address: string
  steps_number: bigint
  steps_percentage: number
}

async function fetchContractName(
  contract_address: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.voyager.online/beta/contracts/${encodeURIComponent(contract_address)}`,
    )
    if (!response.ok) {
      return null
    }
    const data = await response.json()
    const contractAlias = (data as { contractAlias: string | null })
      .contractAlias
    return contractAlias
  } catch (error) {
    console.error('Error fetching contract name:', error)
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      'http://127.0.0.1:3000/rpc/get_top_contracts_by_steps',
    )
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`)
    }
    const data: Contract[] = await response.json()

    const enhancedData = await Promise.all(
      data.map(async (contract) => {
        const contractAlias = await fetchContractName(contract.contract_address)
        return { ...contract, contract_name: contractAlias }
      }),
    )

    return new Response(JSON.stringify(enhancedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching data:', error)

    let statusCode = 500
    let responseBody

    if (error instanceof Error && error.message.includes('HTTP')) {
      statusCode = parseInt(error.message.split(': ')[1], 10)
      responseBody = { message: 'An error occurred while fetching data.' }
    } else {
      responseBody = { message: 'An unexpected error occurred.' }
    }

    return new Response(JSON.stringify(responseBody), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
