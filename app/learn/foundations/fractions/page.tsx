import MathRenderer from '@/components/math/MathRenderer'
import { 
  Definition, 
  Theorem, 
  Example, 
  KeyConcept, 
  Note, 
  StepByStep
} from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise, InteractiveFractionSlider } from '@/components/interactive'
import FractionVisualizer from '@/components/visualizations/FractionVisualizer'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'

export default function FractionsBasicsLesson() {
  const navigation = getLessonNavigation('foundations', 'fractions')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Introduction to Fractions</h1>

      <Definition term="Fraction">
        <p>
          A <strong>fraction</strong> represents a part of a whole. It consists of two parts:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Numerator</strong>: The top number, representing how many parts we have</li>
          <li><strong>Denominator</strong>: The bottom number, representing how many equal parts the whole is divided into</li>
        </ul>
        <div className="mt-4 text-center">
          <MathRenderer math="\frac{\text{numerator}}{\text{denominator}}" block />
        </div>
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900/30 rounded">
          <p className="text-sm"><strong>How to read fractions:</strong></p>
          <ul className="text-sm mt-2 space-y-1">
            <li><MathRenderer math="\frac{3}{4}" /> is read as "three-fourths" or "three over four"</li>
            <li><MathRenderer math="\frac{1}{2}" /> is read as "one-half"</li>
            <li><MathRenderer math="\frac{5}{8}" /> is read as "five-eighths" or "five over eight"</li>
          </ul>
        </div>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">Example:</p>
          <p>
            If you cut a pizza into 8 equal slices and eat 3 slices, you ate{' '}
            <MathRenderer math="\frac{3}{8}" /> of the pizza.
          </p>
        </div>
      </Definition>

      <Note type="tip">
        <p className="font-semibold">🍕 Pizza Slice Trick</p>
        <p className="mt-2">
          Think of fractions as pizza slices! The denominator is how many slices the pizza is cut into, 
          and the numerator is how many slices you have. So <MathRenderer math="\frac{3}{4}" /> means 
          "3 slices out of a pizza cut into 4 equal pieces."
        </p>
      </Note>

      <FractionVisualizer
        numerator={3}
        denominator={4}
        type="circle"
        interactive={true}
        label="3/4 as a circle (pizza)"
      />

      <FractionVisualizer
        numerator={3}
        denominator={8}
        type="bar"
        interactive={true}
        label="3/8 as a bar"
      />

      <InteractiveFractionSlider
        maxNumerator={12}
        maxDenominator={12}
        initialNumerator={3}
        initialDenominator={4}
        visualType="circle"
        showDecimal={true}
        label="🎮 Interactive: Drag the sliders to explore fractions!"
      />

      <Note type="success">
        <p className="font-semibold">⚡ Quick Fraction-Decimal Benchmarks</p>
        <p className="mt-2">Memorize these common fractions to estimate others:</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div><MathRenderer math="\frac{1}{2} = 0.5" /> (half)</div>
          <div><MathRenderer math="\frac{1}{4} = 0.25" /> (quarter)</div>
          <div><MathRenderer math="\frac{3}{4} = 0.75" /> (three-quarters)</div>
          <div><MathRenderer math="\frac{1}{3} \approx 0.333" /> (third)</div>
          <div><MathRenderer math="\frac{2}{3} \approx 0.667" /> (two-thirds)</div>
          <div><MathRenderer math="\frac{1}{5} = 0.2" /> (fifth)</div>
        </div>
      </Note>

      <KeyConcept title="Understanding Denominators">
        The denominator tells us how many equal parts make up one whole. 
        A larger denominator means each part is smaller.
      </KeyConcept>

      <MultipleChoiceExercise
        question={
          <div>
            <p className="mb-2">Which fraction represents the shaded area?</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Imagine a circle divided into 4 equal parts, with 3 parts shaded.
            </p>
          </div>
        }
        choices={[
          { id: 'a', text: <MathRenderer math="\frac{1}{4}" />, isCorrect: false },
          { id: 'b', text: <MathRenderer math="\frac{3}{4}" />, isCorrect: true },
          { id: 'c', text: <MathRenderer math="\frac{4}{3}" />, isCorrect: false },
          { id: 'd', text: <MathRenderer math="\frac{3}{1}" />, isCorrect: false }
        ]}
        explanation={
          <div>
            <p>Correct! Since 3 out of 4 equal parts are shaded, the fraction is <MathRenderer math="\frac{3}{4}" />.</p>
            <p className="mt-2">Remember: numerator (3) = parts shaded, denominator (4) = total parts.</p>
          </div>
        }
        hint="Count how many parts are shaded (numerator) and how many total parts there are (denominator)."
      />

      <Note type="tip">
        <p className="font-semibold">✂️ Quick Simplification Trick</p>
        <p className="mt-2">
          To simplify fractions quickly, check if both numbers are even. If yes, divide by 2. Repeat until you can't anymore:
        </p>
        <div className="mt-3 space-y-1 text-sm font-mono bg-gray-50 dark:bg-gray-900/30 p-3 rounded">
          <p><MathRenderer math="\frac{24}{36}" /> → both even → <MathRenderer math="\frac{12}{18}" /></p>
          <p><MathRenderer math="\frac{12}{18}" /> → both even → <MathRenderer math="\frac{6}{9}" /></p>
          <p><MathRenderer math="\frac{6}{9}" /> → both divisible by 3 → <MathRenderer math="\frac{2}{3}" /></p>
        </div>
        <p className="mt-2 text-sm">Pro tip: If both end in 0 or 5, try dividing by 5!</p>
      </Note>

      <Definition term="Types of Fractions" example={
        <div className="space-y-2">
          <p><strong>Proper:</strong> <MathRenderer math="\frac{2}{5}" /> (less than 1)</p>
          <p><strong>Improper:</strong> <MathRenderer math="\frac{7}{5}" /> (≥ 1)</p>
          <p><strong>Mixed:</strong> <MathRenderer math="2\frac{1}{3}" /> (read as "two and one-third")</p>
        </div>
      }>
        <ul className="space-y-3">
          <li>
            <strong>Proper Fraction</strong>: Numerator &lt; Denominator
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">(value less than 1)</div>
          </li>
          <li>
            <strong>Improper Fraction</strong>: Numerator ≥ Denominator
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">(value ≥ 1)</div>
          </li>
          <li>
            <strong>Mixed Number</strong>: A whole number plus a proper fraction
          </li>
        </ul>
      </Definition>

      <Example
        problem={<>Convert the improper fraction <MathRenderer math="\frac{11}{4}" /> to a mixed number.</>}
        solution={
          <StepByStep
            steps={[
              {
                title: 'Divide the numerator by the denominator',
                content: <><MathRenderer math="11 \div 4 = 2" /> remainder <MathRenderer math="3" /></>
              },
              {
                title: 'The quotient becomes the whole number',
                content: <>Whole number = <MathRenderer math="2" /></>
              },
              {
                title: 'The remainder becomes the new numerator',
                content: <>
                  New fraction = <MathRenderer math="\frac{3}{4}" /> (remainder over original denominator)
                </>
              },
              {
                title: 'Combine them',
                content: <><MathRenderer math="\frac{11}{4} = 2\frac{3}{4}" /></>
              }
            ]}
          />
        }
        hint={<>Try dividing 11 by 4. How many times does 4 go into 11? What is left over?</>}
      />

      <Note type="success">
        <p className="font-semibold">🔄 Two-Way Conversion Trick</p>
        <div className="mt-2 space-y-3">
          <div>
            <p className="font-semibold text-sm">Improper → Mixed:</p>
            <p className="text-sm">Divide numerator by denominator. Whole = quotient, Fraction = remainder/denominator</p>
            <p className="text-sm mt-1 font-mono"><MathRenderer math="\frac{11}{4} = 2\frac{3}{4}" /> (11÷4 = 2 R 3)</p>
          </div>
          <div>
            <p className="font-semibold text-sm">Mixed → Improper:</p>
            <p className="text-sm">Multiply whole × denominator, add numerator, keep denominator</p>
            <p className="text-sm mt-1 font-mono"><MathRenderer math="2\frac{3}{4} = \frac{(2×4)+3}{4} = \frac{11}{4}" /></p>
          </div>
        </div>
      </Note>

      <NumericInputExercise
        question={
          <>
            <p>Convert <MathRenderer math="\frac{17}{5}" /> to a mixed number.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Enter your answer as a decimal. For example, 2¾ = 2.75
            </p>
          </>
        }
        correctAnswer={3.4}
        tolerance={0.01}
        hint={
          <>
            <p>Divide 17 by 5. The quotient is the whole number, the remainder over 5 is the fraction.</p>
            <p className="mt-2"><MathRenderer math="17 \div 5 = 3" /> remainder <MathRenderer math="2" /></p>
          </>
        }
        solution={
          <div>
            <p><MathRenderer math="17 \div 5 = 3" /> R <MathRenderer math="2" /></p>
            <p className="mt-2">So <MathRenderer math="\frac{17}{5} = 3\frac{2}{5}" /></p>
            <p className="mt-2">As a decimal: <MathRenderer math="3\frac{2}{5} = 3 + \frac{2}{5} = 3 + 0.4 = 3.4" /></p>
          </div>
        }
      />

      <Definition term="Equivalent Fractions">
        <p>
          <strong>Equivalent fractions</strong> are fractions that represent the same value, 
          even though they have different numerators and denominators.
        </p>
        <div className="mt-4 text-center">
          <MathRenderer math="\frac{1}{2} = \frac{2}{4} = \frac{3}{6} = \frac{4}{8}" block />
        </div>
        <Note type="tip">
          <p>To create equivalent fractions:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Multiply both numerator and denominator by the same number</li>
            <li>Or divide both by the same number (simplifying)</li>
          </ul>
        </Note>
        <Note type="success">
          <p className="font-semibold">🎯 LCM Shortcut for Comparing Fractions</p>
          <p className="mt-2">
            To compare <MathRenderer math="\frac{2}{3}" /> and <MathRenderer math="\frac{3}{5}" />, find the Least Common Multiple (LCM) of 3 and 5:
          </p>
          <div className="mt-3 space-y-1 text-sm">
            <p>LCM(3, 5) = 15 (since 3 and 5 share no common factors)</p>
            <p><MathRenderer math="\frac{2}{3} = \frac{2 \times 5}{3 \times 5} = \frac{10}{15}" /></p>
            <p><MathRenderer math="\frac{3}{5} = \frac{3 \times 3}{5 \times 3} = \frac{9}{15}" /></p>
            <p className="mt-2 font-semibold">Since 10 &gt; 9, we have <MathRenderer math="\frac{2}{3} > \frac{3}{5}" /></p>
          </div>
        </Note>
      </Definition>

      <MultipleChoiceExercise
        question={<>Which fraction is NOT equivalent to <MathRenderer math="\frac{2}{3}" />?</>}
        choices={[
          { id: 'a', text: <MathRenderer math="\frac{4}{6}" />, isCorrect: false },
          { id: 'b', text: <MathRenderer math="\frac{6}{9}" />, isCorrect: false },
          { id: 'c', text: <MathRenderer math="\frac{8}{10}" />, isCorrect: true },
          { id: 'd', text: <MathRenderer math="\frac{10}{15}" />, isCorrect: false }
        ]}
        explanation={
          <>
            <MathRenderer math="\frac{8}{10}" /> simplifies to <MathRenderer math="\frac{4}{5}" />, not <MathRenderer math="\frac{2}{3}" />.
            All other options are equivalent to <MathRenderer math="\frac{2}{3}" />.
          </>
        }
        hint="Try simplifying each fraction to see if it equals 2/3."
      />

      <Note type="tip">
        <p className="font-semibold">🦋 Butterfly Method (Cross-Multiplication)</p>
        <p className="mt-2">
          To check if <MathRenderer math="\frac{a}{b}" /> and <MathRenderer math="\frac{c}{d}" /> are equivalent, 
          draw butterfly wings: multiply <MathRenderer math="a \times d" /> and <MathRenderer math="b \times c" />. 
          If these products are equal, the fractions are equivalent!
        </p>
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
          <p className="text-sm"><strong>Example:</strong> Is <MathRenderer math="\frac{2}{3} = \frac{4}{6}" />?</p>
          <p className="text-sm mt-1">Left wing: <MathRenderer math="2 \times 6 = 12" /></p>
          <p className="text-sm">Right wing: <MathRenderer math="3 \times 4 = 12" /></p>
          <p className="text-sm mt-1">✓ Equal products means equal fractions!</p>
        </div>
      </Note>

      <Theorem
        title="Equivalent Fractions Test"
        proof={
          <div className="space-y-3">
            <p><strong>Theorem:</strong> Two fractions <MathRenderer math="\frac{a}{b}" /> and <MathRenderer math="\frac{c}{d}" /> are equivalent if and only if <MathRenderer math="a \times d = b \times c" /></p>
            <p><strong>Proof by Cross-Multiplication:</strong></p>
            <p>
              If <MathRenderer math="\frac{a}{b} = \frac{c}{d}" />, then multiplying both sides by{' '}
              <MathRenderer math="bd" /> gives:
            </p>
            <MathRenderer math="\frac{a}{b} \cdot bd = \frac{c}{d} \cdot bd" block />
            <MathRenderer math="ad = bc" block />
            <p className="mt-3">
              This is the <strong>cross-multiplication</strong> test for equivalent fractions.
            </p>
          </div>
        }
      >
        Two fractions are equivalent if and only if their cross products are equal.
      </Theorem>

      <NumericInputExercise
        question={
          <>
            <p>Simplify the fraction <MathRenderer math="\frac{24}{36}" /> to its lowest terms.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Enter as a decimal (e.g., 2/3 = 0.6667)
            </p>
          </>
        }
        correctAnswer={0.6667}
        tolerance={0.01}
        hint={
          <>
            Find the greatest common factor (GCF) of 24 and 36, then divide both by it.
          </>
        }
        solution={
          <div className="space-y-2">
            <p>GCF of 24 and 36 is 12</p>
            <p><MathRenderer math="\frac{24 \div 12}{36 \div 12} = \frac{2}{3}" /></p>
            <p>As a decimal: <MathRenderer math="\frac{2}{3} \approx 0.6667" /></p>
          </div>
        }
      />

      <Note type="tip">
        <p className="font-semibold">🎲 Quick GCF (Greatest Common Factor) Trick</p>
        <p className="mt-2">
          To find GCF of two numbers, use the "division ladder" method:
        </p>
        <div className="mt-3 space-y-2">
          <div className="text-sm">
            <p><strong>Example:</strong> GCF of 24 and 36</p>
            <div className="mt-2 font-mono bg-gray-50 dark:bg-gray-900/30 p-3 rounded space-y-1">
              <p>Both divisible by 2? Yes → 2 | 24, 36</p>
              <p className="ml-8">12, 18 (still divisible by 2)</p>
              <p>Both divisible by 2? Yes → 2 | 12, 18</p>
              <p className="ml-8">6, 9 (divisible by 3)</p>
              <p>Both divisible by 3? Yes → 3 | 6, 9</p>
              <p className="ml-8">2, 3 (no common factors)</p>
              <p className="mt-2 font-bold">GCF = 2 × 2 × 3 = 12</p>
            </div>
          </div>
          <p className="text-sm mt-3">
            Or use Euclid's algorithm: Divide larger by smaller, replace larger with remainder, repeat until remainder is 0.
          </p>
        </div>
      </Note>

      <Note type="success">
        <p className="font-semibold">Congratulations!</p>
        <p className="mt-1">
          You've learned the basics of fractions, including proper/improper fractions, 
          mixed numbers, and equivalent fractions. These concepts are fundamental for 
          adding, subtracting, multiplying, and dividing fractions in future lessons.
        </p>
      </Note>

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
