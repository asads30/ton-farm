<template>
  <section class="modal border-radiant" v-if="show">
    <button class="absolute right-5 top-5" @click="closeModal">
      <img class="w-6" src="@/assets/images/icons/close.png" />
    </button>
    <div class="py-4">
      <div class="pb-1 text-center">
        <h4 class="font-patsy text-lg text-white">{{ item.title }}</h4>
      </div>
      <div class="mx-auto max-w-36 pb-4">
        <img src="@/assets/images/stations/01.png" />
      </div>
      <div class="rounded-lg border border-dashed border-cyan-400/65">
        <div class="grid content-center p-3">
          <div class="flex items-center pb-3">
            <img
              class="h-8 w-8 flex-shrink-0 object-contain"
              src="@/assets/images/icons/ton-hour-slate.png"
            />
            <div class="mr-auto pl-3 text-xs">Mining speed</div>
            <div class="font-geist-mono text-sm font-bold text-cyan-400">0.1 TON/h</div>
          </div>
          <div class="main-blue-gradient"></div>
          <div class="flex items-center pt-3">
            <img
              class="h-8 w-8 flex-shrink-0 object-contain"
              src="@/assets/images/icons/lightning.png"
            />
            <div class="mr-auto pl-3 text-xs">Mining speed</div>
            <div class="font-geist-mono text-sm font-bold text-cyan-400">5 units/h</div>
          </div>
        </div>
      </div>
      <div class="pt-5">
        <div class="flex">
          <div class="text-xs">75%</div>
          <div class="ml-auto text-xs">00:19</div>
        </div>
        <div class="pb-2 pt-1">
          <div class="line-progress" style="--width: 50%"></div>
        </div>
      </div>
      <div class="pt-3">
        <div class="main-action--green">
          <div class="mx-auto flex items-center py-1 text-sm">
            <p class="pr-2 text-white">Boost repair for</p>
            <p class="font-geist-mono font-semibold text-cyan-400">0.43 TON</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "WorkShopModal",
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
