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
import PercentageVisualizer from '@/components/visualizations/PercentageVisualizer'
import InteractivePercentageSlider from '@/components/interactive/InteractivePercentageSlider'

export default function PercentagesLesson() {
  const navigation = getLessonNavigation('foundations', 'percentages')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Percentages</h1>

      <Definition term="Percentage">
        <p>
          A <strong>percentage</strong> is a way of expressing a number as a fraction of 100. 
          The word "percent" comes from the Latin "per centum," meaning "per hundred."
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">The % Symbol:</p>
          <p>The symbol <strong>%</strong> means "out of 100" or "per 100"</p>
          <ul className="mt-2 space-y-1">
            <li><strong>50%</strong> means 50 out of 100, or <MathRenderer math="\frac{50}{100}" /></li>
            <li><strong>100%</strong> means the whole thing (all of it)</li>
            <li><strong>0%</strong> means none of it</li>
          </ul>
        </div>
      </Definition>

      <InteractivePercentageSlider maxValue={100} showAllFormats={true} />

      <KeyConcept title="Understanding Percent">
        <p className="mb-4">
          Percentages are used everywhere in daily life: grades, discounts, tips, taxes, interest rates, 
          statistics, and more. Understanding percentages helps you make better decisions with money and data.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="font-semibold mb-2">Real-World Examples:</p>
            <ul className="space-y-1 text-sm">
              <li>🎓 Grade: 85% on a test</li>
              <li>💰 Discount: 25% off sale</li>
              <li>🍽️ Tip: 15% gratuity</li>
              <li>📊 Tax: 8% sales tax</li>
              <li>🏦 Interest: 3% annual rate</li>
            </ul>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="font-semibold mb-2">Common Percentages:</p>
            <ul className="space-y-1 text-sm">
              <li>100% = everything (the whole)</li>
              <li>50% = half</li>
              <li>25% = one quarter</li>
              <li>75% = three quarters</li>
              <li>10% = one tenth</li>
            </ul>
          </div>
        </div>
      </KeyConcept>

      <Note type="success">
        <p className="font-semibold">🎯 Memory Trick - The "Cent" Connection:</p>
        <p className="mt-2">
          Think of <strong>percent</strong> like <strong>cents</strong> in a dollar!
        </p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>100 cents = 1 dollar = 100%</li>
          <li>50 cents = half dollar = 50%</li>
          <li>25 cents = quarter = 25%</li>
        </ul>
        <p className="mt-2 text-sm">Both "percent" and "cent" mean "per hundred"!</p>
      </Note>

      <PercentageVisualizer percentage={75} type="pie" showLabels={true} />

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Converting Percentages</h2>
        
        <Definition term="Percent to Decimal">
          <p>To convert a percentage to a decimal, divide by 100 (move the decimal point 2 places left).</p>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-semibold mb-2">Examples:</p>
            <ul className="space-y-1">
              <li>50% = 50 ÷ 100 = 0.50 = 0.5</li>
              <li>75% = 75 ÷ 100 = 0.75</li>
              <li>8% = 8 ÷ 100 = 0.08</li>
              <li>125% = 125 ÷ 100 = 1.25</li>
            </ul>
          </div>
        </Definition>

        <Note type="info">
          <p className="font-semibold">⚡ Quick Trick - Drop the % and Move:</p>
          <ul className="mt-2 space-y-2 list-disc list-inside">
            <li><strong>Remove the % sign</strong> and move decimal 2 left: 35% → 0.35</li>
            <li><strong>Shortcut:</strong> Just divide by 100 mentally!</li>
            <li><strong>Remember:</strong> % means "÷100" so 20% = 20÷100 = 0.20</li>
          </ul>
        </Note>

        <Definition term="Decimal to Percent">
          <p>To convert a decimal to a percentage, multiply by 100 (move the decimal point 2 places right) and add the % symbol.</p>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="font-semibold mb-2">Examples:</p>
            <ul className="space-y-1">
              <li>0.5 = 0.5 × 100 = 50%</li>
              <li>0.75 = 0.75 × 100 = 75%</li>
              <li>0.08 = 0.08 × 100 = 8%</li>
              <li>1.5 = 1.5 × 100 = 150%</li>
            </ul>
          </div>
        </Definition>

        <MultipleChoiceExercise
          question="Convert 0.35 to a percentage"
          choices={[
            { id: 'a', text: '3.5%', isCorrect: false },
            { id: 'b', text: '35%', isCorrect: true },
            { id: 'c', text: '350%', isCorrect: false },
            { id: 'd', text: '0.35%', isCorrect: false }
          ]}
          explanation="Multiply by 100: 0.35 × 100 = 35%"
          hint="Move the decimal point 2 places to the right"
        />

        <Definition term="Fraction to Percent">
          <p>To convert a fraction to a percentage:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Convert the fraction to a decimal (divide numerator by denominator)</li>
            <li>Multiply the decimal by 100</li>
            <li>Add the % symbol</li>
          </ol>
        </Definition>

        <Example 
          title="Converting Fraction to Percent"
          problem={<p>Convert <MathRenderer math="\frac{3}{4}" /> to a percentage</p>}
          solution={
            <StepByStep
              steps={[
                {
                  title: 'Convert to decimal',
                  content: <p>3 ÷ 4 = 0.75</p>
                },
                {
                  title: 'Multiply by 100',
                  content: <p>0.75 × 100 = 75</p>
                },
                {
                  title: 'Add % symbol',
                  content: <p><MathRenderer math="\frac{3}{4} = 75\%" /></p>
                }
              ]}
            />
          }
        />

        <Note type="warning">
          <p className="font-semibold">🎯 Common Percentage-Fraction Pairs (Memorize These!):</p>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">1/2 = 50%</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">1/4 = 25%</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">3/4 = 75%</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">1/5 = 20%</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">1/10 = 10%</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">1/3 ≈ 33.3%</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">2/3 ≈ 66.7%</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <div className="font-bold">1/8 = 12.5%</div>
            </div>
          </div>
        </Note>

        <NumericInputExercise
          question={<>What is <MathRenderer math="\frac{1}{5}" /> as a percentage?</>}
          correctAnswer={20}
          unit="%"
          solution="1 ÷ 5 = 0.2, then 0.2 × 100 = 20%"
          hint="First convert to decimal, then multiply by 100"
        />
      </section>

      <PercentageVisualizer percentage={40} type="grid" showLabels={true} />

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Calculating Percentages</h2>
        
        <KeyConcept title="Finding a Percentage of a Number">
          <p>To find what percentage of a number is:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Convert the percentage to a decimal (divide by 100)</li>
            <li>Multiply the decimal by the number</li>
          </ol>
          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="font-semibold mb-2">Formula:</p>
            <p className="text-center text-lg">
              <MathRenderer math="\text{Result} = \frac{\text{Percentage}}{100} \times \text{Number}" />
            </p>
          </div>
        </KeyConcept>

        <Note type="success">
          <p className="font-semibold">⚡ Mental Math Shortcuts:</p>
          <ul className="mt-2 space-y-2 list-disc list-inside">
            <li><strong>10%:</strong> Just divide by 10! (10% of 80 = 8)</li>
            <li><strong>50%:</strong> Divide by 2! (50% of 60 = 30)</li>
            <li><strong>25%:</strong> Divide by 4! (25% of 80 = 20)</li>
            <li><strong>1%:</strong> Divide by 100! (1% of 200 = 2)</li>
            <li><strong>For 15%:</strong> Find 10%, then add half of that</li>
            <li><strong>For 20%:</strong> Find 10% and double it</li>
          </ul>
        </Note>

        <Example 
          title="Finding a Percentage"
          problem={<p>What is 30% of 80?</p>}
          solution={
            <StepByStep
              steps={[
                {
                  title: 'Convert percent to decimal',
                  content: <p>30% = 30 ÷ 100 = 0.30</p>
                },
                {
                  title: 'Multiply',
                  content: <p>0.30 × 80 = 24</p>
                },
                {
                  title: 'Answer',
                  content: <p>30% of 80 = 24</p>
                }
              ]}
            />
          }
        />

        <MultipleChoiceExercise
          question="What is 25% of 60?"
          choices={[
            { id: 'a', text: '12', isCorrect: false },
            { id: 'b', text: '15', isCorrect: true },
            { id: 'c', text: '18', isCorrect: false },
            { id: 'd', text: '20', isCorrect: false }
          ]}
          explanation="25% = 0.25, and 0.25 × 60 = 15. Or use the shortcut: 25% = 1/4, so 60 ÷ 4 = 15"
          hint="Remember: 25% is the same as dividing by 4"
        />

        <Definition term="Finding What Percent One Number is of Another">
          <p>To find what percent one number is of another:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Divide the part by the whole</li>
            <li>Multiply by 100</li>
            <li>Add the % symbol</li>
          </ol>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-semibold mb-2">Formula:</p>
            <p className="text-center text-lg">
              <MathRenderer math="\text{Percentage} = \frac{\text{Part}}{\text{Whole}} \times 100\%" />
            </p>
          </div>
        </Definition>

        <Example 
          title="What Percent Is It?"
          problem={<p>15 is what percent of 60?</p>}
          solution={
            <StepByStep
              steps={[
                {
                  title: 'Divide part by whole',
                  content: <p>15 ÷ 60 = 0.25</p>
                },
                {
                  title: 'Multiply by 100',
                  content: <p>0.25 × 100 = 25</p>
                },
                {
                  title: 'Answer',
                  content: <p>15 is 25% of 60</p>
                }
              ]}
            />
          }
        />

        <NumericInputExercise
          question="20 is what percent of 80?"
          correctAnswer={25}
          unit="%"
          solution="20 ÷ 80 = 0.25, then 0.25 × 100 = 25%"
          hint="Divide 20 by 80, then multiply by 100"
        />
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Real-World Applications</h2>
        
        <KeyConcept title="Percentage Increase and Decrease">
          <p className="mb-4">
            Percentage change shows how much something has grown or shrunk compared to its original value.
          </p>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="font-semibold mb-2">Formula:</p>
            <p className="text-center text-lg mb-4">
              <MathRenderer math="\text{Percent Change} = \frac{\text{New Value} - \text{Original Value}}{\text{Original Value}} \times 100\%" />
            </p>
            <ul className="space-y-1 text-sm">
              <li>• If result is <strong>positive</strong> → percentage increase</li>
              <li>• If result is <strong>negative</strong> → percentage decrease</li>
            </ul>
          </div>
        </KeyConcept>

        <Example 
          title="Percentage Increase"
          problem={<p>A shirt originally cost $40 but now costs $50. What is the percentage increase?</p>}
          solution={
            <StepByStep
              steps={[
                {
                  title: 'Find the change',
                  content: <p>$50 - $40 = $10</p>
                },
                {
                  title: 'Divide by original',
                  content: <p>$10 ÷ $40 = 0.25</p>
                },
                {
                  title: 'Convert to percent',
                  content: <p>0.25 × 100 = 25%</p>
                },
                {
                  title: 'Answer',
                  content: <p>The price increased by 25%</p>
                }
              ]}
            />
          }
        />

        <PercentageVisualizer percentage={25} total={100} type="money" showLabels={true} />

        <Definition term="Discounts (Percentage Off)">
          <p>When something is on sale, the discount is often given as a percentage off the original price.</p>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="font-semibold mb-2">Two Methods:</p>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">Method 1: Find discount, then subtract</p>
                <ol className="list-decimal list-inside text-sm ml-2">
                  <li>Find the discount amount</li>
                  <li>Subtract from original price</li>
                </ol>
              </div>
              <div>
                <p className="font-semibold text-sm">Method 2: Use complement percentage</p>
                <p className="text-sm ml-2">If 20% off, you pay 80%. So multiply by 0.80</p>
              </div>
            </div>
          </div>
        </Definition>

        <Note type="info">
          <p className="font-semibold">⚡ Discount Shortcut - The Complement Method:</p>
          <ul className="mt-2 space-y-2 list-disc list-inside">
            <li><strong>20% off?</strong> Pay 80%, so multiply price by 0.80</li>
            <li><strong>25% off?</strong> Pay 75%, so multiply price by 0.75</li>
            <li><strong>30% off?</strong> Pay 70%, so multiply price by 0.70</li>
            <li><strong>Formula:</strong> Sale Price = Original × (1 - Discount%)</li>
          </ul>
          <p className="mt-2 text-sm font-semibold">This is faster because it's just one step!</p>
        </Note>

        <Example 
          title="Calculating Sale Price"
          problem={<p>A $80 jacket is on sale for 25% off. What is the sale price?</p>}
          solution={
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="font-semibold text-sm mb-1">Method 1: Find discount amount</p>
                <StepByStep
                  steps={[
                    {
                      title: 'Find 25% of $80',
                      content: <p>0.25 × $80 = $20</p>
                    },
                    {
                      title: 'Subtract from original',
                      content: <p>$80 - $20 = $60</p>
                    }
                  ]}
                />
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <p className="font-semibold text-sm mb-1">Method 2: Use complement (faster!)</p>
                <StepByStep
                  steps={[
                    {
                      title: 'Find what you pay',
                      content: <p>25% off means pay 75%</p>
                    },
                    {
                      title: 'Multiply',
                      content: <p>$80 × 0.75 = $60</p>
                    }
                  ]}
                />
              </div>
              <p className="text-center font-bold">Sale Price = $60</p>
            </div>
          }
        />

        <MultipleChoiceExercise
          question="A $50 item is 30% off. What is the sale price?"
          choices={[
            { id: 'a', text: '$15', isCorrect: false },
            { id: 'b', text: '$30', isCorrect: false },
            { id: 'c', text: '$35', isCorrect: true },
            { id: 'd', text: '$40', isCorrect: false }
          ]}
          explanation="30% off means you pay 70%. $50 × 0.70 = $35. Or: discount = $50 × 0.30 = $15, so $50 - $15 = $35"
          hint="30% off means you pay 70% of the original price"
        />

        <Definition term="Tips and Gratuity">
          <p>In restaurants and for services, it's customary to leave a tip (gratuity), usually calculated as a percentage of the bill.</p>
          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="font-semibold mb-2">Common Tip Percentages:</p>
            <ul className="space-y-1">
              <li>• <strong>15%</strong> - Standard service</li>
              <li>• <strong>18-20%</strong> - Good service</li>
              <li>• <strong>20-25%</strong> - Excellent service</li>
            </ul>
          </div>
        </Definition>

        <Note type="warning">
          <p className="font-semibold">💡 Quick Tip Calculator:</p>
          <div className="mt-2 space-y-2 text-sm">
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <p className="font-semibold">10% tip (easiest!):</p>
              <p>Move decimal one place left: Bill $45.00 → Tip $4.50</p>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <p className="font-semibold">15% tip:</p>
              <p>Find 10%, then add half: $45 → $4.50 + $2.25 = $6.75</p>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded">
              <p className="font-semibold">20% tip:</p>
              <p>Find 10% and double it: $45 → $4.50 × 2 = $9.00</p>
            </div>
          </div>
        </Note>

        <NumericInputExercise
          question="Calculate a 20% tip on a $65 restaurant bill."
          correctAnswer={13}
          unit="dollars"
          solution="20% = 0.20, so $65 × 0.20 = $13. Or: 10% is $6.50, double it = $13"
          hint="Find 10% first ($6.50), then double it"
        />

        <Definition term="Sales Tax">
          <p>Sales tax is a percentage added to the price of goods and services. The rate varies by location.</p>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-semibold mb-2">Calculating Total with Tax:</p>
            <p className="text-center">
              <MathRenderer math="\text{Total} = \text{Price} + (\text{Price} \times \text{Tax Rate})" />
            </p>
            <p className="text-center mt-2">Or use shortcut:</p>
            <p className="text-center">
              <MathRenderer math="\text{Total} = \text{Price} \times (1 + \text{Tax Rate})" />
            </p>
          </div>
        </Definition>

        <Example 
          title="Calculating Price with Tax"
          problem={<p>A computer costs $800 before tax. If the sales tax is 8%, what is the total price?</p>}
          solution={
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="font-semibold text-sm mb-1">Method 1: Add tax to price</p>
                <StepByStep
                  steps={[
                    {
                      title: 'Find tax amount',
                      content: <p>$800 × 0.08 = $64</p>
                    },
                    {
                      title: 'Add to original price',
                      content: <p>$800 + $64 = $864</p>
                    }
                  ]}
                />
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <p className="font-semibold text-sm mb-1">Method 2: Multiply by (1 + tax rate)</p>
                <StepByStep
                  steps={[
                    {
                      title: 'Calculate multiplier',
                      content: <p>1 + 0.08 = 1.08</p>
                    },
                    {
                      title: 'Multiply',
                      content: <p>$800 × 1.08 = $864</p>
                    }
                  ]}
                />
              </div>
              <p className="text-center font-bold">Total Price = $864</p>
            </div>
          }
        />

        <MultipleChoiceExercise
          question="A $120 item has 7% sales tax. What is the total cost?"
          choices={[
            { id: 'a', text: '$127.00', isCorrect: false },
            { id: 'b', text: '$128.40', isCorrect: true },
            { id: 'c', text: '$126.00', isCorrect: false },
            { id: 'd', text: '$130.00', isCorrect: false }
          ]}
          explanation="Total = $120 × 1.07 = $128.40. Or: tax = $120 × 0.07 = $8.40, so $120 + $8.40 = $128.40"
          hint="Multiply $120 by 1.07 (which is 100% + 7%)"
        />
      </section>

      <Note type="success">
        <p className="font-semibold">🎓 Master Percentage Strategy:</p>
        <ol className="mt-2 space-y-2 list-decimal list-inside">
          <li><strong>Memorize common equivalents:</strong> 50%=1/2, 25%=1/4, 10%=1/10</li>
          <li><strong>Use mental math shortcuts:</strong> For 10%, just move decimal left</li>
          <li><strong>Build from basics:</strong> Get 15% by finding 10% + 5% (half of 10%)</li>
          <li><strong>Check reasonableness:</strong> 20% of 100 should be about 20, not 200!</li>
          <li><strong>Practice with money:</strong> Tips, discounts, and taxes are everywhere</li>
        </ol>
      </Note>

      <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
        <h3 className="text-xl font-bold mb-3">🎯 Key Takeaways</h3>
        <ul className="space-y-2">
          <li>✓ Percent means "per hundred" - the % symbol represents /100</li>
          <li>✓ To convert: Percent ÷ 100 = Decimal, Decimal × 100 = Percent</li>
          <li>✓ Finding a percentage: Convert to decimal and multiply</li>
          <li>✓ Percentage change = (New - Old) / Old × 100%</li>
          <li>✓ Discounts: Multiply by (1 - discount%) for quick calculation</li>
          <li>✓ With tax: Multiply by (1 + tax%) to get total</li>
          <li>✓ Mental math: 10% = ÷10, 50% = ÷2, 25% = ÷4</li>
        </ul>
      </div>

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
