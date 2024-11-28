<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("farm") }}
      </h2>
    </div>
    <div class="grid grid-cols-2 gap-5 py-6">
      <div class="relative">
        <h5 class="text-center font-patsy text-lg">
          <span class="text-white"> {{ $t("building-grade") }} {{ getFarm?.grade?.level }}</span> /{{ getFarm?.max_up?.level }}
        </h5>
        <div class="cgrade-image">
          <img class="w-full" :src="getFarm?.grade?.image" />
        </div>
        <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
      </div>
      <div class="grid content-center pt-10">
        <div class="flex py-1">
          <img class="h-9 w-9 flex-shrink-0 grayscale" src="@/assets/images/icons/generator.png" v-if="getFarm?.ups == 0" />
          <img class="w-9 w-9 flex-shrink-0" :src="getFarm?.ups_image" v-else />
          <div class="pl-1">
            <p class="text-xs">
              {{ $t("ups") }}
            </p>
            <p class="font-geist-mono text-xs font-semibold">
              <span v-if="getFarm?.ups == 0">{{ $t("not-installed") }}</span>
              <span class="text-green-500" v-else>{{ $t("installed") }}</span>
            </p>
          </div>
        </div>
        <div class="main-blue-gradient"></div>
        <div class="flex py-1">
          <img class="h-7 w-7 flex-shrink-0" src="@/assets/images/icons/mining-speed.png" />
          <div class="pl-3">
            <p class="text-xs">
              {{ $t("income-hour") }}
            </p>
            <p class="font-geist-mono font-semibold text-cyan-400">
              {{ getFarm?.earn_per_hour }} <span class="text-xs">TON</span>
            </p>
          </div>
        </div>
        <div class="main-blue-gradient"></div>
        <div class="flex py-1 items-center">
          <img class="h-7 w-7 flex-shrink-0" src="@/assets/images/icons/ton-slate.png" />
          <div class="pl-3">
            <p class="text-xs">
              {{ $t("uninterrupted-operation") }}
            </p>
            <p class="font-geist-mono font-semibold text-cyan-400">
              {{ getFarm?.total_mined }} <span class="text-xs">TON</span>
            </p>
          </div>
        </div>
        <div class="main-blue-gradient"></div>
        <div class="flex py-1">
          <img class="h-7 w-7 flex-shrink-0" src="@/assets/images/icons/power-consumption.png" />
          <div class="pl-3">
            <p class="text-xs">
              {{ $t("power-consumption") }}
            </p>
            <p class="font-geist-mono font-semibold text-cyan-400">
              {{ getFarm?.energy_per_hour }}/{{ getFarm?.max_energy_per_hour }}
              <span class="text-xs">
                {{ $t("units-hour") }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <router-link to="/boost" class="main-action--green mb-2" v-if="getFarm?.working == 1">
      <div class="mx-auto flex items-center text-sm">
        <p class="pr-2 text-white">
          {{ $t("boost.title") }}
        </p>
      </div>
    </router-link>

    <div class="button-wrap mb-2" v-else>
      <button @click="goWorking" class="main-action--amber" :disabled="loading1">
        <div class="mx-auto flex items-center text-sm">
          <p class="pr-2 text-white">
            {{ $t("restart-mining") }}
          </p>
        </div>
      </button>
    </div>

    <div class="grid grid-cols-3 gap-1 py-2">
      <article
        class="figure-shape"
        v-for="item in getFarm?.my_slots"
        :key="item.id"
        @click="showModalHandle(item)"
      >
        <template v-if="!item.asic">
          <div class="poly-item">
            <img class="figure-shape--bg" src="@/assets/images/shapes/hexagon-empty.png" />
            <PolyEmpty :animationData="lottieJson" />
          </div>
        </template>
        <template v-else>
          <template v-if="item?.asic?.resource?.resources_used_percent > 0">
            <div class="linear-border--main position-center-x">
              <span class="text-xs text-cyan-400" v-if="item?.asic?.resource?.resources_used_percent > 10 && item?.asic?.resource?.working == 0">{{ item?.asic?.resource?.resources_used_percent }}%</span>
              <span class="text-xs text-cyan-400 text-green-used" v-if="item?.asic?.resource?.resources_used_percent > 10 && item?.asic?.resource?.working == 1">{{ item?.asic?.resource?.resources_used_percent }}%</span>
              <span class="text-xs text-cyan-400 text-red-used" v-if="item?.asic?.resource?.resources_used_percent < 11">{{ item?.asic?.resource?.resources_used_percent }}%</span>
            </div>
            <img class="aboslute position-center asic-icon" :src="item?.asic?.info?.image" />
            <div class="bg-shape-radial--fuchsia h-3/4 w-3/4 blur-sm"></div>
            <img class="figure-shape--bg" src="@/assets/images/shapes/hexagon-with-item.png" />
          </template>
          <template v-else>
            <div class="linear-border--rose position-center-x">
              <span class="text-xs text-rose-500">{{ item?.asic?.resource?.resources_used_percent }}%</span>
            </div>
            <img class="aboslute position-center asic-icon" :src="item?.asic?.info?.image" />
            <div class="bg-shape-radial--fuchsia h-3/4 w-3/4 blur-sm"></div>
            <img class="figure-shape--bg" src="@/assets/images/shapes/hexagon-wrong.png" />
          </template>
        </template>
      </article>
      <article
        class="figure-shape"
        v-for="item in lockedSlots"
        v-if="lockedSlots"
        :key="item"
      >
        <div class="position-center">
            <img class="mx-auto mb-1 block w-8" src="@/assets/images/icons/lock-yellow.png" />
            <p class="font-patsy text-xs text-rose-400">
              {{ $t("locked") }}
            </p>
          </div>
          <img class="figure-shape--bg" src="@/assets/images/shapes/red-hexagon-locked.png" />
      </article>
    </div>
  </main>
  <Modal :show="showModal" :item="item" @close="closeModal" />
</template>

<script>
import Modal from "@/components/Farm/Modal.vue";
import { mapGetters } from "vuex";
import axios from 'axios'
import { useToast } from 'vue-toastification'
import PolyEmpty from "@/components/PolyEmpty.vue";
import animationData from "@/assets/anim1.json";

export default {
  name: "FarmView",
  data() {
    return {
      showModal: false,
      item: null,
      toast: useToast(),
      lottieJson: animationData,
      loading1: false
    };
  },
  components: {
    Modal,
    PolyEmpty
  },
  computed: {
    ...mapGetters([
      'getFarm',
      'getInitData'
    ]),
    lockedSlots(){
      return Number(this.getFarm?.max_up?.slots) - Number(this.getFarm?.grade?.slots)
    }
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goHome);
    if(!this.getInitData){
      this.$store.commit('setInitData', tg?.initData)
      let data = {
        initData: tg.initData,
        t: "farm",
        a: "get",
      };
      axios.post("https://api.tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setFarm', res?.data?.data)
        } else{
          this.toast.error(res.data.status_text);
        }
      });
    } else{
      this.getFarmData()
    }
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    showModalHandle(item) {
      if(item?.asic){
        if (item.status === 3) {
          return false;
        } else {
          this.showModal = true;
          this.item = item;
        }
      } else{
        this.$router.push('/store')
      }
    },
    closeModal() {
      this.showModal = false;
      this.item = null;
    },
    getFarmData(){
      let data = {
        initData: this.getInitData,
        t: "farm",
        a: "get",
      };
      axios.post("https://api.tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setFarm', res?.data?.data)
        } else{
          this.toast.error(res.data.status_text);
        }
      });
    },
    async goWorking() {
      if (this.loading1) return; // Защита от повторных запросов
      this.loading1 = true;
      const data = {
          initData: this.getInitData,
          t: "farm",
          a: "start_mining",
      };
      try {
          const res = await axios.post("https://api.tonminefarm.com/request", data);

          if (res.data.status === 200) {
              this.getFarmData();
              const successMessage = this.$i18n.locale === 'ru'
                  ? 'Ферма успешно запущена!'
                  : 'The farm has been successfully launched!';
              this.toast.success(successMessage);
          } else {
              this.toast.error(res.data.status_text);
          }
      } catch (error) {
          console.error("Ошибка запуска фермы:", error);
          this.toast.error("Произошла ошибка при запуске фермы.");
      } finally {
          this.loading1 = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .main-action--amber{
    width: 100%;
  }
  .text-red-used{
    color: rgb(244 63 94 / var(--tw-text-opacity));
  }
  .text-green-used{
    color:#0bff15;
  }
  .button-wrap{
    width: 100%;
    padding: 0 10px;
  }
  .asic-icon{
    width: 55%;
  }
</style>