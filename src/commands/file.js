/**
 * File operation commands.
 * Provides duplicate detection and checksum calculation.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Calculate the SHA256 hash of a file's contents.
 * @param {string} filePath - Path to file
 * @returns {string} Hex-encoded SHA256 hash
 */
function fileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Recursively collect all file paths in a directory.
 * Skips hidden directories (starting with .).
 * @param {string} dir - Directory to scan
 * @returns {string[]} Array of absolute file paths
 */
function walkDir(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath));
    } else if (entry.isFile()) {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Find duplicate files in a directory by comparing SHA256 hashes.
 * Groups files with identical content and reports them.
 * @param {string} dir - Directory to scan for duplicates
 */
function findDuplicates(dir) {
  const resolvedDir = path.resolve(dir);

  if (!fs.existsSync(resolvedDir)) {
    throw new Error(`Directory not found: ${resolvedDir}`);
  }

  console.log(`\n  Scanning for duplicates in: ${resolvedDir}\n`);

  const files = walkDir(resolvedDir);
  const hashMap = {};
  let scanned = 0;

  for (const file of files) {
    try {
      const hash = fileHash(file);
      if (!hashMap[hash]) {
        hashMap[hash] = [];
      }
      hashMap[hash].push(file);
      scanned++;
    } catch (err) {
      // Skip unreadable files silently
    }
  }

  const duplicates = Object.entries(hashMap).filter(([, files]) => files.length > 1);

  if (duplicates.length === 0) {
    console.log(`  No duplicates found (scanned ${scanned} files).`);
  } else {
    console.log(`  Found ${duplicates.length} group(s) of duplicates:\n`);
    duplicates.forEach(([hash, files], i) => {
      console.log(`  Group ${i + 1} (${hash.substring(0, 12)}...):`);
      files.forEach(f => console.log(`    - ${path.relative(resolvedDir, f)}`));
      console.log('');
    });
  }
}

/**
 * Calculate and display the SHA256 checksum of a file.
 * @param {string} filePath - Path to the file
 */
function checksum(filePath) {
  const resolved = path.resolve(filePath);

  if (!fs.existsSync(resolved)) {
    throw new Error(`File not found: ${resolved}`);
  }

  const stats = fs.statSync(resolved);
  const hash = fileHash(resolved);

  console.log(`\n  File:     ${path.basename(resolved)}`);
  console.log(`  Path:     ${resolved}`);
  console.log(`  Size:     ${stats.size} bytes`);
  console.log(`  SHA256:   ${hash}`);
  console.log(`  Modified: ${stats.mtime.toISOString()}`);
  console.log('');
}

module.exports = { findDuplicates, checksum, fileHash, walkDir };
