# 🛠️ DevToolkit CLI

A lightweight, zero-dependency Node.js CLI toolkit for common developer tasks — file operations, string transformations, system info, and more.

## Features

- **File Utilities** — Batch rename, find duplicates, calculate checksums
- **String Tools** — Case conversion, slug generation, hash strings
- **System Info** — CPU, memory, disk usage at a glance
- **Project Scaffolding** — Quick-start templates for common project types
- **Git Helpers** — Branch cleanup, commit stats, changelog generation

## Installation

```bash
npm install -g devtoolkit-cli
```

Or run directly with npx:

```bash
npx devtoolkit-cli <command>
```

## Quick Start

```bash
# Get system information
devtoolkit system info

# Generate a slug from a string
devtoolkit string slug "Hello World Example"
# Output: hello-world-example

# Find duplicate files in a directory
devtoolkit file duplicates ./my-project

# Calculate SHA256 checksums
devtoolkit file checksum package.json
```

## Commands

| Command | Description |
|---------|-------------|
| `system info` | Display system information |
| `system ports` | List open ports |
| `string slug <text>` | Generate URL-friendly slug |
| `string hash <text>` | SHA256 hash a string |
| `string case <text> --to <type>` | Convert string case |
| `file duplicates <dir>` | Find duplicate files |
| `file checksum <file>` | Calculate file checksum |
| `file rename <pattern>` | Batch rename files |
| `git stats` | Show commit statistics |
| `git cleanup` | Remove merged branches |

## Development

```bash
# Clone the repo
git clone https://github.com/NNKTV28/achievement-playground.git
cd achievement-playground

# Install dependencies
npm install

# Run locally
node bin/devtoolkit.js <command>

# Run tests
npm test
```

## Project Structure

```
├── bin/              # CLI entry point
├── src/
│   ├── commands/     # Command implementations
│   ├── utils/        # Shared utility functions
│   └── index.js      # Main module export
├── tests/            # Test files
├── docs/             # Documentation
└── scripts/          # Development scripts
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT — see [LICENSE](LICENSE) for details.
