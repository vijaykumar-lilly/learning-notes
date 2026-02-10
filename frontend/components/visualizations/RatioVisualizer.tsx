'use client'

import { useState } from 'react'

interface RatioVisualizerProps {
  ratio1: number
  ratio2: number
  label1?: string
  label2?: string
  color1?: string
  color2?: string
  showScale?: boolean
}

export default function RatioVisualizer({ 
  ratio1, 
  ratio2,
  label1 = 'Part A',
  label2 = 'Part B',
  color1 = '#3b82f6',
  color2 = '#f59e0b',
  showScale = true
}: RatioVisualizerProps) {
  const [scale, setScale] = useState(1)
  
  const total = ratio1 + ratio2
  const scaledRatio1 = ratio1 * scale
  const scaledRatio2 = ratio2 * scale
  const scaledTotal = scaledRatio1 + scaledRatio2
  
  // Calculate GCD for simplified form
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
  const divisor = gcd(ratio1, ratio2)
  const simplified1 = ratio1 / divisor
  const simplified2 = ratio2 / divisor
  
  const renderBoxes = (count: number, color: string, label: string) => {
    return Array.from({ length: count }).map((_, i) => (
      <div
        key={`${label}-${i}`}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg shadow-md transition-all duration-300 hover:scale-110 flex items-center justify-center text-white font-bold text-sm"
        style={{ backgroundColor: color }}
      >
        {i + 1}
      </div>
    ))
  }

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Ratio Visualizer
        </h3>
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {scaledRatio1}:{scaledRatio2}
          {simplified1 !== ratio1 && (
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
              (simplified: {simplified1}:{simplified2})
            </span>
          )}
        </div>
      </div>

      {/* Visual Representation */}
      <div className="space-y-4 mb-6">
        {/* Part A */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-4 h-4 rounded" 
              style={{ backgroundColor: color1 }}
            />
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {label1}: {scaledRatio1}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {renderBoxes(scaledRatio1, color1, label1)}
          </div>
        </div>

        {/* Part B */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-4 h-4 rounded" 
              style={{ backgroundColor: color2 }}
            />
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {label2}: {scaledRatio2}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {renderBoxes(scaledRatio2, color2, label2)}
          </div>
        </div>
      </div>

      {/* Bar Representation */}
      <div className="mb-6">
        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Ratio Bar:
        </div>
        <div className="flex rounded-lg overflow-hidden shadow-md h-12">
          <div 
            className="flex items-center justify-center text-white font-bold transition-all duration-500"
            style={{ 
              backgroundColor: color1,
              width: `${(scaledRatio1 / scaledTotal) * 100}%`
            }}
          >
            {scaledRatio1}
          </div>
          <div 
            className="flex items-center justify-center text-white font-bold transition-all duration-500"
            style={{ 
              backgroundColor: color2,
              width: `${(scaledRatio2 / scaledTotal) * 100}%`
            }}
          >
            {scaledRatio2}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
          <span>{((scaledRatio1 / scaledTotal) * 100).toFixed(1)}%</span>
          <span>{((scaledRatio2 / scaledTotal) * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Interactive Scale Control */}
      {showScale && (
        <div className="border-t-2 border-blue-200 dark:border-blue-700 pt-4">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Scale the ratio (×{scale}):
          </div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="5"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
            />
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setScale(s)}
                  className={`w-8 h-8 rounded-lg font-bold transition-colors ${
                    scale === s
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Original ratio {ratio1}:{ratio2} scaled by {scale} = {scaledRatio1}:{scaledRatio2}
          </div>
        </div>
      )}

      {/* Insight */}
      <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-sm text-gray-700 dark:text-gray-300">
        <strong>💡 Notice:</strong> When you scale a ratio, the relationship stays the same! 
        {simplified1 !== ratio1 && ` The simplified form ${simplified1}:${simplified2} remains constant.`}
      </div>
    </div>
  )
}
