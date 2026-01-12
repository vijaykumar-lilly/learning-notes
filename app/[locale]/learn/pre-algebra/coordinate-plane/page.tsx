'use client';

import { useTranslations } from 'next-intl';
import MathRenderer from '@/components/math/MathRenderer';
import LessonNavigation from '@/components/lesson/LessonNavigation';
import { getLessonNavigation } from '@/lib/lesson-navigation';

export default function CoordinatePlanePage() {
  const t = useTranslations('coordinate-plane');
  const navigation = getLessonNavigation('pre-algebra', 'coordinate-plane');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {t('description')}
        </p>
      </header>

      {/* Introduction/Definition */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('definition.title')}</h2>
        <p className="mb-4">{t('definition.intro')}</p>
        
        <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-3">{t('definition.axes.title')}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{t('definition.axes.xAxis')}</h4>
              <p className="text-sm">{t('definition.axes.xDescription')}</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">{t('definition.axes.yAxis')}</h4>
              <p className="text-sm">{t('definition.axes.yDescription')}</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">{t('definition.point.title')}</h3>
          <p className="mb-3">{t('definition.point.description')}</p>
          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded">
            <span className="font-mono text-xl"><MathRenderer math="(x, y)" /></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('definition.point.format')}</span>
          </div>
          <p className="mt-2 text-sm italic">{t('definition.point.example')}</p>
        </div>
      </section>

      {/* Key Concepts */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('concepts.title')}</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">{t('concepts.quadrants.title')}</h3>
            <p className="mb-4">{t('concepts.quadrants.intro')}</p>
            
            {/* Visual Coordinate Plane Grid */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-4">
              <div className="relative w-full max-w-md mx-auto aspect-square">
                {/* Grid background */}
                <svg viewBox="-110 -110 220 220" className="w-full h-full">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.2"/>
                    </pattern>
                  </defs>
                  <rect x="-110" y="-110" width="220" height="220" fill="url(#grid)" />
                  
                  {/* Quadrant backgrounds */}
                  <rect x="0" y="-100" width="100" height="100" fill="#3B82F6" opacity="0.1" />
                  <rect x="-100" y="-100" width="100" height="100" fill="#10B981" opacity="0.1" />
                  <rect x="-100" y="0" width="100" height="100" fill="#F97316" opacity="0.1" />
                  <rect x="0" y="0" width="100" height="100" fill="#A855F7" opacity="0.1" />
                  
                  {/* Axes */}
                  <line x1="-105" y1="0" x2="105" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                  <line x1="0" y1="-105" x2="0" y2="105" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                  
                  {/* Arrows */}
                  <polygon points="105,0 100,-3 100,3" fill="currentColor" opacity="0.8" />
                  <polygon points="0,-105 -3,-100 3,-100" fill="currentColor" opacity="0.8" />
                  
                  {/* Axis labels */}
                  <text x="95" y="15" fontSize="10" fill="currentColor" fontWeight="bold">x</text>
                  <text x="5" y="-95" fontSize="10" fill="currentColor" fontWeight="bold">y</text>
                  
                  {/* Tick marks and numbers */}
                  {[-4, -3, -2, -1, 1, 2, 3, 4].map(n => (
                    <g key={`x-${n}`}>
                      <line x1={n * 20} y1="-3" x2={n * 20} y2="3" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                      <text x={n * 20} y="15" fontSize="8" fill="currentColor" textAnchor="middle" opacity="0.7">{n}</text>
                    </g>
                  ))}
                  {[-4, -3, -2, -1, 1, 2, 3, 4].map(n => (
                    <g key={`y-${n}`}>
                      <line x1="-3" y1={-n * 20} x2="3" y2={-n * 20} stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                      <text x="-12" y={-n * 20 + 3} fontSize="8" fill="currentColor" textAnchor="middle" opacity="0.7">{n}</text>
                    </g>
                  ))}
                  
                  {/* Origin */}
                  <circle cx="0" cy="0" r="3" fill="#EF4444" />
                  <text x="10" y="15" fontSize="9" fill="currentColor" fontWeight="bold">(0,0)</text>
                  
                  {/* Quadrant labels */}
                  <text x="50" y="-50" fontSize="14" fill="#3B82F6" fontWeight="bold" textAnchor="middle">I</text>
                  <text x="-50" y="-50" fontSize="14" fill="#10B981" fontWeight="bold" textAnchor="middle">II</text>
                  <text x="-50" y="50" fontSize="14" fill="#F97316" fontWeight="bold" textAnchor="middle">III</text>
                  <text x="50" y="50" fontSize="14" fill="#A855F7" fontWeight="bold" textAnchor="middle">IV</text>
                  
                  {/* Sample points */}
                  <circle cx="60" cy="-40" r="4" fill="#3B82F6" />
                  <text x="60" y="-48" fontSize="8" fill="#3B82F6" textAnchor="middle" fontWeight="bold">(3,2)</text>
                  
                  <circle cx="-40" cy="-60" r="4" fill="#10B981" />
                  <text x="-40" y="-68" fontSize="8" fill="#10B981" textAnchor="middle" fontWeight="bold">(-2,3)</text>
                  
                  <circle cx="-60" cy="40" r="4" fill="#F97316" />
                  <text x="-60" y="52" fontSize="8" fill="#F97316" textAnchor="middle" fontWeight="bold">(-3,-2)</text>
                  
                  <circle cx="40" cy="60" r="4" fill="#A855F7" />
                  <text x="40" y="72" fontSize="8" fill="#A855F7" textAnchor="middle" fontWeight="bold">(2,-3)</text>
                </svg>
              </div>
            </div>
            
            {/* Quadrant sign reference */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-gray-800 rounded border-2 border-blue-500">
                <div className="font-semibold text-blue-600 dark:text-blue-400">{t('concepts.quadrants.q1')}</div>
                <div className="text-sm"><MathRenderer math="(+, +)" /></div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t('concepts.quadrants.q1desc')}</div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded border-2 border-green-500">
                <div className="font-semibold text-green-600 dark:text-green-400">{t('concepts.quadrants.q2')}</div>
                <div className="text-sm"><MathRenderer math="(-, +)" /></div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t('concepts.quadrants.q2desc')}</div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded border-2 border-orange-500">
                <div className="font-semibold text-orange-600 dark:text-orange-400">{t('concepts.quadrants.q3')}</div>
                <div className="text-sm"><MathRenderer math="(-, -)" /></div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t('concepts.quadrants.q3desc')}</div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded border-2 border-purple-500">
                <div className="font-semibold text-purple-600 dark:text-purple-400">{t('concepts.quadrants.q4')}</div>
                <div className="text-sm"><MathRenderer math="(+, -)" /></div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t('concepts.quadrants.q4desc')}</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">{t('concepts.plotting.title')}</h3>
            
            {/* Visual step-by-step plotting */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <ol className="list-decimal list-inside space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                    <span className="flex-1">{t('concepts.plotting.step1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                    <span className="flex-1">{t('concepts.plotting.step2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                    <span className="flex-1">{t('concepts.plotting.step3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs">4</span>
                    <span className="flex-1">{t('concepts.plotting.step4')}</span>
                  </li>
                </ol>
              </div>
              
              {/* Visual demonstration */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2 text-center">Example: Plot (3, 2)</p>
                <svg viewBox="-10 -110 120 120" className="w-full h-auto">
                  {/* Axes */}
                  <line x1="0" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                  <line x1="0" y1="0" x2="0" y2="-100" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                  
                  {/* Grid */}
                  {[0, 1, 2, 3, 4, 5].map(n => (
                    <g key={n}>
                      <line x1={n * 20} y1="0" x2={n * 20} y2="-100" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                      <line x1="0" y1={-n * 20} x2="100" y2={-n * 20} stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                    </g>
                  ))}
                  
                  {/* Origin */}
                  <circle cx="0" cy="0" r="3" fill="#EF4444" />
                  <text x="5" y="12" fontSize="8" fill="#EF4444" fontWeight="bold">(0,0)</text>
                  
                  {/* Step 2: Horizontal movement */}
                  <line x1="0" y1="0" x2="60" y2="0" stroke="#3B82F6" strokeWidth="3" strokeDasharray="4,2" />
                  <text x="30" y="15" fontSize="9" fill="#3B82F6" fontWeight="bold" textAnchor="middle">x=3 →</text>
                  
                  {/* Step 3: Vertical movement */}
                  <line x1="60" y1="0" x2="60" y2="-40" stroke="#10B981" strokeWidth="3" strokeDasharray="4,2" />
                  <text x="72" y="-20" fontSize="9" fill="#10B981" fontWeight="bold">↑ y=2</text>
                  
                  {/* Final point */}
                  <circle cx="60" cy="-40" r="4" fill="#A855F7" stroke="#A855F7" strokeWidth="2" />
                  <text x="60" y="-48" fontSize="10" fill="#A855F7" fontWeight="bold" textAnchor="middle">(3,2)</text>
                </svg>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('concepts.origin.title')}</h3>
            <p className="mb-2">{t('concepts.origin.description')}</p>
            <div className="font-mono bg-white dark:bg-gray-800 px-3 py-2 rounded inline-block">
              <MathRenderer math="(0, 0)" />
            </div>
          </div>
        </div>
      </section>

      {/* Visual Explanations */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('visual.title')}</h2>
        
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30">
                <th className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.point')}</th>
                <th className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.x')}</th>
                <th className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.y')}</th>
                <th className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.quadrant')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono">
                  <MathRenderer math="(3, 2)" />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">3 {t('visual.table.right')}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">2 {t('visual.table.up')}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.q1')}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono">
                  <MathRenderer math="(-2, 4)" />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">2 {t('visual.table.left')}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">4 {t('visual.table.up')}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.q2')}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono">
                  <MathRenderer math="(-3, -1)" />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">3 {t('visual.table.left')}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">1 {t('visual.table.down')}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.q3')}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono">
                  <MathRenderer math="(4, -3)" />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">4 {t('visual.table.right')}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">3 {t('visual.table.down')}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.q4')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-3">{t('visual.distance.title')}</h3>
          <p className="mb-3">{t('visual.distance.intro')}</p>
          
          {/* Square Root Explanation */}
          <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">📐 What is a Square Root?</h4>
            <p className="text-sm mb-2">The square root symbol <MathRenderer math={String.raw`\sqrt{\,}`} /> asks: "What number, when multiplied by itself, gives this value?"</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white dark:bg-gray-800 p-2 rounded">
                <MathRenderer math={String.raw`\sqrt{9} = 3`} /> because <MathRenderer math="3 \times 3 = 9" />
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 rounded">
                <MathRenderer math={String.raw`\sqrt{25} = 5`} /> because <MathRenderer math="5 \times 5 = 25" />
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 rounded">
                <MathRenderer math={String.raw`\sqrt{16} = 4`} /> because <MathRenderer math="4 \times 4 = 16" />
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 rounded">
                <MathRenderer math={String.raw`\sqrt{36} = 6`} /> because <MathRenderer math="6 \times 6 = 36" />
              </div>
            </div>
            <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">💡 We use square root in the distance formula because it "undoes" the squaring from the Pythagorean theorem!</p>
          </div>
          
          {/* Visual distance demonstration */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded">
              <p className="font-semibold mb-2">{t('visual.distance.formula')}</p>
              <div className="font-mono text-lg mb-4">
                <MathRenderer math={String.raw`d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`} />
              </div>
              
              <div className="text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded mb-3">
                <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Why the square root?</p>
                <p className="text-xs">From Pythagorean theorem: <MathRenderer math={String.raw`c^2 = a^2 + b^2`} /></p>
                <p className="text-xs mt-1">To find c (the distance), we take the square root of both sides:</p>
                <p className="text-xs mt-1"><MathRenderer math={String.raw`c = \sqrt{a^2 + b^2}`} /></p>
              </div>
              
              {/* Visual representation of distance */}
              <svg viewBox="-10 -110 120 120" className="w-full h-auto">
                {/* Grid */}
                <defs>
                  <pattern id="smallgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.2"/>
                  </pattern>
                </defs>
                <rect x="0" y="-100" width="100" height="100" fill="url(#smallgrid)" />
                
                {/* Axes */}
                <line x1="0" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <line x1="0" y1="0" x2="0" y2="-100" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                
                {/* Points */}
                <circle cx="20" cy="-40" r="3" fill="#3B82F6" />
                <text x="20" y="-48" fontSize="9" fill="#3B82F6" fontWeight="bold" textAnchor="middle">(1,2)</text>
                
                <circle cx="80" cy="-120" r="3" fill="#10B981" />
                <text x="80" y="-128" fontSize="9" fill="#10B981" fontWeight="bold" textAnchor="middle">(4,6)</text>
                
                {/* Right triangle */}
                <line x1="20" y1="-40" x2="80" y2="-40" stroke="#F97316" strokeWidth="2" strokeDasharray="3,2" />
                <text x="50" y="-35" fontSize="8" fill="#F97316" fontWeight="bold">Δx = 3</text>
                
                <line x1="80" y1="-40" x2="80" y2="-120" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,2" />
                <text x="88" y="-80" fontSize="8" fill="#EF4444" fontWeight="bold">Δy = 4</text>
                
                {/* Hypotenuse (distance) */}
                <line x1="20" y1="-40" x2="80" y2="-120" stroke="#A855F7" strokeWidth="3" />
                <text x="50" y="-85" fontSize="9" fill="#A855F7" fontWeight="bold" textAnchor="middle">d = 5</text>
              </svg>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded flex items-center">
              <div className="text-sm space-y-2">
                <p className="font-semibold text-purple-600 dark:text-purple-400">Pythagorean Connection!</p>
                <p>The distance formula comes from the Pythagorean theorem:</p>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded">
                  <MathRenderer math={String.raw`a^2 + b^2 = c^2`} />
                  <p className="text-xs mt-2">where c is the distance (hypotenuse)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Worked Examples */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('examples.title')}</h2>
        
        {/* Example 1: Plotting Points */}
        <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-semibold text-lg mb-3">{t('examples.example1.title')}</h3>
          <p className="mb-4 font-medium">{t('examples.example1.problem')}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Steps */}
            <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{t('examples.example1.step1Label')}</span>
                <p className="ml-4">{t('examples.example1.step1Text')}</p>
              </div>
              <div>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{t('examples.example1.step2Label')}</span>
                <p className="ml-4">{t('examples.example1.step2Text')}</p>
              </div>
              <div>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{t('examples.example1.step3Label')}</span>
                <p className="ml-4">{t('examples.example1.step3Text')}</p>
              </div>
              <div>
                <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example1.resultLabel')}</span>
                <p className="ml-4">{t('examples.example1.resultText')}</p>
              </div>
            </div>
            
            {/* Visual representation */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <svg viewBox="-110 -110 220 220" className="w-full h-auto">
                {/* Grid */}
                <defs>
                  <pattern id="plotgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.15"/>
                  </pattern>
                </defs>
                <rect x="-100" y="-100" width="200" height="200" fill="url(#plotgrid)" />
                
                {/* Quadrant shading */}
                <rect x="-100" y="-100" width="100" height="100" fill="#10B981" opacity="0.15" />
                
                {/* Axes */}
                <line x1="-100" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                <line x1="0" y1="-100" x2="0" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                
                {/* Origin */}
                <circle cx="0" cy="0" r="3" fill="#EF4444" />
                <text x="8" y="12" fontSize="8" fill="#EF4444" fontWeight="bold">(0,0)</text>
                
                {/* Movement path */}
                <line x1="0" y1="0" x2="-60" y2="0" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="4,3" markerEnd="url(#arrowblue)" />
                <text x="-30" y="15" fontSize="8" fill="#3B82F6" fontWeight="bold" textAnchor="middle">← 3 left</text>
                
                <line x1="-60" y1="0" x2="-60" y2="-80" stroke="#10B981" strokeWidth="2.5" strokeDasharray="4,3" />
                <text x="-75" y="-40" fontSize="8" fill="#10B981" fontWeight="bold">4 up ↑</text>
                
                {/* Final point */}
                <circle cx="-60" cy="-80" r="5" fill="#A855F7" stroke="white" strokeWidth="2" />
                <text x="-60" y="-92" fontSize="10" fill="#A855F7" fontWeight="bold" textAnchor="middle">(-3, 4)</text>
                
                {/* Quadrant label */}
                <text x="-50" y="-50" fontSize="12" fill="#10B981" fontWeight="bold" opacity="0.5">Quadrant II</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Example 2: Identifying Quadrants */}
        <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border-l-4 border-purple-500">
          <h3 className="font-semibold text-lg mb-3">{t('examples.example2.title')}</h3>
          <p className="mb-4 font-medium">{t('examples.example2.problem')}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Answers */}
            <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <span className="font-semibold text-purple-600 dark:text-purple-400">{t('examples.example2.pointA')}</span>
                <p className="ml-4 mt-1">{t('examples.example2.pointAAnswer')}</p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                <span className="font-semibold text-purple-600 dark:text-purple-400">{t('examples.example2.pointB')}</span>
                <p className="ml-4 mt-1">{t('examples.example2.pointBAnswer')}</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                <span className="font-semibold text-purple-600 dark:text-purple-400">{t('examples.example2.pointC')}</span>
                <p className="ml-4 mt-1">{t('examples.example2.pointCAnswer')}</p>
              </div>
            </div>
            
            {/* Visual representation */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <svg viewBox="-110 -110 220 220" className="w-full h-auto">
                {/* Quadrant backgrounds */}
                <rect x="0" y="-100" width="100" height="100" fill="#3B82F6" opacity="0.1" />
                <rect x="-100" y="-100" width="100" height="100" fill="#10B981" opacity="0.1" />
                <rect x="-100" y="0" width="100" height="100" fill="#F97316" opacity="0.1" />
                <rect x="0" y="0" width="100" height="100" fill="#A855F7" opacity="0.1" />
                
                {/* Axes */}
                <line x1="-100" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                <line x1="0" y1="-100" x2="0" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                
                {/* Quadrant labels */}
                <text x="50" y="-50" fontSize="14" fill="#3B82F6" fontWeight="bold" textAnchor="middle">I</text>
                <text x="-50" y="-50" fontSize="14" fill="#10B981" fontWeight="bold" textAnchor="middle">II</text>
                <text x="-50" y="50" fontSize="14" fill="#F97316" fontWeight="bold" textAnchor="middle">III</text>
                <text x="50" y="50" fontSize="14" fill="#A855F7" fontWeight="bold" textAnchor="middle">IV</text>
                
                {/* Plot the three points */}
                <circle cx="50" cy="-70" r="5" fill="#3B82F6" stroke="white" strokeWidth="2" />
                <text x="50" y="-78" fontSize="9" fill="#3B82F6" fontWeight="bold" textAnchor="middle">(5,7)</text>
                
                <circle cx="-20" cy="-60" r="5" fill="#F97316" stroke="white" strokeWidth="2" />
                <text x="-20" y="-68" fontSize="9" fill="#F97316" fontWeight="bold" textAnchor="middle">(-2,-6)</text>
                
                <circle cx="40" cy="30" r="5" fill="#A855F7" stroke="white" strokeWidth="2" />
                <text x="40" y="42" fontSize="9" fill="#A855F7" fontWeight="bold" textAnchor="middle">(4,-3)</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Example 3: Finding Distance */}
        <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border-l-4 border-green-500">
          <h3 className="font-semibold text-lg mb-3">{t('examples.example3.title')}</h3>
          <p className="mb-4">{t('examples.example3.problem')}</p>
          
          <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example3.step1Label')}</span>
              <p className="ml-4"><MathRenderer math={String.raw`(x_1, y_1) = (1, 2), \quad (x_2, y_2) = (4, 6)`} /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example3.step2Label')}</span>
              <p className="ml-4"><MathRenderer math={String.raw`d = \sqrt{(4-1)^2 + (6-2)^2}`} /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example3.step3Label')}</span>
              <p className="ml-4"><MathRenderer math={String.raw`d = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25}`} /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example3.answerLabel')}</span>
              <p className="ml-4"><MathRenderer math="d = 5" /> {t('examples.example3.units')}</p>
            </div>
          </div>
        </div>

        {/* Example 4: Graphing a Line */}
        <div className="mb-6 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg border-l-4 border-orange-500">
          <h3 className="font-semibold text-lg mb-3">{t('examples.example4.title')}</h3>
          <p className="mb-4 font-medium">{t('examples.example4.problem')}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Steps and table */}
            <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div>
                <span className="font-semibold text-orange-600 dark:text-orange-400">{t('examples.example4.step1Label')}</span>
              </div>
              <div className="ml-4">
                <table className="w-full text-sm border border-gray-300 dark:border-gray-600">
                  <thead className="bg-orange-100 dark:bg-orange-900/30">
                    <tr>
                      <th className="p-2 border border-gray-300 dark:border-gray-600">x</th>
                      <th className="p-2 border border-gray-300 dark:border-gray-600">y = x + 1</th>
                      <th className="p-2 border border-gray-300 dark:border-gray-600">{t('examples.example4.point')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 text-center border border-gray-300 dark:border-gray-600">-2</td>
                      <td className="p-2 text-center border border-gray-300 dark:border-gray-600">-1</td>
                      <td className="p-2 text-center border border-gray-300 dark:border-gray-600 font-mono">(-2, -1)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 text-center border border-gray-300 dark:border-gray-600">0</td>
                      <td className="p-2 text-center border border-gray-300 dark:border-gray-600">1</td>
                      <td className="p-2 text-center border border-gray-300 dark:border-gray-600 font-mono">(0, 1)</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-center border border-gray-300 dark:border-gray-600">2</td>
                      <td className="p-2 text-center border border-gray-300 dark:border-gray-600">3</td>
                      <td className="p-2 text-center border border-gray-300 dark:border-gray-600 font-mono">(2, 3)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <span className="font-semibold text-orange-600 dark:text-orange-400">{t('examples.example4.step2Label')}</span>
                <p className="ml-4">{t('examples.example4.step2Text')}</p>
              </div>
              <div>
                <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example4.resultLabel')}</span>
                <p className="ml-4">{t('examples.example4.resultText')}</p>
              </div>
            </div>
            
            {/* Visual graph */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <svg viewBox="-110 -110 220 220" className="w-full h-auto">
                {/* Grid */}
                <defs>
                  <pattern id="linegrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.15"/>
                  </pattern>
                </defs>
                <rect x="-100" y="-100" width="200" height="200" fill="url(#linegrid)" />
                
                {/* Axes */}
                <line x1="-100" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                <line x1="0" y1="-100" x2="0" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                
                {/* Tick marks */}
                {[-4, -2, 2, 4].map(n => (
                  <g key={`tx-${n}`}>
                    <line x1={n * 20} y1="-2" x2={n * 20} y2="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    <text x={n * 20} y="12" fontSize="7" fill="currentColor" textAnchor="middle" opacity="0.6">{n}</text>
                  </g>
                ))}
                {[-4, -2, 2, 4].map(n => (
                  <g key={`ty-${n}`}>
                    <line x1="-2" y1={-n * 20} x2="2" y2={-n * 20} stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    <text x="-10" y={-n * 20 + 3} fontSize="7" fill="currentColor" textAnchor="middle" opacity="0.6">{n}</text>
                  </g>
                ))}
                
                {/* The line y = x + 1 */}
                <line x1="-60" y1="-20" x2="60" y2="80" stroke="#F97316" strokeWidth="3" />
                
                {/* Plot the points */}
                <circle cx="-40" cy="20" r="4" fill="#3B82F6" stroke="white" strokeWidth="2" />
                <text x="-40" y="32" fontSize="8" fill="#3B82F6" fontWeight="bold" textAnchor="middle">(-2,-1)</text>
                
                <circle cx="0" cy="20" r="4" fill="#10B981" stroke="white" strokeWidth="2" />
                <text x="0" y="32" fontSize="8" fill="#10B981" fontWeight="bold" textAnchor="middle">(0,1)</text>
                
                <circle cx="40" cy="60" r="4" fill="#A855F7" stroke="white" strokeWidth="2" />
                <text x="40" y="72" fontSize="8" fill="#A855F7" fontWeight="bold" textAnchor="middle">(2,3)</text>
                
                {/* Equation label */}
                <text x="45" y="-70" fontSize="10" fill="#F97316" fontWeight="bold">y = x + 1</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Applications */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">🌍 {t('realWorld.title')}</h2>
        <p className="mb-4">{t('realWorld.intro')}</p>
        
        <div className="space-y-4">
          {/* Application 1: Maps & Navigation */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app1.title')}</h3>
            <p className="mb-2">{t('realWorld.app1.description')}</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded mt-2">
              <p className="text-sm mb-2"><strong>{t('realWorld.app1.exampleLabel')}</strong> {t('realWorld.app1.example')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('realWorld.app1.meaning')}</p>
            </div>
          </div>

          {/* Application 2: Video Games */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app2.title')}</h3>
            <p className="mb-2">{t('realWorld.app2.description')}</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded mt-2">
              <p className="text-sm mb-2"><strong>{t('realWorld.app2.exampleLabel')}</strong> {t('realWorld.app2.example')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('realWorld.app2.meaning')}</p>
            </div>
          </div>

          {/* Application 3: Data Visualization */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app3.title')}</h3>
            <p className="mb-2">{t('realWorld.app3.description')}</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded mt-2">
              <p className="text-sm mb-2"><strong>{t('realWorld.app3.exampleLabel')}</strong> {t('realWorld.app3.example')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('realWorld.app3.meaning')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Exercises */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('exercises.title')}</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">{t('exercises.instruction')}</p>

        <div className="space-y-6">
          {/* Exercise 1 */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-lg mb-2">{t('exercises.exercise1.title')}</h3>
            <p className="mb-3">{t('exercises.exercise1.question')}</p>
            <details className="mt-4">
              <summary className="cursor-pointer text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                {t('exercises.exercise1.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise1.solutionLabel')}</strong></p>
                <p className="ml-4">{t('exercises.exercise1.solution')}</p>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise1.answerLabel')}</strong> {t('exercises.exercise1.answer')}</p>
              </div>
            </details>
          </div>

          {/* Exercise 2 */}
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-semibold text-lg mb-2">{t('exercises.exercise2.title')}</h3>
            <p className="mb-3">{t('exercises.exercise2.question')}</p>
            <details className="mt-4">
              <summary className="cursor-pointer text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                {t('exercises.exercise2.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise2.solutionLabel')}</strong></p>
                <p className="ml-4">{t('exercises.exercise2.solution')}</p>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise2.answerLabel')}</strong> {t('exercises.exercise2.answer')}</p>
              </div>
            </details>
          </div>

          {/* Exercise 3 */}
          <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold text-lg mb-2">{t('exercises.exercise3.title')}</h3>
            <p className="mb-3">{t('exercises.exercise3.question')}</p>
            <details className="mt-4">
              <summary className="cursor-pointer text-green-600 dark:text-green-400 font-semibold hover:underline">
                {t('exercises.exercise3.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise3.solutionLabel')}</strong></p>
                <div className="ml-4 space-y-1">
                  <p><MathRenderer math={String.raw`d = \sqrt{(7-3)^2 + (1-4)^2}`} /></p>
                  <p><MathRenderer math={String.raw`d = \sqrt{16 + 9} = \sqrt{25} = 5`} /></p>
                </div>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise3.answerLabel')}</strong> {t('exercises.exercise3.answer')}</p>
              </div>
            </details>
          </div>

          {/* Exercise 4 */}
          <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/10 dark:to-yellow-900/10 rounded-lg border-l-4 border-orange-500">
            <h3 className="font-semibold text-lg mb-2">{t('exercises.exercise4.title')}</h3>
            <p className="mb-3">{t('exercises.exercise4.question')}</p>
            <details className="mt-4">
              <summary className="cursor-pointer text-orange-600 dark:text-orange-400 font-semibold hover:underline">
                {t('exercises.exercise4.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise4.solutionLabel')}</strong></p>
                <div className="ml-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2">x</th>
                        <th className="p-2">y = 2x - 1</th>
                        <th className="p-2">{t('exercises.exercise4.pointHeader')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 text-center">0</td>
                        <td className="p-2 text-center">-1</td>
                        <td className="p-2 text-center">(0, -1)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 text-center">1</td>
                        <td className="p-2 text-center">1</td>
                        <td className="p-2 text-center">(1, 1)</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-center">2</td>
                        <td className="p-2 text-center">3</td>
                        <td className="p-2 text-center">(2, 3)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise4.answerLabel')}</strong> {t('exercises.exercise4.answer')}</p>
              </div>
            </details>
          </div>

          {/* Exercise 5 */}
          <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold text-lg mb-2">{t('exercises.exercise5.title')}</h3>
            <p className="mb-3">{t('exercises.exercise5.question')}</p>
            <details className="mt-4">
              <summary className="cursor-pointer text-red-600 dark:text-red-400 font-semibold hover:underline">
                {t('exercises.exercise5.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise5.solutionLabel')}</strong></p>
                <div className="ml-4 space-y-1">
                  <p><MathRenderer math={String.raw`M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)`} /></p>
                  <p><MathRenderer math={String.raw`M = \left(\frac{2 + 8}{2}, \frac{3 + 7}{2}\right) = (5, 5)`} /></p>
                </div>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise5.answerLabel')}</strong> {t('exercises.exercise5.answer')}</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Tips & Notes */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">💡 {t('tips.title')}</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold mb-2">{t('tips.tip1.title')}</h3>
            <p>{t('tips.tip1.text')}</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-semibold mb-2">{t('tips.tip2.title')}</h3>
            <p>{t('tips.tip2.text')}</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold mb-2">{t('tips.tip3.title')}</h3>
            <p>{t('tips.tip3.text')}</p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-semibold mb-2">{t('tips.tip4.title')}</h3>
            <p>{t('tips.tip4.text')}</p>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="my-8 p-6 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{t('conclusion.title')}</h2>
        <p className="mb-4">{t('conclusion.summary')}</p>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">{t('conclusion.keyPoints')}</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('conclusion.point1')}</li>
            <li>{t('conclusion.point2')}</li>
            <li>{t('conclusion.point3')}</li>
            <li>{t('conclusion.point4')}</li>
          </ul>
        </div>
        <p className="mt-4 italic">{t('conclusion.next')}</p>
      </section>

      <LessonNavigation navigation={navigation} />
    </div>
  );
}
