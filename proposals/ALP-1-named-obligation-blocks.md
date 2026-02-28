# ALP-1: Named obligation blocks in surfaces

## Problem

Surfaces currently describe boundaries between actors and applications: what data is visible (`exposes`), what actions are available (`provides`), what constraints hold (`guarantee`). This works for user-facing boundaries but cannot express programmatic integration contracts where one party must supply typed implementations and the other offers typed services in return.

## Proposed constructs

`requires Name { ... }` and `provides Name { ... }` as surface clauses. Each named block contains typed field signatures, `invariant:` declarations, and optional `guidance:` blocks.

```allium
surface DomainIntegration {
    exposes:
        EntityKey
        EventOutcome

    requires DeterministicEvaluation {
        evaluate: (event: T, entities: EntityMap) -> EventOutcome

        invariant: Determinism
            -- For identical inputs, evaluate must produce
            -- byte-identical outputs across all instances.

        invariant: Purity
            -- No I/O, no clock, no mutable state outside arguments.
    }

    provides EventSubmitter {
        submit: (idempotency_key: String, event: T) -> Future<ByteArray?>

        invariant: AtMostOnceProcessing
            -- Within the TTL window, duplicate submissions
            -- receive the cached response.
    }
}
```

## Rationale

Framework-to-module boundaries are surfaces. A framework says "you must supply X with these properties" and "we give you Y with these guarantees". The current clause-based `provides:` lists actions an actor can invoke; it doesn't describe APIs the surface owner offers to its counterpart. Named obligation blocks with typed signatures and invariants capture this contract precisely.

## Design consideration: invariant scope

ALP-1 introduces `invariant:` scoped to obligation blocks. The tooling roadmap (TODO #2, property-based test generation) independently motivates top-level invariants that express system-wide properties spanning multiple rules, e.g. "account balance never goes negative". These are state assertions over entities rather than contract properties on an integration boundary.

The committee should consider whether invariants within obligation blocks and top-level invariants are the same construct at different scopes or fundamentally different things. If the same, the design here should not foreclose top-level use. If different, the naming should distinguish them. The tooling roadmap also notes that invariants would feed property-based test generators (TODO #2), be validated at runtime via surface trace checking (TODO #3), and could point to external verification artefacts (TODO #5), all of which bear on the design.

## Questions for the committee

1. `requires` and `provides` already have meanings elsewhere in the language (`requires:` as rule preconditions, `provides:` as surface action lists). Is the overloading acceptable, or should obligation blocks use distinct keywords (`expects`/`offers`, `demands`/`supplies`)?
2. Should `invariant:` be a new construct scoped to obligation blocks, or treated as equivalent to `guarantee:` with a scoping convention?
3. Can obligation blocks nest other declarations (e.g. `value ExtractionResult { ... }` inside a `requires` block), or should nested types be declared at module level and referenced?
