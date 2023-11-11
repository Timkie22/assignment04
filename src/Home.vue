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
  try {
    const artSuppliesCollection = collection(db, "artsupplies");
    const artSuppliesSnapshot = await getDocs(artSuppliesCollection);
    artSuppliesItems.value = artSuppliesSnapshot.docs.map(
      (doc) => doc.data() as StoreItem
    );

    const booksCollection = collection(db, "books");
    const booksSnapshot = await getDocs(booksCollection);
    bookItems.value = booksSnapshot.docs.map(
      (doc) => doc.data() as StoreItem
    );

    const kitchenwareCollection = collection(db, "kitchenware");
    const kitchenwareSnapshot = await getDocs(kitchenwareCollection);
    kitchenwareItems.value = kitchenwareSnapshot.docs.map(
      (doc) => doc.data() as StoreItem
    );

    const musicCollection = collection(db, "music");
    const musicSnapshot = await getDocs(musicCollection);
    musicItems.value = musicSnapshot.docs.map((doc) => doc.data() as StoreItem);
  } catch (error) {
    console.error("Fehler beim Laden der Daten: ", error);
   
  }
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
  background-image: url( https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzPI5tniFi4xkRHqwSWSZ8oMPyFIxmcc05kwYg5emk10TlF0FF5nb9efvNgLdTvDMqVd4&usqp=CAU)
}
.bookHeader {
  background-image: url(https://szene-hamburg.com/wp-content/uploads/2022/12/Bu%CC%88cher-c-unsplash-gaman-alice-klein.jpg )
}
.kitchenwareHeader {
  background-image: url(https://top-shelf.de/cdn/shop/files/Moderne-grifflose-Kueche-Riva-top-shelf.de_1600x.jpg?v=1632830066 )
}
.musicHeader {
  background-image: url(https://shop.okluge.de/blog/wp-content/uploads/2020/01/Musik-hoeren_960x540.jpg )
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  gap: 20px;
  margin: 20px;
  justify-content: center;
}
</style>
