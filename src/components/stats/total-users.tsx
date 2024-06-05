import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CommonStats } from '@/lib/types'
import { cn, formatCompactNumber } from '@/lib/utils'
import { CommonTooltip } from '../common/tooltip'

export function TotalUsersStats({
  className,
  commonStats,
}: {
  className?: string
  commonStats: CommonStats
}) {
  return (
    <Card className={cn('flex flex-col justify-between', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-normal">Total Users</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="text-5xl font-bold">
          <CommonTooltip
            tooltipMessage={`${commonStats.userStats.uniqueUsersLast7Days} Users`}
          >
            {formatCompactNumber(commonStats.userStats.uniqueUsersLast7Days)}
          </CommonTooltip>
        </div>
        <div className="flex flex-col text-lg font-medium mt-4">
          <div className="text-green-600 flex-1 whitespace-nowrap">
            <CommonTooltip
              tooltipMessage={`${commonStats.userStats.newUsersLast7Days} New Users`}
            >
              {formatCompactNumber(commonStats.userStats.newUsersLast7Days)} New
            </CommonTooltip>
          </div>
          <div className="text-red-600 flex-1 whitespace-nowrap">
            <CommonTooltip
              tooltipMessage={`${commonStats.userStats.lostUsersLast7Days} Lost Users`}
            >
              {formatCompactNumber(commonStats.userStats.lostUsersLast7Days)}{' '}
              Lost
            </CommonTooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
