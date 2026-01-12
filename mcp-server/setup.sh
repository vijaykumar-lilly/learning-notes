#!/usr/bin/env bash
# Setup script for MCP server with UV

set -e

echo "🚀 Setting up Math Lesson MCP Server..."

# Check if UV is installed
if ! command -v uv &> /dev/null; then
    echo "📦 Installing UV..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    source $HOME/.local/bin/env
else
    echo "✅ UV already installed"
fi

# Install dependencies
echo "📚 Installing dependencies..."
cd "$(dirname "$0")"
uv sync

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy claude_desktop_config.json to Claude Desktop:"
echo "   cp claude_desktop_config.json ~/Library/Application\\ Support/Claude/"
echo ""
echo "2. Update the '--directory' path in the config to match your project location"
echo ""
echo "3. Restart Claude Desktop (Cmd+Q then reopen)"
echo ""
echo "4. Test with: 'List all lessons in pre-algebra'"
echo ""
