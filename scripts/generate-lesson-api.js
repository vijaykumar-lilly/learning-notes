#!/usr/bin/env node

/**
 * Generate Lesson Using Claude API
 * Fully automated lesson generation - no copy-pasting needed!
 * 
 * Usage: 
 *   node scripts/generate-lesson-api.js <slug> <domain> <ageRange> [topic]
 *   node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11" "Basic Data & Graphs"
 * 
 * Interactive mode:
 *   node scripts/generate-lesson-api.js
 */

require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514';
const MAX_TOKENS = parseInt(process.env.CLAUDE_MAX_TOKENS || '8000', 10);

// Parse arguments
const args = process.argv.slice(2);

async function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function getInputs() {
  if (args.length >= 3) {
    // Command line arguments provided
    const [slug, domain, ageRange, topic] = args;
    return {
      slug,
      domain,
      ageRange,
      topic: topic || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    };
  }

  // Interactive mode
  console.log('\n📝 Lesson Generator - Interactive Mode\n');
  
  const slug = await promptUser('Enter lesson slug (e.g., data-graphs): ');
  const domain = await promptUser('Enter domain (foundations/pre-algebra/algebra): ');
  const ageRange = await promptUser('Enter age range (e.g., Ages 5-11): ');
  const topic = await promptUser(`Enter topic name (press Enter for "${slug}"): `) || 
                slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return { slug, domain, ageRange, topic };
}

async function generatePrompt(topic, domain, slug, ageRange) {
  const templatePath = path.join(__dirname, 'CLAUDE_LESSON_GENERATOR_PROMPT.md');
  const template = fs.readFileSync(templatePath, 'utf8');

  // Extract the prompt section
  const promptMatch = template.match(/## Prompt Template\s+```([\s\S]*?)```/);
  if (!promptMatch) {
    throw new Error('Could not find prompt template in CLAUDE_LESSON_GENERATOR_PROMPT.md');
  }

  // Fill in the template
  let prompt = promptMatch[1].trim()
    .replace(/\[TOPIC_NAME\]/g, topic)
    .replace(/\[DOMAIN\]/g, domain)
    .replace(/\[SLUG\]/g, slug)
    .replace(/\[AGE_RANGE\]/g, ageRange);

  return prompt;
}

async function callClaudeAPI(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    console.error('\n❌ Error: ANTHROPIC_API_KEY not found');
    console.log('\nSetup instructions:');
    console.log('1. Get API key: https://console.anthropic.com/');
    console.log('2. Create .env file: cp .env.example .env');
    console.log('3. Add your key: ANTHROPIC_API_KEY=sk-ant-api03-...');
    console.log('\nOr see: scripts/API_SETUP_GUIDE.md\n');
    process.exit(1);
  }

  console.log('\n🤖 Calling Claude API...');
  console.log(`   Model: ${MODEL}`);
  console.log(`   Max tokens: ${MAX_TOKENS}`);

  const client = new Anthropic({ apiKey });

  try {
    const startTime = Date.now();
    
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    console.log('\n✅ Response received!');
    console.log(`   Time: ${duration}s`);
    console.log(`   Input tokens: ${message.usage.input_tokens}`);
    console.log(`   Output tokens: ${message.usage.output_tokens}`);
    
    // Calculate cost (Claude Sonnet 4: $3/M input, $15/M output)
    const inputCost = (message.usage.input_tokens / 1000000) * 3;
    const outputCost = (message.usage.output_tokens / 1000000) * 15;
    const totalCost = inputCost + outputCost;
    console.log(`   Estimated cost: $${totalCost.toFixed(4)}`);

    return message.content[0].text;

  } catch (error) {
    console.error('\n❌ API Error:', error.message);
    
    if (error.status === 401) {
      console.error('   Invalid API key');
    } else if (error.status === 429) {
      console.error('   Rate limit exceeded - please wait');
    } else if (error.status === 500) {
      console.error('   Anthropic service error');
    }
    
    throw error;
  }
}

function extractFileContents(response) {
  const files = {
    tsx: null,
    en: null,
    ta: null
  };

  // Extract page.tsx
  const tsxMatch = response.match(/```tsx\n([\s\S]*?)```/);
  if (tsxMatch) {
    files.tsx = tsxMatch[1].trim();
  }

  // Extract JSON files - look for two separate json blocks
  const jsonMatches = response.matchAll(/```json\n([\s\S]*?)```/g);
  const jsonBlocks = Array.from(jsonMatches).map(m => m[1].trim());
  
  if (jsonBlocks.length >= 2) {
    files.en = jsonBlocks[0];
    files.ta = jsonBlocks[1];
  }

  return files;
}

async function saveFiles(slug, domain, files, rootDir) {
  console.log('\n💾 Saving files...');

  // Create directories
  const lessonDir = path.join(rootDir, 'app', '[locale]', 'learn', domain, slug);
  const messagesEnDir = path.join(rootDir, 'messages', 'en');
  const messagesTaDir = path.join(rootDir, 'messages', 'ta');

  fs.mkdirSync(lessonDir, { recursive: true });
  fs.mkdirSync(messagesEnDir, { recursive: true });
  fs.mkdirSync(messagesTaDir, { recursive: true });

  // Save files
  const savedFiles = [];

  if (files.tsx) {
    const tsxPath = path.join(lessonDir, 'page.tsx');
    fs.writeFileSync(tsxPath, files.tsx, 'utf8');
    savedFiles.push(`✅ ${path.relative(rootDir, tsxPath)}`);
  } else {
    console.error('   ⚠️  Warning: No TypeScript file found in response');
  }

  if (files.en) {
    const enPath = path.join(messagesEnDir, `${slug}.json`);
    fs.writeFileSync(enPath, files.en, 'utf8');
    savedFiles.push(`✅ ${path.relative(rootDir, enPath)}`);
  } else {
    console.error('   ⚠️  Warning: No English translation found in response');
  }

  if (files.ta) {
    const taPath = path.join(messagesTaDir, `${slug}.json`);
    fs.writeFileSync(taPath, files.ta, 'utf8');
    savedFiles.push(`✅ ${path.relative(rootDir, taPath)}`);
  } else {
    console.error('   ⚠️  Warning: No Tamil translation found in response');
  }

  savedFiles.forEach(f => console.log(`   ${f}`));

  return savedFiles.length === 3;
}

async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('  🎓 Automated Lesson Generator with Claude API');
  console.log('='.repeat(60));

  try {
    // Get inputs
    const { slug, domain, ageRange, topic } = await getInputs();

    console.log('\n📋 Lesson Details:');
    console.log(`   Topic: ${topic}`);
    console.log(`   Slug: ${slug}`);
    console.log(`   Domain: ${domain}`);
    console.log(`   Age Range: ${ageRange}`);

    // Generate prompt
    console.log('\n📝 Generating prompt from template...');
    const prompt = await generatePrompt(topic, domain, slug, ageRange);
    console.log(`   Prompt length: ${prompt.length} characters`);

    // Call Claude API
    const response = await callClaudeAPI(prompt);

    // Extract files
    console.log('\n📦 Extracting generated files...');
    const files = extractFileContents(response);
    
    const fileCount = Object.values(files).filter(f => f !== null).length;
    console.log(`   Found ${fileCount}/3 files`);

    if (fileCount === 0) {
      console.error('\n❌ Error: No files found in Claude response');
      console.log('\nResponse preview:');
      console.log(response.substring(0, 500) + '...');
      process.exit(1);
    }

    // Save files
    const rootDir = path.join(__dirname, '..');
    const allSaved = await saveFiles(slug, domain, files, rootDir);

    if (!allSaved) {
      console.log('\n⚠️  Warning: Some files were not generated');
      console.log('   You may need to manually create missing files');
    }

    // Register lesson
    console.log('\n🔧 Registering lesson...');
    const { execSync } = require('child_process');
    
    try {
      const registerOutput = execSync(
        `node "${path.join(__dirname, 'register-lesson.js')}" ${slug} 5 ${domain}`,
        { encoding: 'utf8' }
      );
      console.log(registerOutput);
    } catch (error) {
      console.error('   ⚠️  Registration script failed:', error.message);
    }

    // Success!
    console.log('\n' + '='.repeat(60));
    console.log('✅ Lesson generation complete!');
    console.log('='.repeat(60));
    console.log('\nNext steps:');
    console.log('  1. Review generated files');
    console.log('  2. Run: npm run build');
    console.log('  3. Test: npm run dev');
    console.log(`  4. Navigate to: /en/learn/${domain}/${slug}`);
    console.log('\n' + '='.repeat(60) + '\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nFor help, see: scripts/API_SETUP_GUIDE.md\n');
    process.exit(1);
  }
}

// Run
main();
