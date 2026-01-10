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

export default function PatternSequencesLesson() {
  const t = useTranslations('patterns-sequences')
  const navigation = getLessonNavigation('foundations', 'patterns-sequences')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* Introduction */}
      <Definition term={t('definition.pattern.title')}>
        <p>{t.rich('definition.pattern.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4">
          <p className="font-semibold mb-2">{t('definition.pattern.examplesTitle')}</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>{t('definition.pattern.example1')}</li>
            <li>{t('definition.pattern.example2')}</li>
            <li>{t('definition.pattern.example3')}</li>
            <li>{t('definition.pattern.example4')}</li>
          </ul>
        </div>
      </Definition>

      <Definition term={t('definition.sequence.title')}>
        <p>{t.rich('definition.sequence.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <p className="mt-2">{t('definition.sequence.explanation')}</p>
      </Definition>

      {/* Number Patterns */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('definition.numberPatterns.title')}</h2>
        <p className="mb-4">{t('definition.numberPatterns.explanation')}</p>

        <VisualExplanation 
          title={t('visuals.numberPattern.title')}
          caption={t('visuals.numberPattern.caption')}
        >
          <svg viewBox="0 0 600 180" className="w-full h-auto">
            {/* Pattern boxes */}
            {[2, 4, 6, 8, 10].map((num, i) => (
              <g key={i}>
                {/* Box */}
                <rect 
                  x={50 + i * 110} 
                  y="40" 
                  width="80" 
                  height="80" 
                  className="fill-blue-500" 
                  rx="8"
                />
                {/* Number */}
                <text 
                  x={90 + i * 110} 
                  y="90" 
                  textAnchor="middle" 
                  className="fill-white font-bold text-3xl"
                >
                  {num}
                </text>
                {/* Arrow */}
                {i < 4 && (
                  <>
                    <line 
                      x1={130 + i * 110} 
                      y1="80" 
                      x2={150 + i * 110} 
                      y2="80" 
                      className="stroke-gray-600 dark:stroke-gray-400" 
                      strokeWidth="3"
                      markerEnd="url(#arrowhead)"
                    />
                    <text 
                      x={140 + i * 110} 
                      y="70" 
                      textAnchor="middle" 
                      className="fill-green-600 dark:fill-green-400 text-sm font-semibold"
                    >
                      +2
                    </text>
                  </>
                )}
              </g>
            ))}
            
            {/* Arrow marker definition */}
            <defs>
              <marker 
                id="arrowhead" 
                markerWidth="10" 
                markerHeight="10" 
                refX="9" 
                refY="3" 
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" className="fill-gray-600 dark:fill-gray-400" />
              </marker>
            </defs>
            
            {/* Rule label */}
            <text 
              x="300" 
              y="160" 
              textAnchor="middle" 
              className="fill-gray-700 dark:fill-gray-300 text-sm font-semibold"
            >
              {t('visuals.numberPattern.rule')}
            </text>
          </svg>
        </VisualExplanation>

        <KeyConcept>
          <p className="font-semibold mb-2">{t('keyConcepts.commonPatterns.title')}</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>{t('keyConcepts.commonPatterns.counting')}:</strong> {t('keyConcepts.commonPatterns.countingExample')}</li>
            <li><strong>{t('keyConcepts.commonPatterns.skip')}:</strong> {t('keyConcepts.commonPatterns.skipExample')}</li>
            <li><strong>{t('keyConcepts.commonPatterns.multiply')}:</strong> {t('keyConcepts.commonPatterns.multiplyExample')}</li>
          </ul>
        </KeyConcept>
      </section>

      {/* Shape Patterns */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('definition.shapePatterns.title')}</h2>
        <p className="mb-4">{t('definition.shapePatterns.explanation')}</p>

        <VisualExplanation 
          title={t('visuals.shapePattern.title')}
          caption={t('visuals.shapePattern.caption')}
        >
          <svg viewBox="0 0 600 150" className="w-full h-auto">
            {/* Repeating pattern: circle, square, triangle */}
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} transform={`translate(${60 + i * 110}, 75)`}>
                {/* Circle */}
                <circle 
                  cx="0" 
                  cy="0" 
                  r="25" 
                  className="fill-red-500" 
                />
                {/* Square */}
                <rect 
                  x="45" 
                  y="-25" 
                  width="50" 
                  height="50" 
                  className="fill-blue-500" 
                />
                {/* Triangle */}
                <polygon 
                  points="140,-25 115,25 165,25" 
                  className="fill-green-500" 
                />
              </g>
            ))}
          </svg>
        </VisualExplanation>

        <KeyConcept>
          <p className="font-semibold mb-2">{t('keyConcepts.shapePatternTypes.title')}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('keyConcepts.shapePatternTypes.repeat')}</li>
            <li>{t('keyConcepts.shapePatternTypes.color')}</li>
            <li>{t('keyConcepts.shapePatternTypes.size')}</li>
          </ul>
        </KeyConcept>
      </section>

      {/* Growing Patterns */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('definition.growingPatterns.title')}</h2>
        <p className="mb-4">{t('definition.growingPatterns.explanation')}</p>

        <VisualExplanation 
          title={t('visuals.growingPattern.title')}
          caption={t('visuals.growingPattern.caption')}
        >
          <svg viewBox="0 0 600 200" className="w-full h-auto">
            {/* Term 1: 1 block */}
            <g transform="translate(50, 100)">
              <rect x="0" y="0" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <text x="15" y="55" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-xs">
                {t('visuals.growingPattern.term')} 1
              </text>
              <text x="15" y="70" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-xs font-semibold">
                1 {t('visuals.growingPattern.block')}
              </text>
            </g>
            
            {/* Term 2: 3 blocks (L shape) */}
            <g transform="translate(150, 70)">
              <rect x="0" y="0" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="0" y="30" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="30" y="30" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <text x="30" y="85" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-xs">
                {t('visuals.growingPattern.term')} 2
              </text>
              <text x="30" y="100" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-xs font-semibold">
                3 {t('visuals.growingPattern.blocks')}
              </text>
            </g>
            
            {/* Term 3: 6 blocks */}
            <g transform="translate(270, 40)">
              <rect x="0" y="0" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="0" y="30" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="0" y="60" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="30" y="30" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="30" y="60" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="60" y="60" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <text x="45" y="115" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-xs">
                {t('visuals.growingPattern.term')} 3
              </text>
              <text x="45" y="130" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-xs font-semibold">
                6 {t('visuals.growingPattern.blocks')}
              </text>
            </g>
            
            {/* Term 4: 10 blocks */}
            <g transform="translate(420, 10)">
              <rect x="0" y="0" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="0" y="30" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="0" y="60" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="0" y="90" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="30" y="30" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="30" y="60" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="30" y="90" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="60" y="60" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="60" y="90" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <rect x="90" y="90" width="30" height="30" className="fill-purple-500" stroke="#fff" strokeWidth="2" />
              <text x="60" y="145" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-xs">
                {t('visuals.growingPattern.term')} 4
              </text>
              <text x="60" y="160" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-xs font-semibold">
                10 {t('visuals.growingPattern.blocks')}
              </text>
            </g>
          </svg>
        </VisualExplanation>
      </section>

      {/* Pattern Rules */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('definition.patternRules.title')}</h2>
        <p className="mb-4">{t('definition.patternRules.explanation')}</p>

        <VisualExplanation 
          title={t('visuals.patternRule.title')}
          caption={t('visuals.patternRule.caption')}
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  {t('visuals.patternRule.sequenceLabel')}
                </p>
                <div className="flex items-center gap-3 text-2xl font-bold">
                  <span className="text-blue-600 dark:text-blue-400">3</span>
                  <span className="text-gray-400">,</span>
                  <span className="text-blue-600 dark:text-blue-400">6</span>
                  <span className="text-gray-400">,</span>
                  <span className="text-blue-600 dark:text-blue-400">9</span>
                  <span className="text-gray-400">,</span>
                  <span className="text-blue-600 dark:text-blue-400">12</span>
                  <span className="text-gray-400">,</span>
                  <span className="text-blue-600 dark:text-blue-400">15</span>
                  <span className="text-gray-400">...</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  {t('visuals.patternRule.ruleLabel')}
                </p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-green-500">
                  <p className="text-lg font-semibold text-green-700 dark:text-green-400">
                    {t('visuals.patternRule.ruleText')}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  {t('visuals.patternRule.algebraicLabel')}
                </p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <MathRenderer math="3 \times n" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {t('visuals.patternRule.algebraicNote')}
                  </p>
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
                <p>{t('examples.example1.answer')}</p>
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
          problem={<p>{t('examples.example3.question')}</p>}
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
      </section>

      {/* Practice Exercises */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">✏️ {t('exercises.title')}</h2>

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

        <NumericInputExercise
          question={t('exercises.exercise2.question')}
          correctAnswer={25}
          hint={t('exercises.exercise2.hint')}
          solution={<p>{t('exercises.exercise2.explanation')}</p>}
        />

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

        <NumericInputExercise
          question={t('exercises.exercise4.question')}
          correctAnswer={64}
          hint={t('exercises.exercise4.hint')}
          solution={<p>{t('exercises.exercise4.explanation')}</p>}
        />

        <MultipleChoiceExercise
          question={t('exercises.exercise5.question')}
          choices={[
            { id: 'a', text: t('exercises.exercise5.option1'), isCorrect: true },
            { id: 'b', text: t('exercises.exercise5.option2'), isCorrect: false },
            { id: 'c', text: t('exercises.exercise5.option3'), isCorrect: false },
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
        <Note>{t('notes.trick1')}</Note>
        <Note>{t('notes.warning1')}</Note>
      </section>

      {/* Conclusion */}
      <section className="my-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
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
