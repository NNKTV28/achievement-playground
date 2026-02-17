/**
 * Simple test runner — no external dependencies needed.
 * Runs all test files and reports results.
 */

const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    failures.push(message);
    console.log(`  ✗ ${message}`);
  }
}

function assertEqual(actual, expected, message) {
  if (actual === expected) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    failures.push(`${message} — expected "${expected}", got "${actual}"`);
    console.log(`  ✗ ${message} — expected "${expected}", got "${actual}"`);
  }
}

// Make assert functions available globally for test files
global.assert = assert;
global.assertEqual = assertEqual;

// Discover and run test files
const testDir = __dirname;
const testFiles = fs.readdirSync(testDir)
  .filter(f => f.startsWith('test_') && f.endsWith('.js'));

console.log(`\n  Running ${testFiles.length} test file(s)...\n`);

for (const file of testFiles) {
  console.log(`  ${file}:`);
  require(path.join(testDir, file));
  console.log('');
}

// Summary
console.log('  ─────────────────────────────');
console.log(`  Results: ${passed} passed, ${failed} failed`);

if (failures.length > 0) {
  console.log('\n  Failures:');
  failures.forEach(f => console.log(`    - ${f}`));
  process.exit(1);
} else {
  console.log('  All tests passed!\n');
}
