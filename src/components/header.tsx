import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
        <div className="flex flex-row gap-8 items-center">
          <div>Network: Starknet Mainnet</div>
          <div className="relative inline-block group">
            <Select>
              <SelectTrigger className="w-[180px]" disabled>
                <SelectValue placeholder="7 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
              </SelectContent>
            </Select>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-gray-700 text-white text-center rounded-lg py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none text-sm">
              Currently only 7 day time frame is supported.
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
