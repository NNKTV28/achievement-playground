/**
 * Tests for string command utilities.
 */

const { slugify, hashString, convertCase } = require('../src/commands/string');

// slugify tests
assertEqual(slugify('Hello World'), 'hello-world', 'slugify basic spaces');
assertEqual(slugify('Café Résumé'), 'cafe-resume', 'slugify accented characters');
assertEqual(slugify('  Leading & Trailing  '), 'leading-trailing', 'slugify trims and strips special chars');
assertEqual(slugify('multiple---hyphens'), 'multiple-hyphens', 'slugify collapses hyphens');
assertEqual(slugify('under_score_text'), 'under-score-text', 'slugify converts underscores');

// hashString tests
assertEqual(hashString('hello').length, 64, 'hashString returns 64 char hex');
assertEqual(hashString('hello'), hashString('hello'), 'hashString is deterministic');
assert(hashString('hello') !== hashString('world'), 'hashString produces different hashes for different inputs');

// convertCase tests
assertEqual(convertCase('hello world', 'camel'), 'helloWorld', 'convertCase to camelCase');
assertEqual(convertCase('hello world', 'pascal'), 'HelloWorld', 'convertCase to PascalCase');
assertEqual(convertCase('hello world', 'snake'), 'hello_world', 'convertCase to snake_case');
assertEqual(convertCase('hello world', 'kebab'), 'hello-world', 'convertCase to kebab-case');
assertEqual(convertCase('hello world', 'upper'), 'HELLO_WORLD', 'convertCase to UPPER_CASE');
assertEqual(convertCase('helloWorld', 'snake'), 'hello_world', 'convertCase camelCase to snake_case');
