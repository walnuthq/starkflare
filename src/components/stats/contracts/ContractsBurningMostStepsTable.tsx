import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast, useToast } from '@/components/ui/use-toast'
import { ContractStats } from '@/lib/types'

export function ContractsBurningMostStepsTable({
  data,
  colors,
}: {
  data: ContractStats[]
  colors: string[]
}) {
  const formatNumber = (num: bigint) => {
    if (Number(num) < 1000) {
      return num.toString()
    } else if (Number(num) < 1000000) {
      return (Number(num) / 1000).toFixed(2) + 'K'
    } else if (Number(num) < 1000000000) {
      return (Number(num) / 1000000).toFixed(2) + 'M'
    } else {
      return (Number(num) / 1000000000).toFixed(2) + 'B'
    }
  }

  return (
    <Table className="px-2">
      <TableHeader className=" bg-white sticky top-0">
        <TableRow>
          <TableHead className="text-xs font-normal text-muted-foreground">
            Contract name
          </TableHead>
          <TableHead className="text-xs font-normal text-muted-foreground text-right whitespace-nowrap">
            Number of steps
          </TableHead>
          <TableHead className="text-xs font-normal text-muted-foreground text-right whitespace-nowrap">
            Percentage consumption
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-sm">
        {data.map((item, index) => (
          <TableRow key={`table-row-${index}`}>
            <>
              <TableCell key={`table-item-${index}`}>
                <TooltipProvider key={`tooltip-provider-${index}`}>
                  <Tooltip key={`tooltip-${index}`}>
                    <TooltipTrigger key={`tooltip-trigger-${index}`}>
                      <div
                        key={`tooltip-item-${index}`}
                        className="underline cursor-pointer flex items-center gap-2"
                        onClick={() => {
                          window.navigator.clipboard.writeText(
                            item.contractAddress,
                          )
                          toast({
                            description: 'The address has been copied!',
                          })
                        }}
                      >
                        <div
                          key={`round-item-${index}`}
                          style={{ backgroundColor: colors[index] }}
                          className={`w-2 h-2 rounded-full`}
                        ></div>
                        <span className=" whitespace-nowrap">
                          {item.contractName
                            ? item.contractName
                            : `${item.contractAddress.slice(0, 5)}...${item.contractAddress.slice(-4)}`}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      key={`tooltip-content-${index}`}
                      side="right"
                    >
                      {item.contractAddress}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell
                key={`list-steps-${index}`}
                className=" whitespace-nowrap text-right"
              >
                {item.contractName === 'Others'
                  ? ''
                  : formatNumber(item.stepsNumber)}
              </TableCell>
              <TableCell
                key={`list-percentage-${index}`}
                className="text-right"
              >
                {item.stepsPercentage.toFixed(2)}
              </TableCell>
            </>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ContractsBurningMostStepsTable
