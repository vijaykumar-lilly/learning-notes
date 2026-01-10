'use client'

interface UnitRateDiagramProps {
  value: number
  unit: string
  icon?: 'speed' | 'money' | 'distance'
}

export function UnitRateDiagram({ value, unit, icon = 'speed' }: UnitRateDiagramProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'speed':
        return (
          <g>
            {/* Speedometer */}
            <circle cx="200" cy="100" r="50" fill="none" stroke="#3b82f6" strokeWidth="6" />
            <path d="M 200 100 L 230 80" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
            <circle cx="200" cy="100" r="8" fill="#f59e0b" />
          </g>
        )
      case 'money':
        return (
          <g>
            {/* Dollar sign */}
            <text x="200" y="120" textAnchor="middle" className="text-6xl font-bold fill-green-500">
              $
            </text>
          </g>
        )
      case 'distance':
        return (
          <g>
            {/* Road */}
            <rect x="150" y="90" width="100" height="20" fill="#gray-400" />
            <line x1="160" y1="100" x2="180" y2="100" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="220" y1="100" x2="240" y2="100" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
          </g>
        )
    }
  }

  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-sm mx-auto">
      {renderIcon()}
      
      {/* Value */}
      <text x="200" y="40" textAnchor="middle" className="text-3xl font-bold fill-blue-600 dark:fill-blue-400">
        {value}
      </text>
      
      {/* Unit */}
      <text x="200" y="170" textAnchor="middle" className="text-lg font-semibold fill-gray-700 dark:fill-gray-300">
        {unit}
      </text>
      
      {/* "per 1" indicator */}
      <text x="200" y="190" textAnchor="middle" className="text-xs fill-gray-500 dark:fill-gray-400">
        per 1 unit
      </text>
    </svg>
  )
}
