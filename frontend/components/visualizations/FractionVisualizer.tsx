'use client'

import { useState } from 'react'

interface FractionVisualizerProps {
  numerator: number
  denominator: number
  type?: 'circle' | 'bar'
  interactive?: boolean
  label?: string
}

export default function FractionVisualizer({ 
  numerator, 
  denominator, 
  type = 'circle',
  interactive = false,
  label 
}: FractionVisualizerProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const renderCircle = () => {
    const parts = []
    const anglePerPart = 360 / denominator
    const radius = 80
    const centerX = 100
    const centerY = 100

    for (let i = 0; i < denominator; i++) {
      const startAngle = (i * anglePerPart - 90) * (Math.PI / 180)
      const endAngle = ((i + 1) * anglePerPart - 90) * (Math.PI / 180)
      
      const x1 = centerX + radius * Math.cos(startAngle)
      const y1 = centerY + radius * Math.sin(startAngle)
      const x2 = centerX + radius * Math.cos(endAngle)
      const y2 = centerY + radius * Math.sin(endAngle)
      
      const isShaded = i < numerator
      const isHovered = hoveredIndex === i
      
      const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`
      
      parts.push(
        <path
          key={i}
          d={pathData}
          fill={isShaded ? (isHovered ? '#3b82f6' : '#60a5fa') : (isHovered ? '#e5e7eb' : '#f3f4f6')}
          stroke="#1f2937"
          strokeWidth="2"
          className="transition-all duration-200"
          onMouseEnter={() => interactive && setHoveredIndex(i)}
          onMouseLeave={() => interactive && setHoveredIndex(null)}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        />
      )
    }
    
    return (
      <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
        {parts}
      </svg>
    )
  }

  const renderBar = () => {
    const parts = []
    const partWidth = 240 / denominator
    
    for (let i = 0; i < denominator; i++) {
      const isShaded = i < numerator
      const isHovered = hoveredIndex === i
      
      parts.push(
        <rect
          key={i}
          x={i * partWidth}
          y="0"
          width={partWidth - 2}
          height="60"
          fill={isShaded ? (isHovered ? '#3b82f6' : '#60a5fa') : (isHovered ? '#e5e7eb' : '#f3f4f6')}
          stroke="#1f2937"
          strokeWidth="2"
          className="transition-all duration-200"
          onMouseEnter={() => interactive && setHoveredIndex(i)}
          onMouseLeave={() => interactive && setHoveredIndex(null)}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        />
      )
    }
    
    return (
      <svg width="240" height="60" viewBox="0 0 240 60" className="mx-auto">
        {parts}
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
      <div className="flex justify-center">
        {type === 'circle' ? renderCircle() : renderBar()}
      </div>
      <p className="text-center mt-3 text-sm text-gray-600 dark:text-gray-400">
        {numerator} out of {denominator} parts shaded
        {interactive && <span className="block mt-1 text-xs">(hover to highlight)</span>}
      </p>
    </div>
  )
}
