#!/usr/bin/env python3
"""Verify MCP resources are accessible."""

import asyncio
import sys
from pathlib import Path

# Add server to path
sys.path.insert(0, str(Path(__file__).parent))

from src.server import handle_list_resources, handle_read_resource

async def main():
    print("🔍 Verifying MCP Resources...\n")
    
    try:
        resources = await handle_list_resources()
        print(f"✅ Found {len(resources)} resources\n")
        
        all_ok = True
        for resource in resources:
            print(f"📄 {resource.name}")
            print(f"   URI: {resource.uri}")
            print(f"   Type: {resource.mimeType}")
            
            try:
                content = await handle_read_resource(resource.uri)
                
                if content.startswith("ERROR"):
                    print(f"   ❌ {content}\n")
                    all_ok = False
                else:
                    lines = len(content.split('\n'))
                    print(f"   ✅ Loaded: {len(content):,} chars, {lines:,} lines")
                    print(f"   Preview: {content[:100].replace(chr(10), ' ')}...\n")
            except Exception as e:
                print(f"   ❌ Error: {e}\n")
                all_ok = False
        
        if all_ok:
            print("✅ All resources verified successfully!")
            return 0
        else:
            print("❌ Some resources failed to load")
            return 1
            
    except Exception as e:
        print(f"❌ Fatal error: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
