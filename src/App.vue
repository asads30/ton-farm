<template>
  <Preloader :animationData="jsonAnimation" :isLoading="isLoading">
    <router-view />
  </Preloader>
</template>

<script setup>
import Preloader from "@/components/Preloader.vue";
import animationData from "@/assets/animation.json";
import { ref, onMounted } from 'vue';

const isLoading = ref(true);
const jsonAnimation = animationData

onMounted(() => {
  window.onload = () => {
    isLoading.value = false; // Отключаем прелоудер после загрузки всех ресурсов
  };
});
</script>