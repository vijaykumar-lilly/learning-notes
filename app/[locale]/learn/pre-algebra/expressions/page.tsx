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

export default function AlgebraicExpressionsLesson() {
  const t = useTranslations('expressions')
  const navigation = getLessonNavigation('pre-algebra', 'expressions')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* Introduction */}
      <Definition term={t('definition.algebraic.title')}>
        <p>{t.rich('definition.algebraic.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-1">{t('definition.algebraic.example1Label')}</p>
              <div className="text-2xl font-bold"><MathRenderer math="3x + 5" /></div>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-1">{t('definition.algebraic.example2Label')}</p>
              <div className="text-2xl font-bold"><MathRenderer math="2a^2 - 7b + 4" /></div>
            </div>
          </div>
        </div>
      </Definition>

      {/* Variables and Constants */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.variables.title')}</h2>
        
        <VisualExplanation 
          title={t('visuals.variables.title')}
          caption={t('visuals.variables.caption')}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">{t('visuals.variables.variableTitle')}</h4>
                <p className="text-sm mb-3">{t('visuals.variables.variableDesc')}</p>
                <div className="space-y-2 text-sm">
                  <div><MathRenderer math="x" /> - {t('visuals.variables.variable1')}</div>
                  <div><MathRenderer math="y" /> - {t('visuals.variables.variable2')}</div>
                  <div><MathRenderer math="n" /> - {t('visuals.variables.variable3')}</div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-400">{t('visuals.variables.constantTitle')}</h4>
                <p className="text-sm mb-3">{t('visuals.variables.constantDesc')}</p>
                <div className="space-y-2 text-sm">
                  <div><MathRenderer math="5" /> - {t('visuals.variables.constant1')}</div>
                  <div><MathRenderer math="-3" /> - {t('visuals.variables.constant2')}</div>
                  <div><MathRenderer math="\\pi" /> - {t('visuals.variables.constant3')}</div>
                </div>
              </div>
            </div>
          </div>
        </VisualExplanation>
      </section>

      {/* Terms and Coefficients */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.terms.title')}</h2>
        
        <Definition term={t('definition.terms.title')}>
          <p>{t.rich('definition.terms.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="font-semibold mb-2">{t('definition.terms.exampleLabel')}</p>
            <div className="text-2xl font-bold mb-3 text-center">
              <MathRenderer math="5x^2 + 3x - 7" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                <div className="font-semibold text-blue-600 dark:text-blue-400"><MathRenderer math="5x^2" /></div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t('definition.terms.term1')}</div>
              </div>
              <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                <div className="font-semibold text-green-600 dark:text-green-400"><MathRenderer math="3x" /></div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t('definition.terms.term2')}</div>
              </div>
              <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                <div className="font-semibold text-purple-600 dark:text-purple-400"><MathRenderer math="-7" /></div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t('definition.terms.term3')}</div>
              </div>
            </div>
          </div>
        </Definition>

        <div className="mt-6">
          <Definition term={t('definition.coefficient.title')}>
            <p>{t.rich('definition.coefficient.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <MathRenderer math="7x" />
                <span>→</span>
                <span>{t('definition.coefficient.example1')}</span>
              </div>
              <div className="flex items-center gap-3">
                <MathRenderer math="-3y^2" />
                <span>→</span>
                <span>{t('definition.coefficient.example2')}</span>
              </div>
              <div className="flex items-center gap-3">
                <MathRenderer math="x" />
                <span>→</span>
                <span>{t('definition.coefficient.example3')}</span>
              </div>
            </div>
          </Definition>
        </div>
      </section>

      {/* Like Terms */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.likeTerms.title')}</h2>
        
        <KeyConcept>
          <p className="mb-3">{t.rich('sections.likeTerms.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          
          <VisualExplanation 
            title={t('visuals.likeTerms.title')}
            caption={t('visuals.likeTerms.caption')}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full border-2 border-gray-300 dark:border-gray-600">
                <thead className="bg-blue-100 dark:bg-blue-900">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visuals.likeTerms.header1')}</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visuals.likeTerms.header2')}</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visuals.likeTerms.header3')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50 dark:bg-green-900/20">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <MathRenderer math="3x, 5x, -2x" />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <span className="text-green-600 dark:text-green-400 font-semibold">✓ {t('visuals.likeTerms.yes')}</span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm">
                      {t('visuals.likeTerms.reason1')}
                    </td>
                  </tr>
                  <tr className="bg-green-50 dark:bg-green-900/20">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <MathRenderer math="2y^2, -y^2, 7y^2" />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <span className="text-green-600 dark:text-green-400 font-semibold">✓ {t('visuals.likeTerms.yes')}</span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm">
                      {t('visuals.likeTerms.reason2')}
                    </td>
                  </tr>
                  <tr className="bg-red-50 dark:bg-red-900/20">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <MathRenderer math="4x, 4x^2" />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <span className="text-red-600 dark:text-red-400 font-semibold">✗ {t('visuals.likeTerms.no')}</span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm">
                      {t('visuals.likeTerms.reason3')}
                    </td>
                  </tr>
                  <tr className="bg-red-50 dark:bg-red-900/20">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <MathRenderer math="3x, 3y" />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <span className="text-red-600 dark:text-red-400 font-semibold">✗ {t('visuals.likeTerms.no')}</span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm">
                      {t('visuals.likeTerms.reason4')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VisualExplanation>
        </KeyConcept>
      </section>

      {/* Combining Like Terms */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.combining.title')}</h2>
        <p className="mb-4">{t('sections.combining.intro')}</p>

        <VisualExplanation 
          title={t('visuals.combining.title')}
          caption={t('visuals.combining.caption')}
        >
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('visuals.combining.step1')}</p>
              <div className="text-xl font-bold mb-2">
                <MathRenderer math="5x + 3 + 2x - 1" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('visuals.combining.step2')}</p>
              <div className="text-xl font-bold mb-2">
                <MathRenderer math="(5x + 2x) + (3 - 1)" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('visuals.combining.step3')}</p>
              <div className="text-xl font-bold text-green-600 dark:text-green-400">
                <MathRenderer math="7x + 2" />
              </div>
            </div>
          </div>
        </VisualExplanation>
      </section>

      {/* Distributive Property */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.distributive.title')}</h2>
        
        <KeyConcept>
          <div className="text-center mb-3">
            <div className="text-2xl font-bold">
              <MathRenderer math="a(b + c) = ab + ac" />
            </div>
          </div>
          <p className="mb-2">{t('sections.distributive.explanation')}</p>
          
          <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
            <p className="font-semibold mb-2">{t('sections.distributive.exampleLabel')}</p>
            <div className="space-y-2">
              <div><MathRenderer math="3(x + 4) = 3 \\cdot x + 3 \\cdot 4 = 3x + 12" /></div>
              <div><MathRenderer math="-2(y - 5) = -2 \\cdot y + (-2) \\cdot (-5) = -2y + 10" /></div>
            </div>
          </div>
        </KeyConcept>
      </section>

      {/* Evaluating Expressions */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.evaluating.title')}</h2>
        <p className="mb-4">{t('sections.evaluating.intro')}</p>

        <VisualExplanation 
          title={t('visuals.evaluating.title')}
          caption={t('visuals.evaluating.caption')}
        >
          <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg">
            <p className="font-semibold mb-2">{t('visuals.evaluating.problemLabel')}</p>
            <div className="text-xl mb-3"><MathRenderer math="2x + 5" /> {t('visuals.evaluating.when')} <MathRenderer math="x = 3" /></div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold">{t('visuals.evaluating.step1')}</span>
                <div className="ml-4"><MathRenderer math="2(3) + 5" /></div>
              </div>
              <div>
                <span className="font-semibold">{t('visuals.evaluating.step2')}</span>
                <div className="ml-4"><MathRenderer math="6 + 5" /></div>
              </div>
              <div>
                <span className="font-semibold">{t('visuals.evaluating.step3')}</span>
                <div className="ml-4 text-lg font-bold text-green-600 dark:text-green-400"><MathRenderer math="11" /></div>
              </div>
            </div>
          </div>
        </VisualExplanation>
      </section>

      {/* Examples */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">📝 {t('examples.title')}</h2>

        <Example
          title={t('examples.example1.title')}
          problem={<p>{t('examples.example1.question')}</p>}
          solution={
            <>
              <StepByStep steps={[
                { content: <p>{t('examples.example1.step1')}</p> },
                { content: <p>{t('examples.example1.step2')}</p> },
                { content: <p>{t('examples.example1.step3')}</p> }
              ]} />
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold">{t('examples.example1.answerLabel')}</p>
                <MathRenderer math="9x - 3" />
              </div>
            </>
          }
        />

        <Example
          title={t('examples.example2.title')}
          problem={<p>{t('examples.example2.question')}</p>}
          solution={
            <>
              <StepByStep steps={[
                { content: <p>{t('examples.example2.step1')}</p> },
                { content: <p>{t('examples.example2.step2')}</p> }
              ]} />
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold">{t('examples.example2.answerLabel')}</p>
                <MathRenderer math="4x + 12" />
              </div>
            </>
          }
        />

        <Example
          title={t('examples.example3.title')}
          problem={<p>{t('examples.example3.question')}</p>}
          solution={
            <>
              <StepByStep steps={[
                { content: <p>{t('examples.example3.step1')}</p> },
                { content: <p>{t('examples.example3.step2')}</p> },
                { content: <p>{t('examples.example3.step3')}</p> }
              ]} />
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold">{t('examples.example3.answerLabel')}</p>
                <MathRenderer math="17" />
              </div>
            </>
          }
        />
      </section>

      {/* Real World Applications */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">🌍 {t('realWorld.title')}</h2>
        <p className="mb-4">{t('realWorld.intro')}</p>
        
        <div className="space-y-4">
          {/* Application 1: Shopping & Discounts */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app1.title')}</h3>
            <p className="mb-2">{t('realWorld.app1.description')}</p>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p><strong>{t('realWorld.app1.exampleLabel')}</strong></p>
              <p>{t('realWorld.app1.example')}</p>
              <p className="mt-2 text-xs italic">{t('realWorld.app1.expression')}: <MathRenderer math="p - 0.2p" /></p>
            </div>
          </div>

          {/* Application 2: Temperature Conversion */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app2.title')}</h3>
            <p className="mb-2">{t('realWorld.app2.description')}</p>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p><strong>{t('realWorld.app2.exampleLabel')}</strong></p>
              <p>{t('realWorld.app2.example')}</p>
              <p className="mt-2 text-xs italic">{t('realWorld.app2.expression')}: <MathRenderer math="F = \\frac{9}{5}C + 32" /></p>
            </div>
          </div>

          {/* Application 3: Speed & Distance */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app3.title')}</h3>
            <p className="mb-2">{t('realWorld.app3.description')}</p>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p><strong>{t('realWorld.app3.exampleLabel')}</strong></p>
              <p>{t('realWorld.app3.example')}</p>
              <p className="mt-2 text-xs italic">{t('realWorld.app3.expression')}: <MathRenderer math="d = s \\times t" /></p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Exercises */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">✏️ {t('exercises.title')}</h2>

        <MultipleChoiceExercise
          question={t('exercises.exercise1.question')}
          choices={[
            { id: 'a', text: t('exercises.exercise1.option1'), isCorrect: false },
            { id: 'b', text: t('exercises.exercise1.option2'), isCorrect: false },
            { id: 'c', text: t('exercises.exercise1.option3'), isCorrect: true },
            { id: 'd', text: t('exercises.exercise1.option4'), isCorrect: false }
          ]}
          explanation={t('exercises.exercise1.explanation')}
        />

        <NumericInputExercise
          question={t('exercises.exercise2.question')}
          correctAnswer={15}
          hint={t('exercises.exercise2.hint')}
          solution={<p>{t('exercises.exercise2.explanation')}</p>}
        />

        <MultipleChoiceExercise
          question={t('exercises.exercise3.question')}
          choices={[
            { id: 'a', text: t('exercises.exercise3.option1'), isCorrect: false },
            { id: 'b', text: t('exercises.exercise3.option2'), isCorrect: true },
            { id: 'c', text: t('exercises.exercise3.option3'), isCorrect: false },
            { id: 'd', text: t('exercises.exercise3.option4'), isCorrect: false }
          ]}
          explanation={t('exercises.exercise3.explanation')}
        />

        <NumericInputExercise
          question={t('exercises.exercise4.question')}
          correctAnswer={3}
          hint={t('exercises.exercise4.hint')}
          solution={<p>{t('exercises.exercise4.explanation')}</p>}
        />

        <MultipleChoiceExercise
          question={t('exercises.exercise5.question')}
          choices={[
            { id: 'a', text: t('exercises.exercise5.option1'), isCorrect: false },
            { id: 'b', text: t('exercises.exercise5.option2'), isCorrect: false },
            { id: 'c', text: t('exercises.exercise5.option3'), isCorrect: true },
            { id: 'd', text: t('exercises.exercise5.option4'), isCorrect: false }
          ]}
          explanation={t('exercises.exercise5.explanation')}
        />
      </section>

      {/* Tips and Notes */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">💡 {t('notes.title')}</h2>
        
        <Note>{t('notes.tip1')}</Note>
        <Note>{t('notes.tip2')}</Note>
        <Note>{t('notes.tip3')}</Note>
        <Note>{t('notes.warning1')}</Note>
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
