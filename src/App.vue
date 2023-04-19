<template>
    <div class="grid h-screen grid-rows-10">
        <header class="row-span-1 flex items-center justify-between border-b-2 px-24">
            <h1 class="text-2xl">Palette App</h1>
            <h2>by Andrea Damiani</h2>
        </header>
        <div class="row-span-8 grid grid-cols-12">
            <main class="container col-span-10 flex items-center justify-around p-14">
                <ColorCard />
            </main>
            <aside class="col-span-2 border-l-2 p-8">Barra Laterale</aside>
        </div>
        <footer class="row-span-1 border-t-2"></footer>
    </div>
</template>

<script setup>
import ColorCard from "./components/ColorCard.vue";
</script>

<style scoped></style>
