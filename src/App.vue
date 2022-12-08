<template>
  <div class="container">
    <div>
      <!-- home -->
      <svg
        @click="selectedPage = 'decks'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-house"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
        />
        <path
          fill-rule="evenodd"
          d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
        />
      </svg>
      <template v-if="Object.keys(deck).length">{{ ' | ' }}</template>
      <!-- cardgroups -->
      <template v-if="Object.keys(deck).length">
        <svg
          @click="selectedPage = 'cardgroups'"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-collection"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"
          />
        </svg>
        |
      </template>
      <!-- combos -->
      <template v-if="Object.keys(deck).length">
        <svg
          v-if="deck"
          @click="selectedPage = 'combos'"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-receipt"
          viewBox="0 0 16 16"
        >
          <path
            d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"
          />
          <path
            d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </template>
    </div>
    <div class="mt-4">
      <Decks v-if="selectedPage == 'decks'" :user="user" :deck="deck"></Decks>
      <CardCombos
        v-if="selectedPage == 'cardgroups'"
        :deck="deck"
        :activeCardGroups="activeCardGroups"
        :inActiveCardGroups="inActiveCardGroups"
      ></CardCombos>
      <Combos v-if="selectedPage == 'combos'" :deck="deck" :activeCombos="activeCombos" :inActiveCombos="inActiveCombos"></Combos>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import Decks from './views/Decks.vue';
import CardCombos from './views/CardGroups.vue';
import Combos from './views/Combos.vue';
import * as type from './types';
import * as API from './API';
import { computed } from '@vue/reactivity';
const selectedPage = ref('decks');
const user = ref(API.getUser());
const deck = computed(() => user.value.decks[user.value.selectedDeck] || ({} as type.Deck));

const activeCardGroups = computed(() => Object.entries(deck.value.cardGroups).filter(cG => areAllCardsInDeck(cG[1])));
const inActiveCardGroups = computed(() => Object.entries(deck.value.cardGroups).filter(cG => !activeCardGroups.value.find(e => e[0] == cG[0])));

const activeCombos = computed(() =>
  Object.entries(deck.value.combos).filter(
    combo => areAllCardsInDeck(combo[1].cards) && combo[1].cardsGroups.every(cg => activeCardGroups.value.find(e => e[0] == cg))
  )
);
const inActiveCombos = computed(() => Object.entries(deck.value.combos).filter(combo => !activeCombos.value.find(e => e[0] == combo[0])));
function areAllCardsInDeck(array: type.Id[]) {
  return array.every(c => deck.value.mainCards[c]);
}
watch(
  () => user.value,
  (newValue, oldValue) => {
    API.setUser(user.value);
  },
  { deep: true }
);
</script>
<style scoped>
svg {
  width: 25px;
  height: 25px;
}
</style>
