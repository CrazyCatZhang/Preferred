<script setup lang="ts" name="Setting">
import { ArrowDown } from '@element-plus/icons-vue'
import useLayoutSettingStore from '@/store/modules/setting.ts'
import useUserStore from '@/store/modules/user.ts'
import { useRouter, useRoute } from 'vue-router'

const LayoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()

const refresh = () => {
    LayoutSettingStore.refresh = !LayoutSettingStore.refresh
}

const fullScreen = () => {
    const full = document.fullscreenElement
    if (!full) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}

const logout = async () => {
    await userStore.userLogout()
    await $router.push({
        path: '/login',
        query: {
            redirect: $route.path,
        },
    })
}
</script>

<template>
    <el-button size="small" icon="Refresh" circle @click="refresh"></el-button>
    <el-button
        size="small"
        icon="FullScreen"
        circle
        @click="fullScreen"
    ></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img
        :src="userStore.avatar"
        style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
        alt="avatar"
    />
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <ArrowDown />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style scoped></style>
