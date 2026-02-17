/**
 * ANSI color utilities for terminal output.
 * Supports basic colors with auto-detection of terminal capability.
 */

const supportsColor = process.stdout.isTTY && !process.env.NO_COLOR;

const codes = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
};

/**
 * Wrap text in ANSI color codes.
 * Returns plain text if color is not supported.
 * @param {string} text - Text to colorize
 * @param {string} color - Color name from codes
 * @returns {string} Colorized text
 */
function colorize(text, color) {
  if (!supportsColor || !codes[color]) return text;
  return `${codes[color]}${text}${codes.reset}`;
}

/**
 * Bold text wrapper.
 */
function bold(text) {
  if (!supportsColor) return text;
  return `${codes.bold}${text}${codes.reset}`;
}

/**
 * Dim text wrapper (for secondary info).
 */
function dim(text) {
  if (!supportsColor) return text;
  return `${codes.dim}${text}${codes.reset}`;
}

// Convenience shortcuts
const red = (t) => colorize(t, 'red');
const green = (t) => colorize(t, 'green');
const yellow = (t) => colorize(t, 'yellow');
const blue = (t) => colorize(t, 'blue');
const cyan = (t) => colorize(t, 'cyan');
const gray = (t) => colorize(t, 'gray');

module.exports = {
  colorize, bold, dim,
  red, green, yellow, blue, cyan, gray,
  supportsColor,
};
