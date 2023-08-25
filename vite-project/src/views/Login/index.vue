<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form
                    class="login_form"
                    :model="loginForm"
                    :rules="rules"
                    ref="ruleFormRef"
                >
                    <h1>Hello</h1>
                    <h2>欢迎来到优选</h2>
                    <el-form-item prop="username">
                        <el-input
                            :prefix-icon="User"
                            v-model="loginForm.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            type="password"
                            :prefix-icon="Lock"
                            :show-password="true"
                            v-model="loginForm.password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            :loading="isLoading"
                            class="login_btn"
                            type="primary"
                            size="default"
                            @click="login(ruleFormRef)"
                        >
                            Login
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user.ts'
import { ElNotification } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { getTime } from '@/utils/time.ts'
import type { FormInstance, FormRules } from 'element-plus'

const useStore = useUserStore()
const $router = useRouter()
const $route = useRoute()
const ruleFormRef = ref<FormInstance>()
const isLoading = ref(false)

interface RuleForm {
    username: string
    password: string
}

const loginForm = reactive<RuleForm>({
    username: 'admin',
    password: 'atguigu123',
})

const validatorUserName = (_: any, value: any, callback: any) => {
    if (value.length >= 5 && value.length <= 10) {
        callback()
    } else {
        callback(new Error('账号长度应为5-10位'))
    }
}

const validatorPassword = (_: any, value: any, callback: any) => {
    if (value.length >= 6 && value.length <= 15) {
        callback()
    } else {
        callback(new Error('密码长度应为6-15位'))
    }
}

const rules = reactive<FormRules<RuleForm>>({
    username: [
        {
            validator: validatorUserName,
            trigger: 'change',
        },
    ],
    password: [
        {
            validator: validatorPassword,
            trigger: 'change',
        },
    ],
})

const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    isLoading.value = true
    await formEl.validate(async (valid) => {
        if (valid) {
            useStore
                .userLogin({ ...loginForm })
                .then(async () => {
                    isLoading.value = false
                    ElNotification({
                        type: 'success',
                        message: '欢迎回来',
                        title: `Hello ${getTime()}好`,
                    })
                    const redirect = $route.query.redirect
                    await $router.push({
                        path: (redirect as string) || '/',
                    })
                })
                .catch((err) => {
                    isLoading.value = false
                    ElNotification({
                        type: 'error',
                        message: (err as Error).message,
                    })
                })
        } else {
            isLoading.value = false
        }
    })
}
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            font-size: 20px;
            color: white;
            margin: 20px 0px;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>
