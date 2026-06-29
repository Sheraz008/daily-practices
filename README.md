# Daily Practices

A small habit-tracking slice built with **Expo (managed) + React Native + TypeScript**. Three screens: a virtualized list of practices, a detail screen with mutations, and a derived "Today's Summary".

## Setup

```bash
npm install
npm start          # then press i (iOS), a (Android), or scan the QR in Expo Go
```

Other scripts:

```bash
npm test           # Jest + @testing-library/react-native
npm run typecheck  # tsc --noEmit (strict)
```

> Requires Node 18+. Built and verified against Expo SDK 56 / React Native 0.85 / React 19.

## What's implemented

- **Navigation** — bottom tabs (`Practices`, `Summary`); the Practices tab holds a native stack (`List → Detail`).
- **List** — `FlashList` virtualization, loading / error / empty states, pull-to-refresh, responsive **1 column on phone / 2 columns on tablet & landscape**.
- **Detail** — "Mark complete" and a 1–5 star rating, both wired to mutations with **optimistic updates**; works in both orientations.
- **Summary** — practices completed today + average rating across completed practices, **derived** from the dataset and correct the instant you switch tabs.
- **Reusable components** — `Card` (used by list rows and summary tiles), `Button`, plus `StarRating`. Design tokens in one place.
- `expo-haptics` feedback on mark-complete / rating (the optional Expo bonus).

## Time spent

~3.5 hours. Rough split: setup & mock API 30m · navigation + list 60m · detail + mutations 50m · summary 30m · tests 30m · docs + responsive polish 30m. Most of the unplanned time went to a toolchain issue (see AI_USAGE.md) — Jest/RNTL version alignment for the SDK 56 / React 19 stack.

## State management — choice & why

**TanStack Query (React Query).**

The data here is **server state** — it's fetched, cached, mutated, and refetched. React Query is purpose-built for exactly that, and it answers the brief's two pointed requirements directly:

- **State across tab boundaries.** There is a single `QueryClient` above the navigators. The List, Detail, and Summary screens all read the **same** `['practices']` query, so the cache *is* the shared state. A mutation that patches the cache is reflected on every screen with zero manual cross-tab plumbing — that's why the Summary tab is already correct the moment you switch to it.
- **Optimistic updates.** First-class `onMutate → onError (rollback) → onSettled (invalidate)` lifecycle, instead of hand-rolling snapshot/rollback in a reducer.

**Why not Redux or Context:** Redux (even with RTK Query, which is essentially React Query's model) would add boilerplate for what is fundamentally a cache, not complex client state. Plain Context would mean re-implementing caching, request dedupe, and optimistic rollback by hand — and naive Context updates re-render every consumer. There's almost no genuine *client* state here (no auth, filters, or wizard flow), so a server-state library is the right tool and a global store isn't justified.

### Custom hooks

- **`usePractices()` / `usePractice(id)`** — the list query, plus a single-item read that uses React Query's `select` against the *same* cache key. Detail never fetches separately, so it can't drift from the list.
- **`useMutatePractice()`** — the non-trivial one. It hides the whole optimistic-update mechanism (cancel in-flight reads → snapshot → patch → roll back on error → invalidate on settle) behind a tiny surface: `markComplete()`, `rate()`, and `isPending` flags. Hook boundary: screens express *intent*, the hook owns *cache mechanics*.

### Which mutation is optimistic, and why

**Both** are, sharing one cache-patch helper. The rating is the showcase: it's a high-frequency, low-stakes tap where the star must fill **instantly** to feel responsive, and a rare failed write is trivial to roll back. Mark-complete uses the same pattern so the List badge and Summary numbers update immediately rather than after a ~700ms round-trip. On error, both snapshot the previous list and restore it; `onSettled` invalidates to reconcile with the server.

## Performance

- **`FlashList`** (v2) for virtualization — only visible rows are mounted, so 100+ items (the seed has 120) scroll smoothly.
- **`PracticeCard` is memoized** with a field-level comparator, and the list's `onPress`/`renderItem` are `useCallback`-stable, so editing one practice re-renders only that row.
- **Responsive** via a `useColumns` hook reading `useWindowDimensions` (live on rotation); the list remounts on column-count change for a clean re-layout.

## Testing strategy

`npm test` — 11 tests across 3 layers (3 files):

1. **Utility (`computeSummary`)** — the pure derived-state logic: empty dataset, excluding unrated/incomplete practices from the average, and rounding. This is where bugs would silently corrupt the Summary, so it gets the most cases.
2. **Component (`Button`)** — renders its label, fires `onPress`, and correctly *blocks* presses when `disabled` or `loading` (interaction + state, not just snapshot).
3. **Hook (`useMutatePractice`)** — the highest-value logic: asserts the cache is patched **optimistically before** the server responds, and **rolls back** on failure. The network layer is mocked with a deferred promise so the test controls timing.

**What I skipped and why:** no full screen render tests (navigation + FlashList host-component plumbing is high-setup, low-signal for a 4h budget) and no snapshot tests (brittle, and the brief explicitly de-prioritizes pixel-perfection). The optimistic-update test is effectively a screen-flow test at the layer where the actual risk lives, so it earns its keep more than a rendered Detail screen would.

## What I'd do next with another 4 hours

- **Toasts + retry on mutation failure** — the rollback works, but the user currently gets no message when a write fails.
- **Persisted error injection toggle in a dev menu** — `practicesApi` already supports `configureMockApi({ failureRate })`; expose it to demo the error state live.
- **A real screen-level integration test** for the List → Detail → back-to-List flow, now that the Jest/RNTL stack is sorted.
- **Filter/sort by category** on the list — the first piece of genuine *client* state, which is where I'd add a small amount of local state (likely `useState` + URL/route params, still not a global store).
- **Accessibility pass** — dynamic type, and verifying the star rating's `adjustable` role announces correctly.
- **`MasonryFlashList` / column-balancing** polish for the tablet 2-column layout, and skeleton loaders instead of a spinner.

## Project structure

```
src/
  api/         mock network layer (practicesApi) + seed data (120 items)
  components/  Card, Button, StarRating, PracticeCard, StateViews
  hooks/       usePractices, useMutatePractice, useColumns
  lib/         queryClient + centralized query keys
  navigation/  RootNavigator (tabs + stack) + param types
  screens/     PracticesList, PracticeDetail, Summary
  theme/       design tokens (colors, spacing, radii, typography)
  types/       Practice and mutation input types (the API boundary)
  utils/       computeSummary (pure derived state)
```
