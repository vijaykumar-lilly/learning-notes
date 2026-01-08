import MathRenderer from '@/components/math/MathRenderer'
import { 
  Definition, 
  Example, 
  KeyConcept, 
  Note, 
  StepByStep
} from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise } from '@/components/interactive'

export default function NumberSenseLesson() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Number Sense & Place Value</h1>

      <Definition term="Number">
        <p>
          A <strong>number</strong> is a mathematical object used to count, measure, and label.
          Numbers help us understand quantities and order.
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">Examples:</p>
          <p>Counting: 1, 2, 3, 4, 5...</p>
          <p>Measuring: 10 meters, 3.5 kilograms</p>
          <p>Labeling: Room 101, Page 25</p>
        </div>
      </Definition>

      <KeyConcept title="Counting from 1 to 100">
        Numbers follow a pattern. After 9, we use two digits. The first digit shows how many "tens" 
        and the second shows how many "ones".
      </KeyConcept>

      <MultipleChoiceExercise
        question="What number comes after 19?"
        choices={[
          { id: 'a', text: '18', isCorrect: false },
          { id: 'b', text: '20', isCorrect: true },
          { id: 'c', text: '21', isCorrect: false },
          { id: 'd', text: '29', isCorrect: false }
        ]}
        explanation="After 19 comes 20. The pattern is: 17, 18, 19, 20, 21..."
        hint="Think about counting: seventeen, eighteen, nineteen, ..."
      />

      <Definition term="Place Value">
        <p>
          <strong>Place value</strong> tells us what each digit in a number represents based on its position.
        </p>
        <div className="mt-4">
          <p className="font-semibold mb-2">For the number 345:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>3</strong> is in the <strong>hundreds place</strong> = 300</li>
            <li><strong>4</strong> is in the <strong>tens place</strong> = 40</li>
            <li><strong>5</strong> is in the <strong>ones place</strong> = 5</li>
          </ul>
          <p className="mt-3">So: 345 = 300 + 40 + 5</p>
        </div>
      </Definition>

      <Example
        problem="What is the value of the digit 7 in the number 572?"
        solution={
          <StepByStep
            steps={[
              {
                title: 'Identify the position of 7',
                content: <>In 572, the digit 7 is in the <strong>tens place</strong></>
              },
              {
                title: 'Calculate the value',
                content: <>7 in the tens place means 7 × 10 = <strong>70</strong></>
              }
            ]}
          />
        }
        hint="Look at which position the 7 is in: ones, tens, or hundreds?"
      />

      <NumericInputExercise
        question="In the number 286, what is the value of the digit 2?"
        correctAnswer={200}
        hint="The digit 2 is in the hundreds place. What is 2 × 100?"
        solution={
          <div>
            <p>The digit 2 is in the <strong>hundreds place</strong>.</p>
            <p className="mt-2">2 hundreds = 2 × 100 = 200</p>
          </div>
        }
      />

      <Definition term="Comparing Numbers" example={
        <div>
          <p><MathRenderer math="5 < 8" /> (5 is less than 8)</p>
          <p><MathRenderer math="12 > 9" /> (12 is greater than 9)</p>
          <p><MathRenderer math="7 = 7" /> (7 is equal to 7)</p>
        </div>
      }>
        <p>We use symbols to compare numbers:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><MathRenderer math="<" /> means "less than"</li>
          <li><MathRenderer math=">" /> means "greater than"</li>
          <li><MathRenderer math="=" /> means "equal to"</li>
        </ul>
        <Note type="tip">
          The symbol always points to the smaller number, like an arrow!
        </Note>
      </Definition>

      <MultipleChoiceExercise
        question="Which symbol makes this true: 45 ___ 54?"
        choices={[
          { id: 'a', text: <MathRenderer math="<" />, isCorrect: true },
          { id: 'b', text: <MathRenderer math=">" />, isCorrect: false },
          { id: 'c', text: <MathRenderer math="=" />, isCorrect: false }
        ]}
        explanation={<>45 &lt; 54 because 45 is less than 54. The symbol points to the smaller number (45).</>}
        hint="Which number is smaller? The symbol should point to it."
      />

      <Definition term="Even and Odd Numbers">
        <ul className="space-y-3">
          <li>
            <strong>Even Numbers</strong>: Can be divided by 2 with no remainder
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Examples: 2, 4, 6, 8, 10, 12... (end in 0, 2, 4, 6, or 8)
            </div>
          </li>
          <li>
            <strong>Odd Numbers</strong>: Cannot be divided evenly by 2
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Examples: 1, 3, 5, 7, 9, 11... (end in 1, 3, 5, 7, or 9)
            </div>
          </li>
        </ul>
      </Definition>

      <MultipleChoiceExercise
        question="Which of these numbers is odd?"
        choices={[
          { id: 'a', text: '24', isCorrect: false },
          { id: 'b', text: '36', isCorrect: false },
          { id: 'c', text: '47', isCorrect: true },
          { id: 'd', text: '50', isCorrect: false }
        ]}
        explanation="47 is odd because it ends in 7. Odd numbers end in 1, 3, 5, 7, or 9."
        hint="Look at the last digit of each number."
      />

      <NumericInputExercise
        question="What is the smallest three-digit even number?"
        correctAnswer={100}
        hint="Think about the smallest three-digit number, and check if it's even."
        solution={
          <div>
            <p>The smallest three-digit number is 100.</p>
            <p className="mt-2">100 ends in 0, so it's even.</p>
            <p className="mt-2">Answer: 100</p>
          </div>
        }
      />

      <Note type="success">
        <p className="font-semibold">Great job!</p>
        <p className="mt-1">
          You've learned about numbers, place value, comparing, and even/odd numbers. 
          These are the building blocks for all math! Practice counting and identifying 
          place values every day.
        </p>
      </Note>
    </div>
  )
}
