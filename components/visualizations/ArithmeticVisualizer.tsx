'use client'

import { useState, useEffect } from 'react'

interface ArithmeticVisualizerProps {
  operation: 'addition' | 'subtraction' | 'multiplication' | 'division'
  num1: number
  num2: number
  animated?: boolean
  label?: string
  itemType?: 'dots' | 'apples' | 'cookies' | 'stars' | 'circles'
}

export default function ArithmeticVisualizer({
  operation,
  num1,
  num2,
  animated = true,
  label,
  itemType = 'dots'
}: ArithmeticVisualizerProps) {
  const [step, setStep] = useState(0)

  const getItemEmoji = (type: string) => {
    const emojis: Record<string, string> = {
      apples: '🍎',
      cookies: '🍪',
      stars: '⭐',
      circles: '⚫',
      dots: '•'
    }
    return emojis[type] || '•'
  }

  useEffect(() => {
    if (animated) {
      const timer = setInterval(() => {
        setStep(prev => prev < 2 ? prev + 1 : prev)
      }, 800)
      return () => clearInterval(timer)
    } else {
      setStep(2)
    }
  }, [animated])

  const renderItems = (count: number, color: string, startX: number, startY: number) => {
    const items = []
    const itemsPerRow = Math.min(count, 10)
    const rows = Math.ceil(count / itemsPerRow)
    
    if (itemType === 'dots') {
      // Render as SVG circles
      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / itemsPerRow)
        const col = i % itemsPerRow
        items.push(
          <circle
            key={i}
            cx={startX + col * 25}
            cy={startY + row * 25}
            r="8"
            fill={color}
            className="transition-all duration-500"
            style={{
              opacity: step >= 1 ? 1 : 0,
              transform: step >= 1 ? 'scale(1)' : 'scale(0)',
            }}
          />
        )
      }
    } else {
      // Render as emoji
      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / itemsPerRow)
        const col = i % itemsPerRow
        items.push(
          <text
            key={i}
            x={startX + col * 30}
            y={startY + row * 30}
            fontSize="24"
            className="transition-all duration-500"
            style={{
              opacity: step >= 1 ? 1 : 0,
              transform: step >= 1 ? 'scale(1)' : 'scale(0)',
            }}
          >
            {getItemEmoji(itemType)}
          </text>
        )
      }
    }
    return items
  }

  const renderAddition = () => {
    return (
      <svg width="450" height="200" viewBox="0 0 450 200" className="mx-auto">
        {/* First group */}
        <g>{renderItems(num1, '#3b82f6', 20, 50)}</g>
        
        {/* Plus sign */}
        <text x="200" y="100" className="text-4xl font-bold fill-gray-700 dark:fill-gray-300">+</text>
        
        {/* Second group */}
        <g>{renderItems(num2, '#22c55e', 250, 50)}</g>
        
        {/* Equals and result */}
        {step >= 2 && (
          <>
            <text x="170" y="180" className="text-2xl font-bold fill-gray-700 dark:fill-gray-300">=</text>
            <text x="210" y="185" className="text-3xl font-bold fill-blue-600 dark:fill-blue-400">
              {num1 + num2}
            </text>
          </>
        )}
      </svg>
    )
  }

  const renderSubtraction = () => {
    const spacing = itemType === 'dots' ? 25 : 30
    return (
      <svg width="450" height="200" viewBox="0 0 450 200" className="mx-auto">
        {/* Initial group */}
        <g>
          {renderItems(num1, '#3b82f6', 20, 50).map((item, i) => {
            const shouldCrossOut = i >= (num1 - num2)
            const itemsPerRow = Math.min(num1, 10)
            return (
              <g key={i}>
                {item}
                {shouldCrossOut && step >= 1 && (
                  <line
                    x1={20 + (i % itemsPerRow) * spacing - 12}
                    y1={50 + Math.floor(i / itemsPerRow) * spacing - 12}
                    x2={20 + (i % itemsPerRow) * spacing + 12}
                    y2={50 + Math.floor(i / itemsPerRow) * spacing + 12}
                    stroke="#ef4444"
                    strokeWidth="3"
                    className="transition-all duration-500"
                  />
                )}
              </g>
            )
          })}
        </g>
        
        {/* Minus sign */}
        <text x="180" y="100" className="text-4xl font-bold fill-gray-700 dark:fill-gray-300">−</text>
        
        {/* Number being subtracted */}
        <text x="220" y="105" className="text-3xl font-bold fill-red-600 dark:fill-red-400">{num2}</text>
        
        {/* Result */}
        {step >= 2 && (
          <>
            <text x="170" y="180" className="text-2xl font-bold fill-gray-700 dark:fill-gray-300">=</text>
            <text x="210" y="185" className="text-3xl font-bold fill-blue-600 dark:fill-blue-400">
              {num1 - num2}
            </text>
          </>
        )}
      </svg>
    )
  }

  const renderMultiplication = () => {
    const items = []
    const spacing = itemType === 'dots' ? 25 : 30
    for (let row = 0; row < num2; row++) {
      for (let col = 0; col < num1; col++) {
        if (itemType === 'dots') {
          items.push(
            <circle
              key={`${row}-${col}`}
              cx={50 + col * spacing}
              cy={50 + row * spacing}
              r="8"
              fill="#3b82f6"
              className="transition-all duration-500"
              style={{
                opacity: step >= 1 && row <= step ? 1 : 0.2,
                transform: step >= 1 && row <= step ? 'scale(1)' : 'scale(0.5)',
              }}
            />
          )
        } else {
          items.push(
            <text
              key={`${row}-${col}`}
              x={50 + col * spacing}
              y={50 + row * spacing}
              fontSize="24"
              className="transition-all duration-500"
              style={{
                opacity: step >= 1 && row <= step ? 1 : 0.2,
                transform: step >= 1 && row <= step ? 'scale(1)' : 'scale(0.5)',
              }}
            >
              {getItemEmoji(itemType)}
            </text>
          )
        }
      }
    }
    
    return (
      <svg width="400" height="250" viewBox="0 0 400 250" className="mx-auto">
        <g>{items}</g>
        
        <text x="20" y="30" className="text-sm fill-gray-600 dark:fill-gray-400">
          {num2} rows × {num1} columns
        </text>
        
        {step >= 2 && (
          <text x="150" y="220" className="text-2xl font-bold fill-blue-600 dark:fill-blue-400">
            {num1} × {num2} = {num1 * num2}
          </text>
        )}
      </svg>
    )
  }

  const renderDivision = () => {
    const groupSize = num2
    const groups = Math.floor(num1 / num2)
    const remainder = num1 % num2
    const spacing = itemType === 'dots' ? 18 : 25
    
    return (
      <svg width="500" height="250" viewBox="0 0 500 250" className="mx-auto">
        {/* Draw groups */}
        {Array.from({ length: groups }).map((_, groupIdx) => (
          <g key={groupIdx}>
            {/* Group box */}
            <rect
              x={20 + groupIdx * 100}
              y={50}
              width={80}
              height={80}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="transition-all duration-500"
              style={{
                opacity: step >= 1 ? 1 : 0
              }}
            />
            {/* Items in group */}
            {Array.from({ length: groupSize }).map((_, itemIdx) => {
              if (itemType === 'dots') {
                return (
                  <circle
                    key={itemIdx}
                    cx={30 + groupIdx * 100 + (itemIdx % 4) * spacing}
                    cy={60 + Math.floor(itemIdx / 4) * spacing}
                    r="6"
                    fill="#3b82f6"
                    className="transition-all duration-500"
                    style={{
                      opacity: step >= 1 ? 1 : 0.3,
                    }}
                  />
                )
              } else {
                return (
                  <text
                    key={itemIdx}
                    x={25 + groupIdx * 100 + (itemIdx % 3) * spacing}
                    y={65 + Math.floor(itemIdx / 3) * spacing}
                    fontSize="20"
                    className="transition-all duration-500"
                    style={{
                      opacity: step >= 1 ? 1 : 0.3,
                    }}
                  >
                    {getItemEmoji(itemType)}
                  </text>
                )
              }
            })}
          </g>
        ))}
        
        {/* Remainder items */}
        {remainder > 0 && step >= 1 && (
          <g>
            <text x={20 + groups * 100} y="75" className="text-sm fill-gray-600 dark:fill-gray-400">
              remainder
            </text>
            {Array.from({ length: remainder }).map((_, i) => {
              if (itemType === 'dots') {
                return (
                  <circle
                    key={i}
                    cx={20 + groups * 100 + i * spacing}
                    cy={95}
                    r="6"
                    fill="#ef4444"
                  />
                )
              } else {
                return (
                  <text
                    key={i}
                    x={20 + groups * 100 + i * spacing}
                    y={100}
                    fontSize="20"
                    fill="#ef4444"
                  >
                    {getItemEmoji(itemType)}
                  </text>
                )
              }
            })}
          </g>
        )}
        
        {step >= 2 && (
          <text x="20" y="170" className="text-xl font-bold fill-gray-900 dark:fill-gray-100">
            {num1} ÷ {num2} = {groups} {remainder > 0 && `remainder ${remainder}`}
          </text>
        )}
        
        <text x="20" y="200" className="text-sm fill-gray-600 dark:fill-gray-400">
          {groups} groups of {num2} {remainder > 0 && `+ ${remainder} left over`}
        </text>
      </svg>
    )
  }

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {label && (
        <p className="text-center font-semibold mb-3 text-gray-900 dark:text-gray-100">
          {label}
        </p>
      )}
      
      {operation === 'addition' && renderAddition()}
      {operation === 'subtraction' && renderSubtraction()}
      {operation === 'multiplication' && renderMultiplication()}
      {operation === 'division' && renderDivision()}
    </div>
  )
}
