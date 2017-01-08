import Vue from 'vue'
import App from './App.vue'
import store from 'vuexdata/store'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
