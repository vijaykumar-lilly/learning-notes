'use client'

import { useState, useEffect } from 'react'

interface TriangleVisualizerProps {
  angleA?: number
  angleB?: number
  angleC?: number
  sideA?: number
  sideB?: number
  sideC?: number
  showAngles?: boolean
  showSides?: boolean
  highlightRight?: boolean
  animated?: boolean
  label?: string
}

export default function TriangleVisualizer({
  angleA = 60,
  angleB = 60,
  angleC = 60,
  sideA = 100,
  sideB = 100,
  sideC = 100,
  showAngles = true,
  showSides = false,
  highlightRight = false,
  animated = false,
  label
}: TriangleVisualizerProps) {
  const [scale, setScale] = useState(animated ? 0 : 1)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setScale(1), 100)
      return () => clearTimeout(timer)
    }
  }, [animated])

  // Calculate triangle points using law of cosines
  const width = 300
  const height = 250
  const baseY = 200
  const baseStart = 50
  
  // Place points
  const pointA = { x: baseStart, y: baseY }
  const pointB = { x: baseStart + sideC, y: baseY }
  
  // Calculate point C using angles
  const angleARadians = (angleA * Math.PI) / 180
  const pointC = {
    x: pointA.x + sideB * Math.cos(angleARadians),
    y: pointA.y - sideB * Math.sin(angleARadians)
  }

  const isRightTriangle = [angleA, angleB, angleC].includes(90)

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {label && (
        <p className="text-center font-semibold mb-3 text-gray-900 dark:text-gray-100">
          {label}
        </p>
      )}
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`} 
        className="mx-auto"
      >
        {/* Triangle */}
        <g style={{ 
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          transition: 'transform 0.5s ease-out'
        }}>
          {/* Triangle fill */}
          <polygon
            points={`${pointA.x},${pointA.y} ${pointB.x},${pointB.y} ${pointC.x},${pointC.y}`}
            fill="rgba(96, 165, 250, 0.3)"
            stroke="#3b82f6"
            strokeWidth="3"
          />

          {/* Right angle indicator */}
          {highlightRight && isRightTriangle && (
            <>
              {angleA === 90 && (
                <rect
                  x={pointA.x}
                  y={pointA.y - 15}
                  width="15"
                  height="15"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
              )}
              {angleB === 90 && (
                <rect
                  x={pointB.x - 15}
                  y={pointB.y - 15}
                  width="15"
                  height="15"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
              )}
            </>
          )}

          {/* Vertices */}
          <circle cx={pointA.x} cy={pointA.y} r="4" fill="#1f2937" />
          <circle cx={pointB.x} cy={pointB.y} r="4" fill="#1f2937" />
          <circle cx={pointC.x} cy={pointC.y} r="4" fill="#1f2937" />

          {/* Labels for vertices */}
          <text x={pointA.x - 15} y={pointA.y + 5} className="text-sm font-semibold fill-gray-900 dark:fill-gray-100">A</text>
          <text x={pointB.x + 10} y={pointB.y + 5} className="text-sm font-semibold fill-gray-900 dark:fill-gray-100">B</text>
          <text x={pointC.x} y={pointC.y - 10} className="text-sm font-semibold fill-gray-900 dark:fill-gray-100">C</text>

          {/* Angle labels */}
          {showAngles && (
            <>
              <text x={pointA.x + 15} y={pointA.y - 5} className="text-xs fill-blue-600 dark:fill-blue-400">
                {angleA}°
              </text>
              <text x={pointB.x - 25} y={pointB.y - 5} className="text-xs fill-blue-600 dark:fill-blue-400">
                {angleB}°
              </text>
              <text x={pointC.x} y={pointC.y + 15} className="text-xs fill-blue-600 dark:fill-blue-400">
                {angleC}°
              </text>
            </>
          )}

          {/* Side labels */}
          {showSides && (
            <>
              <text 
                x={(pointA.x + pointB.x) / 2} 
                y={pointA.y + 20} 
                className="text-xs fill-gray-700 dark:fill-gray-300"
                textAnchor="middle"
              >
                c = {sideC}
              </text>
              <text 
                x={(pointA.x + pointC.x) / 2 - 15} 
                y={(pointA.y + pointC.y) / 2} 
                className="text-xs fill-gray-700 dark:fill-gray-300"
              >
                b = {sideB}
              </text>
              <text 
                x={(pointB.x + pointC.x) / 2 + 15} 
                y={(pointB.y + pointC.y) / 2} 
                className="text-xs fill-gray-700 dark:fill-gray-300"
              >
                a = {sideA}
              </text>
            </>
          )}
        </g>
      </svg>
      
      {showAngles && (
        <p className="text-center mt-3 text-sm text-gray-600 dark:text-gray-400">
          Sum of angles: {angleA}° + {angleB}° + {angleC}° = {angleA + angleB + angleC}°
        </p>
      )}
    </div>
  )
}
