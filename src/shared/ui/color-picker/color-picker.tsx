import { Check } from '../icons'
import clsx from 'clsx'

const COLORS = [
  '#EF4444', // Red
  '#F59E0B', // Amber
  '#FBBF24', // Yellow
  '#10B981', // Green
  '#3B82F6', // Blue
  '#6366F1', // Indigo
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#6B7280', // Gray
  '#14B8A6', // Teal
]

export interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-secondary-700">Color</label>
      <div className="grid grid-cols-5 gap-2">
        {COLORS.map(color => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={clsx(
              'relative h-10 w-10 rounded-lg transition-all hover:scale-110',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
            )}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          >
            {value === color && (
              <Check size={20} className="absolute inset-0 m-auto text-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
