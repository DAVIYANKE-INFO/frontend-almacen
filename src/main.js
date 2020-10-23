import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
window.axios = require('axios')
import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
 
window.toastr = require('toastr')


const moment = require('moment')
require('moment/locale/es')
 
Vue.use(require('vue-moment'), {
    moment
})
 
Vue.use(VueToastr2)

/**************************VARIABLE GLOBAL************************************/
var ip="http://192.168.0.131:4500";
//var ip="http://192.168.0.130:4300";
Vue.store= Vue.prototype.store = '';
Vue.storepublic = Vue.prototype.storepublic = ip;
/**************************VARIABLE GLOBAL************************************/

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
