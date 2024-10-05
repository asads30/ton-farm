<template>
  <main class="flex flex-col">
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-cyan-200">Spin the wheel</h2>
    </div>
    <div class="inline-aside-lights flex-1 flex flex-col">
      <div class="relative overflow-hidden flex-1">
        <img class="position-center-y scale-110" src="@/assets/images/spin-bg.png" />
        <div
          class="position-center-y"
          :class="{ clicked }"
          :style="`--rotation-duration: ${rotationDuration}ms`"
        >
          <div class="spin-items">
            <img
              v-for="(item, index) in images"
              :style="`
              transform: rotate(${
                30 + (index * 360) / images.length
              }deg) translate(110px) rotate(-${(index * 360) / images.length}deg)`"
              src="@/assets/images/stations/03.png"
            />
          </div>
          <img class="aspect-square" src="@/assets/images/wheel-fortune.png" />
        </div>
        <img class="position-center-x z-10 w-8" src="@/assets/images/icons/pointer.png" />
      </div>
      <div class="mb-10">
        <div class="main-action--green mx-5" @click="rotation">
          <div class="mx-auto flex items-center py-1 text-sm">
            <p class="pr-2 text-white">Spin the wheel</p>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Modal />
</template>

<script>
import Modal from '@/components/Spin/Modal.vue'

export default {
  data() {
    return {
      images: Array.from({ length: 3 }),
      clicked: false,
      rotationDuration: 500,
    };
  },
  components: {
    Modal
  },
  methods: {
    rotation() {
      this.clicked = !this.clicked;
      setTimeout(() => (this.clicked = !this.clicked), this.rotationDuration);
    },
  },
};
</script>

<style>
.clicked {
  transform: rotate(360deg);
  transition: transform var(--rotation-duration) ease-in-out;
}
</style>
