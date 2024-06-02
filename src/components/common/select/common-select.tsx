import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui'

type Items = {
  label?: string
  items: string[]
}

type Props = {
  className?: string
  placeholder?: string
  onValueChange?: (value: string) => void
  defaultValue: string
  contents: Items[]
}

export function CommonSelect(props: Props) {
  const { className, placeholder, contents, onValueChange, defaultValue } =
    props
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      {/* set a common max height for dropdown */}
      <SelectContent>
        <SelectGroup>
          {contents.map((content) => {
            return (
              <>
                {content.label && <SelectLabel>{content.label}</SelectLabel>}
                {content.items.map((item) => {
                  return (
                    <SelectItem
                      className="cursor-pointer"
                      value={item.toLowerCase()}
                    >
                      {item}
                    </SelectItem>
                  )
                })}
              </>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
