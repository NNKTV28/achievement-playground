/**
 * Output formatting utilities.
 * Supports human-readable and JSON output modes.
 */

let outputMode = 'human';

/**
 * Set the output mode globally.
 * @param {'human' | 'json'} mode
 */
function setOutputMode(mode) {
  outputMode = mode;
}

/**
 * Get the current output mode.
 * @returns {'human' | 'json'}
 */
function getOutputMode() {
  return outputMode;
}

/**
 * Output data in the current format.
 * In JSON mode, prints stringified JSON.
 * In human mode, calls the provided display function.
 * @param {Object} data - Structured data to output
 * @param {Function} displayFn - Human-readable display function
 */
function output(data, displayFn) {
  if (outputMode === 'json') {
    console.log(JSON.stringify(data, null, 2));
  } else {
    displayFn(data);
  }
}

/**
 * Check if --json flag is present in args and set mode accordingly.
 * @param {string[]} args - Command line arguments
 * @returns {string[]} Args with --json removed
 */
function extractJsonFlag(args) {
  if (args.includes('--json')) {
    setOutputMode('json');
    return args.filter(a => a !== '--json');
  }
  return args;
}

module.exports = { setOutputMode, getOutputMode, output, extractJsonFlag };
