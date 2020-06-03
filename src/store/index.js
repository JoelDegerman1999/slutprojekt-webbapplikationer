import Vue from "vue";
import Vuex from "vuex";
import Product from "../api/Product";
import User from "../api/User";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    token: "",
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    async getAllProducts({ commit }) {
      let products = await Product.getAll();
      commit("SET_PRODUCTS", products.data);
    },
    async login({ commit }, loginCred) {
      let login = await User.auth(loginCred.email, loginCred.password);
      console.log(login);
      commit("SET_TOKEN", login.data.token);
    },
  },
  modules: {},
});