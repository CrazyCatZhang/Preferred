import router from '@/router/index.ts'
//@ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to: any, from: any, next: any) => {
    console.log(to, from)
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})
