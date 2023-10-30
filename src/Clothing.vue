<template>
  <div id="clothing">
    <div class="category-header clothingHeader"><h1>Clothing</h1></div>
    <div class="items">
      <ClothingItem v-for="item in clothingItems" :item="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import ClothingItem from "./components/ClothingItem.vue";
import "font-awesome/css/font-awesome.min.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./main.ts";

interface StoreItem {
  name: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  image: string;
  category: string;
}
const clothingItems = ref<StoreItem[]>([]);

onBeforeMount(async () => {
  const clothingCollection = collection(db, "clothing");
  const clothingSnapshot = await getDocs(clothingCollection);
  clothingItems.value = clothingSnapshot.docs.map(
    (doc) => doc.data() as StoreItem
  );
});
</script>

<style scoped>
.category-header {
  background-size: cover;
  padding: 1px;
  text-shadow: -2px -2px 0 #000000, 2px -2px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  color: white;
}
.clothingHeader {
  background-image: url(https://as1.ftcdn.net/v2/jpg/02/42/89/60/500_F_242896079_shm0z5sz1owigpNJKmzNFkuKbt0JKIc2.jpg);
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  gap: 20px;
  margin: 20px;
  justify-content: center;
}
</style>
