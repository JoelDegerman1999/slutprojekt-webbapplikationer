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
    user: {}
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
    SET_USER(state, user){
      state.user = user;
    }
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
    async readProduct(context, productId){
      let product = await Product.get(productId);
      return product.data;
    },
    async login({ commit }, loginCred) {
      try{
      let login = await User.auth(loginCred.email, loginCred.password);
      commit("SET_USER", login.data.user);
      commit("SET_TOKEN", login.data.token);
      return login.status;
      }catch(error){
        return 403;
      }
    },
    async createNewUser(context, newUser){
      let user = await User.register(newUser);
      console.log(user);
    }
  },
  modules: {},
});
