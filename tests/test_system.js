/**
 * Tests for system command utilities.
 */

const { formatBytes, formatUptime } = require('../src/commands/system');

// formatBytes tests
assertEqual(formatBytes(0), '0.00 B', 'formatBytes zero');
assertEqual(formatBytes(1024), '1.00 KB', 'formatBytes 1KB');
assertEqual(formatBytes(1048576), '1.00 MB', 'formatBytes 1MB');
assertEqual(formatBytes(1073741824), '1.00 GB', 'formatBytes 1GB');
assertEqual(formatBytes(512), '512.00 B', 'formatBytes 512 bytes');

// formatUptime tests
assertEqual(formatUptime(60), '1m', 'formatUptime 1 minute');
assertEqual(formatUptime(3600), '1h 0m', 'formatUptime 1 hour');
assertEqual(formatUptime(86400), '1d 0m', 'formatUptime 1 day');
assertEqual(formatUptime(90061), '1d 1h 1m', 'formatUptime mixed');
