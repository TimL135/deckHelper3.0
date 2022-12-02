<template>
  <div>
    <div
      v-for="array of chunk(proties, 4)"
      class="mb-2"
      v-if="properties && !isAlternatives"
    >
      <CheckboxGroup class="p-0" :options="array"></CheckboxGroup>
    </div>
    <AddCard
      v-model="modelValue"
      :properties="properties"
      :isAlternatives="isAlternatives"
    ></AddCard>
    <div class="d-flex justify-content-center">
      <div>
        <div
          v-for="card of Object.entries(modelValue).filter((e) =>
            Object.entries(proties)
              .filter((p) => p[1].active)
              .every((p) => e[1].properties?.[p[1].value])
          )"
          :key="card[0]"
          class="d-block"
        >
          <Modal :title="db.cards[card[0]].name">
            <div class="d-flex">
              <!-- <img
                :src="`data:image/png;base64,${db.cards[card[0]].img}`"
                alt=""
              /> -->
              <div class="ms-2">
                <div>type: {{ db.cards[card[0]].type }}</div>
                <div>race: {{ db.cards[card[0]].race }}</div>
                <div v-if="db.cards[card[0]].type.includes('Monster')">
                  attribute: {{ db.cards[card[0]].attribute }}
                </div>
                <div v-if="db.cards[card[0]].type.includes('Monster')">
                  level: {{ db.cards[card[0]].lvl }}
                </div>
                <div v-if="db.cards[card[0]].type.includes('Monster')">
                  atk: {{ db.cards[card[0]].atk }}
                </div>
                <div v-if="db.cards[card[0]].type.includes('Monster')">
                  def: {{ db.cards[card[0]].def }}
                </div>
                <div>
                  {{
                    `${
                      db.cards[card[0]].type.includes("Normal")
                        ? "text:"
                        : "effect:"
                    } ${db.cards[card[0]].desc}`
                  }}
                </div>
              </div>
            </div>
            <RadioGroup
              v-model="card[1].amount"
              :options="amountOptions"
              class="mt-3"
            ></RadioGroup>
            <Properties
              v-if="propertiesInput.length > 0"
              :propertiesInput="propertiesInput"
              :valueOptions="valueOptions"
              v-model="card[1].value"
            ></Properties>
            <Button @click="deleteCard(card[0])">delete</Button>
            <template #button>
              <div
                style="width: 100%"
                class="m-2"
                @click="selectedCard = card[0]"
              >
                {{ `${db.cards[card[0]].name}(${card[1].amount})` }}
              </div>
            </template>
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AddCard from "./AddCard.vue";
import * as type from "../types";
import { computed, ref, toRefs, watch } from "vue";
import { db, mainCardDB, extraCardDB } from "../API";
import {
  Modal,
  Button,
  RadioGroup,
  CheckboxGroup,
} from "custom-mbd-components";
import Properties from "./Properties.vue";
import {
  valueOptions,
  amountOptions,
  propertiesInput as proties,
  chunk,
  resetPropertiesInput,
} from "../global";
const props = withDefaults(
  defineProps<{
    modelValue: type.DeckType;
    properties?: boolean;
    isAlternatives?: boolean;
  }>(),
  {
    properties: true,
    isAlternatives: false,
  }
);
const { modelValue, properties } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

const propertiesInput = ref([]);
const selectedCard = ref("");

watch(selectedCard, (newValue) => {
  let array = [];
  let properties = modelValue.value[selectedCard.value]?.properties;
  if (!properties) return [];
  for (let property of Object.entries(properties)) {
    array.push({ text: property[0], value: property[0], active: property[1] });
  }
  propertiesInput.value = array;
});
watch(
  () => propertiesInput.value,
  (newValue, oldValue) => {
    propertiesInput.value.forEach((e) => {
      modelValue.value[selectedCard.value].properties[e.value] = e.active;
    });
  },
  { deep: true }
);
resetPropertiesInput();

function deleteCard(id: string) {
  delete modelValue.value[id];
}
</script>
<style scoped></style>
