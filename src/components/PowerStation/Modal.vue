<template>
    <section v-if="show" class="modal border-radiant">
      <button class="absolute right-5 top-5" @click="closeModal">
        <img class="w-6" src="@/assets/images/icons/close.png" />
      </button>
      <div class="py-4">
        
        <div class="py-4" v-if="variant == 1">
            <img
            class="mx-auto mb-5 w-28"
            src="@/assets/images/icons/light-document.png"
            />
            <div class="mb-10 py-4 text-center">
            <div class="mb-3 text-sm text-slate-400">
            {{ $t("current-electricity-debt") }}
            </div>
            <div class="font-geist-mono text-2xl font-bold text-red-500/90">
                {{ summ }} TON
            </div>
            </div>
        </div>
        <div class="py-4" v-if="variant == 2">
            <img class="mx-auto mb-5 w-28" src="@/assets/images/icons/arrows-upto.png" />
            <div class="mb-10 py-4 text-center">
            <div class="mb-3 text-sm text-slate-400">{{ $t("upgrade-to-level", { lvl: level }) }}</div>
            <div class="font-geist-mono text-2xl font-bold text-blue-400">{{ summ }} TON</div>
            </div>
        </div>
        <div class="main-action--green mt-5">
          <div class="mx-auto flex items-center py-1 text-sm">
            <p class="pr-2 text-white">{{ $t("pay") }}</p>
            <p class="font-geist-mono font-semibold text-cyan-400">{{ summ }} TON</p>
          </div>
        </div>
      </div>
    </section>
    <div :class="show && 'overlay'"></div>
  </template>
  
  <script>
  export default {
    name: "PowerStationModal",
    props: {
      show: Boolean,
      summ: Number,
      variant: Number,
      level: Number
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
    },
  };
  </script>
  