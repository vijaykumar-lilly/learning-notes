# Quick Start Guide - Math Lesson MCP Server

## Installation

### 1. Install UV Package Manager

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
source $HOME/.local/bin/env
```

### 2. Install Dependencies

```bash
cd /Users/L066916/math_teacher/mcp-server
uv sync
```

This creates a virtual environment and installs all dependencies.

### 3. Configure Claude Desktop

On **macOS**, edit: `~/Library/Application Support/Claude/claude_desktop_config.json`

On **Windows**, edit: `%APPDATA%/Claude/claude_desktop_config.json`

Add this configuration:

```json
{
  "mcpServers": {
    "math-lesson-server": {
      "command": "uv",
      "args": [
        "--directory",
        "/Users/L066916/math_teacher/mcp-server",
        "run",
        "python",
        "src/server.py"
      ]
    }
  }
}
```

**Important:** Update the `--directory` path to match your actual project location!

### 4. Restart Claude Desktop

Close and reopen Claude Desktop app completely (Cmd+Q on macOS).

## Usage Examples

### Create a New Lesson

In Claude Desktop, try:

```
Create a new lesson for domain "pre-algebra" with:
- slug: "polynomials-intro"
- English title: "Introduction to Polynomials"
- Tamil title: "பல்லுறுப்புக்கோவைகள் அறிமுகம்"
- English description: "Learn about polynomials, their terms, and basic operations"
- Tamil description: "பல்லுறுப்புக்கோவைகள், அவற்றின் உறுப்புகள் மற்றும் அடிப்படை செயல்பாடுகளைப் பற்றி அறிக"
```

### List All Lessons

```
List all lessons in the pre-algebra domain
```

or

```
List all lessons
```

### Validate a Lesson

```
Validate the lesson "linear-equations" in domain "pre-algebra"
```

## What Gets Created?

When you create a lesson, the MCP server generates:

1. **Page Component**: `app/[locale]/learn/{domain}/{slug}/page.tsx`
   - Component-based structure
   - All required sections (Definition, Examples, Exercises, etc.)
   - Proper imports and navigation

2. **English Translation**: `messages/en/{slug}.json`
   - All translation keys
   - Template content for each section

3. **Tamil Translation**: `messages/ta/{slug}.json`
   - Parallel structure to English
   - Tamil template content

## Next Steps After Creation

After the MCP server creates a lesson, you need to:

1. **Register in Curriculum** - Add to `lib/curriculum-data.ts`:
   ```typescript
   {
     slug: 'polynomials-intro',
     title: 'Introduction to Polynomials',
     description: 'Learn about polynomials',
     exercises: 0  // Update after adding exercises
   }
   ```

2. **Register Translations** - Add to `i18n.ts`:
   ```typescript
   'polynomials-intro': () => import('./messages/en/polynomials-intro.json')
   ```

3. **Fill in Content**:
   - Add worked examples with step-by-step solutions
   - Create 5+ practice exercises
   - Add real-world applications (2-3 examples)
   - Include visual explanations (tables, diagrams, SVGs)
   - Add helpful tips and notes

4. **Validate**: Use the MCP tool to check completeness

## Available MCP Tools

| Tool | Description |
|------|-------------|
| `create_lesson` | Create complete lesson structure |
| `validate_lesson` | Check lesson completeness |
| `list_lessons` | List all lessons in a domain |

## Troubleshooting

### Server Not Appearing in Claude Desktop

1. Check that `claude_desktop_config.json` path is correct
2. Verify the `cwd` path in config matches your project location
3. Restart Claude Desktop completely
4. Check MCP server logs (if available)

### Python Import Errors

```bash
cd mcp-server
pip install -e . --force-reinstall
```

### Template Not Found Errors

Verify that `mcp-server/templates/` directory exists with:
- `lesson_page.tsx.j2`
- `translation_en.json.j2`
- `translation_ta.json.j2`

## Tips

- Use descriptive slugs (e.g., `linear-equations`, not `lesson1`)
- Keep titles concise but clear
- Descriptions should explain what students will learn
- Always validate lessons after creation
- Fill in content incrementally (examples → exercises → applications)

## Example Workflow

```
You: "Create lesson 'systems-equations' in pre-algebra: 'Systems of Equations' / 'சமன்பாடுகளின் அமைப்பு', about solving multiple equations simultaneously"

MCP Server: ✅ Creates all files

You: "Validate systems-equations in pre-algebra"

MCP Server: ⚠️ Warnings about missing content

[Fill in content manually]

You: "Validate systems-equations again"

MCP Server: ✅ Lesson is complete!
```

Enjoy automated lesson creation! 🚀
