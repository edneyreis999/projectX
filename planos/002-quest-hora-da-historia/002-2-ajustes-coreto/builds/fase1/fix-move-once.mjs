import fs from 'node:fs';

const target = 'frontend/data/Map022.json';
const destinations = new Map([[1,[4,15]],[2,[7,16]],[3,[8,17]],[5,[5,16]],[6,[7,18]],[7,[10,15]],[8,[5,18]],[9,[11,16]],[10,[9,18]],[11,[9,16]],[12,[11,18]],[13,[4,17]],[14,[8,15]],[15,[10,17]],[16,[6,15]],[19,[12,17]],[32,[6,17]]]);
const map = JSON.parse(fs.readFileSync(target, 'utf8'));
const fail = message => { throw new Error(message); };

for (const [id, [x, y]] of destinations) {
  const event = map.events[id];
  const page = event?.pages?.[1];
  if (!event || event.name !== 'Crianca' || !page) fail(`unexpected child event ${id}`);
  if (page.trigger !== 4 || !page.conditions.variableValid || page.conditions.variableId !== 106 || page.conditions.variableValue !== 10) fail(`unexpected child page ${id}`);
  const route = page.list?.[0]?.parameters?.[1];
  if (page.list?.length !== 4 || page.list?.[0]?.code !== 205 || route?.wait !== false || route.list?.[0]?.parameters?.[0] !== `Move To: ${x}, ${y}`) fail(`unexpected existing route ${id}`);
}

for (const id of destinations.keys()) {
  const page = map.events[id].pages[1];
  page.list.splice(3, 0, { code: 123, indent: 0, parameters: ['A', 0] });
  const passive = JSON.parse(JSON.stringify(page));
  passive.conditions.selfSwitchValid = true;
  passive.trigger = 0;
  passive.list = [{ code: 0, indent: 0, parameters: [] }];
  map.events[id].pages.push(passive);
}

fs.writeFileSync(target, JSON.stringify(map, null, 4) + '\n', 'utf8');
console.log(`Added self-switch completion pages to ${destinations.size} child routes.`);
