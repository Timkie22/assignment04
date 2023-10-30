<template>
  <div class="sports-item">
    <div class="image-wrapper">
      <img :src="item.image" :alt="item.name" />
    </div>
    <div class="info-wrapper">
      <p>
        <b>{{ item.name }}: </b>{{ item.description }}<br />
        <span v-for="n in 5" :key="n">
          <i
            class="fa"
            :class="['fa-star', n <= item.rating ? '' : 'fa-star-o']"
            >&nbsp;</i
          >
        </span>
      </p>
      <p>${{ item.price.toFixed(2) }}<br />{{ item.stock }} in stock.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { item } = defineProps(["item"]);
</script>

<style scoped>
.sports-item {
  border: 1px solid #ccc;
  padding: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.sports-item:hover {
  border-color: #ff9900;
  box-shadow: 0 0 10px rgba(255, 140, 0, 0.5);
}

.image-wrapper {
  width: 100%;
  padding-top: 100%;
  position: relative;
  overflow: hidden;
}

.sports-item img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.info-wrapper {
  color: white;
}
</style>
