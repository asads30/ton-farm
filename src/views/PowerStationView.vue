<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("power-station") }}
      </h2>
    </div>
    <div class="grid grid-cols-2 gap-5 py-6">
      <div class="relative">
        <h5 class="-mb-4 text-center font-patsy text-lg">
          <span class="text-white">{{ $t("level") }} {{ getPowerStation?.grade?.level }}</span> /{{ getPowerStation?.max_up?.level }}
        </h5>
        <div class="max-w-40">
          <img class="w-full" :src="getPowerStation?.grade?.image" />
        </div>
        <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
      </div>
      <div class="grid content-center pt-10">
        <div class="flex items-center pb-2">
          <img
            class="h-7 w-7 flex-shrink-0 object-contain"
            src="@/assets/images/icons/ton-slate.png"
          />
          <div class="pl-3">
            <p class="text-xs">
              {{ $t("energy-unit-price") }}
            </p>
            <p class="font-geist-mono text-sm font-semibold text-cyan-400">{{ getPowerStation?.power_cost_per_hour }} TON</p>
          </div>
        </div>
        <div class="main-blue-gradient"></div>
        <div class="flex items-center py-2">
          <img
            class="h-6 w-6 flex-shrink-0 object-contain"
            src="@/assets/images/icons/lightning.png"
          />
          <div class="pl-3">
            <p class="text-xs">{{ $t("power_station.income_power") }}</p>
            <p class="font-geist-mono text-sm font-semibold text-cyan-400">
              {{ getPowerStation?.grade?.power_per_hour }} {{ $t("units-hour") }}
            </p>
          </div>
        </div>
        <div class="main-blue-gradient"></div>
        <div class="flex pt-2">
          <img class="h-6 w-6 flex-shrink-0 object-contain" src="@/assets/images/icons/debt.png" />
          <div class="pl-3 flex-1">
            <p class="text-xs">
              {{ $t("debt") }}
            </p>
            <p class="font-geist-mono text-sm font-semibold text-red-600">{{ getPowerStation?.debt }} TON</p>
            <div class="mt-2" v-if="getPowerStation?.debt > 0">
              <button class="min-w-32 rounded-xl border border-cyan-400/50" @click="goPay">
                <p class="p-2 text-sm text-white">
                  {{ $t("pay") }}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-action--green m-2" @click="goMoreBoost">
      <div class="mx-auto flex items-center text-sm">
        <p class="pr-2 text-white">
          {{ $t("boost") }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-1 py-2">
      <article class="figure-shape" v-for="generator in getPowerStation?.generators" :key="generator?.id">
        <img class="aboslute position-center w-3/4" :src="generator?.info?.image" />
        <div class="bg-shape-radial--fuchsia h-3/4 w-3/4 blur-sm"></div>
        <img class="figure-shape--bg" src="@/assets/images/shapes/decagon-with-item.png" />
      </article>
      <article class="figure-shape" @click="goShop('other')">
        <img class="figure-shape--bg" src="@/assets/images/shapes/decagon-empty.png" />
      </article>
    </div>
    <Modal :show="showModal" :summ="summ" @close="closeModal" :variant="variant" :level="level" />
  </main>
</template>

<script>
import axios from 'axios'
import Modal from "@/components/PowerStation/Modal.vue";
import { mapGetters } from 'vuex'

export default {
  name: "PowerStationView",
  data() {
    return {
      summ: 0,
      showModal: false,
      variant: 0,
      level: 0
    }
  },
  computed: {
    ...mapGetters([
      'getInitData',
      'getPowerStation'
    ])
  },
  components: {
    Modal
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goHome);
    this.getPowerStationData()
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goPay(){
      this.showModal = true
      this.summ = this.getPowerStation?.debt
      this.variant = 1
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
        initData: this.getInitData ? this.getInitData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
        t: "powerstation",
        a: "get",
      };
      axios.post("https://tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setPowerStation', res?.data?.data)
        }
      });
    }
  },
};
</script>
