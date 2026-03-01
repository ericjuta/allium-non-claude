---
name: weed
description: Check and resolve divergence between `.allium` specifications and implementation code. Use for spec-vs-code alignment audits, then either update specs or update code based on chosen mode.
---

# Weed

Compare `.allium` specs to implementation and close mismatches deliberately.

## Modes

- **check** (default): report divergences only.
- **update-spec**: adjust `.allium` files to match current code behaviour.
- **update-code**: adjust code to match current spec behaviour.

If mode is unspecified, run **check** first.

## Workflow

1. Read `../../references/language-reference.md`.
2. Read target `.allium` files and corresponding code paths.
3. If available, run `allium check` before and after spec edits.
4. Classify each mismatch as:
   - spec bug,
   - code bug,
   - aspirational design gap,
   - intentional abstraction gap.
5. Apply only mode-approved edits.

## Reporting format (check mode)

For each divergence:

- **Area**
- **Spec says** (`file:line`)
- **Code does** (`file:line`)
- **Classification**
- **Recommended action**

## Boundaries

- Do not modify `../../references/language-reference.md`.
- Do not invent product decisions when mismatch intent is unclear; flag for decision.
- Keep code changes minimal and targeted when in update-code mode.
