<template>
    <button class="main-action--green" :disabled="loading" @click="handleClick">
      <div class="mx-auto flex items-center text-xs">
        <p class="pr-2 text-white">{{ loading ? loadingText : text }}</p>
      </div>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      text: { type: String, default: 'Отправить' },
      loadingText: { type: String, default: 'Загрузка...' },
      loading: { type: Boolean, default: false }
    },
    methods: {
      handleClick() {
        this.$emit('click');
      },
    },
  };
</script>
  
<style scoped>
.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 5px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>