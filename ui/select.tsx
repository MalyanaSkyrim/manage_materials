import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import React from 'react'
import classNames from '../utils/classNames'

interface SelectItem {
  value: string
  key: string
  disabled?: boolean
}

interface Props {
  items: SelectItem[]
  defaultValue: string
  onValueChange: (value: string) => void
}

const Select = ({ items, defaultValue, onValueChange }: Props) => {
  return (
    <SelectPrimitive.Root
      defaultValue={defaultValue}
      onValueChange={onValueChange}>
      <SelectPrimitive.Trigger asChild aria-label="Food">
        <button className="flex space-x-1 items-center bg-brand text-gray-300 py-2 px-4 rounded-md shadow">
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className="ml-2">
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </button>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content>
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-300">
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="bg-brand p-2 rounded-md shadow-lg">
          <SelectPrimitive.Group>
            {items.map((item, index) => (
              <SelectPrimitive.Item
                disabled={item.disabled}
                key={item.key}
                value={item.key}
                className={classNames(
                  'relative z-50 flex items-center px-8 py-2 rounded text-sm text-gray-300 font-medium focus:bg-gray-800',
                  'radix-disabled:opacity-50',
                  'focus:outline-none select-none',
                )}>
                <SelectPrimitive.ItemText>
                  {item.value}
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-300">
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}

export default Select
