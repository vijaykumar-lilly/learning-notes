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

export default function IntegersLesson() {
  const t = useTranslations('integers')
  const navigation = getLessonNavigation('pre-algebra', 'integers')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* Introduction */}
      <Definition term={t('definition.integers.title')}>
        <p>{t.rich('definition.integers.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4">
          <p className="font-semibold mb-2">{t('definition.integers.typesTitle')}</p>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>{t('definition.integers.positive')}:</strong> {t('definition.integers.positiveExample')}</li>
            <li><strong>{t('definition.integers.negative')}:</strong> {t('definition.integers.negativeExample')}</li>
            <li><strong>{t('definition.integers.zero')}:</strong> {t('definition.integers.zeroExample')}</li>
          </ul>
        </div>
      </Definition>

      {/* Number Line */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.numberLine.title')}</h2>
        <p className="mb-4">{t('sections.numberLine.explanation')}</p>

        <VisualExplanation 
          title={t('visuals.numberLine.title')}
          caption={t('visuals.numberLine.caption')}
        >
          <svg viewBox="0 0 700 120" className="w-full h-auto">
            {/* Number line */}
            <line x1="50" y1="60" x2="650" y2="60" className="stroke-gray-700 dark:stroke-gray-300" strokeWidth="3"/>
            
            {/* Arrows */}
            <polygon points="640,55 650,60 640,65" className="fill-gray-700 dark:fill-gray-300"/>
            <polygon points="60,55 50,60 60,65" className="fill-gray-700 dark:fill-gray-300"/>
            
            {/* Numbers and tick marks */}
            {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((num) => {
              const x = 350 + num * 50
              return (
                <g key={num}>
                  <line 
                    x1={x} 
                    y1="50" 
                    x2={x} 
                    y2="70" 
                    className="stroke-gray-700 dark:stroke-gray-300" 
                    strokeWidth="2"
                  />
                  <text 
                    x={x} 
                    y="90" 
                    textAnchor="middle" 
                    className={`text-sm font-semibold ${num === 0 ? 'fill-red-600 dark:fill-red-400' : 'fill-gray-700 dark:fill-gray-300'}`}
                  >
                    {num}
                  </text>
                </g>
              )
            })}
            
            {/* Labels */}
            <text x="150" y="30" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 text-xs font-semibold">
              {t('visuals.numberLine.negativeLabel')}
            </text>
            <text x="550" y="30" textAnchor="middle" className="fill-green-600 dark:fill-green-400 text-xs font-semibold">
              {t('visuals.numberLine.positiveLabel')}
            </text>
          </svg>
        </VisualExplanation>

        <KeyConcept>
          <p className="font-semibold mb-2">{t('keyConcepts.numberLine.title')}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('keyConcepts.numberLine.point1')}</li>
            <li>{t('keyConcepts.numberLine.point2')}</li>
            <li>{t('keyConcepts.numberLine.point3')}</li>
          </ul>
        </KeyConcept>
      </section>

      {/* Absolute Value */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.absoluteValue.title')}</h2>
        
        <Definition term={t('definition.absoluteValue.title')}>
          <p>{t.rich('definition.absoluteValue.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <p className="mt-2">{t('definition.absoluteValue.explanation')}</p>
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
            <p className="font-semibold mb-1">{t('definition.absoluteValue.notation')}</p>
            <div className="flex items-center gap-4 text-lg">
              <MathRenderer math="|5| = 5" />
              <span className="text-gray-400">•</span>
              <MathRenderer math="|-5| = 5" />
            </div>
          </div>
        </Definition>

        <VisualExplanation 
          title={t('visuals.absoluteValue.title')}
          caption={t('visuals.absoluteValue.caption')}
        >
          <svg viewBox="0 0 600 180" className="w-full h-auto">
            {/* Number line */}
            <line x1="50" y1="90" x2="550" y2="90" className="stroke-gray-700 dark:stroke-gray-300" strokeWidth="2"/>
            
            {/* Zero point */}
            <circle cx="300" cy="90" r="5" className="fill-red-600"/>
            <text x="300" y="115" textAnchor="middle" className="fill-red-600 dark:fill-red-400 text-sm font-bold">
              0
            </text>
            
            {/* -4 point */}
            <circle cx="180" cy="90" r="5" className="fill-blue-600"/>
            <text x="180" y="115" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 text-sm font-bold">
              -4
            </text>
            
            {/* +4 point */}
            <circle cx="420" cy="90" r="5" className="fill-green-600"/>
            <text x="420" y="115" textAnchor="middle" className="fill-green-600 dark:fill-green-400 text-sm font-bold">
              4
            </text>
            
            {/* Distance arrows */}
            <g>
              <line x1="180" y1="50" x2="300" y2="50" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" markerEnd="url(#arrowBlue)"/>
              <line x1="300" y1="50" x2="180" y2="50" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" markerStart="url(#arrowBlue)"/>
              <text x="240" y="40" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 text-sm font-semibold">
                {t('visuals.absoluteValue.distance')} = 4
              </text>
            </g>
            
            <g>
              <line x1="300" y1="140" x2="420" y2="140" className="stroke-green-600 dark:stroke-green-400" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
              <line x1="420" y1="140" x2="300" y2="140" className="stroke-green-600 dark:stroke-green-400" strokeWidth="2" markerStart="url(#arrowGreen)"/>
              <text x="360" y="160" textAnchor="middle" className="fill-green-600 dark:fill-green-400 text-sm font-semibold">
                {t('visuals.absoluteValue.distance')} = 4
              </text>
            </g>
            
            <defs>
              <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" className="fill-blue-600 dark:fill-blue-400" />
              </marker>
              <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" className="fill-green-600 dark:fill-green-400" />
              </marker>
            </defs>
          </svg>
        </VisualExplanation>
      </section>

      {/* Comparing Integers */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.comparing.title')}</h2>
        <p className="mb-4">{t('sections.comparing.explanation')}</p>

        <KeyConcept>
          <p className="font-semibold mb-2">{t('keyConcepts.comparing.title')}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('keyConcepts.comparing.rule1')}</li>
            <li>{t('keyConcepts.comparing.rule2')}</li>
            <li>{t('keyConcepts.comparing.rule3')}</li>
          </ul>
        </KeyConcept>

        <VisualExplanation 
          title={t('visuals.comparing.title')}
          caption={t('visuals.comparing.caption')}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-around p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">-3</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('visuals.comparing.smaller')}</div>
              </div>
              <div className="text-4xl font-bold text-gray-400">&lt;</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">2</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('visuals.comparing.larger')}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-around p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">-8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('visuals.comparing.smaller')}</div>
              </div>
              <div className="text-4xl font-bold text-gray-400">&lt;</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">-5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('visuals.comparing.larger')}</div>
              </div>
            </div>
          </div>
        </VisualExplanation>
      </section>

      {/* Integer Operations */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.operations.title')}</h2>

        {/* Addition */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">{t('sections.operations.addition.title')}</h3>
          <KeyConcept>
            <p className="font-semibold mb-2">{t('sections.operations.addition.rulesTitle')}</p>
            <ul className="space-y-2">
              <li><strong>{t('sections.operations.addition.rule1Title')}:</strong> {t('sections.operations.addition.rule1')}</li>
              <li><strong>{t('sections.operations.addition.rule2Title')}:</strong> {t('sections.operations.addition.rule2')}</li>
            </ul>
          </KeyConcept>
        </div>

        {/* Multiplication */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">{t('sections.operations.multiplication.title')}</h3>
          <VisualExplanation 
            title={t('visuals.multiplication.title')}
            caption={t('visuals.multiplication.caption')}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full border-2 border-gray-300 dark:border-gray-600">
                <thead className="bg-blue-100 dark:bg-blue-900">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visuals.multiplication.header1')}</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visuals.multiplication.header2')}</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t('visuals.multiplication.header3')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <MathRenderer math="(+) \times (+)" />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <MathRenderer math="3 \times 4 = 12" />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-green-600 dark:text-green-400 font-semibold text-center">
                      {t('visuals.multiplication.positive')}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <MathRenderer math="(-) \times (-)" />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <MathRenderer math="(-3) \times (-4) = 12" />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-green-600 dark:text-green-400 font-semibold text-center">
                      {t('visuals.multiplication.positive')}
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <MathRenderer math="(+) \times (-)" />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <MathRenderer math="3 \times (-4) = -12" />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-red-600 dark:text-red-400 font-semibold text-center">
                      {t('visuals.multiplication.negative')}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <MathRenderer math="(-) \times (+)" />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <MathRenderer math="(-3) \times 4 = -12" />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-red-600 dark:text-red-400 font-semibold text-center">
                      {t('visuals.multiplication.negative')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VisualExplanation>
        </div>
      </section>

      {/* Rational Numbers */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.rational.title')}</h2>
        
        <Definition term={t('definition.rational.title')}>
          <p>{t.rich('definition.rational.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
            <p className="font-semibold mb-2">{t('definition.rational.examples')}</p>
            <div className="flex flex-wrap gap-4 text-lg">
              <MathRenderer math="\frac{1}{2}" />
              <MathRenderer math="\frac{-3}{4}" />
              <MathRenderer math="0.5" />
              <MathRenderer math="-2.75" />
              <MathRenderer math="5 = \frac{5}{1}" />
            </div>
          </div>
        </Definition>

        <KeyConcept>
          <p className="font-semibold mb-2">{t('keyConcepts.rational.title')}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('keyConcepts.rational.point1')}</li>
            <li>{t('keyConcepts.rational.point2')}</li>
            <li>{t('keyConcepts.rational.point3')}</li>
          </ul>
        </KeyConcept>
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
                { content: <p>{t('examples.example3.step3')}</p> }
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
            { id: 'b', text: t('exercises.exercise1.option2'), isCorrect: true },
            { id: 'c', text: t('exercises.exercise1.option3'), isCorrect: false },
            { id: 'd', text: t('exercises.exercise1.option4'), isCorrect: false }
          ]}
          explanation={t('exercises.exercise1.explanation')}
        />

        <NumericInputExercise
          question={t('exercises.exercise2.question')}
          correctAnswer={5}
          hint={t('exercises.exercise2.hint')}
          solution={<p>{t('exercises.exercise2.explanation')}</p>}
        />

        <NumericInputExercise
          question={t('exercises.exercise3.question')}
          correctAnswer={-2}
          hint={t('exercises.exercise3.hint')}
          solution={<p>{t('exercises.exercise3.explanation')}</p>}
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

        <NumericInputExercise
          question={t('exercises.exercise5.question')}
          correctAnswer={-15}
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
