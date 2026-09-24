# `.claude/` — shared agent setup

Everything here is committed and applies to every teammate using Claude Code in this repo.
`settings.local.json` is personal and gitignored.

The machinery: path-scoped rules, a Stop gate over changed files, PreToolUse guards, a prompt
review of every edit, and task-shaped skills. It was extracted from a production Laravel + Inertia
app and stripped of that app's domain; what is left is the part that makes Claude build *against a
specification* rather than around one.

## Requirements

- **`jq`** — every hook parses its payload with it. Without `jq` the hooks fail open (they exit 0),
  so nothing breaks and nothing is checked either. `brew install jq`.
- `vendor/` and `node_modules/` installed — the hooks call `vendor/bin/{pint,phpstan,pest}` and
  `node_modules/.bin/{vp,tsc}` directly.

Hooks load at session start. After changing `settings.json`, start a new session.

## Layout

| Path | What it does |
| --- | --- |
| `settings.json` | Permissions and hook wiring. Committed. |
| `hooks/verify-changes.sh` | **Stop gate.** Pint, PHPStan, `vp lint`, `tsc`, `spec:coverage` and the translation check over the working tree; blocks the turn if any fails. |
| `hooks/format-changed-file.sh` | PostToolUse: Pint or `vp fmt` on the file just written. Async, never blocks. Skips `docs/`. |
| `hooks/guard-spec-contract.sh` | PreToolUse (Edit/Write): asks the user before any write to `docs/REQUIREMENTS.md`. |
| `hooks/guard-gate-commands.sh` | PreToolUse (Bash): refuses a PHPStan baseline and `npx`-invoked gates. |
| `hooks/smoke-test.sh` | Verifies all of the above. Run it after editing any hook. |
| `rules/` | Path-scoped guidance, loaded automatically when a matching file is touched. |
| `skills/` | `start-project`, `implement-requirement`, `create-screen`. |

## The rules

| Rule | Applies to |
| --- | --- |
| `requirements.md` | `app/`, `resources/js/`, `tests/` — the spec is the contract, cite ids, never invent behaviour |
| `architecture.md` | `app/`, `routes/`, `database/`, `config/` — backend layers and boundaries |
| `react.md` | `resources/js/`, `resources/css/` — frontend layers, the core primitives, the house style |
| `i18n.md` | `resources/js/`, `resources/views/`, `app/`, `lang/` — one catalogue, English keys, every locale complete |
| `testing.md` | `tests/`, `*.test.ts(x)` — the four layers, requirement citation, golden vectors, e2e traps |
| `php.md` | `**/*.php` — style, camelCase, PHPStan and the no-baseline rule |
| `minimalism.md` | `app/`, `resources/js/` — least code that works |

## Gates nothing else provides

**Requirement traceability.** `php artisan spec:coverage` cross-references `docs/REQUIREMENTS.md`,
`docs/spec/status.txt` and the ids cited in tests. It fails when something marked `done` has no
test citing it, when a `changed`/`wont-do` entry carries no reason, or when a test cites an id the
catalogue does not declare. The Stop gate runs it every turn.

**An invented-behaviour review.** A prompt hook reads each edit under `app/` or `resources/js/`
and fails it for a business rule, default, threshold or option list that is not traceable to a
requirement or decision id, and for user-facing text that bypasses `t()` / `__()`. The first is
the failure mode that matters most when an agent builds from a spec: a plausible invented constant
looks correct and no test contradicts it.

**Translation completeness.** `tests/Architecture/TranslationsTest.php` fails on any literal
`t('…')` / `__('…')` key missing from a locale file. The Stop gate runs that one test file.

## What is deliberately not here

- **A test gate on Stop.** Pest is fast enough to run yourself; Playwright boots a server and takes
  minutes. The block message names the commands instead.
- **A spell-check gate.** UI copy lives in several languages in `lang/`; a single dictionary would
  fight it.
- **A naming-review prompt hook.** The code follows Laravel's own conventions, so Pint and PHPStan
  cover it — and `docs/GLOSSARY.md` fixes the domain vocabulary, which is the part that would
  actually drift.

## Debugging a hook

```sh
bash -n .claude/hooks/<script>.sh    # syntax — after every edit
bash .claude/hooks/smoke-test.sh     # behaviour, all hooks, plus a real Stop-gate run
jq -e '.hooks' .claude/settings.json # malformed JSON silently disables everything
```

One caveat worth knowing: `guard-gate-commands.sh` anchors its match to command position, so the
refused flags can be written inside backticks in prose. Written as flowing text in a heredoc they
still trip it — which is why `smoke-test.sh` is a file rather than a command you type.
