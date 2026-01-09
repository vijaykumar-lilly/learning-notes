'use client'

import { useState } from 'react'

interface DecimalVisualizerProps {
  value: number
  showGrid?: boolean
  type?: 'bar' | 'blocks' | 'money'
}

export default function DecimalVisualizer({ 
  value, 
  showGrid = true,
  type = 'bar'
}: DecimalVisualizerProps) {
  const wholePart = Math.floor(value)
  const decimalPart = value - wholePart
  const cents = Math.round(decimalPart * 100)
  
  const renderBar = () => {
    const totalBars = wholePart + 1
    const bars = []
    
    for (let i = 0; i < totalBars; i++) {
      const isWhole = i < wholePart
      const fillPercentage = isWhole ? 100 : decimalPart * 100
      
      bars.push(
        <div key={i} className="flex flex-col items-center">
          <div className="w-20 h-40 border-2 border-blue-500 dark:border-blue-400 rounded relative overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div 
              className="absolute bottom-0 w-full bg-blue-500 dark:bg-blue-400 transition-all duration-500"
              style={{ height: `${fillPercentage}%` }}
            />
            {/* Grid lines for tenths */}
            {showGrid && (
              <>
                {[...Array(10)].map((_, idx) => (
                  <div
                    key={idx}
                    className="absolute w-full border-t border-gray-300 dark:border-gray-600"
                    style={{ bottom: `${(idx + 1) * 10}%` }}
                  />
                ))}
              </>
            )}
          </div>
          <span className="text-sm mt-1 font-semibold">{isWhole ? '1' : decimalPart.toFixed(2)}</span>
        </div>
      )
    }
    
    return <div className="flex gap-4">{bars}</div>
  }
  
  const renderBlocks = () => {
    const blocks = []
    
    // Whole number blocks (each is 10x10 grid)
    for (let w = 0; w < wholePart; w++) {
      blocks.push(
        <div key={`whole-${w}`} className="inline-block">
          <div className="grid grid-cols-10 gap-0.5 w-24 h-24 p-1 bg-green-200 dark:bg-green-800 rounded">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="bg-green-500 dark:bg-green-400 rounded-sm"
              />
            ))}
          </div>
        </div>
      )
    }
    
    // Decimal part (tenths and hundredths)
    if (decimalPart > 0) {
      const tenths = Math.floor(decimalPart * 10)
      const hundredths = Math.round((decimalPart * 100) % 10)
      
      blocks.push(
        <div key="decimal" className="inline-block">
          <div className="grid grid-cols-10 gap-0.5 w-24 h-24 p-1 bg-blue-200 dark:bg-blue-800 rounded">
            {[...Array(100)].map((_, i) => {
              const row = Math.floor(i / 10)
              const col = i % 10
              const filled = row < tenths || (row === tenths && col < hundredths)
              
              return (
                <div
                  key={i}
                  className={`rounded-sm transition-colors ${
                    filled 
                      ? 'bg-blue-500 dark:bg-blue-400' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                />
              )
            })}
          </div>
        </div>
      )
    }
    
    return <div className="flex gap-4 flex-wrap">{blocks}</div>
  }
  
  const renderMoney = () => {
    const dollars = wholePart
    const cents = Math.round(decimalPart * 100)
    
    return (
      <div className="flex gap-6 items-start">
        {/* Dollar bills */}
        {dollars > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">Dollars</span>
            <div className="flex gap-2 flex-wrap">
              {[...Array(Math.min(dollars, 10))].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 border-2 border-green-600 dark:border-green-400 rounded flex items-center justify-center"
                >
                  <span className="text-lg font-bold text-green-700 dark:text-green-300">$1</span>
                </div>
              ))}
              {dollars > 10 && (
                <div className="text-sm text-gray-600 dark:text-gray-400 self-center">
                  +{dollars - 10} more
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Coins */}
        {cents > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">Cents</span>
            <div className="flex gap-2 flex-wrap">
              {/* Quarters (25¢) */}
              {[...Array(Math.floor(cents / 25))].map((_, i) => (
                <div
                  key={`q${i}`}
                  className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 border-2 border-gray-400 dark:border-gray-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-xs font-bold">25¢</span>
                </div>
              ))}
              {/* Dimes (10¢) */}
              {[...Array(Math.floor((cents % 25) / 10))].map((_, i) => (
                <div
                  key={`d${i}`}
                  className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-500 dark:to-gray-600 border-2 border-gray-500 dark:border-gray-400 rounded-full flex items-center justify-center"
                >
                  <span className="text-xs font-bold">10¢</span>
                </div>
              ))}
              {/* Pennies (1¢) */}
              {[...Array(cents % 10)].map((_, i) => (
                <div
                  key={`p${i}`}
                  className="w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-700 rounded-full flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-white">1¢</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="my-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold text-purple-900 dark:text-purple-200">
          Decimal Visualization: {value.toFixed(2)}
        </h4>
      </div>
      
      <div className="flex justify-center">
        {type === 'bar' && renderBar()}
        {type === 'blocks' && renderBlocks()}
        {type === 'money' && renderMoney()}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        {type === 'bar' && 'Each bar represents 1 whole. Tenths are shown as grid lines.'}
        {type === 'blocks' && 'Green = whole numbers, Blue = decimal part (100 small squares = 1 whole)'}
        {type === 'money' && `$${value.toFixed(2)} = ${wholePart} dollar${wholePart !== 1 ? 's' : ''} and ${cents} cent${cents !== 1 ? 's' : ''}`}
      </div>
    </div>
  )
}
