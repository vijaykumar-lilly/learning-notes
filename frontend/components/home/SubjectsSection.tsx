'use client'

import { motion } from 'framer-motion'
import {
  CalculatorIcon,
  BeakerIcon,
  GlobeAltIcon,
  CodeBracketIcon,
  CurrencyDollarIcon,
  LanguageIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const subjects = [
  {
    icon: CalculatorIcon,
    title: 'Mathematics',
    description: 'From basic arithmetic to advanced calculus',
    lessons: 850,
    level: 'All Levels',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    icon: BeakerIcon,
    title: 'Science',
    description: 'Physics, Chemistry, Biology and more',
    lessons: 720,
    level: 'Beginner to Advanced',
    color: 'from-green-500 to-emerald-500',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    icon: CodeBracketIcon,
    title: 'Programming',
    description: 'Learn coding from scratch to expert',
    lessons: 640,
    level: 'Beginner to Expert',
    color: 'from-purple-500 to-pink-500',
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    icon: GlobeAltIcon,
    title: 'Geography',
    description: 'Explore the world and its wonders',
    lessons: 420,
    level: 'All Levels',
    color: 'from-orange-500 to-red-500',
    gradient: 'from-orange-500/20 to-red-500/20'
  },
  {
    icon: LanguageIcon,
    title: 'Languages',
    description: 'Master new languages effectively',
    lessons: 580,
    level: 'Beginner to Fluent',
    color: 'from-indigo-500 to-blue-500',
    gradient: 'from-indigo-500/20 to-blue-500/20'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Economics',
    description: 'Understand markets and finance',
    lessons: 290,
    level: 'Intermediate to Advanced',
    color: 'from-yellow-500 to-orange-500',
    gradient: 'from-yellow-500/20 to-orange-500/20'
  }
]

export default function SubjectsSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Explore <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Subjects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Master any subject with our comprehensive curriculum
            </p>
          </motion.div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <Link href="/curriculum">
                <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-transparent transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden">
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${subject.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${subject.color} rounded-xl mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <subject.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {subject.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {subject.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 bg-gradient-to-r ${subject.color} rounded-full`} />
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          {subject.lessons} Lessons
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-white/50 dark:bg-gray-800/50 rounded-full text-gray-700 dark:text-gray-300 font-medium text-xs">
                        {subject.level}
                      </span>
                    </div>

                    {/* Arrow indicator */}
                    <div className="mt-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                      <span className="font-semibold text-sm">Explore Subject</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Decorative corner element */}
                  <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${subject.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/curriculum">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
              View All Subjects
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </Link>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Total Subjects', value: '25+', color: 'from-blue-500 to-indigo-600' },
            { label: 'Total Lessons', value: '2,500+', color: 'from-indigo-500 to-purple-600' },
            { label: 'Active Learners', value: '100K+', color: 'from-purple-500 to-pink-600' },
            { label: 'Success Rate', value: '95%', color: 'from-pink-500 to-rose-600' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
            >
              <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
