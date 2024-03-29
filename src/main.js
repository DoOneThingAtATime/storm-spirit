import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import { Button, Layout, Icon, Drawer, Radio, Menu } from 'ant-design-vue'
import Authorized from './components/Authorized'
import Auth from './directives/auth'

Vue.use(Button)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(Menu)

Vue.use(Auth)

Vue.component('Authorized', Authorized)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
