'use client'

import { useState } from 'react'
import MathRenderer from '@/components/math/MathRenderer'

interface BalanceScaleProps {
  leftValue: number
  rightValue: number
  variable?: string
  showSolution?: boolean
  onBalance?: () => void
  label?: string
}

export default function BalanceScale({
  leftValue: initialLeft,
  rightValue: initialRight,
  variable = 'x',
  showSolution = false,
  onBalance,
  label
}: BalanceScaleProps) {
  const [leftValue, setLeftValue] = useState(initialLeft)
  const [rightValue, setRightValue] = useState(initialRight)
  const [operations, setOperations] = useState<string[]>([])

  const isBalanced = Math.abs(leftValue - rightValue) < 0.01
  const tiltAngle = isBalanced ? 0 : (leftValue - rightValue) / 10

  const applyOperation = (operation: string, value: number) => {
    switch (operation) {
      case 'add':
        setLeftValue(prev => prev + value)
        setRightValue(prev => prev + value)
        setOperations(prev => [...prev, `Added ${value} to both sides`])
        break
      case 'subtract':
        setLeftValue(prev => prev - value)
        setRightValue(prev => prev - value)
        setOperations(prev => [...prev, `Subtracted ${value} from both sides`])
        break
      case 'multiply':
        setLeftValue(prev => prev * value)
        setRightValue(prev => prev * value)
        setOperations(prev => [...prev, `Multiplied both sides by ${value}`])
        break
      case 'divide':
        if (value !== 0) {
          setLeftValue(prev => prev / value)
          setRightValue(prev => prev / value)
          setOperations(prev => [...prev, `Divided both sides by ${value}`])
        }
        break
    }

    if (onBalance && Math.abs((leftValue - rightValue)) < 0.01) {
      onBalance()
    }
  }

  const reset = () => {
    setLeftValue(initialLeft)
    setRightValue(initialRight)
    setOperations([])
  }

  return (
    <div className="my-6 p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
      {label && (
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">{label}</h3>
      )}

      {/* Balance Scale SVG */}
      <div className="flex justify-center mb-6">
        <svg width="500" height="300" viewBox="0 0 500 300" className="max-w-full">
          {/* Base */}
          <rect x="220" y="250" width="60" height="40" fill="#8b7355" />
          <polygon points="200,250 300,250 280,290 220,290" fill="#6b5344" />
          
          {/* Central Pole */}
          <rect x="245" y="100" width="10" height="150" fill="#999" />
          
          {/* Balance Beam */}
          <g style={{
            transform: `rotate(${tiltAngle}deg)`,
            transformOrigin: '250px 100px',
            transition: 'transform 0.5s ease-out'
          }}>
            <rect x="100" y="95" width="300" height="10" fill="#666" rx="2" />
            <circle cx="250" cy="100" r="8" fill="#444" />
            
            {/* Left Chain */}
            <line x1="130" y1="100" x2="130" y2="150" stroke="#888" strokeWidth="2" />
            <line x1="170" y1="100" x2="170" y2="150" stroke="#888" strokeWidth="2" />
            
            {/* Right Chain */}
            <line x1="330" y1="100" x2="330" y2="150" stroke="#888" strokeWidth="2" />
            <line x1="370" y1="100" x2="370" y2="150" stroke="#888" strokeWidth="2" />
            
            {/* Left Pan */}
            <ellipse cx="150" cy="150" rx="50" ry="8" fill="#d4af37" />
            <path d="M 100 150 Q 100 160 150 165 Q 200 160 200 150 Z" fill="#c4a030" />
            
            {/* Right Pan */}
            <ellipse cx="350" cy="150" rx="50" ry="8" fill="#d4af37" />
            <path d="M 300 150 Q 300 160 350 165 Q 400 160 400 150 Z" fill="#c4a030" />
          </g>
          
          {/* Left Value Display */}
          <rect x="110" y="180" width="80" height="40" fill="white" stroke="#333" strokeWidth="2" rx="4" />
          <text x="150" y="205" textAnchor="middle" className="text-xl font-bold fill-blue-600">
            {leftValue.toFixed(1)}
          </text>
          
          {/* Right Value Display */}
          <rect x="310" y="180" width="80" height="40" fill="white" stroke="#333" strokeWidth="2" rx="4" />
          <text x="350" y="205" textAnchor="middle" className="text-xl font-bold fill-purple-600">
            {rightValue.toFixed(1)}
          </text>
          
          {/* Balance Indicator */}
          {isBalanced && (
            <g>
              <circle cx="250" cy="50" r="30" fill="#22c55e" opacity="0.9" />
              <text x="250" y="60" textAnchor="middle" className="text-3xl fill-white">✓</text>
            </g>
          )}
        </svg>
      </div>

      {/* Status */}
      <div className="text-center mb-6">
        {isBalanced ? (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-semibold">
            <span className="text-xl">⚖️</span>
            Balanced!
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full">
            {leftValue > rightValue ? 'Left side heavier' : 'Right side heavier'}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <button
          onClick={() => applyOperation('add', 1)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          + 1 to both
        </button>
        <button
          onClick={() => applyOperation('subtract', 1)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
        >
          − 1 from both
        </button>
        <button
          onClick={() => applyOperation('multiply', 2)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
        >
          × 2 both
        </button>
        <button
          onClick={() => applyOperation('divide', 2)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
        >
          ÷ 2 both
        </button>
      </div>

      <button
        onClick={reset}
        className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
      >
        Reset
      </button>

      {/* Operation History */}
      {operations.length > 0 && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Operations Applied:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            {operations.map((op, idx) => (
              <li key={idx}>{op}</li>
            ))}
          </ol>
        </div>
      )}

      {showSolution && isBalanced && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg border-2 border-green-500">
          <p className="text-center font-bold text-green-700 dark:text-green-400">
            🎉 Great job! You balanced the equation!
          </p>
        </div>
      )}
    </div>
  )
}
