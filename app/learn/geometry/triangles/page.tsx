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

export default function TrianglePropertiesLesson() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Triangle Properties</h1>

      <Definition term="Triangle">
        <p>
          A <strong>triangle</strong> is a polygon with three sides and three angles.
        </p>
        <ul className="mt-4 space-y-2">
          <li><strong>Vertices:</strong> The three corners (points) of the triangle</li>
          <li><strong>Sides:</strong> The line segments connecting the vertices</li>
          <li><strong>Angles:</strong> Formed at each vertex</li>
        </ul>
      </Definition>

      <Theorem
        title="Triangle Angle Sum Theorem"
        proof={
          <div className="space-y-3">
            <p>Given: Triangle ABC</p>
            <p>To prove: <MathRenderer math="\angle A + \angle B + \angle C = 180°" /></p>
            <div className="mt-3 space-y-2">
              <p><strong>Proof:</strong></p>
              <p>1. Draw a line through B parallel to AC</p>
              <p>2. The angles formed are alternate interior angles</p>
              <p>3. These alternate angles equal <MathRenderer math="\angle A" /> and <MathRenderer math="\angle C" /></p>
              <p>4. All angles at B form a straight line = <MathRenderer math="180°" /></p>
              <p>5. Therefore: <MathRenderer math="\angle A + \angle B + \angle C = 180°" /></p>
            </div>
          </div>
        }
      >
        The sum of the interior angles of any triangle is <MathRenderer math="180°" />.
      </Theorem>

      <Example
        problem={
          <>
            In triangle ABC, <MathRenderer math="\angle A = 45°" /> and <MathRenderer math="\angle B = 70°" />. 
            Find <MathRenderer math="\angle C" />.
          </>
        }
        solution={
          <StepByStep
            steps={[
              {
                title: 'Apply the Triangle Angle Sum Theorem',
                content: <><MathRenderer math="\angle A + \angle B + \angle C = 180°" /></>
              },
              {
                title: 'Substitute known values',
                content: <><MathRenderer math="45° + 70° + \angle C = 180°" /></>
              },
              {
                title: 'Simplify',
                content: <><MathRenderer math="115° + \angle C = 180°" /></>
              },
              {
                title: 'Solve for angle C',
                content: <><MathRenderer math="\angle C = 180° - 115° = 65°" /></>
              }
            ]}
          />
        }
      />

      <NumericInputExercise
        question={
          <>
            A triangle has angles measuring <MathRenderer math="38°" /> and <MathRenderer math="92°" />. 
            What is the measure of the third angle?
          </>
        }
        correctAnswer={50}
        unit="degrees"
        hint="Remember: all three angles in a triangle sum to 180°"
        solution={
          <div>
            <p><MathRenderer math="38° + 92° + x = 180°" /></p>
            <p className="mt-2"><MathRenderer math="130° + x = 180°" /></p>
            <p className="mt-2"><MathRenderer math="x = 50°" /></p>
          </div>
        }
      />

      <Definition term="Types of Triangles by Angles">
        <ul className="space-y-3">
          <li>
            <strong>Acute Triangle:</strong> All three angles are less than <MathRenderer math="90°" />
          </li>
          <li>
            <strong>Right Triangle:</strong> Has exactly one <MathRenderer math="90°" /> angle
          </li>
          <li>
            <strong>Obtuse Triangle:</strong> Has one angle greater than <MathRenderer math="90°" />
          </li>
        </ul>
      </Definition>

      <MultipleChoiceExercise
        question={
          <>
            A triangle has angles of <MathRenderer math="55°" />, <MathRenderer math="60°" />, 
            and <MathRenderer math="65°" />. What type of triangle is it?
          </>
        }
        choices={[
          { id: 'a', text: 'Acute triangle', isCorrect: true },
          { id: 'b', text: 'Right triangle', isCorrect: false },
          { id: 'c', text: 'Obtuse triangle', isCorrect: false },
          { id: 'd', text: 'Cannot determine', isCorrect: false }
        ]}
        explanation="All three angles are less than 90°, so it's an acute triangle."
        hint="Look at the size of each angle. Are any 90° or greater?"
      />

      <Definition term="Types of Triangles by Sides">
        <ul className="space-y-3">
          <li>
            <strong>Equilateral Triangle:</strong> All three sides are equal (and all angles are <MathRenderer math="60°" />)
          </li>
          <li>
            <strong>Isosceles Triangle:</strong> Two sides are equal (and their opposite angles are equal)
          </li>
          <li>
            <strong>Scalene Triangle:</strong> No sides are equal
          </li>
        </ul>
      </Definition>

      <Theorem
        title="Isosceles Triangle Theorem"
        proof={
          <div className="space-y-3">
            <p>Given: Triangle ABC where AB = AC</p>
            <p>To prove: <MathRenderer math="\angle B = \angle C" /></p>
            <div className="mt-3 space-y-2">
              <p><strong>Proof:</strong></p>
              <p>1. Draw altitude from A to BC, meeting at D</p>
              <p>2. Triangles ABD and ACD are congruent (by SSS)</p>
              <p>3. Corresponding parts of congruent triangles are equal</p>
              <p>4. Therefore <MathRenderer math="\angle B = \angle C" /></p>
            </div>
          </div>
        }
      >
        In an isosceles triangle, the angles opposite the equal sides are equal.
      </Theorem>

      <Example
        problem={
          <>
            Triangle DEF is isosceles with DE = DF. If <MathRenderer math="\angle E = 55°" />, 
            find <MathRenderer math="\angle F" /> and <MathRenderer math="\angle D" />.
          </>
        }
        solution={
          <StepByStep
            steps={[
              {
                title: 'Identify equal angles',
                content: <>Since DE = DF, <MathRenderer math="\angle E = \angle F = 55°" /></>
              },
              {
                title: 'Apply Triangle Angle Sum',
                content: <><MathRenderer math="\angle D + \angle E + \angle F = 180°" /></>
              },
              {
                title: 'Substitute',
                content: <><MathRenderer math="\angle D + 55° + 55° = 180°" /></>
              },
              {
                title: 'Solve',
                content: <><MathRenderer math="\angle D = 180° - 110° = 70°" /></>
              }
            ]}
          />
        }
      />

      <MultipleChoiceExercise
        question={
          <>
            In an isosceles triangle, the vertex angle is <MathRenderer math="40°" />. 
            What is the measure of each base angle?
          </>
        }
        choices={[
          { id: 'a', text: '40°', isCorrect: false },
          { id: 'b', text: '70°', isCorrect: true },
          { id: 'c', text: '80°', isCorrect: false },
          { id: 'd', text: '100°', isCorrect: false }
        ]}
        explanation={
          <div>
            <p>Let each base angle = x</p>
            <p><MathRenderer math="40° + x + x = 180°" /></p>
            <p><MathRenderer math="40° + 2x = 180°" /></p>
            <p><MathRenderer math="2x = 140°" /></p>
            <p><MathRenderer math="x = 70°" /></p>
          </div>
        }
        hint="The two base angles are equal. Set up an equation using the angle sum."
      />

      <Theorem
        title="Triangle Inequality Theorem"
        proof={
          <div className="space-y-2">
            <p>
              The proof uses the concept that in a triangle, the shortest path between two points 
              is a straight line. Any path through a third point must be longer.
            </p>
            <p className="mt-2">
              Therefore, for any triangle with sides a, b, and c:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li><MathRenderer math="a + b > c" /></li>
              <li><MathRenderer math="a + c > b" /></li>
              <li><MathRenderer math="b + c > a" /></li>
            </ul>
          </div>
        }
      >
        The sum of the lengths of any two sides of a triangle must be greater than the length of the third side.
      </Theorem>

      <Example
        problem="Can a triangle have sides of length 3, 4, and 8?"
        solution={
          <div className="space-y-2">
            <p>Check the Triangle Inequality Theorem:</p>
            <p className="mt-2"><MathRenderer math="3 + 4 = 7" /> (NOT greater than 8) ✗</p>
            <p className="mt-2">Since 3 + 4 is not greater than 8, these sides cannot form a triangle.</p>
            <p className="mt-2 font-semibold">Answer: No, these cannot form a triangle.</p>
          </div>
        }
      />

      <MultipleChoiceExercise
        question="Which set of lengths CAN form a triangle?"
        choices={[
          { id: 'a', text: '2, 3, 5', isCorrect: false },
          { id: 'b', text: '1, 2, 4', isCorrect: false },
          { id: 'c', text: '5, 7, 10', isCorrect: true },
          { id: 'd', text: '3, 3, 7', isCorrect: false }
        ]}
        explanation={
          <div>
            <p>Check 5, 7, 10:</p>
            <p><MathRenderer math="5 + 7 = 12 > 10" /> ✓</p>
            <p><MathRenderer math="5 + 10 = 15 > 7" /> ✓</p>
            <p><MathRenderer math="7 + 10 = 17 > 5" /> ✓</p>
            <p className="mt-2">All three inequalities are satisfied!</p>
          </div>
        }
        hint="Check if the sum of any two sides is greater than the third side"
      />

      <KeyConcept title="Exterior Angle Theorem">
        An exterior angle of a triangle equals the sum of the two remote interior angles.
      </KeyConcept>

      <NumericInputExercise
        question={
          <>
            In a triangle, two interior angles measure <MathRenderer math="45°" /> and <MathRenderer math="60°" />. 
            What is the measure of the exterior angle at the third vertex?
          </>
        }
        correctAnswer={105}
        unit="degrees"
        hint="The exterior angle equals the sum of the two remote interior angles"
        solution={
          <div>
            <p>Exterior angle = sum of remote interior angles</p>
            <p className="mt-2">Exterior angle = <MathRenderer math="45° + 60° = 105°" /></p>
          </div>
        }
      />

      <Note type="success">
        <p className="font-semibold">Outstanding work!</p>
        <p className="mt-1">
          You've learned fundamental triangle properties including angle sums, triangle types, 
          and the triangle inequality. These concepts are essential for all of geometry!
        </p>
      </Note>
    </div>
  )
}
