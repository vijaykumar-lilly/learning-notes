'use client'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} flex-shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background Circle with Gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="logoGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
          
          {/* Outer Circle */}
          <circle 
            cx="50" 
            cy="50" 
            r="48" 
            fill="url(#logoGradient)"
            className="dark:fill-[url(#logoGradientDark)]"
          />
          
          {/* Icon - Book with knowledge symbol */}
          <path
            d="M 25 30 L 25 75 L 50 70 L 75 75 L 75 30 L 50 35 Z"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Center line dividing pages */}
          <line x1="50" y1="35" x2="50" y2="70" stroke="white" strokeWidth="2" opacity="0.6" />

          {/* Knowledge sparkles */}
          <circle cx="38" cy="45" r="2" fill="white" opacity="0.9" />
          <circle cx="62" cy="45" r="2" fill="white" opacity="0.9" />
          <circle cx="38" cy="55" r="2" fill="white" opacity="0.9" />
          <circle cx="62" cy="55" r="2" fill="white" opacity="0.9" />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-gray-900 dark:text-white leading-tight ${textSizes[size]}`}>
            LearnHub
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
            Learn Anything
          </span>
        </div>
      )}
    </div>
  )
}
