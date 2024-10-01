<template>
    <main>
        <div class="pb-4 text-center">
          <h2 class="font-patsy text-3xl text-white">Power station</h2>
        </div>
        <div class="grid grid-cols-2 gap-5 py-6">
          <div class="relative">
            <h5 class="-mb-4 text-center font-patsy text-lg">
              <span class="text-white">Level 1</span> /5
            </h5>
            <div class="max-w-40">
              <img class="w-full" src="@/assets/images/sections/power-station-2.png" />
            </div>
            <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
          </div>
          <div class="grid content-center pt-10">
            <div class="flex items-center pb-2">
              <img
                class="h-6 w-6 flex-shrink-0 object-contain"
                src="@/assets/images/icons/ton-slate.png"
              />
              <div class="pl-3">
                <p class="text-xs">Energy unit price</p>
                <p class="font-geist-mono text-sm font-semibold text-cyan-400">
                  0.1 TON
                </p>
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
                <p class="font-geist-mono text-sm font-semibold text-cyan-400">
                  5 units/hour
                </p>
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
                <p class="font-geist-mono text-sm font-semibold text-red-600">
                  0.43 TON
                </p>
              </div>
            </div>
            <div class="main-action--green mt-4">
              <div class="mx-auto flex items-center text-sm" @click="goMoreInfo">
                <p class="pr-2 text-white">More info</p>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-1 py-2">
          <article class="figure-shape">
            <img
              class="figure-shape--bg"
              src="@/assets/images/shapes/decagon-empty.png"
            />
          </article>
          <article class="figure-shape">
            <img
              class="aboslute position-center w-3/4"
              src="@/assets/images/stations/02.png"
            />
            <div class="bg-shape-radial--fuchsia h-3/4 w-3/4 blur-sm"></div>
            <img
              class="figure-shape--bg"
              src="@/assets/images/shapes/decagon-with-item.png"
            />
          </article>
          <article class="figure-shape">
            <div class="position-center">
              <img
                class="mx-auto mb-1 block w-8"
                src="@/assets/images/icons/lock-fuchsia.png"
              />
              <p class="pl-1 font-patsy text-sm text-rose-400">Locked</p>
            </div>
            <img
              class="figure-shape--bg"
              src="@/assets/images/shapes/decagon-locked.png"
            />
          </article>
          <article class="figure-shape">
            <div class="position-center">
              <img
                class="mx-auto mb-1 block w-8"
                src="@/assets/images/icons/lock-fuchsia.png"
              />
              <p class="pl-1 font-patsy text-sm text-rose-400">Locked</p>
            </div>
            <img
              class="figure-shape--bg"
              src="@/assets/images/shapes/decagon-locked.png"
            />
          </article>
          <article class="figure-shape">
            <div class="position-center">
              <img
                class="mx-auto mb-1 block w-8"
                src="@/assets/images/icons/lock-fuchsia.png"
              />
              <p class="pl-1 font-patsy text-sm text-rose-400">Locked</p>
            </div>
            <img
              class="figure-shape--bg"
              src="@/assets/images/shapes/decagon-locked.png"
            />
          </article>
          <article class="figure-shape">
            <div class="position-center">
              <img
                class="mx-auto mb-1 block w-8"
                src="@/assets/images/icons/lock-fuchsia.png"
              />
              <p class="pl-1 font-patsy text-sm text-rose-400">Locked</p>
            </div>
            <img
              class="figure-shape--bg"
              src="@/assets/images/shapes/decagon-locked.png"
            />
          </article>
        </div>
    </main>
</template>

<script>
export default {
  name: 'PowerStationView',
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent('backButtonClicked', this.goHome);
  },
  methods: {
    goHome(){
      this.$router.push('/')
    },
    goMoreInfo(){
      this.$router.push({ name: 'boost', query: {power: 'active' }})
    }
  },
}
</script>