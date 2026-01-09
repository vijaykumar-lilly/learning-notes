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
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'
import { Term } from '@/components/bilingual/Term'
import { GlossaryPanel } from '@/components/bilingual/GlossaryPanel'
import { useBilingualPreferences } from '@/lib/bilingual-preferences'

export default function NumberSenseLesson() {
  const t = useTranslations('number-sense')
  const navigation = getLessonNavigation('foundations', 'number-sense')
  const { showGlossary } = useBilingualPreferences()
  
  return (
    <>
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      <Definition term={t('number.term')}>
        <p>
          {t.rich('number.definition', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">{t('number.examplesLabel')}</p>
          <p>{t('number.counting')}</p>
          <p>{t('number.measuring')}</p>
          <p>{t('number.labeling')}</p>
        </div>
      </Definition>

      <KeyConcept title={t('counting.title')}>
        {t('counting.description')}
      </KeyConcept>

      <MultipleChoiceExercise
        question={t('counting.exercise.question')}
        choices={[
          { id: 'a', text: '18', isCorrect: false },
          { id: 'b', text: '20', isCorrect: true },
          { id: 'c', text: '21', isCorrect: false },
          { id: 'd', text: '29', isCorrect: false }
        ]}
        explanation={t('counting.exercise.explanation')}
        hint={t('counting.exercise.hint')}
      />

      <Definition term={t('placeValue.term')}>
        <p>
          {t.rich('placeValue.definition', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}
        </p>
        <div className="mt-4">
          <p className="font-semibold mb-2">{t('placeValue.exampleLabel')}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t.rich('placeValue.hundreds', { strong: (chunks) => <strong>{chunks}</strong> })} (<Term primary="hundreds" secondary="நூறுகள்" inline />)</li>
            <li>{t.rich('placeValue.tens', { strong: (chunks) => <strong>{chunks}</strong> })} (<Term primary="tens" secondary="பத்துகள்" inline />)</li>
            <li>{t.rich('placeValue.ones', { strong: (chunks) => <strong>{chunks}</strong> })} (<Term primary="ones" secondary="ஒன்றுகள்" inline />)</li>
          </ul>
          <p className="mt-3">{t('placeValue.sum')}</p>
        </div>
      </Definition>

      <Example
        problem={t('placeValue.example.problem')}
        solution={
          <StepByStep
            steps={[
              {
                title: t('placeValue.example.step1.title'),
                content: <>{t.rich('placeValue.example.step1.content', { strong: (chunks) => <strong>{chunks}</strong> })}</>
              },
              {
                title: t('placeValue.example.step2.title'),
                content: <>{t.rich('placeValue.example.step2.content', { strong: (chunks) => <strong>{chunks}</strong> })}</>
              }
            ]}
          />
        }
        hint={t('placeValue.example.hint')}
      />

      <NumericInputExercise
        question={t('placeValue.exercise.question')}
        correctAnswer={200}
        hint={t('placeValue.exercise.hint')}
        solution={
          <div>
            <p>{t.rich('placeValue.exercise.solution1', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            <p className="mt-2">{t('placeValue.exercise.solution2')}</p>
          </div>
        }
      />

      <Definition term={t('comparing.term')} example={
        <div>
          <p><MathRenderer math="5 < 8" /> {t('comparing.example1')}</p>
          <p><MathRenderer math="12 > 9" /> {t('comparing.example2')}</p>
          <p><MathRenderer math="7 = 7" /> {t('comparing.example3')}</p>
        </div>
      }>
        <p>{t('comparing.description')}</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><MathRenderer math="<" /> {t('comparing.lessThan')}</li>
          <li><MathRenderer math=">" /> {t('comparing.greaterThan')}</li>
          <li><MathRenderer math="=" /> {t('comparing.equals')}</li>
        </ul>
        <Note type="tip">
          {t('comparing.tip')}
        </Note>
      </Definition>

      <MultipleChoiceExercise
        question={t('comparing.exercise.question')}
        choices={[
          { id: 'a', text: <MathRenderer math="<" />, isCorrect: true },
          { id: 'b', text: <MathRenderer math=">" />, isCorrect: false },
          { id: 'c', text: <MathRenderer math="=" />, isCorrect: false }
        ]}
        explanation={<>{t('comparing.exercise.explanation')}</>}
        hint={t('comparing.exercise.hint')}
      />

      <Definition term={t('evenOdd.term')}>
        <ul className="space-y-3">
          <li>
            <strong><Term primary="even number" secondary="இரட்டை எண்" /></strong>: {t('evenOdd.even.definition')}
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {t('evenOdd.even.examples')}
            </div>
          </li>
          <li>
            <strong><Term primary="odd number" secondary="ஒற்றை எண்" /></strong>: {t('evenOdd.odd.definition')}
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {t('evenOdd.odd.examples')}
            </div>
          </li>
        </ul>
      </Definition>

      <MultipleChoiceExercise
        question={t('evenOdd.exercise1.question')}
        choices={[
          { id: 'a', text: '24', isCorrect: false },
          { id: 'b', text: '36', isCorrect: false },
          { id: 'c', text: '47', isCorrect: true },
          { id: 'd', text: '50', isCorrect: false }
        ]}
        explanation={t('evenOdd.exercise1.explanation')}
        hint={t('evenOdd.exercise1.hint')}
      />

      <NumericInputExercise
        question={t('evenOdd.exercise2.question')}
        correctAnswer={100}
        hint={t('evenOdd.exercise2.hint')}
        solution={
          <div>
            <p>{t('evenOdd.exercise2.solution1')}</p>
            <p className="mt-2">{t('evenOdd.exercise2.solution2')}</p>
            <p className="mt-2">{t('evenOdd.exercise2.solution3')}</p>
          </div>
        }
      />

      <Note type="success">
        <p className="font-semibold">{t('conclusion.title')}</p>
        <p className="mt-1">
          {t('conclusion.message')}
        </p>
      </Note>

      <LessonNavigation navigation={navigation} />
    </div>
    
    {showGlossary && <GlossaryPanel />}
    </>
  )
}
