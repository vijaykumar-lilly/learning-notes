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

export default function ExponentsLesson() {
  const t = useTranslations('exponents')
  const navigation = getLessonNavigation('pre-algebra', 'exponents')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* Introduction */}
      <Definition term={t('definition.exponents.title')}>
        <p>{t.rich('definition.exponents.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                <MathRenderer math="5^3" />
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">5</span>
                  <span className="text-gray-600 dark:text-gray-400">= {t('definition.exponents.base')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-600 dark:text-red-400 font-semibold">3</span>
                  <span className="text-gray-600 dark:text-gray-400">= {t('definition.exponents.exponent')}</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">
                <MathRenderer math="5^3 = 5 \times 5 \times 5 = 125" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('definition.exponents.meaning')}</p>
            </div>
          </div>
        </div>
      </Definition>

      {/* Exponents vs Powers */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.exponentVsPower.title')}</h2>
        
        <VisualExplanation 
          title={t('visuals.exponentVsPower.title')}
          caption={t('visuals.exponentVsPower.caption')}
        >
          <div className="space-y-6">
            {/* Similarities */}
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-700">
              <h3 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-400">
                ✓ {t('visuals.exponentVsPower.similaritiesTitle')}
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('visuals.exponentVsPower.similarity1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('visuals.exponentVsPower.similarity2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('visuals.exponentVsPower.similarity3')}</span>
                </li>
              </ul>
            </div>

            {/* Differences */}
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-2 border-orange-200 dark:border-orange-700">
              <h3 className="text-lg font-semibold mb-3 text-orange-700 dark:text-orange-400">
                ⚡ {t('visuals.exponentVsPower.differencesTitle')}
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 dark:border-gray-600">
                  <thead className="bg-orange-100 dark:bg-orange-900/40">
                    <tr>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{t('visuals.exponentVsPower.aspect')}</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{t('visuals.exponentVsPower.exponentCol')}</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{t('visuals.exponentVsPower.powerCol')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">{t('visuals.exponentVsPower.definition')}</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visuals.exponentVsPower.exponentDef')}</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visuals.exponentVsPower.powerDef')}</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">{t('visuals.exponentVsPower.example')}</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {t('visuals.exponentVsPower.exponentExample')} <MathRenderer math="2^5" /> {t('visuals.exponentVsPower.exponentIs')} <strong>5</strong>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {t('visuals.exponentVsPower.powerExample')} <MathRenderer math="2^5 = 32" /> {t('visuals.exponentVsPower.powerIs')} <strong>32</strong>
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">{t('visuals.exponentVsPower.usage')}</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visuals.exponentVsPower.exponentUsage')}</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visuals.exponentVsPower.powerUsage')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Insight */}
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm">
                <strong className="text-blue-700 dark:text-blue-400">💡 {t('visuals.exponentVsPower.keyInsight')}</strong>
                <br />
                {t('visuals.exponentVsPower.keyInsightText')}
              </p>
            </div>
          </div>
        </VisualExplanation>
      </section>

      {/* Reading Exponents */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.reading.title')}</h2>
        
        <VisualExplanation 
          title={t('visuals.reading.title')}
          caption={t('visuals.reading.caption')}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                <div className="text-2xl font-bold mb-2 text-center">
                  <MathRenderer math="2^4" />
                </div>
                <p className="text-center text-gray-700 dark:text-gray-300">
                  {t('visuals.reading.example1')}
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                <div className="text-2xl font-bold mb-2 text-center">
                  <MathRenderer math="10^6" />
                </div>
                <p className="text-center text-gray-700 dark:text-gray-300">
                  {t('visuals.reading.example2')}
                </p>
              </div>
            </div>
          </div>
        </VisualExplanation>
      </section>

      {/* Laws of Exponents */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.laws.title')}</h2>
        <p className="mb-4">{t('sections.laws.intro')}</p>

        {/* Product Rule */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">{t('sections.laws.product.title')}</h3>
          <KeyConcept>
            <div className="text-center mb-3">
              <div className="text-2xl font-bold">
                <MathRenderer math="a^m \times a^n = a^{m+n}" />
              </div>
            </div>
            <p className="mb-2">{t('sections.laws.product.explanation')}</p>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="font-semibold mb-1">{t('sections.laws.product.exampleLabel')}</p>
              <MathRenderer math="3^2 \times 3^4 = 3^{2+4} = 3^6 = 729" />
            </div>
          </KeyConcept>
        </div>

        {/* Quotient Rule */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">{t('sections.laws.quotient.title')}</h3>
          <KeyConcept>
            <div className="text-center mb-3">
              <div className="text-2xl font-bold">
                <MathRenderer math="\frac{a^m}{a^n} = a^{m-n}" />
              </div>
            </div>
            <p className="mb-2">{t('sections.laws.quotient.explanation')}</p>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
              <p className="font-semibold mb-1">{t('sections.laws.quotient.exampleLabel')}</p>
              <MathRenderer math="\frac{5^7}{5^3} = 5^{7-3} = 5^4 = 625" />
            </div>
          </KeyConcept>
        </div>

        {/* Power of a Power */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">{t('sections.laws.power.title')}</h3>
          <KeyConcept>
            <div className="text-center mb-3">
              <div className="text-2xl font-bold">
                <MathRenderer math="(a^m)^n = a^{m \times n}" />
              </div>
            </div>
            <p className="mb-2">{t('sections.laws.power.explanation')}</p>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
              <p className="font-semibold mb-1">{t('sections.laws.power.exampleLabel')}</p>
              <MathRenderer math="(2^3)^2 = 2^{3 \times 2} = 2^6 = 64" />
            </div>
          </KeyConcept>
        </div>

        {/* Power of a Product */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">{t('sections.laws.productPower.title')}</h3>
          <KeyConcept>
            <div className="text-center mb-3">
              <div className="text-2xl font-bold">
                <MathRenderer math="(ab)^n = a^n \times b^n" />
              </div>
            </div>
            <p className="mb-2">{t('sections.laws.productPower.explanation')}</p>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
              <p className="font-semibold mb-1">{t('sections.laws.productPower.exampleLabel')}</p>
              <MathRenderer math="(2 \times 3)^2 = 2^2 \times 3^2 = 4 \times 9 = 36" />
            </div>
          </KeyConcept>
        </div>
      </section>

      {/* Zero Exponent */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.zero.title')}</h2>
        
        <Definition term={t('definition.zero.title')}>
          <p>{t.rich('definition.zero.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <div className="mt-4 text-center">
            <div className="text-3xl font-bold mb-2">
              <MathRenderer math="a^0 = 1" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('definition.zero.condition')}</p>
          </div>
        </Definition>

        <VisualExplanation 
          title={t('visuals.zero.title')}
          caption={t('visuals.zero.caption')}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full border-2 border-gray-300 dark:border-gray-600">
              <thead className="bg-blue-100 dark:bg-blue-900">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visuals.zero.header1')}</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visuals.zero.header2')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { exp: '5^0', val: '1' },
                  { exp: '10^0', val: '1' },
                  { exp: '(-3)^0', val: '1' },
                  { exp: '100^0', val: '1' }
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <MathRenderer math={row.exp} />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center font-semibold text-green-600 dark:text-green-400">
                      {row.val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </VisualExplanation>
      </section>

      {/* Negative Exponents */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.negative.title')}</h2>
        
        <Definition term={t('definition.negative.title')}>
          <p>{t.rich('definition.negative.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <div className="mt-4 text-center">
            <div className="text-3xl font-bold mb-2">
              <MathRenderer math="a^{-n} = \frac{1}{a^n}" />
            </div>
          </div>
        </Definition>

        <VisualExplanation 
          title={t('visuals.negative.title')}
          caption={t('visuals.negative.caption')}
        >
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">
                  <MathRenderer math="2^{-3} = \frac{1}{2^3} = \frac{1}{8}" />
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">
                  <MathRenderer math="5^{-2} = \frac{1}{5^2} = \frac{1}{25}" />
                </div>
              </div>
            </div>
          </div>
        </VisualExplanation>
      </section>

      {/* Scientific Notation */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.scientific.title')}</h2>
        
        <Definition term={t('definition.scientific.title')}>
          <p>{t.rich('definition.scientific.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
            <p className="font-semibold mb-2">{t('definition.scientific.format')}</p>
            <div className="text-center text-xl">
              <MathRenderer math="a \times 10^n" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
              {t('definition.scientific.condition')}
            </p>
          </div>
        </Definition>

        <VisualExplanation 
          title={t('visuals.scientific.title')}
          caption={t('visuals.scientific.caption')}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('visuals.scientific.standardLabel')}</p>
                <p className="text-xl font-bold mb-2">3,000,000</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('visuals.scientific.scientificLabel')}</p>
                <div className="text-xl font-bold">
                  <MathRenderer math="3 \times 10^6" />
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('visuals.scientific.standardLabel')}</p>
                <p className="text-xl font-bold mb-2">0.000025</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('visuals.scientific.scientificLabel')}</p>
                <div className="text-xl font-bold">
                  <MathRenderer math="2.5 \times 10^{-5}" />
                </div>
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
                <MathRenderer math={t('examples.example1.answer')} />
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
                <MathRenderer math={t('examples.example2.answer')} />
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
                { content: <p>{t('examples.example3.step2')}</p> }
              ]} />
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold">{t('examples.example3.answerLabel')}</p>
                <MathRenderer math={t('examples.example3.answer')} />
              </div>
            </>
          }
        />
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
          correctAnswer={1}
          hint={t('exercises.exercise2.hint')}
          solution={<p>{t('exercises.exercise2.explanation')}</p>}
        />

        <NumericInputExercise
          question={t('exercises.exercise3.question')}
          correctAnswer={128}
          hint={t('exercises.exercise3.hint')}
          solution={<p>{t('exercises.exercise3.explanation')}</p>}
        />

        <MultipleChoiceExercise
          question={t('exercises.exercise4.question')}
          choices={[
            { id: 'a', text: t('exercises.exercise4.option1'), isCorrect: false },
            { id: 'b', text: t('exercises.exercise4.option2'), isCorrect: true },
            { id: 'c', text: t('exercises.exercise4.option3'), isCorrect: false },
            { id: 'd', text: t('exercises.exercise4.option4'), isCorrect: false }
          ]}
          explanation={t('exercises.exercise4.explanation')}
        />

        <NumericInputExercise
          question={t('exercises.exercise5.question')}
          correctAnswer={81}
          hint={t('exercises.exercise5.hint')}
          solution={<p>{t('exercises.exercise5.explanation')}</p>}
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
