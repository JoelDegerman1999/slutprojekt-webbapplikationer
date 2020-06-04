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
    ADD_PRODUCT(state, product) {
      state.products.push(product);
    },
    DELETE_PRODUCT(state, product) {
      let index = state.products.findIndex((p) => p._id == product._id);
      state.products.splice(index, 1);
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
      try {
        let login = await User.auth(loginCred.email, loginCred.password);
        // console.log(login);
        commit("SET_TOKEN", login.data.token);
        return login.status;
      } catch (error) {
        return 403;
      }
    },
    async createNewUser(context, newUser) {
      let user = await User.register(newUser);
      console.log(user);
    },
    async createProduct({ commit }, product) {
      let newProduct = await Product.create(product);
      console.log(newProduct);
      commit("ADD_PRODUCT", newProduct.data.product);
    },
    async updateProduct({ commit }, updatedProduct) {
      await Product.update(updatedProduct);
      commit("SET_PRODUCT", updatedProduct);
    },
    async deleteProduct({ commit }, product) {
      await Product.delete(product);
      commit("DELETE_PRODUCT", product);
    },
  },
  modules: {},
});
