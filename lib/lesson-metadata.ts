import { LessonMetadata } from '@/types/lesson'

// Comprehensive lesson metadata database
export const lessonMetadataDB: Record<string, LessonMetadata> = {
  // Foundations (K-5)
  'number-sense': {
    id: 'number-sense',
    title: 'Number Sense & Place Value',
    slug: 'number-sense',
    domain: 'Foundations',
    domainSlug: 'foundations',
    description: 'Understanding numbers, counting, and place value',
    difficulty: 'beginner',
    estimatedTime: 45,
    prerequisites: [],
    learningObjectives: [
      'Count from 1 to 100',
      'Understand place value (ones, tens, hundreds)',
      'Compare numbers using <, >, =',
      'Identify odd and even numbers'
    ],
    keywords: ['counting', 'place value', 'comparison', 'odd', 'even', 'numbers'],
    exerciseCount: 25,
  },

  'arithmetic': {
    id: 'arithmetic',
    title: 'Basic Arithmetic',
    slug: 'arithmetic',
    domain: 'Foundations',
    domainSlug: 'foundations',
    description: 'Addition, subtraction, multiplication, and division',
    difficulty: 'beginner',
    estimatedTime: 60,
    prerequisites: ['number-sense'],
    learningObjectives: [
      'Add and subtract within 100',
      'Understand multiplication as repeated addition',
      'Master multiplication tables (1-12)',
      'Perform long division'
    ],
    keywords: ['addition', 'subtraction', 'multiplication', 'division', 'arithmetic'],
    exerciseCount: 80,
  },

  'fractions': {
    id: 'fractions',
    title: 'Fractions',
    slug: 'fractions',
    domain: 'Foundations',
    domainSlug: 'foundations',
    description: 'Understanding fractions, types, and equivalence',
    difficulty: 'beginner',
    estimatedTime: 60,
    prerequisites: ['arithmetic'],
    learningObjectives: [
      'Define fractions and identify numerator and denominator',
      'Distinguish between proper, improper, and mixed fractions',
      'Convert between improper fractions and mixed numbers',
      'Identify and create equivalent fractions',
      'Simplify fractions to lowest terms'
    ],
    keywords: ['fractions', 'numerator', 'denominator', 'equivalent', 'simplify', 'mixed number'],
    exerciseCount: 60,
    proofCount: 1,
  },

  'decimals': {
    id: 'decimals',
    title: 'Decimals',
    slug: 'decimals',
    domain: 'Foundations',
    domainSlug: 'foundations',
    description: 'Understanding decimal numbers and their operations',
    difficulty: 'beginner',
    estimatedTime: 50,
    prerequisites: ['fractions'],
    learningObjectives: [
      'Understand place value in decimal numbers',
      'Convert between fractions and decimals',
      'Compare and order decimal numbers',
      'Add and subtract decimals',
      'Multiply and divide decimals'
    ],
    keywords: ['decimals', 'place value', 'tenths', 'hundredths', 'decimal point', 'conversion'],
    exerciseCount: 50,
  },

  'percentages': {
    id: 'percentages',
    title: 'Percentages',
    slug: 'percentages',
    domain: 'Foundations',
    domainSlug: 'foundations',
    description: 'Understanding percentages and their real-world applications',
    difficulty: 'beginner',
    estimatedTime: 55,
    prerequisites: ['decimals', 'fractions'],
    learningObjectives: [
      'Understand the concept of percent as "per hundred"',
      'Convert between percentages, decimals, and fractions',
      'Calculate percentages of numbers',
      'Find percentage increase and decrease',
      'Apply percentages to real-world problems (discounts, tips, taxes, interest)'
    ],
    keywords: ['percentages', 'percent', 'discount', 'interest', 'tax', 'tip', 'conversion'],
    exerciseCount: 55,
  },

  // Pre-Algebra
  'integers': {
    id: 'integers',
    title: 'Integers & Rational Numbers',
    slug: 'integers',
    domain: 'Pre-Algebra',
    domainSlug: 'pre-algebra',
    description: 'Working with positive and negative numbers and rational numbers',
    difficulty: 'beginner',
    estimatedTime: 55,
    prerequisites: ['arithmetic'],
    learningObjectives: [
      'Understand integers and the number line',
      'Add and subtract integers',
      'Multiply and divide integers',
      'Define rational numbers',
      'Apply integer operations to real-world problems'
    ],
    keywords: ['integers', 'negative numbers', 'rational numbers', 'operations'],
    exerciseCount: 55,
  },

  // Algebra I & II
  'linear-equations': {
    id: 'linear-equations',
    title: 'Solving Linear Equations',
    slug: 'linear-equations',
    domain: 'Algebra I & II',
    domainSlug: 'algebra',
    description: 'Master techniques for solving one-variable linear equations',
    difficulty: 'beginner',
    estimatedTime: 75,
    prerequisites: ['arithmetic-integers', 'foundations-basic-arithmetic'],
    learningObjectives: [
      'Understand the properties of equality',
      'Solve one-step and multi-step equations',
      'Solve equations with variables on both sides',
      'Solve equations involving fractions',
      'Check solutions by substitution'
    ],
    keywords: ['linear equations', 'algebra', 'solving equations', 'variables', 'equality'],
    exerciseCount: 60,
    proofCount: 1,
  },

  'algebra-quadratics': {
    id: 'algebra-quadratics',
    title: 'Quadratic Equations',
    slug: 'quadratics',
    domain: 'Algebra I & II',
    domainSlug: 'algebra',
    description: 'Solving quadratic equations using multiple methods',
    difficulty: 'intermediate',
    estimatedTime: 90,
    prerequisites: ['pre-algebra-linear-equations', 'algebra-factoring'],
    learningObjectives: [
      'Identify quadratic equations and their standard form',
      'Solve quadratics by factoring',
      'Apply the quadratic formula',
      'Complete the square',
      'Understand the discriminant and nature of roots'
    ],
    keywords: ['quadratic', 'parabola', 'factoring', 'quadratic formula', 'completing square', 'discriminant'],
    exerciseCount: 65,
    proofCount: 3,
  },

  'algebra-polynomials': {
    id: 'algebra-polynomials',
    title: 'Polynomial Functions',
    slug: 'polynomials',
    domain: 'Algebra I & II',
    domainSlug: 'algebra',
    description: 'Understanding and manipulating polynomial expressions',
    difficulty: 'intermediate',
    estimatedTime: 75,
    prerequisites: ['algebra-quadratics'],
    learningObjectives: [
      'Define polynomials and identify degree',
      'Add, subtract, and multiply polynomials',
      'Factor polynomials using various techniques',
      'Apply the Remainder and Factor theorems',
      'Find zeros of polynomial functions'
    ],
    keywords: ['polynomial', 'degree', 'factoring', 'zeros', 'remainder theorem'],
    exerciseCount: 55,
    proofCount: 2,
  },

  // Geometry
  'reasoning-proofs': {
    id: 'reasoning-proofs',
    title: 'Geometric Reasoning & Proofs',
    slug: 'reasoning-proofs',
    domain: 'Geometry',
    domainSlug: 'geometry',
    description: 'Introduction to geometric proofs and logical reasoning',
    difficulty: 'intermediate',
    estimatedTime: 75,
    prerequisites: ['linear-equations'],
    learningObjectives: [
      'Understand postulates and theorems',
      'Apply deductive and inductive reasoning',
      'Prove the Vertical Angles Theorem',
      'Work with complementary and supplementary angles',
      'Understand conditional statements and their forms'
    ],
    keywords: ['geometric proof', 'postulates', 'theorems', 'reasoning', 'angles'],
    exerciseCount: 30,
    proofCount: 15,
  },

  'triangles': {
    id: 'triangles',
    title: 'Triangle Properties',
    slug: 'triangles',
    domain: 'Geometry',
    domainSlug: 'geometry',
    description: 'Properties, theorems, and classifications of triangles',
    difficulty: 'intermediate',
    estimatedTime: 80,
    prerequisites: ['reasoning-proofs'],
    learningObjectives: [
      'Apply the Triangle Angle Sum Theorem',
      'Classify triangles by angles and sides',
      'Use the Isosceles Triangle Theorem',
      'Apply the Triangle Inequality Theorem',
      'Work with exterior angles'
    ],
    keywords: ['triangles', 'angle sum', 'isosceles', 'triangle inequality', 'classifications'],
    exerciseCount: 45,
    proofCount: 15,
  },

  'pythagorean-theorem': {
    id: 'pythagorean-theorem',
    title: 'The Pythagorean Theorem',
    slug: 'pythagorean-theorem',
    domain: 'Geometry',
    domainSlug: 'geometry',
    description: 'Understanding and applying the Pythagorean theorem to right triangles',
    difficulty: 'beginner',
    estimatedTime: 60,
    prerequisites: ['foundations-basic-arithmetic', 'arithmetic-squares-roots'],
    learningObjectives: [
      'State and prove the Pythagorean theorem',
      'Identify the hypotenuse in right triangles',
      'Calculate unknown sides using a² + b² = c²',
      'Recognize common Pythagorean triples',
      'Apply the theorem to real-world problems',
      'Use the converse to determine if triangles are right triangles'
    ],
    keywords: ['pythagorean theorem', 'right triangle', 'hypotenuse', 'pythagorean triples', 'geometry'],
    exerciseCount: 50,
    proofCount: 2,
  },

  // Calculus
  'calculus-limits': {
    id: 'calculus-limits',
    title: 'Limits and Continuity',
    slug: 'limits',
    domain: 'Calculus',
    domainSlug: 'calculus',
    description: 'Introduction to limits and continuous functions',
    difficulty: 'advanced',
    estimatedTime: 120,
    prerequisites: ['algebra-functions', 'pre-calculus-sequences'],
    learningObjectives: [
      'Understand the concept of a limit',
      'Evaluate limits algebraically and graphically',
      'Apply limit laws',
      'Determine continuity of functions',
      'Evaluate limits at infinity'
    ],
    keywords: ['limit', 'continuity', 'infinity', 'indeterminate forms', 'epsilon-delta'],
    exerciseCount: 70,
    proofCount: 8,
  },

  'calculus-derivatives': {
    id: 'calculus-derivatives',
    title: 'Derivatives',
    slug: 'derivatives',
    domain: 'Calculus',
    domainSlug: 'calculus',
    description: 'Understanding rates of change and differentiation',
    difficulty: 'advanced',
    estimatedTime: 150,
    prerequisites: ['calculus-limits'],
    learningObjectives: [
      'Define the derivative as a limit',
      'Apply differentiation rules (power, product, quotient, chain)',
      'Differentiate trigonometric, exponential, and logarithmic functions',
      'Find equations of tangent lines',
      'Apply derivatives to real-world problems'
    ],
    keywords: ['derivative', 'differentiation', 'rate of change', 'tangent', 'chain rule'],
    exerciseCount: 90,
    proofCount: 12,
  },
}

// Helper function to get lesson metadata
export function getLessonMetadata(lessonId: string): LessonMetadata | undefined {
  return lessonMetadataDB[lessonId]
}

// Helper function to get lessons by domain
export function getLessonsByDomain(domainSlug: string): LessonMetadata[] {
  return Object.values(lessonMetadataDB).filter(
    lesson => lesson.domainSlug === domainSlug
  )
}

// Helper function to get prerequisites
export function getPrerequisites(lessonId: string): LessonMetadata[] {
  const lesson = lessonMetadataDB[lessonId]
  if (!lesson) return []
  
  return lesson.prerequisites
    .map(prereqId => lessonMetadataDB[prereqId])
    .filter(Boolean) as LessonMetadata[]
}

// Helper function to search lessons
export function searchLessons(query: string): LessonMetadata[] {
  const lowerQuery = query.toLowerCase()
  
  return Object.values(lessonMetadataDB)
    .filter(lesson => {
      const searchableText = [
        lesson.title,
        lesson.description,
        lesson.domain,
        ...lesson.keywords,
        ...lesson.learningObjectives
      ].join(' ').toLowerCase()
      
      return searchableText.includes(lowerQuery)
    })
    .sort((a, b) => {
      // Prioritize title matches
      const aInTitle = a.title.toLowerCase().includes(lowerQuery)
      const bInTitle = b.title.toLowerCase().includes(lowerQuery)
      if (aInTitle && !bInTitle) return -1
      if (!aInTitle && bInTitle) return 1
      return 0
    })
}
