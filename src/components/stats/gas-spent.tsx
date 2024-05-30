'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CommonStats, L1GasSpent } from '@/lib/types'
import {
  capitalise,
  cn,
  formatCompactNumber,
  getDayStringFromDate,
  getUTCDateRange,
} from '@/lib/utils'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { CSSProperties, useMemo } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { CommonTooltip } from '@/components/common/tooltip'

type TransformedData = {
  total: number
  transformed: Array<{ day: string; gas: number; date: string }>
}

function getTransformedData(stats: L1GasSpent[]) {
  return stats.reduce<TransformedData>(
    (acc, curr) => {
      return {
        total: acc.total + curr.l1DataGas,
        transformed: [
          ...acc.transformed,
          {
            day: getDayStringFromDate(curr.date),
            gas: curr.l1DataGas,
            date: curr.date,
          },
        ],
      }
    },
    { total: 0, transformed: [] },
  )
}

export function GasSpentStats({
  className,
  commonStats,
}: {
  className?: string
  commonStats: CommonStats
}) {
  const { total, transformed } = useMemo(
    () => getTransformedData(commonStats?.l1GasStats ?? []),
    [commonStats?.l1GasStats],
  )

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-normal flex justify-between items-center w-full">
          L1 Gas Spent
          <CommonTooltip
            tooltipClassName="whitespace-pre-wrap max-w-44"
            tooltipMessage={`This tile shows the total amount of gas paid, in ETH, for posting the rollup data and validating its state on L1 Ethereum.`}
          >
            <QuestionMarkCircledIcon />
          </CommonTooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <div className="text-2xl font-bold">
          <CommonTooltip tooltipMessage={`${total} ETH`}>
            {formatCompactNumber(total)} ETH
          </CommonTooltip>
        </div>
        <div className="mt-4 flex-grow">
          <ResponsiveContainer width="100%" height="100%" debounce={1500}>
            <BarChart data={transformed} margin={{ bottom: 0 }}>
              <XAxis
                dataKey="day"
                strokeWidth="0px"
                fontSize={'10px'}
                fontWeight={500}
                interval={0}
              />
              <Tooltip
                formatter={(value, name) => [
                  `${capitalise(name.toString())}: ${value} ETH`,
                ]}
                allowEscapeViewBox={{ x: true, y: true }}
                separator=""
                labelFormatter={(label, payload) => {
                  const { startDateString, endDateString } = getUTCDateRange(
                    payload[0]?.payload?.date,
                  )
                  return (
                    <>
                      <p>{label}</p>
                      <p className="mt-2 mb-1 font-medium text-xs">
                        Date Range:
                      </p>
                      <p className="text-xs font-normal whitespace-pre-wrap">
                        {startDateString + '\n' + endDateString}
                      </p>
                    </>
                  )
                }}
              />
              <Bar
                dataKey="gas"
                style={
                  {
                    fill: 'hsl(var(--primary))',
                    opacity: 1,
                  } as CSSProperties
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
