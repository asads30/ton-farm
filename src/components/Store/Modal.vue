<template>
  <section v-if="show" class="modal border-radiant">
    <button class="absolute right-5 top-5" @click="closeModal">
      <img class="w-6" src="@/assets/images/icons/close.png" />
    </button>
    <div class="py-4">
      <div class="mx-auto max-w-36 pb-8">
        <img src="@/assets/images/stations/02.png" />
      </div>
      <div class="rounded-lg border border-dashed border-cyan-400/65">
        <div class="grid content-center p-3">
          <div class="flex items-center">
            <img
              class="h-8 w-8 flex-shrink-0 object-contain"
              src="@/assets/images/icons/lightning.png"
            />
            <div class="mr-auto pl-3 text-xs">Power</div>
            <div class="font-geist-mono text-sm font-bold text-cyan-400">2 units</div>
          </div>
        </div>
      </div>
      <div class="pt-6">
        <div class="main-action--green">
          <div class="mx-auto flex items-center py-1 text-sm">
            <p class="pr-2 text-white">Repair</p>
            <p class="font-geist-mono font-semibold text-cyan-400">0.43 TON</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "StoreModal",
  props: {
    show: Boolean,
    item: Object,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
