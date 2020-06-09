import Vue from "vue";
import Vuex from "vuex";
import Product from "../api/Product";
import User from "../api/User";
import Order from "../api/Order";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    token: JSON.parse(localStorage.getItem("jwtToken")) || null,
    cart: [],
    user: JSON.parse(localStorage.getItem("user")) || null,
    orderHistory: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    SET_TOKEN(state, token) {
      localStorage.setItem("jwtToken", JSON.stringify(token));
      state.token = token;
    },
    SET_CART(state, cartArray) {
      state.cart = cartArray;
    },
    SET_ORDER_HISTORY(state, orderHistory) {
      state.orderHistory = orderHistory;
    },
    SET_USER(state, user) {
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    ADD_TO_CART(state, cartItem) {
      let foundIndex = state.cart.findIndex(
        (c) => c.product._id == cartItem.product._id
      );
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
    CLEAR_CART(state) {
      localStorage.removeItem("cart");
      state.cart = [];
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
    async readProduct(context, productId) {
      let product = await Product.get(productId);
      return product.data;
    },
    async login({ commit }, loginCred) {
      try {
        let login = await User.auth(loginCred.email, loginCred.password);
        commit("SET_USER", login.data.user);
        commit("SET_TOKEN", login.data.token);
        return login.status;
      } catch (error) {
        return 403;
      }
    },
    async logout({ commit }) {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
      commit("SET_USER", null);
      commit("SET_TOKEN", null);
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

    async placeOrder({ commit, state }, cartItems) {
      let products = [];
      for (const e of cartItems) {
        if (e.quantity > 1) {
          for (let i = 0; i < e.quantity; i++) {
            products.push(e.product._id);
          }
        } else {
          products.push(e.product._id);
        }
      }

      let order = {
        items: products,
      };

      let orderResponse = await Order.create(order, state.token);
      console.log(orderResponse);
      commit("CLEAR_CART");
    },

    async getOrders({ commit, state }) {
      let orders = await Order.get(state.token);
      commit("SET_ORDER_HISTORY", orders.data);
    },

    async createProduct({ commit, state }, product) {
      let newProduct = await Product.create(product, state.token);
      console.log(newProduct);
      commit("ADD_PRODUCT", newProduct.data.product);
    },
    async updateProduct({ commit, state }, updatedProduct) {
      await Product.update(updatedProduct, state.token);
      commit("SET_PRODUCT", updatedProduct);
    },
    async deleteProduct({ commit, state }, product) {
      await Product.delete(product, state.token);
      commit("DELETE_PRODUCT", product);
    },
  },
  modules: {},
});
