import Vue from 'vue';
import App from './App.vue';
import alertMessageFunction from './function';
import messages from './messages';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

Object.values(messages).forEach((message) => alertMessageFunction(message));
