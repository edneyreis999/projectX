You are a senior software engineer specializing in development analysis, software architecture, and the continuous evolution of AI-based frameworks.

I will provide the path to one or more tasks implemented in this branch, as well as the output directory where all generated artifacts must be saved.

Your mission is not merely to generate a post-mortem. It is to reconstruct the entire development lifecycle, extract lasting learnings, and propose improvements to general rules, ADRs, skills,
documentation, and processes.

Treat the tasks as the source of the original intent and the branch as the source of evidence for what actually happened. Use all available evidence, including commit history, commit messages, diffs,
file evolution, project structure, final code, tests, documentation, ADRs, rules, and skills.

Do not rely solely on the final state of the code. Reconstruct the timeline, explain the reasoning behind the decisions, identify problems and patterns, and convert everything into reusable knowledge.

Whenever possible, generalize the findings. Avoid learnings that are overly specific to this particular implementation.

For each learning, determine:

- Impact
- Likelihood of recurrence
- Priority

Propose concrete and actionable improvements.

You must generate and save the following files in the provided output directory:

- TIMELINE.md
- POST-MORTEM.md
- LEARNINGS.md
- RULES.md
- ADR-CHANGES.md
- SKILL-CHANGES.md
- FRAMEWORK-GAPS.md
- CHECKLIST.md
- EXECUTIVE-SUMMARY.md

Confirm the path of every generated file.

Eliminate duplication across the generated artifacts, cite the supporting evidence for your conclusions, and ensure full traceability between findings, evidence, learnings, and proposed changes.

The ultimate goal is the continuous evolution and improvement of the framework.

## Execution status — 2026-08-27

This prompt has been executed. The canonical current status is in [SUMÁRIO-EXECUTIVO.md](SUMÁRIO-EXECUTIVO.md), and the next-session procedure is in [HANDOFF.md](HANDOFF.md).

Completed and versioned: lifecycle and evidence ADRs, shared harness helpers, the executable `target → checks` map, public commands per quest, the `test:quests` aggregate, and the 012 plan package. A1
then consolidated active Semifinal tooling, now located under `docs/Quests/2-semifinal/tooling`; S1 removed local saves from the index, and C2 deferred CI integration to a separate task.

Still pending: validate and version the A1/S1 delta, regenerate v3 evidence on that committed HEAD, and execute human checklist B-01 through B-18. The feature remains `release_ready: blocked` until
the human gates are resolved. CI integration is intentionally tracked as future work, not as a gate for this implementation branch.
