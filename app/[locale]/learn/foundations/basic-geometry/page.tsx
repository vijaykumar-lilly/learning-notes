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

export default function BasicGeometryLesson() {
  const t = useTranslations('basic-geometry')
  const navigation = getLessonNavigation('foundations', 'basic-geometry')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* Introduction to Shapes */}
      <Definition term={t('definition.shape.title')}>
        <p>{t.rich('definition.shape.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.shape.exampleTitle')}</p>
          <ul className="space-y-1">
            <li>{t('definition.shape.example1')}</li>
            <li>{t('definition.shape.example2')}</li>
            <li>{t('definition.shape.example3')}</li>
            <li>{t('definition.shape.example4')}</li>
          </ul>
        </div>
      </Definition>

      <VisualExplanation
        title={t('visuals.basicShapes.title')}
        caption={t('visuals.basicShapes.caption')}
      >
        <svg viewBox="0 0 500 200" className="w-full max-w-2xl">
          {/* Circle */}
          <circle cx="60" cy="100" r="40" fill="#3b82f6" opacity="0.7" />
          <text x="60" y="160" textAnchor="middle" className="text-sm font-medium fill-gray-700 dark:fill-gray-300">
            {t('visuals.basicShapes.circle')}
          </text>
          
          {/* Square */}
          <rect x="135" y="60" width="80" height="80" fill="#10b981" opacity="0.7" />
          <text x="175" y="160" textAnchor="middle" className="text-sm font-medium fill-gray-700 dark:fill-gray-300">
            {t('visuals.basicShapes.square')}
          </text>
          
          {/* Triangle */}
          <path d="M 290 140 L 330 60 L 370 140 Z" fill="#f59e0b" opacity="0.7" />
          <text x="330" y="160" textAnchor="middle" className="text-sm font-medium fill-gray-700 dark:fill-gray-300">
            {t('visuals.basicShapes.triangle')}
          </text>
          
          {/* Rectangle */}
          <rect x="400" y="70" width="80" height="60" fill="#ec4899" opacity="0.7" />
          <text x="440" y="160" textAnchor="middle" className="text-sm font-medium fill-gray-700 dark:fill-gray-300">
            {t('visuals.basicShapes.rectangle')}
          </text>
        </svg>
      </VisualExplanation>

      <Note type="tip">
        <p>{t('notes.tip1')}</p>
      </Note>

      {/* Circles */}
      <Definition term={t('definition.circle.title')}>
        <p>{t.rich('definition.circle.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 space-y-3">
          <div>
            <p className="font-semibold">{t('definition.circle.centerTitle')}</p>
            <p>{t('definition.circle.centerDesc')}</p>
          </div>
          <div>
            <p className="font-semibold">{t('definition.circle.radiusTitle')}</p>
            <p>{t('definition.circle.radiusDesc')}</p>
          </div>
          <div>
            <p className="font-semibold">{t('definition.circle.diameterTitle')}</p>
            <p>{t('definition.circle.diameterDesc')}</p>
          </div>
        </div>
      </Definition>

      <VisualExplanation
        title={t('visuals.circleParts.title')}
        caption={t('visuals.circleParts.caption')}
      >
        <svg viewBox="0 0 300 250" className="w-full max-w-md">
          {/* Circle */}
          <circle cx="150" cy="125" r="80" fill="none" stroke="#3b82f6" strokeWidth="3" />
          
          {/* Center point */}
          <circle cx="150" cy="125" r="4" fill="#ef4444" />
          <text x="150" y="115" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
            {t('visuals.circleParts.center')}
          </text>
          
          {/* Radius */}
          <line x1="150" y1="125" x2="230" y2="125" stroke="#10b981" strokeWidth="2" />
          <text x="190" y="115" textAnchor="middle" className="text-xs font-semibold fill-green-600 dark:fill-green-400">
            {t('visuals.circleParts.radius')}
          </text>
          
          {/* Diameter */}
          <line x1="70" y1="125" x2="230" y2="125" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
          <text x="150" y="155" textAnchor="middle" className="text-xs font-semibold fill-orange-600 dark:fill-orange-400">
            {t('visuals.circleParts.diameter')}
          </text>
          
          {/* Labels */}
          <text x="150" y="235" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">
            {t('visuals.circleParts.relationship')}
          </text>
        </svg>
      </VisualExplanation>

      <Example
        title={t('examples.example1.title')}
        problem={<p>{t('examples.example1.question')}</p>}
        solution={
          <>
            <StepByStep steps={[
              { content: <p>{t('examples.example1.step1')}</p> },
              { content: <p>{t('examples.example1.step2')}</p> }
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

      {/* Rectangles and Squares */}
      <Definition term={t('definition.rectangle.title')}>
        <p>{t.rich('definition.rectangle.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.rectangle.properties')}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('definition.rectangle.property1')}</li>
            <li>{t('definition.rectangle.property2')}</li>
            <li>{t('definition.rectangle.property3')}</li>
          </ul>
        </div>
      </Definition>

      <Definition term={t('definition.square.title')}>
        <p>{t.rich('definition.square.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <p className="mt-2">{t('definition.square.special')}</p>
      </Definition>

      <VisualExplanation
        title={t('visuals.rectangleSquare.title')}
        caption={t('visuals.rectangleSquare.caption')}
      >
        <svg viewBox="0 0 400 200" className="w-full max-w-lg">
          {/* Rectangle */}
          <rect x="40" y="50" width="120" height="80" fill="#ec4899" opacity="0.3" stroke="#ec4899" strokeWidth="2" />
          <text x="100" y="35" textAnchor="middle" className="text-sm font-semibold fill-gray-700 dark:fill-gray-300">
            {t('visuals.rectangleSquare.rectangleLabel')}
          </text>
          <text x="100" y="160" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">
            {t('visuals.rectangleSquare.rectangleDim')}
          </text>
          
          {/* Square */}
          <rect x="240" y="50" width="80" height="80" fill="#10b981" opacity="0.3" stroke="#10b981" strokeWidth="2" />
          <text x="280" y="35" textAnchor="middle" className="text-sm font-semibold fill-gray-700 dark:fill-gray-300">
            {t('visuals.rectangleSquare.squareLabel')}
          </text>
          <text x="280" y="160" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">
            {t('visuals.rectangleSquare.squareDim')}
          </text>
        </svg>
      </VisualExplanation>

      <KeyConcept title={t('keyConcepts.squareVsRectangle.title')}>
        <p>{t('keyConcepts.squareVsRectangle.explanation')}</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>{t('keyConcepts.squareVsRectangle.point1')}</li>
          <li>{t('keyConcepts.squareVsRectangle.point2')}</li>
        </ul>
      </KeyConcept>

      <NumericInputExercise
        question={t('exercises.exercise2.question')}
        correctAnswer={4}
        hint={t('exercises.exercise2.hint')}
        solution={<p>{t('exercises.exercise2.explanation')}</p>}
      />

      <Note type="tip">
        <p>{t('notes.trick1')}</p>
      </Note>

      {/* Triangles */}
      <Definition term={t('definition.triangle.title')}>
        <p>{t.rich('definition.triangle.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.triangle.typesTitle')}</p>
          <ul className="space-y-2">
            <li>
              <span className="font-semibold">{t('definition.triangle.equilateral')}</span> - {t('definition.triangle.equilateralDesc')}
            </li>
            <li>
              <span className="font-semibold">{t('definition.triangle.isosceles')}</span> - {t('definition.triangle.isoscelesDesc')}
            </li>
            <li>
              <span className="font-semibold">{t('definition.triangle.scalene')}</span> - {t('definition.triangle.scaleneDesc')}
            </li>
          </ul>
        </div>
      </Definition>

      <VisualExplanation
        title={t('visuals.triangleTypes.title')}
        caption={t('visuals.triangleTypes.caption')}
      >
        <svg viewBox="0 0 500 180" className="w-full max-w-2xl">
          {/* Equilateral */}
          <path d="M 60 150 L 100 70 L 140 150 Z" fill="#3b82f6" opacity="0.6" stroke="#3b82f6" strokeWidth="2" />
          <text x="100" y="40" textAnchor="middle" className="text-xs font-semibold fill-gray-700 dark:fill-gray-300">
            {t('visuals.triangleTypes.equilateral')}
          </text>
          <text x="100" y="170" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">
            {t('visuals.triangleTypes.allEqual')}
          </text>
          
          {/* Isosceles */}
          <path d="M 220 150 L 260 60 L 300 150 Z" fill="#10b981" opacity="0.6" stroke="#10b981" strokeWidth="2" />
          <text x="260" y="40" textAnchor="middle" className="text-xs font-semibold fill-gray-700 dark:fill-gray-300">
            {t('visuals.triangleTypes.isosceles')}
          </text>
          <text x="260" y="170" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">
            {t('visuals.triangleTypes.twoEqual')}
          </text>
          
          {/* Scalene */}
          <path d="M 360 150 L 400 80 L 460 150 Z" fill="#f59e0b" opacity="0.6" stroke="#f59e0b" strokeWidth="2" />
          <text x="410" y="40" textAnchor="middle" className="text-xs font-semibold fill-gray-700 dark:fill-gray-300">
            {t('visuals.triangleTypes.scalene')}
          </text>
          <text x="410" y="170" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">
            {t('visuals.triangleTypes.allDifferent')}
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

      <MultipleChoiceExercise
        question={t('exercises.exercise3.question')}
        choices={[
          { id: 'a', text: t('exercises.exercise3.option1'), isCorrect: false },
          { id: 'b', text: t('exercises.exercise3.option2'), isCorrect: true },
          { id: 'c', text: t('exercises.exercise3.option3'), isCorrect: false },
          { id: 'd', text: t('exercises.exercise3.option4'), isCorrect: false }
        ]}
        explanation={t('exercises.exercise3.explanation')}
      />

      <Note type="warning">
        <p>{t('notes.warning1')}</p>
      </Note>

      {/* Lines and Angles */}
      <Definition term={t('definition.line.title')}>
        <p>{t.rich('definition.line.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 space-y-3">
          <div>
            <p className="font-semibold">{t('definition.line.pointTitle')}</p>
            <p>{t('definition.line.pointDesc')}</p>
          </div>
          <div>
            <p className="font-semibold">{t('definition.line.lineSegmentTitle')}</p>
            <p>{t('definition.line.lineSegmentDesc')}</p>
          </div>
          <div>
            <p className="font-semibold">{t('definition.line.rayTitle')}</p>
            <p>{t('definition.line.rayDesc')}</p>
          </div>
        </div>
      </Definition>

      <VisualExplanation
        title={t('visuals.lineTypes.title')}
        caption={t('visuals.lineTypes.caption')}
      >
        <svg viewBox="0 0 400 250" className="w-full max-w-lg">
          {/* Point */}
          <circle cx="60" cy="50" r="4" fill="#ef4444" />
          <text x="60" y="75" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
            {t('visuals.lineTypes.point')}
          </text>
          
          {/* Line Segment */}
          <line x1="40" y1="120" x2="180" y2="120" stroke="#3b82f6" strokeWidth="3" />
          <circle cx="40" cy="120" r="3" fill="#3b82f6" />
          <circle cx="180" cy="120" r="3" fill="#3b82f6" />
          <text x="110" y="145" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
            {t('visuals.lineTypes.segment')}
          </text>
          
          {/* Ray */}
          <line x1="240" y1="120" x2="380" y2="120" stroke="#10b981" strokeWidth="3" />
          <circle cx="240" cy="120" r="3" fill="#10b981" />
          <path d="M 375 115 L 385 120 L 375 125" fill="#10b981" />
          <text x="310" y="145" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
            {t('visuals.lineTypes.ray')}
          </text>
          
          {/* Line */}
          <line x1="20" y1="200" x2="380" y2="200" stroke="#f59e0b" strokeWidth="3" />
          <path d="M 25 195 L 15 200 L 25 205" fill="#f59e0b" />
          <path d="M 375 195 L 385 200 L 375 205" fill="#f59e0b" />
          <text x="200" y="225" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
            {t('visuals.lineTypes.line')}
          </text>
        </svg>
      </VisualExplanation>

      <Definition term={t('definition.angle.title')}>
        <p>{t.rich('definition.angle.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.angle.typesTitle')}</p>
          <ul className="space-y-1">
            <li>{t.rich('definition.angle.right', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li>{t.rich('definition.angle.acute', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li>{t.rich('definition.angle.obtuse', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li>{t.rich('definition.angle.straight', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          </ul>
        </div>
      </Definition>

      <VisualExplanation
        title={t('visuals.angleTypes.title')}
        caption={t('visuals.angleTypes.caption')}
      >
        <svg viewBox="0 0 500 200" className="w-full max-w-2xl">
          {/* Right Angle (90°) */}
          <g transform="translate(60, 100)">
            <line x1="0" y1="0" x2="50" y2="0" stroke="#3b82f6" strokeWidth="2" />
            <line x1="0" y1="0" x2="0" y2="-50" stroke="#3b82f6" strokeWidth="2" />
            <rect x="0" y="-10" width="10" height="10" fill="none" stroke="#3b82f6" strokeWidth="1" />
            <text x="25" y="25" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
              {t('visuals.angleTypes.right')}
            </text>
          </g>
          
          {/* Acute Angle (45°) */}
          <g transform="translate(180, 100)">
            <line x1="0" y1="0" x2="50" y2="0" stroke="#10b981" strokeWidth="2" />
            <line x1="0" y1="0" x2="35" y2="-35" stroke="#10b981" strokeWidth="2" />
            <path d="M 15 0 A 15 15 0 0 1 10.6 -10.6" fill="none" stroke="#10b981" strokeWidth="1" />
            <text x="25" y="25" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
              {t('visuals.angleTypes.acute')}
            </text>
          </g>
          
          {/* Obtuse Angle (120°) */}
          <g transform="translate(300, 100)">
            <line x1="0" y1="0" x2="50" y2="0" stroke="#f59e0b" strokeWidth="2" />
            <line x1="0" y1="0" x2="-25" y2="-43" stroke="#f59e0b" strokeWidth="2" />
            <path d="M 15 0 A 15 15 0 0 1 -7.5 -13" fill="none" stroke="#f59e0b" strokeWidth="1" />
            <text x="25" y="25" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
              {t('visuals.angleTypes.obtuse')}
            </text>
          </g>
          
          {/* Straight Angle (180°) */}
          <g transform="translate(420, 100)">
            <line x1="-40" y1="0" x2="40" y2="0" stroke="#ec4899" strokeWidth="2" />
            <text x="0" y="25" textAnchor="middle" className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
              {t('visuals.angleTypes.straight')}
            </text>
          </g>
        </svg>
      </VisualExplanation>

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
              <p>{t('examples.example3.answer')}</p>
            </div>
          </>
        }
      />

      <NumericInputExercise
        question={t('exercises.exercise4.question')}
        correctAnswer={90}
        hint={t('exercises.exercise4.hint')}
        solution={<p>{t('exercises.exercise4.explanation')}</p>}
      />

      <MultipleChoiceExercise
        question={t('exercises.exercise5.question')}
        choices={[
          { id: 'a', text: t('exercises.exercise5.option1'), isCorrect: false },
          { id: 'b', text: t('exercises.exercise5.option2'), isCorrect: false },
          { id: 'c', text: t('exercises.exercise5.option3'), isCorrect: true },
          { id: 'd', text: t('exercises.exercise5.option4'), isCorrect: false }
        ]}
        explanation={t('exercises.exercise5.explanation')}
      />

      <Note type="tip">
        <p>{t('notes.tip2')}</p>
      </Note>

      {/* Conclusion */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700">
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
