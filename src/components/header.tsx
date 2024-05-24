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
        <div className="flex items-center flex-row gap-8">
          <div>Network: Starknet Mainnet</div>
          <div className="relative inline-block text-left group">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-100 cursor-not-allowed"
                disabled
              >
                <option>7 days</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                </svg>
              </div>
            </div>
            <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-2 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Currently only 7 day time frame is supported.
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
