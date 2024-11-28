<template>
    <div ref="lottieContainer" class="lottie-animation"></div>
  </template>
  
  <script>
  import lottie from "lottie-web";
  
  export default {
    props: {
      animationData: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      lottie.loadAnimation({
        container: this.$refs.lottieContainer, // Контейнер для анимации
        renderer: "svg", // Использование SVG
        loop: true, // Зацикливание
        autoplay: true, // Автоматическое воспроизведение
        animationData: this.animationData, // JSON-файл с анимацией
      });
    },
  };
  </script>
  
  <style scoped>
  .lottie-animation {
    position: absolute;
    left: 13px;
    top: 6%;
  }
  </style>
  