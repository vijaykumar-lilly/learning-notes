'use client'

import { useTranslations } from 'next-intl'
import MathRenderer from '@/components/math/MathRenderer'
import { 
  Definition, 
  Example, 
  KeyConcept, 
  Note, 
  StepByStep
} from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise } from '@/components/interactive'
import ArithmeticVisualizer from '@/components/visualizations/ArithmeticVisualizer'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'
import { Term } from '@/components/bilingual/Term'
import { GlossaryPanel } from '@/components/bilingual/GlossaryPanel'
import { useBilingualPreferences } from '@/lib/bilingual-preferences'

export default function BasicArithmeticLesson() {
  const t = useTranslations('arithmetic')
  const navigation = getLessonNavigation('foundations', 'arithmetic')
  const { showGlossary } = useBilingualPreferences()

  return (
    <>
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      <Definition term={t('addition.term')}>
        <p>
          {t.rich('addition.definition', {
            strong: (chunks) => <strong>{chunks}</strong>
          })} <MathRenderer math="+" /> {t('addition.readAs')} (<Term primary="addition" secondary="கூட்டல்" inline />)
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('addition.exampleLabel')}</p>
          <p><MathRenderer math="5 + 3 = 8" /></p>
          <p className="mt-2">{t('addition.exampleText')}</p>
        </div>
      </Definition>

      <ArithmeticVisualizer
        operation="addition"
        num1={5}
        num2={3}
        label={t('addition.visualLabel')}
      />

      <KeyConcept title={t('addition.properties.title')}>
        {t.rich('addition.properties.commutative', {
          strong: (chunks) => <strong>{chunks}</strong>
        })} <MathRenderer math="3 + 5 = 5 + 3" /> ({t('addition.properties.commutativeLabel')})<br/>
        {t.rich('addition.properties.identity', {
          strong: (chunks) => <strong>{chunks}</strong>
        })} <MathRenderer math="7 + 0 = 7" /> ({t('addition.properties.identityLabel')})
      </KeyConcept>

      <NumericInputExercise
        question={<>{t('addition.exercise1.question')} <MathRenderer math="23 + 15" />?</>}
        correctAnswer={38}
        hint={t('addition.exercise1.hint')}
        solution={
          <div>
            <p>{t('addition.exercise1.solution1')}</p>
            <p>{t('addition.exercise1.solution2')}</p>
            <p className="mt-2 font-semibold">{t('addition.exercise1.solution3')}</p>
          </div>
        }
      />

      <Note type="tip">
        <p className="font-semibold">🧠 {t('addition.mentalMath.title')}</p>
        <p className="mt-2">{t('addition.mentalMath.description')}</p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
            <p className="font-semibold">{t('addition.mentalMath.exampleLabel')} <MathRenderer math="47 + 29" /></p>
            <div className="mt-2 space-y-1">
              <p>{t('addition.mentalMath.step1')} <MathRenderer math="47 + 30 = 77" /></p>
              <p>{t('addition.mentalMath.step2')} <MathRenderer math="77 - 1 = 76" /></p>
            </div>
          </div>
          <p className="mt-2">{t('addition.mentalMath.worksGreat')}</p>
        </div>
      </Note>

      <Definition term={t('subtraction.term')}>
        <p>
          {t.rich('subtraction.definition', {
            strong: (chunks) => <strong>{chunks}</strong>
          })} <MathRenderer math="-" /> {t('subtraction.readAs')} (<Term primary="subtraction" secondary="கழித்தல்" inline />)
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('subtraction.exampleLabel')}</p>
          <p><MathRenderer math="9 - 4 = 5" /></p>
          <p className="mt-2">{t('subtraction.exampleText')}</p>
        </div>
      </Definition>

      <ArithmeticVisualizer
        operation="subtraction"
        num1={9}
        num2={4}
        label={t('subtraction.visualLabel')}
      />

      <MultipleChoiceExercise
        question={<>{t('subtraction.exercise1.question')} <MathRenderer math="42 - 18" />?</>}
        choices={[
          { id: 'a', text: '24', isCorrect: true },
          { id: 'b', text: '34', isCorrect: false },
          { id: 'c', text: '26', isCorrect: false },
          { id: 'd', text: '20', isCorrect: false }
        ]}
        explanation={
          <div>
            <p>{t('subtraction.exercise1.explanation1')}</p>
            <p>{t('subtraction.exercise1.explanation2')}</p>
          </div>
        }
        hint={t('subtraction.exercise1.hint')}
      />

      <Note type="success">
        <p className="font-semibold">🎯 {t('subtraction.shortcut.title')}</p>
        <p className="mt-2">{t('subtraction.shortcut.description')}</p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
            <p className="font-semibold">{t('subtraction.shortcut.example1Label')} <MathRenderer math="73 - 28" /></p>
            <div className="mt-2 space-y-1">
              <p>{t('subtraction.shortcut.example1Step1')} <MathRenderer math="75 - 30" /></p>
              <p>{t('subtraction.shortcut.example1Step2')} <MathRenderer math="75 - 30 = 45" /></p>
            </div>
          </div>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded mt-2">
            <p className="font-semibold">{t('subtraction.shortcut.example2Label')} <MathRenderer math="84 - 37" /></p>
            <p className="mt-1">{t('subtraction.shortcut.example2')} <MathRenderer math="87 - 40 = 47" /></p>
          </div>
        </div>
      </Note>

      <Definition term={t('multiplication.term')}>
        <p>
          {t.rich('multiplication.definition', {
            strong: (chunks) => <strong>{chunks}</strong>
          })} <MathRenderer math="\times" /> {t('multiplication.or')} <MathRenderer math="\cdot" />. (<Term primary="multiplication" secondary="பெருக்கல்" inline />)
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('multiplication.exampleLabel')}</p>
          <p><MathRenderer math="4 \times 3 = 12" /></p>
          <p className="mt-2">{t('multiplication.exampleText')}</p>
        </div>
      </Definition>

      <ArithmeticVisualizer
        operation="multiplication"
        num1={4}
        num2={3}
        label={t('multiplication.visualLabel')}
      />

      <Note type="success">
        <p className="font-semibold">✋ {t('multiplication.fingerTrick.title')}</p>
        <p className="mt-2">{t('multiplication.fingerTrick.description')}</p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded">
            <p className="font-semibold">{t('multiplication.fingerTrick.exampleLabel')} 9 × 7</p>
            <div className="mt-2 space-y-1">
              <p>{t('multiplication.fingerTrick.step1')}</p>
              <p>{t('multiplication.fingerTrick.step2')}</p>
              <p>{t('multiplication.fingerTrick.step3')}</p>
              <p>{t('multiplication.fingerTrick.step4')}</p>
              <p className="font-bold mt-2"><MathRenderer math="9 \times 7 = 63" /> 🎉</p>
            </div>
          </div>
          <p className="mt-2">{t('multiplication.fingerTrick.tryIt')}</p>
        </div>
      </Note>

      <Example
        title={t('multiplication.pattern.title')}
        problem={t('multiplication.pattern.problem')}
        solution={
          <div className="space-y-2">
            <p><MathRenderer math="5 \times 1 = 5" /></p>
            <p><MathRenderer math="5 \times 2 = 10" /></p>
            <p><MathRenderer math="5 \times 3 = 15" /></p>
            <p><MathRenderer math="5 \times 4 = 20" /></p>
            <p className="mt-3 font-semibold">{t('multiplication.pattern.conclusion')}</p>
          </div>
        }
      />

      <Note type="tip">
        <p className="font-semibold">🔁 {t('multiplication.doublingTrick.title')}</p>
        <p className="mt-2">{t('multiplication.doublingTrick.description')}</p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
            <p className="font-semibold">{t('multiplication.doublingTrick.exampleLabel')} <MathRenderer math="16 \times 25" /></p>
            <div className="mt-2 space-y-1">
              <p>{t('multiplication.doublingTrick.step1')} <MathRenderer math="8 \times 50" /></p>
              <p>{t('multiplication.doublingTrick.step2')} <MathRenderer math="4 \times 100 = 400" /></p>
            </div>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded mt-2">
            <p className="font-semibold">{t('multiplication.doublingTrick.quickOnes')}</p>
            <p className="mt-1"><MathRenderer math="14 \times 5 = 7 \times 10 = 70" /></p>
            <p><MathRenderer math="32 \times 15 = 16 \times 30 = 480" /></p>
          </div>
        </div>
      </Note>

      <NumericInputExercise
        question={<>{t('multiplication.exercise1.question')} <MathRenderer math="7 \times 8" />?</>}
        correctAnswer={56}
        hint={t('multiplication.exercise1.hint')}
        solution={
          <div>
            <p><MathRenderer math="7 \times 8 = 56" /></p>
            <p className="mt-2">{t('multiplication.exercise1.solution')}</p>
          </div>
        }
      />

      <Definition term={t('division.term')}>
        <p>
          {t.rich('division.definition', {
            strong: (chunks) => <strong>{chunks}</strong>
          })} <MathRenderer math="\div" /> {t('division.or')} <MathRenderer math="/" /> {t('division.readAs')} (<Term primary="division" secondary="வகுத்தல்" inline />)
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('division.exampleLabel')}</p>
          <p><MathRenderer math="12 \div 3 = 4" /></p>
          <p className="mt-2">{t('division.exampleText')}</p>
        </div>
      </Definition>

      <Note type="success">
        <p className="font-semibold">✅ {t('division.rules.title')}</p>
        <p className="mt-2">{t('division.rules.description')}</p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="font-semibold">{t('division.rules.by2.label')}</p>
              <p>{t('division.rules.by2.rule')}</p>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
              <p className="font-semibold">{t('division.rules.by3.label')}</p>
              <p>{t('division.rules.by3.rule')}</p>
              <p className="text-xs mt-1">{t('division.rules.by3.example')}</p>
            </div>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <p className="font-semibold">{t('division.rules.by5.label')}</p>
              <p>{t('division.rules.by5.rule')}</p>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
              <p className="font-semibold">{t('division.rules.by9.label')}</p>
              <p>{t('division.rules.by9.rule')}</p>
              <p className="text-xs mt-1">{t('division.rules.by9.example')}</p>
            </div>
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
              <p className="font-semibold">{t('division.rules.by10.label')}</p>
              <p>{t('division.rules.by10.rule')}</p>
            </div>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded">
              <p className="font-semibold">{t('division.rules.by6.label')}</p>
              <p>{t('division.rules.by6.rule')}</p>
            </div>
          </div>
        </div>
      </Note>

      <ArithmeticVisualizer
        operation="division"
        num1={12}
        num2={3}
        label={t('division.visualLabel')}
      />

      <KeyConcept title={t('division.relationship.title')}>
        {t('division.relationship.description')}<br/>
        {t('division.relationship.if')} <MathRenderer math="3 \times 4 = 12" />, {t('division.relationship.then')} <MathRenderer math="12 \div 3 = 4" />
      </KeyConcept>

      <MultipleChoiceExercise
        question={<>{t('division.exercise1.question')} <MathRenderer math="45 \div 5" />?</>}
        choices={[
          { id: 'a', text: '7', isCorrect: false },
          { id: 'b', text: '8', isCorrect: false },
          { id: 'c', text: '9', isCorrect: true },
          { id: 'd', text: '10', isCorrect: false }
        ]}
        explanation={<>{t('division.exercise1.explanation')}</>}
        hint={t('division.exercise1.hint')}
      />

      <Example
        problem={<>{t('division.example.problem')} <MathRenderer math="56 \div 7" /> {t('division.example.usingLongDivision')}</>}
        solution={
          <StepByStep
            steps={[
              {
                title: t('division.example.step1.title'),
                content: <>{t('division.example.step1.content')}</>
              },
              {
                title: t('division.example.step2.title'),
                content: <><MathRenderer math="7 \times 8 = 56" /></>
              },
              {
                title: t('division.example.step3.title'),
                content: <><MathRenderer math="56 \div 7 = 8" /></>
              }
            ]}
          />
        }
        hint={t('division.example.hint')}
      />

      <NumericInputExercise
        question={<>{t('division.exercise2.question')} <MathRenderer math="81 \div 9" />?</>}
        correctAnswer={9}
        hint={t('division.exercise2.hint')}
        solution={
          <div>
            <p>{t('division.exercise2.solution1')} <MathRenderer math="9 \times 9 = 81" /></p>
            <p className="mt-2">{t('division.exercise2.solution2')} <MathRenderer math="81 \div 9 = 9" /></p>
          </div>
        }
      />

      <Note type="tip">
        <p className="font-semibold">🏆 {t('orderOfOperations.title')}</p>
        <p className="mt-2">
          {t('orderOfOperations.description')}
        </p>
        <div className="mt-3 space-y-3">
          <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded">
            <p className="font-semibold text-sm">{t('orderOfOperations.memoryPhrase.label')}</p>
            <p className="mt-1 text-sm">{t('orderOfOperations.memoryPhrase.text')}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">{t('orderOfOperations.exampleLabel')} <MathRenderer math="3 + 4 \times 2" /></p>
            <div className="mt-2 space-y-1 ml-4">
              <p>❌ {t('orderOfOperations.wrong')} <MathRenderer math="(3 + 4) \times 2 = 14" /></p>
              <p>✅ {t('orderOfOperations.right')} <MathRenderer math="3 + (4 \times 2) = 3 + 8 = 11" /></p>
              <p className="text-xs mt-2">{t('orderOfOperations.multiplyFirst')}</p>
            </div>
          </div>
        </div>
      </Note>

      <Note type="info">
        <p className="font-semibold">{t('orderOfOperations.tip.title')}</p>
        <p className="mt-2">{t('orderOfOperations.tip.description')}</p>
      </Note>

      <Note type="success">
        <p className="font-semibold">{t('conclusion.title')}</p>
        <p className="mt-1">{t('conclusion.message')}</p>
      </Note>

      <LessonNavigation navigation={navigation} />
    </div>
    
    {showGlossary && <GlossaryPanel />}
    </>
  )
}
