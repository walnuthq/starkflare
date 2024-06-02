'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ReactNode, useRef } from 'react'

type Props = {
  className?: string
  children: ReactNode
  tooltipMessage: ReactNode
  asChild?: boolean
  hideOnClick?: boolean
}

export function CommonTooltip(props: Props) {
  const { className, children, tooltipMessage, asChild, hideOnClick } = props
  const triggerRef = useRef(null)
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger
          className={className}
          asChild={asChild}
          onClick={(event) => {
            if (!hideOnClick) event.preventDefault()
          }}
          ref={triggerRef}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent
          onPointerDownOutside={(event) => {
            if (event.target === triggerRef.current && !hideOnClick)
              event.preventDefault()
          }}
        >
          {tooltipMessage}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

CommonTooltip.defaultProps = {
  hideOnClick: true,
}
