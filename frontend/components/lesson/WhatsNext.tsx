'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NextTopic {
  title: string
  description: string
  link: string
}

interface WhatsNextProps {
  topics: NextTopic[]
  motivationalText?: ReactNode
}

export default function WhatsNext({ topics, motivationalText }: WhatsNextProps) {
  return (
    <div className="my-8 p-6 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-300 dark:border-purple-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-purple-900 dark:text-purple-200">
          What's Next?
        </h3>
      </div>
      
      {motivationalText && (
        <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          {motivationalText}
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-4">
        {topics.map((topic, i) => (
          <Link
            key={i}
            href={topic.link}
            className={cn(
              "p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-200 dark:border-purple-800",
              "hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-md",
              "transition-all duration-200 group"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {topic.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {topic.description}
                </p>
              </div>
              <svg className="w-5 h-5 text-purple-400 dark:text-purple-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded border border-purple-300 dark:border-purple-700">
        <p className="text-xs text-purple-800 dark:text-purple-300 font-semibold">
          🎯 Keep learning! Each topic builds on what you've mastered here.
        </p>
      </div>
    </div>
  )
}
