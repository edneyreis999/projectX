import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../../../../..');
const mapPath = path.join(root, 'frontend/data/Map022.json');
const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const targets = new Map([
  [1,[4,15]],[2,[7,16]],[3,[8,17]],[5,[5,16]],[6,[7,18]],[7,[10,15]],
  [8,[5,18]],[9,[11,16]],[10,[9,18]],[11,[9,16]],[12,[11,18]],[13,[4,17]],
  [14,[8,15]],[15,[10,17]],[16,[6,15]],[19,[12,17]],[32,[6,17]],
]);
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
assert(map.width === 17 && map.height === 27, 'Map022 dimensions changed');
map.events.forEach((event, index) => { if (event && event.id !== index) failures.push(`event index/id mismatch: ${index}/${event.id}`); });
const childRoute = (event, destination) => {
  assert(event.note.includes('<Save Event Location>'), `event ${event.id}: missing Save Event Location`);
  const page = event.pages.find(p => p.conditions.variableValid && p.conditions.variableId === 106 && p.conditions.variableValue === 10 && p.trigger === 4);
  assert(Boolean(page), `event ${event.id}: missing V106>=10 parallel page`);
  if (!page) return;
  assert(page.moveType === 0, `event ${event.id}: route page must have moveType 0`);
  assert(page.priorityType === 0, `event ${event.id}: route page must be Below Characters`);
  const terminal = event.pages.find(p => p.conditions.variableValid && p.conditions.variableId === 106 && p.conditions.variableValue === 10 && p.conditions.selfSwitchValid);
  assert(Boolean(terminal) && terminal.priorityType === 1, `event ${event.id}: terminal page must preserve normal priority`);
  const list = page.list;
  const routeAt = list.findIndex(c => c.code === 205 && c.parameters?.[0] === 0);
  assert(routeAt >= 0, `event ${event.id}: missing This Event route`);
  if (routeAt < 0) return;
  const route = list[routeAt].parameters[1];
  assert(route.repeat === false && route.skippable === false && route.wait === true, `event ${event.id}: route flags invalid`);
  const codes = route.list.map(c => c.code);
  assert(JSON.stringify(codes) === JSON.stringify([45,19,0]), `event ${event.id}: route command sequence invalid`);
  assert(route.list[0].parameters[0] === `Move To: ${destination[0]}, ${destination[1]}`, `event ${event.id}: destination invalid`);
  assert(list.slice(routeAt + 1).some(c => c.code === 123 && c.parameters?.[0] === 'A' && c.parameters?.[1] === 0), `event ${event.id}: missing Self Switch A ON after route`);
};
for (const [id, destination] of targets) {
  const event = map.events[id];
  assert(Boolean(event), `missing child event ${id}`);
  if (event) childRoute(event, destination);
}
for (const id of [20,21]) {
  const event = map.events[id];
  for (const page of event.pages) {
    if (page.conditions.variableValid && page.conditions.variableId === 106 && page.conditions.variableValue === 10) {
      for (const command of page.list) {
        if (command.code === 205 && targets.has(command.parameters?.[0])) failures.push(`event ${id}: still controls child ${command.parameters[0]}`);
      }
    }
  }
}
assert(map.events[30].pages[0].list.some(c => c.code === 357 && JSON.stringify(c.parameters).includes('QuestTransition')), 'Event30 QuestTransition was not preserved');
assert(map.events[18] && map.events[17], 'Event18 or Event17 missing');
if (failures.length) { console.error(JSON.stringify({status:'failed', failures}, null, 2)); process.exit(1); }
console.log(JSON.stringify({status:'passed', children:[...targets.keys()], map: 'Map022'}, null, 2));
