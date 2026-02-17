/**
 * Directory tree visualization command.
 * Renders a visual tree structure of a directory.
 */

const fs = require('fs');
const path = require('path');

const PIPE = '│   ';
const TEE = '├── ';
const BEND = '└── ';
const SPACE = '    ';

/**
 * Format file size in human-readable format.
 */
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)}K`;
  return `${(bytes / 1048576).toFixed(1)}M`;
}

/**
 * Render a directory tree recursively.
 * @param {string} dir - Directory to visualize
 * @param {Object} options - { depth, showSize, showHidden }
 * @param {string} prefix - Current indentation prefix
 * @param {number} currentDepth - Current recursion depth
 */
function renderTree(dir, options = {}, prefix = '', currentDepth = 0) {
  const { depth = Infinity, showSize = false, showHidden = false } = options;
  if (currentDepth > depth) return;

  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch { return; }

  if (!showHidden) {
    entries = entries.filter(e => !e.name.startsWith('.'));
  }

  // Sort: directories first, then alphabetical
  entries.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });

  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? BEND : TEE;
    const fullPath = path.join(dir, entry.name);

    let label = entry.name;
    if (entry.isDirectory()) label += '/';

    if (showSize && entry.isFile()) {
      try {
        const stats = fs.statSync(fullPath);
        label += ` (${formatSize(stats.size)})`;
      } catch {}
    }

    console.log(`${prefix}${connector}${label}`);

    if (entry.isDirectory()) {
      const nextPrefix = prefix + (isLast ? SPACE : PIPE);
      renderTree(fullPath, options, nextPrefix, currentDepth + 1);
    }
  });
}

/**
 * Display a directory tree.
 * @param {string} dir - Target directory
 * @param {Object} options - Display options
 */
function fileTree(dir, options = {}) {
  const resolved = path.resolve(dir);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Directory not found: ${resolved}`);
  }

  console.log(`\n${resolved}`);
  renderTree(resolved, options);
  console.log('');
}

module.exports = { fileTree, renderTree };
