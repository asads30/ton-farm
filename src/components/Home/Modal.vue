<template>
    <section v-if="show" class="modal border-radiant">
      <div class="py-4">
        <div class="pb-1 text-center">
            <h2 class="welcome-title">Welcome Gift</h2>
            <h4 class="font-patsy text-lg text-white">{{ item?.name }} <br /><span class="text-sm">{{ item?.model }}</span></h4>
          </div>
          <div class="mx-auto max-w-32">
            <img class="w-full h-32" :src="item?.image" />
          </div>
          <div class="rounded-lg border border-dashed border-cyan-400/65">
            <div class="grid content-center p-3">
              <div class="flex items-center pb-3">
                <img
                  class="h-9 w-9 flex-shrink-0 object-contain"
                  src="@/assets/images/icons/ton-slate.svg"
                />
                <div class="mr-auto pl-2 text-xs">
                  {{ $t("home.price") }}
                </div>
                <div class="font-geist-mono text-sm font-bold text-cyan-400">
                  {{ item?.cost }} TON
                </div>
              </div>
              <div class="main-blue-gradient"></div>
              <div class="flex items-center pt-3 pb-3">
                <img
                  class="h-8 w-8 flex-shrink-0 object-contain"
                  src="@/assets/images/icons/ton-hour-slate.png"
                />
                <div class="mr-auto pl-3 text-xs">
                  {{ $t("mining-speed") }}
                </div>
                <div class="font-geist-mono text-sm font-bold text-cyan-400">
                  {{ item?.ton_per_hour }} {{ $t("ton-hour") }}
                </div>
              </div>
              <div class="main-blue-gradient"></div>
              <div class="flex items-center pt-3">
                <img
                  class="h-8 w-8 flex-shrink-0 object-contain"
                  src="@/assets/images/icons/lightning.png"
                />
                <div class="mr-auto pl-3 text-xs">
                  {{ $t("power-consumption") }}
                </div>
                <div class="font-geist-mono text-sm font-bold text-cyan-400">
                  {{ utils.formatEnergyPerHour(item?.energy_per_hour) }} {{ $t("units-hour") }}
                </div>
              </div>
            </div>
          </div>
          <div class="pt-3">
            <button @click="closeModal" class="main-action--green">
              <div class="mx-auto flex items-center py-1 text-sm">
                <p class="pr-2 text-white">{{ $t('home.claim') }}</p>
              </div>
            </button>
        </div>
      </div>
    </section>
    <div :class="show && 'overlay'"></div>
  </template>
  
  <script>
  import utils from "@/utils";

  export default {
    name: "HomeModal",
    data() {
      return {
        utils,
      };
    },
    props: {
      show: Boolean,
      item: Object
    },
    methods: {
      closeModal() {
        this.$emit("close");
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .main-action--green{
    width: 100%;
  }
  .welcome-title{
    font-size: 22px;
    line-height: 22px;
    font-family: PatsySans;
    margin-bottom: 16px;
    background: linear-gradient(180deg, #FFED4C, #FFF7B0, #FFED4C, #FFED4C);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  </style>