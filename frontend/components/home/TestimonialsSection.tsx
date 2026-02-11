'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Maya Patel',
    role: 'High School Student',
    avatar: '👩‍🎓',
    rating: 5,
    content: 'Learning in Tamil has been a game-changer for me! The lessons are clear, interactive, and I can finally understand complex math concepts in my native language.',
    highlight: 'Improved my grades by 30%'
  },
  {
    name: 'David Chen',
    role: 'Software Engineer',
    avatar: '👨‍💻',
    rating: 5,
    content: 'As a professional looking to upskill, LearningHub is perfect. The AI-generated content is high-quality, and I can learn at my own pace during my commute.',
    highlight: 'Completed 50+ lessons in 2 months'
  },
  {
    name: 'Sarah Johnson',
    role: 'Teacher',
    avatar: '👩‍🏫',
    rating: 5,
    content: 'I use LearningHub to assign lessons to my students. The progress tracking helps me identify who needs extra help. My students love the interactive exercises!',
    highlight: 'Class performance up 40%'
  },
  {
    name: 'Raj Kumar',
    role: 'University Student',
    avatar: '👨‍🎓',
    rating: 5,
    content: 'The multi-language support is amazing. I can switch between English and Tamil to understand difficult concepts better. The bilingual mode is brilliant!',
    highlight: 'Aced my final exams'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Parent',
    avatar: '👩‍👧',
    rating: 5,
    content: 'My daughter struggled with traditional textbooks. LearningHub makes learning fun with visuals and interactive content. She actually asks to do her homework now!',
    highlight: 'Daughter loves learning again'
  },
  {
    name: 'Alex Thompson',
    role: 'Career Changer',
    avatar: '👨‍💼',
    rating: 5,
    content: 'Transitioning to data science was daunting, but LearningHub made it manageable. The adaptive learning helped me focus on areas I needed most.',
    highlight: 'Landed my dream job'
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Learners</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our community has to say about their learning journey
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Highlight Badge */}
                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {testimonial.highlight}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-8 px-12 py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                4.9
              </div>
              <div className="text-left">
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Average Rating
                </div>
              </div>
            </div>

            <div className="w-px h-12 bg-gray-300 dark:bg-gray-700 hidden sm:block" />

            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                50K+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                5-Star Reviews
              </div>
            </div>

            <div className="w-px h-12 bg-gray-300 dark:bg-gray-700 hidden sm:block" />

            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                98%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
