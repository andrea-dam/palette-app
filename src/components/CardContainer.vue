<template>
    <div class="card-container">
        <slot></slot>
    </div>
</template>

<style scoped>
.card-container {
    @apply flex h-full items-center justify-center xl:space-x-4 2xl:space-x-10;
}
</style>
