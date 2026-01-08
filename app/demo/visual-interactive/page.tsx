import { ProgressBar, Tabs, CollapsibleSection } from '@/components/ui'
import { 
  NumberLine, 
  FractionVisualizer,
  TriangleVisualizer,
  PythagoreanVisualizer,
  ArithmeticVisualizer,
  IntegerNumberLine
} from '@/components/visualizations'
import {
  InteractiveFractionSlider,
  BalanceScale,
  InteractiveGraphPlotter,
  DragDropMatcher,
  StepByStepHighlighter
} from '@/components/interactive'
import MathRenderer from '@/components/math/MathRenderer'
import { Definition, KeyConcept, Note } from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise } from '@/components/interactive'

export default function VisualInteractiveDemoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Visual & Interactive Features Demo
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Explore the enhanced visual and interactive components designed to make learning more engaging!
      </p>

      {/* Progress Bar Demo */}
      <CollapsibleSection 
        title="Progress Tracking" 
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
      >
        <div className="space-y-6">
          <ProgressBar current={3} total={10} label="Lesson Progress" />
          <ProgressBar current={7} total={10} label="Exercises Completed" />
          <ProgressBar current={10} total={10} label="Section Complete!" />
        </div>
      </CollapsibleSection>

      {/* Number Line Visualization */}
      <CollapsibleSection 
        title="Number Line Visualization" 
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        }
      >
        <Definition term="Interactive Number Lines">
          <p>Visual number lines help understand integer operations, comparisons, and magnitude.</p>
        </Definition>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">Positive Numbers</h4>
        <NumberLine min={0} max={10} value={7} highlights={[3, 5]} />

        <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Integers (Including Negatives)</h4>
        <NumberLine min={-10} max={10} value={-3} highlights={[0, 5]} />
      </CollapsibleSection>

      {/* Tabbed Content Demo */}
      <CollapsibleSection 
        title="Organized Content with Tabs"
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
      >
        <Tabs
          tabs={[
            {
              id: 'concept',
              label: '📚 Concept',
              content: (
                <KeyConcept title="Understanding Fractions">
                  Fractions represent parts of a whole. The numerator tells us how many parts we have,
                  and the denominator tells us how many equal parts make up the whole.
                </KeyConcept>
              )
            },
            {
              id: 'examples',
              label: '✏️ Examples',
              content: (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <p className="font-semibold mb-2">Example 1: Pizza Slices</p>
                    <p>If a pizza is cut into 8 slices and you eat 3, you ate <MathRenderer math="\frac{3}{8}" /> of the pizza.</p>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <p className="font-semibold mb-2">Example 2: Hour on Clock</p>
                    <p>30 minutes is <MathRenderer math="\frac{30}{60} = \frac{1}{2}" /> of an hour.</p>
                  </div>
                </div>
              )
            },
            {
              id: 'practice',
              label: '🎯 Practice',
              content: (
                <MultipleChoiceExercise
                  question={<>Which fraction represents one-quarter?</>}
                  choices={[
                    { id: 'a', text: <MathRenderer math="\frac{1}{2}" />, isCorrect: false },
                    { id: 'b', text: <MathRenderer math="\frac{1}{4}" />, isCorrect: true },
                    { id: 'c', text: <MathRenderer math="\frac{1}{3}" />, isCorrect: false },
                    { id: 'd', text: <MathRenderer math="\frac{2}{4}" />, isCorrect: false }
                  ]}
                  explanation="One-quarter means 1 out of 4 equal parts, which is 1/4."
                  hint="Quarter means 4 parts"
                />
              )
            }
          ]}
        />
      </CollapsibleSection>

      {/* Interactive Exercise with Celebration */}
      <CollapsibleSection 
        title="Interactive Exercises with Celebrations"
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      >
        <Note type="tip">
          <p className="font-semibold">Try getting an answer correct!</p>
          <p className="mt-1">You'll see a celebration animation with confetti when you get the right answer! 🎉</p>
        </Note>

        <NumericInputExercise
          question={<>What is <MathRenderer math="5 + 7" />?</>}
          correctAnswer={12}
          hint="Add the two numbers together"
          solution={<p><MathRenderer math="5 + 7 = 12" /></p>}
        />

        <MultipleChoiceExercise
          question={<>What is <MathRenderer math="3 \times 4" />?</>}
          choices={[
            { id: 'a', text: '7', isCorrect: false },
            { id: 'b', text: '12', isCorrect: true },
            { id: 'c', text: '10', isCorrect: false },
            { id: 'd', text: '15', isCorrect: false }
          ]}
          explanation="3 × 4 = 12 (3 groups of 4, or 4 + 4 + 4)"
          hint="Think of multiplication as repeated addition"
        />
      </CollapsibleSection>

      {/* Arithmetic Visualizations */}
      <CollapsibleSection 
        title="Arithmetic with Animated Dots" 
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        }
      >
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Watch operations come to life with animated visual representations!
        </p>
        
        <div className="space-y-6">
          <ArithmeticVisualizer
            operation="addition"
            num1={5}
            num2={3}
            label="Addition: 5 + 3 = 8"
          />
          
          <ArithmeticVisualizer
            operation="multiplication"
            num1={4}
            num2={3}
            label="Multiplication: 4 × 3 = 12"
          />
        </div>
      </CollapsibleSection>

      {/* Fraction Visualizations */}
      <CollapsibleSection 
        title="Interactive Fraction Models" 
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        }
      >
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Hover over the parts to highlight them! See fractions as circles (pizzas) or bars.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FractionVisualizer
            numerator={3}
            denominator={4}
            type="circle"
            interactive={true}
            label="3/4 - Three Quarters (Circle)"
          />
          
          <FractionVisualizer
            numerator={5}
            denominator={8}
            type="bar"
            interactive={true}
            label="5/8 - Five Eighths (Bar)"
          />
        </div>
      </CollapsibleSection>

      {/* Integer Number Line */}
      <CollapsibleSection 
        title="Animated Integer Operations" 
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
      >
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Watch the marker move along the number line to visualize integer operations!
        </p>
        
        <IntegerNumberLine
          min={-8}
          max={8}
          start={-3}
          operations={[
            { value: 5, label: '+5' }
          ]}
          showAnimation={true}
          label="Adding Positive to Negative: (-3) + 5 = 2"
        />
      </CollapsibleSection>

      {/* Triangle Visualization */}
      <CollapsibleSection 
        title="Triangle Properties" 
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21l9-18 9 18H3z" />
          </svg>
        }
      >
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Animated triangles showing different angle combinations. Watch them scale in!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TriangleVisualizer
            angleA={60}
            angleB={60}
            angleC={60}
            showAngles={true}
            animated={true}
            label="Equilateral (60°, 60°, 60°)"
          />
          
          <TriangleVisualizer
            angleA={90}
            angleB={45}
            angleC={45}
            showAngles={true}
            highlightRight={true}
            animated={true}
            label="Right Triangle (90°, 45°, 45°)"
          />
        </div>
      </CollapsibleSection>

      {/* Pythagorean Theorem */}
      <CollapsibleSection 
        title="Pythagorean Theorem Visualization" 
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3z" />
          </svg>
        }
      >
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          See the famous theorem come to life with squares on each side!
        </p>
        
        <PythagoreanVisualizer
          a={3}
          b={4}
          c={5}
          showSquares={true}
          animated={true}
          label="The Famous 3-4-5 Triangle: 3² + 4² = 5²"
        />
      </CollapsibleSection>

      {/* NEW: Interactive Fraction Slider */}
      <CollapsibleSection 
        title="🎮 Interactive Fraction Slider" 
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        }
      >
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Drag sliders to build any fraction and see it visualize in real-time!
        </p>
        
        <InteractiveFractionSlider
          maxNumerator={12}
          maxDenominator={12}
          initialNumerator={3}
          initialDenominator={4}
          visualType="circle"
          showDecimal={true}
          label="Build Your Own Fraction"
        />
      </CollapsibleSection>

      {/* NEW: Balance Scale */}
      <CollapsibleSection 
        title="⚖️ Equation Balance Scale" 
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        }
      >
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Keep the scale balanced! Apply operations to both sides equally.
        </p>
        
        <BalanceScale
          leftValue={15}
          rightValue={15}
          label="Solve: Keep both sides equal"
          showSolution={true}
        />
      </CollapsibleSection>

      {/* NEW: Interactive Graph Plotter */}
      <CollapsibleSection 
        title="📈 Interactive Graph Plotter" 
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        }
      >
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Adjust slope and y-intercept to see the line change in real-time!
        </p>
        
        <InteractiveGraphPlotter
          initialSlope={2}
          initialIntercept={1}
          showGrid={true}
          showEquation={true}
          label="Explore Linear Equations: y = mx + b"
        />
      </CollapsibleSection>

      {/* NEW: Drag and Drop Matcher */}
      <CollapsibleSection 
        title="🎯 Drag & Drop Matching" 
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        }
      >
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Drag answers to match with questions. Great for vocabulary and concepts!
        </p>
        
        <DragDropMatcher
          pairs={[
            { 
              id: '1', 
              question: <><MathRenderer math="\\frac{1}{2}" /></>, 
              answer: <>0.5 or 50%</> 
            },
            { 
              id: '2', 
              question: <><MathRenderer math="\\frac{1}{4}" /></>, 
              answer: <>0.25 or 25%</> 
            },
            { 
              id: '3', 
              question: <><MathRenderer math="\\frac{3}{4}" /></>, 
              answer: <>0.75 or 75%</> 
            },
            { 
              id: '4', 
              question: <><MathRenderer math="\\frac{1}{10}" /></>, 
              answer: <>0.1 or 10%</> 
            }
          ]}
          label="Match Fractions to Decimals"
        />
      </CollapsibleSection>

      {/* NEW: Step-by-Step Highlighter */}
      <CollapsibleSection 
        title="✨ Step-by-Step Highlighter" 
        defaultOpen={true}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        }
      >
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Watch problem-solving steps highlight one at a time with explanations!
        </p>
        
        <StepByStepHighlighter
          steps={[
            { 
              content: <><MathRenderer math="2x + 5 = 13" /></>, 
              explanation: "Start with the original equation" 
            },
            { 
              content: <><MathRenderer math="2x + 5 - 5 = 13 - 5" /></>, 
              explanation: "Subtract 5 from both sides" 
            },
            { 
              content: <><MathRenderer math="2x = 8" /></>, 
              explanation: "Simplify both sides" 
            },
            { 
              content: <><MathRenderer math="\\frac{2x}{2} = \\frac{8}{2}" /></>, 
              explanation: "Divide both sides by 2" 
            },
            { 
              content: <><MathRenderer math="x = 4" /></>, 
              explanation: "Solution! x equals 4" 
            }
          ]}
          autoPlay={false}
          autoPlayDelay={2000}
          label="Solving: 2x + 5 = 13"
        />
      </CollapsibleSection>

      {/* Summary */}
      <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          ✨ Visual Enhancements Summary
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Interactive Sliders:</strong> Real-time fraction and equation manipulation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Balance Scale:</strong> Visual equation solving with "what you do to one side"</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Graph Plotter:</strong> Explore slope and intercept with live graphing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Drag & Drop:</strong> Active learning through matching exercises</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Step Highlighter:</strong> Problem-solving steps with play/pause control</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Progress Bars:</strong> Track completion with animated gradients</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Celebrations:</strong> Confetti animations for correct answers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Arithmetic Visualizers:</strong> Animated dots showing operations step-by-step</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Fraction Models:</strong> Interactive circle and bar visualizations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Number Lines:</strong> Visual representation with animated markers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Geometry Shapes:</strong> Triangles with angle labels and animations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Pythagorean Visualizer:</strong> Squares on triangle sides with calculations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span><strong>Tabs & Collapsible:</strong> Organize content into digestible sections</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
