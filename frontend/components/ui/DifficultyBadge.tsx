'use client'

import { cn } from '@/lib/utils'

type DifficultyLevel = 'easy' | 'medium' | 'hard'
type BadgeVariant = 'icon' | 'text' | 'full'

interface DifficultyBadgeProps {
  level: DifficultyLevel
  variant?: BadgeVariant
  className?: string
}

export default function DifficultyBadge({ 
  level, 
  variant = 'full',
  className 
}: DifficultyBadgeProps) {
  const configs = {
    easy: {
      icon: '🌤️',
      text: 'Warm-up',
      color: 'text-green-700 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-300 dark:border-green-700'
    },
    medium: {
      icon: '💪',
      text: 'Practice',
      color: 'text-blue-700 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      border: 'border-blue-300 dark:border-blue-700'
    },
    hard: {
      icon: '🚀',
      text: 'Challenge',
      color: 'text-purple-700 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/30',
      border: 'border-purple-300 dark:border-purple-700'
    }
  }
  
  const config = configs[level]
  
  if (variant === 'icon') {
    return (
      <span className={cn('text-xl', className)}>
        {config.icon}
      </span>
    )
  }
  
  if (variant === 'text') {
    return (
      <span className={cn('text-sm font-semibold', config.color, className)}>
        {config.text}
      </span>
    )
  }
  
  return (
    <span className={cn(
      'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border',
      config.color, config.bg, config.border,
      className
    )}>
      <span>{config.icon}</span>
      <span>{config.text}</span>
    </span>
  )
}
