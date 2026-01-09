'use client'

import { useState } from 'react'

interface InteractivePercentageSliderProps {
  maxValue?: number
  showAllFormats?: boolean
}

export default function InteractivePercentageSlider({ 
  maxValue = 100,
  showAllFormats = true 
}: InteractivePercentageSliderProps) {
  const [percentage, setPercentage] = useState(50)
  
  const decimal = percentage / 100
  const fraction = `${percentage}/100`
  
  // Simplify fraction
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
  const divisor = gcd(percentage, 100)
  const simplifiedFraction = divisor > 1 ? `${percentage / divisor}/${100 / divisor}` : fraction
  
  const renderCircle = () => {
    const radius = 60
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
    
    return (
      <div className="relative">
        <svg width="140" height="140" viewBox="0 0 140 140" className="transform -rotate-90">
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="20"
            className="dark:stroke-gray-700"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="20"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-300 dark:stroke-purple-400"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {percentage}%
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="my-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border-2 border-indigo-200 dark:border-indigo-800">
      <h4 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-4">
        🎮 Interactive: Percentage ↔ Decimal ↔ Fraction Converter
      </h4>
      
      {/* Main Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Circle Visualization */}
        <div className="flex justify-center">
          {renderCircle()}
        </div>
        
        {/* Conversions */}
        <div className="col-span-2 flex flex-col justify-center space-y-4">
          <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <div className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-1">
              Percentage
            </div>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
              {percentage}%
            </div>
          </div>
          
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <div className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
              Decimal
            </div>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 font-mono">
              {decimal.toFixed(2)}
            </div>
          </div>
          
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <div className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">
              Fraction
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {simplifiedFraction !== fraction ? (
                <>
                  <span className="font-mono">{simplifiedFraction}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    (= {fraction})
                  </span>
                </>
              ) : (
                <span className="font-mono">{fraction}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Slider */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Adjust Percentage: {percentage}%
        </label>
        <input
          type="range"
          min="0"
          max={maxValue}
          step="1"
          value={percentage}
          onChange={(e) => setPercentage(parseInt(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
      
      {/* Grid Visualization */}
      <div className="flex justify-center mb-4">
        <div className="inline-grid grid-cols-10 gap-1 p-3 bg-white dark:bg-gray-800 rounded-lg">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-sm transition-colors duration-75 ${
                i < percentage
                  ? 'bg-purple-500 dark:bg-purple-400'
                  : 'bg-gray-200 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
      
      {showAllFormats && (
        <>
          {/* Quick Reference */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-center">
              <div className="font-bold">25%</div>
              <div className="text-gray-600 dark:text-gray-400">= 0.25 = 1/4</div>
            </div>
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-center">
              <div className="font-bold">50%</div>
              <div className="text-gray-600 dark:text-gray-400">= 0.5 = 1/2</div>
            </div>
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-center">
              <div className="font-bold">75%</div>
              <div className="text-gray-600 dark:text-gray-400">= 0.75 = 3/4</div>
            </div>
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-center">
              <div className="font-bold">100%</div>
              <div className="text-gray-600 dark:text-gray-400">= 1.0 = 1/1</div>
            </div>
          </div>
          
          {/* Conversion Formulas */}
          <div className="mt-4 p-3 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-lg text-sm">
            <div className="font-semibold mb-2">📐 Conversion Formulas:</div>
            <div className="space-y-1 text-xs">
              <div>• Percent → Decimal: <span className="font-mono">Divide by 100</span> ({percentage}% ÷ 100 = {decimal})</div>
              <div>• Decimal → Percent: <span className="font-mono">Multiply by 100</span> ({decimal} × 100 = {percentage}%)</div>
              <div>• Percent → Fraction: <span className="font-mono">Put over 100 & simplify</span> ({percentage}/100 = {simplifiedFraction})</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
