<template>
    <div class="grid w-full grid-cols-12 items-center justify-between gap-1.5">
        <label :for="props.sliderNumber" class="col-span-1">{{ props.attributo }}</label>
        <input
            type="range"
            min="0"
            step="1"
            :max="props.max"
            v-model="state"
            @input="$emit('updateValue', state)"
            :id="props.sliderNumber"
            class="transparent col-span-9 h-1.5 w-full cursor-grab appearance-none rounded-lg border-transparent bg-neutral-200 active:cursor-grabbing" />
        <input type="text" v-model="state" class="col-span-2" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStorage } from "@vueuse/core";

const props = defineProps(["cardNumber", "sliderNumber", "attributo", "max"]);
defineEmits(["updateValue"]);

const defaultState = ref(50);

const uniqueValue = `card${props.cardNumber}` + `slider${props.sliderNumber}`;

const state = useStorage(uniqueValue, defaultState);
</script>
