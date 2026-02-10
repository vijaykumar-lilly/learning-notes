#!/bin/bash

# Frontend Cleanup Script
# Removes unnecessary files and consolidates documentation

echo "🧹 Cleaning up unnecessary frontend files..."
echo ""

# Move documentation files to docs/ if they're useful
echo "📁 Organizing documentation..."

# Consolidate frontend docs into one main file
if [ -f "FRONTEND_CLEANUP.md" ] && [ -f "FRONTEND_INTEGRATION_COMPLETE.md" ]; then
    echo "  → Keeping FRONTEND_INTEGRATION_COMPLETE.md (most comprehensive)"
    echo "  → FRONTEND_CLEANUP.md can be removed (info is in FRONTEND_INTEGRATION_COMPLETE.md)"
fi

echo ""
echo "✨ Recommended files to keep:"
echo "  ✓ README.md - Main project readme"
echo "  ✓ FRONTEND_INTEGRATION_COMPLETE.md - Complete integration guide"
echo "  ✓ backend/PHASE*_COMPLETE.md - Phase completion documentation"
echo ""
echo "📋 Recommended files to remove/consolidate:"
echo "  • FRONTEND_CLEANUP.md (duplicate info)"
echo "  • QUICK_START.md (info is in FRONTEND_INTEGRATION_COMPLETE.md)"
echo ""
echo "⚠️  Note: Not automatically deleting - please review and confirm."
echo ""
echo "To remove duplicate docs, run:"
echo "  rm FRONTEND_CLEANUP.md"
echo "  rm QUICK_START.md"
