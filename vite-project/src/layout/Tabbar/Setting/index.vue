<script setup lang="ts" name='Setting'>
import { ArrowDown } from '@element-plus/icons-vue'
</script>

<template>
    <el-button size="small" icon="Refresh" circle></el-button>
    <el-button size="small" icon="FullScreen" circle></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img
        src="/vite.svg"
        style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
        alt="avatar"
    />
    <el-dropdown>
        <span class="el-dropdown-link">
            <el-icon class="el-icon--right">
                <ArrowDown />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style scoped></style>
