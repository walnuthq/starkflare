import Image from 'next/image'

export default function Header() {
  return (
    <header className="border-b py-4">
      <div className="container flex flex-row justify-between items-center">
        <div className="flex flex-row gap-8 items-center">
          <div className="flex flex-row gap-2 items-center mr-6">
            <Image
              src="/starkflare-logo.png"
              alt="Logo"
              className="logo"
              width={64}
              height={64}
            />
            <span className="text-lg font-medium">Starkflare</span>
          </div>
          <a href="/">About</a>
          <a href="/">FAQ</a>
        </div>
        <div className="flex flex-row gap-8">
          <div>Network: Starknet Mainnet</div>
        </div>
      </div>
    </header>
  )
}
