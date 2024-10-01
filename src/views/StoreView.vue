<template>
    <main>
        <div class="pb-4 text-center">
          <h2 class="font-patsy text-3xl text-cyan-200">Store</h2>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <button :class="active === 1 ? 'main-tab-button active' : 'main-tab-button'" @click="goActive(1)">
            <span class="text-sm text-white">Asics</span>
          </button>
          <button :class="active === 2 ? 'main-tab-button active' : 'main-tab-button'" @click="goActive(2)">
            <span class="text-sm text-white">Loot box</span>
          </button>
          <button :class="active === 3 ? 'main-tab-button active' : 'main-tab-button'" @click="goActive(3)">
            <span class="text-sm text-white">Other</span>
          </button>
        </div>
        <!-- TAB 1 CONTENT -->
        <div :class="active === 1 ? 'block' : 'hidden'">
          <div class="inline-aside-lights my-8">
            <article class="relative px-3 pb-10 pt-6">
              <div class="grid grid-cols-2 gap-5">
                <div class="relative">
                  <h5 class="text-center font-patsy text-lg text-white">
                    ProCore XT-500
                  </h5>
                  <div class="mx-auto h-28 w-28">
                    <img
                      class="h-full w-full object-contain"
                      src="@/assets/images/stations/01.png"
                    />
                  </div>
                  <div
                    class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"
                  ></div>
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
                      <p class="pr-2 text-xs text-white">Buy</p>
                      <p class="font-geist-mono font-semibold text-cyan-400">
                        0.43 TON
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slate-stander"></div>
            </article>
            <article class="relative px-3 pb-10 pt-6">
              <div class="grid grid-cols-2 gap-5">
                <div class="relative">
                  <h5 class="text-center font-patsy text-lg text-white">
                    ProCore XT-500
                  </h5>
                  <div class="mx-auto h-28 w-28">
                    <img
                      class="h-full w-full object-contain"
                      src="@/assets/images/stations/01.png"
                    />
                  </div>
                  <div
                    class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"
                  ></div>
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
                      <p class="pr-2 text-xs text-white">Buy</p>
                      <p class="font-geist-mono font-semibold text-cyan-400">
                        0.43 TON
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slate-stander"></div>
            </article>
            <article class="relative px-3 pb-10 pt-6">
              <div class="grid grid-cols-2 gap-5">
                <div class="relative">
                  <h5 class="text-center font-patsy text-lg text-white">
                    ProCore XT-500
                  </h5>
                  <div class="mx-auto h-28 w-28">
                    <img
                      class="h-full w-full object-contain"
                      src="@/assets/images/stations/01.png"
                    />
                  </div>
                  <div
                    class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"
                  ></div>
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
                      <p class="pr-2 text-xs text-white">Buy</p>
                      <p class="font-geist-mono font-semibold text-cyan-400">
                        0.43 TON
                      </p>
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
          <div class="inline-aside-lights my-8">
            <article class="relative px-3 pb-10 pt-6">
              <div class="grid grid-cols-2 gap-3">
                <div class="relative">
                  <h5 class="text-center font-patsy text-lg text-white">
                    Treasure Vault
                  </h5>
                  <div class="mx-auto h-28 w-28">
                    <img
                      class="h-full w-full object-contain"
                      src="@/assets/images/stations/03.png"
                    />
                  </div>
                  <div
                    class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"
                  ></div>
                </div>
                <div class="grid content-center">
                  <div
                    class="rounded-lg border border-dashed border-cyan-400/65"
                  >
                    <div class="p-2 text-center">
                      <div class="pb-1 text-[10px]">
                        Chance of getting better Asic
                      </div>
                      <div
                        class="font-geist-mono text-2xl font-semibold text-cyan-400"
                      >
                        25%
                      </div>
                    </div>
                  </div>
                  <div class="main-action--green mt-4">
                    <div class="mx-auto flex items-center text-sm">
                      <p class="pr-2 text-xs text-white">Buy</p>
                      <p class="font-geist-mono font-semibold text-cyan-400">
                        0.43 TON
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slate-stander"></div>
            </article>
            <article class="relative px-3 pb-10 pt-6">
              <div class="grid grid-cols-2 gap-3">
                <div class="relative">
                  <h5 class="text-center font-patsy text-lg text-white">
                    Treasure Vault
                  </h5>
                  <div class="mx-auto h-28 w-28">
                    <img
                      class="h-full w-full object-contain"
                      src="@/assets/images/stations/04.png"
                    />
                  </div>
                  <div
                    class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"
                  ></div>
                </div>
                <div class="grid content-center">
                  <div
                    class="rounded-lg border border-dashed border-cyan-400/65"
                  >
                    <div class="p-2 text-center">
                      <div class="pb-1 text-[10px]">
                        Chance of getting better Asic
                      </div>
                      <div
                        class="font-geist-mono text-2xl font-semibold text-cyan-400"
                      >
                        25%
                      </div>
                    </div>
                  </div>
                  <div class="main-action--green mt-4">
                    <div class="mx-auto flex items-center text-sm">
                      <p class="pr-2 text-xs text-white">Buy</p>
                      <p class="font-geist-mono font-semibold text-cyan-400">
                        0.43 TON
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slate-stander"></div>
            </article>
            <article class="relative px-3 pb-10 pt-6">
              <div class="grid grid-cols-2 gap-3">
                <div class="relative">
                  <h5 class="text-center font-patsy text-lg text-white">
                    Treasure Vault
                  </h5>
                  <div class="mx-auto h-28 w-28">
                    <img
                      class="h-full w-full object-contain"
                      src="@/assets/images/stations/05.png"
                    />
                  </div>
                  <div
                    class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"
                  ></div>
                </div>
                <div class="grid content-center">
                  <div
                    class="rounded-lg border border-dashed border-cyan-400/65"
                  >
                    <div class="p-2 text-center">
                      <div class="pb-1 text-[10px]">
                        Chance of getting better Asic
                      </div>
                      <div
                        class="font-geist-mono text-2xl font-semibold text-cyan-400"
                      >
                        25%
                      </div>
                    </div>
                  </div>
                  <div class="main-action--green mt-4">
                    <div class="mx-auto flex items-center text-sm">
                      <p class="pr-2 text-xs text-white">Buy</p>
                      <p class="font-geist-mono font-semibold text-cyan-400">
                        0.43 TON
                      </p>
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
          <div class="inline-aside-lights my-8">
            <article class="relative px-3 pb-10 pt-6">
              <div class="grid grid-cols-2 gap-5">
                <div class="relative">
                  <h5 class="text-center font-patsy text-lg text-white">
                    ProCore XT-500
                  </h5>
                  <div class="mx-auto h-28 w-28">
                    <img
                      class="h-full w-full object-contain"
                      src="@/assets/images/stations/02.png"
                    />
                  </div>
                  <div
                    class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"
                  ></div>
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
                      <p class="font-geist-mono font-semibold text-cyan-400">
                        0.43 TON
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slate-stander"></div>
            </article>
            <article class="relative px-3 pb-10 pt-6">
              <div class="grid grid-cols-2 gap-5">
                <div class="relative">
                  <h5 class="text-center font-patsy text-lg text-white">
                    ProCore XT-500
                  </h5>
                  <div class="mx-auto h-28 w-28">
                    <img
                      class="h-full w-full object-contain"
                      src="@/assets/images/stations/06.png"
                    />
                  </div>
                  <div
                    class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"
                  ></div>
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
                      <p class="font-geist-mono font-semibold text-cyan-400">
                        0.43 TON
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slate-stander"></div>
            </article>
            <article class="relative px-3 pb-10 pt-6">
              <div class="grid grid-cols-2 gap-5">
                <div class="relative">
                  <h5 class="text-center font-patsy text-lg text-white">
                    ProCore XT-500
                  </h5>
                  <div class="mx-auto h-28 w-28">
                    <img
                      class="h-full w-full object-contain"
                      src="@/assets/images/stations/07.png"
                    />
                  </div>
                  <div
                    class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"
                  ></div>
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
                      <p class="font-geist-mono font-semibold text-cyan-400">
                        0.43 TON
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slate-stander"></div>
            </article>
            <article class="relative px-3 pb-10 pt-6">
              <div class="grid grid-cols-2 gap-5">
                <div class="relative">
                  <h5 class="text-center font-patsy text-lg text-white">
                    ProCore XT-500
                  </h5>
                  <div class="mx-auto h-28 w-28">
                    <img
                      class="h-full w-full object-contain"
                      src="@/assets/images/stations/07.png"
                    />
                  </div>
                  <div
                    class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"
                  ></div>
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
                      <p class="font-geist-mono font-semibold text-cyan-400">
                        0.43 TON
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slate-stander"></div>
            </article>
            <article class="relative px-3 pb-10 pt-6">
              <div class="grid grid-cols-2 gap-5">
                <div class="relative">
                  <h5 class="text-center font-patsy text-lg text-white">
                    ProCore XT-500
                  </h5>
                  <div class="mx-auto h-28 w-28">
                    <img
                      class="h-full w-full object-contain"
                      src="@/assets/images/stations/07.png"
                    />
                  </div>
                  <div
                    class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"
                  ></div>
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
                      <p class="font-geist-mono font-semibold text-cyan-400">
                        0.43 TON
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slate-stander"></div>
            </article>
          </div>
        </div>
    </main>
</template>

<script>
export default {
  name: 'StoreView',
  data() {
    return {
      active: 1
    }
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent('backButtonClicked', this.goHome);
  },
  methods: {
    goHome(){
      this.$router.push('/')
    },
    goActive(num){
      this.active = num
    }
  },
}
</script>