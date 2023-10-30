<template>
  <div id="sports">
    <div class="category-header sportsHeader"><h1>Sports</h1></div>
    <div class="items">
      <SportsItem v-for="item in sportsItems" :item="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
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
const sportsItems = ref<StoreItem[]>([]);

onBeforeMount(async () => {
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
