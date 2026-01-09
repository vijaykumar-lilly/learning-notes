import MathRenderer from '@/components/math/MathRenderer'
import { 
  Definition, 
  Theorem,
  Example, 
  KeyConcept, 
  Note, 
  StepByStep
} from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise } from '@/components/interactive'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'

export default function GeometricReasoningLesson() {
  const navigation = getLessonNavigation('geometry', 'reasoning-proofs')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Geometric Reasoning & Proofs</h1>

      <Definition term="Geometric Proof">
        <p>
          A <strong>geometric proof</strong> is a logical argument that uses definitions, postulates, 
          and previously proven theorems to show that a statement is true.
        </p>
      </Definition>

      <Definition term="Point, Line, and Plane">
        <ul className="space-y-3">
          <li>
            <strong>Point</strong>: An exact location in space, usually named with a capital letter (A, B, C)
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Has no size, only position</div>
          </li>
          <li>
            <strong>Line</strong>: A straight path extending infinitely in both directions
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Named by two points on it or a lowercase letter</div>
          </li>
          <li>
            <strong>Plane</strong>: A flat surface extending infinitely in all directions
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Like an infinite sheet of paper</div>
          </li>
        </ul>
      </Definition>

      <KeyConcept title="Types of Reasoning">
        <strong>Deductive Reasoning:</strong> Drawing specific conclusions from general facts<br/>
        <strong>Inductive Reasoning:</strong> Making generalizations based on patterns
      </KeyConcept>

      <MultipleChoiceExercise
        question="If all squares have four equal sides, and ABCD is a square, what can we conclude?"
        choices={[
          { id: 'a', text: 'ABCD has three sides', isCorrect: false },
          { id: 'b', text: 'ABCD has four equal sides', isCorrect: true },
          { id: 'c', text: 'ABCD is a circle', isCorrect: false },
          { id: 'd', text: 'Cannot determine', isCorrect: false }
        ]}
        explanation="This is deductive reasoning: Since all squares have four equal sides and ABCD is a square, it must have four equal sides."
        hint="Use the definition of a square and apply it to ABCD"
      />

      <Definition term="Postulates (Axioms)">
        <p>
          <strong>Postulates</strong> are statements accepted as true without proof. 
          They form the foundation for geometric reasoning.
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">Key Postulates:</p>
          <ul className="space-y-2">
            <li>Through any two points, there is exactly one line</li>
            <li>A line contains at least two points</li>
            <li>If two lines intersect, they intersect at exactly one point</li>
          </ul>
        </div>
      </Definition>

      <Theorem
        title="Vertical Angles Theorem"
        proof={
          <div className="space-y-3">
            <p>Given: Lines AB and CD intersect at point E</p>
            <p>To prove: <MathRenderer math="\angle AEC = \angle BED" /></p>
            <div className="mt-3 space-y-2">
              <p><strong>Proof:</strong></p>
              <p>1. <MathRenderer math="\angle AEC + \angle CEB = 180°" /> (linear pair)</p>
              <p>2. <MathRenderer math="\angle BED + \angle CEB = 180°" /> (linear pair)</p>
              <p>3. <MathRenderer math="\angle AEC + \angle CEB = \angle BED + \angle CEB" /> (substitution)</p>
              <p>4. <MathRenderer math="\angle AEC = \angle BED" /> (subtraction property)</p>
            </div>
          </div>
        }
      >
        When two lines intersect, the vertical (opposite) angles formed are equal.
      </Theorem>

      <Definition term="Types of Angle Pairs">
        <ul className="space-y-3">
          <li>
            <strong>Complementary Angles:</strong> Two angles whose sum is <MathRenderer math="90°" /> (read as "ninety degrees")
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Example: <MathRenderer math="30°" /> and <MathRenderer math="60°" /> (read as "thirty degrees and sixty degrees")
            </div>
          </li>
          <li>
            <strong>Supplementary Angles:</strong> Two angles whose sum is <MathRenderer math="180°" />
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Example: <MathRenderer math="110°" /> and <MathRenderer math="70°" />
            </div>
          </li>
          <li>
            <strong>Vertical Angles:</strong> Opposite angles formed by two intersecting lines (always equal)
          </li>
        </ul>
      </Definition>

      <Example
        problem={<>If two angles are complementary and one angle is <MathRenderer math="35°" />, find the other angle.</>}
        solution={
          <StepByStep
            steps={[
              {
                title: 'Recall the definition',
                content: <>Complementary angles sum to <MathRenderer math="90°" /></>
              },
              {
                title: 'Set up the equation',
                content: <><MathRenderer math="35° + x = 90°" /></>
              },
              {
                title: 'Solve for x',
                content: <><MathRenderer math="x = 90° - 35° = 55°" /></>
              }
            ]}
          />
        }
        hint="What do complementary angles add up to?"
      />

      <NumericInputExercise
        question={
          <>
            Two angles are supplementary. If one angle measures <MathRenderer math="125°" />, 
            what is the measure of the other angle?
          </>
        }
        correctAnswer={55}
        unit="degrees"
        hint="Supplementary angles sum to 180°"
        solution={
          <div>
            <p><MathRenderer math="125° + x = 180°" /></p>
            <p className="mt-2"><MathRenderer math="x = 180° - 125° = 55°" /></p>
          </div>
        }
      />

      <Definition term="Conditional Statements">
        <p>
          A <strong>conditional statement</strong> has the form "If P, then Q" where:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li><strong>P</strong> is the hypothesis (the "if" part)</li>
          <li><strong>Q</strong> is the conclusion (the "then" part)</li>
        </ul>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">Example:</p>
          <p>"If two angles are vertical, then they are equal."</p>
          <p className="mt-2">Hypothesis: Two angles are vertical</p>
          <p>Conclusion: They are equal</p>
        </div>
      </Definition>

      <MultipleChoiceExercise
        question='In the statement "If a polygon has three sides, then it is a triangle," what is the conclusion?'
        choices={[
          { id: 'a', text: 'A polygon has three sides', isCorrect: false },
          { id: 'b', text: 'It is a triangle', isCorrect: true },
          { id: 'c', text: 'Polygons exist', isCorrect: false },
          { id: 'd', text: 'Three sides are equal', isCorrect: false }
        ]}
        explanation='The conclusion is the "then" part of the statement: "it is a triangle"'
        hint='Look for the "then" part of the if-then statement'
      />

      <Definition term="Converse, Inverse, and Contrapositive">
        <p>Given a conditional "If P, then Q":</p>
        <ul className="space-y-2 mt-3">
          <li><strong>Converse:</strong> If Q, then P (switch hypothesis and conclusion)</li>
          <li><strong>Inverse:</strong> If not P, then not Q (negate both)</li>
          <li><strong>Contrapositive:</strong> If not Q, then not P (switch AND negate)</li>
        </ul>
        <Note type="info">
          A statement and its contrapositive always have the same truth value!
        </Note>
      </Definition>

      <Theorem
        title="Angle Addition Postulate"
        proof={
          <div>
            <p>
              This is a postulate (accepted without proof), but we can verify it logically:
            </p>
            <p className="mt-2">
              If point B is in the interior of <MathRenderer math="\angle AOC" />, then the sum of 
              <MathRenderer math="\angle AOB" /> and <MathRenderer math="\angle BOC" /> equals <MathRenderer math="\angle AOC" />.
            </p>
          </div>
        }
      >
        If a point lies in the interior of an angle, the angle is the sum of the two smaller angles formed.
      </Theorem>

      <Example
        problem={
          <>
            <MathRenderer math="\angle ABC" /> is divided by ray BD into two angles. 
            If <MathRenderer math="\angle ABD = 42°" /> and <MathRenderer math="\angle DBC = 38°" />, 
            find <MathRenderer math="\angle ABC" />.
          </>
        }
        solution={
          <div>
            <p>By the Angle Addition Postulate:</p>
            <p className="mt-2"><MathRenderer math="\angle ABC = \angle ABD + \angle DBC" /></p>
            <p className="mt-2"><MathRenderer math="\angle ABC = 42° + 38° = 80°" /></p>
          </div>
        }
      />

      <NumericInputExercise
        question={
          <>
            <MathRenderer math="\angle XYZ = 90°" />. Ray YW divides it into <MathRenderer math="\angle XYW" /> and{' '}
            <MathRenderer math="\angle WYZ" />. If <MathRenderer math="\angle XYW = 34°" />, 
            find <MathRenderer math="\angle WYZ" />.
          </>
        }
        correctAnswer={56}
        unit="degrees"
        hint="Use the Angle Addition Postulate: the sum of the two smaller angles equals the whole angle"
        solution={
          <div>
            <p><MathRenderer math="\angle XYW + \angle WYZ = \angle XYZ" /></p>
            <p className="mt-2"><MathRenderer math="34° + \angle WYZ = 90°" /></p>
            <p className="mt-2"><MathRenderer math="\angle WYZ = 90° - 34° = 56°" /></p>
          </div>
        }
      />

      <Note type="success">
        <p className="font-semibold">Excellent reasoning!</p>
        <p className="mt-1">
          You've learned the foundations of geometric proof: postulates, theorems, and logical reasoning. 
          These skills will help you prove more complex geometric relationships!
        </p>
      </Note>

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
