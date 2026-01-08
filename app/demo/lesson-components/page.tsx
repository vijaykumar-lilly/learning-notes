import AppLayout from '@/components/layout/AppLayout'
import MathRenderer from '@/components/math/MathRenderer'
import { 
  Definition, 
  Theorem, 
  Example, 
  KeyConcept, 
  Exercise, 
  Note,
  StepByStep 
} from '@/components/lesson'

export default function DemoLessonPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Demo: Using Lesson Components
          </h1>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
            This page demonstrates all available reusable lesson components.
          </p>
        </div>

        {/* KeyConcept Component */}
        <KeyConcept title="Understanding Functions">
          <p>
            A function is a relation between a set of inputs and outputs where each input 
            is related to exactly one output. We write <MathRenderer math="f(x)"  /> to 
            denote a function <MathRenderer math="f"  /> applied to input <MathRenderer math="x"  />.
          </p>
        </KeyConcept>

        {/* Definition Component */}
        <Definition 
          term="Linear Function" 
          variant="default"
          example={
            <MathRenderer math="f(x) = 2x + 3" />
          }
        >
          <p>
            A linear function is a function that can be written in the form:
          </p>
          <MathRenderer math="f(x) = mx + b" block />
          <p>
            where <MathRenderer math="m"  /> is the slope and <MathRenderer math="b"  /> is the y-intercept.
          </p>
        </Definition>

        {/* Important Definition */}
        <Definition 
          term="Derivative" 
          variant="important"
        >
          <p>
            The derivative of a function <MathRenderer math="f(x)"  /> at a point <MathRenderer math="x"  /> 
            is defined as:
          </p>
          <MathRenderer math="f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}" block />
          <p>
            It represents the instantaneous rate of change of the function at that point.
          </p>
        </Definition>

        {/* Theorem Component */}
        <Theorem 
          title="Pythagorean Theorem"
          proof={
            <>
              <p className="mb-3">Consider a right triangle with legs of length <MathRenderer math="a"  /> and <MathRenderer math="b"  />, and hypotenuse of length <MathRenderer math="c"  />.</p>
              <StepByStep
                title="Geometric Proof"
                steps={[
                  {
                    title: 'Construct a square',
                    content: <p>Draw a square with side length <MathRenderer math="a + b"  /></p>,
                    explanation: 'This gives us a total area of (a + b)²'
                  },
                  {
                    title: 'Place four triangles',
                    content: <p>Place four copies of the original triangle inside the square</p>,
                    explanation: 'Each triangle has area ½ab'
                  },
                  {
                    title: 'Calculate the remaining area',
                    content: <MathRenderer math="c^2 = (a+b)^2 - 4 \cdot \frac{1}{2}ab = a^2 + 2ab + b^2 - 2ab = a^2 + b^2" block />,
                    explanation: 'The central square has side length c'
                  }
                ]}
              />
            </>
          }
        >
          <p>
            In a right triangle with legs of length <MathRenderer math="a"  /> and <MathRenderer math="b"  />, 
            and hypotenuse of length <MathRenderer math="c"  />, the following relationship holds:
          </p>
          <MathRenderer math="a^2 + b^2 = c^2" block />
        </Theorem>

        {/* Note Components */}
        <Note type="tip">
          <strong>Pro Tip:</strong> When solving quadratic equations, always check if you can factor 
          before using the quadratic formula. Factoring is often faster!
        </Note>

        <Note type="warning">
          <strong>Common Mistake:</strong> Remember that <MathRenderer math="\sqrt{a^2 + b^2} \neq a + b"  />. 
          The square root of a sum is NOT the sum of the square roots!
        </Note>

        <Note type="success">
          <strong>Well Done!</strong> You've mastered the basics of function notation. 
          You're ready to move on to more advanced topics.
        </Note>

        <Note type="info">
          <strong>Did you know?</strong> The quadratic formula was known to ancient Babylonian 
          mathematicians around 2000 BCE, though in a different form.
        </Note>

        {/* Example Component */}
        <Example
          title="Solving a Quadratic Equation"
          problem={
            <>
              <p className="mb-2">Solve the equation:</p>
              <MathRenderer math="x^2 - 5x + 6 = 0" block />
            </>
          }
          hint={
            <p>Try to factor the quadratic. Look for two numbers that multiply to 6 and add to -5.</p>
          }
          solution={
            <>
              <p>We can factor this quadratic:</p>
              <MathRenderer math="x^2 - 5x + 6 = (x-2)(x-3) = 0" block />
              <p>Using the zero product property:</p>
              <MathRenderer math="x - 2 = 0 \quad \text{or} \quad x - 3 = 0" block />
              <p>Therefore:</p>
              <MathRenderer math="x = 2 \quad \text{or} \quad x = 3" block />
            </>
          }
        />

        {/* StepByStep Component */}
        <StepByStep
          title="Completing the Square"
          steps={[
            {
              title: 'Start with the equation',
              content: <MathRenderer math="x^2 + 6x + 5 = 0" />,
              explanation: 'We want to rewrite this in the form (x + a)² = b'
            },
            {
              title: 'Move the constant to the right',
              content: <MathRenderer math="x^2 + 6x = -5" />,
              explanation: 'Isolate the x terms on the left side'
            },
            {
              title: 'Add (b/2)² to both sides',
              content: <MathRenderer math="x^2 + 6x + 9 = -5 + 9" />,
              explanation: 'Here b = 6, so (6/2)² = 9'
            },
            {
              title: 'Factor the left side',
              content: <MathRenderer math="(x + 3)^2 = 4" />,
              explanation: 'The left side is now a perfect square'
            },
            {
              title: 'Take the square root',
              content: <MathRenderer math="x + 3 = \pm 2" />,
              explanation: "Don't forget the ± symbol!"
            },
            {
              title: 'Solve for x',
              content: <MathRenderer math="x = -3 + 2 = -1 \quad \text{or} \quad x = -3 - 2 = -5" />,
              explanation: 'The two solutions are x = -1 and x = -5'
            }
          ]}
        />

        {/* Exercise Components */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
          Practice Exercises
        </h2>

        <Exercise
          number={1}
          difficulty="easy"
          problem={
            <>
              <p>Solve for x:</p>
              <MathRenderer math="2x + 5 = 13" block />
            </>
          }
          hints={[
            <p key="1">Start by subtracting 5 from both sides.</p>,
            <p key="2">Then divide both sides by 2.</p>
          ]}
          solution={
            <>
              <MathRenderer math="2x + 5 = 13" block />
              <MathRenderer math="2x = 8" block />
              <MathRenderer math="x = 4" block />
            </>
          }
        />

        <Exercise
          number={2}
          difficulty="medium"
          problem={
            <>
              <p>Factor completely:</p>
              <MathRenderer math="x^2 - 9" block />
            </>
          }
          hints={[
            <p key="1">This is a difference of squares: <MathRenderer math="a^2 - b^2 = (a+b)(a-b)"  /></p>
          ]}
          solution={
            <>
              <p>Recognize this as a difference of squares where <MathRenderer math="a = x"  /> and <MathRenderer math="b = 3"  />:</p>
              <MathRenderer math="x^2 - 9 = x^2 - 3^2 = (x+3)(x-3)" block />
            </>
          }
        />

        <Exercise
          number={3}
          difficulty="hard"
          problem={
            <>
              <p>Find all solutions to:</p>
              <MathRenderer math="x^4 - 5x^2 + 4 = 0" block />
            </>
          }
          hints={[
            <p key="1">This is a quadratic in disguise. Let <MathRenderer math="u = x^2"  /></p>,
            <p key="2">Solve for u first, then solve for x.</p>
          ]}
          solution={
            <>
              <p>Let <MathRenderer math="u = x^2"  />. Then:</p>
              <MathRenderer math="u^2 - 5u + 4 = 0" block />
              <p>Factor:</p>
              <MathRenderer math="(u-1)(u-4) = 0" block />
              <p>So <MathRenderer math="u = 1"  /> or <MathRenderer math="u = 4"  /></p>
              <p>Substituting back:</p>
              <MathRenderer math="x^2 = 1 \Rightarrow x = \pm 1" block />
              <MathRenderer math="x^2 = 4 \Rightarrow x = \pm 2" block />
              <p>Solutions: <MathRenderer math="x \in \{-2, -1, 1, 2\}"  /></p>
            </>
          }
        />
      </div>
    </AppLayout>
  )
}
