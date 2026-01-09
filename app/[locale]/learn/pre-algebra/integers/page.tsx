import MathRenderer from '@/components/math/MathRenderer'
import { 
  Definition, 
  Example, 
  KeyConcept, 
  Note, 
  StepByStep
} from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise } from '@/components/interactive'
import IntegerNumberLine from '@/components/visualizations/IntegerNumberLine'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'

export default function IntegersLesson() {
  const navigation = getLessonNavigation('pre-algebra', 'integers')

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
          <li><strong>Negative integers:</strong> -1, -2, -3, -4, ... (read as "negative one", "negative two", etc.)</li>
          <li><strong>Zero:</strong> Neither positive nor negative</li>
        </ul>
        <Note type="tip">
          When writing negative numbers in expressions, we often use parentheses: <MathRenderer math="(-5)" /> to make them clear.
        </Note>
      </Definition>

      <KeyConcept title="Number Line">
        Integers can be represented on a number line. Numbers to the right are greater, 
        numbers to the left are smaller.
      </KeyConcept>

      <IntegerNumberLine
        min={-10}
        max={10}
        start={0}
        operations={[]}
        showAnimation={false}
        label="Integer Number Line"
      />

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
          <li><MathRenderer math="5 + 3 = 8" /> (read as "five plus three equals eight")</li>
          <li><MathRenderer math="(-5) + (-3) = -8" /> (read as "negative five plus negative three equals negative eight")</li>
        </ul>
        <p className="mt-3"><strong>Different signs:</strong> Subtract and use the sign of the larger</p>
        <ul className="list-disc list-inside mt-2">
          <li><MathRenderer math="5 + (-3) = 2" /> (read as "five plus negative three equals two")</li>
          <li><MathRenderer math="(-5) + 3 = -2" /> (read as "negative five plus three equals negative two")</li>
        </ul>
      </Definition>

      <Note type="success">
        <p className="font-semibold">➕ Same Signs ADD, Different Signs SUBTRACT</p>
        <p className="mt-2">
          Easy way to remember adding integers:
        </p>
        <div className="mt-3 space-y-2">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
            <p className="font-semibold text-sm">✅ Same Signs: ADD and keep the sign</p>
            <p className="text-sm mt-1"><MathRenderer math="(-5) + (-3) = -(5+3) = -8" /></p>
            <p className="text-sm"><MathRenderer math="7 + 9 = +(7+9) = 16" /></p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
            <p className="font-semibold text-sm">➡️ Different Signs: SUBTRACT and use bigger's sign</p>
            <p className="text-sm mt-1"><MathRenderer math="(-8) + 5 = -(8-5) = -3" /> (8 is bigger, so negative)</p>
            <p className="text-sm"><MathRenderer math="9 + (-4) = +(9-4) = 5" /> (9 is bigger, so positive)</p>
          </div>
        </div>
      </Note>

      <IntegerNumberLine
        min={-10}
        max={10}
        start={-8}
        operations={[
          { value: 5, label: '+5' }
        ]}
        showAnimation={true}
        label="Adding Integers: (-8) + 5 = -3"
      />

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

      <Note type="tip">
        <p className="font-semibold">🔄 "Keep-Change-Change" Subtraction Trick</p>
        <p className="mt-2">
          When subtracting integers, use <strong>K-C-C</strong>:
        </p>
        <div className="mt-3 font-mono text-sm bg-gray-50 dark:bg-gray-900/30 p-4 rounded space-y-2">
          <p><strong>K</strong>eep the first number: <MathRenderer math="5 - (-3)" /></p>
          <p><strong>C</strong>hange subtraction to addition: <MathRenderer math="5 + (-3)" /></p>
          <p><strong>C</strong>hange the sign of second number: <MathRenderer math="5 + 3 = 8" /></p>
        </div>
        <p className="mt-3 text-sm">
          Two negatives make a positive! <MathRenderer math="- (-)" /> becomes <MathRenderer math="+" />
        </p>
      </Note>

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

      <Note type="success">
        <p className="font-semibold">✖️ Negative × Negative = Positive (The Enemy's Enemy Rule)</p>
        <p className="mt-2">
          Think of it like this: "The enemy of my enemy is my friend!"
        </p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
            <p className="font-semibold">Sign Rules Chart:</p>
            <div className="mt-2 grid grid-cols-2 gap-2 font-mono">
              <div><MathRenderer math="(+) \times (+) = (+)" /></div>
              <div><MathRenderer math="(+) \times (-) = (-)" /></div>
              <div><MathRenderer math="(-) \times (+) = (-)" /></div>
              <div className="font-bold"><MathRenderer math="(-) \times (-) = (+)" /> ✨</div>
            </div>
          </div>
          <p className="mt-2">
            <strong>Memory trick:</strong> Count the negatives. Even number of negatives = positive, odd = negative.
          </p>
          <p className="font-mono"><MathRenderer math="(-2) \times (-3) \times (-4) = -24" /> (3 negatives = odd = negative)</p>
        </div>
      </Note>

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

      <Note type="tip">
        <p className="font-semibold">🎯 PEMDAS with Negative Numbers</p>
        <p className="mt-2">
          When working with order of operations and negative numbers:
        </p>
        <div className="mt-3 space-y-3">
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
            <p className="font-semibold text-sm">Watch out for exponents!</p>
            <p className="text-sm mt-1"><MathRenderer math="-3^2 = -(3^2) = -9" /> (exponent only applies to 3)</p>
            <p className="text-sm"><MathRenderer math="(-3)^2 = (-3) \times (-3) = 9" /> (exponent applies to -3)</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Example: <MathRenderer math="-5 + 3 \times (-2)" /></p>
            <div className="mt-2 space-y-1 font-mono ml-4">
              <p>Step 1: Multiply first: <MathRenderer math="3 \times (-2) = -6" /></p>
              <p>Step 2: Then add: <MathRenderer math="-5 + (-6) = -11" /></p>
            </div>
          </div>
        </div>
      </Note>

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

      <Note type="tip">
        <p className="font-semibold">⚡ Quick Integer Computation Shortcuts</p>
        <div className="mt-2 space-y-3">
          <div>
            <p className="text-sm font-semibold">1. Adding opposites = 0</p>
            <p className="text-sm mt-1"><MathRenderer math="17 + (-17) = 0" />, <MathRenderer math="(-45) + 45 = 0" /></p>
          </div>
          <div>
            <p className="text-sm font-semibold">2. Subtracting is adding the opposite</p>
            <p className="text-sm mt-1"><MathRenderer math="a - b = a + (-b)" /></p>
          </div>
          <div>
            <p className="text-sm font-semibold">3. Multiplying by -1 flips the sign</p>
            <p className="text-sm mt-1"><MathRenderer math="-1 \times 25 = -25" />, <MathRenderer math="-1 \times (-30) = 30" /></p>
          </div>
          <div>
            <p className="text-sm font-semibold">4. Absolute value shortcut</p>
            <p className="text-sm mt-1"><MathRenderer math="|a - b|" /> = distance between a and b on number line</p>
            <p className="text-sm"><MathRenderer math="|-5 - 3| = |-8| = 8" /> (distance between -5 and 3)</p>
          </div>
        </div>
      </Note>

      <Note type="success">
        <p className="font-semibold">Well done!</p>
        <p className="mt-1">
          You've mastered integers and their operations! Understanding positive and negative numbers 
          is crucial for algebra and real-world applications like temperature, bank accounts, and elevations.
        </p>
      </Note>

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
