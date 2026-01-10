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

export default function DataGraphsLesson() {
  const t = useTranslations('data-graphs')
  const navigation = getLessonNavigation('foundations', 'data-graphs')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* Introduction */}
      <Definition term={t('definition.data.title')}>
        <p>{t.rich('definition.data.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <div className="mt-4">
          <p className="font-semibold mb-2">{t('definition.data.examplesTitle')}</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>{t('definition.data.example1')}</li>
            <li>{t('definition.data.example2')}</li>
            <li>{t('definition.data.example3')}</li>
            <li>{t('definition.data.example4')}</li>
          </ul>
        </div>
      </Definition>

      <Definition term={t('definition.graphs.title')}>
        <p>{t.rich('definition.graphs.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <p className="mt-2">{t('definition.graphs.purpose')}</p>
      </Definition>

      {/* Bar Graphs */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('definition.barGraphs.title')}</h2>
        <p className="mb-4">{t('definition.barGraphs.explanation')}</p>

        <VisualExplanation 
          title={t('visuals.barGraph.title')}
          caption={t('visuals.barGraph.caption')}
        >
          <svg viewBox="0 0 500 300" className="w-full h-auto">
            {/* Title */}
            <text x="250" y="20" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold text-sm">
              {t('visuals.barGraph.chartTitle')}
            </text>
            
            {/* Y-axis */}
            <line x1="50" y1="50" x2="50" y2="250" className="stroke-gray-600 dark:stroke-gray-400" strokeWidth="2"/>
            {/* X-axis */}
            <line x1="50" y1="250" x2="450" y2="250" className="stroke-gray-600 dark:stroke-gray-400" strokeWidth="2"/>
            
            {/* Y-axis labels */}
            {[0, 2, 4, 6, 8].map((num, i) => (
              <g key={num}>
                <text x="35" y={250 - (i * 50) + 5} textAnchor="end" className="fill-gray-700 dark:fill-gray-300 text-xs">
                  {num}
                </text>
                <line x1="45" y1={250 - (i * 50)} x2="50" y2={250 - (i * 50)} className="stroke-gray-400" strokeWidth="1"/>
              </g>
            ))}
            
            {/* Bars */}
            <rect x="80" y="100" width="60" height="150" className="fill-blue-500" />
            <rect x="170" y="150" width="60" height="100" className="fill-green-500" />
            <rect x="260" y="50" width="60" height="200" className="fill-red-500" />
            <rect x="350" y="125" width="60" height="125" className="fill-yellow-500" />
            
            {/* X-axis labels */}
            <text x="110" y="270" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-xs">
              {t('visuals.barGraph.label1')}
            </text>
            <text x="200" y="270" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-xs">
              {t('visuals.barGraph.label2')}
            </text>
            <text x="290" y="270" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-xs">
              {t('visuals.barGraph.label3')}
            </text>
            <text x="380" y="270" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-xs">
              {t('visuals.barGraph.label4')}
            </text>
            
            {/* Axis titles */}
            <text x="250" y="295" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-xs font-semibold">
              {t('visuals.barGraph.xlabel')}
            </text>
            <text x="15" y="150" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-xs font-semibold" transform="rotate(-90, 15, 150)">
              {t('visuals.barGraph.ylabel')}
            </text>
          </svg>
        </VisualExplanation>

        <KeyConcept>
          <p className="font-semibold mb-2">{t('keyConcepts.readingBarGraphs.title')}</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>{t('keyConcepts.readingBarGraphs.step1')}</li>
            <li>{t('keyConcepts.readingBarGraphs.step2')}</li>
            <li>{t('keyConcepts.readingBarGraphs.step3')}</li>
            <li>{t('keyConcepts.readingBarGraphs.step4')}</li>
          </ol>
        </KeyConcept>
      </section>

      {/* Pictographs */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('definition.pictographs.title')}</h2>
        <p className="mb-4">{t('definition.pictographs.explanation')}</p>

        <VisualExplanation 
          title={t('visuals.pictograph.title')}
          caption={t('visuals.pictograph.caption')}
        >
          <svg viewBox="0 0 500 280" className="w-full h-auto">
            {/* Title */}
            <text x="250" y="20" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold text-sm">
              {t('visuals.pictograph.chartTitle')}
            </text>
            
            {/* Apples - 6 symbols */}
            <text x="20" y="65" className="fill-gray-700 dark:fill-gray-300 text-sm font-semibold">
              {t('visuals.pictograph.row1')}
            </text>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <circle key={`apple-${i}`} cx={150 + i * 45} cy={60} r="15" className="fill-red-500" />
            ))}
            
            {/* Bananas - 4 symbols */}
            <text x="20" y="125" className="fill-gray-700 dark:fill-gray-300 text-sm font-semibold">
              {t('visuals.pictograph.row2')}
            </text>
            {[0, 1, 2, 3].map((i) => (
              <ellipse key={`banana-${i}`} cx={150 + i * 45} cy={120} rx="18" ry="8" className="fill-yellow-400" />
            ))}
            
            {/* Oranges - 5 symbols */}
            <text x="20" y="185" className="fill-gray-700 dark:fill-gray-300 text-sm font-semibold">
              {t('visuals.pictograph.row3')}
            </text>
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={`orange-${i}`} cx={150 + i * 45} cy={180} r="15" className="fill-orange-500" />
            ))}
            
            {/* Grapes - 3 symbols */}
            <text x="20" y="245" className="fill-gray-700 dark:fill-gray-300 text-sm font-semibold">
              {t('visuals.pictograph.row4')}
            </text>
            {[0, 1, 2].map((i) => (
              <g key={`grape-${i}`}>
                <circle cx={150 + i * 45 - 5} cy={240} r="6" className="fill-purple-500" />
                <circle cx={150 + i * 45 + 5} cy={240} r="6" className="fill-purple-500" />
                <circle cx={150 + i * 45} cy={232} r="6" className="fill-purple-500" />
              </g>
            ))}
            
            {/* Key */}
            <rect x="20" y="260" width="460" height="1" className="fill-gray-300" />
            <text x="20" y="275" className="fill-gray-600 dark:fill-gray-400 text-xs font-semibold">
              {t('visuals.pictograph.key')}
            </text>
          </svg>
        </VisualExplanation>

        <KeyConcept>
          <p className="font-semibold mb-2">{t('keyConcepts.readingPictographs.title')}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('keyConcepts.readingPictographs.step1')}</li>
            <li>{t('keyConcepts.readingPictographs.step2')}</li>
            <li>{t('keyConcepts.readingPictographs.step3')}</li>
          </ul>
        </KeyConcept>
      </section>

      {/* Line Plots */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('definition.linePlots.title')}</h2>
        <p className="mb-4">{t('definition.linePlots.explanation')}</p>

        <VisualExplanation 
          title={t('visuals.linePlot.title')}
          caption={t('visuals.linePlot.caption')}
        >
          <svg viewBox="0 0 500 180" className="w-full h-auto">
            {/* Title */}
            <text x="250" y="20" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold text-sm">
              {t('visuals.linePlot.chartTitle')}
            </text>
            
            {/* Number line */}
            <line x1="50" y1="100" x2="450" y2="100" className="stroke-gray-600 dark:stroke-gray-400" strokeWidth="2"/>
            
            {/* Number labels */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <g key={num}>
                <line x1={50 + num * 50} y1="95" x2={50 + num * 50} y2="105" className="stroke-gray-600 dark:stroke-gray-400" strokeWidth="2"/>
                <text x={50 + num * 50} y="125" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-sm">
                  {num}
                </text>
              </g>
            ))}
            
            {/* X marks for data */}
            {/* 2 appears 3 times */}
            {[0, 1, 2].map((i) => (
              <text key={`x2-${i}`} x="150" y={75 - i * 15} textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 font-bold text-lg">
                ×
              </text>
            ))}
            
            {/* 3 appears 1 time */}
            <text x="200" y="75" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 font-bold text-lg">
              ×
            </text>
            
            {/* 4 appears 4 times */}
            {[0, 1, 2, 3].map((i) => (
              <text key={`x4-${i}`} x="250" y={75 - i * 15} textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 font-bold text-lg">
                ×
              </text>
            ))}
            
            {/* 5 appears 2 times */}
            {[0, 1].map((i) => (
              <text key={`x5-${i}`} x="300" y={75 - i * 15} textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 font-bold text-lg">
                ×
              </text>
            ))}
            
            {/* 6 appears 1 time */}
            <text x="350" y="75" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 font-bold text-lg">
              ×
            </text>
            
            {/* Axis label */}
            <text x="250" y="150" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-xs font-semibold">
              {t('visuals.linePlot.xlabel')}
            </text>
          </svg>
        </VisualExplanation>
      </section>

      {/* Data Tables */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('definition.tables.title')}</h2>
        <p className="mb-4">{t('definition.tables.explanation')}</p>

        <VisualExplanation 
          title={t('visuals.dataTable.title')}
          caption={t('visuals.dataTable.caption')}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full border-2 border-gray-300 dark:border-gray-600">
              <thead className="bg-blue-100 dark:bg-blue-900">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                    {t('visuals.dataTable.header1')}
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                    {t('visuals.dataTable.header2')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                    {t('visuals.dataTable.row1col1')}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                    {t('visuals.dataTable.row1col2')}
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                    {t('visuals.dataTable.row2col1')}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                    {t('visuals.dataTable.row2col2')}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                    {t('visuals.dataTable.row3col1')}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                    {t('visuals.dataTable.row3col2')}
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                    {t('visuals.dataTable.row4col1')}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                    {t('visuals.dataTable.row4col2')}
                  </td>
                </tr>
              </tbody>
            </table>
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
                { content: <p>{t('examples.example1.step3')}</p> },
                { content: <p>{t('examples.example1.step4')}</p> }
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

      {/* Practice Exercises */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">✏️ {t('exercises.title')}</h2>

        <MultipleChoiceExercise
          question={t('exercises.exercise1.question')}
          choices={[
            { id: 'a', text: t('exercises.exercise1.option1'), isCorrect: false },
            { id: 'b', text: t('exercises.exercise1.option2'), isCorrect: false },
            { id: 'c', text: t('exercises.exercise1.option3'), isCorrect: true },
            { id: 'd', text: t('exercises.exercise1.option4'), isCorrect: false }
          ]}
          explanation={t('exercises.exercise1.explanation')}
        />

        <NumericInputExercise
          question={t('exercises.exercise2.question')}
          correctAnswer={10}
          hint={t('exercises.exercise2.hint')}
          solution={<p>{t('exercises.exercise2.explanation')}</p>}
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

        <NumericInputExercise
          question={t('exercises.exercise4.question')}
          correctAnswer={3}
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
      <section className="my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
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
