#!/usr/bin/env bash
# Run the MCP server using uv

cd "$(dirname "$0")"
uv run python src/server.py
