'use client'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@/components/ui'
import { InputExtended } from '@/components/common/input'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { EntrypointData } from '@/lib/types'
import { CARMINE_CONTRACT_ADDRESS } from '@/lib/constants'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'

import { TransactionsSection } from '../transactions-section'
import { EntrypointsSection } from '../entrypoints-section'

const sampleEntrypoints: EntrypointData[] = [
  {
    name: 'swap1',
    steps: 127347,
    usage: 20,
  },
  {
    name: 'swap2',
    steps: 999000,
    usage: 10,
  },
  {
    name: 'swap3',
    steps: 232000,
    usage: 5,
  },
  {
    name: 'swap4',
    steps: 120001,
    usage: 12,
  },
  {
    name: 'swap5',
    steps: 423000,
    usage: 3,
  },
  {
    name: 'swap6',
    steps: 960300,
    usage: 35,
  },
  {
    name: 'swap7',
    steps: 1002000,
    usage: 15,
  },
  {
    name: 'swap8',
    steps: 100000,
    usage: 15,
  },
  {
    name: 'swap9',
    steps: 102000,
    usage: 15,
  },
  {
    name: 'swap10',
    steps: 100200,
    usage: 15,
  },
]

type EntrypointFormData = {
  contractAddress: string
}

type EntrypointFormErrors = {
  contractAddress: string
}

export function EntrypointsStats({ className }: { className?: string }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [entrypoints, setEntrypoints] =
    useState<EntrypointData[]>(sampleEntrypoints) // currently defaulted to sample data
  const [formData, setFormData] = useState<EntrypointFormData>({
    contractAddress: CARMINE_CONTRACT_ADDRESS, // currently defaulted to carmine contract address
  })
  const [formErrors, setFormErrors] = useState<EntrypointFormErrors>({
    contractAddress: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, contractAddress: value.trim() }))
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchEntrypointsAndTransactions()
    }
  }

  const fetchEntrypointsAndTransactions = () => {
    setLoading(true)
    // API call to fetch entrypoints + transactions data by submitting this contract address
    // use setFormErrors to display errors in input data
    setFormErrors((prev) => ({
      ...prev,
      contractAddress:
        formData.contractAddress === ''
          ? 'contract address cannot be empty'
          : '',
    }))
    setLoading(false)
  }

  useEffect(() => {
    // calling the API to fetch entrypoints + transactions data during initial render with default contract address (Carmine)
    fetchEntrypointsAndTransactions()
  }, [])

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg mb-2">
          Entrypoints and transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <InputExtended
          id="contract-address"
          type="text"
          label="Contract Address"
          name="contractAddress"
          value={formData.contractAddress}
          onChange={handleChange}
          placeholder="0x12...AB34"
          labelposition="inline"
          error={formErrors.contractAddress}
          onKeyDown={handleKeyPress}
          adornment={{
            right: (
              <ArrowRightIcon
                className="cursor-pointer"
                onClick={fetchEntrypointsAndTransactions}
              />
            ),
          }}
        />

        {/* height here is static for enabling scrolling for long lists */}
        <div className="flex h-80 w-full mt-4">
          {!loading ? (
            <>
              <div className="flex-1">
                <EntrypointsSection entrypoints={entrypoints} />
              </div>
              <div className="flex">
                <TransactionsSection entrypoints={entrypoints} />
              </div>
            </>
          ) : (
            // skeleton loading component
            <div className="flex flex-col space-y-3 w-full">
              <Skeleton className="h-[275px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
