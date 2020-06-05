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
    SET_CART(state, cartArray) {
      state.cart = cartArray;
    },
    ADD_TO_CART(state, cartItem) {
      let foundIndex = state.cart.findIndex(
        (c) => c.product._id == cartItem.product._id
      );
      console.log(foundIndex);
      if (foundIndex != -1) {
        let found = state.cart.find(
          (c) => c.product._id == cartItem.product._id
        );
        found.quantity += cartItem.quantity;
        state.cart.splice(foundIndex, 1, found);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else {
        state.cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product);
    },
    DELETE_PRODUCT(state, product) {
      let index = state.products.findIndex((p) => p._id == product._id);
      state.products.splice(index, 1);
    },
    INCREASE_CART_QUANTITY(state, item) {
      //index 2
      let index = state.cart.findIndex(
        (c) => c.product._id == item.product._id
      );
      //quantity en mer än vad som var
      item.quantity++;
      //tar bort gamla objeket och ersätter med nytt.
      state.cart.splice(index, 1, item);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    DECREASE_CART_QUANTITY(state, item) {
      //index 2
      let index = state.cart.findIndex(
        (c) => c.product._id == item.product._id
      );
      //quantity en mer än vad som var
      if (item.quantity <= 1) {
        state.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else {
        item.quantity--;
        //tar bort gamla objeket och ersätter med nytt.
        state.cart.splice(index, 1, item);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
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
    getCartFromLocalStorage({ commit }) {
      let cartArray = JSON.parse(localStorage.getItem("cart"));
      if (cartArray) {
        commit("SET_CART", cartArray);
      }
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
