<script setup lang="ts" name='Main'>
import 'animate.css'
</script>

<template>
    <router-view v-slot="{ Component }">
        <transition enter-active-class='animate__animated animate__fadeIn'>
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<style scoped></style>
