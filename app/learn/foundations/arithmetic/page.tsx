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
