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
import DecimalVisualizer from '@/components/visualizations/DecimalVisualizer'
import InteractiveDecimalSlider from '@/components/interactive/InteractiveDecimalSlider'

export default function DecimalsLesson() {
  const navigation = getLessonNavigation('foundations', 'decimals')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Decimals</h1>

      <Definition term="Decimal Number">
        <p>
          A <strong>decimal number</strong> is a number that contains a decimal point, separating 
          the whole number part from the fractional part. Decimals are another way to represent 
          parts of a whole, just like fractions.
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">Example:</p>
          <p>3.75 reads as "three point seven five"</p>
          <ul className="mt-2 space-y-1">
            <li><strong>3</strong> is the whole number part</li>
            <li><strong>.75</strong> is the fractional part</li>
          </ul>
        </div>
      </Definition>

      <InteractiveDecimalSlider maxValue={5} step={0.01} />

      <KeyConcept title="Decimal Place Value">
        <p>
          Each digit in a decimal number has a place value based on its position relative to the decimal point.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Hundreds</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Tens</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Ones</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30">•</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Tenths</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Hundredths</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Thousandths</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">2</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">4</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">6</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center bg-yellow-100 dark:bg-yellow-900/30">•</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">3</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">7</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          The number 246.357 is read as "two hundred forty-six point three five seven" or 
          "two hundred forty-six and three hundred fifty-seven thousandths"
        </p>
      </KeyConcept>

      <Note type="info">
        <p className="font-semibold">💡 Pronunciation Tip:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>The decimal point (•) is read as "point" or "and"</li>
          <li>0.5 = "zero point five" or "five tenths"</li>
          <li>3.14 = "three point one four"</li>
        </ul>
      </Note>

      <Note type="success">
        <p className="font-semibold">🎯 Easy Trick - Place Value Memory:</p>
        <p className="mt-2">Remember: <strong>"Tiny Hungry Tigers"</strong></p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li><strong>T</strong>enths (first place after decimal)</li>
          <li><strong>H</strong>undredths (second place)</li>
          <li><strong>T</strong>housandths (third place)</li>
        </ul>
        <p className="mt-2 text-sm">Each place is 10 times smaller than the one before!</p>
      </Note>

      <DecimalVisualizer value={2.35} type="bar" showGrid={true} />

      <MultipleChoiceExercise
        question="What is the place value of the digit 7 in 42.378?"
        choices={[
          { id: 'a', text: 'Tenths', isCorrect: false },
          { id: 'b', text: 'Hundredths', isCorrect: true },
          { id: 'c', text: 'Thousandths', isCorrect: false },
          { id: 'd', text: 'Ones', isCorrect: false }
        ]}
        explanation="In 42.378, the 7 is in the hundredths place (second digit after the decimal point). The 3 is in tenths, 7 is in hundredths, and 8 is in thousandths."
        hint="Count positions from the decimal point: first position = tenths, second position = hundredths"
      />

      <Definition term="Converting Fractions to Decimals">
        <p>
          To convert a fraction to a decimal, divide the numerator by the denominator.
        </p>
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="font-semibold mb-2">Common Conversions:</p>
          <ul className="space-y-1">
            <li><MathRenderer math="\frac{1}{2} = 0.5" /> (1 ÷ 2)</li>
            <li><MathRenderer math="\frac{1}{4} = 0.25" /> (1 ÷ 4)</li>
            <li><MathRenderer math="\frac{3}{4} = 0.75" /> (3 ÷ 4)</li>
            <li><MathRenderer math="\frac{1}{10} = 0.1" /> (1 ÷ 10)</li>
            <li><MathRenderer math="\frac{1}{100} = 0.01" /> (1 ÷ 100)</li>
          </ul>
        </div>
      </Definition>

      <Note type="info">
        <p className="font-semibold">⚡ Quick Conversion Tricks:</p>
        <ul className="mt-2 space-y-2 list-disc list-inside">
          <li><strong>Halves:</strong> 1/2 = 0.5 (just divide by 2!)</li>
          <li><strong>Fifths:</strong> Multiply numerator by 2, then by 10: 3/5 = (3×2)/10 = 0.6</li>
          <li><strong>Fourths:</strong> Think quarters! 1/4 = $0.25</li>
          <li><strong>Tenths:</strong> Just move decimal: 7/10 = 0.7</li>
          <li><strong>Hundredths:</strong> Add a zero: 23/100 = 0.23</li>
        </ul>
      </Note>

      <DecimalVisualizer value={0.75} type="blocks" showGrid={true} />

      <Example 
        title="Converting a Fraction to a Decimal"
        problem={<p>Convert <MathRenderer math="\frac{3}{8}" /> to a decimal</p>}
        solution={
          <StepByStep
            steps={[
              {
                title: 'Set up the division',
                content: <p>Divide 3 by 8: <MathRenderer math="3 \div 8" /></p>
              },
              {
                title: 'Perform the division',
                content: <p>3 ÷ 8 = 0.375</p>
              },
              {
                title: 'Write the answer',
                content: <p><MathRenderer math="\frac{3}{8} = 0.375" /></p>
              }
            ]}
          />
        }
      />

      <Definition term="Converting Decimals to Fractions">
        <p>
          To convert a decimal to a fraction:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Write the decimal as a fraction with denominator based on place value</li>
          <li>Simplify the fraction if possible</li>
        </ol>
      </Definition>

      <Example 
        title="Converting a Decimal to a Fraction"
        problem={<p>Convert 0.625 to a fraction</p>}
        solution={
          <StepByStep
            steps={[
              {
                title: 'Identify the place value',
                content: <p>0.625 has 3 decimal places, so it's thousandths: <MathRenderer math="\frac{625}{1000}" /></p>
              },
              {
                title: 'Simplify',
                content: (
                  <div className="space-y-2">
                    <p>GCF of 625 and 1000 is 125</p>
                    <p><MathRenderer math="\frac{625 \div 125}{1000 \div 125} = \frac{5}{8}" /></p>
                  </div>
                )
              },
              {
                title: 'Final answer',
                content: <p><MathRenderer math="0.625 = \frac{5}{8}" /></p>
              }
            ]}
          />
        }
      />

      <MultipleChoiceExercise
        question={<>What is <MathRenderer math="\frac{1}{5}" /> as a decimal?</>}
        choices={[
          { id: 'a', text: '0.2', isCorrect: true },
          { id: 'b', text: '0.5', isCorrect: false },
          { id: 'c', text: '0.15', isCorrect: false },
          { id: 'd', text: '0.25', isCorrect: false }
        ]}
        explanation="1 ÷ 5 = 0.2"
        hint="Divide 1 by 5"
      />

      <KeyConcept title="Comparing Decimals">
        <p>To compare decimals:</p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Line up the decimal points</li>
          <li>Compare digits from left to right</li>
          <li>Add zeros to make equal lengths if needed</li>
        </ol>
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="font-semibold mb-2">Example: Which is greater, 0.5 or 0.45?</p>
          <div className="font-mono">
            <p>0.50</p>
            <p>0.45</p>
          </div>
          <p className="mt-2">Compare tenths: 5 &gt; 4, so 0.5 &gt; 0.45</p>
        </div>
      </KeyConcept>

      <MultipleChoiceExercise
        question="Which decimal is the largest?"
        choices={[
          { id: 'a', text: '0.3', isCorrect: false },
          { id: 'b', text: '0.35', isCorrect: true },
          { id: 'c', text: '0.305', isCorrect: false },
          { id: 'd', text: '0.03', isCorrect: false }
        ]}
        explanation="0.35 = 0.350 is the largest. Compare: 0.300, 0.350, 0.305, 0.030"
        hint="Add zeros to compare: 0.300, 0.350, 0.305, 0.030"
      />
      <DecimalVisualizer value={1.5} type="bar" showGrid={true} />
      <Note type="success">
        <p className="font-semibold">🎯 Comparing Trick - "Add Zeros Method":</p>
        <div className="mt-2 space-y-2">
          <p><strong>Method 1:</strong> Add zeros to make same length</p>
          <p className="ml-4">0.5 vs 0.47 → 0.50 vs 0.47 → 0.50 is bigger!</p>
          <p className="mt-2"><strong>Method 2:</strong> Remove decimal, compare as whole numbers</p>
          <p className="ml-4">0.8 vs 0.75 → 80 vs 75 (think: 80 cents vs 75 cents)</p>
          <p className="mt-2"><strong>Method 3:</strong> Use number line visualization</p>
          <p className="ml-4">Which is closer to 1? That's the bigger one!</p>
        </div>
      </Note>

      <Definition term="Adding and Subtracting Decimals">
        <p>
          To add or subtract decimals:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Line up the decimal points vertically</li>
          <li>Add zeros to make equal lengths if needed</li>
          <li>Add or subtract as with whole numbers</li>
          <li>Bring down the decimal point to the answer</li>
        </ol>
      </Definition>

      <DecimalVisualizer value={3.45} type="money" />

      <Example 
        title="Adding Decimals"
        problem={<p>Calculate: 3.7 + 2.45</p>}
        solution={
          <div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono">
              <p className="text-right">  3.70</p>
              <p className="text-right">+ 2.45</p>
              <p className="text-right border-t border-gray-300 dark:border-gray-600 pt-1">  6.15</p>
            </div>
            <p className="mt-2">Answer: 6.15</p>
          </div>
        }
      />

      <NumericInputExercise
        question="What is 4.6 + 2.85?"
        correctAnswer={7.45}
        tolerance={0.01}
        hint="Line up the decimal points: 4.60 + 2.85"
        solution={
          <div className="font-mono">
            <p className="text-right">  4.60</p>
            <p className="text-right">+ 2.85</p>
            <p className="text-right border-t border-gray-300 dark:border-gray-600 pt-1">  7.45</p>
          </div>
        }
      />

      <Note type="info">
        <p className="font-semibold">💡 Adding/Subtracting Trick - "Line Up Method":</p>
        <div className="mt-2 space-y-2">
          <p><strong>Step 1:</strong> Write numbers in a column</p>
          <p><strong>Step 2:</strong> Line up decimal points (one under the other)</p>
          <p><strong>Step 3:</strong> Add zeros to make same length (optional but helpful!)</p>
          <p><strong>Step 4:</strong> Ignore decimal, add/subtract normally</p>
          <p><strong>Step 5:</strong> Bring decimal straight down</p>
          <p className="mt-2 text-sm bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
            <strong>Memory trick:</strong> "Decimals are shy - they never move during +/−"</p>
        </div>
      </Note>

      <Definition term="Multiplying Decimals">
        <p>
          To multiply decimals:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Multiply as if they were whole numbers</li>
          <li>Count total decimal places in both factors</li>
          <li>Place the decimal point with that many decimal places</li>
        </ol>
      </Definition>

      <Example 
        title="Multiplying Decimals"
        problem={<p>Calculate: 2.5 × 3.2</p>}
        solution={
          <div className="space-y-2">
            <p>Step 1: 25 × 32 = 800</p>
            <p>Step 2: Count decimal places: 2.5 (1) + 3.2 (1) = 2 total</p>
            <p>Step 3: Place decimal: 8.00 = 8</p>
            <p className="font-semibold mt-2">Answer: 2.5 × 3.2 = 8</p>
          </div>
        }
      />

      <MultipleChoiceExercise
        question="What is 0.4 × 0.5?"
        choices={[
          { id: 'a', text: '0.2', isCorrect: true },
          { id: 'b', text: '2.0', isCorrect: false },
          { id: 'c', text: '0.02', isCorrect: false },
          { id: 'd', text: '0.9', isCorrect: false }
        ]}
        explanation="4 × 5 = 20. With 2 decimal places total, answer is 0.20 = 0.2"
        hint="Multiply 4 × 5, then count decimal places"
      />

      <Note type="success">
        <p className="font-semibold">⚡ Multiplying Trick - "Count & Place":</p>
        <div className="mt-2 space-y-2">
          <p><strong>Super Easy 3-Step Method:</strong></p>
          <ol className="list-decimal list-inside ml-2 space-y-1">
            <li>Ignore decimals, multiply whole numbers: 2.5 × 3.2 → 25 × 32 = 800</li>
            <li>Count decimal places: 2.5 (1) + 3.2 (1) = 2 total</li>
            <li>Put decimal back: 800 → 8.00 = 8</li>
          </ol>
          <p className="mt-3 bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm">
            <strong>Quick Check:</strong> If multiplying by 0.1, move decimal LEFT 1 place<br />
            Example: 5 × 0.1 = 0.5 (5.0 → 0.5)
          </p>
        </div>
      </Note>

      <Definition term="Dividing Decimals">
        <p>
          To divide decimals:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Move the decimal in the divisor to make it a whole number</li>
          <li>Move the decimal in the dividend the same number of places</li>
          <li>Divide as with whole numbers</li>
        </ol>
      </Definition>

      <Example 
        title="Dividing Decimals"
        problem={<p>Calculate: 6.4 ÷ 0.2</p>}
        solution={
          <div className="space-y-2">
            <p>Step 1: Move decimal in 0.2 one place right → 2</p>
            <p>Step 2: Move decimal in 6.4 one place right → 64</p>
            <p>Step 3: Divide: 64 ÷ 2 = 32</p>
            <p className="font-semibold mt-2">Answer: 32</p>
          </div>
        }
      />

      <NumericInputExercise
        question="What is 12.6 ÷ 3?"
        correctAnswer={4.2}
        tolerance={0.01}
        hint="Divide 12.6 by 3 directly"
        solution={
          <div>
            <p>12.6 ÷ 3 = 4.2</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Check: 4.2 × 3 = 12.6 ✓
            </p>
          </div>
        }
      />

      <Note type="info">
        <p className="font-semibold">💡 Division Tricks - Multiple Methods:</p>
        <div className="mt-2 space-y-3">
          <div>
            <p className="font-semibold">Method 1: "Make it Whole"</p>
            <p className="ml-2">6.4 ÷ 0.2 → Move decimals right → 64 ÷ 2 = 32</p>
          </div>
          <div>
            <p className="font-semibold">Method 2: "Multiply Both"</p>
            <p className="ml-2">0.8 ÷ 0.4 → Multiply by 10 → 8 ÷ 4 = 2</p>
          </div>
          <div>
            <p className="font-semibold">Method 3: "Fraction Trick"</p>
            <p className="ml-2">1.5 ÷ 0.5 = 15/10 ÷ 5/10 = 15 ÷ 5 = 3</p>
          </div>
          <p className="mt-2 bg-purple-50 dark:bg-purple-900/20 p-2 rounded text-sm">
            <strong>Quick tip:</strong> Dividing by 0.1 = Multiply by 10<br />
            Example: 5 ÷ 0.1 = 50 (move decimal right!)
          </p>
        </div>
      </Note>

      <Note type="warning">
        <p className="font-semibold">Common Mistakes:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Not lining up decimal points when adding/subtracting</li>
          <li>Forgetting to count decimal places when multiplying</li>
          <li>Comparing 0.3 and 0.25 incorrectly (0.3 = 0.30 &gt; 0.25)</li>
        </ul>
      </Note>

      <Note type="success">
        <p className="font-semibold">🚀 Mental Math Shortcuts:</p>
        <div className="mt-2 space-y-2">
          <p><strong>× by 0.5:</strong> Divide by 2 (half it!)</p>
          <p className="ml-4 text-sm">8 × 0.5 = 8 ÷ 2 = 4</p>
          
          <p><strong>× by 0.25:</strong> Divide by 4 (quarter it!)</p>
          <p className="ml-4 text-sm">20 × 0.25 = 20 ÷ 4 = 5</p>
          
          <p><strong>× by 0.1:</strong> Move decimal left 1 place</p>
          <p className="ml-4 text-sm">47 × 0.1 = 4.7</p>
          
          <p><strong>÷ by 0.5:</strong> Multiply by 2 (double it!)</p>
          <p className="ml-4 text-sm">6 ÷ 0.5 = 6 × 2 = 12</p>
          
          <p><strong>+ 0.99:</strong> Add 1, subtract 0.01</p>
          <p className="ml-4 text-sm">5 + 0.99 = 6 − 0.01 = 5.99</p>
        </div>
      </Note>

      <MultipleChoiceExercise
        question="A book costs $12.50 and a pen costs $2.75. What is the total?"
        choices={[
          { id: 'a', text: '$14.25', isCorrect: false },
          { id: 'b', text: '$15.25', isCorrect: true },
          { id: 'c', text: '$15.35', isCorrect: false },
          { id: 'd', text: '$14.75', isCorrect: false }
        ]}
        explanation="$12.50 + $2.75 = $15.25"
        hint="Line up: 12.50 + 2.75"
      />

      <Note type="success">
        <p className="font-semibold">Excellent work!</p>
        <p className="mt-1">
          You've learned about decimal numbers, place value, converting between fractions and decimals, 
          and all four operations with decimals. Decimals are essential for money, measurements, and 
          many real-world applications!
        </p>
      </Note>

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
