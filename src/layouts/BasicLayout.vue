<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="256px"
      >
        <h2 class="logo">
          💡 There's no safe harbor from this storm, Kunkka!
        </h2>
        <s-s-side-menu :theme="navTheme"></s-s-side-menu>
      </a-layout-sider>

      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
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
    <Authorized :authority="['admin']">
      <setting-drawer />
    </Authorized>
  </div>
</template>

<script>
import SSHeader from './Header'
import SSFooter from './Footer'
import SSSideMenu from './SideMenu'
import SettingDrawer from '../components/SettingDrawer'

export default {
  components: {
    SSHeader,
    SSFooter,
    SSSideMenu,
    SettingDrawer
  },
  data() {
    return {
      collapsed: false
    }
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || 'dark'
    },
    navLayout() {
      return this.$route.query.navLayout || 'left'
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
.logo {
  padding: 8px;
  text-align: center;
  overflow: hidden;
}
.nav-theme-dark /deep/ .logo {
  color: #fff;
}
</style>
