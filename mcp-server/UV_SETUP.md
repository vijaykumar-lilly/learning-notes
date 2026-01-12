# Math Lesson MCP Server - Quick Start with UV

## ✅ Setup Complete!

The MCP server is now configured with `uv` for dependency management.

### What Changed

1. **UV Installed**: Fast Python package manager
2. **Virtual Environment**: Created in `.venv/` (managed by uv)
3. **Dependencies**: All installed via `uv sync`
4. **Claude Desktop Config**: Updated to use `uv run`

### Running the Server

**For Claude Desktop:**
1. Copy config to Claude Desktop:
   ```bash
   # On macOS:
   mkdir -p ~/Library/Application\ Support/Claude/
   cp claude_desktop_config.json ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

2. Restart Claude Desktop completely (Cmd+Q then reopen)

3. Test with: "List all lessons in pre-algebra"

**For Manual Testing:**
```bash
cd /Users/L066916/math_teacher/mcp-server
./run_server.sh
```

### Benefits of UV

✅ **Fast**: 10-100x faster than pip  
✅ **Reliable**: Lockfile ensures consistent installs  
✅ **Simple**: One command (`uv sync`) for everything  
✅ **Isolated**: Automatic virtual environment management  

### Commands

```bash
# Install/sync dependencies
uv sync

# Run the server
uv run python -m src.server

# Add a new dependency
uv add package-name

# Run Python with this environment
uv run python script.py
```

### Troubleshooting

**If Claude Desktop can't find uv:**
```bash
# Add uv to PATH
source $HOME/.local/bin/env
# Or add to your shell profile:
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
```

**Check installation:**
```bash
uv --version
uv run python -c "from mcp.server import Server; print('MCP OK!')"
```

### Next Steps

1. Restart Claude Desktop
2. Test MCP server tools
3. Create new lessons automatically!
