'use client'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const contracts = [
  {
    contract_name: 'Contract A',
    address:
      '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    number_of_steps: 4,
    percentage_consumption: 10,
  },
  {
    contract_name: 'Contract B',
    address: '0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0',
    number_of_steps: 6,
    percentage_consumption: 15,
  },
  {
    contract_name: 'Contract C',
    address: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9',
    number_of_steps: 3,
    percentage_consumption: 8,
  },
  {
    contract_name: 'Contract D',
    address: '0x5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7',
    number_of_steps: 5,
    percentage_consumption: 12,
  },
  {
    contract_name: 'Contract E',
    address: '0xf1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4',
    number_of_steps: 2,
    percentage_consumption: 7,
  },
  {
    contract_name: 'Contract F',
    address: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9',
    number_of_steps: 7,
    percentage_consumption: 18,
  },
  {
    contract_name: 'Contract G',
    address: '0xc1b2a3d4e5f6c7b8a9d0e1f2c3b4a5d6e7f8c9b0a1',
    number_of_steps: 4,
    percentage_consumption: 11,
  },
  {
    contract_name: 'Contract H',
    address: '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1',
    number_of_steps: 8,
    percentage_consumption: 20,
  },
  {
    contract_name: 'Contract I',
    address: '0x7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1',
    number_of_steps: 3,
    percentage_consumption: 9,
  },
  {
    contract_name: 'Contract J',
    address: '0xd1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8',
    number_of_steps: 6,
    percentage_consumption: 14,
  },
  {
    contract_name: 'Contract K',
    address: '0x8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5',
    number_of_steps: 5,
    percentage_consumption: 13,
  },
  {
    contract_name: 'Contract L',
    address: '0x2a1b0c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7',
    number_of_steps: 4,
    percentage_consumption: 10,
  },
  {
    contract_name: 'Contract M',
    address: '0x6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9',
    number_of_steps: 9,
    percentage_consumption: 22,
  },
  {
    contract_name: 'Contract N',
    address: '0xb1a0c3d2e5f4a7b6c9d8e1f0a3b2c5d4e7',
    number_of_steps: 4,
    percentage_consumption: 11,
  },
  {
    contract_name: 'Contract O',
    address: '0xe1f0a3b2c5d4e7f6a9b8c1d0e3f2a5b4c7',
    number_of_steps: 7,
    percentage_consumption: 17,
  },
]

const sortedContracts = [...contracts].sort(
  (a, b) => b.percentage_consumption - a.percentage_consumption,
)

let data = sortedContracts.slice(0, 11)

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function ContractsStats({ className }: { className?: string }) {
  const renderTooltipContent = (data: any) => {
    if (data.active && data.payload) {
      const contract = data.payload[0].payload
      return (
        <div
          key={`tooltip-${contract.contract_name}`}
          className="bg-white border p-2"
          style={{ marginLeft: '-50px' }}
        >
          <div
            key={`tooltipItem-${contract.contract_name}`}
            className="break-words"
          >
            {contract.contract_name}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-normal">
          Contracts burning most steps
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-between">
          <div className="h-60 px-2 overflow-y-auto w-full ">
            {data.map((item, index) => (
              <div key={`list-box-${index}`} className="flex justify-between">
                <div key={`list-item-${index}`} className="w-24">
                  {item.contract_name}
                </div>
                <div key={`list-steps-${index}`}>
                  {item.number_of_steps} steps
                </div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width={400} height={200}>
            <PieChart>
              <Pie
                data={data}
                labelLine={false}
                outerRadius={160}
                fill="#8884d8"
                dataKey="percentage_consumption"
              >
                {data.map((entry, index) => (
                  <>
                    <Cell
                      style={{ outline: 'none' }}
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  </>
                ))}
              </Pie>
              <Tooltip content={renderTooltipContent} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
