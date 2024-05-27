import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ReactNode } from 'react'

type Props = {
  className?: string
  tooltipClassName?: string
  children: ReactNode
  tooltipMessage: ReactNode
  asChild?: boolean
}

export function CommonTooltip(props: Props) {
  const { className, children, tooltipMessage, asChild, tooltipClassName } =
    props
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger className={className} asChild={asChild}>
          {children}
        </TooltipTrigger>
        <TooltipContent className={tooltipClassName}>
          {tooltipMessage}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
