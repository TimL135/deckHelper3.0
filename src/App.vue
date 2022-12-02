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
      |
      <!-- cardgroups -->
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
    </div>
    <Decks :user="user" :deck="deck" v-if="selectedPage == 'decks'"></Decks>
    <CardCombos :deck="deck" v-if="selectedPage == 'cardgroups'"></CardCombos>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import Decks from "./views/Decks.vue";
import CardCombos from "./views/CardGroups.vue";
import * as type from "./types";
import * as API from "./API";
import { computed } from "@vue/reactivity";
const selectedPage = ref("decks");
const user = ref(API.getUser());
const deck = computed(
  () => user.value.decks[user.value.selectedDeck] || ({} as type.Deck)
);
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
