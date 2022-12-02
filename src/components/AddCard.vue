<template>
  <Modal
    title="add new card"
    affirmText="add"
    affirmClass="btn btn-primary"
    :affirmAction="addCard"
    :modalSize="'modal-lg'"
  >
    <div class="container">
      <SelectInput
        placeholder="name"
        v-model="nameInput"
        :options="
          properties
            ? isAlternatives
              ? Object.entries(mainCardDB).concat(Object.entries(extraCardDB))
              : Object.entries(mainCardDB)
            : Object.entries(extraCardDB)
        "
        :optionProjection="(e) => e[1]?.name"
        @selectItem="(e) => (idInput = e[0])"
      ></SelectInput>
      <RadioGroup
        v-model="amountInput"
        :options="amountOptions"
        class="mt-3"
      ></RadioGroup>
      <Properties
        v-if="properties"
        :propertiesInput="propertiesInput"
        :valueOptions="valueOptions"
        v-model="valueInput"
      ></Properties>
    </div>
    <template #button
      ><Button @click="resetInputs" class="btn btn-primary w-100"
        >add card</Button
      ></template
    >
  </Modal>
  <!-- <img v-if="idInput"
    :src="!db.cards[idInput].img ? `https://corsproxy.io/?https://images.ygoprodeck.com/images/cards_small/${idInput}.jpg` : ''"
    class='d-none' crossorigin='anonymous' id="picture" alt=""> -->
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import * as type from "../types";
import {
  Modal,
  SelectInput,
  NumberInput,
  CheckboxGroup,
  RadioGroup,
  Button,
} from "custom-mbd-components";
import Properties from "./Properties.vue";
import {
  newId,
  valueOptions,
  amountOptions,
  propertiesInput,
  resetPropertiesInput,
} from "../global";
import { db, setDB, mainCardDB, extraCardDB } from "../API";
import axios from "axios";
import { async } from "q";

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

const nameInput = ref("");
const idInput = ref("");
const amountInput = ref("");
const valueInput = ref("");

const emit = defineEmits(["update:modelValue"]);
function addCard() {
  if (
    !idInput.value ||
    db.cards[idInput.value].name != nameInput.value ||
    !amountInput.value
  )
    return;
  let newValue = modelValue.value;
  newValue[idInput.value] = {
    amount: amountInput.value,
    value: valueInput.value,
  };
  // if (!db.cards[idInput.value].img) {
  //   db.cards[idInput.value].img = getBase64Image()
  //   setDB(db)
  // }
  if (properties) {
    let p = {} as type.Properties;
    for (let e of propertiesInput.value) p[e.value] = e.active;
    newValue[idInput.value].properties = p;
  }
  updateValue(newValue);
  resetInputs();
}
function updateValue(deckType: type.DeckType) {
  emit("update:modelValue", deckType);
}
function resetInputs() {
  nameInput.value = "";
  idInput.value = "";
  amountInput.value = "";
  valueInput.value = "";
  resetPropertiesInput();
}
function getBase64Image() {
  let canvas = document.createElement("canvas");
  let img = document.getElementById("picture") as HTMLImageElement;
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  let dataURL = canvas.toDataURL();
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
</script>
<style scoped></style>
