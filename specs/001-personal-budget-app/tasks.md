# Tasks: Personal Budget App

**Feature**: `001-personal-budget-app`
**Date**: 2026-03-22
**Source**: [plan.md](./plan.md) | [spec.md](./spec.md) | [data-model.md](./data-model.md)

## Task Breakdown

### Phase 0 — Foundation & Infrastructure

- [ ] **T-001**: Install shadcn/ui components (card, input, select, dialog, badge, separator, switch)
- [ ] **T-002**: Create TypeScript types (`src/types/expense.ts`) — Category, Expense, Budget, StoreState
- [ ] **T-003**: Create constants (`src/lib/constants.ts`) — MAX_AMOUNT, STORAGE_KEY, SCHEMA_VERSION, CATEGORIES
- [ ] **T-004**: Create validators (`src/lib/validators.ts`) — validateAmount, validateDescription, sanitizeNumericInput
- [ ] **T-005**: Create currency formatting hook (`src/hooks/use-format-currency.ts`) — Intl.NumberFormat es-AR
- [ ] **T-006**: Create Zustand store (`src/stores/expense-store.ts`) — budget + expenses + actions + persist
- [ ] **T-007**: Update OLED Dark theme (`src/index.css`) — pure black backgrounds, high contrast

### Phase 1 — US1: Budget Management (P1)

- [ ] **T-008**: Create `use-budget` hook (`src/features/budget/hooks/use-budget.ts`)
- [ ] **T-009**: Create `BudgetInput` component (`src/features/budget/components/budget-input.tsx`)
- [ ] **T-010**: Create barrel export (`src/features/budget/index.ts`)

### Phase 2 — US2: Expense Registration (P1)

- [ ] **T-011**: Create `use-expenses` hook (`src/features/expenses/hooks/use-expenses.ts`)
- [ ] **T-012**: Create `ExpenseForm` component (`src/features/expenses/components/expense-form.tsx`)
- [ ] **T-013**: Create `ExpenseItem` component (`src/features/expenses/components/expense-item.tsx`)
- [ ] **T-014**: Create `ExpenseList` component (`src/features/expenses/components/expense-list.tsx`)
- [ ] **T-015**: Create barrel export (`src/features/expenses/index.ts`)

### Phase 3 — US5: Dashboard (P2)

- [ ] **T-016**: Create `use-dashboard` hook (`src/features/dashboard/hooks/use-dashboard.ts`)
- [ ] **T-017**: Create `BudgetProgress` component (`src/features/dashboard/components/budget-progress.tsx`)
- [ ] **T-018**: Create `DashboardSummary` component (`src/features/dashboard/components/dashboard-summary.tsx`)
- [ ] **T-019**: Create barrel export (`src/features/dashboard/index.ts`)

### Phase 4 — US6: Reset (P3)

- [ ] **T-020**: Create `use-reset` hook (`src/features/reset/hooks/use-reset.ts`)
- [ ] **T-021**: Create `ResetButton` component (`src/features/reset/components/reset-button.tsx`)
- [ ] **T-022**: Create barrel export (`src/features/reset/index.ts`)

### Phase 5 — Integration & Layout

- [ ] **T-023**: Update `App.tsx` — compose all features into final layout
- [ ] **T-024**: Update `main.tsx` — force dark class, remove theme toggle
- [ ] **T-025**: Verify build passes (`tsc --noEmit` + `vite build`)
