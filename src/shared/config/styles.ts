export const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

export const buttonVariants = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md',
  secondary:
    'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 active:bg-secondary-300',
  ghost:
    'bg-transparent text-secondary-700 hover:bg-secondary-100 active:bg-secondary-200',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm hover:shadow-md',
}

export const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export const inputBase =
  'w-full rounded-lg border border-secondary-300 bg-white px-4 py-2 text-secondary-900 placeholder-secondary-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:bg-secondary-50 disabled:cursor-not-allowed'

export const cardBase =
  'rounded-lg border border-secondary-200 bg-white shadow-sm transition-all duration-200'

export const cardHover =
  'hover:shadow-md hover:border-primary-200 cursor-pointer'
