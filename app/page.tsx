import Link from 'next/link'
import MathRenderer from '@/components/math/MathRenderer'
import AppLayout from '@/components/layout/AppLayout'
import Logo from '@/components/Logo'

export default function Home() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Logo size="xl" showText={false} />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Welcome to MathLearn</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your journey from basics to expertise</p>
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
            Complete mathematics curriculum covering 11 domains from foundational
            arithmetic to advanced topics like real analysis and machine learning mathematics.
          </p>
        </section>

        {/* Sample Math Rendering */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 sm:p-6 rounded-xl mb-8 shadow-sm border border-blue-100 dark:border-blue-900/50">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-white">Sample: The Quadratic Formula</h3>
          <p className="mb-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            For any quadratic equation in the form:
          </p>
          <MathRenderer 
            math="ax^2 + bx + c = 0" 
            block 
          />
          <p className="my-3 text-sm sm:text-base">
            The solutions are given by:
          </p>
          <MathRenderer 
            math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" 
            block 
          />
        </section>

        {/* Learning Paths */}
        <section className="mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Popular Learning Paths</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <Link 
              href="/learn/foundations/number-sense" 
              className="p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
            >
              <h4 className="font-semibold text-base sm:text-lg mb-2 text-gray-900 dark:text-white">Foundations (K-5)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Number sense, arithmetic, fractions, decimals
              </p>
            </Link>
            <Link 
              href="/learn/pre-algebra/integers" 
              className="p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-green-300 dark:hover:border-green-600 transition-all"
            >
              <h4 className="font-semibold text-base sm:text-lg mb-2 text-gray-900 dark:text-white">Pre-Algebra (6-8)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Integers, exponents, expressions, equations
              </p>
            </Link>
            <Link 
              href="/learn/algebra/quadratics" 
              className="p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 transition-all"
            >
              <h4 className="font-semibold text-base sm:text-lg mb-2 text-gray-900 dark:text-white">Algebra I & II</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quadratics, polynomials, exponentials
              </p>
            </Link>
            <Link 
              href="/learn/calculus/limits" 
              className="p-4 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600 transition-all"
            >
              <h4 className="font-semibold text-base sm:text-lg mb-2 text-gray-900 dark:text-white">Calculus</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Limits, derivatives, integrals, series
              </p>
            </Link>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">11</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Domains</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">87</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Topics</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">3,995</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Exercises</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400">275</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Proofs</div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Platform Features</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base mb-1 text-gray-900 dark:text-white">Adaptive Learning</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Personalized pathways based on your progress</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base mb-1 text-gray-900 dark:text-white">Complete Coverage</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">From basics to advanced mathematics</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base mb-1 text-gray-900 dark:text-white">Instant Feedback</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Step-by-step hints and explanations</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
