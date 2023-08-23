<script setup lang="ts" name="Main">
import 'animate.css'
import useLayoutSettingStore from '@/store/modules/setting.ts'
import { nextTick, ref, watch } from 'vue'

const LayoutSettingStore = useLayoutSettingStore()
let refreshFlag = ref(true)

watch(
    () => LayoutSettingStore.refresh,
    () => {
        refreshFlag.value = false
        nextTick(() => {
            refreshFlag.value = true
        })
    },
)
</script>

<template>
    <router-view v-slot="{ Component }">
        <transition enter-active-class="animate__animated animate__fadeIn">
            <component :is="Component" v-if="refreshFlag" />
        </transition>
    </router-view>
</template>

<style scoped></style>
