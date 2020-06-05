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
      let foundIndex=state.cart.findIndex(c => c.product._id==cartItem.product._id);
      console.log(foundIndex);
      if(foundIndex!=-1) {
        let found=state.cart.find(c => c.product._id==cartItem.product._id);
        console.log(found);
        found.quantity=50;
        console.log(found);
       state.cart.splice(foundIndex,1,found);
     }
     else{
      state.cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(state.cart))
      console.log(state.cart);
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
      let cartArray = JSON.parse(localStorage.getItem("cart"))
      if(cartArray){
        commit("SET_CART",cartArray)
      }
      
      console.log(cartArray)
    }

  },
  modules: {},
});
