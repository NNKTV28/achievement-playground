#!/usr/bin/env node

/**
 * DevToolkit CLI - Entry Point
 * 
 * Routes commands to their respective handlers.
 * Usage: devtoolkit <category> <command> [args] [options]
 */

const { parseArgs, showHelp } = require('../src/utils/args');
const { systemInfo } = require('../src/commands/system');
const { slugify, hashString, convertCase } = require('../src/commands/string');
const { findDuplicates, checksum } = require('../src/commands/file');

const VERSION = '1.0.0';

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log(`devtoolkit v${VERSION}`);
    return;
  }

  const [category, command, ...rest] = args;

  try {
    switch (category) {
      case 'system':
        handleSystem(command);
        break;
      case 'string':
        handleString(command, rest);
        break;
      case 'file':
        handleFile(command, rest);
        break;
      default:
        console.error(`Unknown category: "${category}"`);
        console.error('Run "devtoolkit --help" for usage information.');
        process.exit(1);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

function handleSystem(command) {
  switch (command) {
    case 'info':
      systemInfo();
      break;
    default:
      console.error(`Unknown system command: "${command}"`);
      process.exit(1);
  }
}

function handleString(command, args) {
  const text = args.filter(a => !a.startsWith('--')).join(' ');
  if (!text) {
    console.error('Please provide text to process.');
    process.exit(1);
  }

  switch (command) {
    case 'slug':
      console.log(slugify(text));
      break;
    case 'hash':
      console.log(hashString(text));
      break;
    case 'case': {
      const toIndex = args.indexOf('--to');
      const targetCase = toIndex !== -1 ? args[toIndex + 1] : 'camel';
      console.log(convertCase(text, targetCase));
      break;
    }
    default:
      console.error(`Unknown string command: "${command}"`);
      process.exit(1);
  }
}

function handleFile(command, args) {
  const target = args[0];
  if (!target) {
    console.error('Please provide a file or directory path.');
    process.exit(1);
  }

  switch (command) {
    case 'duplicates':
      findDuplicates(target);
      break;
    case 'checksum':
      checksum(target);
      break;
    default:
      console.error(`Unknown file command: "${command}"`);
      process.exit(1);
  }
}

main();
