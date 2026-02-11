'use client'

import { motion } from 'framer-motion'
import {
  UserCircleIcon,
  BookOpenIcon,
  PencilSquareIcon,
  ChartBarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

const steps = [
  {
    number: '01',
    icon: UserCircleIcon,
    title: 'Create Your Account',
    description: 'Sign up in seconds with email or social login. Choose your preferred language and learning goals.',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    number: '02',
    icon: BookOpenIcon,
    title: 'Choose Your Subject',
    description: 'Browse our comprehensive curriculum. From mathematics to science, find subjects that interest you.',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    number: '03',
    icon: PencilSquareIcon,
    title: 'Complete Interactive Lessons',
    description: 'Engage with AI-generated content, interactive exercises, and visual demonstrations. Learn by doing.',
    color: 'from-purple-500 to-pink-600'
  },
  {
    number: '04',
    icon: ChartBarIcon,
    title: 'Track Your Progress',
    description: 'View detailed analytics on your learning journey. See what you\'ve mastered and where to improve.',
    color: 'from-pink-500 to-rose-600'
  },
  {
    number: '05',
    icon: TrophyIcon,
    title: 'Earn Achievements',
    description: 'Celebrate milestones with badges and achievements. Build learning streaks and compete on leaderboards.',
    color: 'from-rose-500 to-red-600'
  }
]

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How It <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get started in minutes and begin your learning journey today
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative mb-12 last:mb-0"
            >
              {/* Connector Line (except last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 top-24 w-0.5 h-24 bg-gradient-to-b from-blue-200 to-indigo-200 dark:from-blue-900 dark:to-indigo-900 transform -translate-x-1/2" />
              )}

              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}>
                {/* Content */}
                <div className="flex-1 w-full">
                  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      {/* Step Number */}
                      <div className={`flex-shrink-0 text-6xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-20`}>
                        {step.number}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Icon Circle */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-12 h-12 text-white" />
                    </div>
                    {/* Pulse effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-full animate-ping opacity-20`} />
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block flex-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800">
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Ready to start learning?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join thousands of learners today
              </p>
            </div>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 hover:scale-105">
              Get Started Free
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
