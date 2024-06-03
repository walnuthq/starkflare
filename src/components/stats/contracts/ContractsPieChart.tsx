import { ContractStats } from '@/lib/types'
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from 'recharts'

export function ContractsPieChart({
  data,
  colors,
}: {
  data: ContractStats[]
  colors: string[]
}) {
  const renderTooltipContent = (data: any) => {
    if (data.active && data.payload) {
      const contract = data.payload[0].payload
      return (
        <div
          key={`tooltip-${contract.contractAddress}`}
          className="border p-2 z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in zoom-in-95 "
        >
          <div
            key={`tooltipItem-${contract.contractAddress}`}
            className="break-words"
          >
            {contract.contractAddress}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width={200} height={200}>
      <PieChart>
        <Pie
          cy={95}
          data={data}
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="stepsPercentage"
        >
          {data.map((entry, index) => (
            <Cell
              style={{ outline: 'none' }}
              key={`cell-${index}`}
              fill={colors[index]}
            />
          ))}
        </Pie>
        <RechartsTooltip content={renderTooltipContent} />
      </PieChart>
    </ResponsiveContainer>
  )
}
