<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">{{ $t("power-station") }}</h2>
    </div>
    <div class="grid grid-cols-2 gap-5 py-6">
      <div class="relative">
        <h5 class="text-center font-patsy text-lg"><span class="text-white">{{ $t("building-grade") }} {{ getPowerStation?.grade?.level }}</span> /{{ getPowerStation?.max_up?.level }}</h5>
        <div class="cgrade-image">
          <img class="w-full" :src="getPowerStation?.grade?.image" />
        </div>
        <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
      </div>
      <div class="grid content-center pt-10">
        <div class="flex items-center pb-2">
          <img class="h-7 w-7 flex-shrink-0 object-contain" src="@/assets/images/icons/ton-slate.png" />
          <div class="pl-3">
            <p class="text-xs">{{ $t("energy-unit-price") }}</p>
            <p class="font-geist-mono text-sm font-semibold text-cyan-400">{{ getPowerStation?.power_cost_per_hour }} TON</p>
          </div>
        </div>
        <div class="main-blue-gradient"></div>
        <div class="flex items-center py-2">
          <img class="h-7 w-7 flex-shrink-0 object-contain" src="@/assets/images/icons/lightning.png" />
          <div class="pl-3">
            <p class="text-xs">{{ $t("power_station.income_power") }}</p>
            <p class="font-geist-mono text-sm font-semibold text-cyan-400">{{ getPowerStation?.grade?.power_per_hour }} {{ $t("units-hour") }}</p>
          </div>
        </div>
        <div class="main-blue-gradient"></div>
        <div class="flex pt-2">
          <img class="h-7 w-7 flex-shrink-0 object-contain" src="@/assets/images/icons/debt.png" />
          <div class="pl-3 flex-1">
            <p class="text-xs">{{ $t("debt") }}</p>
            <p class="font-geist-mono text-sm font-semibold text-red-600">{{ getPowerStation?.debt }} TON</p>
            <div class="mt-2" v-if="getPowerStation?.debt > 0">
              <button class="min-w-32 rounded-xl border border-cyan-400/50" @click="goPay">
                <p class="p-2 text-sm text-white">{{ $t("pay") }}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-action--green m-2" @click="goMoreBoost">
      <div class="mx-auto flex items-center text-sm">
        <p class="pr-2 text-white">{{ $t("boost.title") }}</p>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-1 py-2">
      <article class="figure-shape" v-for="generator in getPowerStation?.generators" :key="generator?.id" @click="goDetails(generator)">
        <img class="aboslute position-center asic-icon" :src="generator?.info?.image" />
        <div class="bg-shape-radial--fuchsia h-3/4 w-3/4 blur-sm"></div>
        <img class="figure-shape--bg" src="@/assets/images/shapes/decagon-with-item.png" />
      </article>
      <article class="figure-shape" @click="goShop('other')">
        <div class="poly-item">
          <img src="@/assets/images/shapes/decagon-empty.png" />
        </div>
        <PolyEmpty :animationData="lottieJson" />
      </article>
    </div>
    <Modal :show="showModal" :item="item" @close="closeModal" :variant="variant" :summ="summ" />
  </main>
</template>

<script>
import axios from 'axios'
import Modal from "@/components/PowerStation/Modal.vue";
import { mapGetters } from 'vuex'
import { useToast } from 'vue-toastification';
import PolyEmpty from "@/components/PowerStation/PolyEmpty.vue";
import animationData from "@/assets/anim1.json";

export default {
  name: "PowerStationView",
  data() {
    return {
      summ: 0,
      showModal: false,
      variant: 0,
      toast: useToast(),
      lottieJson: animationData
    }
  },
  computed: {
    ...mapGetters([
      'getPowerStation',
      'getInitData'
    ])
  },
  components: {
    Modal,
    PolyEmpty
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goHome);
    if(!this.getInitData){
      this.$store.commit('setInitData', tg?.initData)
      let data = {
        initData: tg?.initData,
        t: "powerstation",
        a: "get",
      };
      axios.post("https://api.tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setPowerStation', res?.data?.data)
        } else{
          this.toast.error(res.data.status_text);
        }
      });
    } else{
      this.getPowerStationData()
    }
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goDetails(item){
      this.showModal = true
      this.item = item
      this.variant = 1
      this.summ = this.getPowerStation?.debt
    },
    goMoreBoost() {
      this.$router.push({ name: "boost", query: { power: "active" } });
    },
    closeModal() {
      this.showModal = false;
      this.summ = 0;
    },
    goShop(type){
      this.$router.push({ name: "store", query: { type: type } });
    },
    getPowerStationData(){
      let data = {
        initData: this.getInitData,
        t: "powerstation",
        a: "get",
      };
      axios.post("https://api.tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setPowerStation', res?.data?.data)
        } else{
          this.toast.error(res.data.status_text);
        }
      });
    },
    goPay(){
      this.showModal = true
      this.variant = 2
      this.summ = this.getPowerStation?.debt
    }
  },
};
</script>

<style lang="scss" scoped>
  .main-action--green{
    width: auto;
  }
  .asic-icon{
    width: 55%;
  }
</style>