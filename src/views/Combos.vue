<template>
  <Modal title="add combo" :affirm-action="modus == 'add' ? addCombo : editCombo" :affirm-text="`${modus} combo`" v-model="showModal">
    <TextInput placeholder="name" v-model="name"></TextInput>
    <MultiSelectInput
      v-model="searchCard"
      v-model:selected="selectedCards"
      :options="[...new Set(Object.keys(deck.mainCards).concat(selectedCards))]"
      :option-projection="e => db.cards[e]?.name"
      placeholder="cards"
    ></MultiSelectInput>
    <MultiSelectInput
      v-model="searchCardGroup"
      v-model:selected="selectedCardGroups"
      :options="[...new Set(Object.keys(deck.cardGroups))]"
      :option-projection="e => e"
      placeholder="cardgroups"
    ></MultiSelectInput>
    <template #button>
      <Button class="btn btn-primary w-100" @click="modus = 'add'">add combo</Button>
    </template>
  </Modal>
  <Accordion :items="accordionItems" v-if="getAccordionHash">
    <template #active><div class="p-2">active</div></template>
    <template #inactive><div class="p-2">inactive</div></template>
    <template v-for="combo of Object.entries(deck.combos)" #[getAccordionHash(combo)]>
      <div class="px-2">
        <Button class="btn btn-danger me-2" @click="deleteCombo(combo)">delete</Button>
        <Button class="btn btn-primary" @click="selectCombo(combo)">edit</Button>
        <div v-for="card of combo[1].cards">
          {{ db.cards[card]?.name }}
        </div>
        <Modal v-for="cardgroup of Object.entries(deck.cardGroups)" :title="`cards in ${cardgroup[0]}`">
          <div v-for="card of cardgroup[1]">
            {{ db.cards[card]?.name }}
          </div>
          <template #button>{{ cardgroup[0] }}</template>
        </Modal>
      </div>
    </template>
  </Accordion>
</template>
<script setup lang="ts">
import * as type from '../types';
import { db } from '../API';
import { computed, ref, toRefs } from 'vue';
import { Accordion, Modal, Button, TextInput, MultiSelectInput } from 'custom-mbd-components';
import { makeAccordionItems, getAccordionHash } from '../global';
const props = withDefaults(defineProps<{ deck: type.Deck; activeCombos: type.ComboArray[]; inActiveCombos: type.ComboArray[] }>(), {});
const { deck, activeCombos, inActiveCombos } = toRefs(props);

const accordionItems = computed(() => makeAccordionItems(activeCombos.value, inActiveCombos.value));

const showModal = ref(false);
const modus = ref('add');

const selectedCombo = ref('');

const name = ref('');
const searchCard = ref('');
const searchCardGroup = ref('');
const selectedCards = ref([]);
const selectedCardGroups = ref([]);
function reset() {
  name.value = '';
  searchCard.value = '';
  searchCardGroup.value = '';
  selectedCards.value = [];
  selectedCardGroups.value = [];
}

function addCombo() {
  deck.value.combos[name.value] = {
    cards: selectedCards.value,
    cardsGroups: selectedCardGroups.value,
  };
  reset();
}
function selectCombo(combo: [string, type.Combo]) {
  modus.value = 'edit';
  name.value = combo[0];
  selectedCombo.value = combo[0];
  selectedCards.value = combo[1].cards;
  selectedCardGroups.value = combo[1].cardsGroups;
  showModal.value = true;
}
function editCombo() {
  delete deck.value.combos[selectedCombo.value];
  addCombo();
}
function deleteCombo(combo: type.ComboArray) {
  delete deck.value.combos[combo[0]];
}
</script>
