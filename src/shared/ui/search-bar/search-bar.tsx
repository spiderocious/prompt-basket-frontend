import { InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import { Search, X } from '../icons'
import { inputBase } from '../../config/styles'

export interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void
}

export function SearchBar({
  value,
  onClear,
  className,
  placeholder = 'Search...',
  ...props
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400">
        <Search size={20} />
      </div>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className={clsx(inputBase, 'pl-10 pr-10', className)}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}
