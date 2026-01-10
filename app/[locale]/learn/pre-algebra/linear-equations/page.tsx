'use client';

import { useTranslations } from 'next-intl';
import MathRenderer from '@/components/math/MathRenderer';
import LessonNavigation from '@/components/lesson/LessonNavigation';
import { getLessonNavigation } from '@/lib/lesson-navigation';

export default function LinearEquationsPage() {
  const t = useTranslations('linear-equations');
  const navigation = getLessonNavigation('pre-algebra', 'linear-equations');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {t('description')}
        </p>
      </header>

      {/* Introduction */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('definition.title')}</h2>
        <p className="mb-4">{t('definition.intro')}</p>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
          <p className="font-semibold mb-2">{t('definition.what')}</p>
          <p className="mb-4">{t('definition.explanation')}</p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono bg-white dark:bg-gray-800 px-3 py-1 rounded">
                <MathRenderer math="x + 5 = 12" />
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('definition.example1')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono bg-white dark:bg-gray-800 px-3 py-1 rounded">
                <MathRenderer math="3y - 7 = 20" />
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('definition.example2')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono bg-white dark:bg-gray-800 px-3 py-1 rounded">
                <MathRenderer math="2(a + 4) = 18" />
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('definition.example3')}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.goal')}</p>
          <p>{t('definition.goalText')}</p>
        </div>
      </section>

      {/* Key Concepts */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('concepts.title')}</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('concepts.balance.title')}</h3>
            <p className="mb-2">{t('concepts.balance.text')}</p>
            <div className="text-center text-2xl my-2">⚖️</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">{t('concepts.balance.example')}</p>
          </div>

          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('concepts.inverse.title')}</h3>
            <p className="mb-2">{t('concepts.inverse.text')}</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                <div className="font-semibold">{t('concepts.inverse.add')}</div>
                <div className="text-2xl">↕️</div>
                <div className="font-semibold">{t('concepts.inverse.subtract')}</div>
              </div>
              <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                <div className="font-semibold">{t('concepts.inverse.multiply')}</div>
                <div className="text-2xl">↕️</div>
                <div className="font-semibold">{t('concepts.inverse.divide')}</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('concepts.steps.title')}</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>{t('concepts.steps.step1')}</li>
              <li>{t('concepts.steps.step2')}</li>
              <li>{t('concepts.steps.step3')}</li>
              <li>{t('concepts.steps.step4')}</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Visual Explanations */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('visual.title')}</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                <th className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.type')}</th>
                <th className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.example')}</th>
                <th className="border border-gray-300 dark:border-gray-600 p-3">{t('visual.table.steps')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-3 font-semibold bg-blue-50 dark:bg-blue-900/10">
                  {t('visual.table.oneStep')}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono">
                  <MathRenderer math="x + 7 = 15" />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">
                  <div className="space-y-1 text-sm">
                    <div><MathRenderer math="x + 7 - 7 = 15 - 7" /></div>
                    <div><MathRenderer math="x = 8" /></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-3 font-semibold bg-purple-50 dark:bg-purple-900/10">
                  {t('visual.table.twoStep')}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono">
                  <MathRenderer math="3x - 4 = 11" />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">
                  <div className="space-y-1 text-sm">
                    <div><MathRenderer math="3x - 4 + 4 = 11 + 4" /></div>
                    <div><MathRenderer math="3x = 15" /></div>
                    <div><MathRenderer math="x = 5" /></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-3 font-semibold bg-green-50 dark:bg-green-900/10">
                  {t('visual.table.multiStep')}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono">
                  <MathRenderer math="2(x + 3) = 14" />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">
                  <div className="space-y-1 text-sm">
                    <div><MathRenderer math="2x + 6 = 14" /></div>
                    <div><MathRenderer math="2x = 8" /></div>
                    <div><MathRenderer math="x = 4" /></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Worked Examples */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('examples.title')}</h2>
        
        {/* Example 1: One-Step Equation */}
        <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-semibold text-lg mb-3">{t('examples.example1.title')}</h3>
          <p className="mb-4">{t('examples.example1.problem')}</p>
          
          <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{t('examples.example1.step1Label')}</span>
              <p className="ml-4"><MathRenderer math="x - 9 = 16" /></p>
            </div>
            <div>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{t('examples.example1.step2Label')}</span>
              <p className="ml-4">{t('examples.example1.step2Text')}</p>
              <p className="ml-4"><MathRenderer math="x - 9 + 9 = 16 + 9" /></p>
              <p className="ml-4"><MathRenderer math="x = 25" /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example1.checkLabel')}</span>
              <p className="ml-4"><MathRenderer math="25 - 9 = 16 \quad \checkmark" /></p>
            </div>
          </div>
        </div>

        {/* Example 2: Two-Step Equation */}
        <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border-l-4 border-purple-500">
          <h3 className="font-semibold text-lg mb-3">{t('examples.example2.title')}</h3>
          <p className="mb-4">{t('examples.example2.problem')}</p>
          
          <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div>
              <span className="font-semibold text-purple-600 dark:text-purple-400">{t('examples.example2.step1Label')}</span>
              <p className="ml-4"><MathRenderer math="5y + 8 = 33" /></p>
            </div>
            <div>
              <span className="font-semibold text-purple-600 dark:text-purple-400">{t('examples.example2.step2Label')}</span>
              <p className="ml-4">{t('examples.example2.step2Text')}</p>
              <p className="ml-4"><MathRenderer math="5y + 8 - 8 = 33 - 8" /></p>
              <p className="ml-4"><MathRenderer math="5y = 25" /></p>
            </div>
            <div>
              <span className="font-semibold text-purple-600 dark:text-purple-400">{t('examples.example2.step3Label')}</span>
              <p className="ml-4">{t('examples.example2.step3Text')}</p>
              <p className="ml-4"><MathRenderer math={String.raw`\frac{5y}{5} = \frac{25}{5}`} /></p>
              <p className="ml-4"><MathRenderer math="y = 5" /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example2.checkLabel')}</span>
              <p className="ml-4"><MathRenderer math={String.raw`5(5) + 8 = 25 + 8 = 33 \quad \checkmark`} /></p>
            </div>
          </div>
        </div>

        {/* Example 3: Multi-Step with Distributive Property */}
        <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border-l-4 border-green-500">
          <h3 className="font-semibold text-lg mb-3">{t('examples.example3.title')}</h3>
          <p className="mb-4">{t('examples.example3.problem')}</p>
          
          <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example3.step1Label')}</span>
              <p className="ml-4"><MathRenderer math="3(x - 2) = 15" /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example3.step2Label')}</span>
              <p className="ml-4">{t('examples.example3.step2Text')}</p>
              <p className="ml-4"><MathRenderer math={String.raw`3 \cdot x - 3 \cdot 2 = 15`} /></p>
              <p className="ml-4"><MathRenderer math="3x - 6 = 15" /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example3.step3Label')}</span>
              <p className="ml-4"><MathRenderer math="3x - 6 + 6 = 15 + 6" /></p>
              <p className="ml-4"><MathRenderer math="3x = 21" /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example3.step4Label')}</span>
              <p className="ml-4"><MathRenderer math={String.raw`\frac{3x}{3} = \frac{21}{3}`} /></p>
              <p className="ml-4"><MathRenderer math="x = 7" /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example3.checkLabel')}</span>
              <p className="ml-4"><MathRenderer math={String.raw`3(7 - 2) = 3(5) = 15 \quad \checkmark`} /></p>
            </div>
          </div>
        </div>

        {/* Example 4: Variable on Both Sides */}
        <div className="mb-6 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg border-l-4 border-orange-500">
          <h3 className="font-semibold text-lg mb-3">{t('examples.example4.title')}</h3>
          <p className="mb-4">{t('examples.example4.problem')}</p>
          
          <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div>
              <span className="font-semibold text-orange-600 dark:text-orange-400">{t('examples.example4.step1Label')}</span>
              <p className="ml-4"><MathRenderer math="7x - 3 = 4x + 12" /></p>
            </div>
            <div>
              <span className="font-semibold text-orange-600 dark:text-orange-400">{t('examples.example4.step2Label')}</span>
              <p className="ml-4">{t('examples.example4.step2Text')}</p>
              <p className="ml-4"><MathRenderer math="7x - 4x - 3 = 4x - 4x + 12" /></p>
              <p className="ml-4"><MathRenderer math="3x - 3 = 12" /></p>
            </div>
            <div>
              <span className="font-semibold text-orange-600 dark:text-orange-400">{t('examples.example4.step3Label')}</span>
              <p className="ml-4"><MathRenderer math="3x - 3 + 3 = 12 + 3" /></p>
              <p className="ml-4"><MathRenderer math="3x = 15" /></p>
            </div>
            <div>
              <span className="font-semibold text-orange-600 dark:text-orange-400">{t('examples.example4.step4Label')}</span>
              <p className="ml-4"><MathRenderer math={String.raw`\frac{3x}{3} = \frac{15}{3}`} /></p>
              <p className="ml-4"><MathRenderer math="x = 5" /></p>
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">{t('examples.example4.checkLabel')}</span>
              <p className="ml-4"><MathRenderer math="7(5) - 3 = 35 - 3 = 32" /></p>
              <p className="ml-4"><MathRenderer math={String.raw`4(5) + 12 = 20 + 12 = 32 \quad \checkmark`} /></p>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Applications */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">🌍 {t('realWorld.title')}</h2>
        <p className="mb-4">{t('realWorld.intro')}</p>
        
        <div className="space-y-4">
          {/* Application 1: Money & Budgeting */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app1.title')}</h3>
            <p className="mb-2">{t('realWorld.app1.description')}</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded mt-2">
              <p className="text-sm mb-2"><strong>{t('realWorld.app1.exampleLabel')}</strong> {t('realWorld.app1.example')}</p>
              <p className="font-mono text-sm"><MathRenderer math="x + 45 = 120" /></p>
              <p className="text-sm mt-1"><strong>{t('realWorld.app1.solutionLabel')}</strong> <MathRenderer math="x = 120 - 45 = 75" /></p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('realWorld.app1.answer')}</p>
            </div>
          </div>

          {/* Application 2: Age Problems */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app2.title')}</h3>
            <p className="mb-2">{t('realWorld.app2.description')}</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded mt-2">
              <p className="text-sm mb-2"><strong>{t('realWorld.app2.exampleLabel')}</strong> {t('realWorld.app2.example')}</p>
              <p className="font-mono text-sm"><MathRenderer math="3x = 36" /></p>
              <p className="text-sm mt-1"><strong>{t('realWorld.app2.solutionLabel')}</strong> <MathRenderer math="x = 36 \div 3 = 12" /></p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('realWorld.app2.answer')}</p>
            </div>
          </div>

          {/* Application 3: Shopping & Discounts */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app3.title')}</h3>
            <p className="mb-2">{t('realWorld.app3.description')}</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded mt-2">
              <p className="text-sm mb-2"><strong>{t('realWorld.app3.exampleLabel')}</strong> {t('realWorld.app3.example')}</p>
              <p className="font-mono text-sm"><MathRenderer math="x - 0.25x = 60" /></p>
              <p className="font-mono text-sm"><MathRenderer math="0.75x = 60" /></p>
              <p className="text-sm mt-1"><strong>{t('realWorld.app3.solutionLabel')}</strong> <MathRenderer math="x = 60 \div 0.75 = 80" /></p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('realWorld.app3.answer')}</p>
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
              <MathRenderer math="x + 12 = 27" />
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                {t('exercises.exercise1.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise1.solutionLabel')}</strong></p>
                <div className="space-y-1 ml-4">
                  <p><MathRenderer math="x + 12 - 12 = 27 - 12" /></p>
                  <p><MathRenderer math="x = 15" /></p>
                </div>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise1.answerLabel')}</strong> <MathRenderer math="x = 15" /></p>
              </div>
            </details>
          </div>

          {/* Exercise 2 */}
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-semibold text-lg mb-2">{t('exercises.exercise2.title')}</h3>
            <p className="mb-3">{t('exercises.exercise2.question')}</p>
            <div className="font-mono text-xl mb-4 p-3 bg-white dark:bg-gray-800 rounded inline-block">
              <MathRenderer math="4y - 9 = 23" />
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                {t('exercises.exercise2.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise2.solutionLabel')}</strong></p>
                <div className="space-y-1 ml-4">
                  <p><MathRenderer math="4y - 9 + 9 = 23 + 9" /></p>
                  <p><MathRenderer math="4y = 32" /></p>
                  <p><MathRenderer math="y = 8" /></p>
                </div>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise2.answerLabel')}</strong> <MathRenderer math="y = 8" /></p>
              </div>
            </details>
          </div>

          {/* Exercise 3 */}
          <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold text-lg mb-2">{t('exercises.exercise3.title')}</h3>
            <p className="mb-3">{t('exercises.exercise3.question')}</p>
            <div className="font-mono text-xl mb-4 p-3 bg-white dark:bg-gray-800 rounded inline-block">
              <MathRenderer math="2(m + 5) = 22" />
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-green-600 dark:text-green-400 font-semibold hover:underline">
                {t('exercises.exercise3.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise3.solutionLabel')}</strong></p>
                <div className="space-y-1 ml-4">
                  <p><MathRenderer math="2m + 10 = 22" /></p>
                  <p><MathRenderer math="2m = 12" /></p>
                  <p><MathRenderer math="m = 6" /></p>
                </div>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise3.answerLabel')}</strong> <MathRenderer math="m = 6" /></p>
              </div>
            </details>
          </div>

          {/* Exercise 4 */}
          <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/10 dark:to-yellow-900/10 rounded-lg border-l-4 border-orange-500">
            <h3 className="font-semibold text-lg mb-2">{t('exercises.exercise4.title')}</h3>
            <p className="mb-3">{t('exercises.exercise4.question')}</p>
            <div className="font-mono text-xl mb-4 p-3 bg-white dark:bg-gray-800 rounded inline-block">
              <MathRenderer math="6n - 5 = 3n + 10" />
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-orange-600 dark:text-orange-400 font-semibold hover:underline">
                {t('exercises.exercise4.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise4.solutionLabel')}</strong></p>
                <div className="space-y-1 ml-4">
                  <p><MathRenderer math="6n - 3n - 5 = 10" /></p>
                  <p><MathRenderer math="3n - 5 = 10" /></p>
                  <p><MathRenderer math="3n = 15" /></p>
                  <p><MathRenderer math="n = 5" /></p>
                </div>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise4.answerLabel')}</strong> <MathRenderer math="n = 5" /></p>
              </div>
            </details>
          </div>

          {/* Exercise 5 */}
          <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold text-lg mb-2">{t('exercises.exercise5.title')}</h3>
            <p className="mb-3">{t('exercises.exercise5.question')}</p>
            <div className="font-mono text-xl mb-4 p-3 bg-white dark:bg-gray-800 rounded inline-block">
              <MathRenderer math={String.raw`\frac{x}{3} + 7 = 15`} />
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-red-600 dark:text-red-400 font-semibold hover:underline">
                {t('exercises.exercise5.showAnswer')}
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded">
                <p className="mb-2"><strong>{t('exercises.exercise5.solutionLabel')}</strong></p>
                <div className="space-y-1 ml-4">
                  <p><MathRenderer math={String.raw`\frac{x}{3} = 8`} /></p>
                  <p><MathRenderer math="x = 24" /></p>
                </div>
                <p className="mt-2 text-green-600 dark:text-green-400"><strong>{t('exercises.exercise5.answerLabel')}</strong> <MathRenderer math="x = 24" /></p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Tips & Notes */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">💡 {t('tips.title')}</h2>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-semibold mb-2">{t('tips.tip1.title')}</h3>
            <p>{t('tips.tip1.text')}</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold mb-2">{t('tips.tip2.title')}</h3>
            <p>{t('tips.tip2.text')}</p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold mb-2">{t('tips.tip3.title')}</h3>
            <p>{t('tips.tip3.text')}</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold mb-2">{t('tips.tip4.title')}</h3>
            <p>{t('tips.tip4.text')}</p>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="my-8 p-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
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
