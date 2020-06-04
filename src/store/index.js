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
    SET_CART(state, cartArray) {
      state.cart = cartArray;
      console.log(state.cart)
    },
    ADD_TO_CART(state, cartItem) {
      state.cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(state.cart))
      console.log(state.cart);
    },
    SET_USER(state, user){
      state.user = user;
    }
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
    async createNewUser(context, newUser) {
      let user = await User.register(newUser);
      console.log(user);
    },
    getCartFromLocalStorage({ commit }) {
      let cartArray = JSON.parse(localStorage.getItem("cart"))
      if(cartArray){
        commit("SET_CART",cartArray)
      }
      
      console.log(cartArray)
    }

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
