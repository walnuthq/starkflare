import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function FailedTxs({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex justify-between space-y-1.5 pb-2">
        <CardTitle className="text-sm font-normal">
          Transactions by steps burned
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          List of transactions consuming the highest amount of steps. Click the
          transaction to get a detailed step consumption breakdown.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}
