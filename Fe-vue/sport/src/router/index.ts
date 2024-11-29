import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import ContactAds from "../pages/ContactAds.vue";
import ProductDetail from "../components/product/ProductDetail.vue";
import Cart from "../pages/Cart.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import OrderSuccessPage from "../pages/OrderSuccessPage.vue";
import userService from "../services/userServices";
const isLogin = (): boolean => {
  return userService.isLoggedIn(); // Example: Check if a token exists
};
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/contact",
      name: "Contact",
      component: ContactAds,
    },
    {
      path: "/product/:page?",
      name: "About",
      component: About,
      beforeEnter: (to, from, next) => {
        let page = to.params.page;

        if (Array.isArray(page)) {
          page = page[0]; // If it's an array, take the first value
        }

        const pageNumber = parseInt(page) || 1; // Default to 1 if it's invalid
        if (pageNumber < 1) {
          next({ path: "/product/1" });
        } else {
          next();
        }
      },
    },
    {
      path: "/product-detail/:id",
      name: "ProductDetail",
      component: ProductDetail,
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart,
    },
    {
      path: "/order-success/:orderID",
      name: "OrderSuccess",
      component: OrderSuccessPage,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: (to, from, next) => {
        if (isLogin()) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      beforeEnter: (to, from, next) => {
        if (isLogin()) {
          next("/");
        } else {
          next();
        }
      },
    },
  ],
});
