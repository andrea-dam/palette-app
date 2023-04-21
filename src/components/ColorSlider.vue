<template>
    <div class="grid w-full grid-cols-12 items-center justify-between gap-1.5">
        <label :for="props.sliderNumber" class="col-span-1 text-black dark:text-white">{{ props.attributo }}</label>
        <input
            type="range"
            min="0"
            step="1"
            :max="props.max"
            v-model="state"
            @input="$emit('updateValue', state)"
            :id="props.sliderNumber"
            class="transparent col-span-9 h-1.5 w-full cursor-grab appearance-none rounded-lg border-transparent bg-neutral-200 text-red-600 active:cursor-grabbing dark:bg-slate-600" />
        <input
            ref="textInput"
            type="text"
            v-model.number="state"
            class="col-span-2 bg-slate-50 text-black outline-none dark:bg-slate-900 dark:text-white"
            @keypress.enter="removeFocus"
            minlength="1" />
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStorage } from "@vueuse/core";

const props = defineProps(["paletteNumber", "cardNumber", "sliderNumber", "attributo", "max"]);
defineEmits(["updateValue"]);

const defaultState = ref(50);
const textInput = ref(null);

const uniqueValue = `palette${props.paletteNumber}-card${props.cardNumber}-slider${props.sliderNumber}`;

const state = useStorage(uniqueValue, defaultState);

watch(state, newValue => {
    if (isNaN(newValue)) {
        state.value = 0;
    }
});

const removeFocus = () => {
    textInput.value.blur();
};
</script>
