import { Loader2 } from '../icons'

export interface LoadingProps {
  size?: number
  className?: string
}

export function Loading({ size = 24, className }: LoadingProps) {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 size={size} className={`animate-spin text-primary-600 ${className || ''}`} />
    </div>
  )
}

export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <Loading size={32} />
    </div>
  )
}
