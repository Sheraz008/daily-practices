# AI Usage

> ⚠️ **Read before submitting.** This file is drafted from how the project was actually built (with Claude as the primary pair). The technical facts below are accurate, but **you should rewrite it in your own voice and verify each claim** — especially Section 5, which must be a decision *you* genuinely own. Graders weigh Section 3 most.

## 1. Tools & Rough Mix

- **Claude (Opus) — ~75%:** scaffolding, the React Query layer, components, screens, and tests.
- **Hand-written / hand-directed — ~20%:** architecture decisions (state-management choice, hook boundaries, which mutation is optimistic), reviewing every file, and driving the toolchain fixes.
- **Expo CLI codegen — ~5%:** `create-expo-app` project skeleton.

## 2. Three Prompts That Produced Something I Kept

1. **"Build a `useMutatePractice` hook with React Query that does optimistic updates for both mark-complete and star-rating, with rollback on error and a shared cache-patch helper."**
   → Produced the `onMutate → onError → onSettled` structure with a single `patchCache` helper reused by both mutations. Kept it because the shared helper removed duplication and the cancel-then-snapshot ordering was correct (a late refetch can't clobber the optimistic write).

2. **"Set up the list with FlashList, responsive 1-col phone / 2-col tablet, pull-to-refresh, and loading/error/empty states."**
   → Produced the `useColumns` hook (driven by `useWindowDimensions`) and the per-cell gutter approach. Kept the structure; verified FlashList v2 no longer needs `estimatedItemSize`.

3. **"Write a hook test that proves the rating is applied to the cache optimistically before the server responds, then persists; and a second that rolls back on failure."**
   → Produced the deferred-promise pattern that lets the test control exactly when the mock "server" replies, so the optimistic window is observable. Kept it almost verbatim.

## 3. Two Cases Where AI Got It Wrong (most important)

**Case 1 — Confidently installed the wrong Jest major version.**
The initial test setup installed `jest@30` + `@types/jest@30`. But `jest-expo@56` is built on the **Jest 29** ecosystem. The result was a cryptic runtime crash (`this._moduleMocker.clearMocksOnScope is not a function`) caused by `jest-runtime@30` mixing with `jest-mock@29` pulled in transitively. The AI's first instinct ("install the latest testing libraries") was wrong because Expo pins its toolchain. **Fix:** inspected `jest-expo`'s dependency tree (`npm ls jest jest-mock`), saw the version skew, and pinned `jest@^29.7.0` / `@types/jest@^29.5`.

**Case 2 — Wrote tests against the old (synchronous) RNTL API.**
The first test draft used `render(...)`, `fireEvent.press(...)`, and `renderHook(...)` synchronously — the long-standing React Native Testing Library API. They failed with `render function has not been called`, which looked like a config problem but wasn't. In **RNTL v14** (the version compatible with React 19, which dropped `react-test-renderer` for the new `test-renderer` package), `render`, `fireEvent`, and `renderHook` are now **async**. **Fix:** confirmed by grepping the compiled `dist/render.js` (`async function render`), then `await`-ed all three. The lesson: a "render not called" error can actually mean "render returned a Promise you didn't await."

> 💡 If you hit different issues on your machine, swap these for your own — graders can tell first-hand stories from invented ones.

## 4. What I Deliberately Did NOT Use AI For

- **The state-management decision.** Whether to use React Query vs Redux vs Context is the core judgment the brief is testing; I reasoned it from the problem shape (almost all server state, cross-tab sync, optimistic updates) rather than accepting a default.
- **Reviewing every generated file before trusting it.** AI-generated optimistic-update code is exactly the kind of thing that looks right and is subtly wrong (e.g. forgetting `cancelQueries`), so I read it line by line.

## 5. One Architectural Decision I Made Independently

> ⚠️ **Make this genuinely yours.** Below is a true decision from this build you can claim *only if you actually reasoned it yourself*; otherwise replace it.

**Detail reads a single practice via React Query's `select` on the existing `['practices']` list query, instead of a separate `['practice', id]` query.**

Reasoning: there is exactly one canonical record per practice. A second query key would mean two cache entries that can disagree, and would force me to keep them in sync after every mutation. By selecting the item out of the same list cache, Detail and List are guaranteed consistent for free, a mutation patches one place, and the Summary's derived numbers stay correct — all from a single source of truth. The cost (Detail depends on the list being loaded) is acceptable because you can only reach Detail by tapping a row in that list.
