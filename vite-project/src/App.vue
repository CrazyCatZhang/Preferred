<script setup lang="ts">
import {onMounted} from 'vue'
import {login} from '@/api/user'
onMounted(()=>{
   login({
       username: 'admin',
       password: '1111111'
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
