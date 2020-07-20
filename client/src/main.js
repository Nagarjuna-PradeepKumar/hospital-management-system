import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "./plugins/axios";

Vue.config.productionTip = false;
Vue.use(axios);
new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
