import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../../../..');
const read = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const command = (list, predicate, message) => {
  const found = list.find(predicate);
  assert(found, message);
  return found;
};

const map022 = read('frontend/data/Map022.json');
const map046 = read('frontend/data/Map046.json');
const elf = map022.events[30].pages[0].list;
const controller = map022.events[31];
const controllerPage2 = controller.pages[1];

const targetText = command(elf, (entry) => entry.code === 401 && entry.parameters[0] === 'Rápido! A história já vai começar... vá para o seu lugar!', 'Map022: mensagem alvo da elfa ausente');
const targetIndex = elf.indexOf(targetText);
const cleanup = elf[targetIndex + 1];
assert(cleanup?.code === 355, 'Map022: o cleanup precisa ser um único Script imediatamente após a mensagem alvo');
const script = cleanup.parameters[0];
assert(script.includes('$gameSelfSwitches.setValue([mapId, 31, "A"], true)'), 'Map022: Script não ativa self switch A do evento 31');
assert(script.includes('$gameMap.eraseEvent(31)'), 'Map022: Script não apaga o controlador evento 31');
assert(script.includes('spriteset._balloonSprites.slice()') && script.includes('targetObject === target') && script.includes('spriteset.removeBalloon(sprite)'), 'Map022: Script não remove seletivamente o balão ativo do evento 30');
assert(controllerPage2.conditions.selfSwitchValid === true && controllerPage2.conditions.selfSwitchCh === 'A', 'Map022: página 2 do controlador deve usar self switch A');
assert(controllerPage2.conditions.variableValid === false, 'Map022: página 2 não pode depender da variável 26');
assert(controller.pages[0].list.filter((entry) => entry.code === 213 && JSON.stringify(entry.parameters) === JSON.stringify([30, 1, true])).length === 1, 'Map022: controlador deve conservar um único balão [30,1,true]');
assert(!JSON.stringify({ elf, controller }).match(/(?:\\b26\\b|\\b106\\b)/), 'Map022: mudança introduziu variável de progresso proibida');

const vn = map046.events[1].pages[0].list;
const commands = vn.map((entry, index) => ({ ...entry, index }));
const pluginArgs = (entry) => entry.parameters[3];
const enter = (pictureId) => commands.filter((entry) => entry.code === 357 && entry.parameters?.[1] === 'Basic_EnterBust' && pluginArgs(entry)['PictureID:eval'] === String(pictureId));
const rheedEnter = enter(1);
assert(rheedEnter.length >= 2, 'Map046: entradas esperadas de Rheed não encontradas');
for (const entry of rheedEnter) {
  const args = pluginArgs(entry);
  assert(args['Position:num'] === '9' && args['HorzMirror:str'] === 'Auto', 'Map046: Rheed deve entrar em Position 9 com HorzMirror Auto');
}
const hum = command(commands, ({ code, parameters }) => code === 401 && parameters[0].startsWith('Hum... esse rosto não me é estranho'), 'Map046: fala Hum ausente');
const exitsBeforeHum = commands.filter(({ index, code, parameters }) => index < hum.index && code === 357 && parameters?.[1] === 'Basic_ExitBusts' && parameters[3]['PictureID:arrayeval'].includes('"1"'));
assert(exitsBeforeHum.length === 0, 'Map046: Rheed não pode sair antes de Hum');
const choices = command(commands, ({ code, parameters }) => code === 102 && JSON.stringify(parameters) === JSON.stringify([['qualSeuNome1', 'qualSeuNome2'], 1, 0, 2, 0]), 'Map046: Show Choices mudou');
const child = enter(2).find(({ index }) => index < choices.index);
assert(child, 'Map046: entrada da criança deve preceder as escolhas');
const childArgs = pluginArgs(child);
assert(childArgs['Position:num'] === '1' && childArgs['HorzMirror:str'] === 'Auto', 'Map046: criança deve usar Position 1 e HorzMirror Auto');
const childSwitch = commands.find(({ index, code, parameters }) => index > child.index && index < choices.index && code === 121 && JSON.stringify(parameters) === JSON.stringify([44, 44, 0]));
assert(childSwitch, 'Map046: switch 44 deve ser acionado depois da entrada da criança e antes das escolhas');
const childLine = commands.find(({ index, code, parameters }) => index > child.index && index < choices.index && code === 401 && parameters[0].trim().length > 0);
assert(childLine, 'Map046: fala curta da criança antes das escolhas ausente');
const branches = commands.filter(({ code }) => code === 402);
assert(branches.length === 2 && branches[0].indent === 0 && branches[1].indent === 0 && JSON.stringify(branches.map(({ parameters }) => parameters)) === JSON.stringify([[0, 'qualSeuNome1'], [1, 'qualSeuNome2']]) && vn.filter((entry) => entry.code === 404).length === 1 && vn.filter((entry) => entry.code === 403).length === 0, 'Map046: estrutura, ordem ou cancelamento de choices foi alterado');
assert(commands.some(({ index, code, indent, parameters }) => index > branches[0].index && index < branches[1].index && code === 320 && indent === 1 && JSON.stringify(parameters) === JSON.stringify([1, 'Dulgarin'])), 'Map046: efeito Dulgarin ausente do primeiro ramo');
assert(commands.some(({ index, code, indent, parameters }) => index > branches[1].index && code === 303 && indent === 1 && JSON.stringify(parameters) === JSON.stringify([1, 8])), 'Map046: efeito Name Input ausente do segundo ramo');
const choiceEnd = command(commands, ({ code, indent }) => code === 404 && indent === 0, 'Map046: Choice End ausente');
assert(!commands.some(({ index, code, parameters }) => index > branches[1].index && index < choiceEnd.index && code === 357 && parameters?.[1] === 'Basic_ExitBusts' && parameters[3]['PictureID:arrayeval'].includes('"1"')), 'Map046: Rheed não pode sair no segundo ramo antes do trecho compartilhado');
assert(!commands.some(({ index, code, parameters }) => index > choiceEnd.index && code === 357 && parameters?.[1] === 'Basic_EnterBust' && pluginArgs({ parameters })['PictureID:eval'] === '1'), 'Map046: Rheed não pode reentrar depois do Choice End');
assert(commands.some(({ code, parameters }) => code === 357 && parameters?.[1] === 'QuestTransition' && parameters[3]?.questKey === 'noite-da-historia' && parameters[3]?.transitionId === 'COMPLETE_VN'), 'Map046: QuestTransition final mudou');

for (const relative of ['frontend/data/Map022.json', 'frontend/data/Map046.json']) JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
console.log(JSON.stringify({ status: 'passed', checks: 17, maps: ['Map022', 'Map046'], playtest: 'pending' }, null, 2));
