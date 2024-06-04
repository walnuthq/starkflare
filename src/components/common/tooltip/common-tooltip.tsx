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
  delayDuration?: number
}

export function CommonTooltip(props: Props) {
  const {
    className,
    children,
    tooltipMessage,
    asChild,
    tooltipClassName,
    delayDuration = 0,
  } = props
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
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
