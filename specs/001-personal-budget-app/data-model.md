# Data Model: Personal Budget App

**Feature**: `001-personal-budget-app`
**Date**: 2026-03-22

## Entities

### Category (Enum)

Fixed enumeration of payment methods. Not user-configurable.

```text
"Tarjeta BBVA" | "Tarjeta Supervielle" | "Préstamo" | "Otros gastos"
```

### Expense

Represents a single expense entry.

| Field               | Type                | Required | Description                                                         |
| ------------------- | ------------------- | -------- | ------------------------------------------------------------------- |
| `id`                | `string` (UUID)     | ✅       | Unique identifier, generated on creation                            |
| `category`          | `Category`          | ✅       | Payment method from fixed enum                                      |
| `amount`            | `number` (integer)  | ✅       | Expense amount in ARS (0–999,999,999)                               |
| `description`       | `string`            | ✅       | Free text description of the expense                                |
| `installmentAmount` | `number \| null`    | ❌       | Per-installment amount (null if not in installments)                |
| `installmentDetail` | `string \| null`    | ❌       | Installment info, e.g. "Cuota 2 de 6" (null if not in installments) |
| `createdAt`         | `string` (ISO 8601) | ✅       | Creation timestamp                                                  |
| `updatedAt`         | `string` (ISO 8601) | ✅       | Last update timestamp                                               |

**Validation rules**:

- `amount`: integer, range [0, 999_999_999]
- `description`: non-empty string, trimmed
- `installmentAmount`: if provided, integer, range [0, 999_999_999]
- `installmentDetail`: if provided, non-empty string, trimmed

### Budget

Represents the monthly budget limit. Single instance.

| Field       | Type                | Required | Description                                 |
| ----------- | ------------------- | -------- | ------------------------------------------- |
| `amount`    | `number` (integer)  | ✅       | Monthly budget limit in ARS (0–999,999,999) |
| `updatedAt` | `string` (ISO 8601) | ✅       | Last update timestamp                       |

**Validation rules**:

- `amount`: integer, range [0, 999_999_999]

### Store Schema (Persisted)

The Zustand store shape that gets persisted to localStorage:

| Field      | Type        | Description                 |
| ---------- | ----------- | --------------------------- |
| `budget`   | `Budget`    | Current monthly budget      |
| `expenses` | `Expense[]` | List of all expense records |

**Schema versioning**:

- `version: 1` — initial schema
- Zustand `persist` middleware `migrate` function handles future schema changes

## Relationships

```text
Budget (1) ──── has context for ────> Expense (many)
Category (enum) ──── classifies ────> Expense (many)
```

- Budget and Expenses are independent entities (no foreign keys)
- The relationship is logical: the dashboard computes `remaining = budget.amount - sum(expenses.amount)`
- Category is a value type (enum), not a separate entity

## Derived State (Computed, not stored)

| Derived Value     | Formula                                        | Used In                 |
| ----------------- | ---------------------------------------------- | ----------------------- |
| `totalSpent`      | `sum(expenses.map(e => e.amount))`             | Dashboard               |
| `remaining`       | `budget.amount - totalSpent`                   | Dashboard               |
| `isOverBudget`    | `totalSpent > budget.amount`                   | Dashboard (alert state) |
| `progressPercent` | `min((totalSpent / budget.amount) * 100, 100)` | Progress bar            |
| `expenseCount`    | `expenses.length`                              | Dashboard               |
