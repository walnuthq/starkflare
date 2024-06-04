import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SelectTrigger className="w-[180px]" disabled>
                      <SelectValue placeholder="7 days" />
                    </SelectTrigger>
                  </TooltipTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                  </SelectContent>
                  <TooltipContent>
                    <p>Currently only 7 day time frame is supported.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Select>
          </div>
        </div>
      </div>
    </header>
  )
}
