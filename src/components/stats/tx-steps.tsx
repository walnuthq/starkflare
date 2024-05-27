'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TransactionStats } from '@/lib/types'
import { XAxis, Tooltip, Line, LineChart, ResponsiveContainer } from 'recharts'

export function TxStepsStats({
  className,
  transactionStats,
}: {
  className?: string
  transactionStats: TransactionStats
}) {
  const data = Array.from({ length: 7 }, (_, i) => i).map((i) => {
    const date = new Date(
      new Date().setDate(new Date().getDate() - (6 - i) - 1),
    )
    return {
      name: `${date.getDate()}/${date.getMonth() + 1}`,
      transactionsCount: transactionStats.transactionsCountLast7Days[i],
      stepsNumber: transactionStats.stepsNumberLast7Days[i] / 100000,
    }
  })
  const transactionsCount = transactionStats.transactionsCountLast7Days.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0,
  )
  const stepsNumber = transactionStats.stepsNumberLast7Days.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0,
  )
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-normal">
          Transactions Count & Steps Used
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div>
            <div className="text-2xl font-bold" style={{ color: '#8884d8' }}>
              {formatter.format(transactionsCount)}
            </div>
            <p className="text-xs text-muted-foreground">Transactions Count</p>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#82ca9d' }}>
              {formatter.format(stepsNumber)}
            </div>
            <p className="text-xs text-muted-foreground">Steps Used</p>
          </div>
        </div>
        <div className="h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis dataKey="name" />
              <Tooltip
                formatter={(
                  value: number,
                  name: 'transactionsCount' | 'stepsNumber',
                  props,
                ) => {
                  const valuesFormatted = {
                    transactionsCount: formatter.format(value),
                    stepsNumber: formatter.format(value * 100000),
                  }
                  const namesFormatted = {
                    transactionsCount: 'Transactions Count',
                    stepsNumber: 'Steps Used',
                  }
                  return [valuesFormatted[name], namesFormatted[name]]
                }}
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="transactionsCount"
                activeDot={{ r: 6 }}
                stroke="#8884d8"
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="stepsNumber"
                activeDot={{ r: 6 }}
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
