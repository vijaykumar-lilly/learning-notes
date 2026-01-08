'use client'

import { useState } from 'react'
import MathRenderer from '@/components/math/MathRenderer'
import FractionVisualizer from '@/components/visualizations/FractionVisualizer'

interface InteractiveFractionSliderProps {
  maxNumerator?: number
  maxDenominator?: number
  initialNumerator?: number
  initialDenominator?: number
  visualType?: 'circle' | 'bar'
  showDecimal?: boolean
  label?: string
}

export default function InteractiveFractionSlider({
  maxNumerator = 12,
  maxDenominator = 12,
  initialNumerator = 1,
  initialDenominator = 2,
  visualType = 'circle',
  showDecimal = true,
  label
}: InteractiveFractionSliderProps) {
  const [numerator, setNumerator] = useState(initialNumerator)
  const [denominator, setDenominator] = useState(initialDenominator)

  const decimalValue = denominator === 0 ? 0 : numerator / denominator
  const percentage = Math.round(decimalValue * 100)

  // Simplify fraction
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
  const commonDivisor = gcd(numerator, denominator)
  const simplifiedNum = numerator / commonDivisor
  const simplifiedDen = denominator / commonDivisor

  const isSimplified = simplifiedNum === numerator && simplifiedDen === denominator

  return (
    <div className="my-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
      {label && (
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">{label}</h3>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sliders */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Numerator (parts selected)
              </label>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {numerator}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={Math.min(maxNumerator, denominator)}
              value={numerator}
              onChange={(e) => setNumerator(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Denominator (total parts)
              </label>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {denominator}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max={maxDenominator}
              value={denominator}
              onChange={(e) => {
                const newDenom = Number(e.target.value)
                setDenominator(newDenom)
                if (numerator > newDenom) setNumerator(newDenom)
              }}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-600"
            />
          </div>

          {/* Fraction Display */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
            <div className="text-center space-y-3">
              <div className="text-5xl font-bold text-gray-900 dark:text-gray-100">
                <MathRenderer math={`\\frac{${numerator}}{${denominator}}`} />
              </div>
              
              {!isSimplified && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span>Simplified: </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    <MathRenderer math={`\\frac{${simplifiedNum}}{${simplifiedDen}}`} />
                  </span>
                </div>
              )}

              {showDecimal && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Decimal: <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                      {decimalValue.toFixed(4)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Percentage: <span className="font-bold text-gray-900 dark:text-gray-100">
                      {percentage}%
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="flex items-center justify-center">
          <FractionVisualizer
            numerator={numerator}
            denominator={denominator}
            type={visualType}
            interactive={true}
            label={`${numerator}/${denominator} = ${percentage}%`}
          />
        </div>
      </div>
    </div>
  )
}
