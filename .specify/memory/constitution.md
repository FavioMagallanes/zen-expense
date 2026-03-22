<!-- Sync Impact Report
  Version change: 0.0.0 → 1.0.0 (MAJOR: initial ratification)
  Added principles: I–VI (all new)
  Added sections: Technology Stack, Development Workflow
  Templates requiring updates: ✅ plan-template.md (generic, no conflicts)
  Follow-up TODOs: none
-->

# Zen Expense Constitution

## Core Principles

### I. SOLID & Clean Code

Apply S.O.L.I.D. principles where they add value and Clean Code practices across all logic:

- Functions MUST do one thing and be named after that one thing
- Max ~20 lines per function; extract when exceeding
- No magic numbers or hardcoded strings — use named constants
- Explicit error handling; NEVER silence errors
- Prefer pure functions and immutability; side effects MUST be isolated
- `any` type is forbidden in production code — use `unknown` or proper generics

### II. Naming Conventions

Strict, project-wide naming rules:

- **Files & folders**: `kebab-case` — e.g. `expense-list.tsx`, `use-local-storage.ts`
- **React components**: `PascalCase` export — e.g. `ExpenseList`, `ThemeProvider`
- **Functions & variables**: `camelCase` — e.g. `getTotal`, `isActive`
- **Constants**: `UPPER_SNAKE_CASE` — e.g. `MAX_CATEGORIES`, `STORAGE_KEY`
- **Types & interfaces**: `PascalCase` — e.g. `Expense`, `CategoryFilter`

### III. Arrow-Function Syntax

- MUST use arrow functions (`=>`) for all declarations; the `function` keyword is forbidden
- Prefer single-expression bodies when the logic fits one line: `const double = (n: number): number => n * 2`
- All parameters and return types MUST carry explicit TypeScript annotations
- Use `const` by default; `let` only when reassignment is unavoidable; `var` is forbidden

### IV. UI/UX — shadcn/ui First

- shadcn/ui components are the mandatory foundation for every UI element
- Extend or compose existing shadcn primitives; never duplicate their purpose
- All interactive elements MUST be keyboard-accessible (WCAG 2.1 AA minimum)
- Mobile-first responsive layouts using Tailwind CSS utilities

### V. State & Persistence — Zustand

- Zustand is the single source of truth for global state
- Every store MUST be strictly typed with TypeScript interfaces
- Persistence uses the Zustand `persist` middleware backed by `localStorage`
- Data loaded from storage MUST be validated at runtime; corrupt data falls back to defaults
- Storage schemas MUST include a version field for future safe migrations

### VI. OLED Dark Minimalism

- Pure black backgrounds (`oklch(0 0 0)` / `#000000`) as the default dark surface
- High-contrast foreground (near-white) for text — target ≥ 7:1 AAA ratio
- Accent colors used sparingly and consistently via CSS custom properties
- 8 px spacing grid; generous whitespace; no visual clutter
- Typography: Inter Variable (`@fontsource-variable/inter`), clear size hierarchy
- Animations limited to micro-interactions (200–300 ms); 60 FPS minimum

## Technology Stack

| Layer     | Choice                                  |
| --------- | --------------------------------------- |
| Framework | React 19 + TypeScript 5.9 (strict mode) |
| Build     | Vite                                    |
| Styling   | Tailwind CSS 4 + shadcn/ui              |
| State     | Zustand (with `persist` middleware)     |
| Icons     | Hugeicons                               |
| Font      | Inter Variable                          |
| Quality   | ESLint + Prettier + `tsc --noEmit`      |

## Development Workflow

1. **Branching**: feature branches from `main`; conventional commits enforced
2. **Linting**: ESLint and Prettier MUST pass before every commit
3. **Type safety**: `tsc --noEmit` MUST pass; strict mode is non-negotiable
4. **Code review**: PRs MUST verify compliance with principles I–VI
5. **Atomic commits**: one logical change per commit; no mixed concerns

## Governance

This constitution supersedes all other development practices in the Zen Expense project.

- Any deviation MUST be documented inline with a justification comment
- Amendments require a version bump, dated entry, and rationale
- All PRs and code reviews MUST verify compliance with these principles
- Complexity beyond these standards MUST be justified in writing

**Version**: 1.0.0 | **Ratified**: 2026-03-22 | **Last Amended**: 2026-03-22
