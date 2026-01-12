#!/bin/bash

# Math Lesson MCP Server - Installation Script

echo "📚 Installing Math Lesson MCP Server..."

cd "$(dirname "$0")"

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -e .

echo ""
echo "✅ Installation complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Add this server to Claude Desktop config:"
echo "   On macOS: ~/Library/Application Support/Claude/claude_desktop_config.json"
echo "   On Windows: %APPDATA%/Claude/claude_desktop_config.json"
echo ""
echo "2. Add this configuration:"
echo ""
cat claude_desktop_config.json
echo ""
echo "3. Restart Claude Desktop"
echo ""
echo "4. Test the server by asking Claude:"
echo '   "List all lessons in pre-algebra domain"'
echo ""
