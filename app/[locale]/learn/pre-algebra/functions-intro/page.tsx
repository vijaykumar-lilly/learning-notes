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

export default function FunctionsIntroLesson() {
  const t = useTranslations('functions-intro')
  const navigation = getLessonNavigation('pre-algebra', 'functions-intro')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* NEW: Before You Start */}
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

      {/* Introduction - ENHANCED LANGUAGE */}
      <Definition term={t('definition.function.title')}>
        <p>{t.rich('definition.function.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <p className="mt-2">{t('definition.function.discovery')}</p>
        <div className="mt-4">
          <p className="font-semibold mb-2">{t('definition.function.keyIdea')}</p>
          <p>{t('definition.function.keyRule')}</p>
        </div>
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.function.realWorldTitle')}</p>
          <ul className="space-y-2">
            <li>{t('definition.function.example1')}</li>
            <li>{t('definition.function.example2')}</li>
            <li>{t('definition.function.example3')}</li>
            <li>{t('definition.function.example4')}</li>
          </ul>
        </div>
      </Definition>

      {/* Function Machine Visual - ENHANCED WITH ZOOM */}
      <VisualExplanation 
        title={t('visuals.functionMachine.title')}
        caption={t('visuals.functionMachine.caption')}
        zoomable={true}
      >
        <svg viewBox="0 0 600 300" className="w-full h-auto">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" className="fill-blue-500" />
            </marker>
          </defs>
          
          <circle cx="80" cy="150" r="30" className="fill-blue-400 stroke-blue-600" strokeWidth="3"/>
          <text x="80" y="155" textAnchor="middle" className="fill-white font-bold text-lg">x</text>
          <text x="80" y="210" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-sm font-semibold">
            {t('visuals.functionMachine.input')}
          </text>
          
          <line x1="110" y1="150" x2="180" y2="150" className="stroke-blue-500" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          
          <rect x="200" y="80" width="200" height="140" rx="10" className="fill-purple-100 dark:fill-purple-900/40 stroke-purple-600" strokeWidth="3"/>
          <text x="300" y="115" textAnchor="middle" className="fill-purple-900 dark:fill-purple-200 font-bold text-xl">
            {t('visuals.functionMachine.machine')}
          </text>
          <text x="300" y="145" textAnchor="middle" className="fill-purple-800 dark:fill-purple-300 font-bold text-2xl">
            f(x) = 2x + 1
          </text>
          <text x="300" y="175" textAnchor="middle" className="fill-purple-700 dark:fill-purple-400 text-sm italic">
            {t('visuals.functionMachine.rule')}
          </text>
          <text x="300" y="200" textAnchor="middle" className="fill-purple-700 dark:fill-purple-400 text-sm italic">
            {t('visuals.functionMachine.ruleDetail')}
          </text>
          
          <line x1="400" y1="150" x2="470" y2="150" className="stroke-green-500" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          
          <circle cx="520" cy="150" r="30" className="fill-green-400 stroke-green-600" strokeWidth="3"/>
          <text x="520" y="158" textAnchor="middle" className="fill-white font-bold text-lg">2x+1</text>
          <text x="520" y="210" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-sm font-semibold">
            {t('visuals.functionMachine.output')}
          </text>
          
          <text x="80" y="250" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 text-xs">
            {t('visuals.functionMachine.exampleInput')}
          </text>
          <text x="520" y="250" textAnchor="middle" className="fill-green-600 dark:fill-green-400 text-xs">
            {t('visuals.functionMachine.exampleOutput')}
          </text>
        </svg>
      </VisualExplanation>

      <Note type="tip">{t('notes.inputOutput.content')}</Note>

      {/* Function Notation */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('definition.notation.title')}</h2>
        <p className="mb-4">{t('definition.notation.explanation')}</p>
        
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
          <div className="text-center mb-4">
            <MathRenderer math="f(x) = 2x + 3" block />
          </div>
          <ul className="space-y-2 text-sm">
            <li>{t.rich('definition.notation.part1', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li>{t.rich('definition.notation.part2', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
            <li>{t.rich('definition.notation.part3', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
          </ul>
          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded">
            <p className="font-semibold text-sm mb-2">{t('definition.notation.examples')}</p>
            <ul className="space-y-1 text-sm">
              <li><MathRenderer math="f(5)" /> {t('definition.notation.example1')}</li>
              <li><MathRenderer math="g(x)" /> {t('definition.notation.example2')}</li>
              <li><MathRenderer math="h(3)" /> {t('definition.notation.example3')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Example 1: Evaluating a function */}
      <Example
        title={t('examples.evaluate.title')}
        problem={<p>{t('examples.evaluate.problem')}</p>}
        solution={
          <>
            <StepByStep steps={[
              { content: <p>{t('examples.evaluate.step1')}: <MathRenderer math="f(x) = 3x - 5" /></p> },
              { content: <p>{t('examples.evaluate.step2')}: <MathRenderer math="f(4) = 3(4) - 5" /></p> },
              { content: <p>{t('examples.evaluate.step3')}: <MathRenderer math="f(4) = 12 - 5 = 7" /></p> }
            ]} />
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="font-semibold">{t('examples.evaluate.answerLabel')}</p>
              <MathRenderer math="f(4) = 7" />
            </div>
          </>
        }
      />

      {/* NEW: Common Mistakes Section */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">⚠️ {t('commonMistakes.title')}</h2>
        
        <CommonMistake
          title={t('commonMistakes.mistake1.title')}
          wrongApproach={<p>{t('commonMistakes.mistake1.wrong')}</p>}
          wrongMath="f(x) = 2x + 3, \\text{ so } f(5) = 2x + 3"
          correctApproach={<p>{t('commonMistakes.mistake1.correct')}</p>}
          correctMath="f(5) = 2(5) + 3 = 13"
          explanation={<p>{t('commonMistakes.mistake1.explanation')}</p>}
          tip={<p>{t('commonMistakes.mistake1.tip')}</p>}
        />

        <CommonMistake
          title={t('commonMistakes.mistake2.title')}
          wrongApproach={<p>{t('commonMistakes.mistake2.wrong')}</p>}
          wrongMath="\\text{Domain: all outputs, Range: all inputs}"
          correctApproach={<p>{t('commonMistakes.mistake2.correct')}</p>}
          correctMath="\\text{Domain: all inputs (x), Range: all outputs (y)}"
          explanation={<p>{t('commonMistakes.mistake2.explanation')}</p>}
        />

        <CommonMistake
          title={t('commonMistakes.mistake3.title')}
          wrongApproach={<p>{t('commonMistakes.mistake3.wrong')}</p>}
          correctApproach={<p>{t('commonMistakes.mistake3.correct')}</p>}
          explanation={<p>{t('commonMistakes.mistake3.explanation')}</p>}
          tip={<p>{t('commonMistakes.mistake3.tip')}</p>}
        />
      </section>

      {/* Domain and Range */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('definition.domainRange.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-400">{t('definition.domainRange.domainTitle')}</h4>
            <p className="text-sm mb-2">{t('definition.domainRange.domain')}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('definition.domainRange.domainExample')}</p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 text-green-700 dark:text-green-400">{t('definition.domainRange.rangeTitle')}</h4>
            <p className="text-sm mb-2">{t('definition.domainRange.range')}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('definition.domainRange.rangeExample')}</p>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="font-semibold">{t('definition.domainRange.analogy')}</p>
          <p className="mt-2 text-sm">{t('definition.domainRange.analogyContent')}</p>
        </div>
      </section>

      {/* Mapping Diagram Visual - ENHANCED WITH ZOOM */}
      <VisualExplanation 
        title={t('visuals.mapping.title')}
        caption={t('visuals.mapping.caption')}
        zoomable={true}
      >
        <svg viewBox="0 0 500 320" className="w-full h-auto">
          <text x="250" y="25" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold text-lg">
            {t('visuals.mapping.heading')}
          </text>
          
          <rect x="50" y="50" width="150" height="240" rx="5" className="fill-blue-50 dark:fill-blue-900/20 stroke-blue-500" strokeWidth="2"/>
          <text x="125" y="75" textAnchor="middle" className="fill-blue-700 dark:fill-blue-300 font-bold">
            {t('visuals.mapping.domainLabel')}
          </text>
          
          <circle cx="125" cy="110" r="15" className="fill-blue-300 stroke-blue-600" strokeWidth="2"/>
          <text x="125" y="115" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold">1</text>
          
          <circle cx="125" cy="160" r="15" className="fill-blue-300 stroke-blue-600" strokeWidth="2"/>
          <text x="125" y="165" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold">2</text>
          
          <circle cx="125" cy="210" r="15" className="fill-blue-300 stroke-blue-600" strokeWidth="2"/>
          <text x="125" y="215" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold">3</text>
          
          <circle cx="125" cy="260" r="15" className="fill-blue-300 stroke-blue-600" strokeWidth="2"/>
          <text x="125" y="265" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold">4</text>
          
          <rect x="300" y="50" width="150" height="240" rx="5" className="fill-green-50 dark:fill-green-900/20 stroke-green-500" strokeWidth="2"/>
          <text x="375" y="75" textAnchor="middle" className="fill-green-700 dark:fill-green-300 font-bold">
            {t('visuals.mapping.rangeLabel')}
          </text>
          
          <circle cx="375" cy="110" r="15" className="fill-green-300 stroke-green-600" strokeWidth="2"/>
          <text x="375" y="115" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold">3</text>
          
          <circle cx="375" cy="160" r="15" className="fill-green-300 stroke-green-600" strokeWidth="2"/>
          <text x="375" y="165" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold">5</text>
          
          <circle cx="375" cy="210" r="15" className="fill-green-300 stroke-green-600" strokeWidth="2"/>
          <text x="375" y="215" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold">7</text>
          
          <circle cx="375" cy="260" r="15" className="fill-green-300 stroke-green-600" strokeWidth="2"/>
          <text x="375" y="265" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold">9</text>
          
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" className="fill-purple-500" />
            </marker>
          </defs>
          <line x1="140" y1="110" x2="360" y2="110" className="stroke-purple-500" strokeWidth="2" markerEnd="url(#arrow)"/>
          <line x1="140" y1="160" x2="360" y2="160" className="stroke-purple-500" strokeWidth="2" markerEnd="url(#arrow)"/>
          <line x1="140" y1="210" x2="360" y2="210" className="stroke-purple-500" strokeWidth="2" markerEnd="url(#arrow)"/>
          <line x1="140" y1="260" x2="360" y2="260" className="stroke-purple-500" strokeWidth="2" markerEnd="url(#arrow)"/>
          
          <text x="250" y="305" textAnchor="middle" className="fill-purple-700 dark:fill-purple-300 font-bold text-sm">
            f(x) = 2x + 1
          </text>
        </svg>
      </VisualExplanation>

      <KeyConcept>
        <p className="font-semibold mb-2">{t('keyConcept.oneToOne.title')}</p>
        <p>{t('keyConcept.oneToOne.content')}</p>
      </KeyConcept>

      {/* Representations of Functions */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('definition.representations.title')}</h2>
        <p className="mb-4">{t('definition.representations.intro')}</p>

        {/* Table Representation */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">{t('definition.representations.table.title')}</h3>
          <p className="mb-3 text-sm">{t('definition.representations.table.description')}</p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border-2 border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-blue-100 dark:bg-blue-900/30">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t('definition.representations.table.headerX')}</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t('definition.representations.table.headerY')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">0</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">1</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/30">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">1</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">3</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">2</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">5</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/30">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">3</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">7</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">{t('definition.representations.table.pattern')}</p>
        </div>

        {/* Graph Representation - ENHANCED WITH ZOOM */}
        <VisualExplanation 
          title={t('visuals.graph.title')}
          caption={t('visuals.graph.caption')}
          zoomable={true}
        >
          <svg viewBox="0 0 500 400" className="w-full h-auto">
            <text x="250" y="25" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold text-base">
              {t('visuals.graph.heading')}
            </text>
            
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <g key={`grid-${i}`}>
                <line x1="80" y1={50 + i * 40} x2="450" y2={50 + i * 40} className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="0.5"/>
                <line x1={80 + i * 40} y1="50" x2={80 + i * 40} y2="370" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="0.5"/>
              </g>
            ))}
            
            <line x1="80" y1="370" x2="450" y2="370" className="stroke-gray-600 dark:stroke-gray-400" strokeWidth="2"/>
            <line x1="80" y1="50" x2="80" y2="370" className="stroke-gray-600 dark:stroke-gray-400" strokeWidth="2"/>
            
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <text key={`x-${num}`} x={80 + num * 40} y="390" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-xs">
                {num}
              </text>
            ))}
            
            {[0, 2, 4, 6, 8, 10, 12, 14, 16].map((num, i) => (
              <text key={`y-${num}`} x="65" y={370 - i * 40 + 5} textAnchor="end" className="fill-gray-700 dark:fill-gray-300 text-xs">
                {num}
              </text>
            ))}
            
            <line x1="80" y1="350" x2="360" y2="70" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="3"/>
            
            {[[0, 1], [1, 3], [2, 5], [3, 7]].map(([x, y], i) => (
              <circle key={`point-${i}`} cx={80 + x * 40} cy={370 - (y / 16) * 320} r="5" className="fill-red-500 stroke-red-700" strokeWidth="2"/>
            ))}
            
            <text x="450" y="390" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 font-semibold">x</text>
            <text x="60" y="40" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 font-semibold">y</text>
            
            <text x="300" y="100" className="fill-blue-600 dark:fill-blue-400 font-bold text-sm">
              f(x) = 2x + 1
            </text>
          </svg>
        </VisualExplanation>

        {/* Equation Representation */}
        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">{t('definition.representations.equation.title')}</h3>
          <p className="mb-3 text-sm">{t('definition.representations.equation.description')}</p>
          <div className="text-center space-y-2">
            <div className="text-2xl"><MathRenderer math="y = 2x + 1" /></div>
            <div className="text-2xl"><MathRenderer math="f(x) = 2x + 1" /></div>
          </div>
        </div>
      </section>

      {/* More Examples */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">📝 {t('examples.title')}</h2>

        <Example
          title={t('examples.domainRange.title')}
          problem={<p>{t('examples.domainRange.problem')}</p>}
          solution={
            <>
              <p className="mb-2">{t('examples.domainRange.solution1')}</p>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="font-semibold">{t('examples.domainRange.domain')}</p>
              </div>
              <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <p className="font-semibold">{t('examples.domainRange.range')}</p>
              </div>
            </>
          }
        />

        <Example
          title={t('examples.writeRule.title')}
          problem={<p>{t('examples.writeRule.problem')}</p>}
          solution={
            <>
              <StepByStep steps={[
                { content: <p>{t('examples.writeRule.step1')}: {t('examples.writeRule.step1Content')}</p> },
                { content: <p>{t('examples.writeRule.step2')}: {t('examples.writeRule.step2Content')}</p> },
                { content: <p>{t('examples.writeRule.step3')}: <MathRenderer math="f(x) = 4x" /></p> }
              ]} />
            </>
          }
        />
      </section>

      {/* NEW: Practice Exercises with Difficulty Levels */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">✏️ {t('exercises.title')}</h2>

        {/* Warm-up Problems */}
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <span className="text-2xl">🌤️</span>
          {t('exercises.warmup.title')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('exercises.warmup.description')}</p>

        <MultipleChoiceExercise
          difficulty="easy"
          question={t('exercises.exercise1.question')}
          choices={[
            { id: 'a', text: '7', isCorrect: false },
            { id: 'b', text: '11', isCorrect: false },
            { id: 'c', text: '13', isCorrect: true },
            { id: 'd', text: '15', isCorrect: false }
          ]}
          explanation={t('exercises.exercise1.explanation')}
        />

        <NumericInputExercise
          difficulty="easy"
          question={t('exercises.exercise2.question')}
          correctAnswer={9}
          hint={t('exercises.exercise2.hint')}
          solution={<p>{t('exercises.exercise2.explanation')}</p>}
        />

        {/* Practice Problems */}
        <h3 className="text-xl font-semibold mb-3 mt-8 flex items-center gap-2">
          <span className="text-2xl">💪</span>
          {t('exercises.practice.title')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('exercises.practice.description')}</p>

        <MultipleChoiceExercise
          difficulty="medium"
          question={t('exercises.exercise3.question')}
          choices={[
            { id: 'a', text: t('exercises.exercise3.option1'), isCorrect: true },
            { id: 'b', text: t('exercises.exercise3.option2'), isCorrect: false },
            { id: 'c', text: t('exercises.exercise3.option3'), isCorrect: false },
            { id: 'd', text: t('exercises.exercise3.option4'), isCorrect: false }
          ]}
          explanation={t('exercises.exercise3.explanation')}
        />

        <NumericInputExercise
          difficulty="medium"
          question={t('exercises.exercise4.question')}
          correctAnswer={3}
          hint={t('exercises.exercise4.hint')}
          solution={<p>{t('exercises.exercise4.explanation')}</p>}
        />

        <MultipleChoiceExercise
          difficulty="medium"
          question={t('exercises.exercise5.question')}
          choices={[
            { id: 'a', text: 'y = x + 5', isCorrect: false },
            { id: 'b', text: 'y = 3x', isCorrect: true },
            { id: 'c', text: 'y = x - 3', isCorrect: false },
            { id: 'd', text: 'y = 2x + 1', isCorrect: false }
          ]}
          explanation={t('exercises.exercise5.explanation')}
        />

        {/* Challenge Problem */}
        <h3 className="text-xl font-semibold mb-3 mt-8 flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          {t('exercises.challenge.title')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('exercises.challenge.description')}</p>

        <NumericInputExercise
          difficulty="hard"
          question={t('exercises.exercise6.question')}
          correctAnswer={25}
          hint={t('exercises.exercise6.hint')}
          solution={<p>{t('exercises.exercise6.explanation')}</p>}
        />
      </section>

      {/* Tips and Real World */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">💡 {t('notes.title')}</h2>
        
        <Note type="tip">{t('notes.verticalLine.content')}</Note>
        
        <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
          <p className="font-semibold text-lg mb-3">{t('notes.realWorld.title')}</p>
          <ul className="space-y-2">
            <li>{t('notes.realWorld.example1')}</li>
            <li>{t('notes.realWorld.example2')}</li>
            <li>{t('notes.realWorld.example3')}</li>
            <li>{t('notes.realWorld.example4')}</li>
          </ul>
        </div>
      </section>

      {/* Conclusion - ENHANCED */}
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

      {/* NEW: What's Next */}
      <WhatsNext
        motivationalText={<p>{t('whatsNext.motivation')}</p>}
        topics={[
          {
            title: t('whatsNext.topic1.title'),
            description: t('whatsNext.topic1.description'),
            link: '/en/learn/pre-algebra/systems-intro'
          },
          {
            title: t('whatsNext.topic2.title'),
            description: t('whatsNext.topic2.description'),
            link: '/en/learn/algebra-1/quadratics'
          }
        ]}
      />

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
