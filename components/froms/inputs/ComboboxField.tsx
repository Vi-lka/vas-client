import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import React from 'react'
import { useFormStatus } from 'react-dom';

type ComboboxFieldProps = {
  data: {
    value: string,
    label: string,
  }[],
  disabled: boolean | undefined,
  placeholder?: React.ReactNode,
  className?: string,
  onSelect: (value: string) => void
}

export default function ComboboxField({
  data, 
  disabled,
  placeholder,
  className, 
  onSelect,
}: ComboboxFieldProps) {
  const { pending } = useFormStatus();
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild  disabled={disabled || pending}>
        <Button
          disabled={disabled || pending}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full px-3 justify-between bg-input rounded-lg border-border shadow-sm font-normal', className)}
        >
          {value
            ? <p className='truncate min-w-0'>{data.find((item) => item.value === value)?.label}</p>
            : <span className='text-muted-foreground'>{placeholder}</span>
          }
          <CaretSortIcon className="ml-2 h-4 w-4 opacity-50 flex-none" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
        <Command>
          <CommandInput placeholder="Поиск..." disabled={disabled || pending} />
          <CommandList>
            <CommandEmpty>Не найдено</CommandEmpty>
            <CommandGroup>
              {data.map((item, indx) => (
                <CommandItem
                  key={indx}
                  disabled={disabled || pending}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    onSelect(currentValue)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4 flex-none",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
