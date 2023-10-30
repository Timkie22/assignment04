<template>
  <div id="groceries">
    <div class="category-header groceriesHeader"><h1>Groceries</h1></div>
    <div class="items">
      <GroceriesItem v-for="item in groceriesItems" :item="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import GroceriesItem from "./components/GroceriesItem.vue";
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
const groceriesItems = ref<StoreItem[]>([]);

onBeforeMount(async () => {
  const groceriesCollection = collection(db, "groceries");
  const groceriesSnapshot = await getDocs(groceriesCollection);
  groceriesItems.value = groceriesSnapshot.docs.map(
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
.groceriesHeader {
  background-image: url(https://sunrisemarketplace.com/wp-content/uploads/2017/09/SMP-grocery-stores-banner.jpg);
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  gap: 20px;
  margin: 20px;
  justify-content: center;
}
</style>
