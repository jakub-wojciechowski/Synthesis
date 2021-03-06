// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import Vue2Filters from 'vue2-filters'
import Toasted from 'vue-toasted';
import AsyncComputed from 'vue-async-computed'
import {getSynthRate} from "./blockchain/pool"


Vue.use(Vue2Filters)
Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(Toasted)
Vue.use(AsyncComputed)


window.addEventListener('load', function () {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App}
  })
})

async function setupFilters() {
  Vue.filter('usd', function (value) {
    if (!value) return '$0'
    return "$" + value.toFixed(2);
  });

  Vue.filter('eth', function (value) {
    if (!value) return 'some ETH'
    return value.toFixed(3) + ' ETH';
  });

  Vue.filter('units', function (value) {
    if (!value) return '0';
    return value.toFixed(3);
  });

  Vue.filter('percent', function (value) {
    if (!value) return '0%';
    return (value*100).toFixed(2) + "%";
  });

  Vue.filter('tx', function (value) {
    if (!value) return '';
    return value.substr(0,6) + "..." + value.substr(value.length - 4);
  })
  await getSynthRate();
};

setupFilters();

