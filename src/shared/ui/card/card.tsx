import { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import { cardBase, cardHover } from '../../config/styles'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  children: ReactNode
}

export function Card({ hover = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        cardBase,
        hover && cardHover,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
