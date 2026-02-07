import { SelectHTMLAttributes } from 'react'
import clsx from 'clsx'
import { inputBase } from '../../config/styles'

export interface DropdownOption {
  value: string
  label: string
}

export interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: DropdownOption[]
  placeholder?: string
}

export function Dropdown({
  options,
  placeholder,
  className,
  ...props
}: DropdownProps) {
  return (
    <select className={clsx(inputBase, 'cursor-pointer', className)} {...props}>
      {placeholder && (
        <option value="">{placeholder}</option>
      )}
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
