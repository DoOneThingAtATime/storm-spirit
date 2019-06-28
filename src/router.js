import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import NoutFound from './views/404'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/user',
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "user" */ './layouts/UserLayout'),
      redirect: '/user/login',
      children: [
        {
          path: '/user/login',
          name: 'login',
          component: () =>
            import(/* webpackChunkName: "user" */ './views/User/Login')
        },
        {
          path: '/user/register',
          name: 'regiser',
          component: () =>
            import(/* webpackChunkName: "user" */ './views/User/Register')
        }
      ]
    },
    {
      path: '/',
      component: () =>
        import(/* webpackChunkName: "layout" */ './layouts/BasicLayout'),
      redirect: '/dashboard/analysis',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: { icon: 'dashboard', title: '仪表盘' },
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              meta: { title: '分析页' },
              component: () =>
                import(/* webpackChunkName: "dashboard" */ './views/Dashboard/Analysis')
            }
          ]
        },
        {
          path: '/form',
          name: 'form',
          meta: { icon: 'form', title: '表单' },
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/form/basic-form',
              name: 'basicForm',
              meta: { title: '基础表单' },
              component: () =>
                import(/* webpackChunkName: "form" */ './views/Forms/BasicForm')
            },
            {
              path: '/form/step-form',
              name: 'stepForm',
              meta: { title: '分步表单' },
              hideChildrenInMenu: true,
              component: () =>
                import(/* webpackChunkName: "form" */ './views/Forms/StepForm'),
              redirect: '/form/step-form/info',
              children: [
                {
                  path: '/form/step-form/info',
                  name: 'info',
                  component: () =>
                    import(/* webpackChunkName: "form" */ './views/Forms/StepForm/Step1')
                },
                {
                  path: '/form/step-form/comfirm',
                  name: 'confirm',
                  component: () =>
                    import(/* webpackChunkName: "form" */ './views/Forms/StepForm/Step2')
                },
                {
                  path: '/form/step-form/result',
                  name: 'result',
                  component: () =>
                    import(/* webpackChunkName: "form" */ './views/Forms/StepForm/Step3')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/*',
      name: '404',
      hideInMenu: true,
      component: NoutFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
