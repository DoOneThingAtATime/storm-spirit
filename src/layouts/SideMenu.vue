<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from './SubMenu'
import { check } from '../utils/auth'

export default {
  props: {
    theme: {
      type: String,
      default: 'dark'
    }
  },
  components: {
    'sub-menu': SubMenu
  },
  data() {
    this.selectedKeysMap = {}
    this.openKeysMap = {}
    const menuData = this.getMenuData(this.$router.options.routes)

    return {
      collapsed: false,
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    }
  },
  watch: {
    '$route.path': function(val) {
      this.selectedKeys = this.selectedKeysMap[val]
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const result = []
      routes.forEach(route => {
        if (
          route.meta &&
          route.meta.authority &&
          !check(route.meta.authority)
        ) {
          return
        }
        if (route.name && !route.hideInMenu) {
          this.openKeysMap[route.path] = parentKeys
          this.selectedKeysMap[route.path] = [selectedKey || route.path]

          const copy = { ...route }
          delete copy.children
          if (route.children && !route.hideChildrenInMenu) {
            copy.children = this.getMenuData(route.children, [
              ...parentKeys,
              route.path
            ])
          } else {
            this.getMenuData(
              route.children,
              selectedKey ? parentKeys : [...parentKeys, route.path],
              selectedKey || route.path
            )
          }
          result.push(copy)
        } else if (
          route.children &&
          !route.hideInMenu &&
          !route.hideChildrenInMenu
        ) {
          result.push(
            ...this.getMenuData(route.children, [...parentKeys, route.path])
          )
        }
      })
      return result
    }
  }
}
</script>
