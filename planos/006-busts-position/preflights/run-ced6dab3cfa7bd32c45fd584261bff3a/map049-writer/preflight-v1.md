---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:6572a8ac60d0d33347cab60118c6f6beca5d0e32443250314b0797acfd21f4a4"
  execution_id: "loki-execution-v2:961d50011999322d0e323dfb5889f3848fae8a22222ae568a345ff969dde910f"
  agent_name: "map049-writer"
  agent_name_path: "map049-writer"
  run_path_id: "run-ced6dab3cfa7bd32c45fd584261bff3a"
  version: 1
  publication_status: "preflight_created"
  revision: "git:30b5590413e8d2b922a211f5f0b002c2a563288a; worktree dirty outside target"
  demand_digest: "sha256:c5c20e974f6e01d753d673be682db27ef6723a1e982895e662d24cf8319d886f"
  analysis_digest: "sha256:8e2ed8b2e0ceb7facdce790bb06ae572552cf8afa46aad7d626584035d43e1df"
  coverage:
    topics: ["approved-bust-composition", "structured-map-event-write", "visustella-bust-lifecycle"]
    surfaces: ["frontend/data/Map049.json#events[1].pages[0].list"]
    domain_ids: ["rpg-maker-mz-data-json", "visustella-events-presentation"]
  coverage_digest: "sha256:af5963d62c51fee6bd16945e24d1f357717ec2a617012bc0902b3afeb6ee704d"
  sources:
    - locator: "AGENTS.md"
      source_type: "project-policy"
      applicable_version: "not-versioned"
      identity_digest: "sha256:cf76822dca59827dd51d5a9c67ea5524882cc7be58801b017e08494129f9cb22"
      freshness_condition: "File digest remains equal at dispatch."
      freshness_evidence: ["sha256:cf76822dca59827dd51d5a9c67ea5524882cc7be58801b017e08494129f9cb22"]
      coverage: ["structured-map-event-write"]
    - locator: "planos/006-busts-position/improved-demand.md"
      source_type: "approved-demand-markdown"
      applicable_version: "2026-08-04"
      identity_digest: "sha256:c5c20e974f6e01d753d673be682db27ef6723a1e982895e662d24cf8319d886f"
      freshness_condition: "Exact digest equals execution input demand_digest."
      freshness_evidence: ["sha256:c5c20e974f6e01d753d673be682db27ef6723a1e982895e662d24cf8319d886f"]
      coverage: ["approved-bust-composition"]
    - locator: "planos/006-busts-position/technical-analysis.md"
      source_type: "technical-analysis-markdown"
      applicable_version: "1.1.0"
      identity_digest: "sha256:8e2ed8b2e0ceb7facdce790bb06ae572552cf8afa46aad7d626584035d43e1df"
      freshness_condition: "Exact digest equals execution input analysis_digest."
      freshness_evidence: ["sha256:8e2ed8b2e0ceb7facdce790bb06ae572552cf8afa46aad7d626584035d43e1df"]
      coverage: ["approved-bust-composition", "structured-map-event-write", "visustella-bust-lifecycle"]
    - locator: "frontend/data/Map049.json"
      source_type: "rpg-maker-mz-map-json"
      applicable_version: "current-project"
      identity_digest: "sha256:a3630d512c42953b705cfc2fb1623aa57bdc4641c075cc5431bd3feb9dd837d0"
      freshness_condition: "Exact file hash and Event 1/Page 1 preconditions remain unchanged immediately before write."
      freshness_evidence: ["git status --short -- frontend/data/Map049.json => clean", "sha256:a3630d512c42953b705cfc2fb1623aa57bdc4641c075cc5431bd3feb9dd837d0"]
      coverage: ["structured-map-event-write", "visustella-bust-lifecycle"]
    - locator: "frontend/js/plugins.js"
      source_type: "rpg-maker-plugin-configuration"
      applicable_version: "current-project"
      identity_digest: "sha256:e42837f18b356f25710a162a7bea943cc7bae6b0d0c6caaccfc22f5be7790461"
      freshness_condition: "Packaged envelope validator passes and VNPictureBusts remains active at dispatch."
      freshness_evidence: ["py -3 validate_plugins_js_envelope.py => editor-structural; plugin_objects=69", "VisuMZ_2_VNPictureBusts active at order 24"]
      coverage: ["visustella-bust-lifecycle"]
    - locator: "frontend/js/plugins/VisuMZ_2_VNPictureBusts.js"
      source_type: "local-vendor-plugin-header"
      applicable_version: "1.03"
      identity_digest: "sha256:a4013494d5bd7d996cc39ce00e4817c93d96c54a7c32782ae666ef55a42d203c"
      freshness_condition: "Exact digest remains equal at dispatch."
      freshness_evidence: ["sha256:a4013494d5bd7d996cc39ce00e4817c93d96c54a7c32782ae666ef55a42d203c"]
      coverage: ["visustella-bust-lifecycle"]
    - locator: "frontend/js/rmmz_objects.js#Game_Interpreter.prototype.command357"
      source_type: "local-engine-source"
      applicable_version: "RPG Maker MZ current-project"
      identity_digest: "sha256:e48350a2163acc449ca29e39d5ed65c294fbc6b6eca4b42eec57fd623086ef39"
      freshness_condition: "Exact engine file digest remains equal at dispatch."
      freshness_evidence: ["command357 passes params[0], params[1], params[3] to PluginManager.callCommand"]
      coverage: ["structured-map-event-write"]
  sanitized_summary: "Write only frontend/data/Map049.json Event 1 Page 1. Preserve current file style and all non-target units. Use Picture 1 Position 9 for Melia, Saparo and Rheed; Picture 2 Position 1 for Thorin; GraphicChange for Thorin_bobo; preserve CE16, monster interlude, VN assert/finish and final cleanup. Stop on target hash/precondition drift or new target need."
  gaps: ["Runtime visual composition, mirroring, layering, timing and readability require the prescribed human Playtest."]
  conflicts: []
  created_at: "2026-08-04T23:35:29.7446693Z"
  record_digest: "sha256:b9062a6817b83a17d3f04e4df268338154cdd6dca6fa3c5906e2bf19a34df77d"
---

# Session preflight - map049-writer

Preflight imutavel para a escrita estruturada de Map049 nesta execucao.
