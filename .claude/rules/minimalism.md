---
paths:
  - 'app/**'
  - 'resources/js/**'
---

# Least code that works

Walk this ladder in order and stop at the first rung that solves the problem:

1. **Write nothing.** The requirement may already be met.
2. **Reuse what this repo has.** The `components/core` primitives, the shell in `layouts/shell`,
   the shadcn components in `components/ui`, `sonner`, `@dnd-kit`, `date-fns`, the value objects in
   `app/Domain/Shared`. Look before you build.
3. **Use the framework.** Laravel, Eloquent, Collections and Inertia cover more than they appear to.
4. **Add a dependency** only if it is already installed. A new one needs approval.
5. **Only then** write the smallest implementation that satisfies the requirement in front of you.

## Never trade these away to be "lean"

Validation, the requirement citation, the status-ledger update, the translation keys and the test
are not optional scope. Cutting them is a defect, not a simplification.

## Signals you went too far up the ladder

- An abstraction with exactly one caller.
- A parameter, config key or flag nothing sets.
- A layer that only forwards to the next layer.
- Generality for a second case that does not exist yet.
- A "flexible" implementation of a rule the spec states exactly. When a requirement says a value
  is fixed ("at most 3", "fixed, not configurable"), parameterising it is not foresight, it is an
  untested code path.
