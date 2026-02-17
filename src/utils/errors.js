/**
 * Error handling utilities.
 * Provides structured error types and a global error handler.
 */

/**
 * Custom error for invalid user input (wrong args, bad flags).
 */
class UsageError extends Error {
  constructor(message, suggestion = '') {
    super(message);
    this.name = 'UsageError';
    this.suggestion = suggestion;
    this.exitCode = 2;
  }
}

/**
 * Custom error for operations that fail at runtime.
 */
class OperationError extends Error {
  constructor(message, cause = null) {
    super(message);
    this.name = 'OperationError';
    this.cause = cause;
    this.exitCode = 1;
  }
}

/**
 * Global error handler.
 * Formats errors nicely and exits with the appropriate code.
 * @param {Error} err
 */
function handleError(err) {
  if (err instanceof UsageError) {
    console.error(`\n  Usage Error: ${err.message}`);
    if (err.suggestion) {
      console.error(`  Suggestion: ${err.suggestion}`);
    }
    console.error('  Run "devtoolkit --help" for usage information.\n');
    process.exit(2);
  }

  if (err instanceof OperationError) {
    console.error(`\n  Error: ${err.message}`);
    if (err.cause) {
      console.error(`  Cause: ${err.cause}`);
    }
    console.error('');
    process.exit(1);
  }

  // Unknown/unexpected errors
  console.error(`\n  Unexpected Error: ${err.message}`);
  if (process.env.DEBUG) {
    console.error(err.stack);
  }
  process.exit(1);
}

/**
 * Set up graceful SIGINT handling.
 */
function setupSignalHandlers() {
  process.on('SIGINT', () => {
    console.log('\n  Interrupted. Exiting...');
    process.exit(130);
  });

  process.on('uncaughtException', (err) => {
    handleError(err);
  });
}

module.exports = { UsageError, OperationError, handleError, setupSignalHandlers };
