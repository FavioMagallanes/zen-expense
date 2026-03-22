# Research: Personal Budget App

**Feature**: `001-personal-budget-app`
**Date**: 2026-03-22

## Research Tasks

### 1. Zustand Persist Middleware — Best Practices

**Decision**: Use Zustand `persist` middleware with `localStorage` as storage engine.

**Rationale**:

- Zustand 5 ships with built-in `persist` middleware that handles serialization/deserialization
- `localStorage` is synchronous, simple, and sufficient for single-user client-side apps
- Schema versioning via `version` field + `migrate` function handles future data shape changes
- Rehydration is automatic on app load

**Alternatives considered**:

- IndexedDB (via `idb-keyval`): More storage capacity but overkill for <1MB of expense data
- sessionStorage: Doesn't persist across browser sessions — rejected
- Custom serialization: Unnecessary complexity; Zustand handles JSON serialization natively

### 2. Input Validation Strategy — Integer-Only ARS Amounts

**Decision**: Validate at the component level using controlled inputs with `type="text"` + `inputMode="numeric"` and a custom validation utility.

**Rationale**:

- `type="number"` has inconsistent UX across browsers (scroll to change, no formatting)
- `type="text"` with `inputMode="numeric"` gives mobile numeric keyboard without browser quirks
- Validation utility strips non-digits, enforces range [0, 999_999_999], rejects decimals
- Inline error messages shown via shadcn/ui form patterns

**Alternatives considered**:

- `type="number"` with `step="1"`: Browser inconsistencies on mobile; allows scroll-to-change by default
- Zod schema validation: Heavy for simple integer validation; no forms library in use
- React Hook Form: Adds a dependency for a single-page app with 2 forms — too heavy

### 3. Currency Formatting — Argentine Pesos

**Decision**: Custom hook `useFormatCurrency` using `Intl.NumberFormat` with `es-AR` locale.

**Rationale**:

- `Intl.NumberFormat` is built-in (no dependencies), handles thousands separators (`.`) and locale
- Argentine convention: `$500.000` (dot as thousands separator, no decimals)
- Wrap in a hook for reuse across dashboard, expense list, and form displays

**Alternatives considered**:

- Manual string formatting: Fragile, doesn't handle edge cases
- External library (currency.js): Unnecessary dependency for display-only formatting

### 4. shadcn/ui Components Needed

**Decision**: Install the following shadcn/ui components:

| Component   | Purpose                                                  |
| ----------- | -------------------------------------------------------- |
| `button`    | ✅ Already installed. Actions: save, edit, delete, reset |
| `card`      | Dashboard summary cards, expense list container          |
| `select`    | Category picker (4 fixed options)                        |
| `input`     | Budget amount, expense amount, installment fields        |
| `dialog`    | Confirmation for delete and reset actions                |
| `badge`     | Installment indicator on expense items                   |
| `separator` | Visual dividers in dashboard                             |
| `switch`    | Toggle installment fields on/off                         |

**Rationale**: Minimal set that covers all UI needs from the spec without excess.

### 5. OLED Dark Theme Implementation

**Decision**: Modify existing Tailwind CSS custom properties in `index.css` to use pure black (`oklch(0 0 0)`) backgrounds. Apply `dark` class permanently (no light mode toggle needed).

**Rationale**:

- The app's single-purpose is OLED Dark aesthetic per spec and constitution
- shadcn/ui already uses CSS custom properties for theming; override `.dark` variables
- Stitch design reference (Screen ID: 8f78962530234e7684ade2dd319f1ae0) defines the exact visual targets
- No need for light/dark toggle — always dark

**Alternatives considered**:

- Dual theme support: Out of scope per spec; adds complexity for no user value
- Hardcoded Tailwind classes: Fragile; CSS variables are more maintainable

### 6. Screaming Architecture — Feature Folder Strategy

**Decision**: Organize code by feature domain (`features/budget/`, `features/expenses/`, `features/dashboard/`, `features/reset/`) with each feature containing its own `components/` and `hooks/` folders.

**Rationale**:

- "Screaming architecture" makes the project structure immediately communicate its purpose
- Each feature maps 1:1 to a user story group, enabling independent development
- Barrel exports (`index.ts`) provide clean public APIs between features
- Shared concerns (store, types, utils) at `src/` root to avoid duplication

**Alternatives considered**:

- Flat component structure (`src/components/`): Doesn't scale; mixes concerns
- Atomic design (atoms/molecules/organisms): Too abstract for a single-page app
- Domain-driven design with services layer: Overkill for client-only app with no API
