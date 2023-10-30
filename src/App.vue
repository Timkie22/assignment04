<template>
  <header class="header">
    <router-link to="/">
      <img src="./assets/logo.png" alt="logo" />
    </router-link>
  </header>
  <nav class="nav">
    <router-link to="/" class="nav-item">Home</router-link>
    <router-link to="/electronics" class="nav-item">Electronics</router-link>
    <router-link to="/clothing" class="nav-item">Clothing</router-link>
    <router-link to="/groceries" class="nav-item">Groceries</router-link>
    <router-link to="/sports" class="nav-item">Sports</router-link>
  </nav>
  <main class="main-content">
    <router-view></router-view>
  </main>
  <footer class="footer">
    &copy; 2023 Cheva's Market. All rights reserved.
  </footer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import "font-awesome/css/font-awesome.min.css";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./main.ts";

// List of products in different categories
const items = ref([
  // Electronics
  {
    name: "Laptop",
    description: "High-end gaming laptop",
    price: 1200,
    rating: 4,
    stock: 5,
    image:
      "https://asset.msi.com/global/picture/news/2018/nb/ge63-raider-20180110-1.png",
    category: "Electronics",
  },
  {
    name: "Smartphone",
    description: "Latest model smartphone",
    price: 800,
    rating: 5,
    stock: 10,
    image: "https://www.freeiconspng.com/uploads/iphone-x-new-model-13.png",
    category: "Electronics",
  },
  {
    name: "Tablet",
    description: "10-inch Android tablet",
    price: 300,
    rating: 4.5,
    stock: 7,
    image:
      "https://shopposportals.com/cdn/shop/files/Untitleddesign_38_18a6e2ba-473b-4ea6-8c35-438620e6293a.png?v=1683225889",
    category: "Electronics",
  },
  {
    name: "Camera",
    description: "Professional DSLR camera",
    price: 1500,
    rating: 5,
    stock: 3,
    image:
      "https://s7d1.scene7.com/is/image/canon/1483C002_eos-5d-mark-iv_2?$Canon-Responsive$&fmt=png-alpha&wid=675",
    category: "Electronics",
  },
  {
    name: "Headphones",
    description: "Noise-canceling headphones",
    price: 200,
    rating: 5,
    stock: 15,
    image:
      "https://i5.walmartimages.com/seo/Bose-QuietComfort-35-Noise-Cancelling-Bluetooth-Over-Ear-Wireless-Headphones-Black_f9f5c242-e727-4928-826e-fd716a343284_1.397cbacb01e117753e830bb1cd5eed8f.png",
    category: "Electronics",
  },
  {
    name: "Smartwatch",
    description: "Fitness tracking smartwatch",
    price: 150,
    rating: 4.2,
    stock: 20,
    image:
      "https://ss7.vzw.com/is/image/VerizonWireless/fitbit-charge-5-graphite-black-fb421bkbk-iset?$acc-lg$",
    category: "Electronics",
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker",
    price: 80,
    rating: 5,
    stock: 12,
    image: "https://pngimg.com/d/wireless_speaker_PNG45.png",
    category: "Electronics",
  },
  {
    name: "Gaming Console",
    description: "Next-gen gaming console",
    price: 500,
    rating: 5,
    stock: 8,
    image: "https://pngimg.com/uploads/xbox/xbox_PNG101377.png",
    category: "Electronics",
  },

  // Clothing
  {
    name: "T-shirt",
    description: "100% cotton t-shirt",
    price: 20,
    rating: 4,
    stock: 25,
    image:
      "https://customcat.com/wp-content/uploads/2020/11/g500_lightblue_v2_notag.png",
    category: "Clothing",
  },
  {
    name: "Jeans",
    description: "Slim fit jeans",
    price: 45,
    rating: 3,
    stock: 15,
    image: "https://pngimg.com/d/jeans_PNG5753.png",
    category: "Clothing",
  },
  {
    name: "Hoodie",
    description: "Warm and cozy hoodie",
    price: 35,
    rating: 4,
    stock: 20,
    image:
      "https://jbvcreative.com/cdn/shop/products/unisex-champion-tie-dye-hoodie-black-front-6258774d6db8c.png?v=1649964884",
    category: "Clothing",
  },
  {
    name: "Sneakers",
    description: "High-top sneakers",
    price: 60,
    rating: 5,
    stock: 10,
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4eb2208ce72469b2bb3931/1642351978956-SKG2UOTT7LFIRN9H9WIR/mens-high-top-canvas-shoes-white-right-front-61e44d5d0cd2e.png?format=1500w",
    category: "Clothing",
  },
  {
    name: "Dress Shirt",
    description: "Formal dress shirt",
    price: 30,
    rating: 4,
    stock: 18,
    image: "https://freepngimg.com/thumb/categories/1512.png",
    category: "Clothing",
  },
  {
    name: "Skirt",
    description: "A-line skirt",
    price: 25,
    rating: 4,
    stock: 12,
    image: "https://madeinam.us/cdn/shop/products/ALineSkirt.png?v=1669182472",
    category: "Clothing",
  },
  {
    name: "Sweatpants",
    description: "Comfortable sweatpants",
    price: 30,
    rating: 4,
    stock: 15,
    image:
      "https://store.lagunitas.com/cdn/shop/products/SweatPants_679x1200.png?v=1654302073",
    category: "Clothing",
  },

  // Groceries
  {
    name: "Apple",
    description: "Fresh red apples",
    price: 0.5,
    rating: 4,
    stock: 100,
    image:
      "https://static.vecteezy.com/system/resources/previews/009/887/176/original/red-apples-free-png.png",
    category: "Groceries",
  },
  {
    name: "Bread",
    description: "Whole grain bread",
    price: 2,
    rating: 4,
    stock: 20,
    image:
      "https://static.vecteezy.com/system/resources/previews/010/175/168/original/sliced-whole-wheat-bread-cutout-file-png.png",
    category: "Groceries",
  },
  {
    name: "Banana",
    description: "Ripe yellow bananas",
    price: 0.25,
    rating: 4.5,
    stock: 75,
    image:
      "https://static.vecteezy.com/system/resources/previews/013/453/485/original/bunch-of-ripe-yellow-bananas-isolated-on-background-png.png",
    category: "Groceries",
  },
  {
    name: "Milk",
    description: "Fresh cow's milk",
    price: 1.5,
    rating: 3.5,
    stock: 30,
    image: "https://pngimg.com/d/milk_PNG12734.png",
    category: "Groceries",
  },
  {
    name: "Eggs",
    description: "Farm-fresh eggs",
    price: 1.2,
    rating: 4.2,
    stock: 50,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/019/908/317/small/fresh-chicken-eggs-in-woven-bamboo-basket-isolated-with-clipping-path-in-file-format-close-up-with-full-focus-png.png",
    category: "Groceries",
  },
  {
    name: "Basketball",
    description: "Official Size Basketball",
    price: 25,
    rating: 4.5,
    stock: 15,
    image: "https://images.pngnice.com/download/2007/Basketball-PNG.png",
    category: "Sports",
  },
  {
    name: "Yoga Mat",
    description: "Non-Slip Yoga Mat with Carrying Strap",
    price: 20,
    rating: 4.8,
    stock: 20,
    image:
      "https://static.vecteezy.com/system/resources/previews/010/864/659/original/yoga-mat-3d-illustration-free-png.png",
    category: "Sports",
  },
  {
    name: "Tennis Racket",
    description: "High-Quality Tennis Racket",
    price: 60,
    rating: 4.6,
    stock: 10,
    image: "https://purepng.com/public/uploads/large/tennis-racket-76a.png",
    category: "Sports",
  },
  {
    name: "Running Shoes",
    description: "Men's Running Shoes",
    price: 80,
    rating: 4.9,
    stock: 25,
    image: "https://pngimg.com/d/running_shoes_PNG5817.png",
    category: "Sports",
  },
  {
    name: "Soccer Ball",
    description: "Official Size Soccer Ball",
    price: 20,
    rating: 4.7,
    stock: 18,
    image:
      "https://threekingspub.com/wp-content/uploads/2022/11/fifa-soccer-ball.png",
    category: "Sports",
  },
  {
    name: "Gym Dumbbells",
    description: "Set of Heavyweight Dumbbells",
    price: 120,
    rating: 4.4,
    stock: 7,
    image: "https://purepng.com/public/uploads/large/dumbbells-nzl.png",
    category: "Sports",
  },
]);
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
