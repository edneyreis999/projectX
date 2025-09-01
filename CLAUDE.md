# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an RPG Maker MZ project called "Daratrine - A Origem" with a custom plugin system and clean architecture implementation. The project combines traditional RPG Maker functionality with modern JavaScript development practices, including TypeScript support, testing, and clean code principles.

## Development Commands

### Essential Commands

```bash
# Run tests
npm test

# Lint JavaScript/TypeScript files
npm run lint
npm run lint:check  # Check without fixing

# Format code
npm run format          # Format plugins JS/TS files
npm run format:json     # Format JSON data files

# Debug the game in NW.js
npm run debug

# Git workflow with conventional commits
npm run commit
```

### Testing

- Tests are located in `frontend/__tests__/`
- Uses Jest with SWC for fast TypeScript compilation
- Coverage reports generated in `../coverage/`
- Run single test: `npm test -- --testNamePattern="test name"`

## Architecture

### Directory Structure

```
frontend/
├── js/
│   ├── domain/           # Clean Architecture - Domain Layer
│   │   ├── MinaKravensDomain.js    # Business logic for mining quest
│   │   └── MineracaoUseCase.js     # Mining use cases
│   ├── adapters/         # Clean Architecture - Adapter Layer
│   │   ├── log/         # Logging adapters
│   │   └── services/    # Service adapters
│   ├── plugins/         # RPG Maker MZ plugins (42 files)
│   │   └── Coreto_*.js  # Battle delay system plugins
│   ├── libs/            # Third-party libraries
│   └── __tests__/       # Test files
├── data/                # RPG Maker game data (JSON files)
├── save/                # Game save files
└── package.json         # Game runtime configuration
```

### Plugin System Architecture

#### Clean Architecture Implementation

The codebase follows Clean Architecture principles:

- **Domain Layer**: Pure business logic (`js/domain/`)
- **Plugins**: RPG Maker specific implementations

#### RPG Maker MZ Plugin Structure

Plugins follow standard RPG Maker MZ conventions:

- Plugin header with `@target MZ` and parameters
- Immediate function execution `(() => { ... })()`
- Parameter parsing: `PluginManager.parameters(pluginName)`
- Module exports for browser/Node.js compatibility

#### Battle Delay System

Multi-module plugin system with shared state:

- `Coreto_Battle_Delay.js` - Core system and parameters
- `Coreto_Battle_Delay_State.js` - Shared state management  
- `Coreto_Battle_Delay_Accumulate.js` - Battle accumulation logic
- `Coreto_Battle_Delay_Execute.js` - Battle execution logic

### Data Management

- Game data stored in `frontend/data/` as JSON files
- Character Generator exports in `Character Generator/Exports/`
- Localization support in `frontend/localization/`

## Code Quality

### Linting & Formatting

- ESLint with TypeScript support configured in `.eslintrc.cjs`
- Prettier formatting with `.prettierrc`
- Husky pre-commit hooks ensure code quality
- Lint-staged runs on modified files only

### Commitizen Integration

- Uses conventional commits with `@commitlint/cz-commitlint`
- Configuration in `commitlint.config.ts`
- Run `npm run commit` for guided commit creation

### TypeScript Configuration

- ES2022 target with experimental decorators
- CommonJS modules for RPG Maker compatibility
- Incremental compilation enabled

## Testing Strategy

### Test Location Patterns

Jest is configured to find tests in:

- `frontend/__tests__/**/*.[jt]s?(x)`
- `frontend/**/?(*.)+(spec|test).[tj]s?(x)`

### Domain Testing

Domain classes are tested separately from RPG Maker runtime:

- Pure JavaScript classes can be tested in isolation
- Use case classes test business logic flow
- Mock adapters for external dependencies

## Development Workflow

### Plugin Development

1. Create new plugin in `frontend/js/plugins/`
2. Follow RPG Maker MZ plugin header format
3. Use TypeScript-compatible syntax
4. Add unit tests for business logic
5. Run `npm run lint` and `npm run format` before committing

### Quest/Domain Development  

1. Implement business logic in `frontend/js/domain/`
2. Write comprehensive tests in `frontend/__tests__/`
3. Document complex business rules in code comments

### Game Data Modifications

- JSON files in `frontend/data/` are auto-formatted with Prettier
- System.json in root directory also formatted
- Use RPG Maker MZ editor for major structural changes

## Important Notes

### RPG Maker MZ Compatibility

- Plugins must be compatible with NW.js runtime
- Global variables available: `PluginManager`, `$dataSystem`, etc.
- Use browser/Node.js compatible module exports

### Clean Architecture Principles

- Domain layer has no external dependencies
- Adapters handle framework-specific code
- Business logic is testable in isolation

### Development Tools

- NW.js for game runtime and debugging
- Docker support available (`.docker/`, `Dockerfile`)
- VS Code configuration in `.vscode/`
