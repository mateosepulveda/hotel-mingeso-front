import Vue from 'vue'
import App from './App.vue'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import Gantt from 'highcharts/modules/gantt'

import axios from 'axios'
import VueAxios from 'vue-axios'

import moment from 'moment'

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Gantt(Highcharts)
Vue.use(HighchartsVue)

new Vue({
  router,
  HighchartsVue,
  render: h => h(App)
}).$mount('#app')
