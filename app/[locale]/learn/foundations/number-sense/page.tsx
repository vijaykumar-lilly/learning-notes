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
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t('title')}</h1>
      
      {/* Welcome Section */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700">
        <p className="text-lg mb-4">{t('welcome.intro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="text-3xl mb-2">🔢</div>
            <h3 className="font-semibold mb-1">{t('welcome.topic1.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('welcome.topic1.desc')}</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold mb-1">{t('welcome.topic2.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('welcome.topic2.desc')}</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold mb-1">{t('welcome.topic3.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('welcome.topic3.desc')}</p>
          </div>
        </div>
      </div>

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

      {/* Interactive Number Line */}
      <div className="my-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">{t('numberLine.title')}</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-400">{t('numberLine.instruction')}</p>
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <div key={num} className="flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold text-sm sm:text-base hover:bg-blue-600 transition-colors cursor-pointer">
                {num}
              </div>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mt-2"></div>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
      </div>

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
        
        {/* Visual Place Value Blocks */}
        <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
          <p className="font-semibold mb-4">{t('placeValue.exampleLabel')}</p>
          
          <div className="space-y-4">
            {/* Hundreds */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="w-32">
                <span className="font-bold text-purple-600 dark:text-purple-400">300 = </span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md">
                    100
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t.rich('placeValue.hundreds', { strong: (chunks) => <strong>{chunks}</strong> })} (<Term primary="hundreds" secondary="நூறுகள்" inline />)
              </span>
            </div>
            
            {/* Tens */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="w-32">
                <span className="font-bold text-blue-600 dark:text-blue-400">40 = </span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md">
                    10
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t.rich('placeValue.tens', { strong: (chunks) => <strong>{chunks}</strong> })} (<Term primary="tens" secondary="பத்துகள்" inline />)
              </span>
            </div>
            
            {/* Ones */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="w-32">
                <span className="font-bold text-green-600 dark:text-green-400">5 = </span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                    1
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t.rich('placeValue.ones', { strong: (chunks) => <strong>{chunks}</strong> })} (<Term primary="ones" secondary="ஒன்றுகள்" inline />)
              </span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-center text-xl font-bold">
              <span className="text-purple-600 dark:text-purple-400">300</span> + 
              <span className="text-blue-600 dark:text-blue-400"> 40</span> + 
              <span className="text-green-600 dark:text-green-400"> 5</span> = 
              <span className="text-2xl ml-2 text-indigo-600 dark:text-indigo-400">345</span>
            </p>
          </div>
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

      <Definition term={t('comparing.term')}>
        <p>{t('comparing.description')}</p>
        
        {/* Visual Comparison Examples */}
        <div className="mt-6 space-y-4">
          {/* Less Than */}
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="text-4xl font-bold text-red-600 dark:text-red-400">5</div>
              <div className="text-5xl text-red-500">{'<'}</div>
              <div className="text-4xl font-bold text-red-600 dark:text-red-400">8</div>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {t('comparing.example1')} - <MathRenderer math="<" /> {t('comparing.lessThan')}
            </p>
          </div>
          
          {/* Greater Than */}
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400">12</div>
              <div className="text-5xl text-green-500">{'>'}</div>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400">9</div>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {t('comparing.example2')} - <MathRenderer math=">" /> {t('comparing.greaterThan')}
            </p>
          </div>
          
          {/* Equal To */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">7</div>
              <div className="text-5xl text-blue-500">=</div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">7</div>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {t('comparing.example3')} - <MathRenderer math="=" /> {t('comparing.equals')}
            </p>
          </div>
        </div>
        
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
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Even Numbers */}
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-300 dark:border-blue-700">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-3xl">🔵</div>
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                <Term primary="even number" secondary="இரட்டை எண்" />
              </h3>
            </div>
            <p className="mb-4 text-gray-700 dark:text-gray-300">{t('evenOdd.even.definition')}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {[2, 4, 6, 8, 10, 12].map(num => (
                <div key={num} className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold shadow-md hover:scale-110 transition-transform cursor-pointer">
                  {num}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('evenOdd.even.examples')}</p>
          </div>
          
          {/* Odd Numbers */}
          <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-2 border-orange-300 dark:border-orange-700">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-3xl">🟠</div>
              <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">
                <Term primary="odd number" secondary="ஒற்றை எண்" />
              </h3>
            </div>
            <p className="mb-4 text-gray-700 dark:text-gray-300">{t('evenOdd.odd.definition')}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {[1, 3, 5, 7, 9, 11].map(num => (
                <div key={num} className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center font-bold shadow-md hover:scale-110 transition-transform cursor-pointer">
                  {num}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('evenOdd.odd.examples')}</p>
          </div>
        </div>
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

      {/* Progress Summary */}
      <div className="my-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-300 dark:border-green-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">🎉</div>
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">{t('conclusion.title')}</h2>
        </div>
        <p className="text-lg mb-4">{t('conclusion.message')}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-sm font-semibold">{t('conclusion.skill1')}</p>
          </div>
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-sm font-semibold">{t('conclusion.skill2')}</p>
          </div>
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-sm font-semibold">{t('conclusion.skill3')}</p>
          </div>
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-sm font-semibold">{t('conclusion.skill4')}</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-center font-semibold mb-2">{t('conclusion.nextStep')}</p>
          <div className="flex justify-center">
            <div className="text-4xl">➡️</div>
          </div>
        </div>
      </div>

      <LessonNavigation navigation={navigation} />
    </div>
    
    {showGlossary && <GlossaryPanel />}
    </>
  )
}
