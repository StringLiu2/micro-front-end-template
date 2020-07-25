<template>
  <el-container>
    <el-header class="header">
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        router
      >
        <el-menu-item disabled class="logo" index="/logo">
          <img :src="logoSrc" alt="" />
        </el-menu-item>
        <el-menu-item index="/">Mack Liu的博客</el-menu-item>
        <el-menu-item index="/vue">vue专区</el-menu-item>
        <el-menu-item index="/react">react专区</el-menu-item>
        <el-menu-item index="/react/node">node.js专区</el-menu-item>
      </el-menu>
    </el-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </el-container>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  public logoSrc = require('../assets/logo.png').default;
}
</script>

<style scoped>
.logo img {
  height: 45px;
}
.logo {
  opacity: 1;
}
.header {
  margin-bottom: 20px;
}
</style>
