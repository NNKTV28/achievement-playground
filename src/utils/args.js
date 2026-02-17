/**
 * Argument parsing and help display utilities.
 */

function parseArgs(argv) {
  const flags = {};
  const positional = [];

  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(argv[i]);
    }
  }

  return { flags, positional };
}

function showHelp() {
  console.log(`
  DevToolkit CLI v1.0.0
  
  Usage: devtoolkit <category> <command> [args] [options]

  Categories:
    system      System information commands
    string      String manipulation tools
    file        File operation utilities

  System Commands:
    info        Display CPU, memory, and OS information

  String Commands:
    slug <text>                  Generate a URL-friendly slug
    hash <text>                  Generate SHA256 hash
    case <text> --to <type>      Convert case (camel, snake, kebab, pascal)

  File Commands:
    duplicates <dir>             Find duplicate files by content hash
    checksum <file>              Calculate SHA256 checksum of a file

  Options:
    -h, --help      Show this help message
    -v, --version   Show version number

  Examples:
    devtoolkit system info
    devtoolkit string slug "My Blog Post Title"
    devtoolkit string case "hello world" --to pascal
    devtoolkit file checksum ./package.json
  `);
}

module.exports = { parseArgs, showHelp };
