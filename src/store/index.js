import Vue from "vue";
import Vuex from "vuex";
import Product from "../api/Product";
import User from "../api/User";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    token: "",
    cart: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    ADD_TO_CART(state, quantity) {
      let cartItem = {
        item: state.product,
        quantity: quantity,
      };
      state.cart.push(cartItem);
      console.log(state.cart);
    },
  },
  actions: {
    async getAllProducts({ commit }) {
      let products = await Product.getAll();
      commit("SET_PRODUCTS", products.data);
    },
    async getProduct({ commit }, productId) {
      let product = await Product.get(productId);
      commit("SET_PRODUCT", product.data);
    },
    async login({ commit }, loginCred) {
      let login = await User.auth(loginCred.email, loginCred.password);
      console.log(login);
      commit("SET_TOKEN", login.data.token);
    },
  },
  modules: {},
});
