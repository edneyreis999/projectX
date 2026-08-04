const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "..", "..", "..");
const transferTargets = new Map([[6, 45], [7, 44], [8, 58], [9, 59], [10, 51], [14, 50]]);
const stateMap = new Map([[1, 20], [2, 30], [3, 40], [4, 60], [5, 70], [6, 80], [7, 90], [8, 95]]);

function command(transitionId, indent) {
  return {
    code: 357,
    indent,
    parameters: ["Coreto_QuestCore", "QuestTransition", "QuestTransition", {
      questKey: "a-semifinal", transitionId
    }]
  };
}

function migrateMap(mapId) {
  const file = path.join(root, "frontend", "data", `Map${String(mapId).padStart(3, "0")}.json`);
  const map = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const event of map.events) {
    if (!event) continue;
    for (const page of event.pages) {
      const c = page.conditions;
      if (c.variableValid && c.variableId === 29 && stateMap.has(c.variableValue)) c.variableValue = stateMap.get(c.variableValue);
      page.list = page.list.flatMap(entry => {
        if (entry.code === 201 && entry.parameters[0] === 0 && transferTargets.has(entry.parameters[1])) {
          entry.parameters[1] = transferTargets.get(entry.parameters[1]);
          return [entry];
        }
        if ((entry.code === 355 || entry.code === 655) && /aSemifinal/.test(entry.parameters[0])) return [];
        if (entry.code === 122 && entry.parameters[0] === 29 && entry.parameters[1] === 29 && entry.parameters[2] === 0 && entry.parameters[3] === 0) {
          if (event.id === 13 && mapId === 51 && entry.parameters[4] === 4) return [command("GET_HELMET", entry.indent)];
          if (event.id === 6 && mapId === 50 && entry.parameters[4] === 8) return [command("DEPART_WITH_GUARDS", entry.indent)];
        }
        return [entry];
      });
    }
  }
  fs.writeFileSync(file, JSON.stringify(map, null, 2) + "\n", "utf8");
}

function migrateMap44And45(mapId) {
  const file = path.join(root, "frontend", "data", `Map${String(mapId).padStart(3, "0")}.json`);
  const map = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const event of map.events) {
    if (!event) continue;
    for (const page of event.pages) {
      const c = page.conditions;
      if (mapId === 45 && c.variableValid && c.variableId === 111) c.variableId = 29;
      if (mapId === 44 && c.variableValid && c.variableId === 29 && c.variableValue === 8) c.variableValue = 95;
      let terminalTransitionInserted = false;
      page.list = page.list.flatMap(entry => {
        if (entry.code === 201 && entry.parameters[0] === 0 && transferTargets.has(entry.parameters[1])) {
          entry.parameters[1] = transferTargets.get(entry.parameters[1]);
          return [entry];
        }
        if (mapId === 45 && entry.code === 357 && entry.parameters[0] === "Coreto_Quests" && entry.parameters[1] === "addWeapon") return [];
        if ((entry.code === 355 || entry.code === 655) && /aSemifinal/.test(entry.parameters[0])) {
          if (mapId === 44 && event.id === 10 && !terminalTransitionInserted) {
            terminalTransitionInserted = true;
            return [command("ARRIVE_HOME", entry.indent)];
          }
          return [];
        }
        return [entry];
      });
    }
  }
  fs.writeFileSync(file, JSON.stringify(map, null, 2) + "\n", "utf8");
}

[50, 51, 58, 59].forEach(migrateMap);
[44, 45].forEach(migrateMap44And45);
