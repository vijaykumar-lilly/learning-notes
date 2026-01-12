# Math Lesson MCP Server

Model Context Protocol server for automating mathematics lesson creation.

## Features

- Create complete lessons with page.tsx and translations (EN/TA)
- Auto-register lessons in curriculum-data.ts and i18n.ts
- Validate lesson structure and completeness
- Generate component-based lessons following project standards

## Installation

```bash
cd mcp-server
pip install -e .
```

## Tools

### `create_lesson`
Creates a complete lesson with all required files:
- `app/[locale]/learn/{domain}/{slug}/page.tsx`
- `messages/en/{slug}.json`
- `messages/ta/{slug}.json`
- Updates curriculum-data.ts and i18n.ts

**Parameters:**
- `domain` (string): "foundations" or "pre-algebra"
- `slug` (string): URL-friendly lesson identifier (e.g., "linear-equations")
- `title_en` (string): English lesson title
- `title_ta` (string): Tamil lesson title
- `description_en` (string): English description
- `description_ta` (string): Tamil description

### `validate_lesson`
Checks lesson completeness:
- Required sections present
- Component usage correct
- Translation keys match
- SVG visuals wrapped in components

**Parameters:**
- `slug` (string): Lesson slug to validate

### `add_example`
Adds a worked example to an existing lesson.

**Parameters:**
- `slug` (string): Lesson slug
- `example_number` (integer): Example number (1, 2, 3...)
- `title_en/ta` (string): Example title
- `problem_en/ta` (string): Problem statement
- `steps` (array): Step-by-step solution

## Usage with Claude Desktop

The server is automatically configured in Claude Desktop's config file.

Example prompt:
```
Create a new lesson for domain "pre-algebra" with slug "polynomials-intro", 
title "Introduction to Polynomials" / "பல்லுறுப்புக்கோவைகள் அறிமுகம்", 
description "Learn about polynomials and their operations"
```
