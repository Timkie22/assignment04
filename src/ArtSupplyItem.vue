<template>
  <div id="art-supplies">
    <div class="category-header artSuppliesHeader"><h1>Art Supplies</h1></div>
    <div class="items">
      <ArtSupplyItem v-for="item in artSuppliesItems" :key="item.name" :item="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import ArtSupplyItem from "./ArtSupplyItem.vue"; // Stellen Sie sicher, dass Sie eine ArtSupplyItem-Komponente haben
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

onBeforeMount(async () => {
  const artSuppliesCollection = collection(db, "art-supplies"); // Aktualisiert auf die Art-Supplies-Kollektion
  const artSuppliesSnapshot = await getDocs(artSuppliesCollection);
  artSuppliesItems.value = artSuppliesSnapshot.docs.map(
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
.artSuppliesHeader {
  background-image: url('https://example.com/path-to-art-supplies-header-image.jpg'); 
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  gap: 20px;
  margin: 20px;
  justify-content: center;
}
</style>
