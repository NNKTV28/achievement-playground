# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-02-17

### Added
- CLI entry point with command routing (`bin/devtoolkit.js`)
- System info command — displays OS, CPU, memory, uptime
- String utilities — slugify, SHA256 hash, case conversion (camel, pascal, snake, kebab, upper)
- File utilities — duplicate file finder, SHA256 checksum calculator
- Zero-dependency test runner with test suites for string and system modules
- Argument parser with flag/positional support
- Help text and version flag
- GitHub Actions CI workflow
- Project documentation (README, CONTRIBUTING, CODE_OF_CONDUCT, CHANGELOG)

### Infrastructure
- `.gitignore` for node_modules, logs, env files
- MIT License
- CI pipeline for Node.js 18.x and 20.x
