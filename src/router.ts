import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import Electronics from "./Electronics.vue";
import Clothing from "./Clothing.vue";
import Groceries from "./Groceries.vue";
import Sports from "./Sports.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/electronics",
    component: Electronics,
  },
  {
    path: "/clothing",
    component: Clothing,
  },
  {
    path: "/groceries",
    component: Groceries,
  },
  {
    path: "/sports",
    component: Sports,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
