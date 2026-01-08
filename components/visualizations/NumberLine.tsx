'use client'

interface NumberLineProps {
  min: number
  max: number
  value?: number
  highlights?: number[]
  labels?: boolean
}

export default function NumberLine({ 
  min, 
  max, 
  value, 
  highlights = [], 
  labels = true 
}: NumberLineProps) {
  const range = max - min
  const step = range <= 20 ? 1 : Math.ceil(range / 20)
  const ticks = []
  
  for (let i = min; i <= max; i += step) {
    ticks.push(i)
  }

  const getPosition = (num: number) => {
    return ((num - min) / range) * 100
  }

  return (
    <div className="my-6 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="relative h-20">
        {/* Main line */}
        <div className="absolute top-10 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600" />
        
        {/* Arrow */}
        <div className="absolute top-10 right-0 w-3 h-3 border-r-2 border-t-2 border-gray-300 dark:border-gray-600 transform rotate-45 translate-x-2 -translate-y-1" />
        
        {/* Ticks and labels */}
        {ticks.map((tick) => (
          <div
            key={tick}
            className="absolute"
            style={{ left: `${getPosition(tick)}%`, top: '40px' }}
          >
            <div className="w-0.5 h-4 bg-gray-400 dark:bg-gray-500 -translate-x-1/2" />
            {labels && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {tick}
              </div>
            )}
          </div>
        ))}
        
        {/* Highlighted points */}
        {highlights.map((point, idx) => (
          <div
            key={idx}
            className="absolute top-8"
            style={{ left: `${getPosition(point)}%` }}
          >
            <div className="w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full -translate-x-1/2 shadow-lg" />
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-blue-600 dark:text-blue-400">
              {point}
            </div>
          </div>
        ))}
        
        {/* Current value marker */}
        {value !== undefined && (
          <div
            className="absolute top-8 transition-all duration-300"
            style={{ left: `${getPosition(value)}%` }}
          >
            <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full -translate-x-1/2 shadow-lg animate-pulse" />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-purple-600 dark:bg-purple-500 text-white text-xs font-bold rounded">
              {value}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
