export const colors = {
  primary: '#4F46E5',
  secondary: '#6B7280',
  accent: '#FBBF24',
  background: '#FFFFFF',
  text: '#111827',
} as const

export type ColorKey = keyof typeof colors
