<template>
    <div class="grid w-full grid-cols-12 items-center justify-between gap-1.5">
        <!-- Label Slider -->
        <label :for="`${paletteNumber}${cardNumber}${sliderNumber}`" class="col-span-1 text-black dark:text-white">{{
            props.attributo
        }}</label>

        <!-- Slider -->
        <input
            type="range"
            min="0"
            step="0.1"
            :max="props.max"
            v-model="state"
            @input="$emit('updateValue', state)"
            :id="`${paletteNumber}${cardNumber}${sliderNumber}`"
            class="col-span-8 h-1.5 w-full cursor-grab appearance-none rounded bg-neutral-200 active:cursor-grabbing dark:bg-slate-600" />

        <!-- Text Input Slider -->
        <input
            ref="textInput"
            :id="`${paletteNumber}${cardNumber}${sliderNumber}`"
            type="text"
            v-model.number="state"
            class="col-span-3 bg-main-area text-black outline-none dark:bg-slate-900 dark:text-white"
            @keypress.enter="removeFocus"
            minlength="1" />
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStorage } from "@vueuse/core";

const props = defineProps({
    paletteNumber: Number,
    cardNumber: Number,
    sliderNumber: Number,
    attributo: String,
    max: Number,
});
defineEmits(["updateValue"]);

const defaultState = ref((Math.random() * (100 - 50) + 50).toFixed(1));
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

<style scoped>
input[type="range"]::-webkit-slider-thumb {
    border: 1px solid #2497e3;
    height: 15px;
    width: 15px;
    border-radius: 25px;
    background: #1695a3;
    -webkit-appearance: none;
}
</style>
