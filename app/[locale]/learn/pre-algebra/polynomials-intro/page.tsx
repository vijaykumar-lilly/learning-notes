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

export default function PolynomialsIntroLesson() {
  const t = useTranslations('polynomials-intro')
  const navigation = getLessonNavigation('pre-algebra', 'polynomials-intro')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* Introduction */}
      <Definition term={t('definition.polynomial.title')}>
        <p>{t.rich('definition.polynomial.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.polynomial.examples')}</p>
          <div className="space-y-2 text-center">
            <div><MathRenderer math="3x^2 + 2x - 5" /></div>
            <div><MathRenderer math="x^4 - 7x^2 + 1" /></div>
            <div><MathRenderer math="5y^3 + 2y" /></div>
          </div>
        </div>
      </Definition>

      <Note>{t('notes.poly.content')}</Note>

      {/* Terms and Structure */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.terms.title')}</h2>
        
        <VisualExplanation 
          title={t('visuals.anatomy.title')}
          caption={t('visuals.anatomy.caption')}
        >
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold mb-2">
                <MathRenderer math="4x^3 - 2x^2 + 7x - 9" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <div className="font-bold text-blue-700 dark:text-blue-300 mb-1">
                  <MathRenderer math="4x^3" />
                </div>
                <p className="text-xs">{t('visuals.anatomy.term1')}</p>
                <p className="text-xs mt-1"><strong>{t('visuals.anatomy.coefficient')}:</strong> 4</p>
                <p className="text-xs"><strong>{t('visuals.anatomy.degree')}:</strong> 3</p>
              </div>
              
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <div className="font-bold text-green-700 dark:text-green-300 mb-1">
                  <MathRenderer math="-2x^2" />
                </div>
                <p className="text-xs">{t('visuals.anatomy.term2')}</p>
                <p className="text-xs mt-1"><strong>{t('visuals.anatomy.coefficient')}:</strong> -2</p>
                <p className="text-xs"><strong>{t('visuals.anatomy.degree')}:</strong> 2</p>
              </div>
              
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <div className="font-bold text-yellow-700 dark:text-yellow-300 mb-1">
                  <MathRenderer math="7x" />
                </div>
                <p className="text-xs">{t('visuals.anatomy.term3')}</p>
                <p className="text-xs mt-1"><strong>{t('visuals.anatomy.coefficient')}:</strong> 7</p>
                <p className="text-xs"><strong>{t('visuals.anatomy.degree')}:</strong> 1</p>
              </div>
              
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <div className="font-bold text-purple-700 dark:text-purple-300 mb-1">
                  <MathRenderer math="-9" />
                </div>
                <p className="text-xs">{t('visuals.anatomy.term4')}</p>
                <p className="text-xs mt-1"><strong>{t('visuals.anatomy.coefficient')}:</strong> -9</p>
                <p className="text-xs"><strong>{t('visuals.anatomy.degree')}:</strong> 0</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded">
              <p className="text-sm"><strong>{t('visuals.anatomy.polyDegree')}:</strong> {t('visuals.anatomy.polyDegreeValue')}</p>
            </div>
          </div>
        </VisualExplanation>
      </section>

      <KeyConcept>
        <p className="font-semibold mb-2">{t('keyConcept.degree.title')}</p>
        <p>{t('keyConcept.degree.content')}</p>
      </KeyConcept>

      {/* Types of Polynomials */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.types.title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-400">{t('sections.types.monomial.title')}</h4>
            <p className="text-sm mb-3">{t('sections.types.monomial.description')}</p>
            <div className="space-y-1 text-sm">
              <div><MathRenderer math="5x^2" /></div>
              <div><MathRenderer math="-3y" /></div>
              <div><MathRenderer math="7" /></div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 text-green-700 dark:text-green-400">{t('sections.types.binomial.title')}</h4>
            <p className="text-sm mb-3">{t('sections.types.binomial.description')}</p>
            <div className="space-y-1 text-sm">
              <div><MathRenderer math="x + 3" /></div>
              <div><MathRenderer math="2x^2 - 5" /></div>
              <div><MathRenderer math="4y - 7" /></div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">{t('sections.types.trinomial.title')}</h4>
            <p className="text-sm mb-3">{t('sections.types.trinomial.description')}</p>
            <div className="space-y-1 text-sm">
              <div><MathRenderer math="x^2 + 2x + 1" /></div>
              <div><MathRenderer math="3y^2 - y + 4" /></div>
              <div><MathRenderer math="a^2 + 5a - 6" /></div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
          <h4 className="font-semibold mb-2 text-orange-700 dark:text-orange-400">{t('sections.types.standard.title')}</h4>
          <p className="text-sm">{t('sections.types.standard.description')}</p>
          <div className="mt-2 text-center">
            <MathRenderer math="5x^3 + 2x^2 - 7x + 4" />
          </div>
          <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">{t('sections.types.standard.note')}</p>
        </div>
      </section>

      {/* Adding Polynomials */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.adding.title')}</h2>
        <p className="mb-4">{t('sections.adding.description')}</p>

        <VisualExplanation 
          title={t('visuals.adding.title')}
          caption={t('visuals.adding.caption')}
        >
          <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-semibold mb-2">{t('visuals.adding.problem')}</p>
                <div className="space-y-2">
                  <div><MathRenderer math="(3x^2 + 5x - 2)" /></div>
                  <div>+</div>
                  <div><MathRenderer math="(x^2 - 3x + 7)" /></div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-3xl text-green-600 dark:text-green-400">↓</div>
              </div>

              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.adding.step1')}</p>
                <div className="text-center">
                  <MathRenderer math="(3x^2 + x^2) + (5x - 3x) + (-2 + 7)" />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-3xl text-green-600 dark:text-green-400">↓</div>
              </div>

              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.adding.step2')}</p>
                <div className="text-center text-xl font-bold text-green-700 dark:text-green-300">
                  <MathRenderer math="4x^2 + 2x + 5" />
                </div>
              </div>
            </div>
          </div>
        </VisualExplanation>
      </section>

      {/* Example 1: Adding */}
      <Example
        title={t('examples.adding.title')}
        problem={
          <div>
            <p className="mb-2">{t('examples.adding.problem')}</p>
            <div className="text-center">
              <MathRenderer math="(2x^2 + 3x - 1) + (4x^2 - x + 5)" />
            </div>
          </div>
        }
        solution={
          <>
            <StepByStep steps={[
              { content: <p>{t('examples.adding.step1')}: <MathRenderer math="2x^2 + 4x^2" /></p> },
              { content: <p>{t('examples.adding.step2')}: <MathRenderer math="3x - x" /></p> },
              { content: <p>{t('examples.adding.step3')}: <MathRenderer math="-1 + 5" /></p> },
              { content: <p>{t('examples.adding.step4')}: <MathRenderer math="6x^2 + 2x + 4" /></p> }
            ]} />
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="font-semibold">{t('examples.adding.answerLabel')}</p>
              <MathRenderer math="6x^2 + 2x + 4" />
            </div>
          </>
        }
      />

      {/* Subtracting Polynomials */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.subtracting.title')}</h2>
        <p className="mb-4">{t('sections.subtracting.description')}</p>

        <Note>{t('notes.distribute.content')}</Note>

        <VisualExplanation 
          title={t('visuals.subtracting.title')}
          caption={t('visuals.subtracting.caption')}
        >
          <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-semibold mb-2">{t('visuals.subtracting.problem')}</p>
                <div className="space-y-2">
                  <div><MathRenderer math="(5x^2 + 3x - 4)" /></div>
                  <div>−</div>
                  <div><MathRenderer math="(2x^2 + x - 6)" /></div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-3xl text-orange-600 dark:text-orange-400">↓</div>
              </div>

              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.subtracting.step1')}</p>
                <div className="text-center">
                  <MathRenderer math="5x^2 + 3x - 4 - 2x^2 - x + 6" />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-3xl text-orange-600 dark:text-orange-400">↓</div>
              </div>

              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.subtracting.step2')}</p>
                <div className="text-center text-xl font-bold text-orange-700 dark:text-orange-300">
                  <MathRenderer math="3x^2 + 2x + 2" />
                </div>
              </div>
            </div>
          </div>
        </VisualExplanation>
      </section>

      {/* Example 2: Subtracting */}
      <Example
        title={t('examples.subtracting.title')}
        problem={
          <div>
            <p className="mb-2">{t('examples.subtracting.problem')}</p>
            <div className="text-center">
              <MathRenderer math="(7x^2 - 2x + 3) - (3x^2 + 4x - 1)" />
            </div>
          </div>
        }
        solution={
          <>
            <StepByStep steps={[
              { content: <p>{t('examples.subtracting.step1')}: <MathRenderer math="7x^2 - 2x + 3 - 3x^2 - 4x + 1" /></p> },
              { content: <p>{t('examples.subtracting.step2')}: <MathRenderer math="(7x^2 - 3x^2) + (-2x - 4x) + (3 + 1)" /></p> },
              { content: <p>{t('examples.subtracting.step3')}: <MathRenderer math="4x^2 - 6x + 4" /></p> }
            ]} />
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="font-semibold">{t('examples.subtracting.answerLabel')}</p>
              <MathRenderer math="4x^2 - 6x + 4" />
            </div>
          </>
        }
      />

      {/* Multiplying Polynomials */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.multiplying.title')}</h2>
        <p className="mb-4">{t('sections.multiplying.description')}</p>

        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg mb-6">
          <p className="font-semibold mb-2">{t('sections.multiplying.monomial')}</p>
          <div className="text-center space-y-2">
            <div><MathRenderer math="3x(2x^2 + 5x - 1)" /></div>
            <div>↓</div>
            <div><MathRenderer math="3x \\cdot 2x^2 + 3x \\cdot 5x + 3x \\cdot (-1)" /></div>
            <div>↓</div>
            <div className="font-bold text-purple-700 dark:text-purple-300">
              <MathRenderer math="6x^3 + 15x^2 - 3x" />
            </div>
          </div>
        </div>

        <KeyConcept>
          <p className="font-semibold mb-2">{t('keyConcept.multiply.title')}</p>
          <p>{t('keyConcept.multiply.content')}</p>
        </KeyConcept>
      </section>

      {/* Example 3: Multiplying */}
      <Example
        title={t('examples.multiplying.title')}
        problem={
          <div>
            <p className="mb-2">{t('examples.multiplying.problem')}</p>
            <div className="text-center">
              <MathRenderer math="4x(x^2 - 3x + 2)" />
            </div>
          </div>
        }
        solution={
          <>
            <StepByStep steps={[
              { content: <p>{t('examples.multiplying.step1')}</p> },
              { content: <p>{t('examples.multiplying.step2')}: <MathRenderer math="4x \\cdot x^2 = 4x^3" /></p> },
              { content: <p>{t('examples.multiplying.step3')}: <MathRenderer math="4x \\cdot (-3x) = -12x^2" /></p> },
              { content: <p>{t('examples.multiplying.step4')}: <MathRenderer math="4x \\cdot 2 = 8x" /></p> }
            ]} />
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="font-semibold">{t('examples.multiplying.answerLabel')}</p>
              <MathRenderer math="4x^3 - 12x^2 + 8x" />
            </div>
          </>
        }
      />

      {/* Factoring Basics */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.factoring.title')}</h2>
        <p className="mb-4">{t('sections.factoring.description')}</p>

        <VisualExplanation 
          title={t('visuals.factoring.title')}
          caption={t('visuals.factoring.caption')}
        >
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-semibold mb-2">{t('visuals.factoring.problem')}</p>
                <div className="text-xl">
                  <MathRenderer math="6x^2 + 9x" />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-3xl text-indigo-600 dark:text-indigo-400">↓</div>
              </div>

              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.factoring.step1')}</p>
                <p className="text-sm text-center">{t('visuals.factoring.step1Detail')}</p>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-3xl text-indigo-600 dark:text-indigo-400">↓</div>
              </div>

              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.factoring.step2')}</p>
                <div className="text-center text-xl font-bold text-indigo-700 dark:text-indigo-300">
                  <MathRenderer math="3x(2x + 3)" />
                </div>
              </div>
            </div>
          </div>
        </VisualExplanation>
      </section>

      {/* Practice Exercises */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">✏️ {t('exercises.title')}</h2>

        <MultipleChoiceExercise
          question={t('exercises.exercise1.question')}
          choices={[
            { id: 'a', text: '2', isCorrect: false },
            { id: 'b', text: '3', isCorrect: true },
            { id: 'c', text: '4', isCorrect: false },
            { id: 'd', text: '5', isCorrect: false }
          ]}
          explanation={t('exercises.exercise1.explanation')}
        />

        <NumericInputExercise
          question={t('exercises.exercise2.question')}
          correctAnswer={7}
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
          correctAnswer={-8}
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

        <NumericInputExercise
          question={t('exercises.exercise6.question')}
          correctAnswer={2}
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

      {/* Real World Applications */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('realWorld.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 text-green-700 dark:text-green-400">{t('realWorld.area.title')}</h4>
            <p className="text-sm">{t('realWorld.area.description')}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-400">{t('realWorld.physics.title')}</h4>
            <p className="text-sm">{t('realWorld.physics.description')}</p>
          </div>
        </div>
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
