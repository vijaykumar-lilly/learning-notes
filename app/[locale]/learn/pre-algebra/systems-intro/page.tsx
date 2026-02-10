'use client'

import MathRenderer from '@/components/math/MathRenderer'
import { 
  Definition, 
  Example, 
  KeyConcept, 
  Note, 
  StepByStep,
  VisualExplanation
} from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise } from '@/components/interactive'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'
import { useTranslations } from 'next-intl'

export default function SystemsIntroLesson() {
  const t = useTranslations('systems-intro')
  const navigation = getLessonNavigation('pre-algebra', 'systems-intro')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* Introduction */}
      <Definition term={t('definition.system.title')}>
        <p>{t.rich('definition.system.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.system.example')}</p>
          <div className="text-center space-y-2">
            <div className="text-xl"><MathRenderer math="2x + y = 10" /></div>
            <div className="text-xl"><MathRenderer math="x - y = 2" /></div>
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{t('definition.system.explanation')}</p>
        </div>
      </Definition>

      <Note>{t('notes.solution.content')}</Note>

      {/* Real World Example */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('realWorld.title')}</h2>
        <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('realWorld.tickets.title')}</p>
          <p className="mb-3 text-sm">{t('realWorld.tickets.problem')}</p>
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <span className="font-semibold">{t('realWorld.tickets.equation1Label')}</span>
              <MathRenderer math="a + c = 50" />
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <span className="font-semibold">{t('realWorld.tickets.equation2Label')}</span>
              <MathRenderer math="15a + 10c = 650" />
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">{t('realWorld.tickets.note')}</p>
        </div>
      </section>

      {/* Graphing Method */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('methods.graphing.title')}</h2>
        <p className="mb-4">{t('methods.graphing.description')}</p>

        <VisualExplanation 
          title={t('visuals.graphing.title')}
          caption={t('visuals.graphing.caption')}
        >
          <svg viewBox="0 0 500 450" className="w-full h-auto">
            <text x="250" y="25" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold text-lg">
              {t('visuals.graphing.heading')}
            </text>
            
            {/* Grid lines */}
            {Array.from({length: 11}, (_, i) => (
              <g key={`grid-${i}`}>
                <line x1="50" y1={50 + i * 35} x2="450" y2={50 + i * 35} 
                  className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="0.5"/>
                <line x1={50 + i * 40} y1="50" x2={50 + i * 40} y2="400" 
                  className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="0.5"/>
              </g>
            ))}
            
            {/* Axes */}
            <line x1="50" y1="225" x2="450" y2="225" className="stroke-gray-600 dark:stroke-gray-400" strokeWidth="2"/>
            <line x1="250" y1="50" x2="250" y2="400" className="stroke-gray-600 dark:stroke-gray-400" strokeWidth="2"/>
            
            {/* Axis labels */}
            {[-4, -2, 0, 2, 4].map((num, i) => (
              <text key={`x-${num}`} x={250 + num * 40} y="245" textAnchor="middle" 
                className="fill-gray-700 dark:fill-gray-300 text-xs">
                {num}
              </text>
            ))}
            {[-4, -2, 0, 2, 4].map((num, i) => (
              <text key={`y-${num}`} x="235" y={225 - num * 35 + 5} textAnchor="end" 
                className="fill-gray-700 dark:fill-gray-300 text-xs">
                {num}
              </text>
            ))}
            
            {/* Line 1: y = -2x + 4 */}
            <line x1="130" y1="85" x2="370" y2="365" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="3"/>
            <text x="150" y="100" className="fill-blue-600 dark:fill-blue-400 font-semibold text-sm">
              y = -2x + 4
            </text>
            
            {/* Line 2: y = x + 1 */}
            <line x1="90" y1="295" x2="410" y2="120" className="stroke-red-600 dark:stroke-red-400" strokeWidth="3"/>
            <text x="350" y="140" className="fill-red-600 dark:fill-red-400 font-semibold text-sm">
              y = x + 1
            </text>
            
            {/* Intersection point (1, 2) */}
            <circle cx="290" cy="155" r="6" className="fill-green-500 stroke-green-700" strokeWidth="2"/>
            <text x="305" y="150" className="fill-green-700 dark:fill-green-300 font-bold text-sm">
              (1, 2)
            </text>
            <text x="305" y="165" className="fill-green-700 dark:fill-green-300 text-xs">
              {t('visuals.graphing.solution')}
            </text>
            
            {/* Axis labels */}
            <text x="440" y="245" className="fill-gray-600 dark:fill-gray-400 font-semibold">x</text>
            <text x="260" y="65" className="fill-gray-600 dark:fill-gray-400 font-semibold">y</text>
          </svg>
        </VisualExplanation>

        <KeyConcept>
          <p className="font-semibold mb-2">{t('keyConcept.graphing.title')}</p>
          <p>{t('keyConcept.graphing.content')}</p>
        </KeyConcept>
      </section>

      {/* Example 1: Graphing */}
      <Example
        title={t('examples.graphing.title')}
        problem={
          <div>
            <p className="mb-2">{t('examples.graphing.problem')}</p>
            <div className="text-center space-y-1">
              <div><MathRenderer math="y = x + 3" /></div>
              <div><MathRenderer math="y = -x + 1" /></div>
            </div>
          </div>
        }
        solution={
          <>
            <StepByStep steps={[
              { content: <p>{t('examples.graphing.step1')}</p> },
              { content: <p>{t('examples.graphing.step2')}</p> },
              { content: <p>{t('examples.graphing.step3')}</p> }
            ]} />
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="font-semibold">{t('examples.graphing.answerLabel')}</p>
              <MathRenderer math="(-1, 2)" />
            </div>
          </>
        }
      />

      {/* Substitution Method */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('methods.substitution.title')}</h2>
        <p className="mb-4">{t('methods.substitution.description')}</p>

        <VisualExplanation 
          title={t('visuals.substitution.title')}
          caption={t('visuals.substitution.caption')}
        >
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <div className="space-y-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.substitution.step1Label')}</p>
                <div className="text-center">
                  <MathRenderer math="y = 2x - 1" />
                  <MathRenderer math="3x + y = 9" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-purple-600 dark:text-purple-400">↓</div>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.substitution.step2Label')}</p>
                <div className="text-center">
                  <MathRenderer math="3x + (2x - 1) = 9" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-purple-600 dark:text-purple-400">↓</div>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.substitution.step3Label')}</p>
                <div className="text-center">
                  <MathRenderer math="5x - 1 = 9" />
                  <MathRenderer math="5x = 10" />
                  <MathRenderer math="x = 2" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-purple-600 dark:text-purple-400">↓</div>
              </div>
              
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.substitution.step4Label')}</p>
                <div className="text-center">
                  <MathRenderer math="y = 2(2) - 1 = 3" />
                  <p className="mt-2 font-bold text-green-700 dark:text-green-300">
                    {t('visuals.substitution.solution')}: (2, 3)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </VisualExplanation>
      </section>

      {/* Example 2: Substitution */}
      <Example
        title={t('examples.substitution.title')}
        problem={
          <div>
            <p className="mb-2">{t('examples.substitution.problem')}</p>
            <div className="text-center space-y-1">
              <div><MathRenderer math="x = 3y + 2" /></div>
              <div><MathRenderer math="2x + y = 11" /></div>
            </div>
          </div>
        }
        solution={
          <>
            <StepByStep steps={[
              { content: <p>{t('examples.substitution.step1')}: <MathRenderer math="2(3y + 2) + y = 11" /></p> },
              { content: <p>{t('examples.substitution.step2')}: <MathRenderer math="6y + 4 + y = 11" /></p> },
              { content: <p>{t('examples.substitution.step3')}: <MathRenderer math="7y = 7" />, <MathRenderer math="y = 1" /></p> },
              { content: <p>{t('examples.substitution.step4')}: <MathRenderer math="x = 3(1) + 2 = 5" /></p> }
            ]} />
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="font-semibold">{t('examples.substitution.answerLabel')}</p>
              <MathRenderer math="(5, 1)" />
            </div>
          </>
        }
      />

      {/* Elimination Method */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('methods.elimination.title')}</h2>
        <p className="mb-4">{t('methods.elimination.description')}</p>

        <VisualExplanation 
          title={t('visuals.elimination.title')}
          caption={t('visuals.elimination.caption')}
        >
          <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg">
            <div className="space-y-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.elimination.step1Label')}</p>
                <div className="flex justify-around items-center">
                  <div className="text-center">
                    <MathRenderer math="2x + 3y = 13" />
                    <MathRenderer math="2x - y = 5" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-orange-600 dark:text-orange-400">↓</div>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.elimination.step2Label')}</p>
                <div className="text-center">
                  <div className="flex justify-center items-center space-x-4">
                    <MathRenderer math="2x + 3y = 13" />
                    <span>−</span>
                    <MathRenderer math="(2x - y = 5)" />
                  </div>
                  <div className="mt-2 border-t-2 border-gray-400 pt-2">
                    <MathRenderer math="4y = 8" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-orange-600 dark:text-orange-400">↓</div>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.elimination.step3Label')}</p>
                <div className="text-center">
                  <MathRenderer math="y = 2" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-orange-600 dark:text-orange-400">↓</div>
              </div>
              
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.elimination.step4Label')}</p>
                <div className="text-center">
                  <MathRenderer math="2x - 2 = 5" />
                  <MathRenderer math="x = 3.5" />
                  <p className="mt-2 font-bold text-green-700 dark:text-green-300">
                    {t('visuals.elimination.solution')}: (3.5, 2)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </VisualExplanation>
      </section>

      {/* Example 3: Elimination */}
      <Example
        title={t('examples.elimination.title')}
        problem={
          <div>
            <p className="mb-2">{t('examples.elimination.problem')}</p>
            <div className="text-center space-y-1">
              <div><MathRenderer math="3x + 2y = 16" /></div>
              <div><MathRenderer math="3x - y = 4" /></div>
            </div>
          </div>
        }
        solution={
          <>
            <StepByStep steps={[
              { content: <p>{t('examples.elimination.step1')}</p> },
              { content: <p>{t('examples.elimination.step2')}: <MathRenderer math="3y = 12" /></p> },
              { content: <p>{t('examples.elimination.step3')}: <MathRenderer math="y = 4" /></p> },
              { content: <p>{t('examples.elimination.step4')}: <MathRenderer math="3x + 2(4) = 16" />, <MathRenderer math="x = \\frac{8}{3}" /></p> }
            ]} />
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="font-semibold">{t('examples.elimination.answerLabel')}</p>
              <MathRenderer math="(\\frac{8}{3}, 4)" />
            </div>
          </>
        }
      />

      {/* Types of Solutions */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.solutions.title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 text-green-700 dark:text-green-400">{t('sections.solutions.one.title')}</h4>
            <p className="text-sm mb-3">{t('sections.solutions.one.description')}</p>
            <svg viewBox="0 0 200 200" className="w-full h-auto">
              <line x1="20" y1="100" x2="180" y2="100" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1"/>
              <line x1="100" y1="20" x2="100" y2="180" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1"/>
              <line x1="40" y1="150" x2="160" y2="50" className="stroke-blue-500" strokeWidth="2"/>
              <line x1="40" y1="60" x2="160" y2="140" className="stroke-red-500" strokeWidth="2"/>
              <circle cx="100" cy="100" r="4" className="fill-green-500"/>
            </svg>
            <p className="text-xs text-center mt-2">{t('sections.solutions.one.graph')}</p>
          </div>

          <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 text-yellow-700 dark:text-yellow-400">{t('sections.solutions.none.title')}</h4>
            <p className="text-sm mb-3">{t('sections.solutions.none.description')}</p>
            <svg viewBox="0 0 200 200" className="w-full h-auto">
              <line x1="20" y1="100" x2="180" y2="100" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1"/>
              <line x1="100" y1="20" x2="100" y2="180" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1"/>
              <line x1="40" y1="120" x2="160" y2="60" className="stroke-blue-500" strokeWidth="2"/>
              <line x1="40" y1="140" x2="160" y2="80" className="stroke-red-500" strokeWidth="2"/>
            </svg>
            <p className="text-xs text-center mt-2">{t('sections.solutions.none.graph')}</p>
          </div>

          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">{t('sections.solutions.infinite.title')}</h4>
            <p className="text-sm mb-3">{t('sections.solutions.infinite.description')}</p>
            <svg viewBox="0 0 200 200" className="w-full h-auto">
              <line x1="20" y1="100" x2="180" y2="100" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1"/>
              <line x1="100" y1="20" x2="100" y2="180" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1"/>
              <line x1="40" y1="140" x2="160" y2="60" className="stroke-purple-500" strokeWidth="4"/>
            </svg>
            <p className="text-xs text-center mt-2">{t('sections.solutions.infinite.graph')}</p>
          </div>
        </div>
      </section>

      {/* Practice Exercises */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">✏️ {t('exercises.title')}</h2>

        <MultipleChoiceExercise
          question={t('exercises.exercise1.question')}
          choices={[
            { id: 'a', text: '(1, 3)', isCorrect: false },
            { id: 'b', text: '(2, 3)', isCorrect: true },
            { id: 'c', text: '(3, 2)', isCorrect: false },
            { id: 'd', text: '(3, 3)', isCorrect: false }
          ]}
          explanation={t('exercises.exercise1.explanation')}
        />

        <NumericInputExercise
          question={t('exercises.exercise2.question')}
          correctAnswer={4}
          hint={t('exercises.exercise2.hint')}
          solution={<p>{t('exercises.exercise2.explanation')}</p>}
        />

        <MultipleChoiceExercise
          question={t('exercises.exercise3.question')}
          choices={[
            { id: 'a', text: t('exercises.exercise3.option1'), isCorrect: false },
            { id: 'b', text: t('exercises.exercise3.option2'), isCorrect: false },
            { id: 'c', text: t('exercises.exercise3.option3'), isCorrect: true },
            { id: 'd', text: t('exercises.exercise3.option4'), isCorrect: false }
          ]}
          explanation={t('exercises.exercise3.explanation')}
        />

        <NumericInputExercise
          question={t('exercises.exercise4.question')}
          correctAnswer={6}
          hint={t('exercises.exercise4.hint')}
          solution={<p>{t('exercises.exercise4.explanation')}</p>}
        />

        <MultipleChoiceExercise
          question={t('exercises.exercise5.question')}
          choices={[
            { id: 'a', text: t('exercises.exercise5.option1'), isCorrect: false },
            { id: 'b', text: t('exercises.exercise5.option2'), isCorrect: true },
            { id: 'c', text: t('exercises.exercise5.option3'), isCorrect: false },
            { id: 'd', text: t('exercises.exercise5.option4'), isCorrect: false }
          ]}
          explanation={t('exercises.exercise5.explanation')}
        />

        <NumericInputExercise
          question={t('exercises.exercise6.question')}
          correctAnswer={8}
          hint={t('exercises.exercise6.hint')}
          solution={<p>{t('exercises.exercise6.explanation')}</p>}
        />
      </section>

      {/* Tips and Notes */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">💡 {t('notes.title')}</h2>
        
        <Note>{t('notes.tip1')}</Note>
        <Note>{t('notes.tip2')}</Note>
        <Note>{t('notes.tip3')}</Note>
      </section>

      {/* Conclusion */}
      <section className="my-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{t('conclusion.title')}</h2>
        <p className="mb-4">{t('conclusion.summary')}</p>
        
        <div className="mt-4">
          <p className="font-semibold mb-2">{t('conclusion.keyTakeawaysTitle')}</p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>{t('conclusion.takeaway1')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>{t('conclusion.takeaway2')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>{t('conclusion.takeaway3')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>{t('conclusion.takeaway4')}</span>
            </li>
          </ul>
        </div>
      </section>

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
