---
name: tend
description: Update existing `.allium` specifications for requested behavioural changes. Use when requirements are mostly known and the task is to add/modify entities, rules, triggers, surfaces, or fix Allium spec syntax/validation issues (not implementation code changes).
---

# Tend

Maintain and evolve `.allium` specs with strong behavioural discipline.

## Workflow

1. Read `../../references/language-reference.md`.
2. Read the target `.allium` file(s).
3. If `allium` CLI exists, run `allium check` before edits to establish baseline.
4. Implement requested spec changes with minimal surface area.
5. Run `allium check` again after edits and fix all errors.

## Behavioural standards

- Challenge vague requirements; ask clarifying questions instead of guessing.
- Keep specs behavioural, not implementation-specific.
- Preserve current `-- allium: N` marker.
- Keep declaration section ordering valid.
- Use `with` for relationships and `where` for projections.
- Use `Entity.created(...)` for creation.
- Use `transitions_to` vs `becomes` correctly.
- Add `requires` guards for temporal triggers.
- Move variable thresholds/timeouts into `config`.

## Boundaries

- Edit `.allium` files only.
- Do not modify implementation code.
- Do not modify `../../references/language-reference.md`.
- For extracting specs from existing code, use `distill`.
- For open-ended discovery of new requirements, use `elicit`.
