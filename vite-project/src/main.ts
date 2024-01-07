import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import 'virtual:svg-icons-register'
import globalComponent from '@/components'
import '@/styles/index.scss'
import router from '@/router/index.ts'
import pina from '@/store'
import '@/permission.ts'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(globalComponent)
app.use(router)
app.use(pina)
app.mount('#app')
