'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CommonStats, ContractStats } from '@/lib/types'
import ContractsBurningMostStepsTable from './contracts/ContractsBurningMostStepsTable'
import { ContractsPieChart } from './contracts/ContractsPieChart'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#ae00ff',
  '#f09',
  '#0f5',
  '#00e1ff',
  '#fbff00',
  '#960',
  '#707070',
]

export function ContractsStats({
  className,
  commonStats,
}: {
  className?: string
  commonStats: CommonStats
}) {
  const data = [
    ...commonStats.topContractsBySteps,
    {
      contractName: 'Others',
      contractAddress: 'Others',
      stepsNumber: BigInt(0),
      stepsPercentage:
        100 -
        commonStats.topContractsBySteps.reduce(
          (total, item) => total + item.stepsPercentage,
          0,
        ),
    },
  ]

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-normal">
          Contracts burning most steps
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div>
            <div className="h-[200px] overflow-y-auto pane pane-light">
              <ContractsBurningMostStepsTable colors={COLORS} data={data} />
            </div>
          </div>
          <ContractsPieChart colors={COLORS} data={data} />
        </div>
      </CardContent>
    </Card>
  )
}
