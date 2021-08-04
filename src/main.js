import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import alertMessageFunction from './function';
import messages from './messages';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

Object.values(messages).forEach((message) => alertMessageFunction(message));
