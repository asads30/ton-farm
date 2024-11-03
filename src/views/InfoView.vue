<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("info") }}
      </h2>
    </div>
    <div class="grid gap-2">
      <div class="linear-border--slate relative p-3">
        <div class="pb-3 text-center text-xs">
          {{ $t("your-progress") }}
        </div>
        <div class="absolute left-0 h-[1px] w-full bg-slate-800"></div>
        <div class="flex items-center pt-3">
          <div class="main-circle-gradient mr-2 h-11 w-11 p-1">
            <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
          </div>
          <div class="flex flex-1 pt-2 text-white">
            <p class="mr-auto text-sm">{{ info?.first_name }}</p>
            <p class="font-patsy text-lg">{{ $t("level") }} {{ info?.level }}</p>
          </div>
        </div>
        <router-link to="/leaderboard" class="menu-item mt-2 p-3">
          <div class="flex items-center">
            <img class="mr-3 w-7" src="@/assets/images/icons/leaderboard.png" />
            <p class="mr-auto text-sm text-white">{{ $t("leaderboard") }}</p>
            <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
          </div>
        </router-link>
        <router-link to="/roadmap" class="menu-item mt-2 p-3">
          <div class="flex items-center">
            <img class="mr-3 w-7" src="@/assets/images/icons/road-map.png" />
            <p class="mr-auto text-sm text-white">
              {{$t('roadmap')}}
            </p>
            <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
          </div>
        </router-link>
      </div>
      <!-- <div class="linear-border--slate relative p-3">
        <div class="pb-3 text-center text-xs">
          {{ $t("your-buildings") }}
        </div>
        <div class="absolute left-0 h-[1px] w-full bg-slate-800"></div>
        <div class="py-2">
          <div class="flex items-center py-2">
            <p class="mr-auto font-light text-zinc-300">
              {{ $t("farm") }}
            </p>
            <p class="font-patsy text-lg">{{ $t("level")}} 1</p>
          </div>
          <div class="h-[1px] w-full bg-slate-800"></div>
          <div class="flex items-center py-2">
            <p class="mr-auto font-light text-zinc-300">{{ $t("power-station") }}</p>
            <p class="font-patsy text-lg">{{ $t("level")}} 2</p>
          </div>
          <div class="h-[1px] w-full bg-slate-800"></div>
          <div class="flex items-center py-2">
            <p class="mr-auto font-light text-zinc-300">{{ $t("workshop") }}</p>
            <p class="font-patsy text-lg">{{ $t("level")}} 3</p>
          </div>
          <div class="h-[1px] w-full bg-slate-800"></div>
        </div>

        <button class="menu-item mt-2 p-3">
          <div class="flex items-center">
            <img class="mr-3 w-7" src="@/assets/images/icons/buildings.png" />
            <p class="mr-auto text-sm text-white">My Buildings</p>
            <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
          </div>
        </button>
      </div> -->
      <div class="linear-border--slate relative p-3">
        <router-link to="/language" class="menu-item mt-2 p-2">
          <div class="flex items-center">
            <img class="mr-3 w-8" src="@/assets/images/icons/flag-english.png" />
            <p class="mr-auto text-sm text-white">{{ $t("english") }}</p>
            <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
          </div>
        </router-link>
      </div>
    </div>
  </main>
  <Bottombar />
</template>

<script>
import Bottombar from "@/components/Bottombar.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "InfoView",
  data() {
    return {
      info: null
    }
  },
  components: {
    Bottombar,
  },
  computed: {
    ...mapGetters([
      'getInitData'
    ]),
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.hide();
    if(!this.getInitData){
      this.$store.commit('setInitData', tg?.initData)
    }
    let data = {
      initData: this.getInitData,
      t: "account",
      a: "get_me"
    }
    axios.post("https://tonminefarm.com/request", data).then(res => {
      if(res.data.status == 200){
        this.info = res.data.account
      }
    })
  },
};
</script>
