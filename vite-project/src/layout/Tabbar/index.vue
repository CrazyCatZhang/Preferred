<script setup lang="ts" name="Tabbar">
import Breadcrumb from '@/layout/Tabbar/Breadcrumb/index.vue'
import Setting from '@/layout/Tabbar/Setting/index.vue'
</script>

<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    // background-image: linear-gradient(to right, rgb(232, 223, 223), rgb(201, 178, 178), rgb(197, 165, 165));

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .tabbar_right {
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
}
</style>
