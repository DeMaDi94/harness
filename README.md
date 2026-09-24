# Blueprint

A starting point for new products: the Claude Code harness, the stack, the architecture and the
house style of a production Laravel + Inertia + React app — with no product in it yet.

| Path | What it is |
| --- | --- |
| [`CLAUDE.md`](CLAUDE.md) | Architecture, testing approach and conventions — start here |
| [`.claude/`](.claude/README.md) | Shared agent setup: rules, skills and the verification hooks |
| [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md) | The requirement catalogue — empty until a project starts |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | The decisions in force and the questions still open |
| [`docs/GLOSSARY.md`](docs/GLOSSARY.md) | Domain term → identifier, and area → namespace |
| [`docs/spec/status.txt`](docs/spec/status.txt) | Implementation status, one line per requirement |

## Starting a new product

Copy the repository, then ask Claude Code to run the `start-project` skill. It names the product,
drafts the requirement catalogue with you, fills the glossary and the first decisions, and leaves
every gate green.
