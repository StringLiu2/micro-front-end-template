// single-spa微前端解决方案
import * as SingleSpa from 'single-spa';
import './index';
/**
 第一个参数是注册子应用name
 第二个参数是返回一个Promise的一个Function<Promise>
 第三个参数是activityWhen,返回true或false，来匹配对应的子应用，false则不是加载这个页面
 第四个参数是可选的自定义参数
 */
SingleSpa.registerApplication(
  'home',
  () => import('./home/main'),
  () => true
);

SingleSpa.registerApplication(
  'react',
  () => import('./react/main'),
  () => {
    return location.pathname.startsWith('/react')
  }
);

SingleSpa.registerApplication(
  'vue',
  () => import('./vue/main'),
  () => {
    return location.pathname.startsWith('/vue');
  }
);

SingleSpa.start(); // 启动微前端的服务
