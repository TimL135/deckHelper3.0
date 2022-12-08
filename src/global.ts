import { Accordion } from 'custom-mbd-components';
import { ref } from 'vue';
import * as type from './types';

export function newId() {
  return JSON.stringify(Math.random());
}

export function chunk<T>(array: T[], chunkSize: number): T[][] {
  if (!chunkSize) return [[]];
  let R = [];
  for (let i = 0; i < array.length; i += chunkSize) R.push(array.slice(i, i + chunkSize));
  return R;
}

type AccordionElement = [type.Name, any];

export function makeAccordionItems(activeArray: AccordionElement[], inactiveArray: AccordionElement[] = []) {
  const array = [];
  if (!activeArray) return array;
  if (activeArray.length) array.push({ title: 'active', hash: 'active', noAccordion: true });
  activeArray.forEach(e => array.push({ title: e[0], hash: e[0] }));
  if (inactiveArray.length) array.push({ title: 'inactive', hash: 'inactive', noAccordion: true });
  inactiveArray.forEach(e => array.push({ title: e[0], hash: e[0] }));
  return array;
}
export function getAccordionHash(element: AccordionElement): string {
  return element[0];
}

export const valueOptions = ref([
  { text: '-1', value: -1 },
  { text: '0', value: 0 },
  { text: 'maybe +1', value: 0.5 },
  { text: '1', value: 1 },
]);
export const amountOptions = ref([
  { text: '1', value: 1 },
  { text: '2', value: 2 },
  { text: '3', value: 3 },
]);
export const propertiesInput = ref([
  { text: 'handtrap', value: 'handtrap', active: false },
  { text: 'searcher', value: 'searcher', active: false },
  { text: 'searchable', value: 'searchable', active: false },
  { text: 'combo starter', value: 'comboStarter', active: false },
  { text: 'negate', value: 'negate', active: false },
  { text: 'once per turn', value: 'oncePerTurn', active: false },
  { text: 'combo piece', value: 'comboPiece', active: false },
  { text: 'interruption', value: 'interruption', active: false },
  { text: 'brick', value: 'brick', active: false },
  { text: 'protect', value: 'protect', active: false },
  { text: 'extender', value: 'extender', active: false },
  { text: 'destroy', value: 'destroy', active: false },
]);

export function resetPropertiesInput() {
  propertiesInput.value = [
    { text: 'handtrap', value: 'handtrap', active: false },
    { text: 'searcher', value: 'searcher', active: false },
    { text: 'searchable', value: 'searchable', active: false },
    { text: 'combo starter', value: 'comboStarter', active: false },
    { text: 'negate', value: 'negate', active: false },
    { text: 'once per turn', value: 'oncePerTurn', active: false },
    { text: 'combo piece', value: 'comboPiece', active: false },
    { text: 'interruption', value: 'interruption', active: false },
    { text: 'brick', value: 'brick', active: false },
    { text: 'protect', value: 'protect', active: false },
    { text: 'extender', value: 'extender', active: false },
    { text: 'destroy', value: 'destroy', active: false },
  ];
}
