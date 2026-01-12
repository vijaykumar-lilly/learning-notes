'use client'

import MathRenderer from '@/components/math/MathRenderer'
import { Definition, Example, KeyConcept, StepByStep, VisualExplanation, Note } from '@/components/lesson'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'
import { useTranslations } from 'next-intl'

export default function LinearEquationsPage() {
  const t = useTranslations('linear-equations')
  const navigation = getLessonNavigation('pre-algebra', 'linear-equations')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* Introduction */}
      <Definition term={t('definition.title')}>
        <p className="mb-4">{t('definition.intro')}</p>
        
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-3">{t('definition.what')}</p>
          <p className="mb-3 text-sm">{t('definition.explanation')}</p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <MathRenderer math="x + 5 = 12" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('definition.example1')}</span>
            </div>
            <div className="flex items-center gap-3">
              <MathRenderer math="3y - 7 = 20" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('definition.example2')}</span>
            </div>
            <div className="flex items-center gap-3">
              <MathRenderer math="2(a + 4) = 18" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('definition.example3')}</span>
            </div>
          </div>
        </div>
      </Definition>

      <Note>
        <p><strong>{t('definition.goal')}</strong></p>
        <p>{t('definition.goalText')}</p>
      </Note>

      {/* Key Concepts */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('concepts.title')}</h2>
        
        <KeyConcept>
          <h3 className="font-semibold text-lg mb-2">{t('concepts.balance.title')}</h3>
          <p className="mb-4">{t('concepts.balance.text')}</p>
          
          <VisualExplanation title={t('concepts.balance.example')}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <p className="text-center font-mono mb-3"><MathRenderer math="x + 3 = 7" /></p>
              <svg viewBox="0 0 300 150" className="w-full max-w-md mx-auto">
                <line x1="50" y1="70" x2="250" y2="70" stroke="currentColor" strokeWidth="4" opacity="0.7"/>
                <polygon points="150,70 140,85 160,85" fill="#6B7280"/>
                <rect x="145" y="85" width="10" height="50" fill="#6B7280"/>
                <rect x="60" y="40" width="60" height="30" fill="#3B82F6" opacity="0.7" stroke="#3B82F6" strokeWidth="2"/>
                <text x="90" y="60" fontSize="14" fill="white" fontWeight="bold" textAnchor="middle">x + 3</text>
                <line x1="90" y1="40" x2="90" y2="70" stroke="currentColor" strokeWidth="2"/>
                <rect x="180" y="40" width="60" height="30" fill="#10B981" opacity="0.7" stroke="#10B981" strokeWidth="2"/>
                <text x="210" y="60" fontSize="18" fill="white" fontWeight="bold" textAnchor="middle">7</text>
                <line x1="210" y1="40" x2="210" y2="70" stroke="currentColor" strokeWidth="2"/>
                <text x="150" y="115" fontSize="24" fill="currentColor" textAnchor="middle">=</text>
                <text x="90" y="140" fontSize="11" fill="#3B82F6" textAnchor="middle">Left Side</text>
                <text x="210" y="140" fontSize="11" fill="#10B981" textAnchor="middle">Right Side</text>
              </svg>
            </div>
          </VisualExplanation>
        </KeyConcept>

        <VisualExplanation title={t('concepts.inverse.title')} caption={t('concepts.inverse.text')}>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
              <div className="font-semibold">{t('concepts.inverse.add')}</div>
              <div className="text-3xl my-2">↕️</div>
              <div className="font-semibold">{t('concepts.inverse.subtract')}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <div className="font-semibold">{t('concepts.inverse.multiply')}</div>
              <div className="text-3xl my-2">↕️</div>
              <div className="font-semibold">{t('concepts.inverse.divide')}</div>
            </div>
          </div>
        </VisualExplanation>

        <StepByStep 
          title={t('concepts.steps.title')}
          steps={[
            { content: <p>{t('concepts.steps.step1')}</p> },
            { content: <p>{t('concepts.steps.step2')}</p> },
            { content: <p>{t('concepts.steps.step3')}</p> },
            { content: <p>{t('concepts.steps.step4')}</p> }
          ]}
        />
      </section>

      {/* Visual Examples Table */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('visual.title')}</h2>
        
        <VisualExplanation title={t('visual.title')}>
          <div className="overflow-x-auto">
            <table className="min-w-full border-2 border-gray-300 dark:border-gray-600">
              <thead className="bg-blue-100 dark:bg-blue-900">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visual.table.type')}</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visual.table.example')}</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visual.table.steps')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">{t('visual.table.oneStep')}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-center">
                    <MathRenderer math="x + 7 = 15" />
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                    <div className="space-y-1 text-sm">
                      <div><MathRenderer math="x + 7 - 7 = 15 - 7" /></div>
                      <div><MathRenderer math="x = 8" /></div>
                    </div>
                  </td>
                </tr>
                <tr className="bg-purple-50 dark:bg-purple-900/20">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">{t('visual.table.twoStep')}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-center">
                    <MathRenderer math="3x - 4 = 11" />
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                    <div className="space-y-1 text-sm">
                      <div><MathRenderer math="3x - 4 + 4 = 11 + 4" /></div>
                      <div><MathRenderer math="3x = 15" /></div>
                      <div><MathRenderer math="x = 5" /></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">{t('visual.table.multiStep')}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-center">
                    <MathRenderer math="2(x + 3) = 14" />
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
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
        </VisualExplanation>
      </section>

      {/* Worked Examples */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('examples.title')}</h2>
        
        <Example
          title={t('examples.example1.title')}
          problem={<p>{t('examples.example1.problem')}</p>}
          solution={
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">{t('examples.example1.step1Label')}</p>
                <MathRenderer math="x - 9 = 16" />
              </div>
              <div>
                <p className="font-semibold text-sm">{t('examples.example1.step2Label')}</p>
                <p className="text-sm mb-2">{t('examples.example1.step2Text')}</p>
                <div className="space-y-1">
                  <MathRenderer math="x - 9 + 9 = 16 + 9" />
                  <MathRenderer math="x = 25" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm text-green-600 dark:text-green-400">{t('examples.example1.checkLabel')}</p>
                <MathRenderer math="25 - 9 = 16 \quad \checkmark" />
              </div>
            </div>
          }
        />

        <Example
          title={t('examples.example2.title')}
          problem={<p>{t('examples.example2.problem')}</p>}
          solution={
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">{t('examples.example2.step1Label')}</p>
                <MathRenderer math="5y + 8 = 33" />
              </div>
              <div>
                <p className="font-semibold text-sm">{t('examples.example2.step2Label')}</p>
                <p className="text-sm mb-2">{t('examples.example2.step2Text')}</p>
                <div className="space-y-1">
                  <MathRenderer math="5y + 8 - 8 = 33 - 8" />
                  <MathRenderer math="5y = 25" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm">{t('examples.example2.step3Label')}</p>
                <p className="text-sm mb-2">{t('examples.example2.step3Text')}</p>
                <div className="space-y-1">
                  <MathRenderer math={String.raw`\frac{5y}{5} = \frac{25}{5}`} />
                  <MathRenderer math="y = 5" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm text-green-600 dark:text-green-400">{t('examples.example2.checkLabel')}</p>
                <MathRenderer math={String.raw`5(5) + 8 = 25 + 8 = 33 \quad \checkmark`} />
              </div>
            </div>
          }
        />

        <Example
          title={t('examples.example3.title')}
          problem={<p>{t('examples.example3.problem')}</p>}
          solution={
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">{t('examples.example3.step1Label')}</p>
                <MathRenderer math="4(x - 2) = 20" />
              </div>
              <div>
                <p className="font-semibold text-sm">{t('examples.example3.step2Label')}</p>
                <p className="text-sm mb-2">{t('examples.example3.step2Text')}</p>
                <MathRenderer math="4x - 8 = 20" />
              </div>
              <div>
                <p className="font-semibold text-sm">{t('examples.example3.step3Label')}</p>
                <p className="text-sm mb-2">{t('examples.example3.step3Text')}</p>
                <div className="space-y-1">
                  <MathRenderer math="4x - 8 + 8 = 20 + 8" />
                  <MathRenderer math="4x = 28" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm">{t('examples.example3.step4Label')}</p>
                <p className="text-sm mb-2">{t('examples.example3.step4Text')}</p>
                <div className="space-y-1">
                  <MathRenderer math={String.raw`\frac{4x}{4} = \frac{28}{4}`} />
                  <MathRenderer math="x = 7" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm text-green-600 dark:text-green-400">{t('examples.example3.checkLabel')}</p>
                <MathRenderer math={String.raw`4(7 - 2) = 4(5) = 20 \quad \checkmark`} />
              </div>
            </div>
          }
        />
      </section>

      {/* Real World */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">🌍 {t('realWorld.title')}</h2>
        <p className="mb-4">{t('realWorld.intro')}</p>
        
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app1.title')}</h3>
            <p className="mb-2">{t('realWorld.app1.description')}</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded mt-2">
              <p className="text-sm"><strong>{t('realWorld.app1.exampleLabel')}</strong> {t('realWorld.app1.example')}</p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app2.title')}</h3>
            <p className="mb-2">{t('realWorld.app2.description')}</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded mt-2">
              <p className="text-sm"><strong>{t('realWorld.app2.exampleLabel')}</strong> {t('realWorld.app2.example')}</p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app3.title')}</h3>
            <p className="mb-2">{t('realWorld.app3.description')}</p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded mt-2">
              <p className="text-sm"><strong>{t('realWorld.app3.exampleLabel')}</strong> {t('realWorld.app3.example')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Exercises */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('exercises.title')}</h2>
        
        {[1, 2, 3, 4, 5].map(num => (
          <div key={num} className="mb-4 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">{t(`exercises.exercise${num}.title`)}</h3>
            <p className="mb-3">{t(`exercises.exercise${num}.question`)}</p>
            <details className="mt-2">
              <summary className="cursor-pointer text-blue-600 dark:text-blue-400 font-semibold">
                {t(`exercises.exercise${num}.showAnswer`)}
              </summary>
              <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="font-semibold text-sm mb-2">{t(`exercises.exercise${num}.solutionLabel`)}</p>
                <div className="text-sm">{t(`exercises.exercise${num}.solution`)}</div>
                <p className="mt-2 text-green-600 dark:text-green-400 font-semibold">
                  {t(`exercises.exercise${num}.answerLabel`)} {t(`exercises.exercise${num}.answer`)}
                </p>
              </div>
            </details>
          </div>
        ))}
      </section>

      {/* Tips */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('tips.title')}</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4].map(num => (
            <Note key={num}>
              <p className="font-semibold">{t(`tips.tip${num}.title`)}</p>
              <p>{t(`tips.tip${num}.text`)}</p>
            </Note>
          ))}
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
  )
}
