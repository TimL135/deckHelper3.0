<template>
  <div class="d-flex">
    <div style="width: calc(100% - 40px)">
      <SelectInput v-model="selectText" :options="Object.entries(user.decks)" :optionProjection="e => e[0]"
        :placeholder="user.selectedDeck || 'no deck'" @selectItem="e => { user.selectedDeck = e[0]; selectText = '' }">
      </SelectInput>
    </div>
    <Modal title="decks">
      <TextInput placeholder="new deck" v-model="deckNameInput" :label-border="true" :btn-action="addNewDeck">
        <template #button>&#10004;</template>
      </TextInput>
      <div class="d-flex justify-content-center mt-2">
        <div class="w-100">
          <div v-for="deck of Object.entries(user.decks)" :key="deck[0]" class="d-flex justify-content-between">
            <div>
              {{ deck[0] }}
            </div>
            <svg @click="deleteDeck(deck[0])" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
              class="bi bi-trash" viewBox="0 0 16 16">
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>
          </div>
        </div>
      </div>
      <template #button>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" class="bi bi-gear mt-3 ms-2" viewBox="0 0 16 16">
          <path
            d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
          <path
            d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
        </svg></template>
    </Modal>
  </div>
  <div v-if="Object.keys(user.decks).length > 0">
    <RadioGroup :options="deckOptions" v-model="selectedDeckKind" class="my-2"></RadioGroup>
    <Deck v-model="deck.mainCards" v-if="selectedDeckKind == 'mainDeck'"></Deck>
    <Deck v-model="deck.extraCards" :properties="false" v-if="selectedDeckKind == 'extraDeck'"></Deck>
    <Deck v-model="deck.sideCards" v-if="selectedDeckKind == 'sideDeck'"></Deck>
    <Deck v-model="deck.alternativCards" :isAlternatives="true" v-if="selectedDeckKind == 'alternatives'"></Deck>
  </div>
</template>
<script setup lang="ts">
import Deck from "../components/Deck.vue";
import * as type from "../types";
import { computed, ref, toRefs } from "vue";
import { newId } from "../global";
import { RadioGroup, SelectInput, Modal, TextInput } from "custom-mbd-components";
const props = withDefaults(
  defineProps<{ user: type.User; deck: type.Deck }>(),
  {
  }
);
const { user, deck } = toRefs(props);

const selectText = ref("")
const selectedDeckKind = ref("mainDeck");
const deckOptions = ref([
  { text: "Main Deck", value: "mainDeck" },
  { text: "Extra Deck", value: "extraDeck" },
  { text: "Side Deck", value: "sideDeck" },
  { text: "Possibles", value: "alternatives" },
]);

const deckNameInput = ref("")

function addNewDeck() {
  if (!user.value.decks[deckNameInput.value] || deckNameInput.value) {
    user.value.decks[deckNameInput.value] = {
      mainCards: {},
      extraCards: {},
      sideCards: {},
      alternativCards: {},
      combos: {},
      cardGroups: {},
    }
    user.value.selectedDeck = deckNameInput.value
  }
  deckNameInput.value = ""
}
function deleteDeck(deckName: string) {
  delete user.value.decks[deckName]
  if (user.value.selectedDeck == deckName)
    user.value.selectedDeck = Object.keys(user.value.decks)[0] || ""
}
</script>
<style scoped>

</style>
