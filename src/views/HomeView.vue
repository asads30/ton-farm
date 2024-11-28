<template>
  <Loader :isLoading="isLoading" />
  <div class="homepage">
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
                #{{ info?.account?.level }}
                </p>
            </div>
            <div class="profile-anime">
              <img src="@/assets/images/profile-line.png" alt="">
              <ProfileEmpty :animationData="lottieJson" />
            </div>
            <div class="ml-auto mr-6">
                <div class="flex items-center font-geist-mono text-blue-400">
                <p>{{ info?.account?.balance }}</p>
                <span class="pl-2 text-xs">TON</span>
                </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 py-2 main-anim">
            <div class="main-action--cyan">
              <img class="w-8" src="@/assets/images/icons/ton-hour.png" />
              <div class="pl-2">
                <p class="text-xs">{{ $t("income-power") }}</p>
                <p class="font-geist-mono font-semibold text-green-300">
                  {{ info?.account?.income_power }} TON/h
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
            <img :src="info?.powerstation?.grade?.image" @load="onImageLoad" alt="">
            <div class="home-item-info">
              <div class="home-item-label">{{ $t("level") }} {{ info?.powerstation?.level?.level }}</div>
              <div class="home-item-label">{{ $t("grade") }} {{ info?.powerstation?.grade?.level }}</div>
            </div>
          </router-link>
          <div class="home-center">
            <div class="home-building">
              <img src="@/assets/images/building.png" alt="">
            </div>
            <div class="home-coming">
              <img src="@/assets/images/cooming-soon.png" alt="">
            </div>
          </div>
          <router-link to="/farm" class="home-item">
            <img :src="info?.farm?.grade?.image" alt="">
            <div class="home-item-info home-item-info2">
              <div class="home-item-label">{{ $t("level") }} {{ info?.farm?.level?.level }}</div>
              <div class="home-item-label">{{ $t("grade") }} {{ info?.farm?.grade?.level }}</div>
            </div>
          </router-link>
          <router-link to="/workshop" class="home-item">
            <img :src="info?.workstation?.grade?.image" alt="">
            <div class="home-item-info">
              <div class="home-item-label">{{ $t("level") }} {{ info?.workstation?.level?.level }}</div>
              <div class="home-item-label">{{ $t("grade") }} {{ info?.workstation?.grade?.level }}</div>
            </div>
          </router-link>
        </div>
        <div class="flex-1"></div>
      </div>
    </main>
    <Bottombar />
    <Modal :show="showModal" :item="item" @close="closeModal" />
  </div>
</template>

<script>
import axios from "axios";
import Bottombar from "@/components/Bottombar.vue";
import Modal from "@/components/Home/Modal.vue";
import confetti from 'canvas-confetti';
import { useToast } from 'vue-toastification';
import Loader from '@/components/Loader.vue';
import ProfileEmpty from "@/components/ProfileEmpty.vue";
import animationData from "@/assets/anim2.json";

export default {
  name: "HomeView",
  data() {
    return {
      info: null,
      isLoading: false,
      item: null,
      showModal: false,
      toast: useToast(),
      lottieJson: animationData,
      loading: false
    };
  },
  components: {
    Bottombar,
    Modal,
    Loader,
    ProfileEmpty
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    let user = tg?.initDataUnsafe;
    tg.BackButton.hide();
    tg.expand();
    if(tg.initData){
      this.$store.commit('setInitData', tg.initData)
    }
    let data = {
      initData: tg.initData,
      t: "home",
      a: "get",
      ref: user?.start_param ? user?.start_param : 0,
    };
    this.isLoading = true
    try {
      axios.post("https://api.tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.info = res?.data?.data;
          this.$i18n.locale = res?.data?.data?.account?.lang
          if(res?.data?.data?.account?.first_entry == 1){
            this.showModal = true
            this.item = res?.data?.data?.farm?.my_asics[0]
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
            window.navigator.vibrate(200).then(res => {
              console.log(res)
            }).catch(err => {
              console.log(err)
            })
          }
        } else{
          this.toast.error(res.data.status_text);
        }
      });
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  },
  methods: {
    closeModal(){
      this.showModal = false
      this.item = null
    },
    onImageLoad(){
      this.isLoading = false
    }
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
    flex-direction: column;
    align-items: center;
    margin-top: -10px;
    position: relative;
    .home-building img{
      width: 130px;
      height: auto;
      filter: grayscale(1);
    }
    .home-coming{
      position: absolute;
      bottom: 0;
      img{
        width: 110px;
      }
    }
  }
}
</style>
