<script setup lang="ts">
import request from '@/utils/request.ts'
import {onMounted} from 'vue'
onMounted(()=>{
    request({
        url: '/user/login',
        method: 'POST',
        data: {
            username: 'admin',
            password: '111111'
        }
    }).then((res)=>{
        console.log(res)
    })
})
</script>

<template>
    <div>
        <h1>测试代码</h1>
    </div>
</template>

<style scoped lang="scss"></style>
