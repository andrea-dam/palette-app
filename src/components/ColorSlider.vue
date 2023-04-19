<template>
    <div class="flex w-full items-center justify-between space-x-5">
        <input
            type="range"
            min="0"
            max="255"
            step="1"
            v-model="state"
            class="transparent h-1.5 w-full cursor-grab appearance-none rounded-lg border-transparent bg-neutral-200 active:cursor-grabbing" />
        <input type="text" v-model="state" size="1" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStorage } from "@vueuse/core";

const props = defineProps(["cardNumber", "sliderNumber"]);

const defaultState = ref(128);

const uniqueValue = props.cardNumber + props.sliderNumber;

const state = useStorage(uniqueValue, defaultState);
</script>
