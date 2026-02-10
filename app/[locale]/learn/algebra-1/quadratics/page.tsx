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

export default function QuadraticsLesson() {
  const t = useTranslations('quadratics')
  const navigation = getLessonNavigation('algebra-1', 'quadratics')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* Before You Start */}
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

      {/* Introduction */}
      <Definition term={t('definition.quadratic.title')}>
        <p>{t.rich('definition.quadratic.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <p className="mt-2">{t('definition.quadratic.discovery')}</p>
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('definition.quadratic.standardForm')}</p>
          <div className="text-center text-2xl font-bold">
            <MathRenderer math="ax^2 + bx + c = 0" />
          </div>
          <p className="text-sm text-center mt-2">{t('definition.quadratic.where')}</p>
        </div>
      </Definition>

      {/* Parabola Visualization */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.parabola.title')}</h2>
        <p className="mb-4">{t('sections.parabola.intro')}</p>

        <VisualExplanation 
          title={t('visuals.parabola.title')}
          caption={t('visuals.parabola.caption')}
          zoomable={true}
        >
          <svg viewBox="0 0 500 400" className="w-full h-auto">
            <defs>
              <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" className="fill-gray-600 dark:fill-gray-400" />
              </marker>
            </defs>
            
            {/* Grid */}
            {[...Array(9)].map((_, i) => (
              <g key={i}>
                <line x1="50" y1={50 + i * 40} x2="450" y2={50 + i * 40} className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="0.5"/>
                <line x1={50 + i * 50} y1="50" x2={50 + i * 50} y2="370" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="0.5"/>
              </g>
            ))}
            
            {/* Axes */}
            <line x1="50" y1="210" x2="450" y2="210" className="stroke-gray-600 dark:stroke-gray-400" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
            <line x1="250" y1="370" x2="250" y2="30" className="stroke-gray-600 dark:stroke-gray-400" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
            
            {/* Parabola y = x^2 */}
            <path d="M 150,290 Q 250,50 350,290" className="stroke-blue-600 dark:stroke-blue-400 fill-none" strokeWidth="3"/>
            
            {/* Vertex */}
            <circle cx="250" cy="50" r="5" className="fill-red-500 stroke-red-700" strokeWidth="2"/>
            <text x="260" y="45" className="text-xs fill-red-600 dark:fill-red-400 font-semibold">{t('visuals.parabola.vertex')}</text>
            
            {/* Axis of Symmetry */}
            <line x1="250" y1="50" x2="250" y2="290" className="stroke-green-500 stroke-dasharray-4" strokeWidth="2"/>
            <text x="255" y="170" className="text-xs fill-green-600 dark:fill-green-400 font-semibold">{t('visuals.parabola.axis')}</text>
            
            {/* Roots */}
            <circle cx="200" cy="210" r="4" className="fill-orange-500"/>
            <circle cx="300" cy="210" r="4" className="fill-orange-500"/>
            <text x="160" y="230" className="text-xs fill-orange-600 dark:fill-orange-400">{t('visuals.parabola.root1')}</text>
            <text x="305" y="230" className="text-xs fill-orange-600 dark:fill-orange-400">{t('visuals.parabola.root2')}</text>
            
            {/* Labels */}
            <text x="430" y="225" className="text-sm font-semibold fill-gray-700 dark:fill-gray-300">x</text>
            <text x="255" y="45" className="text-sm font-semibold fill-gray-700 dark:fill-gray-300">y</text>
          </svg>
        </VisualExplanation>

        <KeyConcept>
          <p className="font-semibold mb-2">{t('keyConcept.parts.title')}</p>
          <ul className="space-y-2 text-sm">
            <li><strong>{t('keyConcept.parts.vertex')}</strong></li>
            <li><strong>{t('keyConcept.parts.axis')}</strong></li>
            <li><strong>{t('keyConcept.parts.roots')}</strong></li>
          </ul>
        </KeyConcept>
      </section>

      {/* Factoring Method */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.factoring.title')}</h2>
        <p className="mb-4">{t('sections.factoring.intro')}</p>

        <VisualExplanation 
          title={t('visuals.factoring.title')}
          caption={t('visuals.factoring.caption')}
          zoomable={true}
        >
          <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg w-full">
            <div className="space-y-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.factoring.step1')}</p>
                <div className="text-center text-lg">
                  <MathRenderer math="x^2 + 5x + 6 = 0" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-green-600 dark:text-green-400">↓</div>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.factoring.step2')}</p>
                <p className="text-sm text-center">{t('visuals.factoring.numbers')}</p>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-green-600 dark:text-green-400">↓</div>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.factoring.step3')}</p>
                <div className="text-center">
                  <MathRenderer math="(x + 2)(x + 3) = 0" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-3xl text-green-600 dark:text-green-400">↓</div>
              </div>
              
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.factoring.step4')}</p>
                <div className="text-center text-xl font-bold text-green-700 dark:text-green-300">
                  <MathRenderer math="x = -2 \\text{ or } x = -3" />
                </div>
              </div>
            </div>
          </div>
        </VisualExplanation>
      </section>

      {/* Quadratic Formula */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.formula.title')}</h2>
        <p className="mb-4">{t('sections.formula.intro')}</p>

        <KeyConcept title={t('sections.formula.formulaTitle')}>
          <div className="text-center mb-4">
            <div className="text-2xl font-bold">
              <MathRenderer math="x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" block />
            </div>
          </div>
          <p className="text-sm">{t('sections.formula.works')}</p>
        </KeyConcept>

        <VisualExplanation 
          title={t('visuals.formula.title')}
          caption={t('visuals.formula.caption')}
          zoomable={true}
        >
          <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg w-full">
            <div className="space-y-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.formula.equation')}</p>
                <div className="text-center">
                  <MathRenderer math="2x^2 + 5x - 3 = 0" />
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.formula.identify')}</p>
                <div className="text-sm space-y-1">
                  <div>a = 2, b = 5, c = -3</div>
                </div>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.formula.substitute')}</p>
                <div className="text-center text-sm">
                  <MathRenderer math="x = \\frac{-5 \\pm \\sqrt{25 + 24}}{4}" />
                </div>
              </div>
              
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded">
                <p className="text-sm font-semibold mb-2">{t('visuals.formula.solutions')}</p>
                <div className="text-center font-bold text-green-700 dark:text-green-300">
                  <MathRenderer math="x = 0.5 \\text{ or } x = -3" />
                </div>
              </div>
            </div>
          </div>
        </VisualExplanation>

        <Note type="tip">{t('notes.discriminant.content')}</Note>
      </section>

      {/* Completing the Square */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">{t('sections.completing.title')}</h2>
        <p className="mb-4">{t('sections.completing.intro')}</p>

        <VisualExplanation 
          title={t('visuals.completing.title')}
          caption={t('visuals.completing.caption')}
          zoomable={true}
        >
          <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg w-full">
            <div className="space-y-3">
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-xs font-semibold mb-1">{t('visuals.completing.start')}</p>
                <div className="text-center"><MathRenderer math="x^2 + 6x = 7" /></div>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="text-xs font-semibold mb-1">{t('visuals.completing.half')}</p>
                <div className="text-center text-sm"><MathRenderer math="(\\frac{6}{2})^2 = 9" /></div>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-xs font-semibold mb-1">{t('visuals.completing.add')}</p>
                <div className="text-center"><MathRenderer math="x^2 + 6x + 9 = 7 + 9" /></div>
              </div>
              
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                <p className="text-xs font-semibold mb-1">{t('visuals.completing.factor')}</p>
                <div className="text-center"><MathRenderer math="(x + 3)^2 = 16" /></div>
              </div>
              
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded">
                <p className="text-xs font-semibold mb-1">{t('visuals.completing.solve')}</p>
                <div className="text-center font-bold text-green-700 dark:text-green-300">
                  <MathRenderer math="x = 1 \\text{ or } x = -7" />
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
          problem={<p>{t('examples.example1.problem')}</p>}
          solution={
            <>
              <StepByStep steps={[
                { content: <p>{t('examples.example1.step1')}</p> },
                { content: <p>{t('examples.example1.step2')}: <MathRenderer math="(x + 3)(x - 2) = 0" /></p> },
                { content: <p>{t('examples.example1.step3')}: x + 3 = 0 {t('examples.example1.or')} x - 2 = 0</p> }
              ]} />
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold">{t('examples.example1.answerLabel')}</p>
                <MathRenderer math="x = -3 \\text{ or } x = 2" />
              </div>
            </>
          }
        />

        <Example
          title={t('examples.example2.title')}
          problem={<p>{t('examples.example2.problem')}</p>}
          solution={
            <>
              <StepByStep steps={[
                { content: <p>{t('examples.example2.step1')}: a = 1, b = -3, c = -4</p> },
                { content: <p>{t('examples.example2.step2')}: <MathRenderer math="x = \\frac{3 \\pm \\sqrt{9 + 16}}{2}" /></p> },
                { content: <p>{t('examples.example2.step3')}: <MathRenderer math="x = \\frac{3 \\pm 5}{2}" /></p> }
              ]} />
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold">{t('examples.example2.answerLabel')}</p>
                <MathRenderer math="x = 4 \\text{ or } x = -1" />
              </div>
            </>
          }
        />

        <Example
          title={t('examples.example3.title')}
          problem={<p>{t('examples.example3.problem')}</p>}
          solution={
            <>
              <StepByStep steps={[
                { content: <p>{t('examples.example3.step1')}</p> },
                { content: <p>{t('examples.example3.step2')}: <MathRenderer math="h(t) = -16t^2 + 64t" /></p> },
                { content: <p>{t('examples.example3.step3')}: <MathRenderer math="-16t(t - 4) = 0" /></p> }
              ]} />
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold">{t('examples.example3.answerLabel')}</p>
                <p>{t('examples.example3.answer')}</p>
              </div>
            </>
          }
        />
      </section>

      {/* Common Mistakes */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">⚠️ {t('commonMistakes.title')}</h2>
        
        <CommonMistake
          title={t('commonMistakes.mistake1.title')}
          wrongApproach={<p>{t('commonMistakes.mistake1.wrong')}</p>}
          wrongMath="x = \\frac{-b + \\sqrt{b^2 - 4ac}}{2a} \\text{ only}"
          correctApproach={<p>{t('commonMistakes.mistake1.correct')}</p>}
          correctMath="x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\text{ (two solutions!)}"
          explanation={<p>{t('commonMistakes.mistake1.explanation')}</p>}
          tip={<p>{t('commonMistakes.mistake1.tip')}</p>}
        />

        <CommonMistake
          title={t('commonMistakes.mistake2.title')}
          wrongApproach={<p>{t('commonMistakes.mistake2.wrong')}</p>}
          wrongMath="x^2 - 5x + 6 = (x - 5)(x + 6)"
          correctApproach={<p>{t('commonMistakes.mistake2.correct')}</p>}
          correctMath="x^2 - 5x + 6 = (x - 2)(x - 3)"
          explanation={<p>{t('commonMistakes.mistake2.explanation')}</p>}
        />

        <CommonMistake
          title={t('commonMistakes.mistake3.title')}
          wrongApproach={<p>{t('commonMistakes.mistake3.wrong')}</p>}
          wrongMath="\\text{Vertex at } x = 0 \\text{ always}"
          correctApproach={<p>{t('commonMistakes.mistake3.correct')}</p>}
          correctMath="\\text{Vertex at } x = -\\frac{b}{2a}"
          explanation={<p>{t('commonMistakes.mistake3.explanation')}</p>}
        />
      </section>

      {/* Real World */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">🌍 {t('realWorld.title')}</h2>
        <p className="mb-4">{t('realWorld.intro')}</p>
        
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app1.title')}</h3>
            <p className="text-sm mb-2">{t('realWorld.app1.description')}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('realWorld.app1.example')}</p>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app2.title')}</h3>
            <p className="text-sm mb-2">{t('realWorld.app2.description')}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('realWorld.app2.example')}</p>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{t('realWorld.app3.title')}</h3>
            <p className="text-sm mb-2">{t('realWorld.app3.description')}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('realWorld.app3.example')}</p>
          </div>
        </div>
      </section>

      {/* Exercises */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">✏️ {t('exercises.title')}</h2>

        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <span className="text-2xl">🌤️</span>
          {t('exercises.warmup.title')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('exercises.warmup.description')}</p>

        <MultipleChoiceExercise
          difficulty="easy"
          question={t('exercises.exercise1.question')}
          choices={[
            { id: 'a', text: 'x = 2, x = 3', isCorrect: false },
            { id: 'b', text: 'x = -2, x = -3', isCorrect: true },
            { id: 'c', text: 'x = 2, x = -3', isCorrect: false },
            { id: 'd', text: 'x = -2, x = 3', isCorrect: false }
          ]}
          explanation={t('exercises.exercise1.explanation')}
        />

        <NumericInputExercise
          difficulty="easy"
          question={t('exercises.exercise2.question')}
          correctAnswer={25}
          hint={t('exercises.exercise2.hint')}
          solution={<p>{t('exercises.exercise2.explanation')}</p>}
        />

        <h3 className="text-xl font-semibold mb-3 mt-8 flex items-center gap-2">
          <span className="text-2xl">💪</span>
          {t('exercises.practice.title')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('exercises.practice.description')}</p>

        <MultipleChoiceExercise
          difficulty="medium"
          question={t('exercises.exercise3.question')}
          choices={[
            { id: 'a', text: 'x = 3, x = -2', isCorrect: true },
            { id: 'b', text: 'x = -3, x = 2', isCorrect: false },
            { id: 'c', text: 'x = 6, x = -1', isCorrect: false },
            { id: 'd', text: 'x = -6, x = 1', isCorrect: false }
          ]}
          explanation={t('exercises.exercise3.explanation')}
        />

        <NumericInputExercise
          difficulty="medium"
          question={t('exercises.exercise4.question')}
          correctAnswer={2}
          hint={t('exercises.exercise4.hint')}
          solution={<p>{t('exercises.exercise4.explanation')}</p>}
        />

        <MultipleChoiceExercise
          difficulty="medium"
          question={t('exercises.exercise5.question')}
          choices={[
            { id: 'a', text: t('exercises.exercise5.option1'), isCorrect: false },
            { id: 'b', text: t('exercises.exercise5.option2'), isCorrect: true },
            { id: 'c', text: t('exercises.exercise5.option3'), isCorrect: false },
            { id: 'd', text: t('exercises.exercise5.option4'), isCorrect: false }
          ]}
          explanation={t('exercises.exercise5.explanation')}
        />

        <h3 className="text-xl font-semibold mb-3 mt-8 flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          {t('exercises.challenge.title')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('exercises.challenge.description')}</p>

        <NumericInputExercise
          difficulty="hard"
          question={t('exercises.exercise6.question')}
          correctAnswer={4}
          hint={t('exercises.exercise6.hint')}
          solution={<p>{t('exercises.exercise6.explanation')}</p>}
        />
      </section>

      {/* Tips */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">💡 {t('notes.title')}</h2>
        
        <Note type="tip">{t('notes.tip1')}</Note>
        <Note type="tip">{t('notes.tip2')}</Note>
        <Note type="success">{t('notes.tip3')}</Note>
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

      {/* What's Next */}
      <WhatsNext
        motivationalText={<p>{t('whatsNext.motivation')}</p>}
        topics={[
          {
            title: t('whatsNext.topic1.title'),
            description: t('whatsNext.topic1.description'),
            link: '/en/learn/algebra-1/polynomials'
          },
          {
            title: t('whatsNext.topic2.title'),
            description: t('whatsNext.topic2.description'),
            link: '/en/learn/algebra-2/radicals'
          }
        ]}
      />

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
