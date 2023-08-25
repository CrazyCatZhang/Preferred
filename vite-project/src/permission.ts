import router from '@/router/index.ts'
//@ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user.ts'
import setting from '@/setting.ts'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to: any, from: any, next: any) => {
    document.title = `${setting.title} - ${to.meta.title}`
    NProgress.start()
    const userStore = useUserStore()
    const token = userStore.token
    const username = userStore.username
    if (token) {
        if (to.path === '/login') {
            next({
                path: from.path,
            })
        } else {
            if (username) {
                next()
            } else {
                try {
                    await userStore.userInfo()
                    next()
                } catch (err) {
                    await userStore.userLogout()
                    next({
                        path: '/login',
                        query: { redirect: to.path },
                    })
                }
            }
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.path,
                },
            })
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
