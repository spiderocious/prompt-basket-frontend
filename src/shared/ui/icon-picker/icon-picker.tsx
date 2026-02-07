import { Check } from '../icons'
import * as Icons from '../icons'
import clsx from 'clsx'

const ICON_OPTIONS = [
  'Folder',
  'FolderOpen',
  'FileText',
  'Tag',
  'Hash',
  'Home',
  'Calendar',
  'Clock',
  'Settings',
] as const

type IconName = typeof ICON_OPTIONS[number]

export interface IconPickerProps {
  value: string
  onChange: (icon: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-secondary-700">Icon</label>
      <div className="grid grid-cols-5 gap-2">
        {ICON_OPTIONS.map(iconName => {
          const IconComponent = Icons[iconName as keyof typeof Icons] as React.ElementType
          const isSelected = value === iconName

          return (
            <button
              key={iconName}
              type="button"
              onClick={() => onChange(iconName)}
              className={clsx(
                'relative flex h-12 w-12 items-center justify-center rounded-lg border-2 transition-all',
                'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500',
                isSelected
                  ? 'border-primary-500 bg-primary-50 text-primary-600'
                  : 'border-secondary-200 text-secondary-600 hover:border-secondary-300'
              )}
              aria-label={`Select ${iconName} icon`}
            >
              <IconComponent size={20} />
              {isSelected && (
                <Check
                  size={14}
                  className="absolute -right-1 -top-1 rounded-full bg-primary-500 p-0.5 text-white"
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
