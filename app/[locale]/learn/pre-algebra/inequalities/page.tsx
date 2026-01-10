'use client';

import { useTranslations } from 'next-intl';
import MathRenderer from '@/components/math/MathRenderer';
import LessonNavigation from '@/components/lesson/LessonNavigation';
import { getLessonNavigation } from '@/lib/lesson-navigation';

export default function InequalitiesPage() {
  const t = useTranslations('inequalities');
  const navigation = getLessonNavigation('pre-algebra', 'inequalities');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold mb-2">{t('definition.equation.title')}</h3>
            <p className="text-sm mb-2">{t('definition.equation.description')}</p>
            <div className="font-mono bg-white dark:bg-gray-800 px-3 py-2 rounded text-center">
              <MathRenderer math="x = 5" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{t('definition.equation.meaning')}</p>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h3 className="font-semibold mb-2">{t('definition.inequality.title')}</h3>
            <p className="text-sm mb-2">{t('definition.inequality.description')}</p>
            <div className="font-mono bg-white dark:bg-gray-800 px-3 py-2 rounded text-center">
              <MathRenderer math="x > 5" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{t('definition.inequality.meaning')}</p>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
          <h3 className="font-semibold mb-3">{t('definition.symbols.title')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
              <div className="text-2xl mb-1"><MathRenderer math=">" /></div>
              <div className="text-sm font-semibold">{t('definition.symbols.gt')}</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
              <div className="text-2xl mb-1"><MathRenderer math="<" /></div>
              <div className="text-sm font-semibold">{t('definition.symbols.lt')}</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
              <div className="text-2xl mb-1"><MathRenderer math={String.raw`\geq`} /></div>
              <div className="text-sm font-semibold">{t('definition.symbols.gte')}</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
              <div className="text-2xl mb-1"><MathRenderer math={String.raw`\leq`} /></div>
              <div className="text-sm font-semibold">{t('definition.symbols.lte')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Concepts */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('concepts.title')}</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('concepts.solving.title')}</h3>
            <p className="mb-2">{t('concepts.solving.text')}</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>{t('concepts.solving.rule1')}</li>
              <li>{t('concepts.solving.rule2')}</li>
            </ul>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold text-lg mb-2">⚠️ {t('concepts.flip.title')}</h3>
            <p className="mb-2">{t('concepts.flip.text')}</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded mt-2">
              <p className="text-sm font-semibold mb-2">{t('concepts.flip.example')}</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MathRenderer math="-2x < 6" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('concepts.flip.original')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MathRenderer math="x > -3" />
                  <span className="text-sm text-red-600 dark:text-red-400">{t('concepts.flip.flipped')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('concepts.numberline.title')}</h3>
            <p className="mb-3">{t('concepts.numberline.text')}</p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded">
                <p className="text-sm font-semibold mb-1"><MathRenderer math="x > 3" /></p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t('concepts.numberline.open')}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded">
                <p className="text-sm font-semibold mb-1"><MathRenderer math={String.raw`x \geq 3`} /></p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t('concepts.numberline.closed')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Explanations */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('visual.title')}</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                <th className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.symbol')}</th>
                <th className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.meaning')}</th>
                <th className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.example')}</th>
                <th className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.graph')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-3 text-center font-mono text-xl">
                  <MathRenderer math=">" />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">
                  {t('visual.table.gtMeaning')}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono">
                  <MathRenderer math="x > 2" />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3 text-sm">
                  {t('visual.table.gtGraph')}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-3 text-center font-mono text-xl">
                  <MathRenderer math="<" />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">
                  {t('visual.table.ltMeaning')}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono">
                  <MathRenderer math="x < -1" />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3 text-sm">
                  {t('visual.table.ltGraph')}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-3 text-center font-mono text-xl">
                  <MathRenderer math={String.raw`\geq`} />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">
                  {t('visual.table.gteMeaning')}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono">
                  <MathRenderer math={String.raw`x \geq 0`} />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3 text-sm">
                  {t('visual.table.gteGraph')}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-3 text-center font-mono text-xl">
                  <MathRenderer math={String.raw`\leq`} />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">
                  {t('visual.table.lteMeaning')}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono">
                  <MathRenderer math={String.raw`x \leq 5`} />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3 text-sm">
                  {t('visual.table.lteGraph')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Worked Examples */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('examples.title')}</h2>
        
        {/* Example 1: Simple Inequality */}
        <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-semibold text-lg mb-3">{t('examples.example1.title')}</h3>
          <p className="mb-4">{t('examples.example1.problem')}</p>
          
          <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{t('examples.example1.step1Label')}</span>
              <p className="ml-4"><MathRenderer math="x + 7 > 12" /></p>
            </div>
            <div>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{t('examples.example1.step2Label')}</span>
              <p className="ml-4">{t('examples.example1.step2Text')}</p>
              <p className="ml-4"><MathRenderer math="x + 7 - 7 > 12 - 7" /></p>
              <p className="ml-4"><MathRenderer math="x > 5" /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example1.solutionLabel')}</span>
              <p className="ml-4">{t('examples.example1.solutionText')}</p>
            </div>
          </div>
        </div>

        {/* Example 2: Two-Step Inequality */}
        <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border-l-4 border-purple-500">
          <h3 className="font-semibold text-lg mb-3">{t('examples.example2.title')}</h3>
          <p className="mb-4">{t('examples.example2.problem')}</p>
          
          <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div>
              <span className="font-semibold text-purple-600 dark:text-purple-400">{t('examples.example2.step1Label')}</span>
              <p className="ml-4"><MathRenderer math={String.raw`3x - 4 \leq 11`} /></p>
            </div>
            <div>
              <span className="font-semibold text-purple-600 dark:text-purple-400">{t('examples.example2.step2Label')}</span>
              <p className="ml-4">{t('examples.example2.step2Text')}</p>
              <p className="ml-4"><MathRenderer math={String.raw`3x - 4 + 4 \leq 11 + 4`} /></p>
              <p className="ml-4"><MathRenderer math={String.raw`3x \leq 15`} /></p>
            </div>
            <div>
              <span className="font-semibold text-purple-600 dark:text-purple-400">{t('examples.example2.step3Label')}</span>
              <p className="ml-4">{t('examples.example2.step3Text')}</p>
              <p className="ml-4"><MathRenderer math={String.raw`x \leq 5`} /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example2.solutionLabel')}</span>
              <p className="ml-4">{t('examples.example2.solutionText')}</p>
            </div>
          </div>
        </div>

        {/* Example 3: Negative Coefficient (Flip Sign) */}
        <div className="mb-6 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg border-l-4 border-red-500">
          <h3 className="font-semibold text-lg mb-3">{t('examples.example3.title')}</h3>
          <p className="mb-4">{t('examples.example3.problem')}</p>
          
          <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div>
              <span className="font-semibold text-red-600 dark:text-red-400">{t('examples.example3.step1Label')}</span>
              <p className="ml-4"><MathRenderer math="-4x > 20" /></p>
            </div>
            <div>
              <span className="font-semibold text-red-600 dark:text-red-400">{t('examples.example3.step2Label')}</span>
              <p className="ml-4">{t('examples.example3.step2Text')}</p>
              <p className="ml-4"><MathRenderer math={String.raw`\frac{-4x}{-4} < \frac{20}{-4}`} /></p>
              <p className="ml-4"><MathRenderer math="x < -5" /></p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded">
              <p className="text-sm font-semibold text-red-700 dark:text-red-300">{t('examples.example3.note')}</p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example3.solutionLabel')}</span>
              <p className="ml-4">{t('examples.example3.solutionText')}</p>
            </div>
          </div>
        </div>

        {/* Example 4: Compound Inequality */}
        <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border-l-4 border-green-500">
          <h3 className="font-semibold text-lg mb-3">{t('examples.example4.title')}</h3>
          <p className="mb-4">{t('examples.example4.problem')}</p>
          
          <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example4.step1Label')}</span>
              <p className="ml-4"><MathRenderer math={String.raw`-3 < 2x + 1 \leq 9`} /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example4.step2Label')}</span>
              <p className="ml-4">{t('examples.example4.step2Text')}</p>
              <p className="ml-4"><MathRenderer math={String.raw`-3 - 1 < 2x + 1 - 1 \leq 9 - 1`} /></p>
              <p className="ml-4"><MathRenderer math={String.raw`-4 < 2x \leq 8`} /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example4.step3Label')}</span>
              <p className="ml-4">{t('examples.example4.step3Text')}</p>
              <p className="ml-4"><MathRenderer math={String.raw`-2 < x \leq 4`} /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example4.solutionLabel')}</span>
              <p className="ml-4">{t('examples.example4.solutionText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Applications */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">🌍 {t('realWorld.title')}</h2>
        <p className="mb-4">{t('realWorld.intro')}</p>
        
        <div className="space-y-4">
          {/* Application 1: Budget Constraints */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app1.title')}</h3>
            <p className="mb-2">{t('realWorld.app1.description')}</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded mt-2">
              <p className="text-sm mb-2"><strong>{t('realWorld.app1.exampleLabel')}</strong> {t('realWorld.app1.example')}</p>
              <p className="font-mono text-sm"><MathRenderer math={String.raw`3x + 25 \leq 100`} /></p>
              <p className="text-sm mt-1"><strong>{t('realWorld.app1.solutionLabel')}</strong> <MathRenderer math={String.raw`x \leq 25`} /></p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('realWorld.app1.answer')}</p>
            </div>
          </div>

          {/* Application 2: Temperature Ranges */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app2.title')}</h3>
            <p className="mb-2">{t('realWorld.app2.description')}</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded mt-2">
              <p className="text-sm mb-2"><strong>{t('realWorld.app2.exampleLabel')}</strong> {t('realWorld.app2.example')}</p>
              <p className="font-mono text-sm"><MathRenderer math={String.raw`65 \leq F \leq 75`} /></p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('realWorld.app2.meaning')}</p>
            </div>
          </div>

          {/* Application 3: Speed Limits */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app3.title')}</h3>
            <p className="mb-2">{t('realWorld.app3.description')}</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded mt-2">
              <p className="text-sm mb-2"><strong>{t('realWorld.app3.exampleLabel')}</strong> {t('realWorld.app3.example')}</p>
              <p className="font-mono text-sm"><MathRenderer math={String.raw`s \leq 65`} /></p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('realWorld.app3.meaning')}</p>
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
            <div className="font-mono text-xl mb-4 p-3 bg-white dark:bg-gray-800 rounded inline-block">
              <MathRenderer math={String.raw`x - 8 \geq 3`} />
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                {t('exercises.exercise1.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise1.solutionLabel')}</strong></p>
                <div className="space-y-1 ml-4">
                  <p><MathRenderer math={String.raw`x - 8 + 8 \geq 3 + 8`} /></p>
                  <p><MathRenderer math={String.raw`x \geq 11`} /></p>
                </div>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise1.answerLabel')}</strong> <MathRenderer math={String.raw`x \geq 11`} /></p>
              </div>
            </details>
          </div>

          {/* Exercise 2 */}
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-semibold text-lg mb-2">{t('exercises.exercise2.title')}</h3>
            <p className="mb-3">{t('exercises.exercise2.question')}</p>
            <div className="font-mono text-xl mb-4 p-3 bg-white dark:bg-gray-800 rounded inline-block">
              <MathRenderer math="5y + 2 < 27" />
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                {t('exercises.exercise2.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise2.solutionLabel')}</strong></p>
                <div className="space-y-1 ml-4">
                  <p><MathRenderer math="5y + 2 - 2 < 27 - 2" /></p>
                  <p><MathRenderer math="5y < 25" /></p>
                  <p><MathRenderer math="y < 5" /></p>
                </div>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise2.answerLabel')}</strong> <MathRenderer math="y < 5" /></p>
              </div>
            </details>
          </div>

          {/* Exercise 3 */}
          <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold text-lg mb-2">{t('exercises.exercise3.title')}</h3>
            <p className="mb-3">{t('exercises.exercise3.question')}</p>
            <div className="font-mono text-xl mb-4 p-3 bg-white dark:bg-gray-800 rounded inline-block">
              <MathRenderer math={String.raw`-3m \leq 18`} />
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-red-600 dark:text-red-400 font-semibold hover:underline">
                {t('exercises.exercise3.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise3.solutionLabel')}</strong></p>
                <div className="space-y-1 ml-4">
                  <p><MathRenderer math={String.raw`\frac{-3m}{-3} \geq \frac{18}{-3}`} /></p>
                  <p><MathRenderer math={String.raw`m \geq -6`} /></p>
                </div>
                <p className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 rounded text-sm">
                  <strong>{t('exercises.exercise3.note')}</strong>
                </p>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise3.answerLabel')}</strong> <MathRenderer math={String.raw`m \geq -6`} /></p>
              </div>
            </details>
          </div>

          {/* Exercise 4 */}
          <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold text-lg mb-2">{t('exercises.exercise4.title')}</h3>
            <p className="mb-3">{t('exercises.exercise4.question')}</p>
            <div className="font-mono text-xl mb-4 p-3 bg-white dark:bg-gray-800 rounded inline-block">
              <MathRenderer math={String.raw`\frac{n}{4} + 3 > 7`} />
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-green-600 dark:text-green-400 font-semibold hover:underline">
                {t('exercises.exercise4.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise4.solutionLabel')}</strong></p>
                <div className="space-y-1 ml-4">
                  <p><MathRenderer math={String.raw`\frac{n}{4} > 4`} /></p>
                  <p><MathRenderer math="n > 16" /></p>
                </div>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise4.answerLabel')}</strong> <MathRenderer math="n > 16" /></p>
              </div>
            </details>
          </div>

          {/* Exercise 5 */}
          <div className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-semibold text-lg mb-2">{t('exercises.exercise5.title')}</h3>
            <p className="mb-3">{t('exercises.exercise5.question')}</p>
            <div className="font-mono text-xl mb-4 p-3 bg-white dark:bg-gray-800 rounded inline-block">
              <MathRenderer math={String.raw`1 < 3x - 2 \leq 10`} />
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-yellow-600 dark:text-yellow-400 font-semibold hover:underline">
                {t('exercises.exercise5.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise5.solutionLabel')}</strong></p>
                <div className="space-y-1 ml-4">
                  <p><MathRenderer math={String.raw`3 < 3x \leq 12`} /></p>
                  <p><MathRenderer math={String.raw`1 < x \leq 4`} /></p>
                </div>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise5.answerLabel')}</strong> <MathRenderer math={String.raw`1 < x \leq 4`} /></p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Tips & Notes */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">💡 {t('tips.title')}</h2>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold mb-2">{t('tips.tip1.title')}</h3>
            <p>{t('tips.tip1.text')}</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
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
      <section className="my-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
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
