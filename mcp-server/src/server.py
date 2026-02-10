#!/usr/bin/env python3
"""
Math Lesson MCP Server

Provides tools for creating and managing mathematics lessons.
"""

import asyncio
import json
import sys
from pathlib import Path
from typing import Any, Sequence

from mcp.server.models import InitializationOptions
import mcp.types as types
from mcp.server import NotificationOptions, Server
import mcp.server.stdio
from jinja2 import Environment, FileSystemLoader

# Initialize MCP server
server = Server("math-lesson-server")

# Project root (assuming mcp-server is in the project root)
PROJECT_ROOT = Path(__file__).parent.parent.parent
TEMPLATES_DIR = Path(__file__).parent.parent / "templates"

# Project context files for MCP resources
INSTRUCTIONS_FILE = PROJECT_ROOT / ".github" / "copilot-instructions.md"
COMPONENT_SCHEMA = Path(__file__).parent.parent / "COMPONENT_SCHEMA.md"
LESSON_PROMPT = Path(__file__).parent.parent / "LESSON_CREATION_PROMPT.md"
EXAMPLE_LESSON_TSX = PROJECT_ROOT / "app" / "[locale]" / "learn" / "pre-algebra" / "expressions" / "page.tsx"
EXAMPLE_LESSON_EN = PROJECT_ROOT / "messages" / "en" / "expressions.json"
EXAMPLE_LESSON_TA = PROJECT_ROOT / "messages" / "ta" / "expressions.json"

# Initialize Jinja2
jinja_env = Environment(loader=FileSystemLoader(str(TEMPLATES_DIR)))


@server.list_resources()
async def handle_list_resources() -> list[types.Resource]:
    """List available resources for context."""
    return [
        types.Resource(
            uri="file:///lesson-creation-prompt",
            name="⭐ COMPLETE LESSON CREATION PROMPT ⭐",
            description="COPY-PASTE READY template with all steps, instructions, and structure to create production-ready lessons. Just fill in domain/slug/title and topic details!",
            mimeType="text/markdown"
        ),
        types.Resource(
            uri="file:///project-instructions",
            name="Project Instructions & Style Guide",
            description="Complete guidelines: tech stack (Next.js 16, TypeScript, Tailwind, KaTeX), component usage, required sections, styling rules",
            mimeType="text/markdown"
        ),
        types.Resource(
            uri="file:///component-schema",
            name="Component Schema & Content Requirements",
            description="Detailed specification of every component (Definition, Example, KeyConcept, etc.) with props, content requirements, and usage examples",
            mimeType="text/markdown"
        ),
        types.Resource(
            uri="file:///example-lesson-tsx",
            name="Example Lesson: Algebraic Expressions (TypeScript/TSX)",
            description="Reference lesson page.tsx showing proper component usage, imports, structure, and interactive exercises",
            mimeType="text/typescript"
        ),
        types.Resource(
            uri="file:///example-lesson-en",
            name="Example Lesson: English Translation (JSON)",
            description="Complete English translation structure with all sections, examples, exercises, and real-world applications",
            mimeType="application/json"
        ),
        types.Resource(
            uri="file:///example-lesson-ta",
            name="Example Lesson: Tamil Translation (JSON)",
            description="Complete Tamil translation showing parallel structure to English version",
            mimeType="application/json"
        )
    ]


@server.read_resource()
async def handle_read_resource(uri: str) -> str:
    """Read resource content."""
    print(f"Reading resource: {uri}", file=sys.stderr)
    
    if uri == "file:///lesson-creation-prompt":
        if LESSON_PROMPT.exists():
            return LESSON_PROMPT.read_text()
        else:
            return "ERROR: Lesson creation prompt file not found"
    
    if uri == "file:///project-instructions":
        if INSTRUCTIONS_FILE.exists():
            return INSTRUCTIONS_FILE.read_text()
        else:
            return "ERROR: Instructions file not found at .github/copilot-instructions.md"
    
    if uri == "file:///component-schema":
        if COMPONENT_SCHEMA.exists():
            return COMPONENT_SCHEMA.read_text()
        else:
            return "ERROR: Component schema file not found"
    
    if uri == "file:///example-lesson-tsx":
        if EXAMPLE_LESSON_TSX.exists():
            return EXAMPLE_LESSON_TSX.read_text()
        else:
            return "ERROR: Example lesson TSX not found"
    
    if uri == "file:///example-lesson-en":
        if EXAMPLE_LESSON_EN.exists():
            return EXAMPLE_LESSON_EN.read_text()
        else:
            return "ERROR: Example lesson English translation not found"
    
    if uri == "file:///example-lesson-ta":
        if EXAMPLE_LESSON_TA.exists():
            return EXAMPLE_LESSON_TA.read_text()
        else:
            return "ERROR: Example lesson Tamil translation not found"
    
    # Unknown URI
    return f"ERROR: Unknown resource URI: {uri}"


@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    """List available MCP tools."""
    return [
        types.Tool(
            name="create_lesson",
            description="""⚠️ THIS TOOL ONLY CREATES TEMPLATE FILES - NOT COMPLETE CONTENT! ⚠️

This tool generates the file structure with TODOs. To create a COMPLETE lesson with actual content:

**STEP 1: Read ALL resources FIRST:**
1. file:///project-instructions - Tech stack and style guide
2. file:///component-schema - Complete component specifications with examples
3. file:///example-lesson-tsx - Full reference implementation
4. file:///example-lesson-en - Complete translation structure
5. file:///example-lesson-ta - Tamil translation example

**STEP 2: Call this tool to create template files**

**STEP 3: After template creation, IMMEDIATELY use file editing to fill in:**
- Complete definitions with clear explanations and 2-3 examples
- 3-5 key concepts with descriptions  
- 2-3 visual explanations (tables, diagrams, color-coded examples)
- 3-5 worked examples with full step-by-step solutions using StepByStep component
- 2-3 real-world applications with concrete examples
- 5+ practice exercises with solutions
- 3-5 tips/notes about common mistakes
- Summary and conclusion

The template will have TODOs - YOU MUST REPLACE THEM WITH ACTUAL CONTENT based on the lesson topic.

Example workflow:
1. Read resources to understand structure
2. Create template with this tool
3. Edit page.tsx to add complete Definition, Examples, etc.
4. Edit EN translation with all content
5. Edit TA translation with Tamil version""",
            inputSchema={
                "type": "object",
                "properties": {
                    "domain": {
                        "type": "string",
                        "description": "Domain: 'foundations' or 'pre-algebra'",
                        "enum": ["foundations", "pre-algebra"]
                    },
                    "slug": {
                        "type": "string",
                        "description": "URL-friendly lesson identifier (e.g., 'linear-equations')"
                    },
                    "title_en": {
                        "type": "string",
                        "description": "English lesson title"
                    },
                    "title_ta": {
                        "type": "string",
                        "description": "Tamil lesson title"
                    },
                    "description_en": {
                        "type": "string",
                        "description": "English lesson description"
                    },
                    "description_ta": {
                        "type": "string",
                        "description": "Tamil lesson description"
                    }
                },
                "required": ["domain", "slug", "title_en", "title_ta", "description_en", "description_ta"]
            }
        ),
        types.Tool(
            name="validate_lesson",
            description="Validate lesson structure and completeness",
            inputSchema={
                "type": "object",
                "properties": {
                    "domain": {
                        "type": "string",
                        "description": "Domain: 'foundations' or 'pre-algebra'",
                        "enum": ["foundations", "pre-algebra"]
                    },
                    "slug": {
                        "type": "string",
                        "description": "Lesson slug to validate"
                    }
                },
                "required": ["domain", "slug"]
            }
        ),
        types.Tool(
            name="list_lessons",
            description="List all lessons showing curriculum status (created ✅ vs planned ⏳)",
            inputSchema={
                "type": "object",
                "properties": {
                    "domain": {
                        "type": "string",
                        "description": "Domain to list: foundations, pre-algebra, algebra, geometry, or all",
                        "enum": ["foundations", "pre-algebra", "algebra", "geometry", "all"]
                    }
                },
                "required": ["domain"]
            }
        )
    ]


@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict | None
) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
    """Handle tool calls."""
    
    if not arguments:
        raise ValueError("Missing arguments")
    
    if name == "create_lesson":
        return await create_lesson(
            domain=arguments["domain"],
            slug=arguments["slug"],
            title_en=arguments["title_en"],
            title_ta=arguments["title_ta"],
            description_en=arguments["description_en"],
            description_ta=arguments["description_ta"]
        )
    
    elif name == "validate_lesson":
        return await validate_lesson(
            domain=arguments["domain"],
            slug=arguments["slug"]
        )
    
    elif name == "list_lessons":
        return await list_lessons(
            domain=arguments["domain"]
        )
    
    raise ValueError(f"Unknown tool: {name}")


async def create_lesson(domain: str, slug: str, title_en: str, title_ta: str, 
                       description_en: str, description_ta: str) -> list[types.TextContent]:
    """Create a complete lesson structure."""
    
    try:
        # 1. Create lesson directory
        lesson_dir = PROJECT_ROOT / "app" / "[locale]" / "learn" / domain / slug
        lesson_dir.mkdir(parents=True, exist_ok=True)
        
        # 2. Generate page.tsx from template
        template = jinja_env.get_template("lesson_page.tsx.j2")
        page_content = template.render(
            slug=slug,
            domain=domain,
            title_en=title_en
        )
        
        page_file = lesson_dir / "page.tsx"
        page_file.write_text(page_content)
        
        # 3. Generate English translation
        en_template = jinja_env.get_template("translation_en.json.j2")
        en_content = en_template.render(
            title=title_en,
            description=description_en
        )
        
        en_file = PROJECT_ROOT / "messages" / "en" / f"{slug}.json"
        en_file.write_text(en_content)
        
        # 4. Generate Tamil translation
        ta_template = jinja_env.get_template("translation_ta.json.j2")
        ta_content = ta_template.render(
            title=title_ta,
            description=description_ta
        )
        
        ta_file = PROJECT_ROOT / "messages" / "ta" / f"{slug}.json"
        ta_file.write_text(ta_content)
        
        # 5. Return success message with next steps
        result = f"""✅ Lesson template created successfully!

**Files created:**
- {page_file.relative_to(PROJECT_ROOT)}
- {en_file.relative_to(PROJECT_ROOT)}
- {ta_file.relative_to(PROJECT_ROOT)}

**⚠️ TEMPLATES ONLY - CONTENT NEEDED**

The files contain structural templates with TODO comments. To create a complete lesson:

**STEP 1: Read Project Guidelines**
Use the MCP resource system to read:
- `file:///project-instructions` - Full tech stack and styling rules
- `file:///example-lesson` - Reference lesson (Algebraic Expressions)

**STEP 2: Fill in Content**
Based on the topic "{title_en}", you need to provide:

1. **Definition Section** (1-2 paragraphs)
   - Clear explanation of the concept
   - 2-3 simple examples

2. **Key Concepts** (3-5 concepts)
   - Important terminology
   - Fundamental principles

3. **Visual Explanations** (2-3 visuals)
   - Tables, diagrams, or color-coded examples
   - Use VisualExplanation component

4. **Worked Examples** (3-5 examples)
   - Step-by-step solutions
   - Use Example and StepByStep components
   - Show common scenarios

5. **Real World Applications** (2-3 applications)
   - Practical uses in daily life
   - Relatable scenarios for students
   - WHY this math matters

6. **Practice Exercises** (5+ exercises)
   - Mix of difficulty levels
   - Include solutions and answers
   - Use NumericInputExercise or MultipleChoiceExercise

7. **Tips & Notes** (3-5 tips)
   - Common mistakes to avoid
   - Helpful shortcuts
   - Memory aids

8. **Conclusion** (1 paragraph)
   - Summary of key takeaways
   - Connection to next topics

**STEP 3: Component Usage**
Import and use these components from `@/components/lesson`:
- `<Definition>` - for formal definitions
- `<KeyConcept>` - for important concepts
- `<Example>` - for worked examples
- `<StepByStep>` - for multi-step procedures
- `<VisualExplanation>` - for tables/diagrams
- `<Note>` - for tips and warnings

**STEP 4: Register Lesson**
1. Add to `lib/curriculum-data.ts` in topics array
2. Add translation key to `i18n.ts`

**Would you like me to help fill in the actual content for this lesson?**
Say: "Fill in content for {slug} lesson about [brief description of what to cover]"
"""
        
        return [types.TextContent(type="text", text=result)]
        
    except Exception as e:
        return [types.TextContent(type="text", text=f"❌ Error creating lesson: {str(e)}")]


async def validate_lesson(domain: str, slug: str) -> list[types.TextContent]:
    """Validate lesson structure and completeness."""
    
    issues = []
    warnings = []
    
    # Check if files exist
    lesson_dir = PROJECT_ROOT / "app" / "[locale]" / "learn" / domain / slug
    page_file = lesson_dir / "page.tsx"
    en_file = PROJECT_ROOT / "messages" / "en" / f"{slug}.json"
    ta_file = PROJECT_ROOT / "messages" / "ta" / f"{slug}.json"
    
    if not page_file.exists():
        issues.append(f"❌ Missing page.tsx at {page_file.relative_to(PROJECT_ROOT)}")
    
    if not en_file.exists():
        issues.append(f"❌ Missing EN translation at {en_file.relative_to(PROJECT_ROOT)}")
    
    if not ta_file.exists():
        issues.append(f"❌ Missing TA translation at {ta_file.relative_to(PROJECT_ROOT)}")
    
    # Check page.tsx content
    if page_file.exists():
        content = page_file.read_text()
        
        # Check required imports
        required_components = ["Definition", "Example", "KeyConcept", "VisualExplanation", "Note"]
        for comp in required_components:
            if comp not in content:
                warnings.append(f"⚠️  Component '{comp}' not used in lesson")
        
        # Check required sections
        required_sections = ["Real World Applications", "Practice Exercises", "Tips"]
        for section in required_sections:
            if section.lower().replace(" ", "") not in content.lower().replace(" ", ""):
                warnings.append(f"⚠️  Missing '{section}' section")
    
    # Build validation report
    if not issues and not warnings:
        result = f"✅ Lesson '{slug}' is valid!\n\nAll required files exist and structure looks good."
    else:
        result = f"Validation Report for '{slug}':\n\n"
        
        if issues:
            result += "**Critical Issues:**\n" + "\n".join(issues) + "\n\n"
        
        if warnings:
            result += "**Warnings:**\n" + "\n".join(warnings) + "\n\n"
        
        result += f"**Status:** {'❌ Failed' if issues else '⚠️  Needs attention'}"
    
    return [types.TextContent(type="text", text=result)]


async def list_lessons(domain: str) -> list[types.TextContent]:
    """List all lessons showing both created and planned from curriculum."""
    
    # Full curriculum structure (from curriculum-data.ts)
    curriculum = {
        "foundations": [
            {"id": "1.1", "title": "Number Sense & Place Value", "slug": "number-sense"},
            {"id": "1.2", "title": "Basic Arithmetic", "slug": "arithmetic"},
            {"id": "1.3", "title": "Fractions", "slug": "fractions"},
            {"id": "1.4", "title": "Decimals", "slug": "decimals"},
            {"id": "1.5", "title": "Percentages", "slug": "percentages"},
            {"id": "1.6", "title": "Ratios & Proportions", "slug": "ratios-proportions"},
            {"id": "1.7", "title": "Basic Geometry", "slug": "basic-geometry"},
            {"id": "1.8", "title": "Measurement", "slug": "measurement"},
            {"id": "1.9", "title": "Basic Data & Graphs", "slug": "data-graphs"},
            {"id": "1.10", "title": "Patterns & Sequences", "slug": "patterns-sequences"},
        ],
        "pre-algebra": [
            {"id": "2.1", "title": "Integers & Rational Numbers", "slug": "integers"},
            {"id": "2.2", "title": "Exponents & Powers", "slug": "exponents"},
            {"id": "2.3", "title": "Algebraic Expressions", "slug": "expressions"},
            {"id": "2.4", "title": "Linear Equations (One Variable)", "slug": "linear-equations"},
            {"id": "2.5", "title": "Inequalities", "slug": "inequalities"},
            {"id": "2.6", "title": "Coordinate Plane & Graphing", "slug": "coordinate-plane"},
            {"id": "2.7", "title": "Introduction to Functions", "slug": "functions-intro"},
            {"id": "2.8", "title": "Systems of Equations (Introduction)", "slug": "systems-intro"},
            {"id": "2.9", "title": "Polynomials (Introduction)", "slug": "polynomials-intro"},
        ],
        "algebra": [
            {"id": "3.1", "title": "Advanced Linear Equations", "slug": "advanced-linear"},
            {"id": "3.2", "title": "Quadratic Equations", "slug": "quadratics"},
            {"id": "3.3", "title": "Polynomial Functions", "slug": "polynomials"},
            {"id": "3.4", "title": "Rational Expressions", "slug": "rational"},
            {"id": "3.5", "title": "Radical Expressions", "slug": "radicals"},
            {"id": "3.6", "title": "Exponential & Logarithmic Functions", "slug": "exp-log"},
            {"id": "3.7", "title": "Sequences & Series", "slug": "sequences"},
            {"id": "3.8", "title": "Matrices (Introduction)", "slug": "matrices-intro"},
        ],
        "geometry": [
            {"id": "4.1", "title": "Geometric Reasoning & Proofs", "slug": "reasoning-proofs"},
            {"id": "4.2", "title": "Triangle Properties", "slug": "triangles"},
            {"id": "4.3", "title": "Similarity & Proportions", "slug": "similarity"},
            {"id": "4.4", "title": "Right Triangle Trigonometry", "slug": "right-triangles"},
            {"id": "4.5", "title": "Polygons & Quadrilaterals", "slug": "polygons"},
            {"id": "4.6", "title": "Circles", "slug": "circles"},
            {"id": "4.7", "title": "Area & Volume", "slug": "area-volume"},
            {"id": "4.8", "title": "Transformations", "slug": "transformations"},
            {"id": "4.9", "title": "Coordinate Geometry", "slug": "coordinate-geometry"},
        ]
    }
    
    # Check which lessons actually exist
    def lesson_exists(domain: str, slug: str) -> bool:
        lesson_dir = PROJECT_ROOT / "app" / "[locale]" / "learn" / domain / slug
        return (lesson_dir / "page.tsx").exists()
    
    # Determine which domains to show
    domains_to_show = list(curriculum.keys()) if domain == "all" else [domain]
    
    # Build output
    result = "📚 **Mathematics Curriculum**\n\n"
    
    for d in domains_to_show:
        if d not in curriculum:
            continue
            
        lessons = curriculum[d]
        created = sum(1 for l in lessons if lesson_exists(d, l["slug"]))
        total = len(lessons)
        
        result += f"**{d.replace('-', ' ').title()}** ({created}/{total} created)\n"
        
        for lesson in lessons:
            status = "✅" if lesson_exists(d, lesson["slug"]) else "⏳"
            result += f"  {status} {lesson['id']} - {lesson['title']} ({lesson['slug']})\n"
        
        result += "\n"
    
    result += "Legend: ✅ Created | ⏳ Planned"
    
    return [types.TextContent(type="text", text=result)]


async def main():
    """Run the MCP server."""
    print("Starting Math Lesson MCP Server...", file=sys.stderr)
    
    try:
        async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
            print("Stdio server initialized", file=sys.stderr)
            
            init_options = InitializationOptions(
                server_name="math-lesson-server",
                server_version="0.1.0",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                )
            )
            print("Running server...", file=sys.stderr)
            
            await server.run(
                read_stream,
                write_stream,
                init_options
            )
    except Exception as e:
        print(f"Error in main: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        raise


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Server stopped", file=sys.stderr)
    except Exception as e:
        print(f"Fatal error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)
