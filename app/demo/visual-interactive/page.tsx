import { ProgressBar, Tabs, CollapsibleSection } from '@/components/ui'
import { NumberLine } from '@/components/visualizations'
import MathRenderer from '@/components/math/MathRenderer'
import { Definition, KeyConcept, Note } from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise } from '@/components/interactive'

export default function VisualInteractiveDemoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Visual & Interactive Features Demo
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Explore the enhanced visual and interactive components designed to make learning more engaging!
      </p>

      {/* Progress Bar Demo */}
      <CollapsibleSection 
        title="Progress Tracking" 
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
      >
        <div className="space-y-6">
          <ProgressBar current={3} total={10} label="Lesson Progress" />
          <ProgressBar current={7} total={10} label="Exercises Completed" />
          <ProgressBar current={10} total={10} label="Section Complete!" />
        </div>
      </CollapsibleSection>

      {/* Number Line Visualization */}
      <CollapsibleSection 
        title="Number Line Visualization" 
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        }
      >
        <Definition term="Interactive Number Lines">
          <p>Visual number lines help understand integer operations, comparisons, and magnitude.</p>
        </Definition>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">Positive Numbers</h4>
        <NumberLine min={0} max={10} value={7} highlights={[3, 5]} />

        <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Integers (Including Negatives)</h4>
        <NumberLine min={-10} max={10} value={-3} highlights={[0, 5]} />
      </CollapsibleSection>

      {/* Tabbed Content Demo */}
      <CollapsibleSection 
        title="Organized Content with Tabs"
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
      >
        <Tabs
          tabs={[
            {
              id: 'concept',
              label: '📚 Concept',
              content: (
                <KeyConcept title="Understanding Fractions">
                  Fractions represent parts of a whole. The numerator tells us how many parts we have,
                  and the denominator tells us how many equal parts make up the whole.
                </KeyConcept>
              )
            },
            {
              id: 'examples',
              label: '✏️ Examples',
              content: (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <p className="font-semibold mb-2">Example 1: Pizza Slices</p>
                    <p>If a pizza is cut into 8 slices and you eat 3, you ate <MathRenderer math="\frac{3}{8}" /> of the pizza.</p>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <p className="font-semibold mb-2">Example 2: Hour on Clock</p>
                    <p>30 minutes is <MathRenderer math="\frac{30}{60} = \frac{1}{2}" /> of an hour.</p>
                  </div>
                </div>
              )
            },
            {
              id: 'practice',
              label: '🎯 Practice',
              content: (
                <MultipleChoiceExercise
                  question={<>Which fraction represents one-quarter?</>}
                  choices={[
                    { id: 'a', text: <MathRenderer math="\frac{1}{2}" />, isCorrect: false },
                    { id: 'b', text: <MathRenderer math="\frac{1}{4}" />, isCorrect: true },
                    { id: 'c', text: <MathRenderer math="\frac{1}{3}" />, isCorrect: false },
                    { id: 'd', text: <MathRenderer math="\frac{2}{4}" />, isCorrect: false }
                  ]}
                  explanation="One-quarter means 1 out of 4 equal parts, which is 1/4."
                  hint="Quarter means 4 parts"
                />
              )
            }
          ]}
        />
      </CollapsibleSection>

      {/* Interactive Exercise with Celebration */}
      <CollapsibleSection 
        title="Interactive Exercises with Celebrations"
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      >
        <Note type="tip">
          <p className="font-semibold">Try getting an answer correct!</p>
          <p className="mt-1">You'll see a celebration animation with confetti when you get the right answer! 🎉</p>
        </Note>

        <NumericInputExercise
          question={<>What is <MathRenderer math="5 + 7" />?</>}
          correctAnswer={12}
          hint="Add the two numbers together"
          solution={<p><MathRenderer math="5 + 7 = 12" /></p>}
        />

        <MultipleChoiceExercise
          question={<>What is <MathRenderer math="3 \times 4" />?</>}
          choices={[
            { id: 'a', text: '7', isCorrect: false },
            { id: 'b', text: '12', isCorrect: true },
            { id: 'c', text: '10', isCorrect: false },
            { id: 'd', text: '15', isCorrect: false }
          ]}
          explanation="3 × 4 = 12 (3 groups of 4, or 4 + 4 + 4)"
          hint="Think of multiplication as repeated addition"
        />
      </CollapsibleSection>

      {/* Summary */}
      <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          ✨ Visual Enhancements Summary
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Progress Bars:</strong> Track completion with animated gradients</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Celebrations:</strong> Confetti animations for correct answers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Number Lines:</strong> Visual representation of numbers and operations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Tabs:</strong> Organize content into digestible sections</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Collapsible Sections:</strong> Reduce cognitive load with expandable content</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
