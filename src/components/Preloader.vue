<template>
    <div v-if="isLoading" class="preloader">
      <div ref="lottieContainer" class="lottie-animation"></div>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </template>
  
  <script>
  import lottie from 'lottie-web';
  
  export default {
    props: {
      animationData: {
        type: Object,
        required: true,
      },
      isLoading: {
        type: Boolean,
        required: true,
      },
    },
    mounted() {
      if (this.isLoading) {
        lottie.loadAnimation({
          container: this.$refs.lottieContainer,
          animationData: this.animationData,
          renderer: 'svg',
          loop: true,
          autoplay: true,
        });
      }
    },
  };
  </script>
  
  <style scoped>
  .preloader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(180deg, #070b18 0%, #03050a 100%);
  }
  .lottie-animation {
    width: 200px;
    height: 200px;
  }
  </style>
  