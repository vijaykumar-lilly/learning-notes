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

# Initialize Jinja2
jinja_env = Environment(loader=FileSystemLoader(str(TEMPLATES_DIR)))


@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    """List available MCP tools."""
    return [
        types.Tool(
            name="create_lesson",
            description="Create a complete lesson with page.tsx and EN/TA translations",
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
            description="List all existing lessons in a domain",
            inputSchema={
                "type": "object",
                "properties": {
                    "domain": {
                        "type": "string",
                        "description": "Domain to list lessons from",
                        "enum": ["foundations", "pre-algebra", "all"]
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
        result = f"""✅ Lesson created successfully!

**Files created:**
- {page_file.relative_to(PROJECT_ROOT)}
- {en_file.relative_to(PROJECT_ROOT)}
- {ta_file.relative_to(PROJECT_ROOT)}

**Next steps:**
1. Update `lib/curriculum-data.ts` to register this lesson
2. Update `i18n.ts` to include the translation files
3. Add lesson content (definitions, examples, exercises)
4. Run validation: validate_lesson("{domain}", "{slug}")

**Template structure includes:**
- Definition component
- Key Concepts section
- Visual Explanations placeholder
- Worked Examples section (needs content)
- Real World Applications section (needs content)
- Practice Exercises section (needs content)
- Tips & Notes section
- Conclusion section
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
    """List all lessons in a domain."""
    
    domains = ["foundations", "pre-algebra"] if domain == "all" else [domain]
    lessons_by_domain = {}
    
    for d in domains:
        learn_dir = PROJECT_ROOT / "app" / "[locale]" / "learn" / d
        if learn_dir.exists():
            lessons = [
                item.name for item in learn_dir.iterdir() 
                if item.is_dir() and not item.name.startswith("_")
            ]
            lessons_by_domain[d] = sorted(lessons)
    
    # Format output
    result = "📚 **Mathematics Lessons**\n\n"
    for d, lessons in lessons_by_domain.items():
        result += f"**{d.replace('-', ' ').title()}** ({len(lessons)} lessons):\n"
        for lesson in lessons:
            result += f"  - {lesson}\n"
        result += "\n"
    
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
