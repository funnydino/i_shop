import Vue from 'vue';
import App from './App.vue';
import alertMessageFunction from './function';
import {
  message,
  message2,
} from './messages';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

console.log(message, message2);

alertMessageFunction(message);
alertMessageFunction(message2);
