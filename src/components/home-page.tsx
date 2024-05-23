import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TxStepsStats, GasSpentStats, TotalUsersStats, FailedTxs, ContractsStats, EntrypointsStats } from '@/components/stats'
import Header from '@/components/header'
import { Flamegraph } from '@/components/flamegraph'
import Footer from '@/components/footer'
import { CommonStats } from '@/lib/types'

export default function HomePage({ commonStats }: { commonStats: CommonStats }) {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="py-10">
				<div className="container mx-auto">
					<div className="grid grid-cols-11 gap-4">
						<div className="col-span-4 p-6 pl-0">
							<h1 className="text-2xl font-medium">Resource Monitoring for Rollups</h1>
							<h2 className="text-lg mt-2">
								Get insights into the use of resources like gas, calldata and storage in real-time. Find the most expensive bottlenecks, optimise.
							</h2>
						</div>
						<TxStepsStats className="col-span-4" />
						<FailedTxs className="col-span-3 row-span-2" />
						<GasSpentStats className="col-span-4" />
						<TotalUsersStats className="col-span-2" commonStats={commonStats} />
						<Card className="col-span-2">
							<CardHeader></CardHeader>
							<CardContent></CardContent>
						</Card>
					</div>

					<div className="mt-28 text-center">
						<h2 className="text-4xl font-medium">Optimise your rollup's costs</h2>
						<p className="max-w-lg mx-auto mt-6">
							Find contracts that are consuming the most resources and optimise them. Use the flamechart to find the most expensive parts of transactions and optimise them.
						</p>
					</div>
					<div className="flex flex-col mt-10 gap-4">
						<div className="flex flex-row gap-4">
							<ContractsStats className="basis-1/2" />
							<EntrypointsStats className="basis-1/2" />
						</div>
						<div>
							<Flamegraph />
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}
