<template>
  <main class="!p-0">
    <!-- <div class="sticky top-0 z-20 px-1 pt-2"> -->
    <!-- bg-gray-950 -->
    <div class="py-2 text-center">
      <h2 class="font-patsy text-3xl text-cyan-200">Store</h2>
    </div>
    <div class="grid grid-cols-4 gap-2">
      <button
        :class="active === 1 ? 'main-tab-button active' : 'main-tab-button'"
        @click="goActive(1)"
      >
        <span class="text-sm text-white">Asics</span>
      </button>
      <button
        :class="active === 2 ? 'main-tab-button active' : 'main-tab-button'"
        @click="goActive(2)"
      >
        <span class="text-sm text-white">Loot box</span>
      </button>
      <button
        :class="active === 3 ? 'main-tab-button active' : 'main-tab-button'"
        @click="goActive(3)"
      >
        <span class="text-sm text-white">Other</span>
      </button>
      <button
        :class="active === 4 ? 'main-tab-button active' : 'main-tab-button'"
        @click="goActive(4)"
      >
        <span class="text-sm text-white">Inventory</span>
      </button>
    </div>
    <!-- </div> -->
    <div class="p-1 my-6">
      <!-- TAB 1 CONTENT -->
      <div :class="active === 1 ? 'block' : 'hidden'">
        <div class="inline-aside-lights">
          <article class="relative px-3 pb-10 pt-6" v-for="asic in info?.asics" :key="asic?.id">
            <div class="grid grid-cols-2 gap-5">
              <div class="relative">
                <h5 class="text-center font-patsy text-lg text-white">{{ asic?.name }}</h5>
                <div class="mx-auto h-28 w-28">
                  <img class="h-full w-full object-contain" :src="asic?.image" />
                </div>
                <div class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"></div>
              </div>
              <div class="grid content-center">
                <div class="flex pb-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/ton-hour-slate.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">Total mined</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      {{ asic?.ton_per_hour }} <span class="text-xs">TON/h</span>
                    </p>
                  </div>
                </div>
                <div class="main-blue-gradient"></div>
                <div class="flex items-center pt-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/lightning.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">Mining speed</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      {{ formatEnergyPerHour(asic?.energy_per_hour) }} units/ <span class="-ml-2 text-xs">hour</span>
                    </p>
                  </div>
                </div>
                <div class="main-action--green mt-4">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="pr-2 text-xs text-white">Buy</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">{{ asic?.cost }} TON</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="slate-stander"></div>
          </article>
        </div>
      </div>
      <!-- TAB 2 CONTENT -->
      <div :class="active === 2 ? 'block' : 'hidden'">
        <div class="inline-aside-lights">
          <article class="relative px-3 pb-10 pt-6" v-for="lootbox in info?.loot_boxes" :key="lootbox.id">
            <div class="grid grid-cols-2 gap-3">
              <div class="relative">
                <h5 class="text-center font-patsy text-lg text-white">{{ lootbox?.name }}</h5>
                <div class="mx-auto h-28 w-28">
                  <img class="h-full w-full object-contain" :src="lootbox?.image" />
                </div>
                <div class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"></div>
              </div>
              <div class="grid content-center">
                <div class="rounded-lg border border-dashed border-cyan-400/65">
                  <div class="p-2 text-center">
                    <div class="pb-1 text-[10px]">Chance of getting better Asic</div>
                    <div class="font-geist-mono text-2xl font-semibold text-cyan-400">25%</div>
                  </div>
                </div>
                <div class="main-action--green mt-4">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="pr-2 text-xs text-white">Buy</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">{{ lootbox?.cost }} TON</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="slate-stander"></div>
          </article>
        </div>
      </div>
      <!-- TAB 3 CONTENT -->
      <div :class="active === 3 ? 'block' : 'hidden'">
        <div class="inline-aside-lights">
          <article class="relative px-3 pb-10 pt-6">
            <div class="grid grid-cols-2 gap-5">
              <div class="relative">
                <h5 class="text-center font-patsy text-lg text-white">ProCore XT-500</h5>
                <div class="mx-auto h-28 w-28">
                  <img class="h-full w-full object-contain" src="@/assets/images/stations/02.png" />
                </div>
                <div class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"></div>
              </div>
              <div class="grid content-center">
                <div class="flex pb-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/power-consumption.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">Total mined</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      0.1 <span class="text-xs">TON/h</span>
                    </p>
                  </div>
                </div>
                <div class="main-action--green mt-4">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="pr-2 text-xs text-white">Buy</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">0.43 TON</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="slate-stander"></div>
          </article>
          <article class="relative px-3 pb-10 pt-6">
            <div class="grid grid-cols-2 gap-5">
              <div class="relative">
                <h5 class="text-center font-patsy text-lg text-white">ProCore XT-500</h5>
                <div class="mx-auto h-28 w-28">
                  <img class="h-full w-full object-contain" src="@/assets/images/stations/06.png" />
                </div>
                <div class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"></div>
              </div>
              <div class="grid content-center">
                <div class="flex pb-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/power-consumption.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">Total mined</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      0.1 <span class="text-xs">TON/h</span>
                    </p>
                  </div>
                </div>
                <div class="main-action--green mt-4">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="pr-2 text-xs text-white">Buy</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">0.43 TON</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="slate-stander"></div>
          </article>
          <article class="relative px-3 pb-10 pt-6">
            <div class="grid grid-cols-2 gap-5">
              <div class="relative">
                <h5 class="text-center font-patsy text-lg text-white">ProCore XT-500</h5>
                <div class="mx-auto h-28 w-28">
                  <img class="h-full w-full object-contain" src="@/assets/images/stations/07.png" />
                </div>
                <div class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"></div>
              </div>
              <div class="grid content-center">
                <div class="flex pb-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/power-consumption.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">Total mined</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      0.1 <span class="text-xs">TON/h</span>
                    </p>
                  </div>
                </div>
                <div class="main-action--green mt-4">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="pr-2 text-xs text-white">Buy</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">0.43 TON</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="slate-stander"></div>
          </article>
          <article class="relative px-3 pb-10 pt-6">
            <div class="grid grid-cols-2 gap-5">
              <div class="relative">
                <h5 class="text-center font-patsy text-lg text-white">ProCore XT-500</h5>
                <div class="mx-auto h-28 w-28">
                  <img class="h-full w-full object-contain" src="@/assets/images/stations/07.png" />
                </div>
                <div class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"></div>
              </div>
              <div class="grid content-center">
                <div class="flex pb-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/power-consumption.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">Total mined</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      0.1 <span class="text-xs">TON/h</span>
                    </p>
                  </div>
                </div>
                <div class="main-action--green mt-4">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="pr-2 text-xs text-white">Buy</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">0.43 TON</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="slate-stander"></div>
          </article>
          <article class="relative px-3 pb-10 pt-6">
            <div class="grid grid-cols-2 gap-5">
              <div class="relative">
                <h5 class="text-center font-patsy text-lg text-white">ProCore XT-500</h5>
                <div class="mx-auto h-28 w-28">
                  <img class="h-full w-full object-contain" src="@/assets/images/stations/07.png" />
                </div>
                <div class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"></div>
              </div>
              <div class="grid content-center">
                <div class="flex pb-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/power-consumption.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">Total mined</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      0.1 <span class="text-xs">TON/h</span>
                    </p>
                  </div>
                </div>
                <div class="main-action--green mt-4">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="pr-2 text-xs text-white">Buy</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">0.43 TON</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="slate-stander"></div>
          </article>
        </div>
      </div>
      <!-- TAB 4 CONTENT -->
      <div :class="active === 4 ? 'block' : 'hidden'">
        <div class="inline-aside-lights">
          <article class="relative px-3 pb-10 pt-6">
            <div class="grid grid-cols-2 gap-5">
              <div class="relative">
                <h5 class="text-center font-patsy text-lg text-white">NanoGrid Q9</h5>
                <p class="text-green-500 font-geist-mono text-xs text-center py-1">Active</p>
                <div class="mx-auto h-28 w-28">
                  <img class="h-full w-full object-contain" src="@/assets/images/stations/09.png" />
                </div>
                <div class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"></div>
              </div>
              <div class="grid content-center">
                <div class="flex pb-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/ton-hour-slate.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">Total mined</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      0.1 <span class="text-xs">TON/h</span>
                    </p>
                  </div>
                </div>
                <div class="main-blue-gradient"></div>
                <div class="flex items-center pt-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/lightning.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">Mining speed</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      5 units/ <span class="-ml-2 text-xs">hour</span>
                    </p>
                  </div>
                </div>
                <div class="main-action--amber mt-4">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="text-white">Deactivate</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="slate-stander"></div>
          </article>
          <article class="relative px-3 pb-10 pt-6">
            <div class="grid grid-cols-2 gap-5">
              <div class="relative">
                <h5 class="text-center font-patsy text-lg text-white">NanoGrid Q9</h5>
                <p class="font-geist-mono text-xs text-center py-1">Inactive</p>
                <div class="mx-auto h-28 w-28">
                  <img class="h-full w-full object-contain" src="@/assets/images/stations/10.png" />
                </div>
                <div class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"></div>
              </div>
              <div class="grid content-center">
                <div class="flex pb-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/ton-hour-slate.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">Total mined</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      0.1 <span class="text-xs">TON/h</span>
                    </p>
                  </div>
                </div>
                <div class="main-blue-gradient"></div>
                <div class="flex items-center pt-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/lightning.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">Mining speed</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      5 units/ <span class="-ml-2 text-xs">hour</span>
                    </p>
                  </div>
                </div>
                <div class="main-action--green mt-4">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="text-white">Activate</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="slate-stander"></div>
          </article>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Modal from "@/components/Store/Modal.vue";
import axios from 'axios'

export default {
  name: "StoreView",
  data() {
    return {
      active: 1,
      info: null
    };
  },
  components: {
    Modal,
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.expand();
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goHome);
    let data = {
      initData: tg.initData
        ? tg.initData
        : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
      t: "shop",
      a: "get",
    };
    axios.post("https://tonminefarm.com/request", data).then((res) => {
      if (res.data.status === 200) {
        this.info = res?.data?.data;
      }
    });
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goActive(num) {
      this.active = num;
    },
    formatEnergyPerHour(value) {
      return Math.floor(value);
    }
  },
};
</script>
