# Database Management Scripts

This directory contains scripts for managing the LearnHub database.

## Available Scripts

### 1. `seed_test_data.py` - Populate Test Data

Populates the database with sample test data for development and testing.

**Usage:**
```bash
cd backend
python scripts/seed_test_data.py
```

**What it creates:**
- 2 test accounts (admin/admin123, student/student123)
- Physics subject (PUBLISHED) with complete lessons
- Biology subject (DRAFT) for testing workflows
- Full English and Tamil translations
- Interactive exercises

---

### 2. `db_manager.py` - Database Management Tool

Comprehensive tool for backing up, restoring, and managing your database.

## Commands

### Export Database

Export to JSON format (recommended):
```bash
python scripts/db_manager.py export --format json
```

Export to SQL format (requires `pg_dump`):
```bash
python scripts/db_manager.py export --format sql
```

Specify custom output file:
```bash
python scripts/db_manager.py export --output my_backup.json
```

### Import Database

Import from JSON:
```bash
python scripts/db_manager.py import --file backup.json
```

Import from SQL:
```bash
python scripts/db_manager.py import --file backup.sql
```

⚠️ **Warning:** Import will replace ALL existing data!

### Clean Database

Remove all data from the database:
```bash
python scripts/db_manager.py clean
```

Skip confirmation prompt:
```bash
python scripts/db_manager.py clean --force
```

### Reset Database

Clean database and reseed with test data:
```bash
python scripts/db_manager.py reset
```

This is equivalent to running `clean` followed by `seed_test_data.py`.

### Named Backups

Create a named backup:
```bash
python scripts/db_manager.py backup --name before_migration
```

Restore from a named backup:
```bash
python scripts/db_manager.py restore --name before_migration
```

List all available backups:
```bash
python scripts/db_manager.py list-backups
```

## Common Workflows

### Before Running Migrations

```bash
# Create a backup before running migrations
python scripts/db_manager.py backup --name before_migration

# Run migrations
alembic upgrade head

# If something goes wrong, restore
python scripts/db_manager.py restore --name before_migration
```

### Sharing Database State with Team

```bash
# Export current database
python scripts/db_manager.py export --output team_data.json

# Share team_data.json with team members
# Team members import:
python scripts/db_manager.py import --file team_data.json
```

### Fresh Start for Development

```bash
# Reset to clean test data
python scripts/db_manager.py reset --force
```

### Testing Different Scenarios

```bash
# Backup current state
python scripts/db_manager.py backup --name scenario_a

# Make changes, test...

# Restore to try different approach
python scripts/db_manager.py restore --name scenario_a
```

## Backup Storage

All backups are stored in `/backend/backups/` directory.

**Backup naming:**
- Auto-generated: `backup_YYYYMMDD_HHMMSS.json`
- Named backups: `backup_your_name.json`
- Exports: `db_export_YYYYMMDD_HHMMSS.json`

## File Formats

### JSON Format (Recommended)
- Human-readable
- Works across PostgreSQL versions
- Easy to inspect and modify
- Preserves all data types
- Platform-independent

### SQL Format
- Native PostgreSQL dump
- Requires `pg_dump` and `psql` tools
- Includes schema DDL
- Better for production backups

## Important Notes

1. **Foreign Key Order:** Import respects foreign key constraints by loading tables in the correct order.

2. **ID Sequences:** After import/clean, ID sequences are reset to maintain consistency.

3. **Timestamps:** All timestamps are preserved in ISO format during export/import.

4. **Passwords:** User passwords (hashed) are included in backups. Be careful with backup files in production.

5. **Confirmation Prompts:** Destructive operations (import, clean, reset) require confirmation unless `--force` is used.

## Troubleshooting

### "pg_dump: command not found"
Install PostgreSQL client tools:
- **macOS:** `brew install postgresql`
- **Ubuntu/Debian:** `apt-get install postgresql-client`
- **Windows:** Install PostgreSQL from official website

### "Permission denied"
Make sure the database user has necessary permissions:
```sql
GRANT ALL PRIVILEGES ON DATABASE your_db TO your_user;
```

### "Foreign key constraint violation"
This shouldn't happen as import loads tables in correct order. If it does:
1. Make sure you're using a clean database
2. Run `python scripts/db_manager.py clean --force` first
3. Then retry the import

## Development Tips

### Quick Test Cycle
```bash
# Make your code changes...

# Reset database to test from scratch
python scripts/db_manager.py reset --force

# Test your changes...
```

### Before Major Changes
```bash
# Always backup before major changes
python scripts/db_manager.py backup --name $(date +%Y%m%d_%H%M%S)_before_changes
```

### Automated Testing
```bash
#!/bin/bash
# test_script.sh

# Backup current state
python scripts/db_manager.py backup --name test_backup

# Run tests
pytest

# Restore regardless of test results
python scripts/db_manager.py restore --name test_backup
```

## Examples

### Example 1: Daily Development Workflow
```bash
# Morning: Fresh start
python scripts/db_manager.py reset --force

# Work on features...

# End of day: Backup your work
python scripts/db_manager.py backup --name daily_$(date +%Y%m%d)
```

### Example 2: Testing New Feature
```bash
# Before starting
python scripts/db_manager.py backup --name before_feature_x

# Implement feature, add test data...

# Test the feature...

# If satisfied, keep it. If not:
python scripts/db_manager.py restore --name before_feature_x
```

### Example 3: Preparing Demo Data
```bash
# Create your demo data manually through the app...

# Export for reuse
python scripts/db_manager.py export --output demo_data.json

# Share with team or use for demos
python scripts/db_manager.py import --file demo_data.json
```

## Safety Features

- ✅ Confirmation prompts for destructive operations
- ✅ Automatic backup directory creation
- ✅ Proper foreign key handling
- ✅ ID sequence management
- ✅ Transaction rollback on errors
- ✅ Clear error messages

## Future Enhancements

Planned features:
- [ ] Compression for large backups
- [ ] Incremental backups
- [ ] Selective table export/import
- [ ] Data anonymization for production exports
- [ ] Backup rotation/cleanup
- [ ] Remote backup storage (S3, etc.)
