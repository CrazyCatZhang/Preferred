<script setup lang="ts" name="Logo">
import setting from '@/setting.ts'
import useLayoutSettingStore from '@/store/modules/setting.ts'

const LayoutSettingStore = useLayoutSettingStore()
</script>

<template>
    <div class="logo">
        <img :src="setting.logo" v-if="!setting.isLogoHidden" alt="logo" />
        <p :class="{ fold: LayoutSettingStore.fold }">{{ setting.title }}</p>
    </div>
</template>

<style scoped lang="scss">
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 10px;

    img {
        width: 40px;
        height: 40px;
    }

    p {
        font-size: $base-logo-title-fontSize;
        margin-left: 10px;
        transition: all 0.3s;

        &.fold {
            font-size: 0;
        }
    }
}
</style>
