<template>
  <div>
    <div v-for="array of chunk(propertiesInput, 4)" class="mt-3">
      <CheckboxGroup class="p-0" :options="array"></CheckboxGroup>
    </div>
    <RadioGroup :options="valueOptions" v-model="valueInput" class="my-3"></RadioGroup>
  </div>
</template>
<script setup lang="ts">
import { chunk } from "../global";
import { ref, toRefs, watch } from "vue";
import * as type from "../types";
import {
  CheckboxGroup,
  RadioGroup,
} from "custom-mbd-components";

const props = withDefaults(
  defineProps<{ propertiesInput: any[]; valueOptions: any[]; modelValue: any }>(),
  {
  }
);
const { modelValue, } = toRefs(props);
const valueInput = ref(modelValue.value)
watch(valueInput, (newValue) => {
  updateValue(newValue)
})
const emit = defineEmits(['update:modelValue']);

function updateValue(i: any) {
  emit('update:modelValue', i);
}

</script>