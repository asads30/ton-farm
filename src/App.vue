<template>
    <router-view />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

onMounted(() => {
  window.onload = () => {
    isLoading.value = false; // Отключаем прелоудер после загрузки всех ресурсов
  };
});
</script>