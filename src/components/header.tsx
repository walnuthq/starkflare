export default function Header() {
	return (
		<header className="border-b py-4">
			<div className="container flex flex-row justify-between">
				<div className="flex flex-row gap-8">
					<a href="/">FAQ</a>
					<a href="/">About</a>
				</div>
				<div className="flex flex-row gap-8">
					<div>Network: Starknet Mainnet</div>
				</div>
			</div>
		</header>
	)
}
