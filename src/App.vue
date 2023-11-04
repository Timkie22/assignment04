<template>
  <header class="header">
    <router-link to="/">
      <img src="./assets/logo.png" alt="logo" />
    </router-link>
  </header>
  <nav class="nav">
    <router-link to="/" class="nav-item">Home</router-link>
    <router-link to="/books" class="nav-item">Books</router-link>
    <router-link to="/music" class="nav-item">Music</router-link>
    <router-link to="/art-supplies" class="nav-item">Art Supplies</router-link>
    <router-link to="/kitchenware" class="nav-item">Kitchenware</router-link>
  </nav>
  <main class="main-content">
    <router-view></router-view>
  </main>
  <footer class="footer">
    &copy; 2023 Artistic Endeavors. All rights reserved.
  </footer>
</template>

<script lang="ts" setup>
// ... import statements ...

// List of products in different categories
const items = ref([
  // Books
  {
    name: "Classic Literature",
    description: "A collection of classic literature works",
    price: 50,
    rating: 4.8,
    stock: 20,
    image: "https://example.com/path-to-classic-literature-cover.png",
    category: "Books",
  },
  // ... More book items ...
  
  // Music
  {
    name: "Acoustic Guitar",
    description: "Wooden acoustic guitar",
    price: 120,
    rating: 4.7,
    stock: 15,
    image: "https://example.com/path-to-acoustic-guitar.png",
    category: "Music",
  },
  // ... More music items ...
  
  // Art Supplies
  {
    name: "Watercolor Paint Set",
    description: "24 colors watercolor paint set",
    price: 35,
    rating: 4.9,
    stock: 30,
    image: "https://example.com/path-to-watercolor-paint-set.png",
    category: "Art Supplies",
  },
  // ... More art supplies items ...
  
  // Kitchenware
  {
    name: "Chef's Knife",
    description: "Stainless steel chef's knife",
    price: 25,
    rating: 4.6,
    stock: 40,
    image: "https://example.com/path-to-chefs-knife.png",
    category: "Kitchenware",
  },
  // ... More kitchenware items ...
]);

// ... rest of the script ...
</script>

<style scoped>
/* No changes needed in CSS unless you want to style it differently */
</style>
