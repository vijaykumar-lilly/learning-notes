'use client'

import { useState } from 'react'

interface PercentageVisualizerProps {
  percentage: number
  total?: number
  type?: 'pie' | 'bar' | 'grid' | 'money'
  showLabels?: boolean
}

export default function PercentageVisualizer({ 
  percentage, 
  total = 100,
  type = 'pie',
  showLabels = true 
}: PercentageVisualizerProps) {
  const clampedPercentage = Math.max(0, Math.min(100, percentage))
  const value = (clampedPercentage / 100) * total
  
  const renderPie = () => {
    // SVG pie chart
    const radius = 80
    const circumference = 2 * Math.PI * radius
    const fillPercentage = clampedPercentage
    const strokeDasharray = `${(fillPercentage / 100) * circumference} ${circumference}`
    
    return (
      <div className="flex flex-col items-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="40"
            className="dark:stroke-gray-700"
          />
          {/* Percentage circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="40"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">
            {clampedPercentage}%
          </span>
        </div>
      </div>
    )
  }
  
  const renderBar = () => {
    return (
      <div className="w-full">
        <div className="relative h-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 flex items-center justify-end pr-4"
            style={{ width: `${clampedPercentage}%` }}
          >
            {clampedPercentage > 15 && (
              <span className="text-white font-bold text-lg">{clampedPercentage}%</span>
            )}
          </div>
          {clampedPercentage <= 15 && (
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-gray-600 dark:text-gray-300">
              {clampedPercentage}%
            </span>
          )}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    )
  }
  
  const renderGrid = () => {
    const filled = Math.round(clampedPercentage)
    
    return (
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-10 gap-1 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-sm transition-all duration-100 ${
                i < filled
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              style={{ transitionDelay: `${i * 5}ms` }}
            />
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {filled} out of 100 squares = {clampedPercentage}%
        </p>
      </div>
    )
  }
  
  const renderMoney = () => {
    const dollars = Math.floor(value)
    const cents = Math.round((value - dollars) * 100)
    
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {clampedPercentage}% of ${total.toFixed(2)}
          </p>
          <p className="text-5xl font-bold text-green-600 dark:text-green-400">
            ${value.toFixed(2)}
          </p>
        </div>
        
        <div className="w-full max-w-md">
          <div className="relative h-12 bg-gray-200 dark:bg-gray-700 rounded">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 dark:bg-green-600 transition-all duration-500 rounded"
              style={{ width: `${clampedPercentage}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-between px-4 text-sm">
              <span className="font-semibold text-white z-10">
                ${value.toFixed(2)}
              </span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                ${(total - value).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Paid</span>
            <span>Remaining</span>
          </div>
        </div>
        
        {/* Visual bills/coins representation for small amounts */}
        {total <= 20 && (
          <div className="flex gap-2 flex-wrap justify-center">
            {[...Array(Math.min(Math.floor(value), 10))].map((_, i) => (
              <div
                key={i}
                className="w-12 h-8 bg-gradient-to-br from-green-400 to-green-600 border-2 border-green-700 rounded flex items-center justify-center text-xs font-bold text-white"
              >
                $1
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="my-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
      {showLabels && (
        <div className="text-center mb-4">
          <h4 className="text-lg font-bold text-purple-900 dark:text-purple-200">
            {type === 'money' ? 'Percentage of Money' : 'Percentage Visualization'}: {clampedPercentage}%
          </h4>
          {type !== 'money' && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {value.toFixed(1)} out of {total}
            </p>
          )}
        </div>
      )}
      
      <div className="flex justify-center items-center min-h-[200px]">
        {type === 'pie' && renderPie()}
        {type === 'bar' && renderBar()}
        {type === 'grid' && renderGrid()}
        {type === 'money' && renderMoney()}
      </div>
      
      <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded text-center text-sm">
        <div className="font-semibold mb-1">Conversions:</div>
        <div className="flex gap-4 justify-center flex-wrap">
          <span>Decimal: <span className="font-mono font-bold">{(clampedPercentage / 100).toFixed(2)}</span></span>
          <span>Fraction: <span className="font-mono font-bold">{clampedPercentage}/100</span></span>
        </div>
      </div>
    </div>
  )
}
