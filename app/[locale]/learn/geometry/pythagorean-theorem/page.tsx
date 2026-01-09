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
import PythagoreanVisualizer from '@/components/visualizations/PythagoreanVisualizer'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'

export default function PythagoreanTheoremLesson() {
  const navigation = getLessonNavigation('geometry', 'pythagorean-theorem')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">The Pythagorean Theorem</h1>

      <Theorem
        title="Pythagorean Theorem"
        proof={
          <div className="space-y-4">
            <p><strong>Proof by Rearrangement:</strong></p>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
              <p className="mb-3">
                Consider a square with side length <MathRenderer math="a + b" />. 
                Inside it, arrange four identical right triangles with sides <MathRenderer math="a" />, <MathRenderer math="b" />, and <MathRenderer math="c" />.
              </p>
              <p>
                Area of large square = <MathRenderer math="(a + b)^2 = a^2 + 2ab + b^2" />
              </p>
              <p className="mt-2">
                Area of large square = 4 triangles + inner square
              </p>
              <MathRenderer math="(a + b)^2 = 4 \cdot \frac{1}{2}ab + c^2" block />
              <MathRenderer math="a^2 + 2ab + b^2 = 2ab + c^2" block />
              <p className="mt-2">
                Subtracting <MathRenderer math="2ab" /> from both sides:
              </p>
              <MathRenderer math="a^2 + b^2 = c^2" block />
            </div>
          </div>
        }
      >
        <p>
          In a right triangle, the square of the hypotenuse (the side opposite the right angle) 
          is equal to the sum of the squares of the other two sides.
        </p>
        <div className="mt-4 text-center">
          <MathRenderer math="a^2 + b^2 = c^2" block />
        </div>        <p className="mt-2 text-sm italic text-gray-600 dark:text-gray-400">
          (Read as: "a squared plus b squared equals c squared")
        </p>        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          where <MathRenderer math="c" /> is the hypotenuse and <MathRenderer math="a" />, <MathRenderer math="b" /> are the other two sides
        </p>
      </Theorem>

      <PythagoreanVisualizer
        a={3}
        b={4}
        c={5}
        showSquares={true}
        animated={true}
        label="Visual Proof: 3² + 4² = 5²"
      />

      <KeyConcept title="Identifying the Hypotenuse">
        The <strong>hypotenuse</strong> is always the longest side of a right triangle and is 
        <strong> opposite the right angle</strong>. Never use it as <MathRenderer math="a" /> or <MathRenderer math="b" /> 
        in the formula—it must be <MathRenderer math="c" />.
      </KeyConcept>

      <Example
        problem={
          <>
            A right triangle has legs of length 3 cm and 4 cm. Find the length of the hypotenuse.
          </>
        }
        solution={
          <StepByStep
            steps={[
              {
                title: 'Identify the values',
                content: (
                  <div>
                    <p><MathRenderer math="a = 3" /> cm, <MathRenderer math="b = 4" /> cm</p>
                    <p>We need to find <MathRenderer math="c" /></p>
                  </div>
                )
              },
              {
                title: 'Apply the Pythagorean theorem',
                content: (
                  <div>
                    <MathRenderer math="a^2 + b^2 = c^2" block />
                    <MathRenderer math="3^2 + 4^2 = c^2" block />
                  </div>
                )
              },
              {
                title: 'Calculate',
                content: (
                  <div>
                    <MathRenderer math="9 + 16 = c^2" block />
                    <MathRenderer math="25 = c^2" block />
                  </div>
                )
              },
              {
                title: 'Solve for c',
                content: (
                  <div>
                    <MathRenderer math="c = \sqrt{25} = 5" block />
                    <p className="mt-2">The hypotenuse is 5 cm.</p>
                  </div>
                )
              }
            ]}
          />
        }
        hint={<>Use the formula a² + b² = c². Square the leg lengths first, then add them, then take the square root to find c.</>}
      />

      <MultipleChoiceExercise
        question={
          <>
            A right triangle has a hypotenuse of 13 cm and one leg of 5 cm. 
            What is the length of the other leg?
          </>
        }
        choices={[
          { id: 'a', text: '8 cm', isCorrect: false },
          { id: 'b', text: '12 cm', isCorrect: true },
          { id: 'c', text: '10 cm', isCorrect: false },
          { id: 'd', text: '14 cm', isCorrect: false }
        ]}
        explanation={
          <div className="space-y-2">
            <p>Using <MathRenderer math="a^2 + b^2 = c^2" />:</p>
            <p><MathRenderer math="5^2 + b^2 = 13^2" /></p>
            <p><MathRenderer math="25 + b^2 = 169" /></p>
            <p><MathRenderer math="b^2 = 144" /></p>
            <p><MathRenderer math="b = 12" /> cm</p>
          </div>
        }
        hint="Rearrange the formula to solve for the unknown leg: b² = c² - a²"
      />

      <NumericInputExercise
        question={
          <>
            Find the length of the hypotenuse of a right triangle with legs 
            measuring 6 meters and 8 meters.
          </>
        }
        correctAnswer={10}
        unit="meters"
        hint={
          <>
            <p>Use the Pythagorean theorem: <MathRenderer math="a^2 + b^2 = c^2" /></p>
            <p className="mt-2">Substitute <MathRenderer math="a = 6" /> and <MathRenderer math="b = 8" /></p>
          </>
        }
        solution={
          <div className="space-y-2">
            <p><MathRenderer math="6^2 + 8^2 = c^2" /></p>
            <p><MathRenderer math="36 + 64 = c^2" /></p>
            <p><MathRenderer math="100 = c^2" /></p>
            <p><MathRenderer math="c = \sqrt{100} = 10" /> meters</p>
          </div>
        }
      />

      <Definition term="Pythagorean Triples">
        <p>
          A <strong>Pythagorean triple</strong> is a set of three positive integers{' '}
          <MathRenderer math="a, b, c" /> that satisfy <MathRenderer math="a^2 + b^2 = c^2" />.
        </p>erm
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">Common Pythagorean Triples:</p>
          <ul className="space-y-1">
            <li><MathRenderer math="3, 4, 5" /> (and multiples: 6-8-10, 9-12-15, etc.)</li>
            <li><MathRenderer math="5, 12, 13" /> (and multiples: 10-24-26, etc.)</li>
            <li><MathRenderer math="8, 15, 17" /></li>
            <li><MathRenderer math="7, 24, 25" /></li>
          </ul>
        </div>
        <Note type="tip">
          Recognizing these triples can save time in calculations!
        </Note>
      </Definition>

      <MultipleChoiceExercise
        question="Which set of numbers is NOT a Pythagorean triple?"
        choices={[
          { id: 'a', text: <MathRenderer math="5, 12, 13" />, isCorrect: false },
          { id: 'b', text: <MathRenderer math="9, 12, 15" />, isCorrect: false },
          { id: 'c', text: <MathRenderer math="8, 12, 16" />, isCorrect: true },
          { id: 'd', text: <MathRenderer math="20, 21, 29" />, isCorrect: false }
        ]}
        explanation={
          <div>
            <p>Check: <MathRenderer math="8^2 + 12^2 = 64 + 144 = 208" /></p>
            <p>But <MathRenderer math="16^2 = 256 \neq 208" /></p>
            <p className="mt-2">All other options satisfy the Pythagorean theorem.</p>
          </div>
        }
        hint="Test each triple with the formula a² + b² = c²"
      />

      <Example
        problem={
          <>
            A ladder is leaning against a wall. The base of the ladder is 5 feet from the wall, 
            and the ladder reaches 12 feet up the wall. How long is the ladder?
          </>
        }
        solution={
          <StepByStep
            steps={[
              {
                title: 'Visualize the problem',
                content: (
                  <div>
                    <p>The ladder, wall, and ground form a right triangle:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>Base (ground): <MathRenderer math="a = 5" /> feet</li>
                      <li>Height (wall): <MathRenderer math="b = 12" /> feet</li>
                      <li>Ladder (hypotenuse): <MathRenderer math="c = ?" /></li>
                    </ul>
                  </div>
                )
              },
              {
                title: 'Recognize the triple',
                content: (
                  <div>
                    <p>This is the 5-12-13 Pythagorean triple!</p>
                    <p className="mt-2">We can verify:</p>
                  </div>
                )
              },
              {
                title: 'Calculate',
                content: (
                  <div>
                    <MathRenderer math="5^2 + 12^2 = 25 + 144 = 169" block />
                    <MathRenderer math="\sqrt{169} = 13" block />
                    <p className="mt-2">The ladder is <strong>13 feet</strong> long.</p>
                  </div>
                )
              }
            ]}
          />
        }
      />

      <NumericInputExercise
        question={
          <>
            A television screen measures 24 inches wide and 18 inches tall. 
            What is the diagonal measurement of the screen (rounded to 1 decimal place)?
          </>
        }
        correctAnswer={30}
        tolerance={0.5}
        unit="inches"
        hint={
          <>
            <p>The width and height form the legs of a right triangle.</p>
            <p className="mt-2">The diagonal is the hypotenuse.</p>
          </>
        }
        solution={
          <div className="space-y-2">
            <p><MathRenderer math="24^2 + 18^2 = c^2" /></p>
            <p><MathRenderer math="576 + 324 = c^2" /></p>
            <p><MathRenderer math="900 = c^2" /></p>
            <p><MathRenderer math="c = \sqrt{900} = 30" /> inches</p>
          </div>
        }
      />

      <Note type="info">
        <p className="font-semibold">Converse of Pythagorean Theorem</p>
        <p className="mt-2">
          If three sides of a triangle satisfy <MathRenderer math="a^2 + b^2 = c^2" />, 
          then the triangle <strong>is</strong> a right triangle. This is useful for 
          determining if a triangle has a right angle.
        </p>
      </Note>

      <MultipleChoiceExercise
        question={
          <>
            A triangle has sides of length 7, 24, and 25. Is it a right triangle?
          </>
        }
        choices={[
          { id: 'a', text: 'Yes, it is a right triangle', isCorrect: true },
          { id: 'b', text: 'No, it is not a right triangle', isCorrect: false },
          { id: 'c', text: 'Cannot determine', isCorrect: false },
          { id: 'd', text: 'It is an equilateral triangle', isCorrect: false }
        ]}
        explanation={
          <div>
            <p>Check if <MathRenderer math="7^2 + 24^2 = 25^2" />:</p>
            <p><MathRenderer math="49 + 576 = 625" /></p>
            <p><MathRenderer math="625 = 625 \checkmark" /></p>
            <p className="mt-2">Since the equation holds, it IS a right triangle!</p>
          </div>
        }
        hint="Use the converse: check if a² + b² = c² where c is the longest side."
      />

      <Note type="success">
        <p className="font-semibold">Excellent progress!</p>
        <p className="mt-1">
          The Pythagorean theorem is one of the most important theorems in mathematics. 
          You'll use it in trigonometry, coordinate geometry, physics, and many real-world 
          applications. Master this, and you have a powerful tool in your mathematical toolkit!
        </p>
      </Note>

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
