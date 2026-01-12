#!/usr/bin/env bash
# Wrapper script for MCP server with explicit paths

# Add UV to PATH
export PATH="$HOME/.local/bin:$PATH"

# Change to script directory
cd "$(dirname "$0")"

# Run with uv
exec uv run python src/server.py
