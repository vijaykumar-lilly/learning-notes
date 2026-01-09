'use client'

import { useState } from 'react'

interface InteractiveDecimalSliderProps {
  maxValue?: number
  step?: number
  showVisualization?: boolean
}

export default function InteractiveDecimalSlider({ 
  maxValue = 5,
  step = 0.1,
  showVisualization = true 
}: InteractiveDecimalSliderProps) {
  const [value, setValue] = useState(1.5)
  
  const wholePart = Math.floor(value)
  const decimalPart = value - wholePart
  const tenths = Math.floor(decimalPart * 10)
  const hundredths = Math.round((decimalPart * 100) % 10)

  return (
    <div className="my-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border-2 border-indigo-200 dark:border-indigo-800">
      <h4 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-4">
        🎮 Interactive: Explore Decimals with Sliders
      </h4>
      
      {/* Value Display */}
      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">
          {value.toFixed(2)}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {wholePart} whole + {tenths} tenths + {hundredths} hundredths
        </div>
      </div>
      
      {/* Main Slider */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">
          Decimal Value: {value.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max={maxValue}
          step={step}
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>{maxValue / 2}</span>
          <span>{maxValue}</span>
        </div>
      </div>
      
      {/* Visual Representation */}
      {showVisualization && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Number Line */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-xs font-semibold mb-2">Number Line</div>
            <div className="relative h-12">
              <div className="absolute top-1/2 w-full h-0.5 bg-gray-300 dark:bg-gray-600" />
              {[...Array(Math.ceil(maxValue) + 1)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 transform -translate-y-1/2"
                  style={{ left: `${(i / maxValue) * 100}%` }}
                >
                  <div className="w-0.5 h-4 bg-gray-400 dark:bg-gray-500 -ml-px" />
                  <div className="text-xs mt-1 -ml-2">{i}</div>
                </div>
              ))}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-full border-2 border-white dark:border-gray-900 shadow-lg transition-all duration-200"
                style={{ left: `${(value / maxValue) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Grid Blocks */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-xs font-semibold mb-2">Grid Model</div>
            <div className="flex gap-2">
              {/* Whole parts */}
              {[...Array(wholePart)].map((_, i) => (
                <div
                  key={`whole-${i}`}
                  className="w-12 h-12 bg-indigo-500 dark:bg-indigo-400 rounded"
                />
              ))}
              
              {/* Decimal part */}
              {decimalPart > 0 && (
                <div className="grid grid-cols-10 gap-px w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded overflow-hidden">
                  {[...Array(100)].map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        i < Math.round(decimalPart * 100)
                          ? 'bg-indigo-300 dark:bg-indigo-600'
                          : 'bg-white dark:bg-gray-800'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Place Value Breakdown */}
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded">
          <div className="font-bold text-green-700 dark:text-green-400">{wholePart}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Ones</div>
        </div>
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded">
          <div className="font-bold text-blue-700 dark:text-blue-400">{tenths}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Tenths</div>
        </div>
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded">
          <div className="font-bold text-purple-700 dark:text-purple-400">{hundredths}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Hundredths</div>
        </div>
      </div>
      
      {/* Conversion Info */}
      <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm">
        <div className="font-semibold mb-1">Conversions:</div>
        <div className="grid grid-cols-2 gap-2">
          <div>As Fraction: <span className="font-mono">{wholePart} {tenths}/{10}</span></div>
          <div>As Percentage: <span className="font-mono">{(value * 100).toFixed(0)}%</span></div>
        </div>
      </div>
    </div>
  )
}
