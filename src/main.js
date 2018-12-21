import Vue from 'vue'
import App from './App.vue'
import router from './router'
import DatePicker from 'element-ui';

Vue.use(DatePicker);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
