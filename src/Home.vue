<template>
  <!-- ... other category sections ... -->
  <div id="artsupplies">
    <div class="category-header artSuppliesHeader"><h1>Art Supplies</h1></div>
    <div class="items">
      <ArtSupplyItem v-for="item in artSuppliesItems" :key="item.name" :item="item" />
    </div>
  </div>
  <div id="books">
    <div class="category-header bookHeader"><h1>Books</h1></div>
    <div class="items">
      <BookItem v-for="item in bookItems" :key="item.name" :item="item" />
    </div>
  </div>
  <div id="kitchenware">
    <div class="category-header kitchenwareHeader"><h1>Kitchenware</h1></div>
    <div class="items">
      <KitchenwareItem v-for="item in kitchenwareItems" :key="item.name" :item="item" />
    </div>
  </div>
  <div id="music">
    <div class="category-header musicHeader"><h1>Music</h1></div>
    <div class="items">
      <MusicItem v-for="item in musicItems" :key="item.name" :item="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import ArtSupplyItem from "./ArtSupplyItem.vue";
import BookItem from "./BookItem.vue";
import KitchenwareItem from "./KitchenwareItem.vue";
import MusicItem from "./MusicItem.vue";
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
const artSuppliesItems = ref<StoreItem[]>([]);
const bookItems = ref<StoreItem[]>([]);
const kitchenwareItems = ref<StoreItem[]>([]);
const musicItems = ref<StoreItem[]>([]);

onBeforeMount(async () => {
  const electronicsCollection = collection(db, "electronics");
  const electronicsSnapshot = await getDocs(electronicsCollection);
  artSuppliesItems.value = electronicsSnapshot.docs.map(
    (doc) => doc.data() as StoreItem
  );

  const clothingCollection = collection(db, "clothing");
  const clothingSnapshot = await getDocs(clothingCollection);
  bookItems.value = clothingSnapshot.docs.map(
    (doc) => doc.data() as StoreItem
  );

  const groceriesCollection = collection(db, "groceries");
  const groceriesSnapshot = await getDocs(groceriesCollection);
  kitchenwareItems.value = groceriesSnapshot.docs.map(
    (doc) => doc.data() as StoreItem
  );

  const sportsCollection = collection(db, "sports");
  const sportsSnapshot = await getDocs(sportsCollection);
  musicItems.value = sportsSnapshot.docs.map((doc) => doc.data() as StoreItem);
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
/* ... other styles ... */
.artSuppliesHeader {
  /* Add background-image and other styles specific for the art supplies header */
}
.bookHeader {
  /* Add background-image and other styles specific for the book header */
}
.kitchenwareHeader {
  /* Add background-image and other styles specific for the kitchenware header */
}
.musicHeader {
  /* Add background-image and other styles specific for the music header */
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  gap: 20px;
  margin: 20px;
  justify-content: center;
}
</style>
