<template>
    <div>
        <h1>我是Home组件</h1>
    </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user.ts'

const userStore = useUserStore()

onMounted(() => {
    userStore.userInfo()
})
</script>

<style scoped></style>
