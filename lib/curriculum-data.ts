export interface Topic {
  id: string
  title: string
  slug: string
  exerciseCount: number
  proofCount?: number
}

export interface Domain {
  id: string
  title: string
  description: string
  level: string
  slug: string
  topics: Topic[]
}

export const curriculumData: Domain[] = [
  {
    id: '1',
    title: 'Foundations',
    description: 'Ages 5-11 / Grades K-5',
    level: 'Elementary',
    slug: 'foundations',
    topics: [
      { id: '1.1', title: 'Number Sense & Place Value', slug: 'number-sense', exerciseCount: 25 },
      { id: '1.2', title: 'Basic Arithmetic', slug: 'arithmetic', exerciseCount: 80 },
      { id: '1.3', title: 'Fractions', slug: 'fractions', exerciseCount: 60 },
      { id: '1.4', title: 'Decimals', slug: 'decimals', exerciseCount: 50 },
      { id: '1.5', title: 'Percentages', slug: 'percentages', exerciseCount: 40 },
      { id: '1.6', title: 'Ratios & Proportions', slug: 'ratios-proportions', exerciseCount: 6 },
      { id: '1.7', title: 'Basic Geometry', slug: 'basic-geometry', exerciseCount: 5 },
      { id: '1.8', title: 'Measurement', slug: 'measurement', exerciseCount: 5 },
      { id: '1.9', title: 'Basic Data & Graphs', slug: 'data-graphs', exerciseCount: 5 },
    ],
  },
  {
    id: '2',
    title: 'Pre-Algebra',
    description: 'Ages 11-13 / Grades 6-8',
    level: 'Middle School',
    slug: 'pre-algebra',
    topics: [
      { id: '2.1', title: 'Integers & Rational Numbers', slug: 'integers', exerciseCount: 55 },
      { id: '2.2', title: 'Exponents & Powers', slug: 'exponents', exerciseCount: 50 },
      { id: '2.3', title: 'Algebraic Expressions', slug: 'expressions', exerciseCount: 60 },
      { id: '2.4', title: 'Linear Equations (One Variable)', slug: 'linear-equations', exerciseCount: 70 },
      { id: '2.5', title: 'Inequalities', slug: 'inequalities', exerciseCount: 40 },
      { id: '2.6', title: 'Coordinate Plane & Graphing', slug: 'coordinate-plane', exerciseCount: 55 },
      { id: '2.7', title: 'Introduction to Functions', slug: 'functions-intro', exerciseCount: 35 },
      { id: '2.8', title: 'Systems of Equations (Introduction)', slug: 'systems-intro', exerciseCount: 40 },
      { id: '2.9', title: 'Polynomials (Introduction)', slug: 'polynomials-intro', exerciseCount: 45 },
    ],
  },
  {
    id: '3',
    title: 'Algebra I & II',
    description: 'Ages 13-16 / Grades 9-11',
    level: 'High School',
    slug: 'algebra',
    topics: [
      { id: '3.1', title: 'Advanced Linear Equations', slug: 'advanced-linear', exerciseCount: 50 },
      { id: '3.2', title: 'Quadratic Equations', slug: 'quadratics', exerciseCount: 65 },
      { id: '3.3', title: 'Polynomial Functions', slug: 'polynomials', exerciseCount: 55 },
      { id: '3.4', title: 'Rational Expressions', slug: 'rational', exerciseCount: 50 },
      { id: '3.5', title: 'Radical Expressions', slug: 'radicals', exerciseCount: 45 },
      { id: '3.6', title: 'Exponential & Logarithmic Functions', slug: 'exp-log', exerciseCount: 60 },
      { id: '3.7', title: 'Sequences & Series', slug: 'sequences', exerciseCount: 40 },
      { id: '3.8', title: 'Matrices (Introduction)', slug: 'matrices-intro', exerciseCount: 35 },
    ],
  },
  {
    id: '4',
    title: 'Geometry',
    description: 'Ages 14-16 / Grades 9-10',
    level: 'High School',
    slug: 'geometry',
    topics: [
      { id: '4.1', title: 'Geometric Reasoning & Proofs', slug: 'reasoning-proofs', exerciseCount: 30, proofCount: 15 },
      { id: '4.2', title: 'Triangle Properties', slug: 'triangles', exerciseCount: 45, proofCount: 15 },
      { id: '4.3', title: 'Similarity & Proportions', slug: 'similarity', exerciseCount: 40, proofCount: 10 },
      { id: '4.4', title: 'Right Triangle Trigonometry', slug: 'right-triangles', exerciseCount: 55 },
      { id: '4.5', title: 'Polygons & Quadrilaterals', slug: 'polygons', exerciseCount: 50, proofCount: 12 },
      { id: '4.6', title: 'Circles', slug: 'circles', exerciseCount: 55, proofCount: 10 },
      { id: '4.7', title: 'Area & Volume', slug: 'area-volume', exerciseCount: 60 },
      { id: '4.8', title: 'Transformations', slug: 'transformations', exerciseCount: 40 },
      { id: '4.9', title: 'Coordinate Geometry', slug: 'coordinate-geometry', exerciseCount: 45, proofCount: 10 },
    ],
  },
  {
    id: '5',
    title: 'Trigonometry',
    description: 'Ages 15-17 / Grades 10-12',
    level: 'High School',
    slug: 'trigonometry',
    topics: [
      { id: '5.1', title: 'Angles & Measurement', slug: 'angles', exerciseCount: 35 },
      { id: '5.2', title: 'Unit Circle & Trig Functions', slug: 'unit-circle', exerciseCount: 50 },
      { id: '5.3', title: 'Graphs of Trig Functions', slug: 'trig-graphs', exerciseCount: 45 },
      { id: '5.4', title: 'Trigonometric Identities', slug: 'identities', exerciseCount: 60, proofCount: 20 },
      { id: '5.5', title: 'Inverse Trig Functions', slug: 'inverse-trig', exerciseCount: 40 },
      { id: '5.6', title: 'Applications & Laws', slug: 'applications', exerciseCount: 50 },
    ],
  },
  {
    id: '6',
    title: 'Precalculus',
    description: 'Ages 16-18 / Grades 11-12',
    level: 'Advanced High School',
    slug: 'precalculus',
    topics: [
      { id: '6.1', title: 'Advanced Functions', slug: 'advanced-functions', exerciseCount: 45 },
      { id: '6.2', title: 'Polynomial & Rational Functions', slug: 'poly-rational', exerciseCount: 50 },
      { id: '6.3', title: 'Exponential & Logarithmic', slug: 'exp-log-advanced', exerciseCount: 40 },
      { id: '6.4', title: 'Conic Sections', slug: 'conics', exerciseCount: 55 },
      { id: '6.5', title: 'Parametric & Polar', slug: 'parametric-polar', exerciseCount: 40 },
      { id: '6.6', title: 'Vectors & Complex Numbers', slug: 'vectors-complex', exerciseCount: 45 },
      { id: '6.7', title: 'Systems & Matrices', slug: 'systems-matrices', exerciseCount: 40 },
      { id: '6.8', title: 'Sequences, Series & Induction', slug: 'sequences-induction', exerciseCount: 35, proofCount: 15 },
    ],
  },
  {
    id: '7',
    title: 'Calculus',
    description: 'Ages 17-19 / University',
    level: 'University',
    slug: 'calculus',
    topics: [
      { id: '7.1', title: 'Limits & Continuity', slug: 'limits', exerciseCount: 50 },
      { id: '7.2', title: 'Derivatives', slug: 'derivatives', exerciseCount: 70 },
      { id: '7.3', title: 'Applications of Derivatives', slug: 'derivative-apps', exerciseCount: 65 },
      { id: '7.4', title: 'Integrals', slug: 'integrals', exerciseCount: 60 },
      { id: '7.5', title: 'Applications of Integrals', slug: 'integral-apps', exerciseCount: 55 },
      { id: '7.6', title: 'Transcendental Functions', slug: 'transcendental', exerciseCount: 45 },
      { id: '7.7', title: 'Integration Techniques', slug: 'integration-techniques', exerciseCount: 60 },
      { id: '7.8', title: 'Sequences & Series', slug: 'calculus-series', exerciseCount: 55 },
      { id: '7.9', title: 'Multivariable Calculus', slug: 'multivariable', exerciseCount: 40 },
    ],
  },
  {
    id: '8',
    title: 'Linear Algebra',
    description: 'University',
    level: 'University',
    slug: 'linear-algebra',
    topics: [
      { id: '8.1', title: 'Vectors & Vector Spaces', slug: 'vectors', exerciseCount: 40, proofCount: 10 },
      { id: '8.2', title: 'Matrix Operations', slug: 'matrices', exerciseCount: 45 },
      { id: '8.3', title: 'Determinants', slug: 'determinants', exerciseCount: 35 },
      { id: '8.4', title: 'Eigenvalues & Eigenvectors', slug: 'eigenvalues', exerciseCount: 40 },
      { id: '8.5', title: 'Orthogonality', slug: 'orthogonality', exerciseCount: 35 },
      { id: '8.6', title: 'Linear Transformations', slug: 'transformations', exerciseCount: 40, proofCount: 8 },
      { id: '8.7', title: 'Advanced Topics', slug: 'advanced', exerciseCount: 30 },
    ],
  },
  {
    id: '9',
    title: 'Discrete Mathematics',
    description: 'University',
    level: 'University',
    slug: 'discrete',
    topics: [
      { id: '9.1', title: 'Logic & Proofs', slug: 'logic', exerciseCount: 40, proofCount: 20 },
      { id: '9.2', title: 'Set Theory', slug: 'sets', exerciseCount: 45, proofCount: 10 },
      { id: '9.3', title: 'Combinatorics', slug: 'combinatorics', exerciseCount: 50 },
      { id: '9.4', title: 'Graph Theory', slug: 'graphs', exerciseCount: 45, proofCount: 10 },
      { id: '9.5', title: 'Number Theory', slug: 'number-theory', exerciseCount: 40 },
      { id: '9.6', title: 'Algorithms & Complexity', slug: 'algorithms', exerciseCount: 35 },
    ],
  },
  {
    id: '10',
    title: 'Probability & Statistics',
    description: 'University',
    level: 'University',
    slug: 'statistics',
    topics: [
      { id: '10.1', title: 'Descriptive Statistics', slug: 'descriptive', exerciseCount: 40 },
      { id: '10.2', title: 'Probability Fundamentals', slug: 'probability', exerciseCount: 50 },
      { id: '10.3', title: 'Discrete Distributions', slug: 'discrete-dist', exerciseCount: 45 },
      { id: '10.4', title: 'Continuous Distributions', slug: 'continuous-dist', exerciseCount: 50 },
      { id: '10.5', title: 'Statistical Inference', slug: 'inference', exerciseCount: 55 },
      { id: '10.6', title: 'Regression & Correlation', slug: 'regression', exerciseCount: 45 },
      { id: '10.7', title: 'Experimental Design', slug: 'design', exerciseCount: 30 },
    ],
  },
  {
    id: '11',
    title: 'Advanced Mathematics',
    description: 'University+',
    level: 'Advanced',
    slug: 'advanced',
    topics: [
      { id: '11.1', title: 'Real Analysis', slug: 'real-analysis', exerciseCount: 30, proofCount: 20 },
      { id: '11.2', title: 'Abstract Algebra', slug: 'abstract-algebra', exerciseCount: 35, proofCount: 15 },
      { id: '11.3', title: 'Differential Equations', slug: 'differential-eq', exerciseCount: 50 },
      { id: '11.4', title: 'Numerical Methods', slug: 'numerical', exerciseCount: 40 },
      { id: '11.5', title: 'Optimization', slug: 'optimization', exerciseCount: 40 },
      { id: '11.6', title: 'Fourier Analysis', slug: 'fourier', exerciseCount: 35 },
      { id: '11.7', title: 'Mathematical Modeling', slug: 'modeling', exerciseCount: 25 },
      { id: '11.8', title: 'Topology', slug: 'topology', exerciseCount: 25, proofCount: 15 },
      { id: '11.9', title: 'Mathematics for ML', slug: 'ml-math', exerciseCount: 40 },
    ],
  },
]
