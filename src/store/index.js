import Vue from "vue";
import Vuex from "vuex";
import Product from "../api/Product";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
  },
  actions: {
    async getAllProducts({ commit }) {
      let products = await Product.getAll();
      commit("SET_PRODUCTS", products.data);
    },
  },
  modules: {},
});
