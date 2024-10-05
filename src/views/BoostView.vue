<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">Boost</h2>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <button
        :class="active === 1 ? 'main-tab-button active' : 'main-tab-button'"
        @click="goActive(1)"
      >
        <span class="text-sm text-white">Farm</span>
      </button>
      <button
        :class="active === 2 ? 'main-tab-button active' : 'main-tab-button'"
        @click="goActive(2)"
      >
        <span class="text-sm text-white">Power station</span>
      </button>
      <button
        :class="active === 3 ? 'main-tab-button active' : 'main-tab-button'"
        @click="goActive(3)"
      >
        <span class="text-sm text-white">Workshop</span>
      </button>
    </div>
    <div :class="active === 1 ? 'block' : 'hidden'">
      <div class="grid grid-cols-2 gap-5 py-4">
        <div class="relative">
          <h5 class="-mb-4 text-center font-patsy text-lg">
            <span class="text-white">Level 1</span> /5
          </h5>
          <div class="w-40 mt-8">
            <img class="w-full" src="@/assets/images/sections/farm-2.png" />
          </div>
          <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
        </div>
        <div class="grid content-center pt-10">
          <div class="flex py-2">
            <img class="h-9 w-9 flex-shrink-0" src="@/assets/images/icons/ton-slate.png" />
            <div class="pl-3">
              <p class="text-xs">Total mined</p>
              <p class="font-geist-mono font-semibold text-cyan-400">
                247 <span class="text-xs">TON</span>
              </p>
            </div>
          </div>
          <div class="main-blue-gradient"></div>
          <div class="flex py-2">
            <img
              class="h-8 w-8 flex-shrink-0 object-contain"
              src="@/assets/images/icons/lightning.png"
            />
            <div class="pl-3">
              <p class="text-xs">Income power</p>
              <p class="font-geist-mono font-semibold text-cyan-400">
                5 units/ <span class="-ml-2 text-xs">hour</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- TAB 2 CONTENT -->
    <div :class="active === 2 ? 'block' : 'hidden'">
      <div class="grid grid-cols-2 gap-5 py-4">
        <div class="relative">
          <h5 class="text-center font-patsy text-lg"><span class="text-white">Level 1</span> /5</h5>
          <div class="w-40 mt-8">
            <img class="w-full" src="@/assets/images/sections/power-station-2.png" />
          </div>
          <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
        </div>
        <div class="grid content-center pt-10">
          <div class="flex items-center pb-2">
            <img
              class="h-7 w-7 flex-shrink-0 object-contain"
              src="@/assets/images/icons/ton-slate.png"
            />
            <div class="pl-3">
              <p class="text-xs">Energy unit price</p>
              <p class="font-geist-mono text-sm font-semibold text-cyan-400">0.1 TON</p>
            </div>
          </div>
          <div class="main-blue-gradient"></div>
          <div class="flex items-center py-2">
            <img
              class="h-6 w-6 flex-shrink-0 object-contain"
              src="@/assets/images/icons/lightning.png"
            />
            <div class="pl-3">
              <p class="text-xs">Income power</p>
              <p class="font-geist-mono text-sm font-semibold text-cyan-400">5 units/hour</p>
            </div>
          </div>
          <div class="main-blue-gradient"></div>
          <div class="flex items-center pt-2">
            <img
              class="h-6 w-6 flex-shrink-0 object-contain"
              src="@/assets/images/icons/debt.png"
            />
            <div class="pl-3">
              <p class="text-xs">Debt</p>
              <p class="font-geist-mono text-sm font-semibold text-red-600">0.43 TON</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- TAB 3 CONTENT -->
    <div :class="active === 3 ? 'block' : 'hidden'">
      <div class="grid grid-cols-2 gap-5 py-4">
        <div class="relative">
          <h5 class="-mb-4 text-center font-patsy text-lg">
            <span class="text-white">Level 1</span> /5
          </h5>
          <div class="w-40 mt-8">
            <img class="w-full" src="@/assets/images/sections/workshop-2.png" />
          </div>
          <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
        </div>
        <div class="grid content-center pt-10">
          <div class="flex items-center pb-2">
            <img
              class="h-6 w-6 flex-shrink-0 object-contain"
              src="@/assets/images/icons/empty-hexagon.png"
            />
            <div class="pl-3">
              <p class="text-xs">Slots available</p>
              <p class="font-geist-mono text-sm font-semibold text-cyan-400">1</p>
            </div>
          </div>
          <div class="main-blue-gradient"></div>
          <div class="flex items-center pt-2">
            <img
              class="h-7 w-7 flex-shrink-0 object-contain"
              src="@/assets/images/icons/filled-hexagon.png"
            />
            <div class="pl-3">
              <p class="text-xs">Slots used</p>
              <p class="font-geist-mono text-sm font-semibold text-cyan-400">1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="linear-border--slate relative mt-10 w-full p-4">
      <router-link
        class="w-full rounded-xl border border-cyan-400/50"
        :class="active === 2 || active === 3 ? 'block' : 'hidden'"
        to="/bill-history"
      >
        <p class="p-3 text-sm text-white">View payments history</p>
      </router-link>
      <div class="my-4 flex items-center gap-5 mb-8">
        <div class="linear-border--slate relative p-3 min-w-32 text-left">
          <p class="text-xs">Building level</p>
          <p class="text-lg">2</p>
        </div>
        <div class="grid min-w-32 flex-1">
          <!-- <div class="flex">
            <div class="text-xs">55%</div>
            <div class="ml-auto text-xs">00:19</div>
          </div>
          <div class="pb-2 pt-1">
            <div class="line-progress" style="--width: 50%"></div>
          </div> -->
          <div class="main-action--green">
            <div class="mx-auto flex items-center text-xs">
              <p class="pr-2 text-white">Level up</p>
              <p class="font-geist-mono font-semibold text-cyan-400">0.43 TON</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-4 flex items-center gap-5">
        <div class="linear-border--slate relative p-3 min-w-32 text-left">
          <p class="text-xs">Building grade</p>
          <p class="text-lg">1</p>
        </div>
        <div class="ml-auto grid min-w-32 flex-1 disable">
          <div class="main-action--green mb-1">
            <div class="mx-auto flex items-center text-xs">
              <p class="pr-2 text-white">Grade up</p>
              <p class="font-geist-mono font-semibold text-cyan-400">0.43 TON</p>
            </div>
          </div>
          <span class="pt-1 text-center text-xs">Building level 12 required</span>
        </div>
      </div>

      <!-- <button disabled class="min-w-32 rounded-lg border border-green-500/40">
        <p class="p-3 text-sm text-white">Upgrade level</p>
      </button> -->
    </div>
  </main>
  <Bottombar />
  <Modal />
</template>

<script>
import Bottombar from "@/components/Bottombar.vue";
import Modal from "@/components/Boost/Modal.vue";

export default {
  name: "BoostView",
  data() {
    return {
      active: 2,
    };
  },
  components: {
    Bottombar,
    Modal,
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.hide();
    if (this.$route?.query?.power == "active") {
      this.active = 2;
    }
  },
  methods: {
    goActive(num) {
      this.active = num;
    },
  },
};
</script>
