'use client'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { cn } from '@/lib/utils'
import { EntrypointData } from '@/lib/types'
import { EntrypointColors } from '@/lib/constants'
import { HTMLAttributes } from 'react'

type BaseProps = {
  className: string
  data: EntrypointData[]
}

type EntrypointsStackedBarChartProps = BaseProps &
  React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export function EntrypointsStackedBarChart({
  className,
  data,
  ...props
}: EntrypointsStackedBarChartProps) {
  const graphData = data.reduce(
    (acc: Record<string, number>, curr: EntrypointData) => {
      acc[curr.name] = curr.steps
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className={cn('h-[20px] w-full', className)} {...props}>
      {data.length !== 0 && (
        // debouncing delay to prevent app crashes
        <ResponsiveContainer debounce={1500} width="100%" height="100%">
          <BarChart data={[graphData]} layout="vertical">
            <Tooltip shared={false} wrapperStyle={{ zIndex: '1' }} />
            <YAxis dataKey="name" type="category" hide />
            <XAxis type="number" domain={[0, 'dataMax']} hide />
            {Object.keys(graphData).map((data: string, index: number) => {
              return (
                <Bar
                  key={index}
                  dataKey={data}
                  stackId="a"
                  radius={
                    // first and last bar has curved radius for better ui
                    index === 0
                      ? [10, 0, 0, 10]
                      : index === Object.keys(graphData).length - 1
                        ? [0, 10, 10, 0]
                        : undefined
                  }
                  // cycle 10 constant colors thus would never repeat
                  fill={EntrypointColors[index % EntrypointColors.length]}
                />
              )
            })}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
