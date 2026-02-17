/**
 * DevToolkit - Main module export
 * 
 * Exposes all utility functions for programmatic use.
 * Import individual modules or the entire toolkit.
 */

const { systemInfo, formatBytes, formatUptime } = require('./commands/system');
const { slugify, hashString, convertCase } = require('./commands/string');
const { findDuplicates, checksum, fileHash, walkDir } = require('./commands/file');

module.exports = {
  // System utilities
  systemInfo,
  formatBytes,
  formatUptime,

  // String utilities
  slugify,
  hashString,
  convertCase,

  // File utilities
  findDuplicates,
  checksum,
  fileHash,
  walkDir,
};
