'use client'

import { useState, useEffect } from 'react'

interface IntegerNumberLineProps {
  min?: number
  max?: number
  start?: number
  operations?: Array<{ value: number; label: string }>
  showAnimation?: boolean
  label?: string
}

export default function IntegerNumberLine({
  min = -10,
  max = 10,
  start = 0,
  operations = [],
  showAnimation = true,
  label
}: IntegerNumberLineProps) {
  const [currentPosition, setCurrentPosition] = useState(start)
  const [currentStep, setCurrentStep] = useState(-1)

  useEffect(() => {
    if (showAnimation && operations.length > 0) {
      setCurrentPosition(start)
      setCurrentStep(-1)
      
      const timers: NodeJS.Timeout[] = []
      
      operations.forEach((op, index) => {
        const timer = setTimeout(() => {
          setCurrentPosition(prev => prev + op.value)
          setCurrentStep(index)
        }, (index + 1) * 1500)
        timers.push(timer)
      })
      
      return () => timers.forEach(clearTimeout)
    }
  }, [operations, start, showAnimation])

  const range = max - min
  const step = 600 / range
  const yPos = 100

  const getXPosition = (value: number) => {
    return ((value - min) / range) * 600
  }

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {label && (
        <p className="text-center font-semibold mb-3 text-gray-900 dark:text-gray-100">
          {label}
        </p>
      )}
      
      <svg width="650" height="200" viewBox="0 0 650 200" className="mx-auto">
        {/* Main line */}
        <line
          x1="20"
          y1={yPos}
          x2="620"
          y2={yPos}
          stroke="#374151"
          strokeWidth="2"
        />
        
        {/* Tick marks and labels */}
        {Array.from({ length: range + 1 }, (_, i) => {
          const value = min + i
          const x = getXPosition(value)
          const isZero = value === 0
          
          return (
            <g key={value}>
              <line
                x1={x + 20}
                y1={yPos - 10}
                x2={x + 20}
                y2={yPos + 10}
                stroke={isZero ? '#ef4444' : '#6b7280'}
                strokeWidth={isZero ? 3 : 2}
              />
              <text
                x={x + 20}
                y={yPos + 30}
                textAnchor="middle"
                className={`text-xs ${isZero ? 'fill-red-600 dark:fill-red-400 font-bold' : 'fill-gray-600 dark:fill-gray-400'}`}
              >
                {value}
              </text>
            </g>
          )
        })}
        
        {/* Current position marker */}
        <g style={{
          transform: `translateX(${getXPosition(currentPosition)}px)`,
          transition: 'transform 1s ease-in-out'
        }}>
          <circle
            cx="20"
            cy={yPos}
            r="8"
            fill="#3b82f6"
            stroke="#1e40af"
            strokeWidth="2"
          />
          <polygon
            points="20,55 10,70 30,70"
            fill="#3b82f6"
            className="transition-all duration-500"
          />
        </g>
        
        {/* Operation arrows */}
        {operations.map((op, index) => {
          if (index > currentStep) return null
          
          let startPos = start
          for (let i = 0; i < index; i++) {
            startPos += operations[i].value
          }
          
          const startX = getXPosition(startPos) + 20
          const endX = getXPosition(startPos + op.value) + 20
          const arrowY = yPos - 40
          const isPositive = op.value > 0
          
          return (
            <g key={index} style={{
              opacity: index === currentStep ? 1 : 0.5,
              transition: 'opacity 0.5s'
            }}>
              {/* Arrow line */}
              <line
                x1={startX}
                y1={arrowY}
                x2={endX}
                y2={arrowY}
                stroke={isPositive ? '#22c55e' : '#ef4444'}
                strokeWidth="2"
                markerEnd={`url(#arrow-${index})`}
              />
              
              {/* Arrow head marker */}
              <defs>
                <marker
                  id={`arrow-${index}`}
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path
                    d="M0,0 L0,6 L9,3 z"
                    fill={isPositive ? '#22c55e' : '#ef4444'}
                  />
                </marker>
              </defs>
              
              {/* Label */}
              <text
                x={(startX + endX) / 2}
                y={arrowY - 10}
                textAnchor="middle"
                className={`text-sm font-semibold ${isPositive ? 'fill-green-600 dark:fill-green-400' : 'fill-red-600 dark:fill-red-400'}`}
              >
                {op.label}
              </text>
            </g>
          )
        })}
      </svg>
      
      <div className="text-center mt-4 space-y-1">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Current position: <span className="font-bold text-blue-600 dark:text-blue-400">{currentPosition}</span>
        </p>
        {currentStep >= 0 && currentStep < operations.length && (
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Step {currentStep + 1}: {operations[currentStep].label}
          </p>
        )}
      </div>
    </div>
  )
}
