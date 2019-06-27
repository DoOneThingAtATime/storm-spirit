<template>
  <div>
    <s-s-header></s-s-header>
    <s-s-side-menu></s-s-side-menu>
    <router-view></router-view>
    <s-s-footer></s-s-footer>
  </div>
</template>

<script>
import SSHeader from './Header'
import SSFooter from './Footer'
import SSSideMenu from './SideMenu'
export default {
  components: {
    SSHeader, SSFooter, SSSideMenu
  }
}
</script>

<style>

</style>
