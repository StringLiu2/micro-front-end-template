// import Vue from 'vue'
import { AxiosInstance } from 'axios';
import { Dispatch } from 'redux';
declare module 'vue/types/vue' {
  // 声明为vue补充的东西
  interface Vue {
    $axios: AxiosInstance;
    axios: AxiosInstance;
    $dispatch: Dispatch;
    state: Record<string, any>;
  }
}