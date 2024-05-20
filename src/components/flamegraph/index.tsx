import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Flamegraph({ className }: { className?: string }) {
	return (
		<Card className={className}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-normal">Flamegraph</CardTitle>
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	)
}
