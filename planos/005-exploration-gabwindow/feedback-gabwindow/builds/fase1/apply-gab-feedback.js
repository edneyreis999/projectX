"use strict";

const fs = require("fs");

const targets = {
  "frontend/data/Map022.json": { interactions: [[30, 1, 12], [30, 1, 50]], force: [[30, 1, 12], [30, 1, 50]] },
  "frontend/data/Map045.json": {
    interactions: [[5,4,21],[7,1,9],[8,2,11],[8,2,26],[8,2,31],[8,2,36],[8,2,41],[8,2,46],[8,2,51],[8,2,56],[8,3,11],[8,4,12],[8,4,27],[8,4,42],[8,4,47],[8,4,52],[8,4,92],[8,4,122],[8,6,11],[12,1,12],[12,2,12],[12,3,12],[20,2,11]],
    force: [[5,4,21],[7,1,9],[8,2,11],[8,3,11],[8,4,12],[8,4,122],[8,6,11],[12,1,12],[12,2,12],[12,3,12],[20,2,11]]
  }
};

for (const [file, spec] of Object.entries(targets)) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const force = new Set(spec.force.map(x => x.join(":")));
  for (const [eventId, pageNo, index] of spec.interactions) {
    const command = data.events[eventId].pages[pageNo - 1].list[index];
    if (command.code !== 357 || command.parameters[1] !== "GabTextOnly") throw new Error(`Unexpected Gab at ${file} E${eventId}/P${pageNo}/${index}`);
    const args = command.parameters[3];
    const override = JSON.parse(args["Override:struct"]);
    if (override["BypassAntiRepeat:eval"] !== undefined) throw new Error(`Already changed ${file} E${eventId}/P${pageNo}/${index}`);
    const isForce = force.has([eventId,pageNo,index].join(":"));
    override["BypassAntiRepeat:eval"] = "true";
    args["ForceGab:eval"] = String(isForce);
    args["Override:struct"] = JSON.stringify(override);
    for (let offset = 1; offset <= 3; offset++) if (data.events[eventId].pages[pageNo - 1].list[index + offset].code !== 657) throw new Error(`Missing continuation at ${file} E${eventId}/P${pageNo}/${index}`);
    data.events[eventId].pages[pageNo - 1].list[index + 2].parameters[0] = `Force Gab? = ${isForce}`;
    data.events[eventId].pages[pageNo - 1].list[index + 3].parameters[0] = `Optional Settings = ${args["Override:struct"]}`;
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 4) + "\n", "utf8");
}
