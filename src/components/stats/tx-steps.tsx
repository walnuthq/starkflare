'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from 'recharts'

const data = [
	{
		revenue: 10400,
		subscription: 10240,
	},
	{
		revenue: 14405,
		subscription: 10300,
	},
	{
		revenue: 9400,
		subscription: 8200,
	},
	{
		revenue: 8200,
		subscription: 7278,
	},
	{
		revenue: 7000,
		subscription: 10189,
	},
	{
		revenue: 9600,
		subscription: 10239,
	},
	{
		revenue: 11244,
		subscription: 10278,
	},
	{
		revenue: 16475,
		subscription: 7189,
	},
]

export function TxStepsStats({ className }: { className?: string }) {
	return (
		<Card className={className}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-normal">Transactions Count & Steps Used Placeholder</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">$15,231.89</div>
				<p className="text-xs text-muted-foreground">+20.1% from last month</p>
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
							<Line
								type="monotone"
								strokeWidth={2}
								dataKey="revenue"
								activeDot={{
									r: 6,
									style: { fill: 'hsl(var(--primary))', opacity: 0.25 },
								}}
								style={
									{
										stroke: 'hsl(var(--primary))',
									} as React.CSSProperties
								}
							/>
							<Line
								type="monotone"
								strokeWidth={2}
								dataKey="subscription"
								activeDot={{
									r: 6,
									style: { fill: 'hsl(var(--primary))', opacity: 0.25 },
								}}
								style={
									{
										stroke: 'hsl(var(--primary))',
									} as React.CSSProperties
								}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}
