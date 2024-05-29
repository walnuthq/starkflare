import { Label } from '@/components/ui'
import { cn } from '@/lib/utils'
import React from 'react'

type BaseProps = {
  adornment?: {
    left?: React.ReactNode
    right?: React.ReactNode
  }
  error?: string
}

type LabelProps =
  | {
      label: string
      id: string
      labelposition: 'top' | 'bottom' | 'inline'
    }
  | {
      label?: never
      id?: string
      labelposition?: never
    }

type InputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  LabelProps

const InputExtended = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, adornment, disabled, error, required, ...props },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'flex',
          props.labelposition !== 'inline' && 'flex-col',
          'gap-3 w-full',
        )}
      >
        {props.label &&
          (props.labelposition === 'top' ||
            props.labelposition === 'inline') && (
            <Label
              htmlFor={props.id}
              className={cn(
                'flex font-normal',
                props.labelposition === 'inline' ? 'mt-2' : 'items-center',
              )}
            >
              {props.label}
            </Label>
          )}
        <div className="flex flex-col gap-3 flex-grow">
          <div
            className={cn(
              'flex h-8 items-center text-sm flex-grow rounded-lg border border-input ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1',
              disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
              error && 'border-red-500',
            )}
          >
            {adornment && adornment.left && (
              <div className="ml-3 flex-none flex items-center">
                {adornment.left}
              </div>
            )}
            <input
              required={required}
              type={type}
              className={cn(
                'min-w-0 flex px-3 py-2 flex-grow bg-transparent w-full h-full focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground',
                className,
              )}
              disabled={disabled}
              ref={ref}
              {...props}
            />
            {adornment && adornment.right && (
              <div className="mr-3 flex items-center flex-none">
                {adornment.right}
              </div>
            )}
          </div>
          {error && <p className="text-xs -mt-1 text-red-500">{error}</p>}
        </div>
        {props.label && props.labelposition === 'bottom' && (
          <Label htmlFor={props.id} className="flex items-center">
            {props.label}
          </Label>
        )}
      </div>
    )
  },
)
InputExtended.displayName = 'InputExtended'

export { InputExtended }
