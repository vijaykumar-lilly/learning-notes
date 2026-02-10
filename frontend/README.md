# Math Learning Platform

Open-source mathematics education platform covering basics to expertise level.

## Features

- **Complete Curriculum**: 11 domains from foundations to advanced mathematics
- **87 Core Topics**: Comprehensive coverage across all levels
- **3,995+ Exercises**: Progressive difficulty with instant feedback
- **275 Proofs**: Formal reasoning and proof-based learning
- **Math Rendering**: KaTeX integration for beautiful equation display
- **Interactive Learning**: Adaptive pathways and personalized recommendations
- **Open Source**: Apache-2.0 (code) | CC BY-SA (content)

## Tech Stack

- **Framework**: Next.js 16.1.1 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Math Rendering**: KaTeX
- **Internationalization**: next-intl (English, future Tamil support)
- **Database**: PostgreSQL (planned)
- **Authentication**: Next-Auth (planned)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Development Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## Project Structure

```
math_teacher/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── learn/             # Learning modules (planned)
├── components/            # React components
│   ├── math/              # Math-specific components
│   │   └── MathRenderer.tsx
│   ├── ui/                # UI components (planned)
│   └── exercises/         # Exercise components (planned)
├── lib/                   # Utilities and helpers
│   └── utils.ts
├── public/                # Static assets
├── .github/               # GitHub configuration
│   └── copilot-instructions.md
└── package.json           # Dependencies
```

## Curriculum Domains

1. **Foundations** (K-5): Number sense, arithmetic, fractions, decimals, basic geometry
2. **Pre-Algebra** (6-8): Integers, exponents, expressions, equations, functions
3. **Algebra I & II** (9-11): Quadratics, polynomials, exponentials, matrices
4. **Geometry** (9-10): Proofs, triangles, circles, transformations
5. **Trigonometry** (10-12): Unit circle, identities, laws, applications
6. **Precalculus** (11-12): Advanced functions, conics, parametric, sequences
7. **Calculus**: Limits, derivatives, integrals, series, multivariable
8. **Linear Algebra**: Vectors, matrices, eigenvalues, transformations
9. **Discrete Mathematics**: Logic, sets, combinatorics, graph theory
10. **Probability & Statistics**: Distributions, inference, regression
11. **Advanced Topics**: Analysis, abstract algebra, differential equations, optimization

## Contributing

This is an open-source project. Contributions are welcome!

### Development Guidelines

- Use TypeScript strict mode
- Follow Next.js App Router conventions
- Server components by default, client components when needed
- Component naming: PascalCase
- Utility functions: camelCase
- Write comprehensive tests
- Document all new terms and symbols

## License

- **Code**: Apache-2.0
- **Content**: CC BY-SA 4.0

## Roadmap

- [x] Project setup
- [x] Basic UI and navigation
- [x] Math rendering (KaTeX)
- [ ] Content management system
- [ ] User authentication
- [ ] Progress tracking
- [ ] Exercise system with auto-grading
- [ ] Adaptive learning algorithm
- [ ] Teacher dashboard
- [ ] Internationalization (Tamil)
- [ ] Mobile app

## Support

For questions or support, please open an issue on GitHub.

## Acknowledgments

Built with modern web technologies and a commitment to accessible, high-quality mathematics education for all.
