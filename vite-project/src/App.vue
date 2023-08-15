<script setup lang="ts">
import { onMounted } from 'vue'
import { login } from '@/api/user'
onMounted(() => {
    login({
        username: 'admin',
        password: '1111111',
    }).then((res) => {
        console.log(res)
    })
})
</script>

<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<style scoped lang="scss"></style>
