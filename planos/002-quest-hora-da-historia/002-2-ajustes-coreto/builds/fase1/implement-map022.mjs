import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../../../../..');
const file = path.join(root, 'frontend/data/Map022.json');
const targets = new Map([
  [1,[4,15]],[2,[7,16]],[3,[8,17]],[5,[5,16]],[6,[7,18]],[7,[10,15]],
  [8,[5,18]],[9,[11,16]],[10,[9,18]],[11,[9,16]],[12,[11,18]],[13,[4,17]],
  [14,[8,15]],[15,[10,17]],[16,[6,15]],[19,[12,17]],[32,[6,17]],
]);
const source = fs.readFileSync(file, 'utf8');
const map = JSON.parse(source);
for (const [id, [x, y]] of targets) {
  const event = map.events[id];
  if (!event || event.id !== id || event.pages.length < 3) throw new Error(`Unexpected child event ${id}`);
  if (!event.note.includes('<Save Event Location>')) event.note = `${event.note}${event.note ? '\n' : ''}<Save Event Location>`;
  const movePage = event.pages[1];
  if (!(movePage.conditions.variableValid && movePage.conditions.variableId === 106 && movePage.conditions.variableValue === 10)) throw new Error(`Unexpected movement page ${id}`);
  movePage.trigger = 4;
  movePage.moveType = 0;
  movePage.priorityType = 0;
  movePage.list = [
    {code:205, indent:0, parameters:[0,{list:[{code:45,parameters:[`Move To: ${x}, ${y}`]},{code:19,parameters:[]},{code:0,parameters:[]}],repeat:false,skippable:false,wait:true}]},
    {code:123, indent:0, parameters:['A',0]},
    {code:0, indent:0, parameters:[]},
  ];
}
const dispatcher = map.events[20].pages[2];
if (!(dispatcher.conditions.variableValid && dispatcher.conditions.variableId === 106)) throw new Error('Unexpected Event20 dispatcher page');
dispatcher.list = [{code:0, indent:0, parameters:[]}];
const stopper = map.events[21].pages[1];
if (!(stopper.conditions.variableValid && stopper.conditions.variableId === 106 && stopper.conditions.variableValue === 10)) throw new Error('Unexpected Event21 stopper page');
stopper.conditions.selfSwitchValid = false;
fs.writeFileSync(file, `${JSON.stringify(map, null, 4)}\n`);
