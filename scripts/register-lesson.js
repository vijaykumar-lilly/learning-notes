#!/usr/bin/env node

/**
 * Register Lesson Script
 * Automatically registers a new lesson in i18n.ts and curriculum-data.ts
 * 
 * Usage: node scripts/register-lesson.js <slug> <exerciseCount> [domain]
 * Example: node scripts/register-lesson.js data-graphs 5 foundations
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('❌ Error: Missing required arguments');
  console.log('\nUsage: node scripts/register-lesson.js <slug> <exerciseCount> [domain]');
  console.log('Example: node scripts/register-lesson.js data-graphs 5 foundations\n');
  process.exit(1);
}

const [slug, exerciseCountStr, domain = 'foundations'] = args;
const exerciseCount = parseInt(exerciseCountStr, 10);

if (isNaN(exerciseCount) || exerciseCount < 1) {
  console.error('❌ Error: exerciseCount must be a positive number');
  process.exit(1);
}

console.log(`\n📝 Registering lesson: ${slug}`);
console.log(`   Domain: ${domain}`);
console.log(`   Exercises: ${exerciseCount}\n`);

// File paths
const rootDir = path.join(__dirname, '..');
const i18nPath = path.join(rootDir, 'i18n.ts');
const curriculumDataPath = path.join(rootDir, 'lib', 'curriculum-data.ts');

// Step 1: Update i18n.ts
try {
  console.log('1️⃣  Updating i18n.ts...');
  let i18nContent = fs.readFileSync(i18nPath, 'utf8');
  
  // Check if already registered
  if (i18nContent.includes(`'${slug}':`)) {
    console.log('   ⚠️  Namespace already registered in i18n.ts');
  } else {
    // Find the last import in the messages object
    const messagesEnd = i18nContent.lastIndexOf('}', i18nContent.lastIndexOf('};') - 1);
    const beforeEnd = i18nContent.substring(0, messagesEnd);
    const afterEnd = i18nContent.substring(messagesEnd);
    
    // Add new namespace (with trailing comma on previous line if needed)
    const lastLine = beforeEnd.trim().split('\n').pop();
    const needsComma = !lastLine.endsWith(',');
    
    const newImport = `${needsComma ? ',' : ''}\n      '${slug}': (await import(\`./messages/\${locale}/${slug}.json\`)).default`;
    
    i18nContent = beforeEnd + newImport + '\n    ' + afterEnd;
    fs.writeFileSync(i18nPath, i18nContent, 'utf8');
    console.log('   ✅ Added namespace to i18n.ts');
  }
} catch (error) {
  console.error('   ❌ Error updating i18n.ts:', error.message);
  process.exit(1);
}

// Step 2: Update curriculum-data.ts (only if updating exercise count)
try {
  console.log('2️⃣  Updating curriculum-data.ts...');
  let curriculumContent = fs.readFileSync(curriculumDataPath, 'utf8');
  
  // Look for the lesson entry
  const slugPattern = new RegExp(`slug:\\s*['"]${slug}['"]`);
  
  if (!slugPattern.test(curriculumContent)) {
    console.log(`   ⚠️  Lesson '${slug}' not found in curriculum-data.ts`);
    console.log(`   ℹ️  You may need to add it manually to the '${domain}' domain`);
  } else {
    // Update exercise count
    const exerciseCountPattern = new RegExp(
      `(slug:\\s*['"]${slug}['"],\\s*exerciseCount:\\s*)\\d+`,
      'g'
    );
    
    const updatedContent = curriculumContent.replace(
      exerciseCountPattern,
      `$1${exerciseCount}`
    );
    
    if (updatedContent !== curriculumContent) {
      fs.writeFileSync(curriculumDataPath, updatedContent, 'utf8');
      console.log(`   ✅ Updated exerciseCount to ${exerciseCount}`);
    } else {
      console.log('   ℹ️  Exercise count unchanged');
    }
  }
} catch (error) {
  console.error('   ❌ Error updating curriculum-data.ts:', error.message);
  process.exit(1);
}

// Step 3: Verify translation files exist
console.log('3️⃣  Checking translation files...');
const enPath = path.join(rootDir, 'messages', 'en', `${slug}.json`);
const taPath = path.join(rootDir, 'messages', 'ta', `${slug}.json`);

const enExists = fs.existsSync(enPath);
const taExists = fs.existsSync(taPath);

if (enExists) {
  console.log('   ✅ English translation file exists');
} else {
  console.log(`   ⚠️  Missing: messages/en/${slug}.json`);
}

if (taExists) {
  console.log('   ✅ Tamil translation file exists');
} else {
  console.log(`   ⚠️  Missing: messages/ta/${slug}.json`);
}

// Step 4: Verify page.tsx exists
console.log('4️⃣  Checking lesson page...');
const pagePath = path.join(rootDir, 'app', '[locale]', 'learn', domain, slug, 'page.tsx');
const pageExists = fs.existsSync(pagePath);

if (pageExists) {
  console.log('   ✅ Lesson page exists');
} else {
  console.log(`   ⚠️  Missing: app/[locale]/learn/${domain}/${slug}/page.tsx`);
}

// Summary
console.log('\n' + '='.repeat(50));
if (enExists && taExists && pageExists) {
  console.log('✅ Lesson registration complete!');
  console.log('\nNext steps:');
  console.log('  1. Run: npm run build');
  console.log('  2. Test: npm run dev');
  console.log(`  3. Navigate to: /en/learn/${domain}/${slug}`);
} else {
  console.log('⚠️  Registration incomplete - missing files:');
  if (!enExists) console.log(`   - messages/en/${slug}.json`);
  if (!taExists) console.log(`   - messages/ta/${slug}.json`);
  if (!pageExists) console.log(`   - app/[locale]/learn/${domain}/${slug}/page.tsx`);
  console.log('\nCreate the missing files, then run this script again.');
}
console.log('='.repeat(50) + '\n');
