<template>
  <div>
    <h1>{{ message }}</h1>
    <h3>{{ state.user.userId }}</h3>
    <button @click="handleClick">点击++</button>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  public message: string = 'Hello from Vue';
  // created () {
  //   console.log(this.state.user.userId);
  // }
  handleClick() {
    this.$dispatch({
      type: '',
    });
  }
}
</script>
