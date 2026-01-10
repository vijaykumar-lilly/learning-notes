import MathRenderer from '@/components/math/MathRenderer'
import { 
  Definition, 
  Example, 
  KeyConcept, 
  Note, 
  StepByStep
} from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise } from '@/components/interactive'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'
import DecimalVisualizer from '@/components/visualizations/DecimalVisualizer'
import InteractiveDecimalSlider from '@/components/interactive/InteractiveDecimalSlider'
import { useTranslations } from 'next-intl'

export default function DecimalsLesson() {
  const t = useTranslations('decimals')
  const navigation = getLessonNavigation('foundations', 'decimals')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      <Definition term={t('definition.term')}>
        <p>
          {t.rich('definition.explanation', { strong: (chunks) => <strong>{chunks}</strong> })}
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.exampleLabel')}</p>
          <p>{t('definition.exampleText')}</p>
          <ul className="mt-2 space-y-1">
            <li><strong>3</strong> {t('definition.wholePart')}</li>
            <li><strong>.75</strong> {t('definition.fractionalPart')}</li>
          </ul>
        </div>
      </Definition>

      <InteractiveDecimalSlider maxValue={5} step={0.01} />

      <KeyConcept title={t('placeValue.title')}>
        <p>
          {t('placeValue.description')}
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('placeValue.hundreds')}</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('placeValue.tens')}</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('placeValue.ones')}</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30">•</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('placeValue.tenths')}</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('placeValue.hundredths')}</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('placeValue.thousandths')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">2</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">4</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">6</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center bg-yellow-100 dark:bg-yellow-900/30">•</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">3</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">7</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          {t('placeValue.numberReading')}
        </p>
      </KeyConcept>

      <Note type="info">
        <p className="font-semibold">{t('notes.pronunciation.title')}</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>{t('notes.pronunciation.point')}</li>
          <li>{t('notes.pronunciation.example1')}</li>
          <li>{t('notes.pronunciation.example2')}</li>
        </ul>
      </Note>

      <Note type="success">
        <p className="font-semibold">{t('notes.placeValueMemory.title')}</p>
        <p className="mt-2">{t.rich('notes.placeValueMemory.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>{t.rich('notes.placeValueMemory.tenths', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          <li>{t.rich('notes.placeValueMemory.hundredths', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          <li>{t.rich('notes.placeValueMemory.thousandths', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
        </ul>
        <p className="mt-2 text-sm">{t('notes.placeValueMemory.pattern')}</p>
      </Note>

      <DecimalVisualizer value={2.35} type="bar" showGrid={true} />

      <MultipleChoiceExercise
        question={t('exercises.placeValue.question')}
        choices={[
          { id: 'a', text: t('placeValue.tenths'), isCorrect: false },
          { id: 'b', text: t('placeValue.hundredths'), isCorrect: true },
          { id: 'c', text: t('placeValue.thousandths'), isCorrect: false },
          { id: 'd', text: t('placeValue.ones'), isCorrect: false }
        ]}
        explanation={t('exercises.placeValue.explanation')}
        hint={t('exercises.placeValue.hint')}
      />

      <Definition term={t('conversions.fractionToDecimal.title')}>
        <p>
          {t('conversions.fractionToDecimal.explanation')}
        </p>
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('conversions.fractionToDecimal.commonTitle')}</p>
          <ul className="space-y-1">
            <li><MathRenderer math="\frac{1}{2} = 0.5" /> (1 ÷ 2)</li>
            <li><MathRenderer math="\frac{1}{4} = 0.25" /> (1 ÷ 4)</li>
            <li><MathRenderer math="\frac{3}{4} = 0.75" /> (3 ÷ 4)</li>
            <li><MathRenderer math="\frac{1}{10} = 0.1" /> (1 ÷ 10)</li>
            <li><MathRenderer math="\frac{1}{100} = 0.01" /> (1 ÷ 100)</li>
          </ul>
        </div>
      </Definition>

      <Note type="info">
        <p className="font-semibold">{t('notes.quickConversion.title')}</p>
        <ul className="mt-2 space-y-2 list-disc list-inside">
          <li>{t.rich('notes.quickConversion.halves', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          <li>{t.rich('notes.quickConversion.fifths', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          <li>{t.rich('notes.quickConversion.fourths', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          <li>{t.rich('notes.quickConversion.tenths', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          <li>{t.rich('notes.quickConversion.hundredths', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
        </ul>
      </Note>

      <DecimalVisualizer value={0.75} type="blocks" showGrid={true} />

      <Example 
        title={t('examples.fractionToDecimal.title')}
        problem={<p>Convert <MathRenderer math="\frac{3}{8}" /> to a decimal</p>}
        solution={
          <StepByStep
            steps={[
              {
                title: t('examples.fractionToDecimal.step1Title'),
                content: <p>{t('examples.fractionToDecimal.step1Content')} <MathRenderer math="3 \div 8" /></p>
              },
              {
                title: t('examples.fractionToDecimal.step2Title'),
                content: <p>{t('examples.fractionToDecimal.step2Content')}</p>
              },
              {
                title: t('examples.fractionToDecimal.step3Title'),
                content: <p><MathRenderer math="\frac{3}{8} = 0.375" /></p>
              }
            ]}
          />
        }
      />

      <Definition term={t('conversions.decimalToFraction.title')}>
        <p>
          {t('conversions.decimalToFraction.explanation')}
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>{t('conversions.decimalToFraction.step1')}</li>
          <li>{t('conversions.decimalToFraction.step2')}</li>
        </ol>
      </Definition>

      <Example 
        title={t('examples.decimalToFraction.title')}
        problem={<p>{t('examples.decimalToFraction.problem')}</p>}
        solution={
          <StepByStep
            steps={[
              {
                title: t('examples.decimalToFraction.step1Title'),
                content: <p>{t('examples.decimalToFraction.step1Content')} <MathRenderer math="\frac{625}{1000}" /></p>
              },
              {
                title: t('examples.decimalToFraction.step2Title'),
                content: (
                  <div className="space-y-2">
                    <p>{t('examples.decimalToFraction.step2Line1')}</p>
                    <p><MathRenderer math="\frac{625 \div 125}{1000 \div 125} = \frac{5}{8}" /></p>
                  </div>
                )
              },
              {
                title: t('examples.decimalToFraction.step3Title'),
                content: <p><MathRenderer math="0.625 = \frac{5}{8}" /></p>
              }
            ]}
          />
        }
      />

      <MultipleChoiceExercise
        question={<>{t('exercises.fractionToDecimal.question')} <MathRenderer math="\frac{1}{5}" /> {t('exercises.fractionToDecimal.questionSuffix')}</>}
        choices={[
          { id: 'a', text: '0.2', isCorrect: true },
          { id: 'b', text: '0.5', isCorrect: false },
          { id: 'c', text: '0.15', isCorrect: false },
          { id: 'd', text: '0.25', isCorrect: false }
        ]}
        explanation={t('exercises.fractionToDecimal.explanation')}
        hint={t('exercises.fractionToDecimal.hint')}
      />

      <KeyConcept title={t('keyConcepts.comparing.title')}>
        <p>{t('keyConcepts.comparing.intro')}</p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>{t('keyConcepts.comparing.step1')}</li>
          <li>{t('keyConcepts.comparing.step2')}</li>
          <li>{t('keyConcepts.comparing.step3')}</li>
        </ol>
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('keyConcepts.comparing.exampleTitle')}</p>
          <div className="font-mono">
            <p>0.50</p>
            <p>0.45</p>
          </div>
          <p className="mt-2">{t('keyConcepts.comparing.exampleExplanation')}</p>
        </div>
      </KeyConcept>

      <MultipleChoiceExercise
        question={t('exercises.comparing.question')}
        choices={[
          { id: 'a', text: '0.3', isCorrect: false },
          { id: 'b', text: '0.35', isCorrect: true },
          { id: 'c', text: '0.305', isCorrect: false },
          { id: 'd', text: '0.03', isCorrect: false }
        ]}
        explanation={t('exercises.comparing.explanation')}
        hint={t('exercises.comparing.hint')}
      />
      <DecimalVisualizer value={1.5} type="bar" showGrid={true} />
      <Note type="success">
        <p className="font-semibold">{t('notes.comparing.title')}</p>
        <div className="mt-2 space-y-2">
          <p>{t.rich('notes.comparing.method1Title', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p className="ml-4">{t('notes.comparing.method1Example')}</p>
          <p className="mt-2">{t.rich('notes.comparing.method2Title', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p className="ml-4">{t('notes.comparing.method2Example')}</p>
          <p className="mt-2">{t.rich('notes.comparing.method3Title', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p className="ml-4">{t('notes.comparing.method3Example')}</p>
        </div>
      </Note>

      <Definition term={t('operations.addSubtract.title')}>
        <p>
          {t('operations.addSubtract.intro')}
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>{t('operations.addSubtract.step1')}</li>
          <li>{t('operations.addSubtract.step2')}</li>
          <li>{t('operations.addSubtract.step3')}</li>
          <li>{t('operations.addSubtract.step4')}</li>
        </ol>
      </Definition>

      <DecimalVisualizer value={3.45} type="money" />

      <Example 
        title={t('examples.adding.title')}
        problem={<p>{t('examples.adding.problem')}</p>}
        solution={
          <div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono">
              <p className="text-right">  3.70</p>
              <p className="text-right">+ 2.45</p>
              <p className="text-right border-t border-gray-300 dark:border-gray-600 pt-1">  6.15</p>
            </div>
            <p className="mt-2">{t('examples.adding.answer')}</p>
          </div>
        }
      />

      <NumericInputExercise
        question={t('exercises.addition.question')}
        correctAnswer={7.45}
        tolerance={0.01}
        hint={t('exercises.addition.hint')}
        solution={
          <div className="font-mono">
            <p className="text-right">  4.60</p>
            <p className="text-right">+ 2.85</p>
            <p className="text-right border-t border-gray-300 dark:border-gray-600 pt-1">  7.45</p>
          </div>
        }
      />

      <Note type="info">
        <p className="font-semibold">{t('notes.addSubtract.title')}</p>
        <div className="mt-2 space-y-2">
          <p>{t.rich('notes.addSubtract.step1', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p>{t.rich('notes.addSubtract.step2', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p>{t.rich('notes.addSubtract.step3', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p>{t.rich('notes.addSubtract.step4', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p>{t.rich('notes.addSubtract.step5', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p className="mt-2 text-sm bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
            {t.rich('notes.addSubtract.memory', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        </div>
      </Note>

      <Definition term={t('operations.multiply.title')}>
        <p>
          {t('operations.multiply.intro')}
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>{t('operations.multiply.step1')}</li>
          <li>{t('operations.multiply.step2')}</li>
          <li>{t('operations.multiply.step3')}</li>
        </ol>
      </Definition>

      <Example 
        title={t('examples.multiplying.title')}
        problem={<p>{t('examples.multiplying.problem')}</p>}
        solution={
          <div className="space-y-2">
            <p>{t('examples.multiplying.step1')}</p>
            <p>{t('examples.multiplying.step2')}</p>
            <p>{t('examples.multiplying.step3')}</p>
            <p className="font-semibold mt-2">{t('examples.multiplying.answer')}</p>
          </div>
        }
      />

      <MultipleChoiceExercise
        question={t('exercises.multiplication.question')}
        choices={[
          { id: 'a', text: '0.2', isCorrect: true },
          { id: 'b', text: '2.0', isCorrect: false },
          { id: 'c', text: '0.02', isCorrect: false },
          { id: 'd', text: '0.9', isCorrect: false }
        ]}
        explanation={t('exercises.multiplication.explanation')}
        hint={t('exercises.multiplication.hint')}
      />

      <Note type="success">
        <p className="font-semibold">{t('notes.multiply.title')}</p>
        <div className="mt-2 space-y-2">
          <p>{t.rich('notes.multiply.methodTitle', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <ol className="list-decimal list-inside ml-2 space-y-1">
            <li>{t('notes.multiply.step1')}</li>
            <li>{t('notes.multiply.step2')}</li>
            <li>{t('notes.multiply.step3')}</li>
          </ol>
          <p className="mt-3 bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm">
            {t.rich('notes.multiply.quickCheck', { strong: (chunks) => <strong>{chunks}</strong>, br: () => <br /> })}
          </p>
        </div>
      </Note>

      <Definition term={t('operations.divide.title')}>
        <p>
          {t('operations.divide.intro')}
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>{t('operations.divide.step1')}</li>
          <li>{t('operations.divide.step2')}</li>
          <li>{t('operations.divide.step3')}</li>
        </ol>
      </Definition>

      <Example 
        title={t('examples.dividing.title')}
        problem={<p>{t('examples.dividing.problem')}</p>}
        solution={
          <div className="space-y-2">
            <p>{t('examples.dividing.step1')}</p>
            <p>{t('examples.dividing.step2')}</p>
            <p>{t('examples.dividing.step3')}</p>
            <p className="font-semibold mt-2">{t('examples.dividing.answer')}</p>
          </div>
        }
      />

      <NumericInputExercise
        question={t('exercises.division.question')}
        correctAnswer={4.2}
        tolerance={0.01}
        hint={t('exercises.division.hint')}
        solution={
          <div>
            <p>{t('exercises.division.solution')}</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t('exercises.division.check')}
            </p>
          </div>
        }
      />

      <Note type="info">
        <p className="font-semibold">{t('notes.divide.title')}</p>
        <div className="mt-2 space-y-3">
          <div>
            <p className="font-semibold">{t('notes.divide.method1Title')}</p>
            <p className="ml-2">{t('notes.divide.method1Example')}</p>
          </div>
          <div>
            <p className="font-semibold">{t('notes.divide.method2Title')}</p>
            <p className="ml-2">{t('notes.divide.method2Example')}</p>
          </div>
          <div>
            <p className="font-semibold">{t('notes.divide.method3Title')}</p>
            <p className="ml-2">{t('notes.divide.method3Example')}</p>
          </div>
          <p className="mt-2 bg-purple-50 dark:bg-purple-900/20 p-2 rounded text-sm">
            {t.rich('notes.divide.quickTip', { strong: (chunks) => <strong>{chunks}</strong>, br: () => <br /> })}
          </p>
        </div>
      </Note>

      <Note type="warning">
        <p className="font-semibold">{t('notes.commonMistakes.title')}</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>{t('notes.commonMistakes.mistake1')}</li>
          <li>{t('notes.commonMistakes.mistake2')}</li>
          <li>{t('notes.commonMistakes.mistake3')}</li>
        </ul>
      </Note>

      <Note type="success">
        <p className="font-semibold">{t('notes.mentalMath.title')}</p>
        <div className="mt-2 space-y-2">
          <p>{t.rich('notes.mentalMath.multiply05', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p className="ml-4 text-sm">{t('notes.mentalMath.multiply05Example')}</p>
          
          <p>{t.rich('notes.mentalMath.multiply025', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p className="ml-4 text-sm">{t('notes.mentalMath.multiply025Example')}</p>
          
          <p>{t.rich('notes.mentalMath.multiply01', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p className="ml-4 text-sm">{t('notes.mentalMath.multiply01Example')}</p>
          
          <p>{t.rich('notes.mentalMath.divide05', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p className="ml-4 text-sm">{t('notes.mentalMath.divide05Example')}</p>
          
          <p>{t.rich('notes.mentalMath.add099', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p className="ml-4 text-sm">{t('notes.mentalMath.add099Example')}</p>
        </div>
      </Note>

      <MultipleChoiceExercise
        question={t('exercises.wordProblem.question')}
        choices={[
          { id: 'a', text: '$14.25', isCorrect: false },
          { id: 'b', text: '$15.25', isCorrect: true },
          { id: 'c', text: '$15.35', isCorrect: false },
          { id: 'd', text: '$14.75', isCorrect: false }
        ]}
        explanation={t('exercises.wordProblem.explanation')}
        hint={t('exercises.wordProblem.hint')}
      />

      <Note type="success">
        <p className="font-semibold">{t('conclusion.title')}</p>
        <p className="mt-1">
          {t('conclusion.message')}
        </p>
      </Note>

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
