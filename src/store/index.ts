import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducers, { initialState } from './reducers';
import { VueConstructor } from 'vue';

const store = createStore(reducers, initialState, applyMiddleware(thunk));

// * 把store提供给vue的install方法、实现数据共享
export function installStore(vue: VueConstructor) {
    const vm = new vue({
        data() {
            return {
                state: store.getState()
            };
        }
    });
    // 收集依赖
    store.subscribe(() => {
        vm.state = store.getState(); // 等待state发生变化，重新赋值state
    });
    vue.mixin({
        beforeCreate() {
            vue.prototype.$dispatch = store.dispatch;
            vue.prototype.state = vm.$data.state;
            // state发生变化的时候，重新渲染
            Object.defineProperty(vue.prototype, 'state', {
                get() {
                    return vm.$data.state;
                },
                set() {} // 不能直接设置
            })
        }
    })
}

export default store;