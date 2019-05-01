import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import Toast from 'vuejs-noty';
import VD from 'vue-disqus';
import WW from 'vue-wysiwyg';
import VP from 'vue-picture-input';
import 'vuejs-noty/dist/vuejs-noty.css';
import 'vue-wysiwyg/dist/vueWysiwyg.css';

Vue.use(Toast, {
  timeout: 3000,
  progressBar: true,
  layout: 'topRight',
  killer: true
});
Vue.use(VD);
Vue.use(WW, {});
Vue.use(VP);

Vue.config.productionTip = false
const authData = localStorage.getItem('auth');
new Vue({
  router,
  data: {
    auth: authData ? JSON.parse(authData) : {},
    location: '',
  },
  render: h => h(App),
}).$mount('#app')
