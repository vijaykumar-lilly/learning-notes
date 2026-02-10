'use client'

import { useState, useEffect } from 'react'
import MathRenderer from '@/components/math/MathRenderer'

interface PythagoreanVisualizerProps {
  a: number
  b: number
  c: number
  showSquares?: boolean
  animated?: boolean
  label?: string
}

export default function PythagoreanVisualizer({ 
  a, 
  b, 
  c, 
  showSquares = true,
  animated = false,
  label 
}: PythagoreanVisualizerProps) {
  const [progress, setProgress] = useState(animated ? 0 : 1)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setProgress(1), 100)
      return () => clearTimeout(timer)
    }
  }, [animated])

  const scale = 40 // pixels per unit
  const triangleX = 150
  const triangleY = 300

  // Triangle vertices
  const vertices = {
    A: { x: triangleX, y: triangleY },
    B: { x: triangleX + a * scale, y: triangleY },
    C: { x: triangleX, y: triangleY - b * scale }
  }

  // Squares on each side
  const squareA = {
    x: vertices.B.x,
    y: vertices.B.y,
    size: a * scale
  }

  const squareB = {
    x: vertices.C.x - b * scale,
    y: vertices.C.y,
    size: b * scale
  }

  const squareC = {
    // Position square C on the hypotenuse
    x: vertices.A.x + (vertices.B.x - vertices.A.x) / 2,
    y: vertices.A.y - (vertices.A.y - vertices.C.y) / 2,
    size: c * scale,
    rotation: -Math.atan2(b, a) * (180 / Math.PI)
  }

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {label && (
        <p className="text-center font-semibold mb-3 text-gray-900 dark:text-gray-100">
          {label}
        </p>
      )}
      
      <svg width="600" height="450" viewBox="0 0 600 450" className="mx-auto">
        {/* Square on side a (red) */}
        {showSquares && (
          <g style={{ 
            opacity: progress,
            transition: 'opacity 0.5s ease-out 0.2s'
          }}>
            <rect
              x={squareA.x}
              y={squareA.y}
              width={squareA.size}
              height={squareA.size}
              fill="rgba(239, 68, 68, 0.3)"
              stroke="#ef4444"
              strokeWidth="2"
            />
            <text
              x={squareA.x + squareA.size / 2}
              y={squareA.y + squareA.size / 2}
              textAnchor="middle"
              className="fill-red-600 dark:fill-red-400 font-semibold text-sm"
            >
              <tspan x={squareA.x + squareA.size / 2} dy="0">a² = {a}²</tspan>
              <tspan x={squareA.x + squareA.size / 2} dy="20">= {a * a}</tspan>
            </text>
          </g>
        )}

        {/* Square on side b (green) */}
        {showSquares && (
          <g style={{ 
            opacity: progress,
            transition: 'opacity 0.5s ease-out 0.4s'
          }}>
            <rect
              x={squareB.x}
              y={squareB.y}
              width={squareB.size}
              height={squareB.size}
              fill="rgba(34, 197, 94, 0.3)"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <text
              x={squareB.x + squareB.size / 2}
              y={squareB.y + squareB.size / 2}
              textAnchor="middle"
              className="fill-green-600 dark:fill-green-400 font-semibold text-sm"
            >
              <tspan x={squareB.x + squareB.size / 2} dy="0">b² = {b}²</tspan>
              <tspan x={squareB.x + squareB.size / 2} dy="20">= {b * b}</tspan>
            </text>
          </g>
        )}

        {/* Square on side c (blue) */}
        {showSquares && (
          <g style={{ 
            opacity: progress,
            transition: 'opacity 0.5s ease-out 0.6s'
          }}>
            <rect
              x={squareC.x}
              y={squareC.y - squareC.size}
              width={squareC.size}
              height={squareC.size}
              fill="rgba(59, 130, 246, 0.3)"
              stroke="#3b82f6"
              strokeWidth="2"
              transform={`rotate(${squareC.rotation}, ${squareC.x + squareC.size/2}, ${squareC.y - squareC.size/2})`}
            />
            <text
              x={squareC.x + squareC.size / 2}
              y={squareC.y - squareC.size / 2}
              textAnchor="middle"
              className="fill-blue-600 dark:fill-blue-400 font-semibold text-sm"
              transform={`rotate(${squareC.rotation}, ${squareC.x + squareC.size/2}, ${squareC.y - squareC.size/2})`}
            >
              <tspan x={squareC.x + squareC.size / 2} dy="0">c² = {c}²</tspan>
              <tspan x={squareC.x + squareC.size / 2} dy="20">= {c * c}</tspan>
            </text>
          </g>
        )}

        {/* Right triangle */}
        <g style={{ 
          opacity: progress,
          transition: 'opacity 0.5s ease-out'
        }}>
          <polygon
            points={`${vertices.A.x},${vertices.A.y} ${vertices.B.x},${vertices.B.y} ${vertices.C.x},${vertices.C.y}`}
            fill="rgba(156, 163, 175, 0.4)"
            stroke="#374151"
            strokeWidth="3"
          />

          {/* Right angle indicator */}
          <rect
            x={vertices.A.x}
            y={vertices.A.y - 15}
            width="15"
            height="15"
            fill="none"
            stroke="#374151"
            strokeWidth="2"
          />

          {/* Side labels */}
          <text
            x={(vertices.A.x + vertices.B.x) / 2}
            y={vertices.A.y + 20}
            textAnchor="middle"
            className="fill-gray-900 dark:fill-gray-100 font-semibold"
          >
            a = {a}
          </text>
          <text
            x={vertices.A.x - 25}
            y={(vertices.A.y + vertices.C.y) / 2}
            textAnchor="middle"
            className="fill-gray-900 dark:fill-gray-100 font-semibold"
          >
            b = {b}
          </text>
          <text
            x={(vertices.B.x + vertices.C.x) / 2 + 25}
            y={(vertices.B.y + vertices.C.y) / 2}
            textAnchor="middle"
            className="fill-gray-900 dark:fill-gray-100 font-semibold"
          >
            c = {c}
          </text>
        </g>
      </svg>

      <div className="text-center mt-4 space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Pythagorean Theorem: <MathRenderer math="a^2 + b^2 = c^2" />
        </p>
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {a}² + {b}² = {a * a} + {b * b} = {a * a + b * b} = {c}² ✓
        </p>
      </div>
    </div>
  )
}
