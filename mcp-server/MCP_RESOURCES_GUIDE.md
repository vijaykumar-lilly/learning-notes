# Using MCP Resources for Full Context

The MCP server now provides **Resources** that give Claude complete context about your project. This enables creating **fully-populated lessons** instead of just templates.

## What Changed

### Before (Templates Only)
- MCP created skeleton files with TODO comments
- You had to manually fill in all content
- No awareness of styling or component patterns

### After (Full Content)
- MCP reads project guidelines and example lessons
- Creates complete lessons with real content
- Follows your styling and component patterns
- Generates exercises, examples, and explanations

## How It Works

### 1. MCP Resources Exposed

The server exposes two resources Claude can read:

**file:///project-instructions**
- Complete tech stack (Next.js 16, TypeScript, Tailwind, KaTeX)
- Component usage guide (Definition, Example, KeyConcept, etc.)
- Required sections for every lesson
- Styling rules and patterns
- Page structure template

**file:///example-lesson**
- Real implementation of Algebraic Expressions lesson
- Shows proper component imports and usage
- Translation patterns with `useTranslations()`
- Math rendering examples
- Interactive exercises implementation

### 2. Enhanced Tool Descriptions

The `create_lesson` tool now tells Claude to:
1. **First read the resources** for context
2. Create files following the exact patterns
3. Fill in complete content (not TODOs)
4. Include all required sections
5. Use proper components

### 3. Better Output Messages

After creating a template, the tool now:
- Reminds Claude to read the resources
- Lists exactly what content is needed
- Shows which components to use
- Offers to fill in the content immediately

## Using It in Claude Desktop

### Step 1: Let Claude Read Context

```
Before we create lessons, please read the project instructions and example lesson 
resources to understand our tech stack and styling requirements.
```

Claude will automatically read:
- `file:///project-instructions`
- `file:///example-lesson`

### Step 2: Create Complete Lesson

```
Create a complete, fully-populated lesson on "Introduction to Functions" for pre-algebra.

The lesson should cover:
- What functions are (with real-world analogies like vending machines)
- Function notation f(x) = ...
- How to evaluate functions  
- Domain and range basics
- 5 worked examples with step-by-step solutions
- Real-world applications (recipes, temperature conversion, etc.)
- 8 practice exercises with solutions and hints

Follow the project style guide and use the same component pattern as the example lesson.
```

Claude will now:
1. ✅ Read the instructions resource
2. ✅ Read the example lesson
3. ✅ Create template files
4. ✅ **Fill in complete content** based on the topic
5. ✅ Use proper components (Definition, Example, etc.)
6. ✅ Generate real exercises with solutions
7. ✅ Add real-world applications
8. ✅ Follow styling guidelines

## Example Workflow

**You:**
```
List pre-algebra curriculum status
```

**Claude:**
```
Pre Algebra (6/9 created)
  ✅ 2.1 - Integers
  ...
  ⏳ 2.7 - Introduction to Functions (functions-intro)
  ⏳ 2.8 - Systems of Equations (systems-intro)
```

**You:**
```
Create a complete lesson for 2.7 Introduction to Functions covering:
- Definition with vending machine analogy
- Function notation f(x)
- 5 worked examples (evaluating functions, finding domain/range)
- Real-world apps: recipes, temperature conversion, taxi fare
- 8 practice exercises with full solutions
```

**Claude:**
1. Reads project-instructions resource
2. Reads example-lesson resource  
3. Creates files
4. **Fills in actual content** (not templates!)
5. Uses Definition, Example, KeyConcept components
6. Generates 5 worked examples
7. Adds real-world section
8. Creates 8 exercises with solutions

**Result:** Complete, ready-to-use lesson in minutes!

## Benefits

✅ **Context-Aware** - Claude knows your tech stack and patterns
✅ **Complete Content** - Real examples, exercises, explanations
✅ **Consistent Style** - Follows your component patterns
✅ **Bilingual** - English and Tamil content generated
✅ **Fast** - Minutes instead of hours per lesson

## Technical Implementation

The resources are implemented in `src/server.py`:

```python
@server.list_resources()
async def handle_list_resources() -> list[types.Resource]:
    return [
        types.Resource(
            uri="file:///project-instructions",
            name="Project Instructions & Style Guide",
            description="Complete guidelines for creating lessons",
            mimeType="text/markdown"
        ),
        types.Resource(
            uri="file:///example-lesson",  
            name="Example Lesson (Algebraic Expressions)",
            description="Reference lesson showing proper structure",
            mimeType="text/typescript"
        )
    ]

@server.read_resource()
async def handle_read_resource(uri: str) -> str:
    if uri == "file:///project-instructions":
        return INSTRUCTIONS_FILE.read_text()
    elif uri == "file:///example-lesson":
        return EXAMPLE_LESSON.read_text()
```

This allows Claude to read your actual project files for complete context!
