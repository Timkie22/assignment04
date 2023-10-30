<template>
  <div id="electronics">
    <div class="category-header electronicHeader"><h1>Electronics</h1></div>
    <div class="items">
      <ElectronicsItem v-for="item in electronicsItems" :item="item" />
    </div>
  </div>
  <div id="clothing">
    <div class="category-header clothingHeader"><h1>Clothing</h1></div>
    <div class="items">
      <ClothingItem v-for="item in clothingItems" :item="item" />
    </div>
  </div>
  <div id="groceries">
    <div class="category-header groceriesHeader"><h1>Groceries</h1></div>
    <div class="items">
      <GroceriesItem v-for="item in groceriesItems" :item="item" />
    </div>
  </div>
  <div id="sports">
    <div class="category-header sportsHeader"><h1>Sports</h1></div>
    <div class="items">
      <SportsItem v-for="item in sportsItems" :item="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import ElectronicsItem from "./components/ElectronicsItem.vue";
import ClothingItem from "./components/ClothingItem.vue";
import GroceriesItem from "./components/GroceriesItem.vue";
import SportsItem from "./components/SportsItem.vue";
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
const electronicsItems = ref<StoreItem[]>([]);
const clothingItems = ref<StoreItem[]>([]);
const groceriesItems = ref<StoreItem[]>([]);
const sportsItems = ref<StoreItem[]>([]);

onBeforeMount(async () => {
  const electronicsCollection = collection(db, "electronics");
  const electronicsSnapshot = await getDocs(electronicsCollection);
  electronicsItems.value = electronicsSnapshot.docs.map(
    (doc) => doc.data() as StoreItem
  );

  const clothingCollection = collection(db, "clothing");
  const clothingSnapshot = await getDocs(clothingCollection);
  clothingItems.value = clothingSnapshot.docs.map(
    (doc) => doc.data() as StoreItem
  );

  const groceriesCollection = collection(db, "groceries");
  const groceriesSnapshot = await getDocs(groceriesCollection);
  groceriesItems.value = groceriesSnapshot.docs.map(
    (doc) => doc.data() as StoreItem
  );

  const sportsCollection = collection(db, "sports");
  const sportsSnapshot = await getDocs(sportsCollection);
  sportsItems.value = sportsSnapshot.docs.map((doc) => doc.data() as StoreItem);
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
.electronicHeader {
  background-image: url(https://datadimensions.com/wp-content/uploads/2021/09/aboutus-banner.jpg);
}
.clothingHeader {
  background-image: url(https://as1.ftcdn.net/v2/jpg/02/42/89/60/500_F_242896079_shm0z5sz1owigpNJKmzNFkuKbt0JKIc2.jpg);
}
.groceriesHeader {
  background-image: url(https://sunrisemarketplace.com/wp-content/uploads/2017/09/SMP-grocery-stores-banner.jpg);
}
.sportsHeader {
  background-image: url(https://www.woodhouseparklifestylecentre.co.uk/wp-content/uploads/2014/04/Football-pitch-banner.jpg);
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  gap: 20px;
  margin: 20px;
  justify-content: center;
}
</style>
