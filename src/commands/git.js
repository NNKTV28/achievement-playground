/**
 * Git helper commands.
 * Provides commit statistics and branch maintenance utilities.
 */

const { execSync } = require('child_process');
const path = require('path');

/**
 * Check if current directory is a git repository.
 * @returns {boolean}
 */
function isGitRepo() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Display git commit statistics for the current repository.
 * Shows total commits, recent activity, and top contributors.
 */
function gitStats() {
  if (!isGitRepo()) {
    throw new Error('Not inside a git repository.');
  }

  const totalCommits = execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim();
  const recentCommits = execSync('git log --oneline -10', { encoding: 'utf8' }).trim();
  const authors = execSync('git shortlog -sn --no-merges HEAD', { encoding: 'utf8' }).trim();
  const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  const remoteUrl = execSync('git remote get-url origin 2>/dev/null || echo "none"', { encoding: 'utf8' }).trim();

  console.log('\n  Git Repository Statistics');
  console.log('  ─────────────────────────────────');
  console.log(`  Branch:        ${branch}`);
  console.log(`  Remote:        ${remoteUrl}`);
  console.log(`  Total Commits: ${totalCommits}`);
  console.log('');
  console.log('  Top Contributors:');
  authors.split('\n').slice(0, 5).forEach(line => {
    console.log(`    ${line.trim()}`);
  });
  console.log('');
  console.log('  Recent Commits:');
  recentCommits.split('\n').forEach(line => {
    console.log(`    ${line}`);
  });
  console.log('');
}

/**
 * Remove local branches that have been merged into the current branch.
 * Skips main, master, and the current branch.
 */
function gitCleanup() {
  if (!isGitRepo()) {
    throw new Error('Not inside a git repository.');
  }

  const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  const merged = execSync('git branch --merged', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .map(b => b.trim().replace('* ', ''))
    .filter(b => b && b !== currentBranch && b !== 'main' && b !== 'master');

  if (merged.length === 0) {
    console.log('\n  No merged branches to clean up.\n');
    return;
  }

  console.log(`\n  Removing ${merged.length} merged branch(es):`);
  merged.forEach(branch => {
    try {
      execSync(`git branch -d "${branch}"`, { stdio: 'pipe' });
      console.log(`    Deleted: ${branch}`);
    } catch (err) {
      console.log(`    Skipped: ${branch} (could not delete)`);
    }
  });
  console.log('');
}

module.exports = { gitStats, gitCleanup, isGitRepo };
