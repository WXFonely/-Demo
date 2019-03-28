import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import { Area } from 'vant';



const eventBus = new Vue();
Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(iView);
Vue.use(Area);
Vue.prototype.$eventBus = eventBus

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
