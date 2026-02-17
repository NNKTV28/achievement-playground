/**
 * String manipulation commands.
 * Provides slug generation, hashing, and case conversion.
 */

const crypto = require('crypto');

/**
 * Convert a string into a URL-friendly slug.
 * Strips special characters, lowercases, replaces spaces with hyphens.
 * @param {string} text - Input text
 * @returns {string} URL-friendly slug
 */
function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s_-]/g, '')   // remove non-alphanumeric
    .replace(/_+/g, "-")             // underscores to hyphens
    .replace(/[\s_]+/g, '-')         // spaces/underscores to hyphens
    .replace(/-+/g, '-')             // collapse multiple hyphens
    .replace(/^-|-$/g, '');          // trim leading/trailing hyphens
}

/**
 * Generate a SHA256 hash of a string.
 * @param {string} text - Input text
 * @returns {string} Hex-encoded SHA256 hash
 */
function hashString(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

/**
 * Convert a string to the specified case format.
 * Supported: camel, snake, kebab, pascal, upper, lower
 * @param {string} text - Input text
 * @param {string} targetCase - Target case type
 * @returns {string} Converted string
 */
function convertCase(text, targetCase) {
  // Split text into words (handles spaces, hyphens, underscores, camelCase)
  const words = text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  switch (targetCase) {
    case 'camel':
      return words[0] + words.slice(1).map(w => w[0].toUpperCase() + w.slice(1)).join('');
    case 'pascal':
      return words.map(w => w[0].toUpperCase() + w.slice(1)).join('');
    case 'snake':
      return words.join('_');
    case 'kebab':
      return words.join('-');
    case 'upper':
      return words.join('_').toUpperCase();
    case 'lower':
      return words.join(' ');
    default:
      throw new Error(`Unsupported case type: "${targetCase}". Use: camel, pascal, snake, kebab, upper, lower`);
  }
}

module.exports = { slugify, hashString, convertCase };
