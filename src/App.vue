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
    &copy; 2023 Tims Store. All rights reserved.
  </footer>
</template>

<script lang="ts" setup>
import "font-awesome/css/font-awesome.min.css";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./main.ts";

// List of products in different categories

async function data_init() {
  const electronicsCollection = collection(db, "electronics");
  const querySnapshot = await getDocs(electronicsCollection);

  if (querySnapshot.size === 0) {
    items.value.forEach(async (item) => {
      const itemCollection = collection(db, item.category.toLowerCase());
      await addDoc(itemCollection, item);
    });

    console.log("Data initialized in Firestore.");
  } else {
    console.log("Firestore is not empty. Skipping data initialization.");
  }
}
data_init();
</script>

<style scoped>
.header {
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* You can adjust the height as needed */
}

.header a {
  text-decoration: none;
  cursor: pointer;
}

.header img {
  max-width: 100%; /* Ensure the logo doesn't exceed its container */
  max-height: 175px; /* Maintain aspect ratio */
}

.nav {
  background-color: #444;
  color: white;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.nav-item {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  min-width: 100px;
  padding: 10px 20px;
  margin: 5px;
  border: 1px solid #fff;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-item:hover {
  background-color: #fff;
  color: #444;
}
.main-content {
  background-color: #242424;
}

.footer {
  background-color: #333;
  color: white;
  padding: 10px;
}
</style>
