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

export default function MeasurementLesson() {
  const t = useTranslations('measurement')
  const navigation = getLessonNavigation('foundations', 'measurement')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* Introduction */}
      <Definition term={t('definition.measurement.title')}>
        <p>{t.rich('definition.measurement.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.measurement.typesTitle')}</p>
          <ul className="space-y-1">
            <li>{t('definition.measurement.type1')}</li>
            <li>{t('definition.measurement.type2')}</li>
            <li>{t('definition.measurement.type3')}</li>
            <li>{t('definition.measurement.type4')}</li>
          </ul>
        </div>
      </Definition>

      <Note type="tip">
        <p>{t('notes.tip1')}</p>
      </Note>

      {/* Length and Distance */}
      <Definition term={t('definition.length.title')}>
        <p>{t.rich('definition.length.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 space-y-3">
          <div>
            <p className="font-semibold">{t('definition.length.metricTitle')}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('definition.length.millimeter')}</li>
              <li>{t('definition.length.centimeter')}</li>
              <li>{t('definition.length.meter')}</li>
              <li>{t('definition.length.kilometer')}</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">{t('definition.length.imperialTitle')}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('definition.length.inch')}</li>
              <li>{t('definition.length.foot')}</li>
              <li>{t('definition.length.yard')}</li>
              <li>{t('definition.length.mile')}</li>
            </ul>
          </div>
        </div>
      </Definition>

      <VisualExplanation
        title={t('visuals.lengthTools.title')}
        caption={t('visuals.lengthTools.caption')}
      >
        <svg viewBox="0 0 500 200" className="w-full max-w-2xl">
          {/* Ruler */}
          <rect x="50" y="50" width="400" height="40" fill="#f59e0b" opacity="0.3" stroke="#f59e0b" strokeWidth="2" />
          {/* Tick marks */}
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={i}
              x1={50 + i * 30}
              y1="50"
              x2={50 + i * 30}
              y2={i % 4 === 0 ? "65" : "57"}
              stroke="#f59e0b"
              strokeWidth="2"
            />
          ))}
          {/* Numbers */}
          {[0, 4, 8, 12].map((num, i) => (
            <text
              key={num}
              x={50 + i * 120}
              y="85"
              textAnchor="middle"
              className="text-xs font-medium fill-gray-700 dark:fill-gray-300"
            >
              {num}
            </text>
          ))}
          <text x="250" y="110" textAnchor="middle" className="text-sm font-semibold fill-gray-700 dark:fill-gray-300">
            {t('visuals.lengthTools.ruler')}
          </text>
          
          {/* Measuring tape icon */}
          <circle cx="100" cy="160" r="25" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
          <path d="M 100 160 Q 130 150 150 170" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <text x="175" y="165" textAnchor="start" className="text-sm font-semibold fill-gray-700 dark:fill-gray-300">
            {t('visuals.lengthTools.tape')}
          </text>
          
          {/* Meter stick */}
          <rect x="300" y="145" width="140" height="15" fill="#10b981" opacity="0.3" stroke="#10b981" strokeWidth="2" />
          <text x="370" y="180" textAnchor="middle" className="text-sm font-semibold fill-gray-700 dark:fill-gray-300">
            {t('visuals.lengthTools.meterStick')}
          </text>
        </svg>
      </VisualExplanation>

      <KeyConcept title={t('keyConcepts.lengthConversions.title')}>
        <p>{t('keyConcepts.lengthConversions.explanation')}</p>
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900/30 rounded space-y-1">
          <p className="font-mono text-sm">{t('keyConcepts.lengthConversions.metric1')}</p>
          <p className="font-mono text-sm">{t('keyConcepts.lengthConversions.metric2')}</p>
          <p className="font-mono text-sm">{t('keyConcepts.lengthConversions.metric3')}</p>
          <p className="font-mono text-sm mt-2">{t('keyConcepts.lengthConversions.imperial1')}</p>
          <p className="font-mono text-sm">{t('keyConcepts.lengthConversions.imperial2')}</p>
          <p className="font-mono text-sm">{t('keyConcepts.lengthConversions.imperial3')}</p>
        </div>
      </KeyConcept>

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

      <Note type="tip">
        <p>{t('notes.trick1')}</p>
      </Note>

      {/* Weight and Mass */}
      <Definition term={t('definition.weight.title')}>
        <p>{t.rich('definition.weight.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 space-y-3">
          <div>
            <p className="font-semibold">{t('definition.weight.metricTitle')}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('definition.weight.gram')}</li>
              <li>{t('definition.weight.kilogram')}</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">{t('definition.weight.imperialTitle')}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('definition.weight.ounce')}</li>
              <li>{t('definition.weight.pound')}</li>
            </ul>
          </div>
        </div>
      </Definition>

      <VisualExplanation
        title={t('visuals.weightScale.title')}
        caption={t('visuals.weightScale.caption')}
      >
        <svg viewBox="0 0 400 250" className="w-full max-w-md">
          {/* Scale base */}
          <rect x="150" y="180" width="100" height="15" fill="#6b7280" />
          {/* Scale platform */}
          <rect x="130" y="140" width="140" height="40" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="2" />
          {/* Scale post */}
          <rect x="195" y="80" width="10" height="60" fill="#6b7280" />
          {/* Scale dial */}
          <circle cx="200" cy="60" r="35" fill="#f3f4f6" stroke="#374151" strokeWidth="2" />
          <path d="M 200 60 L 220 45" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          {/* Weight indicators */}
          <text x="200" y="35" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
            0
          </text>
          <text x="230" y="65" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
            5
          </text>
          <text x="200" y="95" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
            10
          </text>
          {/* Object on scale */}
          <rect x="175" y="120" width="50" height="20" fill="#10b981" opacity="0.6" />
          <text x="200" y="220" textAnchor="middle" className="text-sm font-semibold fill-gray-700 dark:fill-gray-300">
            {t('visuals.weightScale.label')}
          </text>
        </svg>
      </VisualExplanation>

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
              <p>{t('examples.example2.answer')}</p>
            </div>
          </>
        }
      />

      <NumericInputExercise
        question={t('exercises.exercise2.question')}
        correctAnswer={3000}
        hint={t('exercises.exercise2.hint')}
        solution={<p>{t('exercises.exercise2.explanation')}</p>}
      />

      {/* Volume and Capacity */}
      <Definition term={t('definition.volume.title')}>
        <p>{t.rich('definition.volume.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.volume.unitsTitle')}</p>
          <ul className="space-y-1">
            <li>{t('definition.volume.milliliter')}</li>
            <li>{t('definition.volume.liter')}</li>
            <li>{t('definition.volume.cup')}</li>
            <li>{t('definition.volume.pint')}</li>
            <li>{t('definition.volume.quart')}</li>
            <li>{t('definition.volume.gallon')}</li>
          </ul>
        </div>
      </Definition>

      <VisualExplanation
        title={t('visuals.volumeContainers.title')}
        caption={t('visuals.volumeContainers.caption')}
      >
        <svg viewBox="0 0 500 200" className="w-full max-w-2xl">
          {/* Cup */}
          <path d="M 60 80 L 50 140 L 90 140 L 80 80 Z" fill="#ec4899" opacity="0.4" stroke="#ec4899" strokeWidth="2" />
          <text x="70" y="165" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
            {t('visuals.volumeContainers.cup')}
          </text>
          
          {/* Bottle (Liter) */}
          <rect x="160" y="60" width="40" height="80" rx="5" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="2" />
          <rect x="170" y="50" width="20" height="15" fill="#3b82f6" opacity="0.6" />
          <text x="180" y="165" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
            {t('visuals.volumeContainers.liter')}
          </text>
          
          {/* Measuring cup */}
          <path d="M 270 70 L 260 140 L 310 140 L 300 70 Z" fill="#10b981" opacity="0.4" stroke="#10b981" strokeWidth="2" />
          <line x1="265" y1="90" x2="305" y2="90" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="263" y1="110" x2="307" y2="110" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="261" y1="130" x2="309" y2="130" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" />
          <text x="285" y="165" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
            {t('visuals.volumeContainers.measuring')}
          </text>
          
          {/* Milk jug (Gallon) */}
          <rect x="370" y="50" width="60" height="90" rx="8" fill="#f59e0b" opacity="0.4" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="385" cy="60" r="8" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <text x="400" y="165" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
            {t('visuals.volumeContainers.gallon')}
          </text>
        </svg>
      </VisualExplanation>

      <KeyConcept title={t('keyConcepts.volumeConversions.title')}>
        <div className="space-y-1">
          <p className="font-mono text-sm">{t('keyConcepts.volumeConversions.conversion1')}</p>
          <p className="font-mono text-sm">{t('keyConcepts.volumeConversions.conversion2')}</p>
          <p className="font-mono text-sm">{t('keyConcepts.volumeConversions.conversion3')}</p>
          <p className="font-mono text-sm">{t('keyConcepts.volumeConversions.conversion4')}</p>
        </div>
      </KeyConcept>

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

      <Note type="warning">
        <p>{t('notes.warning1')}</p>
      </Note>

      {/* Time */}
      <Definition term={t('definition.time.title')}>
        <p>{t.rich('definition.time.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.time.unitsTitle')}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('definition.time.second')}</li>
            <li>{t('definition.time.minute')}</li>
            <li>{t('definition.time.hour')}</li>
            <li>{t('definition.time.day')}</li>
            <li>{t('definition.time.week')}</li>
            <li>{t('definition.time.month')}</li>
            <li>{t('definition.time.year')}</li>
          </ul>
        </div>
      </Definition>

      <VisualExplanation
        title={t('visuals.clock.title')}
        caption={t('visuals.clock.caption')}
      >
        <svg viewBox="0 0 300 300" className="w-full max-w-sm">
          {/* Clock face */}
          <circle cx="150" cy="150" r="100" fill="#f3f4f6" stroke="#374151" strokeWidth="3" />
          
          {/* Hour markers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 - 90) * Math.PI / 180
            const x1 = 150 + 85 * Math.cos(angle)
            const y1 = 150 + 85 * Math.sin(angle)
            const x2 = 150 + 95 * Math.cos(angle)
            const y2 = 150 + 95 * Math.sin(angle)
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#374151"
                strokeWidth="3"
              />
            )
          })}
          
          {/* Numbers */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
            const angle = (i * 30 - 90) * Math.PI / 180
            const x = 150 + 70 * Math.cos(angle)
            const y = 150 + 70 * Math.sin(angle)
            return (
              <text
                key={num}
                x={x}
                y={y + 5}
                textAnchor="middle"
                className="text-sm font-semibold fill-gray-700"
              >
                {num}
              </text>
            )
          })}
          
          {/* Hour hand (3:00) */}
          <line x1="150" y1="150" x2="190" y2="150" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
          
          {/* Minute hand (3:00) */}
          <line x1="150" y1="150" x2="150" y2="70" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
          
          {/* Center dot */}
          <circle cx="150" cy="150" r="6" fill="#ef4444" />
          
          <text x="150" y="280" textAnchor="middle" className="text-sm font-semibold fill-gray-700 dark:fill-gray-300">
            {t('visuals.clock.label')}
          </text>
        </svg>
      </VisualExplanation>

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
              <p>{t('examples.example3.answer')}</p>
            </div>
          </>
        }
      />

      <NumericInputExercise
        question={t('exercises.exercise4.question')}
        correctAnswer={120}
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

      <Note type="tip">
        <p>{t('notes.tip2')}</p>
      </Note>

      {/* Conclusion */}
      <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border-2 border-green-200 dark:border-green-700">
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
