<template>
  <div id="electronics">
    <div class="category-header electronicHeader"><h1>Electronics</h1></div>
    <div class="items">
      <ElectronicsItem v-for="item in electronicsItems" :item="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import ElectronicsItem from "./components/ElectronicsItem.vue";
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

onBeforeMount(async () => {
  const electronicsCollection = collection(db, "electronics");
  const electronicsSnapshot = await getDocs(electronicsCollection);
  electronicsItems.value = electronicsSnapshot.docs.map(
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
.electronicHeader {
  background-image: url(https://datadimensions.com/wp-content/uploads/2021/09/aboutus-banner.jpg);
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  gap: 20px;
  margin: 20px;
  justify-content: center;
}
</style>
