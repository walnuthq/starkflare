import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TxStepsStats, GasSpentStats, TotalUsersStats, FailedTxs, ContractsStats, EntrypointsStats } from '@/components/stats'
import Header from '@/components/header'
import { Flamegraph } from '@/components/flamegraph'
import Footer from '@/components/footer'

export default function HomePage() {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="py-10">
				<div className="container mx-auto">
					<div className="grid grid-cols-11 gap-4">
						<div className="col-span-4 p-6 pl-0">
							<h1 className="text-2xl font-medium">Starkflare</h1>
							<h2 className="text-lg mt-2">
								Get insights into your rollup&apos;s costs. Monitor resource usage, find the most expensive bottlenecks, optimise.
							</h2>
						</div>
						<TxStepsStats className="col-span-4" />
						<FailedTxs className="col-span-3 row-span-2" />
						<GasSpentStats className="col-span-4" />
						<TotalUsersStats className="col-span-2" />
						<Card className="col-span-2">
							<CardHeader></CardHeader>
							<CardContent></CardContent>
						</Card>
					</div>

					<div className="mt-28 text-center">
						<h2 className="text-4xl font-medium">Tx steps flamegraph</h2>
						<p className="max-w-lg mx-auto mt-6">
							Below you can find contracts that consumed the highest amount of gas. For each contract, you can drill down to transactions and get a flame chart,
							to find out which part of the transaction is causing highest number of steps burned.
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
