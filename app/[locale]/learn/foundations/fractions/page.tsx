import MathRenderer from '@/components/math/MathRenderer'
import { 
  Definition, 
  Theorem, 
  Example, 
  KeyConcept, 
  Note, 
  StepByStep
} from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise, InteractiveFractionSlider } from '@/components/interactive'
import FractionVisualizer from '@/components/visualizations/FractionVisualizer'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'
import { useTranslations } from 'next-intl'

export default function FractionsBasicsLesson() {
  const t = useTranslations('fractions')
  const navigation = getLessonNavigation('foundations', 'fractions')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      <Definition term={t('definition.fraction.title')}>
        <p>{t.rich('definition.fraction.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>{t.rich('definition.fraction.numerator', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          <li>{t.rich('definition.fraction.denominator', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
        </ul>
        <div className="mt-4 text-center">
          <MathRenderer math="\frac{\text{numerator}}{\text{denominator}}" block />
        </div>
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900/30 rounded">
          <p className="text-sm font-semibold">{t('definition.fraction.howToRead')}</p>
          <ul className="text-sm mt-2 space-y-1">
            <li><MathRenderer math="\frac{3}{4}" /> {t('definition.fraction.readExample1')}</li>
            <li><MathRenderer math="\frac{1}{2}" /> {t('definition.fraction.readExample2')}</li>
            <li><MathRenderer math="\frac{5}{8}" /> {t('definition.fraction.readExample3')}</li>
          </ul>
        </div>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">Example:</p>
          <p dangerouslySetInnerHTML={{ __html: t('definition.fraction.pizzaExample', { fraction: '<span class="math-inline">\\frac{3}{8}</span>' }) }} />
        </div>
      </Definition>

      <Note type="tip">
        <p className="font-semibold">{t('notes.pizzaTrick.title')}</p>
        <p className="mt-2" dangerouslySetInnerHTML={{ __html: t('notes.pizzaTrick.content', { fraction: '<MathRenderer math="\\frac{3}{4}" />' }) }} />
      </Note>

      <FractionVisualizer
        numerator={3}
        denominator={4}
        type="circle"
        interactive={true}
        label={t('visualizers.circle', { fraction: '3/4' })}
      />

      <FractionVisualizer
        numerator={3}
        denominator={8}
        type="bar"
        interactive={true}
        label={t('visualizers.bar', { fraction: '3/8' })}
      />

      <InteractiveFractionSlider
        maxNumerator={12}
        maxDenominator={12}
        initialNumerator={3}
        initialDenominator={4}
        visualType="circle"
        showDecimal={true}
        label={t('visualizers.interactive')}
      />

      <Note type="success">
        <p className="font-semibold">{t('notes.benchmarks.title')}</p>
        <p className="mt-2">{t('notes.benchmarks.intro')}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div><MathRenderer math="\frac{1}{2} = 0.5" /> {t('notes.benchmarks.half')}</div>
          <div><MathRenderer math="\frac{1}{4} = 0.25" /> {t('notes.benchmarks.quarter')}</div>
          <div><MathRenderer math="\frac{3}{4} = 0.75" /> {t('notes.benchmarks.threeQuarters')}</div>
          <div><MathRenderer math="\frac{1}{3} \approx 0.333" /> {t('notes.benchmarks.third')}</div>
          <div><MathRenderer math="\frac{2}{3} \approx 0.667" /> {t('notes.benchmarks.twoThirds')}</div>
          <div><MathRenderer math="\frac{1}{5} = 0.2" /> {t('notes.benchmarks.fifth')}</div>
        </div>
      </Note>

      <KeyConcept title={t('keyConcept.title')}>
        {t('keyConcept.content')}
      </KeyConcept>

      <MultipleChoiceExercise
        question={
          <div>
            <p className="mb-2">{t('exercises.shadedArea.question')}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              {t('exercises.shadedArea.description')}
            </p>
          </div>
        }
        choices={[
          { id: 'a', text: <MathRenderer math="\frac{1}{4}" />, isCorrect: false },
          { id: 'b', text: <MathRenderer math="\frac{3}{4}" />, isCorrect: true },
          { id: 'c', text: <MathRenderer math="\frac{4}{3}" />, isCorrect: false },
          { id: 'd', text: <MathRenderer math="\frac{3}{1}" />, isCorrect: false }
        ]}
        explanation={
          <div>
            <p dangerouslySetInnerHTML={{ __html: t('exercises.shadedArea.explanation', { fraction: '\\frac{3}{4}' }) }} />
            <p className="mt-2">{t('exercises.shadedArea.remember')}</p>
          </div>
        }
        hint={t('exercises.shadedArea.hint')}
      />

      <Note type="tip">
        <p className="font-semibold">{t('notes.simplification.title')}</p>
        <p className="mt-2">
          {t('notes.simplification.intro')}
        </p>
        <div className="mt-3 space-y-1 text-sm font-mono bg-gray-50 dark:bg-gray-900/30 p-3 rounded">
          <p><MathRenderer math="\frac{24}{36}" /> → both even → <MathRenderer math="\frac{12}{18}" /></p>
          <p><MathRenderer math="\frac{12}{18}" /> → both even → <MathRenderer math="\frac{6}{9}" /></p>
          <p><MathRenderer math="\frac{6}{9}" /> → both divisible by 3 → <MathRenderer math="\frac{2}{3}" /></p>
        </div>
        <p className="mt-2 text-sm">{t('notes.simplification.proTip')}</p>
      </Note>

      <Definition term={t('definition.types.title')} example={
        <div className="space-y-2">
          <p>{t.rich('definition.types.proper', { fraction: '\\frac{2}{5}', strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p>{t.rich('definition.types.improper', { fraction: '\\frac{7}{5}', strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p>{t.rich('definition.types.mixed', { fraction: '2\\frac{1}{3}', strong: (chunks) => <strong>{chunks}</strong> })}</p>
        </div>
      }>
        <ul className="space-y-3">
          <li>
            <span>{t.rich('definition.types.properFraction', { strong: (chunks) => <strong>{chunks}</strong> })}</span>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('definition.types.properValue')}</div>
          </li>
          <li>
            <span>{t.rich('definition.types.improperFraction', { strong: (chunks) => <strong>{chunks}</strong> })}</span>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('definition.types.improperValue')}</div>
          </li>
          <li>
            <span>{t.rich('definition.types.mixedNumber', { strong: (chunks) => <strong>{chunks}</strong> })}</span>
          </li>
        </ul>
      </Definition>

      <Example
        problem={<>{t('examples.improperToMixed.problem', { fraction: '' })}<MathRenderer math="\frac{11}{4}" /></>}
        solution={
          <StepByStep
            steps={[
              {
                title: t('examples.improperToMixed.step1Title'),
                content: <>{t('examples.improperToMixed.step1Content', { division: '', remainder: '' })}<MathRenderer math="11 \div 4 = 2" /> remainder <MathRenderer math="3" /></>
              },
              {
                title: t('examples.improperToMixed.step2Title'),
                content: <>{t('examples.improperToMixed.step2Content', { whole: '' })}<MathRenderer math="2" /></>
              },
              {
                title: t('examples.improperToMixed.step3Title'),
                content: <>
                  {t('examples.improperToMixed.step3Content', { fraction: '' })}<MathRenderer math="\frac{3}{4}" />
                </>
              },
              {
                title: t('examples.improperToMixed.step4Title'),
                content: <>{t('examples.improperToMixed.step4Content', { result: '' })}<MathRenderer math="\frac{11}{4} = 2\frac{3}{4}" /></>
              }
            ]}
          />
        }
        hint={<>{t('examples.improperToMixed.hint')}</>}
      />

      <Note type="success">
        <p className="font-semibold">{t('notes.conversion.title')}</p>
        <div className="mt-2 space-y-3">
          <div>
            <p className="font-semibold text-sm">{t('notes.conversion.improperToMixed')}</p>
            <p className="text-sm">{t('notes.conversion.improperInstructions')}</p>
            <p className="text-sm mt-1 font-mono"><MathRenderer math="\frac{11}{4} = 2\frac{3}{4}" /> (11÷4 = 2 R 3)</p>
          </div>
          <div>
            <p className="font-semibold text-sm">{t('notes.conversion.mixedToImproper')}</p>
            <p className="text-sm">{t('notes.conversion.mixedInstructions')}</p>
            <p className="text-sm mt-1 font-mono"><MathRenderer math="2\frac{3}{4} = \frac{(2×4)+3}{4} = \frac{11}{4}" /></p>
          </div>
        </div>
      </Note>

      <NumericInputExercise
        question={
          <>
            <p>{t('exercises.convert.question', { fraction: '' })}<MathRenderer math="\frac{17}{5}" /></p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {t('exercises.convert.instruction')}
            </p>
          </>
        }
        correctAnswer={3.4}
        tolerance={0.01}
        hint={
          <>
            <p>{t('exercises.convert.hint')}</p>
            <p className="mt-2">{t('exercises.convert.hint2', { calculation: '', remainder: '' })}<MathRenderer math="17 \div 5 = 3" /> remainder <MathRenderer math="2" /></p>
          </>
        }
        solution={
          <div>
            <p>{t('exercises.convert.solution1', { calculation: '', remainder: '' })}<MathRenderer math="17 \div 5 = 3" /> R <MathRenderer math="2" /></p>
            <p className="mt-2">{t('exercises.convert.solution2', { result: '' })}<MathRenderer math="\frac{17}{5} = 3\frac{2}{5}" /></p>
            <p className="mt-2">{t('exercises.convert.solution3', { calculation: '' })}<MathRenderer math="3\frac{2}{5} = 3 + \frac{2}{5} = 3 + 0.4 = 3.4" /></p>
          </div>
        }
      />

      <Definition term={t('definition.equivalent.title')}>
        <p>{t.rich('definition.equivalent.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 text-center">
          <MathRenderer math="\frac{1}{2} = \frac{2}{4} = \frac{3}{6} = \frac{4}{8}" block />
        </div>
        <Note type="tip">
          <p>{t('definition.equivalent.create')}</p>
          <ul className="list-disc list-inside mt-2">
            <li>{t('definition.equivalent.multiply')}</li>
            <li>{t('definition.equivalent.divide')}</li>
          </ul>
        </Note>
        <Note type="success">
          <p className="font-semibold">{t('notes.lcm.title')}</p>
          <p className="mt-2">
            {t('notes.lcm.intro', { fraction1: '', fraction2: '' })}<MathRenderer math="\frac{2}{3}" /> and <MathRenderer math="\frac{3}{5}" />
          </p>
          <div className="mt-3 space-y-1 text-sm">
            <p>{t('notes.lcm.step1')}</p>
            <p><MathRenderer math="\frac{2}{3} = \frac{2 \times 5}{3 \times 5} = \frac{10}{15}" /></p>
            <p><MathRenderer math="\frac{3}{5} = \frac{3 \times 3}{5 \times 3} = \frac{9}{15}" /></p>
            <p className="mt-2 font-semibold">{t('notes.lcm.conclusion', { comparison: '' })}<MathRenderer math="\frac{2}{3} > \frac{3}{5}" /></p>
          </div>
        </Note>
      </Definition>

      <MultipleChoiceExercise
        question={<>{t('exercises.equivalent.question', { fraction: '' })}<MathRenderer math="\frac{2}{3}" />?</>}
        choices={[
          { id: 'a', text: <MathRenderer math="\frac{4}{6}" />, isCorrect: false },
          { id: 'b', text: <MathRenderer math="\frac{6}{9}" />, isCorrect: false },
          { id: 'c', text: <MathRenderer math="\frac{8}{10}" />, isCorrect: true },
          { id: 'd', text: <MathRenderer math="\frac{10}{15}" />, isCorrect: false }
        ]}
        explanation={
          <>
            {t('exercises.equivalent.explanation', { wrong: '', simplified: '', correct: '' })}<MathRenderer math="\frac{8}{10}" /> simplifies to <MathRenderer math="\frac{4}{5}" />, not <MathRenderer math="\frac{2}{3}" />.
          </>
        }
        hint={t('exercises.equivalent.hint')}
      />

      <Note type="tip">
        <p className="font-semibold">{t('notes.butterfly.title')}</p>
        <p className="mt-2">
          {t('notes.butterfly.intro', { fraction1: '', fraction2: '', product1: '', product2: '' })}<MathRenderer math="\frac{a}{b}" /> and <MathRenderer math="\frac{c}{d}" />
        </p>
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
          <p className="text-sm">{t.rich('notes.butterfly.example', { equation: '\\frac{2}{3} = \\frac{4}{6}', strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p className="text-sm mt-1">{t('notes.butterfly.leftWing', { calculation: '' })}<MathRenderer math="2 \times 6 = 12" /></p>
          <p className="text-sm">{t('notes.butterfly.rightWing', { calculation: '' })}<MathRenderer math="3 \times 4 = 12" /></p>
          <p className="text-sm mt-1">{t('notes.butterfly.conclusion')}</p>
        </div>
      </Note>

      <Theorem
        title={t('theorem.title')}
        proof={
          <div className="space-y-3">
            <p>{t.rich('theorem.proof.title', { fraction1: '\\frac{a}{b}', fraction2: '\\frac{c}{d}', equation: 'a \\times d = b \\times c', strong: (chunks) => <strong>{chunks}</strong> })}</p>
            <p>{t.rich('theorem.proof.proofTitle', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            <p>{t.rich('theorem.proof.step1', { equation: '\\frac{a}{b} = \\frac{c}{d}', bd: '', strong: (chunks) => <strong>{chunks}</strong> })}</p>
              <MathRenderer math="bd" />
            <MathRenderer math="\frac{a}{b} \cdot bd = \frac{c}{d} \cdot bd" block />
            <MathRenderer math="ad = bc" block />
            <p className="mt-3">{t.rich('theorem.proof.conclusion', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          </div>
        }
      >
        {t('theorem.statement')}
      </Theorem>

      <NumericInputExercise
        question={
          <>
            <p>{t('exercises.simplify.question', { fraction: '' })}<MathRenderer math="\frac{24}{36}" /></p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {t('exercises.simplify.instruction')}
            </p>
          </>
        }
        correctAnswer={0.6667}
        tolerance={0.01}
        hint={
          <>
            {t('exercises.simplify.hint')}
          </>
        }
        solution={
          <div className="space-y-2">
            <p>{t('exercises.simplify.solution1')}</p>
            <p><MathRenderer math="\frac{24 \div 12}{36 \div 12} = \frac{2}{3}" /></p>
            <p>{t('exercises.simplify.solution3', { decimal: '' })}<MathRenderer math="\frac{2}{3} \approx 0.6667" /></p>
          </div>
        }
      />

      <Note type="tip">
        <p className="font-semibold">{t('notes.gcf.title')}</p>
        <p className="mt-2">
          {t('notes.gcf.intro')}
        </p>
        <div className="mt-3 space-y-2">
          <div className="text-sm">
            <p>{t.rich('notes.gcf.example', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            <div className="mt-2 font-mono bg-gray-50 dark:bg-gray-900/30 p-3 rounded space-y-1">
              <p>{t('notes.gcf.step1')}</p>
              <p className="ml-8">{t('notes.gcf.step1Result')}</p>
              <p>{t('notes.gcf.step2')}</p>
              <p className="ml-8">{t('notes.gcf.step2Result')}</p>
              <p>{t('notes.gcf.step3')}</p>
              <p className="ml-8">{t('notes.gcf.step3Result')}</p>
              <p className="mt-2 font-bold">{t('notes.gcf.result')}</p>
            </div>
          </div>
          <p className="text-sm mt-3">
            {t('notes.gcf.euclid')}
          </p>
        </div>
      </Note>

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
