<template>
  <Preloader :animationData="jsonAnimation" :isLoading="isLoading">
    <div v-if="!isLoading">
      <main class="!p-0 home">
        <div class="relative flex flex-col h-full">
          <div class="p-1">
            <div class="profile-card">
              <div class="main-circle-gradient h-11 w-11 p-1">
                <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
              </div>
              <div class="pl-2 text-sm">
                <p class="text-sm text-white">{{ info?.account?.first_name }}</p>
                <p class="font-patsy text-amber-400">
                  {{ $t("level") }} {{ info?.account?.level }}
                </p>
              </div>
              <div class="ml-auto mr-10">
                <div class="flex items-center font-geist-mono text-blue-400">
                  <p>{{ formatBalance(info?.account?.balance) }}</p>
                  <span class="pl-2 text-xs">TON</span>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 py-2">
              <div class="main-action--cyan">
                <img class="w-8" src="@/assets/images/icons/ton-hour.png" />
                <div class="pl-2">
                  <p class="text-xs">{{ $t("income-power") }}</p>
                  <p class="font-geist-mono font-semibold text-green-300">
                    {{ info?.account?.ups }} TON/h
                  </p>
                </div>
                <div class="bg-shape--cyan"></div>
              </div>
              <div class="main-action--fuchsia">
                <img class="w-6" src="@/assets/images/icons/ton.png" />
                <div class="pl-3">
                  <p class="text-xs">
                    {{ $t("total-mined") }}
                  </p>
                  <p class="font-geist-mono font-semibold text-blue-400">
                    {{ info?.account?.total_mined }} TON
                  </p>
                </div>
                <div class="bg-shape--fuchsia"></div>
              </div>
            </div>
          </div>
          <div class="home-box">
            <router-link to="/store" class="home-item">
              <img src="@/assets/images/main1.png" alt="">
            </router-link>
            <router-link to="/power-station" class="home-item">
              <img src="@/assets/images/main2.png" alt="">
              <div class="home-item-info">
                <div class="home-item-label">{{ $t("level") }} {{ info?.powerstation?.level }}</div>
                <div class="home-item-label">{{ $t("grade") }} {{ info?.powerstation?.grade }}</div>
              </div>
            </router-link>
            <div class="home-center">
              <img src="@/assets/images/main3.png" alt="">
            </div>
            <router-link to="/" class="home-item">
              <img src="@/assets/images/main4.png" alt="">
              <div class="home-item-info home-item-info2">
                <div class="home-item-label">{{ $t("level") }} {{ info?.farm?.level }}</div>
                <div class="home-item-label">{{ $t("grade") }} {{ info?.farm?.grade?.level }}</div>
              </div>
            </router-link>
            <div class="home-item">
              <img src="@/assets/images/main5.png" alt="">
              <div class="home-item-info">
                <div class="home-item-label">{{ $t("level") }} {{ info?.workshop?.level }}</div>
                <div class="home-item-label">{{ $t("grade") }} {{ info?.workshop?.grade }}</div>
              </div>
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
      </main>
      <Bottombar />
    </div>
  </Preloader>
</template>

<script>
import axios from "axios";
import Bottombar from "@/components/Bottombar.vue";
import Preloader from "@/components/Preloader.vue";
import animationData from "@/assets/animation.json";

export default {
  name: "HomeView",
  data() {
    return {
      info: null,
      isLoading: true,
      jsonAnimation: animationData,
    };
  },
  components: {
    Bottombar,
    Preloader,
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.hide();
    tg.expand();
    if(tg?.initData){
      this.$store.commit('setInitData', tg.initData)
    } else{
      let initData = 'user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4'
      this.$store.commit('setInitData', initData)
    }
    let data = {
      initData: tg.initData ? tg.initData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
      t: "home",
      a: "get",
    };
    try {
      axios.post("https://tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.info = res?.data?.data;
          this.$i18n.locale = res?.data?.data?.account?.lang
        }
      });
    } catch (error) {
      console.error("Error fetching API data:", error);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    formatBalance(value) {
      return Number(value).toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  background: url("@/assets/images/main_bg.jpg") 100% no-repeat;
  background-size: cover;
  min-height: 100vh;
  max-height: 200vh;
  overflow-y: scroll;
  &-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
  &-item{
    width: 157px;
    height: 178px;
    position: relative;
    img{
      height: 100%;
    }
    &-info{
      background: rgba(0, 0, 0, 0.6);
      height: 46px;
      position: absolute;
      bottom: 0;
      right: 0;
      border: 1px solid rgba(11, 197, 255, 0.5);
      border-radius: 10px;
      padding: 4px 8px;
      text-align: center;
      backdrop-filter: blur(7px)
    }
    &-info2{
      left: 0;
      right: auto;
    }
    &-label{
      color: rgba(85, 192, 253, 1);
      font-size: 14px;
      line-height: 18px;
    }
  }
  &-center{
    width: 100%;
    display: flex;
    justify-content: center;
    img{
      width: 130px;
      height: 144px;
      filter: grayscale(1);
    }
  }
}
</style>
