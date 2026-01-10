import MathRenderer from '@/components/math/MathRenderer'
import { 
  Definition, 
  Example, 
  KeyConcept, 
  Note, 
  StepByStep,
  VisualExplanation,
  RatioDiagram,
  ProportionDiagram,
  UnitRateDiagram
} from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise } from '@/components/interactive'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'
import { useTranslations } from 'next-intl'
import { RatioVisualizer } from '@/components/visualizations'

export default function RatiosProportionsLesson() {
  const t = useTranslations('ratios-proportions')
  const navigation = getLessonNavigation('foundations', 'ratios-proportions')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* Introduction to Ratios */}
      <Definition term={t('definition.ratio.title')}>
        <p>{t.rich('definition.ratio.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.ratio.exampleTitle')}</p>
          <ul className="space-y-2">
            <li>{t('definition.ratio.example1')}</li>
            <li>{t('definition.ratio.example2')}</li>
            <li>{t('definition.ratio.example3')}</li>
          </ul>
        </div>
        <div className="mt-4">
          <p className="font-semibold mb-2">{t('definition.ratio.waysToWrite')}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t.rich('definition.ratio.colonForm', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li>{t.rich('definition.ratio.wordForm', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li>{t.rich('definition.ratio.fractionForm', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          </ul>
        </div>
      </Definition>

      <KeyConcept title={t('keyConcepts.understanding.title')}>
        <p>{t('keyConcepts.understanding.explanation')}</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>{t('keyConcepts.understanding.point1')}</li>
          <li>{t('keyConcepts.understanding.point2')}</li>
          <li>{t('keyConcepts.understanding.point3')}</li>
        </ul>
      </KeyConcept>

      <RatioVisualizer 
        ratio1={3} 
        ratio2={5} 
        label1={t('keyConcepts.understanding.visualLabel1')} 
        label2={t('keyConcepts.understanding.visualLabel2')}
        color1="#3b82f6"
        color2="#f59e0b"
      />

      <Note type="tip">
        <p>{t('notes.trick1')}</p>
      </Note>

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
              <p>{t('examples.example1.answer')}</p>
            </div>
          </>
        }
      />

      <MultipleChoiceExercise
        question={t('exercises.exercise1.question')}
        choices={[
          { id: 'a', text: t('exercises.exercise1.option1'), isCorrect: false },
          { id: 'b', text: t('exercises.exercise1.option2'), isCorrect: true },
          { id: 'c', text: t('exercises.exercise1.option3'), isCorrect: false },
          { id: 'd', text: t('exercises.exercise1.option4'), isCorrect: false }
        ]}
        explanation={t('exercises.exercise1.explanation')}
      />

      {/* Simplifying Ratios */}
      <Definition term={t('definition.simplifying.title')}>
        <p>{t.rich('definition.simplifying.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.simplifying.howTo')}</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>{t('definition.simplifying.step1')}</li>
            <li>{t('definition.simplifying.step2')}</li>
          </ol>
        </div>
      </Definition>

      <RatioVisualizer 
        ratio1={12} 
        ratio2={18} 
        label1={t('definition.simplifying.visualLabel1')} 
        label2={t('definition.simplifying.visualLabel2')}
        color1="#10b981"
        color2="#8b5cf6"
        showScale={true}
      />

      <Note type="tip">
        <p>{t('notes.trick2')}</p>
      </Note>

      <Example
        title={t('examples.example2.title')}
        problem={<p>{t('examples.example2.question')}</p>}
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

      <NumericInputExercise
        question={t('exercises.exercise2.question')}
        correctAnswer={2}
        hint={t('exercises.exercise2.hint')}
        solution={<p>{t('exercises.exercise2.explanation')}</p>}
      />

      <Note type="tip">
        {t('notes.tip1')}
      </Note>

      {/* Introduction to Proportions */}
      <Definition term={t('definition.proportion.title')}>
        <p>{t.rich('definition.proportion.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 text-center">
          <MathRenderer math="\frac{a}{b} = \frac{c}{d}" block />
          <p className="mt-2 text-sm">{t('definition.proportion.notation')}</p>
        </div>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.proportion.exampleTitle')}</p>
          <p>{t('definition.proportion.example1')}</p>
          <div className="mt-2 text-center">
            <MathRenderer math="\frac{1}{2} = \frac{2}{4}" />
          </div>
        </div>
      </Definition>

      <VisualExplanation
        title="Visualizing Proportions"
        caption="Notice how 1:2 and 2:4 show the same relationship"
      >
        <ProportionDiagram
          ratio1a={1}
          ratio1b={2}
          ratio2a={2}
          ratio2b={4}
          label="Equal Ratios: 1:2 = 2:4"
        />
      </VisualExplanation>

      <KeyConcept title={t('keyConcepts.crossMultiplication.title')}>
        <p>{t('keyConcepts.crossMultiplication.explanation')}</p>
        <div className="mt-4 text-center">
          <MathRenderer math="a \times d = b \times c" block />
        </div>
        <p className="mt-2">{t('keyConcepts.crossMultiplication.meaning')}</p>
      </KeyConcept>

      <VisualExplanation
        title="Understanding Ratios"
        caption="A ratio of 2:3 means 2 parts to 3 parts"
      >
        <RatioDiagram
          ratio1={2}
          ratio2={3}
          label1="Part A"
          label2="Part B"
          color1="#3b82f6"
          color2="#f59e0b"
        />
      </VisualExplanation>

      <Example
        title={t('examples.example3.title')}
        problem={
          <>
            <p>{t('examples.example3.question')}</p>
            <div className="mt-2 text-center">
              <MathRenderer math="\frac{2}{3} = \frac{x}{12}" />
            </div>
          </>
        }
        solution={
          <>
            <StepByStep steps={[
              { content: <p>{t('examples.example3.step1')}</p> },
              { content: <p>{t('examples.example3.step2')}</p> },
              { content: <p>{t('examples.example3.step3')}</p> },
              { content: <p>{t('examples.example3.step4')}</p> }
            ]} />
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="font-semibold">{t('examples.example3.answerLabel')}</p>
              <p>{t('examples.example3.answer')}</p>
            </div>
          </>
        }
      />

      <NumericInputExercise
        question={t('exercises.exercise3.question')}
        correctAnswer={15}
        hint={t('exercises.exercise3.hint')}
        solution={<p>{t('exercises.exercise3.explanation')}</p>}
      />

      {/* Real-World Applications */}
      <KeyConcept title={t('keyConcepts.applications.title')}>
        <p>{t('keyConcepts.applications.intro')}</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>{t.rich('keyConcepts.applications.cooking', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          <li>{t.rich('keyConcepts.applications.shopping', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          <li>{t.rich('keyConcepts.applications.maps', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          <li>{t.rich('keyConcepts.applications.mixtures', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
        </ul>
      </KeyConcept>

      <VisualExplanation
        title="Map Scale Example"
        caption="On this map, 1 inch represents 4 miles in real life"
      >
        <RatioDiagram
          ratio1={1}
          ratio2={4}
          label1="Map (inches)"
          label2="Real Distance (miles)"
          color1="#10b981"
          color2="#06b6d4"
        />
      </VisualExplanation>

      <Example
        title={t('examples.example4.title')}
        problem={<p>{t('examples.example4.question')}</p>}
        solution={
          <>
            <StepByStep steps={[
              { content: <p>{t('examples.example4.step1')}</p> },
              { content: <p>{t('examples.example4.step2')}</p> },
              { content: <p>{t('examples.example4.step3')}</p> },
              { content: <p>{t('examples.example4.step4')}</p> }
            ]} />
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="font-semibold">{t('examples.example4.answerLabel')}</p>
              <p>{t('examples.example4.answer')}</p>
            </div>
          </>
        }
      />

      <MultipleChoiceExercise
        question={t('exercises.exercise4.question')}
        choices={[
          { id: 'a', text: t('exercises.exercise4.option1'), isCorrect: false },
          { id: 'b', text: t('exercises.exercise4.option2'), isCorrect: false },
          { id: 'c', text: t('exercises.exercise4.option3'), isCorrect: true },
          { id: 'd', text: t('exercises.exercise4.option4'), isCorrect: false }
        ]}
        explanation={t('exercises.exercise4.explanation')}
      />

      <Note type="warning">
        {t('notes.warning1')}
      </Note>

      {/* Unit Rates */}
      <Definition term={t('definition.unitRate.title')}>
        <p>{t.rich('definition.unitRate.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.unitRate.exampleTitle')}</p>
          <ul className="space-y-2">
            <li>{t('definition.unitRate.example1')}</li>
            <li>{t('definition.unitRate.example2')}</li>
            <li>{t('definition.unitRate.example3')}</li>
          </ul>
        </div>
      </Definition>

      <VisualExplanation
        title="Understanding Unit Rates"
        caption="60 mph means 60 miles traveled in 1 hour"
      >
        <UnitRateDiagram
          value={60}
          unit="miles per hour"
          icon="speed"
        />
      </VisualExplanation>

      <Example
        title={t('examples.example5.title')}
        problem={<p>{t('examples.example5.question')}</p>}
        solution={
          <>
            <StepByStep steps={[
              { content: <p>{t('examples.example5.step1')}</p> },
              { content: <p>{t('examples.example5.step2')}</p> },
              { content: <p>{t('examples.example5.step3')}</p> }
            ]} />
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="font-semibold">{t('examples.example5.answerLabel')}</p>
              <p>{t('examples.example5.answer')}</p>
            </div>
          </>
        }
      />

      <NumericInputExercise
        question={t('exercises.exercise5.question')}
        correctAnswer={12}
        hint={t('exercises.exercise5.hint')}
        solution={<p>{t('exercises.exercise5.explanation')}</p>}
      />

      <MultipleChoiceExercise
        question={t('exercises.exercise6.question')}
        choices={[
          { id: 'a', text: t('exercises.exercise6.option1'), isCorrect: true },
          { id: 'b', text: t('exercises.exercise6.option2'), isCorrect: false },
          { id: 'c', text: t('exercises.exercise6.option3'), isCorrect: false },
          { id: 'd', text: t('exercises.exercise6.option4'), isCorrect: false }
        ]}
        explanation={t('exercises.exercise6.explanation')}
      />

      <Note type="tip">
        {t('notes.tip2')}
      </Note>

      {/* Conclusion */}
      <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-700">
        <h2 className="text-2xl font-bold mb-4">{t('conclusion.title')}</h2>
        <p>{t('conclusion.summary')}</p>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">{t('conclusion.keyTakeawaysTitle')}</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('conclusion.takeaway1')}</li>
            <li>{t('conclusion.takeaway2')}</li>
            <li>{t('conclusion.takeaway3')}</li>
            <li>{t('conclusion.takeaway4')}</li>
          </ul>
        </div>
      </div>

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
