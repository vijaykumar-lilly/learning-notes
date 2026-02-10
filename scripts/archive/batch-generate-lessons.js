#!/usr/bin/env node

/**
 * Batch Lesson Generator
 * Generates Claude prompts for multiple lessons from a config file
 * 
 * Usage: node scripts/batch-generate-lessons.js <config-file>
 * Example: node scripts/batch-generate-lessons.js lessons.config.json
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('❌ Error: Missing config file');
  console.log('\nUsage: node scripts/batch-generate-lessons.js <config-file>');
  console.log('Example: node scripts/batch-generate-lessons.js lessons.config.json\n');
  process.exit(1);
}

const configPath = path.resolve(args[0]);

if (!fs.existsSync(configPath)) {
  console.error(`❌ Error: Config file not found: ${configPath}`);
  process.exit(1);
}

// Load config
let config;
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  console.error('❌ Error parsing config file:', error.message);
  process.exit(1);
}

if (!Array.isArray(config)) {
  console.error('❌ Error: Config must be an array of lesson configurations');
  process.exit(1);
}

// Read prompt template
const templatePath = path.join(__dirname, 'CLAUDE_LESSON_GENERATOR_PROMPT.md');
const template = fs.readFileSync(templatePath, 'utf8');

// Extract the prompt section
const promptMatch = template.match(/## Prompt Template\s+```([\s\S]*?)```/);
if (!promptMatch) {
  console.error('❌ Error: Could not find prompt template');
  process.exit(1);
}

const basePrompt = promptMatch[1].trim();

// Generate prompts for each lesson
console.log(`\n📚 Generating prompts for ${config.length} lesson(s)...\n`);
console.log('='.repeat(70) + '\n');

config.forEach((lesson, index) => {
  const { topic, domain, slug, ageRange, exercises = 5, topics = 3 } = lesson;
  
  // Validate required fields
  if (!topic || !domain || !slug || !ageRange) {
    console.error(`❌ Lesson ${index + 1}: Missing required fields (topic, domain, slug, ageRange)`);
    return;
  }
  
  // Fill in the template
  let prompt = basePrompt
    .replace(/\[TOPIC_NAME\]/g, topic)
    .replace(/\[DOMAIN\]/g, domain)
    .replace(/\[SLUG\]/g, slug)
    .replace(/\[AGE_RANGE\]/g, ageRange);
  
  console.log(`📝 Lesson ${index + 1}: ${topic}`);
  console.log(`   Domain: ${domain}`);
  console.log(`   Slug: ${slug}`);
  console.log(`   Age Range: ${ageRange}`);
  console.log(`   Exercises: ${exercises}`);
  console.log();
  
  // Save individual prompt file
  const outputDir = path.join(__dirname, '..', 'generated-prompts');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, `${slug}-prompt.txt`);
  fs.writeFileSync(outputPath, prompt, 'utf8');
  
  console.log(`   ✅ Saved prompt to: generated-prompts/${slug}-prompt.txt`);
  console.log();
  console.log('-'.repeat(70));
  console.log();
});

console.log('='.repeat(70));
console.log('\n✅ All prompts generated!\n');
console.log('Next steps:');
console.log('  1. Copy each prompt from generated-prompts/ folder');
console.log('  2. Paste into Claude (claude.ai or API)');
console.log('  3. Save the generated files to the correct locations');
console.log('  4. Run: node scripts/register-lesson.js <slug> <exercises>');
console.log('  5. Build and test: npm run build && npm run dev\n');
