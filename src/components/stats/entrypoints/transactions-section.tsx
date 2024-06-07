'use client'

import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CommonTooltip } from '@/components/common/tooltip'
import { CommonSelect } from '@/components/common/select'
import { copyToClipboard, formatCompactNumber } from '@/lib/utils'
import { EntrypointData, Transaction } from '@/lib/types'
import { useEffect, useRef, useState } from 'react'

dayjs.extend(relativeTime) // enable plugin to use fromNow() functionality

const sampleTransactions: Transaction[] = [
  {
    hash: '0x048300b99e712066eb7c8ec4b7871c187d1312f7b054adfa6825f0a05324204a',
    steps: 127347,
    timestamp: 1695647792,
  },
  {
    hash: '0x03137a1a9e0f34d318e5a6132fb9d201d00935ce79c132c65ac6ca68682870d1',
    steps: 999000,
    timestamp: 1695371304,
  },
  {
    hash: '0x0219bcac0d0dbaa565218e56e5f24f1ce1e8db28bceb6487a379463085fb531d',
    steps: 232000,
    timestamp: 1681823207,
  },
  {
    hash: '0x062ffb68a6d2c80e106fb6a60a420398c2439033c0ac2def61adcb8dafc04ae9',
    steps: 120001,
    timestamp: 1694827827,
  },
  {
    hash: '0x02f43a3b260f7d3615718ef761ff1b7e30b14a56cb9defafb782e3f05544a6ed',
    steps: 423000,
    timestamp: 1682708149,
  },
  {
    hash: '0x0067bddf5d16681d04240396d283662a7ccb9ad92c688f559b7800aa17a0730e',
    steps: 960300,
    timestamp: 1675105972,
  },
  {
    hash: '0x04285ae2c9aa639d41207647faff8fa0a2bc84b304a6cd218d602419dbf13b32',
    steps: 1002000,
    timestamp: 1699687825,
  },
  {
    hash: '0x04aaf683ad612cc7f1c61483e781f821b44b0cb32a8ff223b39f0c2c23154055',
    steps: 1002000,
    timestamp: 1700542793,
  },
  {
    hash: '0x071b5b66217da8776919c3799dfad7e97ba12c4ad4a2297f4dd36e2e32d6476b',
    steps: 1002000,
    timestamp: 1676319231,
  },
  {
    hash: '0x07caba8f4923ca944c8fa5cc4a4a982fd17c36a35069d11651be1f907b0922b7',
    steps: 1002000,
    timestamp: 1685421051,
  },
]

type TransactionsSectionProps = {
  entrypoints: EntrypointData[]
}

export function TransactionsSection(props: TransactionsSectionProps) {
  const { entrypoints } = props
  const hasRunOnce = useRef(false)

  const [loading, setLoading] = useState<boolean>(true)
  const [transactions, setTransactions] =
    useState<Transaction[]>(sampleTransactions) // currently defaulted to sample data
  // State to keep track of the copied hash
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  const onEntrypointSelect = (entrypointName: string) => {
    setLoading(true)
    // function to implement when an entrypoint is selected from the dropdown
    setLoading(false)
  }

  const onHashClick = (hash: string) => {
    copyToClipboard(hash).then(() => {
      setCopiedHash(hash)
      // Reset the copied hash after 1.5 seconds
      setTimeout(() => {
        setCopiedHash(null)
      }, 1500)
    })
  }

  useEffect(() => {
    // pre selected first entrypoint in the list on initial render
    if (entrypoints.length !== 0 && !hasRunOnce.current) {
      onEntrypointSelect(entrypoints[0].name)
      hasRunOnce.current = true // Mark that the effect has run once
    }
  }, [entrypoints])

  return (
    <div className=" flex flex-col w-full h-full overflow-y-auto styled-scrollbar">
      {entrypoints.length !== 0 ? (
        <>
          <div className="sticky top-0 z-10 bg-white p-2 pb-0">
            <h3 className="text-md font-normal">Transactions</h3>

            <CommonSelect
              className="w-full mt-2"
              placeholder="Select an Entrypoint"
              defaultValue={entrypoints[0].name}
              onValueChange={onEntrypointSelect}
              contents={[
                {
                  items: entrypoints.map((entrypoint: EntrypointData) => {
                    return entrypoint.name
                  }),
                },
              ]}
            />
          </div>

          <div className="flex flex-col p-2 pt-0">
            {!loading ? (
              transactions.length !== 0 ? (
                <Table>
                  <TableBody>
                    {transactions.map((transaction: Transaction) => (
                      <TableRow
                        key={transaction.hash}
                        className="cursor-pointer"
                      >
                        <TableCell
                          onClick={() => onHashClick(transaction.hash)}
                        >
                          <CommonTooltip
                            asChild
                            hideOnClick={false} // we dont want the tooltip to hide upon clicking the component (default behaviour)
                            tooltipMessage={
                              copiedHash === transaction.hash
                                ? 'Copied!'
                                : transaction.hash
                            }
                          >
                            <p>{`${transaction.hash.slice(0, 5)}...${transaction.hash.slice(-3)}`}</p>
                          </CommonTooltip>
                        </TableCell>
                        <TableCell>
                          <CommonTooltip
                            asChild
                            tooltipMessage={`${transaction.steps.toLocaleString()} steps`}
                          >
                            <p>{`${formatCompactNumber(transaction.steps)} steps`}</p>
                          </CommonTooltip>
                        </TableCell>
                        <TableCell className="text-right">
                          <CommonTooltip
                            asChild
                            tooltipMessage={`${new Date(transaction.timestamp * 1000).toDateString()}, ${new Date(transaction.timestamp * 1000).toLocaleTimeString()}`}
                          >
                            <p className="text-xs text-gray-500">
                              {dayjs.unix(transaction.timestamp).fromNow()}
                            </p>
                          </CommonTooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <>
                  <p className="text-sm self-center mt-3">No data available</p>
                </>
              )
            ) : (
              // skeleton loading component
              <div className="flex flex-col space-y-3 w-full">
                <Skeleton className="h-[175px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <h3 className="text-md font-normal">Transactions</h3>
          <p className="text-sm self-center my-auto">No data available</p>
        </>
      )}
    </div>
  )
}
