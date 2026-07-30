import fs from 'node:fs';

const map = JSON.parse(fs.readFileSync('frontend/data/Map022.json', 'utf8'));
const expected = new Map([[1,[4,15]],[2,[7,16]],[3,[8,17]],[5,[5,16]],[6,[7,18]],[7,[10,15]],[8,[5,18]],[9,[11,16]],[10,[9,18]],[11,[9,16]],[12,[11,18]],[13,[4,17]],[14,[8,15]],[15,[10,17]],[16,[6,15]],[19,[12,17]],[32,[6,17]]]);
const fail = message => { throw new Error(message); };
for (const [id, [x, y]] of expected) {
  const event = map.events[id];
  if (!event || event.name !== 'Crianca') fail(`event ${id}: expected Crianca`);
  const page = event.pages[1];
  const c = page.conditions;
  if (page.trigger !== 4 || page.priorityType !== 1 || page.through !== false) fail(`event ${id}: dispatch page contract changed`);
  if (!c.variableValid || c.variableId !== 106 || c.variableValue !== 10) fail(`event ${id}: wrong variable gate`);
  if (page.list.length !== 5) fail(`event ${id}: unexpected dispatch command count`);
  const [move, mirrorMove, mirrorTurn, complete, end] = page.list;
  if (!move || move.code !== 205 || move.indent !== 0 || move.parameters[0] !== 0) fail(`event ${id}: missing forced route`);
  const route = move.parameters[1];
  if (route.repeat || route.skippable || route.wait || route.list.length !== 3) fail(`event ${id}: route flags or length invalid`);
  const [script, turn, routeEnd] = route.list;
  const scriptText = `Move To: ${x}, ${y}`;
  if (script?.code !== 45 || script.parameters?.length !== 1 || script.parameters[0] !== scriptText || turn?.code !== 19 || routeEnd?.code !== 0) fail(`event ${id}: route contents invalid`);
  if (mirrorMove?.code !== 505 || mirrorMove.parameters?.length !== 1 || mirrorMove.parameters?.[0]?.code !== 45 || mirrorMove.parameters?.[0]?.parameters?.length !== 1 || mirrorMove.parameters?.[0]?.parameters?.[0] !== scriptText) fail(`event ${id}: Move To mirror invalid`);
  if (mirrorTurn?.code !== 505 || mirrorTurn.parameters?.length !== 1 || mirrorTurn.parameters?.[0]?.code !== 19) fail(`event ${id}: Turn Up mirror invalid`);
  if (complete?.code !== 123 || complete.indent !== 0 || complete.parameters?.[0] !== 'A' || complete.parameters?.[1] !== 0 || end?.code !== 0) fail(`event ${id}: self-switch completion missing`);
  const passive = event.pages[2];
  if (!passive || passive.trigger !== 0 || !passive.conditions.selfSwitchValid || passive.conditions.selfSwitchCh !== 'A' || !passive.conditions.variableValid || passive.conditions.variableId !== 106 || passive.conditions.variableValue !== 10 || passive.list?.length !== 1 || passive.list[0]?.code !== 0) fail(`event ${id}: passive completion page invalid`);
}
console.log(JSON.stringify({status:'passed', events:[...expected.keys()], map:'frontend/data/Map022.json', completion:'self-switch A'}, null, 2));
