<template>
    <div class='login_container'>
        <el-row>
            <el-col :span='12' :xs='0'></el-col>
            <el-col :span='12' :xs='24'>
                <el-form class='login_form'>
                    <h1>Hello</h1>
                    <h2>欢迎来到优选</h2>
                    <el-form-item>
                        <el-input :prefix-icon='User' v-model='loginForm.username'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type='password' :prefix-icon='Lock' :show-password='true'
                                  v-model='loginForm.password'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading='isLoading' class='login_btn' type='primary' size='default' @click='login'>
                            Login
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang='ts'>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user.ts'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

const useStore = useUserStore()
const $router = useRouter()

const loginForm = reactive({
    username: 'admin',
    password: '111111',
})
const isLoading = ref(false)

const login = async () => {
    isLoading.value = true
    try {
        await useStore.userLogin({ ...loginForm })
        isLoading.value = false
        ElNotification({
            type: 'success',
            message: '登录成功',
        })
        await $router.push('/')
    } catch (message) {
        isLoading.value = false
        ElNotification({
            type: 'error',
            message,
        })
    }
}
</script>

<style scoped lang='scss'>
.login_container {
    width: 100%;
    height: 100vh;
    background: url("@/assets/images/background.jpg") no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url("@/assets/images/login_form.png") no-repeat;
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
