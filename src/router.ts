import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import ArtSupplyItem from "./ArtSupplyItem.vue";
import BookItem from "./BookItem.vue";
import KitchenwareItem from "./KitchenwareItem.vue";
import MusicItem from "./MusicItem.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/artsupplies",
    component: ArtSupplyItem,
  },
  {
    path: "/books",
    component: BookItem,
  },
  {
    path: "/kitchenware",
    component: KitchenwareItem,
  },
  {
    path: "/music",
    component: MusicItem,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
