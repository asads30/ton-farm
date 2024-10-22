<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <button class="absolute right-5 top-5" @click="close">
                <img class="w-6" src="@/assets/images/icons/close.png" />
            </button>
            <slot></slot>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true
      }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
  };
  </script>
  
  <style scoped lang="scss">
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    padding: 0 20px;
  }
  
  .modal-content {
    background: var(--main-gradient);
    transition: var(--main-transition);
    padding: 40px 20px 30px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    max-width: 100%;
    width: 100%;
    text-align: center;
    position: relative;
  }
  </style>
  