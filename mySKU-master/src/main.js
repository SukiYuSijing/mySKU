// import store from '../src/store'
import App from '../src/App'
import Vue from 'vue'
import ElementUI from 'element-ui'

Vue.config.productionTip = false
import 'element-ui/lib/theme-chalk/index.css';
// Vue使用ElementUI
Vue.use(ElementUI)
new Vue({
    el: '#app',
    // store,
    render:h=>h(App)
})