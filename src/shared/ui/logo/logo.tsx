import { FolderOpen } from '../icons'

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

const sizes = {
  sm: { icon: 20, text: 'text-lg' },
  md: { icon: 24, text: 'text-xl' },
  lg: { icon: 32, text: 'text-2xl' },
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const { icon, text } = sizes[size]

  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg bg-primary-600 p-2 text-white">
        <FolderOpen size={icon} />
      </div>
      {showText && (
        <span className={`font-bold text-secondary-900 ${text}`}>
          PromptBasket
        </span>
      )}
    </div>
  )
}
