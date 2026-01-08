import MathRenderer from '@/components/math/MathRenderer'
import { 
  Definition, 
  Example, 
  KeyConcept, 
  Note, 
  StepByStep
} from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise } from '@/components/interactive'

export default function IntegersLesson() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Integers & Rational Numbers</h1>

      <Definition term="Integers">
        <p>
          <strong>Integers</strong> are whole numbers and their opposites, including zero.
        </p>
        <div className="mt-4 text-center">
          <p className="font-semibold">..., -3, -2, -1, 0, 1, 2, 3, ...</p>
        </div>
        <ul className="mt-4 space-y-2">
          <li><strong>Positive integers:</strong> 1, 2, 3, 4, ...</li>
          <li><strong>Negative integers:</strong> -1, -2, -3, -4, ...</li>
          <li><strong>Zero:</strong> Neither positive nor negative</li>
        </ul>
      </Definition>

      <KeyConcept title="Number Line">
        Integers can be represented on a number line. Numbers to the right are greater, 
        numbers to the left are smaller.
      </KeyConcept>

      <MultipleChoiceExercise
        question="Which integer is the smallest?"
        choices={[
          { id: 'a', text: '-5', isCorrect: true },
          { id: 'b', text: '0', isCorrect: false },
          { id: 'c', text: '-2', isCorrect: false },
          { id: 'd', text: '3', isCorrect: false }
        ]}
        explanation="On a number line, -5 is furthest to the left, making it the smallest."
        hint="Negative numbers are smaller than positive numbers. The more negative, the smaller."
      />

      <Definition term="Adding Integers">
        <p><strong>Same signs:</strong> Add and keep the sign</p>
        <ul className="list-disc list-inside mt-2">
          <li><MathRenderer math="5 + 3 = 8" /></li>
          <li><MathRenderer math="(-5) + (-3) = -8" /></li>
        </ul>
        <p className="mt-3"><strong>Different signs:</strong> Subtract and use the sign of the larger</p>
        <ul className="list-disc list-inside mt-2">
          <li><MathRenderer math="5 + (-3) = 2" /></li>
          <li><MathRenderer math="(-5) + 3 = -2" /></li>
        </ul>
      </Definition>

      <Example
        problem={<>Calculate <MathRenderer math="(-8) + 5" /></>}
        solution={
          <StepByStep
            steps={[
              {
                title: 'Identify the signs',
                content: <>Different signs: negative 8 and positive 5</>
              },
              {
                title: 'Find which has larger absolute value',
                content: <>8 &gt; 5, so the answer will be negative</>
              },
              {
                title: 'Subtract the smaller from the larger',
                content: <><MathRenderer math="8 - 5 = 3" /></>
              },
              {
                title: 'Apply the sign',
                content: <><MathRenderer math="(-8) + 5 = -3" /></>
              }
            ]}
          />
        }
      />

      <NumericInputExercise
        question={<>What is <MathRenderer math="(-12) + 7" />?</>}
        correctAnswer={-5}
        hint="Different signs: find the difference (12 - 7) and use the sign of -12"
        solution={
          <div>
            <p>12 - 7 = 5</p>
            <p className="mt-2">Since -12 has the larger absolute value, the answer is negative</p>
            <p className="mt-2 font-semibold">Answer: -5</p>
          </div>
        }
      />

      <Definition term="Subtracting Integers">
        <p>
          To subtract an integer, <strong>add its opposite</strong>.
        </p>
        <ul className="list-disc list-inside mt-2">
          <li><MathRenderer math="7 - 3 = 7 + (-3) = 4" /></li>
          <li><MathRenderer math="5 - (-2) = 5 + 2 = 7" /></li>
          <li><MathRenderer math="(-6) - 4 = (-6) + (-4) = -10" /></li>
        </ul>
      </Definition>

      <MultipleChoiceExercise
        question={<>What is <MathRenderer math="3 - (-5)" />?</>}
        choices={[
          { id: 'a', text: '-2', isCorrect: false },
          { id: 'b', text: '2', isCorrect: false },
          { id: 'c', text: '8', isCorrect: true },
          { id: 'd', text: '-8', isCorrect: false }
        ]}
        explanation={
          <>
            <MathRenderer math="3 - (-5) = 3 + 5 = 8" />
            <p className="mt-2">Subtracting a negative is the same as adding a positive!</p>
          </>
        }
        hint="Remember: Subtracting a negative number is like adding a positive"
      />

      <Definition term="Multiplying Integers">
        <p><strong>Rules for signs:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Positive × Positive = Positive: <MathRenderer math="3 \times 4 = 12" /></li>
          <li>Negative × Negative = Positive: <MathRenderer math="(-3) \times (-4) = 12" /></li>
          <li>Positive × Negative = Negative: <MathRenderer math="3 \times (-4) = -12" /></li>
          <li>Negative × Positive = Negative: <MathRenderer math="(-3) \times 4 = -12" /></li>
        </ul>
        <Note type="tip">
          Same signs give positive, different signs give negative!
        </Note>
      </Definition>

      <NumericInputExercise
        question={<>What is <MathRenderer math="(-6) \times (-7)" />?</>}
        correctAnswer={42}
        hint="Two negative numbers multiplied together give a positive result"
        solution={
          <div>
            <p>Multiply the absolute values: 6 × 7 = 42</p>
            <p className="mt-2">Same signs (both negative) = positive result</p>
            <p className="mt-2 font-semibold">Answer: 42</p>
          </div>
        }
      />

      <Definition term="Dividing Integers">
        <p>Division follows the same sign rules as multiplication:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Positive ÷ Positive = Positive</li>
          <li>Negative ÷ Negative = Positive</li>
          <li>Positive ÷ Negative = Negative</li>
          <li>Negative ÷ Positive = Negative</li>
        </ul>
      </Definition>

      <MultipleChoiceExercise
        question={<>What is <MathRenderer math="(-24) \div 6" />?</>}
        choices={[
          { id: 'a', text: '4', isCorrect: false },
          { id: 'b', text: '-4', isCorrect: true },
          { id: 'c', text: '6', isCorrect: false },
          { id: 'd', text: '-6', isCorrect: false }
        ]}
        explanation="Different signs give a negative result: (-24) ÷ 6 = -4"
        hint="Divide 24 by 6, then apply the negative sign (different signs)"
      />

      <Definition term="Rational Numbers">
        <p>
          A <strong>rational number</strong> is any number that can be written as a fraction{' '}
          <MathRenderer math="\frac{a}{b}" /> where <MathRenderer math="a" /> and <MathRenderer math="b" /> are integers 
          and <MathRenderer math="b \neq 0" />.
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">Examples of Rational Numbers:</p>
          <ul className="space-y-1">
            <li><MathRenderer math="\frac{3}{4}" /> (fraction)</li>
            <li><MathRenderer math="5" /> (can be written as <MathRenderer math="\frac{5}{1}" />)</li>
            <li><MathRenderer math="-2" /> (can be written as <MathRenderer math="\frac{-2}{1}" />)</li>
            <li><MathRenderer math="0.5" /> (equals <MathRenderer math="\frac{1}{2}" />)</li>
          </ul>
        </div>
      </Definition>

      <Note type="success">
        <p className="font-semibold">Well done!</p>
        <p className="mt-1">
          You've mastered integers and their operations! Understanding positive and negative numbers 
          is crucial for algebra and real-world applications like temperature, bank accounts, and elevations.
        </p>
      </Note>
    </div>
  )
}
