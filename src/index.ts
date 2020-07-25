// react element-ui的样式引入
import 'element-theme-default';
// vue注册插件、样式引入
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import { installStore } from './store';
import './assets/index.css'

Vue.use(ElementUI); // 注册element ui 全局注册
Vue.use(VueRouter);
Vue.use(installStore);