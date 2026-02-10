'use client'

import { useMemo } from 'react'
import katex from 'katex'

interface MathRendererProps {
  math: string
  block?: boolean
  errorColor?: string
}

export default function MathRenderer({ 
  math, 
  block = false,
  errorColor = '#cc0000'
}: MathRendererProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        errorColor,
        strict: false,
      })
    } catch (error) {
      console.error('KaTeX rendering error:', error)
      return `<span style="color: ${errorColor}">Error rendering math</span>`
    }
  }, [math, block, errorColor])

  return (
    <span
      className={block ? 'block my-4 text-center' : 'inline'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
