'use client'

import { useState } from 'react'
import MathRenderer from '@/components/math/MathRenderer'

interface InteractiveGraphPlotterProps {
  initialSlope?: number
  initialIntercept?: number
  showGrid?: boolean
  showEquation?: boolean
  label?: string
}

export default function InteractiveGraphPlotter({
  initialSlope = 1,
  initialIntercept = 0,
  showGrid = true,
  showEquation = true,
  label
}: InteractiveGraphPlotterProps) {
  const [slope, setSlope] = useState(initialSlope)
  const [intercept, setIntercept] = useState(initialIntercept)

  const width = 600
  const height = 400
  const centerX = width / 2
  const centerY = height / 2
  const scale = 30 // pixels per unit

  // Calculate line points
  const x1 = -10
  const y1 = slope * x1 + intercept
  const x2 = 10
  const y2 = slope * x2 + intercept

  // Convert to SVG coordinates
  const toSVGX = (x: number) => centerX + x * scale
  const toSVGY = (y: number) => centerY - y * scale

  return (
    <div className="my-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
      {label && (
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">{label}</h3>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Slope (m)
              </label>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {slope.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={slope}
              onChange={(e) => setSlope(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-5</span>
              <span>0</span>
              <span>5</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Y-Intercept (b)
              </label>
              <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                {intercept.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.5"
              value={intercept}
              onChange={(e) => setIntercept(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-pink-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-10</span>
              <span>0</span>
              <span>10</span>
            </div>
          </div>

          {showEquation && (
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                Equation:
              </h4>
              <div className="text-3xl text-center font-bold text-gray-900 dark:text-gray-100">
                <MathRenderer math={`y = ${slope.toFixed(2)}x ${intercept >= 0 ? '+' : ''} ${intercept.toFixed(1)}`} />
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>Slope:</strong> {slope > 0 ? 'Positive (rising)' : slope < 0 ? 'Negative (falling)' : 'Zero (horizontal)'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>Y-intercept:</strong> Crosses y-axis at {intercept.toFixed(1)}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>Steepness:</strong> {Math.abs(slope) > 2 ? 'Very steep' : Math.abs(slope) > 1 ? 'Moderate' : Math.abs(slope) > 0 ? 'Gentle' : 'Flat'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Graph */}
        <div className="lg:col-span-2">
          <svg width={width} height={height} className="border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
            {/* Grid */}
            {showGrid && (
              <g className="opacity-20">
                {Array.from({ length: 21 }, (_, i) => i - 10).map(i => (
                  <g key={`grid-${i}`}>
                    <line
                      x1={toSVGX(i)}
                      y1={0}
                      x2={toSVGX(i)}
                      y2={height}
                      stroke="#999"
                      strokeWidth="1"
                    />
                    <line
                      x1={0}
                      y1={toSVGY(i)}
                      x2={width}
                      y2={toSVGY(i)}
                      stroke="#999"
                      strokeWidth="1"
                    />
                  </g>
                ))}
              </g>
            )}

            {/* Axes */}
            <line
              x1={0}
              y1={centerY}
              x2={width}
              y2={centerY}
              stroke="#374151"
              strokeWidth="2"
            />
            <line
              x1={centerX}
              y1={0}
              x2={centerX}
              y2={height}
              stroke="#374151"
              strokeWidth="2"
            />

            {/* Axis Labels */}
            {[-10, -5, 5, 10].map(i => (
              <g key={`label-${i}`}>
                <text
                  x={toSVGX(i)}
                  y={centerY + 20}
                  textAnchor="middle"
                  className="text-xs fill-gray-600 dark:fill-gray-400"
                >
                  {i}
                </text>
                {i !== 0 && (
                  <text
                    x={centerX - 20}
                    y={toSVGY(i) + 5}
                    textAnchor="middle"
                    className="text-xs fill-gray-600 dark:fill-gray-400"
                  >
                    {i}
                  </text>
                )}
              </g>
            ))}

            {/* Origin */}
            <text
              x={centerX + 15}
              y={centerY + 15}
              className="text-sm font-semibold fill-gray-700 dark:fill-gray-300"
            >
              0
            </text>

            {/* The Line */}
            <line
              x1={toSVGX(x1)}
              y1={toSVGY(y1)}
              x2={toSVGX(x2)}
              y2={toSVGY(y2)}
              stroke="#8b5cf6"
              strokeWidth="3"
              className="transition-all duration-300"
            />

            {/* Y-intercept point */}
            <circle
              cx={toSVGX(0)}
              cy={toSVGY(intercept)}
              r="6"
              fill="#ec4899"
              stroke="#fff"
              strokeWidth="2"
              className="transition-all duration-300"
            />

            {/* Slope triangle (rise over run) */}
            {slope !== 0 && (
              <g className="opacity-70">
                <line
                  x1={toSVGX(0)}
                  y1={toSVGY(intercept)}
                  x2={toSVGX(1)}
                  y2={toSVGY(intercept)}
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeDasharray="4"
                />
                <line
                  x1={toSVGX(1)}
                  y1={toSVGY(intercept)}
                  x2={toSVGX(1)}
                  y2={toSVGY(intercept + slope)}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="4"
                />
                <text
                  x={toSVGX(0.5)}
                  y={toSVGY(intercept) + 20}
                  className="text-xs fill-green-600 dark:fill-green-400"
                >
                  run = 1
                </text>
                <text
                  x={toSVGX(1) + 25}
                  y={toSVGY(intercept + slope / 2)}
                  className="text-xs fill-blue-600 dark:fill-blue-400"
                >
                  rise = {slope.toFixed(2)}
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  )
}
