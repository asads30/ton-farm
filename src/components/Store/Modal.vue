<template>
  <section v-if="show" class="modal border-radiant">
    <button class="absolute right-5 top-5" @click="closeModal">
      <img class="w-6" src="@/assets/images/icons/close.png" />
    </button>
    <div class="py-4">
      <template v-if="modalType === 'asics'">
        <div class="pb-1 text-center">
          <h4 class="font-patsy text-lg text-white">
            {{ item?.name }}
            <br />
            <span class="text-sm">{{ item?.model }}</span>
          </h4>
        </div>
        <div class="mx-auto max-w-32">
          <img class="w-full h-32" :src="item?.image" />
        </div>
        <div class="rounded-lg border border-dashed border-cyan-400/65">
          <div class="grid content-center p-3">
            <div class="flex items-center pb-3">
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
                {{ $t("mining-speed") }}
              </div>
              <div class="font-geist-mono text-sm font-bold text-cyan-400">
                {{ utils.formatEnergyPerHour(item?.energy_per_hour) }} {{ $t("units-hour") }}
              </div>
            </div>
          </div>
        </div>
        <div class="pt-3">
          <div class="main-action--green">
            <div class="mx-auto flex items-center py-1 text-sm">
              <p class="pr-2 text-white">{{ $t("buy") }}</p>
              <p class="font-geist-mono font-semibold text-cyan-400">{{ item?.cost }} TON</p>
            </div>
          </div>
        </div>
      </template>
      <template v-if="modalType === 'lootbox'">
        <div class="pb-1 text-center">
          <h4 class="font-patsy text-lg text-white">{{ item?.name }}</h4>
        </div>
        <div class="mx-auto max-w-32 pb-10">
          <img class="w-full h-32" :src="item?.image" />
        </div>
        <div class="rounded-lg border border-dashed border-cyan-400/65">
          <div class="p-2 text-center">
            <div class="pb-1 text-[10px]">
              {{ $t("chance-getting-better-asic") }}
            </div>
            <div class="font-geist-mono text-2xl font-semibold text-cyan-400">25%</div>
          </div>
        </div>
        <div class="main-action--green mt-10">
          <div class="mx-auto flex items-center py-1 text-sm">
            <p class="pr-2 text-white">{{ $t("buy") }}</p>
            <p class="font-geist-mono font-semibold text-cyan-400">{{ item?.cost }} TON</p>
          </div>
        </div>
      </template>
      <template v-if="modalType === 'other'">
        <div class="mx-auto max-w-36 pb-8">
          <img :src="item?.image" />
        </div>
        <div class="rounded-lg border border-dashed border-cyan-400/65">
          <div class="grid content-center p-3" v-if="item?.type == 'UPS'">
            <p class="mx-auto pl-3 text-xs">Обеспечивает беcперебойную работу фермы</p>
          </div>
          <div class="grid content-center p-3" v-else>
            <div class="flex items-center">
              <img
                class="h-8 w-8 flex-shrink-0 object-contain"
                src="@/assets/images/icons/lightning.png"
              />
              <div class="mr-auto pl-3 text-xs">{{ $t("power") }}</div>
              <div class="font-geist-mono text-sm font-bold text-cyan-400">{{ item?.energy }} {{ $t("units") }}</div>
            </div>
          </div>
        </div>
        <div class="pt-6">
          <div class="main-action--green">
            <div class="mx-auto flex items-center py-1 text-sm">
              <p class="pr-2 text-white">{{ $t("buy") }}</p>
              <p class="font-geist-mono font-semibold text-cyan-400">{{ item?.cost }} TON</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
  <div :class="show && 'overlay'"></div>
</template>

<script>
import utils from "@/utils";

export default {
  name: "StoreModal",
  data() {
    return {
      utils,
    };
  },
  props: {
    show: Boolean,
    item: Object,
    modalType: "asics" | "lootbox" | "other" | "inventory",
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
