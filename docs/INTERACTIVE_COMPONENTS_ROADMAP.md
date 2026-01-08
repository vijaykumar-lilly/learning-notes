# Visual Interactive Components Roadmap

## Document Purpose
This document outlines future interactive components to enhance the math learning platform. Use this as a reference when creating new lessons or enhancing existing ones.

---

## ✅ Already Implemented (15 Components)

### Visual Components (6)
- ✓ ArithmeticVisualizer (addition, subtraction, multiplication, division)
- ✓ FractionVisualizer (circle and bar models)
- ✓ TriangleVisualizer (angles, types, animations)
- ✓ PythagoreanVisualizer (squares on sides)
- ✓ IntegerNumberLine (animated operations)
- ✓ NumberLine (basic with highlights)

### Interactive Components (5)
- ✓ InteractiveFractionSlider (drag to build fractions)
- ✓ BalanceScale (equation solving metaphor)
- ✓ InteractiveGraphPlotter (linear equations y=mx+b)
- ✓ DragDropMatcher (matching exercises)
- ✓ StepByStepHighlighter (animated problem solving)

### UI Components (4)
- ✓ ProgressBar (animated completion tracking)
- ✓ Celebration (confetti on correct answers)
- ✓ Tabs (content organization)
- ✓ CollapsibleSection (expandable content)

---

## 🚀 High Priority - Next to Implement

### 1. Interactive Equation Builder (Drag Terms)
**Priority**: ⭐⭐⭐⭐⭐ **Complexity**: Medium

**Description**: Build equations by dragging algebraic terms (variables, constants, operators)

**Features**:
- Draggable tiles: x, x², numbers, +, -, =
- Drop zones for left and right sides
- Auto-simplification option
- Validation of equation structure
- Color coding (variables vs constants)

**Best for lessons**:
- Pre-Algebra: Translating word problems
- Algebra: Building equations from descriptions
- Linear equations introduction

**Implementation notes**:
```typescript
interface EquationBuilderProps {
  availableTerms: Term[]
  targetEquation?: string
  allowSimplification?: boolean
  onEquationComplete?: (equation: string) => void
}
```

---

### 2. Fraction Operation Visualizer
**Priority**: ⭐⭐⭐⭐⭐ **Complexity**: High

**Description**: Show fraction addition, subtraction, multiplication, division visually

**Features**:
- Adding fractions: combine pizza slices, show common denominator
- Subtracting: remove parts
- Multiplying: area model (rectangle partitioned two ways)
- Dividing: how many groups fit
- Animated transitions between steps

**Best for lessons**:
- Fractions: Operations with fractions
- Decimals: Converting and operations
- Ratios: Understanding proportions

**Visual approach**:
- Addition: Side-by-side pizzas → merge into common denominator
- Multiplication: Rectangle grid showing (a/b) × (c/d)
- Division: "How many 1/4s fit in 3/2?"

---

### 3. 3D Shape Viewer (Rotate & Unfold)
**Priority**: ⭐⭐⭐⭐ **Complexity**: High

**Description**: Interactive 3D shapes with rotation and net unfolding

**Features**:
- Mouse drag to rotate cube, sphere, pyramid, prism, cylinder
- Button to "unfold" into 2D net
- Show measurements (edges, faces, vertices)
- Calculate surface area with highlighted faces
- Calculate volume with animated filling

**Best for lessons**:
- Geometry: 3D shapes and properties
- Surface area and volume
- Spatial reasoning

**Technical stack**:
- Three.js or React Three Fiber
- Animated transitions for unfolding
- Touch/mouse controls

---

### 4. Number Grid Builder (Click to Build)
**Priority**: ⭐⭐⭐⭐ **Complexity**: Low

**Description**: Click squares on a grid to build shapes and solve area/perimeter problems

**Features**:
- Clickable grid (customizable size)
- Fill/unfill squares
- Auto-calculate area (filled squares)
- Auto-calculate perimeter (edge count)
- Different colors for different shapes
- Export as image

**Best for lessons**:
- Area and perimeter basics
- Coordinate geometry
- Counting and spatial reasoning

**Use cases**:
- "Build a rectangle with area 12"
- "Build two shapes with same perimeter but different areas"
- "Draw a shape on coordinate plane"

---

### 5. Animated Transformation Viewer
**Priority**: ⭐⭐⭐⭐ **Complexity**: Medium

**Description**: Show geometric transformations with smooth animations

**Features**:
- Reflection (across x-axis, y-axis, y=x)
- Rotation (90°, 180°, 270° around origin or point)
- Translation (shift by vector)
- Dilation (scale from center point)
- Grid overlay for coordinates
- Before/after comparison slider

**Best for lessons**:
- Geometry: Transformations
- Coordinate geometry
- Symmetry

**Interactive controls**:
- Slider for rotation angle
- Vector input for translation
- Scale factor for dilation
- Line of reflection selector

---

## 🎯 Medium Priority - Implement Soon

### 6. Interactive Protractor & Ruler
**Priority**: ⭐⭐⭐ **Complexity**: Medium

**Features**:
- Drag protractor to measure angles
- Drag ruler to measure lengths
- Draw angles by entering degrees
- Snap to common angles (30°, 45°, 60°, 90°)

**Best for**: Geometry basics, angle measurement

---

### 7. Balance Equation Solver (Advanced)
**Priority**: ⭐⭐⭐ **Complexity**: High

**Enhancement of existing BalanceScale**:
- Support for variables (not just numbers)
- Visual representation of terms (x blocks, 1 blocks)
- Drag to remove from both sides
- Show work history
- Multiple step equations

**Example**: 2x + 3 = x + 7
- Show 2 x-boxes + 3 unit-boxes = 1 x-box + 7 unit-boxes
- Drag to remove x from right, automatically removes from left

---

### 8. Coordinate Plane Plotter (Multi-function)
**Priority**: ⭐⭐⭐ **Complexity**: Medium

**Enhancement of existing GraphPlotter**:
- Plot multiple functions simultaneously
- Quadratic, exponential, absolute value
- Find intersections
- Shade regions (inequalities)
- Trace function values with cursor
- Table of values

**Best for**: Algebra, systems of equations, functions

---

### 9. Pattern Builder (Inductive Reasoning)
**Priority**: ⭐⭐⭐ **Complexity**: Low

**Description**: Show visual patterns, predict next term

**Features**:
- Sequence of shapes (growing patterns)
- Draggable tiles to complete pattern
- Arithmetic/geometric sequences
- Ask "what's the 10th term?"
- Show formula derivation

**Best for**: Sequences, patterns, algebra introduction

---

### 10. Probability Simulator
**Priority**: ⭐⭐⭐ **Complexity**: Medium

**Features**:
- Coin flip simulator (run 1, 10, 100, 1000 times)
- Dice roller with histogram
- Spinner with custom sections
- Card drawing from deck
- Show experimental vs theoretical probability

**Best for**: Probability and statistics lessons

---

## 📊 Advanced Features - Future Implementation

### 11. Equation Morphing Animation
**Priority**: ⭐⭐ **Complexity**: High

**Description**: Show algebraic manipulation as smooth visual transformations

**Features**:
- Terms slide across equals sign when moved
- Combining like terms: 2x and 3x merge → 5x
- Distribution: 2(x+3) expands → 2x + 6
- Factoring: reverse animation

**Best for**: Algebra, showing equivalence

---

### 12. Long Division Animator
**Priority**: ⭐⭐⭐ **Complexity**: Medium

**Description**: Step-by-step animated long division

**Features**:
- Each step highlights (divide, multiply, subtract, bring down)
- Animated carrying/borrowing
- Works for polynomials too
- Show remainder visually

---

### 13. Factoring Tree Builder
**Priority**: ⭐⭐⭐ **Complexity**: Low

**Description**: Interactive prime factorization tree

**Features**:
- Click a number to split into factors
- Auto-highlight primes (can't split further)
- Multiple paths lead to same prime factorization
- Visual tree structure
- Export as image

**Best for**: Number theory, GCF, LCM

---

### 14. Graph Paper Drawing Tool
**Priority**: ⭐⭐ **Complexity**: Medium

**Features**:
- Freehand drawing on grid
- Shape tools (line, circle, rectangle)
- Measurement overlay
- Snap to grid
- Save/export drawings

**Best for**: Geometry, graphing, problem-solving

---

### 15. Real-World Context Overlays
**Priority**: ⭐⭐⭐ **Complexity**: Medium

**Description**: Show math in real-world contexts

**Examples**:
- Money: Coins/bills for decimal operations
- Pizza: Fractions and parts of whole
- Building blocks: Volume and 3D shapes
- Speedometer: Rate problems
- Thermometer: Negative numbers, temperature
- Calendar: Time calculations

**Implementation**: SVG overlays on existing visualizers

---

### 16. Algebraic Tiles (Manipulatives)
**Priority**: ⭐⭐⭐⭐ **Complexity**: Medium

**Description**: Virtual algebra tiles for factoring, expanding, completing the square

**Features**:
- x² tiles (large square), x tiles (rectangle), 1 tiles (small square)
- Drag to arrange into shapes
- Shows (x+2)(x+3) = x² + 5x + 6 visually
- Positive/negative tiles (different colors)
- Area model for multiplication

**Best for**: Algebra 1, factoring, quadratics

---

### 17. System of Equations Solver (Visual)
**Priority**: ⭐⭐⭐ **Complexity**: High

**Features**:
- Plot two lines on same graph
- Animate to find intersection
- Show substitution method step-by-step
- Show elimination method with balance scales
- Highlight solution point

---

### 18. Inequality Number Line
**Priority**: ⭐⭐⭐ **Complexity**: Low

**Features**:
- Shaded regions for x > 3, x ≤ 5, etc.
- Open/closed circles
- Compound inequalities (and/or)
- Drag endpoints to change inequality

**Best for**: Algebra, inequalities

---

### 19. Statistical Graphs Builder
**Priority**: ⭐⭐⭐ **Complexity**: Medium

**Features**:
- Bar graph builder (drag bars to adjust)
- Pie chart from data
- Line graph with trend line
- Box plot from 5-number summary
- Histogram with adjustable bins
- Calculate mean, median, mode visually

**Best for**: Statistics and data analysis

---

### 20. Angle Relationships Visualizer
**Priority**: ⭐⭐⭐ **Complexity**: Medium

**Features**:
- Parallel lines cut by transversal
- Drag transversal to see angle changes
- Highlight corresponding, alternate interior, etc.
- Show angle measures update in real-time
- Prove relationships

**Best for**: Geometry angle relationships

---

## 🎨 Gamification Enhancements

### 21. XP/Achievement System
**Features**:
- XP bar that fills on correct answers
- Level up animations
- Unlockable badges (Bronze/Silver/Gold)
- Streak counter (consecutive days)
- Leaderboard (optional, for classrooms)

### 22. Math Puzzle Games
**Types**:
- Sudoku (number placement logic)
- KenKen (operations with cages)
- Math crossword puzzles
- Number pattern challenges
- "Escape room" style multi-step problems

### 23. Timed Challenges
**Features**:
- Speed round (answer as many as possible)
- Countdown timer with visual indicator
- "Beat your best time"
- Practice mode vs challenge mode

---

## 🔧 Technical Components

### 24. Sound Effects System (Optional/Toggleable)
**Features**:
- Correct answer: pleasant ding
- Wrong answer: gentle buzz (not discouraging)
- Progress milestone: celebration sound
- Button clicks: subtle feedback
- Background music: soft, optional
- Mute/volume controls

### 25. Responsive Hint System
**Features**:
- Progressive hints (start vague, get specific)
- "I'm stuck" button reveals next hint
- Hint counter (track usage)
- Adaptive difficulty based on hint usage

### 26. Work Scratchpad
**Features**:
- Digital scratchpad for calculations
- Erasable/clearable
- Shows automatically on complex problems
- Can be minimized
- Save work for later

---

## 📋 Implementation Guide

### For Each New Lesson, Consider:

1. **What concepts are abstract?** → Need visualization
2. **What needs practice?** → Interactive exercises
3. **What's commonly confusing?** → Step-by-step highlighter
4. **Can students manipulate it?** → Sliders, drag-drop
5. **Is there a real-world connection?** → Context overlays

### Component Selection Matrix

| Lesson Topic | Recommended Components |
|--------------|------------------------|
| **Fractions** | FractionVisualizer, InteractiveFractionSlider, Fraction Operations Visualizer |
| **Decimals** | Number line, Fraction-Decimal Matcher, Real-world money overlay |
| **Integers** | IntegerNumberLine, Real-world temperature overlay |
| **Linear Equations** | BalanceScale, GraphPlotter, StepByStepHighlighter, Equation Builder |
| **Quadratics** | GraphPlotter (parabolas), Algebraic Tiles, Factoring visualizer |
| **Geometry Basics** | TriangleVisualizer, Protractor, Ruler, Angle measurer |
| **Transformations** | Transformation Viewer, Coordinate plane |
| **3D Geometry** | 3D Shape Viewer, Net unfolder |
| **Statistics** | Statistical Graphs, Probability Simulator |
| **Ratios/Proportions** | Visual ratio bars, Cross-multiplication visualizer |

### Complexity Ratings
- ⭐ Low (1-2 days): Number line variations, simple matchers
- ⭐⭐ Medium-Low (3-5 days): Grid builders, pattern builders
- ⭐⭐⭐ Medium (1 week): Protractor, transformations, statistical graphs
- ⭐⭐⭐⭐ Medium-High (1-2 weeks): Algebraic tiles, advanced graphing
- ⭐⭐⭐⭐⭐ High (2-3 weeks): 3D viewer, equation morphing, full CAS

### Development Priorities for Next Sprint

**Sprint 1 (This Month)**:
1. Fraction Operations Visualizer
2. Number Grid Builder
3. Inequality Number Line
4. Factoring Tree Builder

**Sprint 2 (Next Month)**:
1. Algebraic Tiles
2. Coordinate Plane Plotter (enhanced)
3. Animated Transformations
4. Interactive Protractor

**Sprint 3 (Month 3)**:
1. 3D Shape Viewer
2. Statistical Graphs Builder
3. Probability Simulator
4. XP/Achievement System

---

## 💡 Design Principles

### Visual Design
- Use consistent color scheme across all components
- Animations should be smooth (300-500ms transitions)
- Clear labels and instructions
- Responsive (mobile + desktop)
- Dark mode compatible

### Interaction Design
- Immediate feedback on all interactions
- Clear affordances (what's draggable/clickable)
- Undo/reset always available
- Progress indicators for multi-step activities
- Keyboard shortcuts for power users

### Accessibility
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode option
- Scalable text
- Alternative text descriptions

### Performance
- Lazy load heavy components
- Optimize animations (CSS transforms, not layout changes)
- Debounce slider inputs
- Virtual scrolling for large lists
- Code splitting by lesson

---

## 🎯 Success Metrics

Track these for each component:
- Engagement rate (% of students who interact)
- Time spent (optimal: 2-5 minutes per component)
- Completion rate
- Correct answer rate before vs after using visualizer
- Student feedback (helpful rating 1-5)

---

## 📝 Notes for Future Development

### When Creating New Components:

1. **Start with paper prototype** - sketch interaction flow
2. **Build static version first** - no animations
3. **Add one animation at a time** - test performance
4. **Test on mobile early** - touch interactions differ
5. **Get student feedback** - watch them use it
6. **Iterate based on confusion points**

### Code Organization:
```
/components
  /interactive       # User manipulates (sliders, drag-drop)
  /visualizations   # Animated displays (shows concept)
  /ui               # Generic UI components
  /games            # Gamified activities
  /assessment       # Exercise types
```

### Reusable Patterns:
- Slider with real-time preview (fractions, graphs, angles)
- Before/after comparison view
- Step-by-step with controls
- Drag-and-drop validation
- Grid-based builders

---

## 🚀 Quick Wins (Easy to Implement)

These can be added to lessons quickly:

1. **Hover explanations** - tooltip on math notation
2. **Click-to-reveal** - hide/show solutions
3. **Color coding** - consistent colors (variables=blue, constants=green)
4. **Audio pronunciation** - "hear" math terms
5. **Printable worksheets** - export exercises as PDF
6. **Bookmarks** - save lesson progress
7. **Related concepts links** - "you might also like..."

---

## 📚 Resources & Inspiration

### Similar Tools to Study:
- Desmos (graphing calculator)
- GeoGebra (geometry/algebra)
- PhET Interactive Simulations (science/math)
- Khan Academy (exercise feedback)
- Mathigon (animated explanations)

### Libraries to Consider:
- Three.js / React Three Fiber (3D)
- Framer Motion (animations)
- D3.js (graphs/charts)
- KaTeX (math rendering - already using)
- Rough.js (hand-drawn look for sketches)

---

## ✅ Checklist for Each New Component

- [ ] Component file created in correct directory
- [ ] TypeScript interfaces defined
- [ ] Props documented with JSDoc comments
- [ ] Dark mode styles tested
- [ ] Mobile responsive tested
- [ ] Keyboard navigation works
- [ ] ARIA labels added
- [ ] Export added to index.ts
- [ ] Example added to demo page
- [ ] Integrated into at least one lesson
- [ ] Performance tested (no lag)
- [ ] Build succeeds with no errors
- [ ] Accessibility audit passed

---

**Last Updated**: January 8, 2026
**Status**: 15 components implemented, 25+ planned
**Next Review**: When 5 more components completed

