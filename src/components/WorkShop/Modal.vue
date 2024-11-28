<template>
  <section class="modal border-radiant" v-if="show">
    <button class="absolute right-5 top-5" @click="closeModal">
      <img class="w-6" src="@/assets/images/icons/close.png" />
    </button>
    <div class="py-4">
      <div class="pb-1 text-center">
        <h4 class="font-patsy text-lg text-white">{{ item.title }}</h4>
      </div>
      <div class="mx-auto max-w-36 pb-4">
        <img :src="item?.info?.image" />
      </div>
      <div class="rounded-lg border border-dashed border-cyan-400/65">
        <div class="grid content-center p-3">
          <div class="flex items-center pb-3">
            <img
              class="h-8 w-8 flex-shrink-0 object-contain"
              src="@/assets/images/icons/ton-hour-slate.png"
            />
            <div class="mr-auto pl-3 text-xs">
              {{ $t("mining-speed") }}
            </div>
            <div class="font-geist-mono text-sm font-bold text-cyan-400">{{ item?.info?.ton_per_hour }} TON/h</div>
          </div>
          <div class="main-blue-gradient"></div>
          <div class="flex items-center pt-3">
            <img
              class="h-8 w-8 flex-shrink-0 object-contain"
              src="@/assets/images/icons/lightning.png"
            />
            <div class="mr-auto pl-3 text-xs">
              {{ $t("power-consumption") }}
            </div>
            <div class="font-geist-mono text-sm font-bold text-cyan-400">
              {{ item?.info?.energy_per_hour }} {{ $t("units-hour") }}
            </div>
          </div>
        </div>
      </div>
      <div class="pt-5">
        <div class="flex">
          <div class="text-xs">{{ progressPercent }}%</div>
          <div class="ml-auto text-xs">{{ formattedTime }}</div>
        </div>
        <div class="pb-2 pt-1">
          <div class="line-progress" :style="'--width:' + progressPercent + '%'"></div>
        </div>
      </div>
      <div class="pt-3">
        <button @click="goBoost" class="main-action--green" :disabled="loading1">
          <div class="mx-auto flex items-center py-1 text-sm">
            <p class="pr-2 text-white">
              {{ $t("boost-repair-for") }}
            </p>
            <p class="font-geist-mono font-semibold text-cyan-400">{{ boostCost.toFixed(2) }} TON</p>
          </div>
        </button>
      </div>
    </div>
  </section>
  <div :class="show && 'overlay'"></div>
</template>

<script>
import axios from 'axios'
import { useToast } from 'vue-toastification';
import { mapGetters } from "vuex";

export default {
  name: "WorkShopModal",
  data() {
    return {
      intervalId: null,
      remainingTime: null,
      initData: null,
      toast: useToast(),
      loading1: false
    }
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.remainingTime / 60);
      const seconds = this.remainingTime % 60;
      return `${this.pad(minutes)}:${this.pad(seconds)}`;
    },
    progressPercent() {
      const elapsedTime = this.item?.total_time - this.remainingTime;
      return Math.floor((elapsedTime / this.item?.total_time) * 100);
    },
    boostCost() {
      const remainingSeconds = this.remainingTime;
      const costPerSecond = Number(this.item?.repair_boost_cost_per_hour) / 3600;
      return remainingSeconds * costPerSecond;
    },
    ...mapGetters([
        'getInitData'
    ]),
  },
  mounted() {
    this.updateTimer();
    this.intervalId = setInterval(this.updateTimer, 1000);
  },
  props: {
    show: Boolean,
    item: Object,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    pad(value) {
      return value < 10 ? '0' + value : value;
    },
    updateTimer() {
      const currentTime = Math.floor(Date.now() / 1000);
      this.remainingTime = this.item?.repair_timer_stop - currentTime;
      if (this.remainingTime <= 0) {
        clearInterval(this.intervalId);
        this.remainingTime = 0;
      }
    },
    getWorkShopData(){
      let data = {
        initData: this.getInitData,
        t: "workstation",
        a: "get",
      };
      axios.post("https://api.tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setWorkShop', res?.data?.data)
        } else{
          this.toast.error(res.data.status_text)
        }
      });
    },
    async goBoost() {
      if (this.loading1) return; // Предотвращение повторного вызова
      this.loading1 = true;
      const boostData = {
          initData: this.getInitData,
          t: "asic",
          a: "boost_repair",
          asic_id: this.item.id,
      };
      try {
          const boostRes = await axios.post("https://api.tonminefarm.com/request", boostData);

          if (boostRes.data.status === 200) {
              this.$emit("close");
              await this.handleActivation(this.item.id);
          } else {
              this.toast.error(boostRes.data.status_text);
          }
      } catch (error) {
          console.error("Ошибка в процессе ускорения ремонта:", error);
          this.toast.error("Произошла ошибка при ускорении ремонта.");
      } finally {
          this.loading1 = false;
      }
    },
    async handleActivation(asic_id) {
      const activationData = {
          initData: this.getInitData,
          t: "asic",
          a: "activate",
          asic_id,
      };
      try {
          const activationRes = await axios.post("https://api.tonminefarm.com/request", activationData);

          if (activationRes.data.status === 200) {
              this.$router.push("/farm");
          } else {
              this.$router.push({ name: "store", query: { type: "other" } });
          }
      } catch (error) {
          console.error("Ошибка активации ASIC:", error);
          this.toast.error("Произошла ошибка при активации.");
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>
