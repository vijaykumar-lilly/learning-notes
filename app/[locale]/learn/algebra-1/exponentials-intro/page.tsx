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

export default function ExponentialsIntroLesson() {
  const t = useTranslations('exponentials-intro')
  const navigation = getLessonNavigation('algebra-1', 'exponentials-intro')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

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

      <Definition term={t('definition.exponential.title')}>
        <p>{t.rich('definition.exponential.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <p className="mt-2">{t('definition.exponential.discovery')}</p>
      </Definition>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.growthDecay.title')}</h2>
        
        <KeyConcept>
          <p className="font-semibold mb-2">{t('keyConcept.baseRules.title')}</p>
          <ul className="space-y-2 text-sm">
            <li><strong>{t('keyConcept.baseRules.growth')}</strong></li>
            <li><strong>{t('keyConcept.baseRules.decay')}</strong></li>
            <li><strong>{t('keyConcept.baseRules.constant')}</strong></li>
          </ul>
        </KeyConcept>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">📝 {t('examples.title')}</h2>

        <Example
          title={t('examples.example1.title')}
          problem={<p>{t('examples.example1.problem')}</p>}
          solution={
            <>
              <StepByStep steps={[
                { content: <p>{t('examples.example1.step1')}</p> },
                { content: <p>{t('examples.example1.step2')}</p> },
                { content: <p>{t('examples.example1.step3')}</p> }
              ]} />
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold">{t('examples.example1.answerLabel')}</p>
                <MathRenderer math="f(3) = 54" />
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
                { content: <p>{t('examples.example2.step2')}</p> },
                { content: <p>{t('examples.example2.step3')}</p> }
              ]} />
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold">{t('examples.example2.answerLabel')}</p>
                <p>{t('examples.example2.answer')}</p>
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
                { content: <p>{t('examples.example3.step1')}</p> },
                { content: <p>{t('examples.example3.step2')}</p> },
                { content: <p>{t('examples.example3.step3')}</p> }
              ]} />
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold">{t('examples.example3.answerLabel')}</p>
                <p>{t('examples.example3.answer')}</p>
              </div>
            </>
          }
        />
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">⚠️ {t('commonMistakes.title')}</h2>
        
        <CommonMistake
          title={t('commonMistakes.mistake1.title')}
          wrongApproach={<p>{t('commonMistakes.mistake1.wrong')}</p>}
          wrongMath="2^3 = 2 \\times 3 = 6"
          correctApproach={<p>{t('commonMistakes.mistake1.correct')}</p>}
          correctMath="2^3 = 2 \\times 2 \\times 2 = 8"
          explanation={<p>{t('commonMistakes.mistake1.explanation')}</p>}
          tip={<p>{t('commonMistakes.mistake1.tip')}</p>}
        />

        <CommonMistake
          title={t('commonMistakes.mistake2.title')}
          wrongApproach={<p>{t('commonMistakes.mistake2.wrong')}</p>}
          wrongMath="3^{-2} = -9"
          correctApproach={<p>{t('commonMistakes.mistake2.correct')}</p>}
          correctMath="3^{-2} = \\frac{1}{3^2} = \\frac{1}{9}"
          explanation={<p>{t('commonMistakes.mistake2.explanation')}</p>}
        />

        <CommonMistake
          title={t('commonMistakes.mistake3.title')}
          wrongApproach={<p>{t('commonMistakes.mistake3.wrong')}</p>}
          correctApproach={<p>{t('commonMistakes.mistake3.correct')}</p>}
          explanation={<p>{t('commonMistakes.mistake3.explanation')}</p>}
        />
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">✏️ {t('exercises.title')}</h2>

        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <span className="text-2xl">🌤️</span>
          {t('exercises.warmup.title')}
        </h3>

        <MultipleChoiceExercise
          difficulty="easy"
          question={t('exercises.exercise1.question')}
          choices={[
            { id: 'a', text: '6', isCorrect: false },
            { id: 'b', text: '9', isCorrect: false },
            { id: 'c', text: '8', isCorrect: true },
            { id: 'd', text: '12', isCorrect: false }
          ]}
          explanation={t('exercises.exercise1.explanation')}
        />

        <NumericInputExercise
          difficulty="easy"
          question={t('exercises.exercise2.question')}
          correctAnswer={16}
          hint={t('exercises.exercise2.hint')}
          solution={<p>{t('exercises.exercise2.explanation')}</p>}
        />

        <h3 className="text-xl font-semibold mb-3 mt-8 flex items-center gap-2">
          <span className="text-2xl">💪</span>
          {t('exercises.practice.title')}
        </h3>

        <MultipleChoiceExercise
          difficulty="medium"
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
          difficulty="medium"
          question={t('exercises.exercise4.question')}
          correctAnswer={1600}
          hint={t('exercises.exercise4.hint')}
          solution={<p>{t('exercises.exercise4.explanation')}</p>}
        />

        <MultipleChoiceExercise
          difficulty="medium"
          question={t('exercises.exercise5.question')}
          choices={[
            { id: 'a', text: 'f(x) = 3x', isCorrect: false },
            { id: 'b', text: 'f(x) = x³', isCorrect: false },
            { id: 'c', text: 'f(x) = 3^x', isCorrect: true },
            { id: 'd', text: 'f(x) = x + 3', isCorrect: false }
          ]}
          explanation={t('exercises.exercise5.explanation')}
        />

        <h3 className="text-xl font-semibold mb-3 mt-8 flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          {t('exercises.challenge.title')}
        </h3>

        <NumericInputExercise
          difficulty="hard"
          question={t('exercises.exercise6.question')}
          correctAnswer={9}
          hint={t('exercises.exercise6.hint')}
          solution={<p>{t('exercises.exercise6.explanation')}</p>}
        />
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">💡 {t('notes.title')}</h2>
        
        <Note type="tip">{t('notes.tip1')}</Note>
        <Note type="tip">{t('notes.tip2')}</Note>
        <Note type="success">{t('notes.tip3')}</Note>
        <Note type="warning">{t('notes.warning1')}</Note>
      </section>

      <section className="my-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{t('conclusion.title')}</h2>
        <p className="mb-4">{t('conclusion.summary')}</p>
      </section>

      <WhatsNext
        motivationalText={<p>{t('whatsNext.motivation')}</p>}
        topics={[
          {
            title: t('whatsNext.topic1.title'),
            description: t('whatsNext.topic1.description'),
            link: '/en/learn/algebra-2/exp-log'
          },
          {
            title: t('whatsNext.topic2.title'),
            description: t('whatsNext.topic2.description'),
            link: '/en/learn/algebra-2/logarithms'
          }
        ]}
      />

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
