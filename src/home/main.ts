import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import router from './router';
import Home from './Home.vue';

interface LifeCycle {
  bootstrap: (props: any) => Promise<void>;
  mount: (props: any) => Promise<void>;
  unmount: (props: any) => Promise<void>;
  update?: (props: any) => Promise<void>;
}

const vueLifeCycles: LifeCycle = singleSpaVue({
  Vue,
  appOptions: {
    el: '#home',
    render: (r: any) => r(Home),
    router
  },
});

export const bootstrap = [vueLifeCycles.bootstrap];

export const mount = [vueLifeCycles.mount];

export const unmount = [vueLifeCycles.unmount];