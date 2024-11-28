<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("info.title") }}
      </h2>
    </div>
    <div class="grid gap-2">
      <div class="linear-border--slate relative p-3">
        <div class="flex items-center">
          <div class="main-circle-gradient mr-2 h-11 w-11 p-1">
            <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
          </div>
          <div class="flex flex-1 pt-2 text-white">
            <p class="mr-auto text-sm">{{ info?.first_name }}</p>
            <p class="font-patsy text-lg">#{{ info?.level }}</p>
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
              {{$t('roadmap.title')}}
            </p>
            <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
          </div>
        </router-link>
        <a href="https://t.me/TonFarm4at" class="menu-item mt-2 p-3">
          <div class="flex items-center">
            <img class="mr-3 w-7" src="@/assets/images/telegram.png" />
            <p class="mr-auto text-sm text-white">{{ $t("info.telegram-group") }}</p>
            <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
          </div>
        </a>
        <a href="https://t.me/tonfarm_official" class="menu-item mt-2 p-3">
          <div class="flex items-center">
            <img class="mr-3 w-7" src="@/assets/images/telegram.png" />
            <p class="mr-auto text-sm text-white">{{ $t("info.telegram-channel") }}</p>
            <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
          </div>
        </a>
      </div>
      <div class="linear-border--slate relative p-3">
        <router-link to="/language" class="menu-item p-2">
          <div class="flex items-center">
            <img class="mr-3 w-8" src="@/assets/images/icons/flag-english.png" v-if="getUser?.lang == 'en'" />
            <img class="mr-3 w-8" src="@/assets/images/icons/flag-russian.png" v-else />
            <p class="mr-auto text-sm text-white" v-if="getUser?.lang == 'en'">{{ $t("english") }}</p>
            <p class="mr-auto text-sm text-white" v-else>{{ $t("russian") }}</p>
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
      info: null,
      loading: false,
      responseData: null
    }
  },
  components: {
    Bottombar
  },
  computed: {
    ...mapGetters([
      'getInitData',
      'getUser'
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
    axios.post("https://api.tonminefarm.com/request", data).then(res => {
      if(res.data.status == 200){
        this.info = res.data.account
      } else{
        this.toast.error(res.data.status_text);
      }
    })
  }
};
</script>
