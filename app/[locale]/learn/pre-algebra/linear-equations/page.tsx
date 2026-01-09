import MathRenderer from '@/components/math/MathRenderer'
import { 
  Definition, 
  Theorem, 
  Example, 
  KeyConcept, 
  Note, 
  StepByStep
} from '@/components/lesson'
import { 
  NumericInputExercise, 
  MultipleChoiceExercise, 
  BalanceScale, 
  StepByStepHighlighter,
  InteractiveGraphPlotter 
} from '@/components/interactive'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'

export default function LinearEquationsLesson() {
  const navigation = getLessonNavigation('pre-algebra', 'linear-equations')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Solving Linear Equations</h1>

      <Definition term="Linear Equation">
        <p>
          A <strong>linear equation</strong> is an equation that can be written in the form:
        </p>
        <div className="mt-3 text-center">
          <MathRenderer math="ax + b = c" block />
        </div>
        <p className="mt-3">
          where <MathRenderer math="a" />, <MathRenderer math="b" />, and <MathRenderer math="c" /> are constants, 
          and <MathRenderer math="a \neq 0" /> (read as "a does not equal zero" or "a is not equal to zero").
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">Examples:</p>
          <ul className="space-y-1">
            <li><MathRenderer math="2x + 5 = 13" /></li>
            <li><MathRenderer math="7x - 3 = 18" /></li>
            <li><MathRenderer math="-4x + 12 = 0" /></li>
          </ul>
        </div>
      </Definition>

      <KeyConcept title="Goal of Solving">
        When solving a linear equation, our goal is to <strong>isolate the variable</strong> (usually <MathRenderer math="x" />) 
        on one side of the equation to find its value.
      </KeyConcept>

      <BalanceScale
        leftValue={10}
        rightValue={10}
        label="⚖️ Interactive: Keep the scale balanced!"
        showSolution={true}
      />

      <Definition term="Properties for Solving Equations">
        <ul className="space-y-3">
          <li>
            <strong>Addition Property</strong>: Add the same number to both sides
            <div className="mt-1 text-sm">
              If <MathRenderer math="a = b" />, then <MathRenderer math="a + c = b + c" />
            </div>
          </li>
          <li>
            <strong>Subtraction Property</strong>: Subtract the same number from both sides
            <div className="mt-1 text-sm">
              If <MathRenderer math="a = b" />, then <MathRenderer math="a - c = b - c" />
            </div>
          </li>
          <li>
            <strong>Multiplication Property</strong>: Multiply both sides by the same number
            <div className="mt-1 text-sm">
              If <MathRenderer math="a = b" />, then <MathRenderer math="ac = bc" /> (where <MathRenderer math="c \neq 0" />)
            </div>
          </li>
          <li>
            <strong>Division Property</strong>: Divide both sides by the same number
            <div className="mt-1 text-sm">
              If <MathRenderer math="a = b" />, then <MathRenderer math="\frac{a}{c} = \frac{b}{c}" /> (where <MathRenderer math="c \neq 0" />)
            </div>
          </li>
        </ul>
      </Definition>

      <Example
        problem={<>Solve: <MathRenderer math="3x + 7 = 22" /></>}
        solution={
          <StepByStep
            steps={[
              {
                title: 'Subtract 7 from both sides',
                content: (
                  <div>
                    <MathRenderer math="3x + 7 - 7 = 22 - 7" block />
                    <MathRenderer math="3x = 15" block />
                  </div>
                )
              },
              {
                title: 'Divide both sides by 3',
                content: (
                  <div>
                    <MathRenderer math="\frac{3x}{3} = \frac{15}{3}" block />
                    <MathRenderer math="x = 5" block />
                  </div>
                )
              },
              {
                title: 'Check the solution',
                content: (
                  <div>
                    <p>Substitute <MathRenderer math="x = 5" /> back into the original equation:</p>
                    <MathRenderer math="3(5) + 7 = 15 + 7 = 22 \checkmark" block />
                  </div>
                )
              }
            ]}
          />
        }
        hint={<>First, add 8 to both sides to isolate the term with <MathRenderer math="x" />. Then divide by the coefficient of <MathRenderer math="x" />.</>}
      />

      <StepByStepHighlighter
        steps={[
          { 
            content: <><MathRenderer math="3x + 7 = 22" /></>, 
            explanation: "Start with the original equation" 
          },
          { 
            content: <><MathRenderer math="3x + 7 - 7 = 22 - 7" /></>, 
            explanation: "Subtract 7 from both sides (Addition Property of Equality)" 
          },
          { 
            content: <><MathRenderer math="3x = 15" /></>, 
            explanation: "Simplify both sides" 
          },
          { 
            content: <><MathRenderer math="\\frac{3x}{3} = \\frac{15}{3}" /></>, 
            explanation: "Divide both sides by 3 (Division Property of Equality)" 
          },
          { 
            content: <><MathRenderer math="x = 5" /></>, 
            explanation: "Solution! x equals 5. Always check your answer!" 
          }
        ]}
        autoPlay={false}
        autoPlayDelay={2500}
        label="🎬 Interactive: Watch the solving process step-by-step"
      />

      <NumericInputExercise
        question={<>Solve for <MathRenderer math="x" />: <MathRenderer math="5x - 8 = 27" /></>}
        correctAnswer={7}
        hint={
          <>
            <p>First, add 8 to both sides to isolate the term with <MathRenderer math="x" />.</p>
            <p className="mt-2">Then divide by the coefficient of <MathRenderer math="x" />.</p>
          </>
        }
        solution={
          <div className="space-y-2">
            <p><MathRenderer math="5x - 8 + 8 = 27 + 8" /></p>
            <p><MathRenderer math="5x = 35" /></p>
            <p><MathRenderer math="x = \frac{35}{5} = 7" /></p>
            <p className="mt-3">Check: <MathRenderer math="5(7) - 8 = 35 - 8 = 27 \checkmark" /></p>
          </div>
        }
      />

      <Example
        problem={<>Solve: <MathRenderer math="4x + 9 = 2x + 21" /></>}
        solution={
          <StepByStep
            steps={[
              {
                title: 'Move all x terms to one side',
                content: (
                  <div>
                    <p>Subtract <MathRenderer math="2x" /> from both sides:</p>
                    <MathRenderer math="4x - 2x + 9 = 2x - 2x + 21" block />
                    <MathRenderer math="2x + 9 = 21" block />
                  </div>
                )
              },
              {
                title: 'Move constants to the other side',
                content: (
                  <div>
                    <p>Subtract 9 from both sides:</p>
                    <MathRenderer math="2x + 9 - 9 = 21 - 9" block />
                    <MathRenderer math="2x = 12" block />
                  </div>
                )
              },
              {
                title: 'Solve for x',
                content: (
                  <div>
                    <p>Divide both sides by 2:</p>
                    <MathRenderer math="x = \frac{12}{2} = 6" block />
                  </div>
                )
              }
            ]}
          />
        }
        hint={<>Get all x terms on one side and all constants on the other. Subtract 2x from both sides first.</>}
      />

      <MultipleChoiceExercise
        question={<>What is the first step to solve <MathRenderer math="7x - 4 = 3x + 12" />?</>}
        choices={[
          { id: 'a', text: 'Add 4 to both sides', isCorrect: false },
          { id: 'b', text: 'Subtract 3x from both sides', isCorrect: true },
          { id: 'c', text: 'Divide both sides by 7', isCorrect: false },
          { id: 'd', text: 'Multiply both sides by 3', isCorrect: false }
        ]}
        explanation={
          <>
            Subtracting <MathRenderer math="3x" /> from both sides groups all <MathRenderer math="x" /> terms together on the left: 
            <MathRenderer math="4x - 4 = 12" />. Then you can proceed to isolate <MathRenderer math="x" />.
          </>
        }
        hint="When variables appear on both sides, collect them on one side first."
      />

      <NumericInputExercise
        question={<>Solve: <MathRenderer math="6x + 5 = 4x + 17" /></>}
        correctAnswer={6}
        hint={
          <>
            <p>1. Subtract <MathRenderer math="4x" /> from both sides</p>
            <p>2. Subtract 5 from both sides</p>
            <p>3. Divide by the coefficient of <MathRenderer math="x" /></p>
          </>
        }
        solution={
          <div className="space-y-2">
            <p><MathRenderer math="6x - 4x + 5 = 4x - 4x + 17" /></p>
            <p><MathRenderer math="2x + 5 = 17" /></p>
            <p><MathRenderer math="2x = 12" /></p>
            <p><MathRenderer math="x = 6" /></p>
          </div>
        }
      />

      <Note type="warning">
        <p className="font-semibold">Common Mistakes to Avoid:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Forgetting to apply operations to BOTH sides of the equation</li>
          <li>Sign errors when moving terms across the equals sign</li>
          <li>Dividing by zero (never allowed!)</li>
          <li>Not checking your answer by substituting back</li>
        </ul>
      </Note>

      <Example
        problem={<>Solve: <MathRenderer math="\frac{x}{3} + 5 = 11" /></>}
        solution={
          <StepByStep
            steps={[
              {
                title: 'Subtract 5 from both sides',
                content: <MathRenderer math="\frac{x}{3} = 6" block />
              },
              {
                title: 'Multiply both sides by 3',
                content: (
                  <div>
                    <MathRenderer math="3 \cdot \frac{x}{3} = 3 \cdot 6" block />
                    <MathRenderer math="x = 18" block />
                  </div>
                )
              },
              {
                title: 'Verify',
                content: <MathRenderer math="\frac{18}{3} + 5 = 6 + 5 = 11 \checkmark" block />
              }
            ]}
          />
        }
      />

      <NumericInputExercise
        question={<>Solve: <MathRenderer math="\frac{x}{4} - 2 = 5" /></>}
        correctAnswer={28}
        hint="First add 2 to both sides, then multiply by 4."
        solution={
          <div className="space-y-2">
            <p><MathRenderer math="\frac{x}{4} - 2 + 2 = 5 + 2" /></p>
            <p><MathRenderer math="\frac{x}{4} = 7" /></p>
            <p><MathRenderer math="x = 7 \times 4 = 28" /></p>
          </div>
        }
      />

      <Theorem
        title="Unique Solution for Linear Equations"
        proof={
          <div className="space-y-3">
            <p>Starting with: <MathRenderer math="ax + b = c" /></p>
            <p>Subtract <MathRenderer math="b" /> from both sides:</p>
            <MathRenderer math="ax = c - b" block />
            <p>Divide both sides by <MathRenderer math="a" /> (since <MathRenderer math="a \neq 0" />):</p>
            <MathRenderer math="x = \frac{c - b}{a}" block />
            <p className="mt-3">
              This solution is <strong>unique</strong> because each step is reversible and maintains equality.
            </p>
          </div>
        }
      >
        Every linear equation <MathRenderer math="ax + b = c" /> (where <MathRenderer math="a \neq 0" />) 
        has exactly one solution: <MathRenderer math="x = \frac{c - b}{a}" />
      </Theorem>

      <MultipleChoiceExercise
        question={<>Which equation has the solution <MathRenderer math="x = -3" />?</>}
        choices={[
          { id: 'a', text: <MathRenderer math="2x + 6 = 0" />, isCorrect: true },
          { id: 'b', text: <MathRenderer math="3x - 9 = 0" />, isCorrect: false },
          { id: 'c', text: <MathRenderer math="x + 3 = 0" />, isCorrect: false },
          { id: 'd', text: <MathRenderer math="-x + 3 = 0" />, isCorrect: false }
        ]}
        explanation={
          <>
            Substituting <MathRenderer math="x = -3" /> into <MathRenderer math="2x + 6 = 0" />: 
            <MathRenderer math="2(-3) + 6 = -6 + 6 = 0 \checkmark" />
          </>
        }
        hint="Try substituting x = -3 into each equation to see which one works."
      />

      <Note type="success">
        <p className="font-semibold">Great work!</p>
        <p className="mt-1">
          You've mastered solving linear equations! These skills are essential for algebra, 
          and you'll use them constantly in more advanced mathematics. Next, you'll learn 
          about solving systems of linear equations and linear inequalities.
        </p>
      </Note>

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
