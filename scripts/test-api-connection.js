#!/usr/bin/env node

/**
 * Test API Connection
 * Verifies that your Anthropic API key is working correctly
 * 
 * Usage: node scripts/test-api-connection.js
 */

require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');

async function testConnection() {
  console.log('\n🔍 Testing Claude API Connection...\n');

  // Step 1: Check if API key exists
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    console.error('❌ Error: ANTHROPIC_API_KEY not found in environment');
    console.log('\nPlease set your API key:');
    console.log('1. Create .env file: cp .env.example .env');
    console.log('2. Add your key: ANTHROPIC_API_KEY=sk-ant-api03-...');
    console.log('3. Or export: export ANTHROPIC_API_KEY="sk-ant-api03-..."\n');
    process.exit(1);
  }

  console.log('✅ API Key found in environment');
  console.log(`   Key prefix: ${apiKey.substring(0, 20)}...`);

  // Step 2: Test API connection
  console.log('\n🔗 Testing connection to Claude API...');
  
  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: 'Hello! Please respond with "API connection successful" if you can read this.'
      }]
    });

    console.log('✅ Success! Connected to Claude API\n');
    console.log('📊 Connection Details:');
    console.log(`   Model: ${message.model}`);
    console.log(`   Response ID: ${message.id}`);
    console.log(`   Input tokens: ${message.usage.input_tokens}`);
    console.log(`   Output tokens: ${message.usage.output_tokens}`);
    console.log(`\n💬 Response: "${message.content[0].text}"`);
    
    console.log('\n✨ Your API is working correctly!');
    console.log('   You can now use: node scripts/generate-lesson-api.js\n');
    
    return true;

  } catch (error) {
    console.error('\n❌ Error connecting to API:');
    
    if (error.status === 401) {
      console.error('   Invalid API key. Please check your key in .env file');
    } else if (error.status === 429) {
      console.error('   Rate limit exceeded. Please wait a moment and try again');
    } else if (error.status === 500) {
      console.error('   Anthropic service error. Check https://status.anthropic.com/');
    } else {
      console.error(`   ${error.message}`);
    }
    
    console.log('\nTroubleshooting:');
    console.log('1. Verify API key at: https://console.anthropic.com/');
    console.log('2. Check your .env file exists and has correct key');
    console.log('3. Ensure you have internet connection');
    console.log('4. Check API status: https://status.anthropic.com/\n');
    
    process.exit(1);
  }
}

// Run the test
testConnection();
