import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Admin from "../views/Admin.vue";
import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";
import Login from "../views/Login.vue";
import Product from "../views/Product.vue";
import Profile from "../views/Profile.vue";

import RegisterAccount from "../components/RegisterAccount.vue";
import LoginAccount from "../components/LoginAccount.vue";
import AdminProductEditComponent from "../components/admin/AdminProductEditComponent.vue";
import AdminCrudView from "../components/admin/AdminCrudView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "/admin",
        name: "AdminView",
        component: AdminCrudView,
      },
      {
        path: "/admin/edit/product/:id",
        name: "EditProduct",
        component: AdminProductEditComponent,
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    children: [
      {
        path: "/login/account",
        name: "LoginAccount",
        component: LoginAccount,
      },
      {
        path: "/login/register",
        name: "RegisterAccount",
        component: RegisterAccount,
      },
    ],
  },
  {
    path: "/product/:id",
    name: "Product",
    component: Product,
  },
  {
    path: "/profile",
    name: "Proile",
    component: Profile,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
