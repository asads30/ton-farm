<template>
  <main class="!p-0">
    <div class="page relative p-1">
      <div class="profile-card">
        <div class="main-circle-gradient h-11 w-11 p-1">
          <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
        </div>
        <div class="pl-2">
          <p class="text-sm text-white">{{ getUser?.first_name }}</p>
          <p class="font-patsy text-amber-400">Level {{ getUser?.level }}</p>
        </div>
        <div class="ml-auto mr-10">
          <div class="flex items-center font-geist-mono text-blue-400">
            <p>{{ formatBalance(getUser?.balance) }}</p>
            <span class="pl-2 text-xs">TON</span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 py-2">
        <div class="main-action--cyan">
          <img class="w-8" src="@/assets/images/icons/ton-hour.png" />
          <div class="pl-2">
            <p class="text-xs">Income power</p>
            <p class="font-geist-mono font-semibold text-green-300">4.54 TON/h</p>
          </div>
          <div class="bg-shape--cyan"></div>
        </div>
        <div class="main-action--fuchsia">
          <img class="w-6" src="@/assets/images/icons/ton.png" />
          <div class="pl-3">
            <p class="text-xs">Total mined</p>
            <p class="font-geist-mono font-semibold text-blue-400">{{ getUser?.total_mined }}</p>
          </div>
          <div class="bg-shape--fuchsia"></div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-2 gap-y-6 py-2">
        <router-link to="/store">
          <div class="main-action--cyan">
            <div class="text-sm text-blue-400">Level {{ info?.farm?.level }}</div>
            <div class="ml-auto flex items-center">
              <p class="pr-1 font-geist-mono text-green-400">{{ info?.farm?.percent }}%</p>
              <svg class="circle-progress" width="26" height="26">
                <defs>
                  <linearGradient
                    id="gradient"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="24"
                    y2="24"
                  >
                    <stop offset="0%" stop-color="#00ff9f" />
                    <stop offset="100%" stop-color="#3a35ff" />
                  </linearGradient>
                </defs>
                <circle stroke="url(#gradient)" style="--percentage: 56"></circle>
              </svg>
            </div>
          </div>
          <div class="flex justify-center self-end">
            <img class="h-40" src="@/assets/images/sections/shop.png" />
          </div>
        </router-link>
        <router-link to="/power-station">
          <div class="main-action--cyan">
            <div class="text-sm text-blue-400">Level 1</div>
            <div class="ml-auto flex items-center">
              <p class="pr-1 font-geist-mono text-green-400">50%</p>
              <svg class="circle-progress" width="26" height="26">
                <defs>
                  <linearGradient
                    id="gradient"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="24"
                    y2="24"
                  >
                    <stop offset="0%" stop-color="#00ff9f" />
                    <stop offset="100%" stop-color="#3a35ff" />
                  </linearGradient>
                </defs>
                <circle stroke="url(#gradient)" style="--percentage: 50"></circle>
              </svg>
            </div>
          </div>
          <div class="flex justify-center self-end">
            <img class="h-40" src="@/assets/images/sections/power-station.png" />
          </div>
        </router-link>
        <router-link to="/farm">
          <div class="main-action--cyan">
            <div class="text-sm text-blue-400">Level 1</div>
            <div class="ml-auto flex items-center">
              <p class="pr-1 font-geist-mono text-green-400">89%</p>
              <svg class="circle-progress" width="26" height="26">
                <defs>
                  <linearGradient
                    id="gradient"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="24"
                    y2="24"
                  >
                    <stop offset="0%" stop-color="#00ff9f" />
                    <stop offset="100%" stop-color="#3a35ff" />
                  </linearGradient>
                </defs>
                <circle stroke="url(#gradient)" style="--percentage: 89"></circle>
              </svg>
            </div>
          </div>
          <div class="flex justify-center self-center">
            <img class="h-40" src="@/assets/images/sections/farm.png" />
          </div>
        </router-link>
        <router-link to="/workshop">
          <div class="main-action--cyan">
            <div class="text-sm text-blue-400">Level 1</div>
            <div class="ml-auto flex items-center">
              <p class="pr-1 font-geist-mono text-green-400">24%</p>
              <svg class="circle-progress" width="26" height="26">
                <defs>
                  <linearGradient
                    id="gradient"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="24"
                    y2="24"
                  >
                    <stop offset="0%" stop-color="#00ff9f" />
                    <stop offset="100%" stop-color="#3a35ff" />
                  </linearGradient>
                </defs>
                <circle stroke="url(#gradient)" style="--percentage: 24"></circle>
              </svg>
            </div>
          </div>
          <div class="flex justify-center self-center">
            <img class="h-40" src="@/assets/images/sections/workshop.png" />
          </div>
        </router-link>
      </div>
      <img class="home-bg-main" src="@/assets/images/main-bg.jpg" />
    </div>
  </main>
  <Bottombar />
</template>

<script>
import axios from "axios";
import {mapGetters} from 'vuex';
import Bottombar from "@/components/Bottombar.vue";

export default {
  name: "HomeView",
  data() {
    return {
      auth: false,
      info: null
    };
  },
  components: {
    Bottombar,
  },
  computed: {
    ...mapGetters([
      "getUser"
    ])
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.hide();
    tg.expand();
    let data = {
      initData: tg.initData ? tg.initData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
      t: "home",
      a: "get"
    }
    axios.post('https://tonminefarm.com/request', data).then(res => {
      if(res.data.status === 200){
        this.$store.commit("setUser", res?.data?.data?.account);
        this.info = res?.data?.data
      }
    })
    // let data = {
    //   initData: tg.initData
    //     ? tg.initData
    //     : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=8658770349030199811&chat_type=group&auth_date=1727100351&hash=d91cf296306fc57acb4f02bc76ee5621fe91a94f8db5189a4c61932eb2a55bb3",
    //   t: "account",
    //   a: "get_me",
    // };
    // axios.post("https://tonminefarm.com/request", data).then((res) => {
    //   console.log(res);
    //   if (res) {
    //     this.auth = true;
    //   }
    // }).catch(err => {
    //   if(err.data.status === 416){
    //     tg.close()
    //   }
    // });
  },
  methods: {
    formatBalance(value){
      return Number(value).toFixed(2);
    }
  },
};
</script>
