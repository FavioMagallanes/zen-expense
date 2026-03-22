# Implementation Plan: Personal Budget App

**Branch**: `001-personal-budget-app` | **Date**: 2026-03-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-personal-budget-app/spec.md`

## Summary

App de presupuesto personal client-side con gestión de presupuesto mensual, CRUD de gastos con categorías fijas (Tarjeta BBVA, Tarjeta Supervielle, Préstamo, Otros gastos), lógica de cuotas, dashboard en tiempo real y función de limpieza total. Arquitectura de screaming architecture con custom hooks para lógica financiera, Zustand para estado global con persistencia en localStorage, y diseño OLED Dark minimalista consumido desde Stitch.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict mode)
**Primary Dependencies**: React 19, Vite 7, Tailwind CSS 4, shadcn/ui (radix-mira style), Zustand 5, Hugeicons
**Storage**: localStorage via Zustand `persist` middleware
**Testing**: Manual testing (no test framework requested)
**Target Platform**: Web (desktop + mobile responsive)
**Project Type**: Single-page web application (SPA)
**Performance Goals**: Instant UI responses (<100ms); 60 FPS animations
**Constraints**: Client-only (no backend); offline-capable; montos enteros (ARS sin decimales); max $999.999.999
**Scale/Scope**: Single user; ~100-1000 expense records in localStorage

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                        | Status  | Evidence                                                                                                 |
| -------------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| I. SOLID & Clean Code            | ✅ PASS | Custom hooks isolate business logic; components handle only rendering; single-responsibility throughout  |
| II. Naming Conventions           | ✅ PASS | kebab-case files, PascalCase components, camelCase functions, UPPER_SNAKE_CASE constants planned         |
| III. Arrow-Function Syntax       | ✅ PASS | All components and functions will use arrow syntax; no `function` keyword                                |
| IV. UI/UX — shadcn/ui First      | ✅ PASS | shadcn/ui already configured (radix-mira); Button installed; will add Card, Select, Input, Dialog, Toast |
| V. State & Persistence — Zustand | ✅ PASS | Zustand 5 installed; persist middleware to localStorage with typed interfaces and schema versioning      |
| VI. OLED Dark Minimalism         | ✅ PASS | Dark theme via Tailwind CSS custom properties; pure black backgrounds; Stitch design system reference    |

**Gate result**: ✅ ALL PASS — proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/001-personal-budget-app/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root) — Screaming Architecture

```text
src/
├── main.tsx                           # App entry point
├── App.tsx                            # Root component, layout shell
├── index.css                          # Tailwind imports, OLED theme variables
│
├── components/                        # Shared/base components
│   ├── ui/                            # shadcn/ui primitives (button, card, select, input, dialog, toast)
│   └── theme-provider.tsx             # Dark mode provider (existing)
│
├── features/                          # Screaming architecture — feature folders
│   ├── budget/                        # US1: Budget management
│   │   ├── components/
│   │   │   └── budget-input.tsx       # Editable budget input with validation
│   │   ├── hooks/
│   │   │   └── use-budget.ts          # Custom hook: budget logic + derived state
│   │   └── index.ts                   # Public API barrel export
│   │
│   ├── expenses/                      # US2+US3+US4: Expense CRUD + installments
│   │   ├── components/
│   │   │   ├── expense-form.tsx       # Create/edit form (category, amount, installments)
│   │   │   ├── expense-list.tsx       # List of expenses with edit/delete actions
│   │   │   └── expense-item.tsx       # Single expense row with installment badge
│   │   ├── hooks/
│   │   │   └── use-expenses.ts        # Custom hook: expense CRUD operations
│   │   └── index.ts                   # Public API barrel export
│   │
│   ├── dashboard/                     # US5: Summary dashboard
│   │   ├── components/
│   │   │   ├── dashboard-summary.tsx  # Total spent vs remaining cards
│   │   │   └── budget-progress.tsx    # Visual progress bar with alert states
│   │   ├── hooks/
│   │   │   └── use-dashboard.ts       # Custom hook: derived financial calculations
│   │   └── index.ts                   # Public API barrel export
│   │
│   └── reset/                         # US6: Total cleanup
│       ├── components/
│       │   └── reset-button.tsx       # Reset button with confirmation dialog
│       ├── hooks/
│       │   └── use-reset.ts           # Custom hook: reset all data logic
│       └── index.ts                   # Public API barrel export
│
├── stores/                            # Zustand global stores
│   └── expense-store.ts               # Single store: budget + expenses + reset (with persist)
│
├── types/                             # Shared TypeScript types
│   └── expense.ts                     # Budget, Expense, Category types
│
├── lib/                               # Utilities
│   ├── utils.ts                       # cn() helper (existing)
│   ├── constants.ts                   # MAX_AMOUNT, STORAGE_KEY, SCHEMA_VERSION, CATEGORIES
│   └── validators.ts                  # Input validation helpers (amount, budget)
│
├── hooks/                             # Shared custom hooks
│   └── use-format-currency.ts         # ARS currency formatting hook
│
└── assets/                            # Static assets
    └── react.svg                      # (existing)
```

**Structure Decision**: Screaming architecture with feature-based folders (`features/budget/`, `features/expenses/`, `features/dashboard/`, `features/reset/`). Each feature encapsulates its own components and hooks, exposing a clean barrel export. Shared concerns (store, types, utils) live at `src/` root level. This aligns with Constitution Principle I (SOLID — single responsibility per feature module) and enables independent development per user story.

## Complexity Tracking

> No constitution violations detected. No complexity justifications needed.
