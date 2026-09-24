# Glossary — the domain's words, and what we call them in code

`docs/REQUIREMENTS.md` is written in the product's own vocabulary. The code is English. Without a
fixed mapping every session invents its own translation, and one domain term becomes `item`,
`entry`, `lineItem` and `position` in four different files.

**The rule:** identifiers are English. Both columns below are binding. If you need a term that is
not here, add it here in the same change.

## Area → code namespace

One row per area prefix in the catalogue. `{Area}` in `.claude/rules/architecture.md` means the
namespace column — do not invent an area name.

| Prefix | Area | PHP namespace | Frontend folder |
| --- | --- | --- | --- |
| | _filled by the `start-project` skill_ | | |

## Core entities

| Domain term | Code | Notes |
| --- | --- | --- |
| | | What it is, and the confusable neighbour it is *not*. |

## Terms of art that stay untranslated

Where translating a term loses its meaning (a legal or industry term with no faithful English
equivalent), it stays in the original, spelled exactly as the spec spells it.

| Term | Why it stays | Where |
| --- | --- | --- |

## Status and enum values

Enum **cases** are English; their stored value is the wire format; their label is a translation key.

| Enum | Case | Stored value | Label key |
| --- | --- | --- | --- |
