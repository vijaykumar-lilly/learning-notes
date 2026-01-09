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

export default function BasicArithmeticLesson() {
  const navigation = getLessonNavigation('foundations', 'arithmetic')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Basic Arithmetic</h1>

      <Definition term="Addition">
        <p>
          <strong>Addition</strong> is combining two or more numbers to find their total.
          We use the plus sign <MathRenderer math="+" /> (read as "plus").
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">Example:</p>
          <p><MathRenderer math="5 + 3 = 8" /></p>
          <p className="mt-2">If you have 5 apples and get 3 more, you have 8 apples total.</p>
        </div>
      </Definition>

      <ArithmeticVisualizer
        operation="addition"
        num1={5}
        num2={3}
        label="Visual: 5 + 3 = 8"
      />

      <KeyConcept title="Addition Properties">
        • <strong>Order doesn't matter:</strong> <MathRenderer math="3 + 5 = 5 + 3" /> (Commutative Property)<br/>
        • <strong>Adding zero:</strong> <MathRenderer math="7 + 0 = 7" /> (Identity Property)
      </KeyConcept>

      <NumericInputExercise
        question={<>What is <MathRenderer math="23 + 15" />?</>}
        correctAnswer={38}
        hint="Add the ones place first (3 + 5 = 8), then the tens place (2 + 1 = 3)"
        solution={
          <div>
            <p>Add ones: 3 + 5 = 8</p>
            <p>Add tens: 20 + 10 = 30</p>
            <p className="mt-2 font-semibold">Total: 30 + 8 = 38</p>
          </div>
        }
      />

      <Note type="tip">
        <p className="font-semibold">🧠 Mental Math: Adding Numbers Near 10</p>
        <p className="mt-2">
          When adding numbers close to 10, 100, or 1000, round up then subtract:
        </p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
            <p className="font-semibold">Example: <MathRenderer math="47 + 29" /></p>
            <div className="mt-2 space-y-1">
              <p>Step 1: Round 29 up to 30: <MathRenderer math="47 + 30 = 77" /></p>
              <p>Step 2: We added 1 too many, so subtract it: <MathRenderer math="77 - 1 = 76" /></p>
            </div>
          </div>
          <p className="mt-2">Works great for: 98+37 → (100+37)-2 = 135</p>
        </div>
      </Note>

      <Definition term="Subtraction">
        <p>
          <strong>Subtraction</strong> is taking away one number from another.
          We use the minus sign <MathRenderer math="-" /> (read as "minus").
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">Example:</p>
          <p><MathRenderer math="9 - 4 = 5" /></p>
          <p className="mt-2">If you have 9 cookies and eat 4, you have 5 left.</p>
        </div>
      </Definition>

      <ArithmeticVisualizer
        operation="subtraction"
        num1={9}
        num2={4}
        label="Visual: 9 − 4 = 5"
      />

      <MultipleChoiceExercise
        question={<>What is <MathRenderer math="42 - 18" />?</>}
        choices={[
          { id: 'a', text: '24', isCorrect: true },
          { id: 'b', text: '34', isCorrect: false },
          { id: 'c', text: '26', isCorrect: false },
          { id: 'd', text: '20', isCorrect: false }
        ]}
        explanation={
          <div>
            <p>Start with 42. Subtract 18:</p>
            <p>42 - 18 = 24</p>
          </div>
        }
        hint="Try breaking it down: 42 - 10 = 32, then 32 - 8 = 24"
      />

      <Note type="success">
        <p className="font-semibold">🎯 Subtraction Shortcut: Add to Both</p>
        <p className="mt-2">
          Make subtraction easier by adding the same amount to both numbers:
        </p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
            <p className="font-semibold">Example: <MathRenderer math="73 - 28" /></p>
            <div className="mt-2 space-y-1">
              <p>Add 2 to both: <MathRenderer math="75 - 30" /></p>
              <p>Much easier! <MathRenderer math="75 - 30 = 45" /></p>
            </div>
          </div>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded mt-2">
            <p className="font-semibold">Another: <MathRenderer math="84 - 37" /></p>
            <p className="mt-1">Add 3 to both: <MathRenderer math="87 - 40 = 47" /></p>
          </div>
        </div>
      </Note>

      <Definition term="Multiplication">
        <p>
          <strong>Multiplication</strong> is repeated addition. 
          We use <MathRenderer math="\times" /> or <MathRenderer math="\cdot" />.
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">Example:</p>
          <p><MathRenderer math="4 \times 3 = 12" /></p>
          <p className="mt-2">This means: 4 + 4 + 4 = 12 (adding 4 three times)</p>
        </div>
      </Definition>

      <ArithmeticVisualizer
        operation="multiplication"
        num1={4}
        num2={3}
        label="Visual: 4 × 3 = 12 (3 rows of 4)"
      />

      <Note type="success">
        <p className="font-semibold">✋ Multiply by 9: The Finger Trick!</p>
        <p className="mt-2">
          To multiply 9 × any number from 1-10, use your fingers:
        </p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded">
            <p className="font-semibold">Example: 9 × 7</p>
            <div className="mt-2 space-y-1">
              <p>1. Hold up all 10 fingers</p>
              <p>2. Put down the 7th finger (from left)</p>
              <p>3. Fingers to the left = tens digit (6)</p>
              <p>4. Fingers to the right = ones digit (3)</p>
              <p className="font-bold mt-2"><MathRenderer math="9 \times 7 = 63" /> 🎉</p>
            </div>
          </div>
          <p className="mt-2">Try it: 9×4 → put down 4th finger → 3 left, 6 right → 36 ✓</p>
        </div>
      </Note>

      <Example
        title="Multiplication Table Pattern"
        problem="Find the pattern in the 5 times table"
        solution={
          <div className="space-y-2">
            <p><MathRenderer math="5 \times 1 = 5" /></p>
            <p><MathRenderer math="5 \times 2 = 10" /></p>
            <p><MathRenderer math="5 \times 3 = 15" /></p>
            <p><MathRenderer math="5 \times 4 = 20" /></p>
            <p className="mt-3 font-semibold">Pattern: Products always end in 0 or 5!</p>
          </div>
        }
      />

      <Note type="tip">
        <p className="font-semibold">🔁 Doubling and Halving Trick</p>
        <p className="mt-2">
          Make multiplication easier by doubling one number and halving the other:
        </p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
            <p className="font-semibold">Example: <MathRenderer math="16 \times 25" /></p>
            <div className="mt-2 space-y-1">
              <p>Double 25, halve 16: <MathRenderer math="8 \times 50" /></p>
              <p>Double 50, halve 8: <MathRenderer math="4 \times 100 = 400" /></p>
            </div>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded mt-2">
            <p className="font-semibold">Quick ones:</p>
            <p className="mt-1"><MathRenderer math="14 \times 5 = 7 \times 10 = 70" /></p>
            <p><MathRenderer math="32 \times 15 = 16 \times 30 = 480" /></p>
          </div>
        </div>
      </Note>

      <NumericInputExercise
        question={<>What is <MathRenderer math="7 \times 8" />?</>}
        correctAnswer={56}
        hint="Think: 7 × 8 = (7 × 4) + (7 × 4) = 28 + 28"
        solution={
          <div>
            <p><MathRenderer math="7 \times 8 = 56" /></p>
            <p className="mt-2">You can also think: 8 × 7 = 56</p>
          </div>
        }
      />

      <Definition term="Division">
        <p>
          <strong>Division</strong> is splitting a number into equal parts.
          We use <MathRenderer math="\div" /> or <MathRenderer math="/" /> (read as "divided by").
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">Example:</p>
          <p><MathRenderer math="12 \div 3 = 4" /></p>
          <p className="mt-2">If you share 12 candies among 3 friends, each gets 4 candies.</p>
        </div>
      </Definition>

      <Note type="success">
        <p className="font-semibold">✅ Quick Divisibility Rules</p>
        <p className="mt-2">
          Check if a number is divisible without dividing:
        </p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="font-semibold">By 2:</p>
              <p>Last digit is 0, 2, 4, 6, or 8</p>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
              <p className="font-semibold">By 3:</p>
              <p>Sum of digits divisible by 3</p>
              <p className="text-xs mt-1">123: 1+2+3=6 (divisible!)</p>
            </div>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <p className="font-semibold">By 5:</p>
              <p>Ends in 0 or 5</p>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
              <p className="font-semibold">By 9:</p>
              <p>Sum of digits divisible by 9</p>
              <p className="text-xs mt-1">729: 7+2+9=18 (yes!)</p>
            </div>
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
              <p className="font-semibold">By 10:</p>
              <p>Ends in 0</p>
            </div>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded">
              <p className="font-semibold">By 6:</p>
              <p>Divisible by both 2 AND 3</p>
            </div>
          </div>
        </div>
      </Note>

      <ArithmeticVisualizer
        operation="division"
        num1={12}
        num2={3}
        label="Visual: 12 ÷ 3 = 4 groups"
      />

      <KeyConcept title="Division and Multiplication">
        Division is the opposite of multiplication!<br/>
        If <MathRenderer math="3 \times 4 = 12" />, then <MathRenderer math="12 \div 3 = 4" />
      </KeyConcept>

      <MultipleChoiceExercise
        question={<>What is <MathRenderer math="45 \div 5" />?</>}
        choices={[
          { id: 'a', text: '7', isCorrect: false },
          { id: 'b', text: '8', isCorrect: false },
          { id: 'c', text: '9', isCorrect: true },
          { id: 'd', text: '10', isCorrect: false }
        ]}
        explanation={<>45 ÷ 5 = 9 because 5 × 9 = 45</>}
        hint="Think: 5 times what number equals 45?"
      />

      <Example
        problem={<>Solve <MathRenderer math="56 \div 7" /> using long division</>}
        solution={
          <StepByStep
            steps={[
              {
                title: 'Ask: How many 7s fit in 56?',
                content: <>Think through the 7 times table</>
              },
              {
                title: 'Find the answer',
                content: <><MathRenderer math="7 \times 8 = 56" /></>
              },
              {
                title: 'Write the answer',
                content: <><MathRenderer math="56 \div 7 = 8" /></>
              }
            ]}
          />
        }
        hint="Which number times 7 gives you 56?"
      />

      <NumericInputExercise
        question={<>What is <MathRenderer math="81 \div 9" />?</>}
        correctAnswer={9}
        hint="9 times what number equals 81?"
        solution={
          <div>
            <p>Think: <MathRenderer math="9 \times 9 = 81" /></p>
            <p className="mt-2">Therefore: <MathRenderer math="81 \div 9 = 9" /></p>
          </div>
        }
      />

      <Note type="tip">
        <p className="font-semibold">🏆 PEMDAS/BODMAS Memory Trick</p>
        <p className="mt-2">
          Order of Operations: <strong>P</strong>arentheses, <strong>E</strong>xponents, <strong>M</strong>ultiply/<strong>D</strong>ivide, <strong>A</strong>dd/<strong>S</strong>ubtract
        </p>
        <div className="mt-3 space-y-3">
          <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded">
            <p className="font-semibold text-sm">Memory phrase:</p>
            <p className="mt-1 text-sm">"<strong>P</strong>lease <strong>E</strong>xcuse <strong>M</strong>y <strong>D</strong>ear <strong>A</strong>unt <strong>S</strong>ally"</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Example: <MathRenderer math="3 + 4 \times 2" /></p>
            <div className="mt-2 space-y-1 ml-4">
              <p>❌ Wrong: <MathRenderer math="(3 + 4) \times 2 = 14" /></p>
              <p>✅ Right: <MathRenderer math="3 + (4 \times 2) = 3 + 8 = 11" /></p>
              <p className="text-xs mt-2">Multiply before adding!</p>
            </div>
          </div>
        </div>
      </Note>

      <Note type="info">
        <p className="font-semibold">Order of Operations Tip</p>
        <p className="mt-2">
          When you have multiple operations, remember: Multiply and divide from left to right, 
          then add and subtract from left to right.
        </p>
      </Note>

      <Note type="success">
        <p className="font-semibold">Excellent work!</p>
        <p className="mt-1">
          You've learned the four basic operations: addition, subtraction, multiplication, and division. 
          These are the foundation of all mathematics. Keep practicing your times tables!
        </p>
      </Note>

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
