<template>
  <dir class="not-found">
    <h2>页面不存在</h2>
    <router-link to="/" class="goto-home">返回首页</router-link>
  </dir>
</template>

<script>
export default {};
</script>

<style>
.not-found {
  text-align: center;
  padding-top: 100px;
  font-size: 40px;
}
.goto-home {
  font-size: 20px;
}
</style>
