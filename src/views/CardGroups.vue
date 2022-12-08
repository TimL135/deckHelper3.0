<template>
  <Modal
    :title="`${modus} cardgroup`"
    :affirm-action="modus == 'add' ? addCardgroup : editCardGroup"
    :affirm-text="`${modus} cardgroup`"
    v-model="showModal"
  >
    <TextInput placeholder="name" v-model="name"></TextInput>
    <MultiSelectInput
      v-model="searchMultiInput"
      v-model:selected="selectedCards"
      :options="[...new Set(Object.keys(deck.mainCards).concat(selectedCards))]"
      :option-projection="e => db.cards[e]?.name"
      placeholder="cards"
    ></MultiSelectInput>
    <template #button>
      <Button class="btn btn-primary w-100" @click="modus = 'add'">add cardgroup</Button>
    </template>
  </Modal>
  <div class="mt-2">
    <Accordion :items="accordionItems" v-if="getAccordionHash">
      <template #active><div class="p-2">active</div></template>
      <template #inactive><div class="p-2">inactive</div></template>
      <template v-for="cardgroup of Object.entries(deck.cardGroups)" #[getAccordionHash(cardgroup)]>
        <div class="px-2">
          <Button class="btn btn-danger me-2" @click="deleteCardGroup(cardgroup)">delete</Button>
          <Button class="btn btn-primary" @click="selectCardGroup(cardgroup)">edit</Button>
          <div v-for="card of cardgroup[1]">
            {{ db.cards[card]?.name }}
          </div>
        </div>
      </template>
    </Accordion>
  </div>
</template>
<script setup lang="ts">
import * as type from '../types';
import { db } from '../API';
import { computed, ref, toRefs, watch } from 'vue';
import { Accordion, Modal, Button, TextInput, MultiSelectInput, CheckboxInput } from 'custom-mbd-components';
import { makeAccordionItems, getAccordionHash } from '../global';

const props = withDefaults(
  defineProps<{ deck: type.Deck; activeCardGroups: type.CardGroupArray[]; inActiveCardGroups: type.CardGroupArray[] }>(),
  {}
);
const { deck, activeCardGroups, inActiveCardGroups } = toRefs(props);

const accordionItems = computed(() => makeAccordionItems(activeCardGroups.value, inActiveCardGroups.value));

const showModal = ref(false);

const modus = ref('add');
const selectedCardGroup = ref('');

const name = ref('');
const searchMultiInput = ref('');
const selectedCards = ref([]);
function reset() {
  name.value = '';
  searchMultiInput.value = '';
  selectedCards.value = [];
}

function addCardgroup() {
  deck.value.cardGroups[name.value] = selectedCards.value;
  reset();
}
function editCardGroup() {
  delete deck.value.cardGroups[selectedCardGroup.value];
  addCardgroup();
}
function selectCardGroup(cardGroup: type.CardGroupArray) {
  modus.value = 'edit';
  name.value = cardGroup[0];
  selectedCardGroup.value = cardGroup[0];
  selectedCards.value = cardGroup[1];
  showModal.value = true;
}
function deleteCardGroup(cardGroup: type.CardGroupArray) {
  delete deck.value.cardGroups[cardGroup[0]];
}
</script>
