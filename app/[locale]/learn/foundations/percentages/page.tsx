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
import PercentageVisualizer from '@/components/visualizations/PercentageVisualizer'
import InteractivePercentageSlider from '@/components/interactive/InteractivePercentageSlider'
import { useTranslations } from 'next-intl'

export default function PercentagesLesson() {
  const t = useTranslations('percentages')
  const navigation = getLessonNavigation('foundations', 'percentages')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      <Definition term={t('definition.percentage.title')}>
        <p >{t.rich('definition.percentage.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.percentage.symbolTitle')}</p>
          <p >{t.rich('definition.percentage.symbolMeaning', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <ul className="mt-2 space-y-1">
            <li><strong>50%</strong> means 50 out of 100, or <MathRenderer math="\frac{50}{100}" /></li>
            <li >{t.rich('definition.percentage.hundredPercent', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li >{t.rich('definition.percentage.zeroPercent', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          </ul>
        </div>
      </Definition>

      <InteractivePercentageSlider maxValue={100} showAllFormats={true} />

      <KeyConcept title={t('keyConcepts.understanding.title')}>
        <p className="mb-4">
          {t('keyConcepts.understanding.intro')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="font-semibold mb-2">{t('keyConcepts.understanding.realWorldTitle')}</p>
            <ul className="space-y-1 text-sm">
              <li>{t('keyConcepts.understanding.grade')}</li>
              <li>{t('keyConcepts.understanding.discount')}</li>
              <li>{t('keyConcepts.understanding.tip')}</li>
              <li>{t('keyConcepts.understanding.tax')}</li>
              <li>{t('keyConcepts.understanding.interest')}</li>
            </ul>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="font-semibold mb-2">{t('keyConcepts.understanding.commonTitle')}</p>
            <ul className="space-y-1 text-sm">
              <li>{t('keyConcepts.understanding.hundred')}</li>
              <li>{t('keyConcepts.understanding.fifty')}</li>
              <li>{t('keyConcepts.understanding.twentyFive')}</li>
              <li>{t('keyConcepts.understanding.seventyFive')}</li>
              <li>{t('keyConcepts.understanding.ten')}</li>
            </ul>
          </div>
        </div>
      </KeyConcept>

      <Note type="success">
        <p className="font-semibold">{t('notes.centConnection.title')}</p>
        <p className="mt-2" >{t.rich('notes.centConnection.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>{t('notes.centConnection.cents100')}</li>
          <li>{t('notes.centConnection.cents50')}</li>
          <li>{t('notes.centConnection.cents25')}</li>
        </ul>
        <p className="mt-2 text-sm">{t('notes.centConnection.meaning')}</p>
      </Note>

      <PercentageVisualizer percentage={75} type="pie" showLabels={true} />

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.converting')}</h2>
        
        <Definition term={t('definition.percentToDecimal.title')}>
          <p>{t('definition.percentToDecimal.explanation')}</p>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-semibold mb-2">{t('definition.percentToDecimal.examplesTitle')}</p>
            <ul className="space-y-1">
              <li>{t('definition.percentToDecimal.example1')}</li>
              <li>{t('definition.percentToDecimal.example2')}</li>
              <li>{t('definition.percentToDecimal.example3')}</li>
              <li>{t('definition.percentToDecimal.example4')}</li>
            </ul>
          </div>
        </Definition>

        <Note type="info">
          <p className="font-semibold">{t('notes.quickTrick.title')}</p>
          <ul className="mt-2 space-y-2 list-disc list-inside">
            <li >{t.rich('notes.quickTrick.step1', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li >{t.rich('notes.quickTrick.step2', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li >{t.rich('notes.quickTrick.step3', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          </ul>
        </Note>

        <Definition term={t('definition.decimalToPercent.title')}>
          <p>{t('definition.decimalToPercent.explanation')}</p>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="font-semibold mb-2">{t('definition.decimalToPercent.examplesTitle')}</p>
            <ul className="space-y-1">
              <li>{t('definition.decimalToPercent.example1')}</li>
              <li>{t('definition.decimalToPercent.example2')}</li>
              <li>{t('definition.decimalToPercent.example3')}</li>
              <li>{t('definition.decimalToPercent.example4')}</li>
            </ul>
          </div>
        </Definition>

        <MultipleChoiceExercise
          question={t('exercises.convertDecimal.question')}
          choices={[
            { id: 'a', text: '3.5%', isCorrect: false },
            { id: 'b', text: '35%', isCorrect: true },
            { id: 'c', text: '350%', isCorrect: false },
            { id: 'd', text: '0.35%', isCorrect: false }
          ]}
          explanation={t('exercises.convertDecimal.explanation')}
          hint={t('exercises.convertDecimal.hint')}
        />

        <Definition term={t('definition.fractionToPercent.title')}>
          <p>{t('definition.fractionToPercent.explanation')}</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>{t('definition.fractionToPercent.step1')}</li>
            <li>{t('definition.fractionToPercent.step2')}</li>
            <li>{t('definition.fractionToPercent.step3')}</li>
          </ol>
        </Definition>

        <Example 
          title={t('examples.fractionToPercent.title')}
          problem={<p>{t('examples.fractionToPercent.problem', { fraction: '' })}<MathRenderer math="\frac{3}{4}" /></p>}
          solution={
            <StepByStep
              steps={[
                {
                  title: t('examples.fractionToPercent.step1Title'),
                  content: <p>{t('examples.fractionToPercent.step1Content')}</p>
                },
                {
                  title: t('examples.fractionToPercent.step2Title'),
                  content: <p>{t('examples.fractionToPercent.step2Content')}</p>
                },
                {
                  title: t('examples.fractionToPercent.step3Title'),
                  content: <p>{t('examples.fractionToPercent.step3Content', { result: '' })}<MathRenderer math="\frac{3}{4} = 75\%" /></p>
                }
              ]}
            />
          }
        />

        <Note type="warning">
          <p className="font-semibold">{t('notes.commonPairs.title')}</p>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">1/2 = 50%</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">1/4 = 25%</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">3/4 = 75%</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">1/5 = 20%</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">1/10 = 10%</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">1/3 ≈ 33.3%</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">2/3 ≈ 66.7%</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">1/8 = 12.5%</div>
            </div>
          </div>
        </Note>

        <NumericInputExercise
          question={<>{t('exercises.fractionToPercent.question', { fraction: '' })}<MathRenderer math="\frac{1}{5}" /> as a percentage?</>}
          correctAnswer={20}
          unit="%"
          solution={t('exercises.fractionToPercent.solution')}
          hint={t('exercises.fractionToPercent.hint')}
        />
      </section>

      <PercentageVisualizer percentage={40} type="grid" showLabels={true} />

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.calculating')}</h2>
        
        <KeyConcept title={t('keyConcepts.findingPercentage.title')}>
          <p>{t('keyConcepts.findingPercentage.intro')}</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>{t('keyConcepts.findingPercentage.step1')}</li>
            <li>{t('keyConcepts.findingPercentage.step2')}</li>
          </ol>
          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="font-semibold mb-2">{t('keyConcepts.findingPercentage.formulaTitle')}</p>
            <p className="text-center text-lg">
              <MathRenderer math="\text{Result} = \frac{\text{Percentage}}{100} \times \text{Number}" />
            </p>
          </div>
        </KeyConcept>

        <Note type="success">
          <p className="font-semibold">{t('notes.mentalMath.title')}</p>
          <ul className="mt-2 space-y-2 list-disc list-inside">
            <li >{t.rich('notes.mentalMath.ten', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li >{t.rich('notes.mentalMath.fifty', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li >{t.rich('notes.mentalMath.twentyFive', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li >{t.rich('notes.mentalMath.one', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li >{t.rich('notes.mentalMath.fifteen', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li >{t.rich('notes.mentalMath.twenty', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          </ul>
        </Note>

        <Example 
          title={t('examples.findingPercentage.title')}
          problem={<p>{t('examples.findingPercentage.problem')}</p>}
          solution={
            <StepByStep
              steps={[
                {
                  title: t('examples.findingPercentage.step1Title'),
                  content: <p>{t('examples.findingPercentage.step1Content')}</p>
                },
                {
                  title: t('examples.findingPercentage.step2Title'),
                  content: <p>{t('examples.findingPercentage.step2Content')}</p>
                },
                {
                  title: t('examples.findingPercentage.step3Title'),
                  content: <p>{t('examples.findingPercentage.step3Content')}</p>
                }
              ]}
            />
          }
        />

        <MultipleChoiceExercise
          question={t('exercises.percentOf.question')}
          choices={[
            { id: 'a', text: '12', isCorrect: false },
            { id: 'b', text: '15', isCorrect: true },
            { id: 'c', text: '18', isCorrect: false },
            { id: 'd', text: '20', isCorrect: false }
          ]}
          explanation={t('exercises.percentOf.explanation')}
          hint={t('exercises.percentOf.hint')}
        />

        <Definition term={t('definition.whatPercent.title')}>
          <p>{t('definition.whatPercent.explanation')}</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>{t('definition.whatPercent.step1')}</li>
            <li>{t('definition.whatPercent.step2')}</li>
            <li>{t('definition.whatPercent.step3')}</li>
          </ol>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-semibold mb-2">{t('definition.whatPercent.formulaTitle')}</p>
            <p className="text-center text-lg">
              <MathRenderer math="\text{Percentage} = \frac{\text{Part}}{\text{Whole}} \times 100\%" />
            </p>
          </div>
        </Definition>

        <Example 
          title={t('examples.whatPercent.title')}
          problem={<p>{t('examples.whatPercent.problem')}</p>}
          solution={
            <StepByStep
              steps={[
                {
                  title: t('examples.whatPercent.step1Title'),
                  content: <p>{t('examples.whatPercent.step1Content')}</p>
                },
                {
                  title: t('examples.whatPercent.step2Title'),
                  content: <p>{t('examples.whatPercent.step2Content')}</p>
                },
                {
                  title: t('examples.whatPercent.step3Title'),
                  content: <p>{t('examples.whatPercent.step3Content')}</p>
                }
              ]}
            />
          }
        />

        <NumericInputExercise
          question={t('exercises.whatPercent.question')}
          correctAnswer={25}
          unit="%"
          solution={t('exercises.whatPercent.solution')}
          hint={t('exercises.whatPercent.hint')}
        />
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.realWorld')}</h2>
        
        <KeyConcept title={t('keyConcepts.percentageChange.title')}>
          <p className="mb-4">
            {t('keyConcepts.percentageChange.intro')}
          </p>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="font-semibold mb-2">{t('keyConcepts.percentageChange.formulaTitle')}</p>
            <p className="text-center text-lg mb-4">
              <MathRenderer math="\text{Percent Change} = \frac{\text{New Value} - \text{Original Value}}{\text{Original Value}} \times 100\%" />
            </p>
            <ul className="space-y-1 text-sm">
              <li >{t.rich('keyConcepts.percentageChange.positive', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
              <li >{t.rich('keyConcepts.percentageChange.negative', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            </ul>
          </div>
        </KeyConcept>

        <Example 
          title={t('examples.percentageIncrease.title')}
          problem={<p>{t('examples.percentageIncrease.problem')}</p>}
          solution={
            <StepByStep
              steps={[
                {
                  title: t('examples.percentageIncrease.step1Title'),
                  content: <p>{t('examples.percentageIncrease.step1Content')}</p>
                },
                {
                  title: t('examples.percentageIncrease.step2Title'),
                  content: <p>{t('examples.percentageIncrease.step2Content')}</p>
                },
                {
                  title: t('examples.percentageIncrease.step3Title'),
                  content: <p>{t('examples.percentageIncrease.step3Content')}</p>
                },
                {
                  title: t('examples.percentageIncrease.step4Title'),
                  content: <p>{t('examples.percentageIncrease.step4Content')}</p>
                }
              ]}
            />
          }
        />

        <PercentageVisualizer percentage={25} total={100} type="money" showLabels={true} />

        <Definition term={t('definition.discounts.title')}>
          <p>{t('definition.discounts.intro')}</p>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="font-semibold mb-2">{t('definition.discounts.twoMethodsTitle')}</p>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">{t('definition.discounts.method1Title')}</p>
                <ol className="list-decimal list-inside text-sm ml-2">
                  <li>{t('definition.discounts.method1Step1')}</li>
                  <li>{t('definition.discounts.method1Step2')}</li>
                </ol>
              </div>
              <div>
                <p className="font-semibold text-sm">{t('definition.discounts.method2Title')}</p>
                <p className="text-sm ml-2">{t('definition.discounts.method2Content')}</p>
              </div>
            </div>
          </div>
        </Definition>

        <Note type="info">
          <p className="font-semibold">{t('notes.discountShortcut.title')}</p>
          <ul className="mt-2 space-y-2 list-disc list-inside">
            <li >{t.rich('notes.discountShortcut.twenty', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li >{t.rich('notes.discountShortcut.twentyFive', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li >{t.rich('notes.discountShortcut.thirty', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li >{t.rich('notes.discountShortcut.formula', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          </ul>
          <p className="mt-2 text-sm font-semibold">{t('notes.discountShortcut.faster')}</p>
        </Note>

        <Example 
          title={t('examples.salePrice.title')}
          problem={<p>{t('examples.salePrice.problem')}</p>}
          solution={
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="font-semibold text-sm mb-1">{t('examples.salePrice.method1Title')}</p>
                <StepByStep
                  steps={[
                    {
                      title: t('examples.salePrice.method1Step1Title'),
                      content: <p>{t('examples.salePrice.method1Step1Content')}</p>
                    },
                    {
                      title: t('examples.salePrice.method1Step2Title'),
                      content: <p>{t('examples.salePrice.method1Step2Content')}</p>
                    }
                  ]}
                />
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <p className="font-semibold text-sm mb-1">{t('examples.salePrice.method2Title')}</p>
                <StepByStep
                  steps={[
                    {
                      title: t('examples.salePrice.method2Step1Title'),
                      content: <p>{t('examples.salePrice.method2Step1Content')}</p>
                    },
                    {
                      title: t('examples.salePrice.method2Step2Title'),
                      content: <p>{t('examples.salePrice.method2Step2Content')}</p>
                    }
                  ]}
                />
              </div>
              <p className="text-center font-bold">{t('examples.salePrice.answer')}</p>
            </div>
          }
        />

        <MultipleChoiceExercise
          question={t('exercises.discount.question')}
          choices={[
            { id: 'a', text: '$15', isCorrect: false },
            { id: 'b', text: '$30', isCorrect: false },
            { id: 'c', text: '$35', isCorrect: true },
            { id: 'd', text: '$40', isCorrect: false }
          ]}
          explanation={t('exercises.discount.explanation')}
          hint={t('exercises.discount.hint')}
        />

        <Definition term={t('definition.tips.title')}>
          <p>{t('definition.tips.intro')}</p>
          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="font-semibold mb-2">{t('definition.tips.commonTitle')}</p>
            <ul className="space-y-1">
              <li >{t.rich('definition.tips.standard', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
              <li >{t.rich('definition.tips.good', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
              <li >{t.rich('definition.tips.excellent', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            </ul>
          </div>
        </Definition>

        <Note type="warning">
          <p className="font-semibold">{t('notes.tipCalculator.title')}</p>
          <div className="mt-2 space-y-2 text-sm">
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <p className="font-semibold">{t('notes.tipCalculator.tenTitle')}</p>
              <p>{t('notes.tipCalculator.tenContent')}</p>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <p className="font-semibold">{t('notes.tipCalculator.fifteenTitle')}</p>
              <p>{t('notes.tipCalculator.fifteenContent')}</p>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <p className="font-semibold">{t('notes.tipCalculator.twentyTitle')}</p>
              <p>{t('notes.tipCalculator.twentyContent')}</p>
            </div>
          </div>
        </Note>

        <NumericInputExercise
          question={t('exercises.tip.question')}
          correctAnswer={13}
          unit="dollars"
          solution={t('exercises.tip.solution')}
          hint={t('exercises.tip.hint')}
        />

        <Definition term={t('definition.salesTax.title')}>
          <p>{t('definition.salesTax.intro')}</p>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-semibold mb-2">{t('definition.salesTax.calculatingTitle')}</p>
            <p className="text-center">
              <MathRenderer math="\text{Total} = \text{Price} + (\text{Price} \times \text{Tax Rate})" />
            </p>
            <p className="text-center mt-2">{t('definition.salesTax.shortcutLabel')}</p>
            <p className="text-center">
              <MathRenderer math="\text{Total} = \text{Price} \times (1 + \text{Tax Rate})" />
            </p>
          </div>
        </Definition>

        <Example 
          title={t('examples.salesTax.title')}
          problem={<p>{t('examples.salesTax.problem')}</p>}
          solution={
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="font-semibold text-sm mb-1">{t('examples.salesTax.method1Title')}</p>
                <StepByStep
                  steps={[
                    {
                      title: t('examples.salesTax.method1Step1Title'),
                      content: <p>{t('examples.salesTax.method1Step1Content')}</p>
                    },
                    {
                      title: t('examples.salesTax.method1Step2Title'),
                      content: <p>{t('examples.salesTax.method1Step2Content')}</p>
                    }
                  ]}
                />
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <p className="font-semibold text-sm mb-1">{t('examples.salesTax.method2Title')}</p>
                <StepByStep
                  steps={[
                    {
                      title: t('examples.salesTax.method2Step1Title'),
                      content: <p>{t('examples.salesTax.method2Step1Content')}</p>
                    },
                    {
                      title: t('examples.salesTax.method2Step2Title'),
                      content: <p>{t('examples.salesTax.method2Step2Content')}</p>
                    }
                  ]}
                />
              </div>
              <p className="text-center font-bold">{t('examples.salesTax.answer')}</p>
            </div>
          }
        />

        <MultipleChoiceExercise
          question={t('exercises.salesTax.question')}
          choices={[
            { id: 'a', text: '$127.00', isCorrect: false },
            { id: 'b', text: '$128.40', isCorrect: true },
            { id: 'c', text: '$126.00', isCorrect: false },
            { id: 'd', text: '$130.00', isCorrect: false }
          ]}
          explanation={t('exercises.salesTax.explanation')}
          hint={t('exercises.salesTax.hint')}
        />
      </section>

      <Note type="success">
        <p className="font-semibold">{t('notes.masterStrategy.title')}</p>
        <ol className="mt-2 space-y-2 list-decimal list-inside">
          <li >{t.rich('notes.masterStrategy.memorize', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          <li >{t.rich('notes.masterStrategy.mentalMath', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          <li >{t.rich('notes.masterStrategy.buildBasics', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          <li >{t.rich('notes.masterStrategy.check', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          <li >{t.rich('notes.masterStrategy.practice', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
        </ol>
      </Note>

      <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
        <h3 className="text-xl font-bold mb-3">{t('conclusion.title')}</h3>
        <ul className="space-y-2">
          <li>{t('conclusion.takeaway1')}</li>
          <li>{t('conclusion.takeaway2')}</li>
          <li>{t('conclusion.takeaway3')}</li>
          <li>{t('conclusion.takeaway4')}</li>
          <li>{t('conclusion.takeaway5')}</li>
          <li>{t('conclusion.takeaway6')}</li>
          <li>{t('conclusion.takeaway7')}</li>
        </ul>
      </div>

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
