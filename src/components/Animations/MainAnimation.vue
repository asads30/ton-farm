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
    left: 0;
    top: 0px;
    z-index: 5;
    width: 100%;
    height: 100%;
  }
  </style>