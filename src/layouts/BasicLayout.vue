<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
      >
        <s-s-side-menu></s-s-side-menu>
      </a-layout-sider>

      <a-layout>
        <a-layout-header style="background: #fff; padding: 0" >
          <a-icon class="trigger"
                  :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                  @click="collapsed = !collapsed"></a-icon>
          <s-s-header></s-s-header>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <s-s-footer></s-s-footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import SSHeader from './Header'
import SSFooter from './Footer'
import SSSideMenu from './SideMenu'

export default {
  components: {
    SSHeader, SSFooter, SSSideMenu
  },
  data () {
    return {
      collapsed: false
    }
  }
}
</script>

<style lang="less" scoped>
.trigger {
  padding: 0 20px;
  line-height: 60px;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
}
</style>
