<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">Info</h2>
    </div>
    <div class="grid gap-2">
      <div class="linear-border--slate relative p-3">
        <div class="pb-3 text-center text-xs">Your progress</div>
        <div class="absolute left-0 h-[1px] w-full bg-slate-800"></div>
        <div class="flex items-center pt-3">
          <div class="main-circle-gradient mr-2 h-11 w-11 p-1">
            <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
          </div>
          <div class="flex flex-1 pt-2 text-white">
            <p class="mr-auto text-sm">Nick Jay</p>
            <p class="font-patsy text-lg">Level 8</p>
          </div>
        </div>
        <router-link to="/leaderboard" class="menu-item mt-2 p-3">
          <div class="flex items-center">
            <img class="mr-3 w-7" src="@/assets/images/icons/leaderboard.png" />
            <p class="mr-auto text-sm text-white">Leaderboard</p>
            <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
          </div>
        </router-link>
        <button class="menu-item mt-2 p-3">
          <div class="flex items-center">
            <img class="mr-3 w-7" src="@/assets/images/icons/road-map.png" />
            <p class="mr-auto text-sm text-white">Roadmap</p>
            <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
          </div>
        </button>
      </div>
      <div class="linear-border--slate relative p-3">
        <div class="pb-3 text-center text-xs">Your buildings</div>
        <div class="absolute left-0 h-[1px] w-full bg-slate-800"></div>
        <div class="py-2">
          <div class="flex items-center py-2">
            <p class="mr-auto font-light text-zinc-300">Farm</p>
            <p class="font-patsy text-lg">Level 1</p>
          </div>
          <div class="h-[1px] w-full bg-slate-800"></div>
          <div class="flex items-center py-2">
            <p class="mr-auto font-light text-zinc-300">Power Station</p>
            <p class="font-patsy text-lg">Level 2</p>
          </div>
          <div class="h-[1px] w-full bg-slate-800"></div>
          <div class="flex items-center py-2">
            <p class="mr-auto font-light text-zinc-300">Workshop</p>
            <p class="font-patsy text-lg">Level 3</p>
          </div>
          <div class="h-[1px] w-full bg-slate-800"></div>
        </div>
        <!-- <button class="menu-item mt-2 p-3">
          <div class="flex items-center">
            <img class="mr-3 w-7" src="@/assets/images/icons/buildings.png" />
            <p class="mr-auto text-sm text-white">My Buildings</p>
            <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
          </div>
        </button> -->
      </div>
    </div>
  </main>
  <Bottombar />
</template>

<script>
import Bottombar from "@/components/Bottombar.vue";

export default {
  name: "InfoView",
  components: {
    Bottombar,
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.hide();
  },
};
</script>
