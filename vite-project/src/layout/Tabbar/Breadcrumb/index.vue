<script setup lang='ts'>
import {useRoute} from 'vue-router'
const $route = useRoute()
console.log()
</script>

<template>
    <!-- 顶部左侧静态 -->
    <el-icon style="margin-right:10px" >
        <component is='Fold'></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <!-- 面包动态展示路由名字与标题 -->
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <!-- 图标 -->
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <!-- 面包屑展示匹配路由的标题 -->
            <span class='title'>{{ item.meta['title'] }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style scoped lang='scss'>
.el-icon {
    vertical-align: middle;
    margin-right: 5px;
}

.title {
    vertical-align: middle;
}
</style>