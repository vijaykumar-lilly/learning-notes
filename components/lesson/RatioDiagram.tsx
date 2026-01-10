'use client'

interface RatioDiagramProps {
  ratio1: number
  ratio2: number
  label1: string
  label2: string
  color1?: string
  color2?: string
  showSimplified?: boolean
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

export function RatioDiagram({
  ratio1,
  ratio2,
  label1,
  label2,
  color1 = '#3b82f6',
  color2 = '#f59e0b',
  showSimplified = false
}: RatioDiagramProps) {
  const total = ratio1 + ratio2
  const divisor = gcd(ratio1, ratio2)
  const simplified1 = ratio1 / divisor
  const simplified2 = ratio2 / divisor
  
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto">
      {/* Title */}
      <text x="200" y="25" textAnchor="middle" className="text-sm font-semibold fill-gray-700 dark:fill-gray-300">
        Ratio {ratio1}:{ratio2}
      </text>
      
      {/* Ratio Bar */}
      <rect x="50" y="50" width={300 * (ratio1 / total)} height="60" fill={color1} opacity="0.8" />
      <rect x={50 + 300 * (ratio1 / total)} y="50" width={300 * (ratio2 / total)} height="60" fill={color2} opacity="0.8" />
      
      {/* Labels */}
      <text x={50 + (300 * ratio1 / total) / 2} y="85" textAnchor="middle" className="text-xs font-medium fill-white">
        {label1}
      </text>
      <text x={50 + 300 * (ratio1 / total) + (300 * ratio2 / total) / 2} y="85" textAnchor="middle" className="text-xs font-medium fill-white">
        {label2}
      </text>
      
      {/* Values */}
      <text x={50 + (300 * ratio1 / total) / 2} y="100" textAnchor="middle" className="text-sm font-bold fill-white">
        {ratio1}
      </text>
      <text x={50 + 300 * (ratio1 / total) + (300 * ratio2 / total) / 2} y="100" textAnchor="middle" className="text-sm font-bold fill-white">
        {ratio2}
      </text>
      
      {/* Individual boxes representation */}
      <g transform="translate(50, 130)">
        {Array.from({ length: ratio1 }).map((_, i) => (
          <rect
            key={`a-${i}`}
            x={i * 20}
            y="0"
            width="18"
            height="18"
            fill={color1}
            stroke="white"
            strokeWidth="2"
          />
        ))}
        {Array.from({ length: ratio2 }).map((_, i) => (
          <rect
            key={`b-${i}`}
            x={(ratio1 + i) * 20}
            y="0"
            width="18"
            height="18"
            fill={color2}
            stroke="white"
            strokeWidth="2"
          />
        ))}
      </g>
      
      {/* Simplified form */}
      {showSimplified && divisor > 1 && (
        <text x="200" y="175" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">
          Simplified: {simplified1}:{simplified2}
        </text>
      )}
    </svg>
  )
}
