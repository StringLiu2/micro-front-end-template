import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import router from './router';

import App from './app.vue';

interface LifeCycle {
  bootstrap: (props: any) => Promise<void>;
  mount: (props: any) => Promise<void>;
  unmount: (props: any) => Promise<void>;
  update?: (props: any) => Promise<void>;
}


const vueLifeCycles: LifeCycle = singleSpaVue({
  Vue,
  appOptions: {
    el: '#vue',
    render: (r: any) => r(App),
    router
  },
});

export const bootstrap = [vueLifeCycles.bootstrap];

export const mount = [vueLifeCycles.mount];

export const unmount = [vueLifeCycles.unmount];