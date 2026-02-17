/**
 * System information commands.
 * Displays CPU, memory, OS, and uptime data.
 */

const os = require('os');

function formatBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  let value = bytes;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value.toFixed(2)} ${units[i]}`;
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  parts.push(`${mins}m`);
  return parts.join(' ');
}

function systemInfo() {
  const cpus = os.cpus();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  console.log('\n  System Information');
  console.log('  ─────────────────────────────────');
  console.log(`  OS:         ${os.type()} ${os.release()} (${os.arch()})`);
  console.log(`  Hostname:   ${os.hostname()}`);
  console.log(`  Uptime:     ${formatUptime(os.uptime())}`);
  console.log(`  CPU:        ${cpus[0].model}`);
  console.log(`  Cores:      ${cpus.length}`);
  console.log(`  Memory:     ${formatBytes(usedMem)} / ${formatBytes(totalMem)} (${((usedMem / totalMem) * 100).toFixed(1)}%)`);
  console.log(`  Free Mem:   ${formatBytes(freeMem)}`);
  console.log(`  Home Dir:   ${os.homedir()}`);
  console.log(`  Temp Dir:   ${os.tmpdir()}`);
  console.log(`  Node.js:    ${process.version}`);
  console.log('');
}

module.exports = { systemInfo, formatBytes, formatUptime };
