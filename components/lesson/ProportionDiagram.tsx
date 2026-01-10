'use client'

interface ProportionDiagramProps {
  ratio1a: number
  ratio1b: number
  ratio2a: number
  ratio2b: number
  label?: string
}

export function ProportionDiagram({
  ratio1a,
  ratio1b,
  ratio2a,
  ratio2b,
  label = 'Equal Ratios'
}: ProportionDiagramProps) {
  return (
    <svg viewBox="0 0 400 180" className="w-full max-w-lg mx-auto">
      {/* Title */}
      <text x="200" y="25" textAnchor="middle" className="text-sm font-semibold fill-gray-700 dark:fill-gray-300">
        {label}
      </text>
      
      {/* First Ratio */}
      <g transform="translate(50, 50)">
        <text x="0" y="15" className="text-xs font-medium fill-gray-600 dark:fill-gray-400">
          Ratio 1: {ratio1a}:{ratio1b}
        </text>
        {Array.from({ length: ratio1a }).map((_, i) => (
          <circle
            key={`1a-${i}`}
            cx={i * 25 + 12}
            cy="40"
            r="10"
            fill="#3b82f6"
            opacity="0.8"
          />
        ))}
        {Array.from({ length: ratio1b }).map((_, i) => (
          <rect
            key={`1b-${i}`}
            x={i * 25}
            y="65"
            width="20"
            height="20"
            fill="#f59e0b"
            opacity="0.8"
          />
        ))}
      </g>
      
      {/* Equals sign */}
      <text x="200" y="110" textAnchor="middle" className="text-2xl font-bold fill-gray-700 dark:fill-gray-300">
        =
      </text>
      
      {/* Second Ratio */}
      <g transform="translate(230, 50)">
        <text x="0" y="15" className="text-xs font-medium fill-gray-600 dark:fill-gray-400">
          Ratio 2: {ratio2a}:{ratio2b}
        </text>
        {Array.from({ length: ratio2a }).map((_, i) => (
          <circle
            key={`2a-${i}`}
            cx={i * 25 + 12}
            cy="40"
            r="10"
            fill="#3b82f6"
            opacity="0.8"
          />
        ))}
        {Array.from({ length: ratio2b }).map((_, i) => (
          <rect
            key={`2b-${i}`}
            x={i * 25}
            y="65"
            width="20"
            height="20"
            fill="#f59e0b"
            opacity="0.8"
          />
        ))}
      </g>
      
      {/* Bottom explanation */}
      <text x="200" y="165" textAnchor="middle" className="text-xs fill-gray-500 dark:fill-gray-400">
        Both ratios show the same relationship
      </text>
    </svg>
  )
}
