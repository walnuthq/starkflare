import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CommonStats } from '@/lib/types'

export function TotalUsersStats({
  className,
  commonStats,
}: {
  className?: string
  commonStats: CommonStats
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-normal">Total Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold mt-10">
          {commonStats.userStats.uniqueUsersLast7Days}
        </div>
        <div className="flex justify-between text-lg font-medium mt-6">
          <div className="text-green-600">
            {commonStats.userStats.newUsersLast7Days} new
          </div>
          <div className="text-red-600">
            {commonStats.userStats.lostUsersLast7Days} lost
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
