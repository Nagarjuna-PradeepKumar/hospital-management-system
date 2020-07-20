import axios from "axios";
import Vue from "vue";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const devInstance = createInstance("http://localhost:5000/api");

function createInstance(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });
}

export default {
  install() {
    Vue.prototype.$axios = devInstance;
  },
}; // Check debug/build mode
