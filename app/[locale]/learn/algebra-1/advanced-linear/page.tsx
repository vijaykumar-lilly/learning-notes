'use client'

import MathRenderer from '@/components/math/MathRenderer'
import { 
  Definition, 
  Example, 
  KeyConcept, 
  Note, 
  StepByStep,
  VisualExplanation,
  BeforeYouStart,
  CommonMistake,
  WhatsNext
} from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise } from '@/components/interactive'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'
import { useTranslations } from 'next-intl'

export default function AdvancedLinearLesson() {
  const t = useTranslations('advanced-linear')
  const navigation = getLessonNavigation('algebra-1', 'advanced-linear')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* Before You Start */}
      <BeforeYouStart 
        prerequisites={[
          {
            title: t('prerequisites.skill1.title'),
            description: t('prerequisites.skill1.description')
          },
          {
            title: t('prerequisites.skill2.title'),
            description: t('prerequisites.skill2.description')
          },
          {
            title: t('prerequisites.skill3.title'),
            description: t('prerequisites.skill3.description')
          }
        ]} 
      />

      {/* Introduction */}
      <Definition term={t('definition.advanced.title')}>
        <p>{t.rich('definition.advanced.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <p className="mt-2">{t('definition.advanced.discovery')}</p>
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.advanced.examples')}</p>
          <div className="space-y-2">
            <div><MathRenderer math="3(2x - 5) + 4 = 2(x + 7)" /></div>
            <div><MathRenderer math="|2x - 3| = 7" /></div>
            <div><MathRenderer math="\\frac{x}{3} + \\frac{2x - 1}{4} = 5" /></div>
          </div>
        </div>
      </Definition>

      {/* Multi-Step Equations */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.multiStep.title')}</h2>
        <p className="mb-4">{t('sections.multiStep.intro')}</p>

        <VisualExplanation 
          title={t('visuals.multiStep.title')}
          caption={t('visuals.multiStep.caption')}
          zoomable={true}
        >
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg w-full">
            <div className="space-y-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.multiStep.step1Label')}</p>
                <div className="text-center text-lg">
                  <MathRenderer math="3(2x - 5) + 4 = 2(x + 7)" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-purple-600 dark:text-purple-400">↓</div>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.multiStep.step2Label')}</p>
                <div className="text-center">
                  <MathRenderer math="6x - 15 + 4 = 2x + 14" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-purple-600 dark:text-purple-400">↓</div>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.multiStep.step3Label')}</p>
                <div className="text-center">
                  <MathRenderer math="6x - 11 = 2x + 14" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-purple-600 dark:text-purple-400">↓</div>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.multiStep.step4Label')}</p>
                <div className="text-center">
                  <MathRenderer math="4x = 25" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-purple-600 dark:text-purple-400">↓</div>
              </div>
              
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.multiStep.step5Label')}</p>
                <div className="text-center text-xl font-bold text-green-700 dark:text-green-300">
                  <MathRenderer math="x = \\frac{25}{4} = 6.25" />
                </div>
              </div>
            </div>
          </div>
        </VisualExplanation>

        <KeyConcept>
          <p className="font-semibold mb-2">{t('keyConcept.steps.title')}</p>
          <p>{t('keyConcept.steps.content')}</p>
        </KeyConcept>
      </section>

      {/* Equations with Fractions */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.fractions.title')}</h2>
        <p className="mb-4">{t('sections.fractions.intro')}</p>

        <VisualExplanation 
          title={t('visuals.fractions.title')}
          caption={t('visuals.fractions.caption')}
          zoomable={true}
        >
          <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg w-full">
            <div className="space-y-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.fractions.equation')}</p>
                <div className="text-center text-lg">
                  <MathRenderer math="\\frac{x}{3} + \\frac{x}{4} = 7" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-orange-600 dark:text-orange-400">↓</div>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.fractions.lcdLabel')}</p>
                <p className="text-center">{t('visuals.fractions.lcdValue')}</p>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-orange-600 dark:text-orange-400">↓</div>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.fractions.multiplyLabel')}</p>
                <div className="text-center">
                  <MathRenderer math="12 \\cdot \\frac{x}{3} + 12 \\cdot \\frac{x}{4} = 12 \\cdot 7" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-orange-600 dark:text-orange-400">↓</div>
              </div>
              
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.fractions.result')}</p>
                <div className="text-center">
                  <MathRenderer math="4x + 3x = 84" />
                  <MathRenderer math="7x = 84" />
                  <div className="text-xl font-bold text-green-700 dark:text-green-300 mt-2">
                    <MathRenderer math="x = 12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </VisualExplanation>
      </section>

      {/* Absolute Value Equations */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.absolute.title')}</h2>
        <p className="mb-4">{t('sections.absolute.intro')}</p>

        <Definition term={t('definition.absolute.title')}>
          <p>{t.rich('definition.absolute.concept', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <div className="mt-3 text-center">
            <MathRenderer math="|x| = \\begin{cases} x & \\text{if } x \\geq 0 \\\\ -x & \\text{if } x < 0 \\end{cases}" block />
          </div>
        </Definition>

        <VisualExplanation 
          title={t('visuals.absolute.title')}
          caption={t('visuals.absolute.caption')}
          zoomable={true}
        >
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg w-full">
            <div className="space-y-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.absolute.problem')}</p>
                <div className="text-center text-lg">
                  <MathRenderer math="|2x - 3| = 7" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-indigo-600 dark:text-indigo-400">↓</div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <p className="text-xs font-semibold mb-2">{t('visuals.absolute.case1')}</p>
                  <div className="space-y-1 text-sm">
                    <div><MathRenderer math="2x - 3 = 7" /></div>
                    <div><MathRenderer math="2x = 10" /></div>
                    <div className="font-bold text-blue-700 dark:text-blue-300">
                      <MathRenderer math="x = 5" />
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <p className="text-xs font-semibold mb-2">{t('visuals.absolute.case2')}</p>
                  <div className="space-y-1 text-sm">
                    <div><MathRenderer math="2x - 3 = -7" /></div>
                    <div><MathRenderer math="2x = -4" /></div>
                    <div className="font-bold text-purple-700 dark:text-purple-300">
                      <MathRenderer math="x = -2" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded">
                <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                  {t('visuals.absolute.solutions')}: x = 5 {t('visuals.absolute.or')} x = -2
                </p>
              </div>
            </div>
          </div>
        </VisualExplanation>

        <Note type="warning">{t('notes.absolute.content')}</Note>
      </section>

      {/* Examples */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">📝 {t('examples.title')}</h2>

        <Example
          title={t('examples.example1.title')}
          problem={<p>{t('examples.example1.problem')}</p>}
          solution={
            <>
              <StepByStep steps={[
                { content: <p>{t('examples.example1.step1')}</p> },
                { content: <p>{t('examples.example1.step2')}: <MathRenderer math="4x - 20 + 4 = 3x + 15" /></p> },
                { content: <p>{t('examples.example1.step3')}: <MathRenderer math="4x - 16 = 3x + 15" /></p> },
                { content: <p>{t('examples.example1.step4')}: <MathRenderer math="x = 31" /></p> }
              ]} />
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold">{t('examples.example1.answerLabel')}</p>
                <MathRenderer math="x = 31" />
              </div>
            </>
          }
        />

        <Example
          title={t('examples.example2.title')}
          problem={<p>{t('examples.example2.problem')}</p>}
          solution={
            <>
              <StepByStep steps={[
                { content: <p>{t('examples.example2.step1')}</p> },
                { content: <p>{t('examples.example2.step2')}: <MathRenderer math="5x + 2x - 3 = 63" /></p> },
                { content: <p>{t('examples.example2.step3')}: <MathRenderer math="7x = 66" /></p> },
                { content: <p>{t('examples.example2.step4')}: <MathRenderer math="x = \\frac{66}{7}" /></p> }
              ]} />
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold">{t('examples.example2.answerLabel')}</p>
                <MathRenderer math="x = \\frac{66}{7} \\approx 9.43" />
              </div>
            </>
          }
        />

        <Example
          title={t('examples.example3.title')}
          problem={<p>{t('examples.example3.problem')}</p>}
          solution={
            <>
              <StepByStep steps={[
                { content: <p>{t('examples.example3.step1')}: <MathRenderer math="3x + 1 = 10" /> {t('examples.example3.or')} <MathRenderer math="3x + 1 = -10" /></p> },
                { content: <p>{t('examples.example3.step2')}: <MathRenderer math="x = 3" /> {t('examples.example3.or')} <MathRenderer math="x = -\\frac{11}{3}" /></p> }
              ]} />
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold">{t('examples.example3.answerLabel')}</p>
                <MathRenderer math="x = 3 \\text{ or } x = -\\frac{11}{3}" />
              </div>
            </>
          }
        />
      </section>

      {/* Common Mistakes */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">⚠️ {t('commonMistakes.title')}</h2>
        
        <CommonMistake
          title={t('commonMistakes.mistake1.title')}
          wrongApproach={<p>{t('commonMistakes.mistake1.wrong')}</p>}
          wrongMath="4(x - 2) + 3 = 4x - 2 + 3"
          correctApproach={<p>{t('commonMistakes.mistake1.correct')}</p>}
          correctMath="4(x - 2) + 3 = 4x - 8 + 3 = 4x - 5"
          explanation={<p>{t('commonMistakes.mistake1.explanation')}</p>}
          tip={<p>{t('commonMistakes.mistake1.tip')}</p>}
        />

        <CommonMistake
          title={t('commonMistakes.mistake2.title')}
          wrongApproach={<p>{t('commonMistakes.mistake2.wrong')}</p>}
          wrongMath="|2x - 3| = 7 \\Rightarrow 2x - 3 = 7 \\Rightarrow x = 5"
          correctApproach={<p>{t('commonMistakes.mistake2.correct')}</p>}
          correctMath="2x - 3 = 7 \\text{ OR } 2x - 3 = -7 \\Rightarrow x = 5 \\text{ OR } x = -2"
          explanation={<p>{t('commonMistakes.mistake2.explanation')}</p>}
          tip={<p>{t('commonMistakes.mistake2.tip')}</p>}
        />

        <CommonMistake
          title={t('commonMistakes.mistake3.title')}
          wrongApproach={<p>{t('commonMistakes.mistake3.wrong')}</p>}
          wrongMath="\\frac{x + 3}{2} = 5 \\Rightarrow x + 3 = 5 \\Rightarrow x = 2"
          correctApproach={<p>{t('commonMistakes.mistake3.correct')}</p>}
          correctMath="\\frac{x + 3}{2} = 5 \\Rightarrow x + 3 = 10 \\Rightarrow x = 7"
          explanation={<p>{t('commonMistakes.mistake3.explanation')}</p>}
        />
      </section>

      {/* Real World Applications */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">🌍 {t('realWorld.title')}</h2>
        <p className="mb-4">{t('realWorld.intro')}</p>
        
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app1.title')}</h3>
            <p className="text-sm mb-2">{t('realWorld.app1.description')}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('realWorld.app1.example')}</p>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app2.title')}</h3>
            <p className="text-sm mb-2">{t('realWorld.app2.description')}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('realWorld.app2.example')}</p>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app3.title')}</h3>
            <p className="text-sm mb-2">{t('realWorld.app3.description')}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('realWorld.app3.example')}</p>
          </div>
        </div>
      </section>

      {/* Practice Exercises */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">✏️ {t('exercises.title')}</h2>

        {/* Warm-up */}
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <span className="text-2xl">🌤️</span>
          {t('exercises.warmup.title')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('exercises.warmup.description')}</p>

        <MultipleChoiceExercise
          difficulty="easy"
          question={t('exercises.exercise1.question')}
          choices={[
            { id: 'a', text: 'x = 5', isCorrect: false },
            { id: 'b', text: 'x = 7', isCorrect: true },
            { id: 'c', text: 'x = 9', isCorrect: false },
            { id: 'd', text: 'x = 11', isCorrect: false }
          ]}
          explanation={t('exercises.exercise1.explanation')}
        />

        <NumericInputExercise
          difficulty="easy"
          question={t('exercises.exercise2.question')}
          correctAnswer={4}
          hint={t('exercises.exercise2.hint')}
          solution={<p>{t('exercises.exercise2.explanation')}</p>}
        />

        {/* Practice */}
        <h3 className="text-xl font-semibold mb-3 mt-8 flex items-center gap-2">
          <span className="text-2xl">💪</span>
          {t('exercises.practice.title')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('exercises.practice.description')}</p>

        <MultipleChoiceExercise
          difficulty="medium"
          question={t('exercises.exercise3.question')}
          choices={[
            { id: 'a', text: 'x = 2', isCorrect: false },
            { id: 'b', text: 'x = 3', isCorrect: false },
            { id: 'c', text: 'x = 6', isCorrect: true },
            { id: 'd', text: 'x = 12', isCorrect: false }
          ]}
          explanation={t('exercises.exercise3.explanation')}
        />

        <NumericInputExercise
          difficulty="medium"
          question={t('exercises.exercise4.question')}
          correctAnswer={-3}
          hint={t('exercises.exercise4.hint')}
          solution={<p>{t('exercises.exercise4.explanation')}</p>}
        />

        <MultipleChoiceExercise
          difficulty="medium"
          question={t('exercises.exercise5.question')}
          choices={[
            { id: 'a', text: t('exercises.exercise5.option1'), isCorrect: false },
            { id: 'b', text: t('exercises.exercise5.option2'), isCorrect: true },
            { id: 'c', text: t('exercises.exercise5.option3'), isCorrect: false },
            { id: 'd', text: t('exercises.exercise5.option4'), isCorrect: false }
          ]}
          explanation={t('exercises.exercise5.explanation')}
        />

        {/* Challenge */}
        <h3 className="text-xl font-semibold mb-3 mt-8 flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          {t('exercises.challenge.title')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('exercises.challenge.description')}</p>

        <NumericInputExercise
          difficulty="hard"
          question={t('exercises.exercise6.question')}
          correctAnswer={30}
          hint={t('exercises.exercise6.hint')}
          solution={<p>{t('exercises.exercise6.explanation')}</p>}
        />
      </section>

      {/* Tips */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">💡 {t('notes.title')}</h2>
        
        <Note type="tip">{t('notes.tip1')}</Note>
        <Note type="tip">{t('notes.tip2')}</Note>
        <Note type="success">{t('notes.tip3')}</Note>
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

      {/* What's Next */}
      <WhatsNext
        motivationalText={<p>{t('whatsNext.motivation')}</p>}
        topics={[
          {
            title: t('whatsNext.topic1.title'),
            description: t('whatsNext.topic1.description'),
            link: '/en/learn/algebra-1/quadratics'
          },
          {
            title: t('whatsNext.topic2.title'),
            description: t('whatsNext.topic2.description'),
            link: '/en/learn/pre-algebra/systems-intro'
          }
        ]}
      />

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
