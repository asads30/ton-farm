<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("boost-tab") }}
      </h2>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <button
        :class="active === 1 ? 'main-tab-button active' : 'main-tab-button'"
        @click="goActive(1)"
      >
        <span class="text-sm text-white">
          {{ $t("farm") }}
        </span>
      </button>
      <button
        :class="active === 2 ? 'main-tab-button active' : 'main-tab-button'"
        @click="goActive(2)"
      >
        <span class="text-sm text-white">
          {{ $t("power-station") }}
        </span>
      </button>
      <button
        :class="active === 3 ? 'main-tab-button active' : 'main-tab-button'"
        @click="goActive(3)"
      >
        <span class="text-sm text-white">
          {{ $t("workshop") }}
        </span>
      </button>
    </div>
    <div :class="active === 1 ? 'block' : 'hidden'">
      <div class="grid grid-cols-2 gap-5 py-4">
        <div class="relative">
          <h5 class="-mb-4 text-center font-patsy text-lg">
            <span class="text-white">{{ $t("level") }} 1</span> /5
          </h5>
          <div class="w-40 mt-8">
            <img class="w-full" src="@/assets/images/sections/farm-2.png" />
          </div>
          <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
        </div>
        <div class="grid content-center pt-10">
          <div class="flex py-2">
            <img class="h-9 w-9 flex-shrink-0" src="@/assets/images/icons/ton-slate.png" />
            <div class="pl-3">
              <p class="text-xs">{{ $t("total-mined") }}</p>
              <p class="font-geist-mono font-semibold text-cyan-400">
                247 <span class="text-xs">TON</span>
              </p>
            </div>
          </div>
          <div class="main-blue-gradient"></div>
          <div class="flex py-2">
            <img
              class="h-8 w-8 flex-shrink-0 object-contain"
              src="@/assets/images/icons/lightning.png"
            />
            <div class="pl-3">
              <p class="text-xs">{{ $t("income-power") }}</p>
              <p class="font-geist-mono font-semibold text-cyan-400">
                5 <span class="-ml-2 text-xs">{{ $t("units-hour") }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="linear-border--slate relative mt-10 w-full p-4">
        <!-- <router-link
          class="w-full rounded-xl border border-cyan-400/50"
          :class="active !== 1 ? 'block' : 'hidden'"
          to="/bill-history"
        >
          <p class="p-3 text-sm text-white">{{ $t("view-payments-history") }}</p>
        </router-link> -->
        <div class="my-4 flex items-center gap-5 mb-8">
          <div class="linear-border--slate relative p-3 min-w-32 text-left">
            <p class="text-xs">{{ $t("building-level") }}</p>
            <p class="text-lg">{{ getPowerStation?.level?.level }}</p>
          </div>
          <div class="grid min-w-32 flex-1">
            <template v-if="active === 3">
              <div class="flex">
                <div class="text-xs">55%</div>
                <div class="ml-auto text-xs">00:19</div>
              </div>
              <div class="pb-2 pt-1">
                <div class="line-progress" style="--width: 50%"></div>
              </div>
            </template>
            <div class="main-action--green" @click="showModalHandle(item)">
              <div class="mx-auto flex items-center text-xs">
                <p class="pr-2 text-white">{{ $t("level-up") }}</p>
                <p class="font-geist-mono font-semibold text-cyan-400">0.43 TON</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-4 flex items-center gap-5">
          <div class="linear-border--slate relative p-3 min-w-32 text-left">
            <p class="text-xs">{{ $t("building-grade") }}</p>
            <p class="text-lg">1</p>
          </div>
          <div class="ml-auto grid min-w-32 flex-1 disable">
            <div class="main-action--green mb-1">
              <div class="mx-auto flex items-center text-xs">
                <p class="pr-2 text-white">{{ $t("level-up") }}</p>
                <p class="font-geist-mono font-semibold text-cyan-400">0.43 TON</p>
              </div>
            </div>
            <span class="pt-1 text-center text-xs">{{
              $t("building-level-required", { lvl: 12 })
            }}</span>
          </div>
        </div>

        <!-- <button disabled class="min-w-32 rounded-lg border border-green-500/40">
          <p class="p-3 text-sm text-white">Upgrade level</p>
        </button> -->
      </div>
    </div>
    <!-- TAB 2 CONTENT -->
    <div :class="active === 2 ? 'block' : 'hidden'">
      <div class="grid grid-cols-2 gap-5 py-4" v-if="getPowerStation">
        <div class="relative">
          <h5 class="text-center font-patsy text-lg"><span class="text-white">{{ $t("level") }} {{ getPowerStation?.grade?.level }}</span>/{{ getPowerStation?.max_up?.level }}</h5>
          <div class="w-40 mt-8">
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
              <p class="text-xs">
                {{ $t("power_station.income_power") }}
              </p>
              <p class="font-geist-mono text-sm font-semibold text-cyan-400">
                {{ getPowerStation?.grade?.power_per_hour }}
                {{ $t("units-hour") }}
              </p>
            </div>
          </div>
          <div class="main-blue-gradient"></div>
          <div class="flex items-center pt-2">
            <img
              class="h-6 w-6 flex-shrink-0 object-contain"
              src="@/assets/images/icons/debt.png"
            />
            <div class="pl-3">
              <p class="text-xs">{{ $t("debt") }}</p>
              <p class="font-geist-mono text-sm font-semibold text-red-600">{{ getPowerStation?.debt }} TON</p>
            </div>
          </div>
        </div>
      </div>
      <div class="linear-border--slate relative mt-10 w-full p-4">
        <!-- <router-link
          class="w-full rounded-xl border border-cyan-400/50"
          :class="active !== 1 ? 'block' : 'hidden'"
          to="/bill-history"
        >
          <p class="p-3 text-sm text-white">{{ $t("view-payments-history") }}</p>
        </router-link> -->
        <div class="my-4 flex items-center gap-5 mb-8">
          <div class="linear-border--slate relative p-3 min-w-32 text-left">
            <p class="text-xs">{{ $t("building-level") }}</p>
            <p class="text-lg">{{ getPowerStation?.level?.level }}</p>
          </div>
          <div :class="getPowerStation?.level?.level == 12 ? 'grid min-w-32 flex-1 disable' : 'grid min-w-32 flex-1'">
            <button class="main-action--green" @click="showModalHandle(1)">
              <div class="mx-auto flex items-center text-xs">
                <p class="pr-2 text-white">{{ $t("level-up") }}</p>
                <p class="font-geist-mono font-semibold text-cyan-400">{{ getPowerStation?.next_level?.cost }} TON</p>
              </div>
            </button>
          </div>
        </div>
        <div class="mb-4 flex items-center gap-5">
          <div class="linear-border--slate relative p-3 min-w-32 text-left">
            <p class="text-xs">{{ $t("building-grade") }}</p>
            <p class="text-lg">{{ getPowerStation?.grade?.level }}</p>
          </div>
          <div :class="getPowerStation?.max_level?.level == getPowerStation?.level?.level ? 'ml-auto grid min-w-32 flex-1' : 'ml-auto grid min-w-32 flex-1 disable'">
            <button class="main-action--green mb-1" @click="showModalHandle(2)">
              <div class="mx-auto flex items-center text-xs">
                <p class="pr-2 text-white">{{ $t("level-up") }}</p>
                <p class="font-geist-mono font-semibold text-cyan-400">{{ getPowerStation?.next_grade?.cost }} TON</p>
              </div>
            </button>
            <span class="pt-1 text-center text-xs">{{
              $t("building-level-required", { lvl: getPowerStation?.max_level?.level })
            }}</span>
          </div>
        </div>

        <!-- <button disabled class="min-w-32 rounded-lg border border-green-500/40">
          <p class="p-3 text-sm text-white">Upgrade level</p>
        </button> -->
      </div>
    </div>
    <!-- TAB 3 CONTENT -->
    <div :class="active === 3 ? 'block' : 'hidden'">
      <div class="grid grid-cols-2 gap-5 py-4">
        <div class="relative">
          <h5 class="-mb-4 text-center font-patsy text-lg">
            <span class="text-white">{{ $t("level") }} 1</span> /5
          </h5>
          <div class="w-40 mt-8">
            <img class="w-full" src="@/assets/images/sections/workshop-2.png" />
          </div>
          <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
        </div>
        <div class="grid content-center pt-10">
          <div class="flex py-2">
            <img class="h-9 w-9 flex-shrink-0" src="@/assets/images/icons/ton-slate.png" />
            <div class="pl-3">
              <p class="text-xs">{{ $t("energy-unit-price") }}</p>
              <p class="font-geist-mono font-semibold text-cyan-400">
                247 <span class="text-xs">TON</span>
              </p>
            </div>
          </div>
          <div class="main-blue-gradient"></div>
          <div class="flex py-2">
            <img
              class="h-8 w-8 flex-shrink-0 object-contain"
              src="@/assets/images/icons/lightning.png"
            />
            <div class="pl-3">
              <p class="text-xs">{{ $t("incoming-power") }}</p>
              <p class="font-geist-mono font-semibold text-cyan-400">
                5 <span class="-ml-2 text-xs">{{ $t("units-hour") }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="linear-border--slate relative mt-10 w-full p-4">
        <!-- <router-link
          class="w-full rounded-xl border border-cyan-400/50"
          :class="active !== 1 ? 'block' : 'hidden'"
          to="/bill-history"
        >
          <p class="p-3 text-sm text-white">{{ $t("view-payments-history") }}</p>
        </router-link> -->
        <div class="my-4 flex items-center gap-5 mb-8">
          <div class="linear-border--slate relative p-3 min-w-32 text-left">
            <p class="text-xs">{{ $t("building-level") }}</p>
            <p class="text-lg">{{ getPowerStation?.level?.level }}</p>
          </div>
          <div class="grid min-w-32 flex-1">
            <template v-if="active === 3">
              <div class="flex">
                <div class="text-xs">55%</div>
                <div class="ml-auto text-xs">00:19</div>
              </div>
              <div class="pb-2 pt-1">
                <div class="line-progress" style="--width: 50%"></div>
              </div>
            </template>
            <div class="main-action--green" @click="showModalHandle(item)">
              <div class="mx-auto flex items-center text-xs">
                <p class="pr-2 text-white">{{ $t("level-up") }}</p>
                <p class="font-geist-mono font-semibold text-cyan-400">0.43 TON</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-4 flex items-center gap-5">
          <div class="linear-border--slate relative p-3 min-w-32 text-left">
            <p class="text-xs">{{ $t("building-grade") }}</p>
            <p class="text-lg">1</p>
          </div>
          <div class="ml-auto grid min-w-32 flex-1 disable">
            <div class="main-action--green mb-1">
              <div class="mx-auto flex items-center text-xs">
                <p class="pr-2 text-white">{{ $t("level-up") }}</p>
                <p class="font-geist-mono font-semibold text-cyan-400">0.43 TON</p>
              </div>
            </div>
            <span class="pt-1 text-center text-xs">{{
              $t("building-level-required", { lvl: 12 })
            }}</span>
          </div>
        </div>

        <!-- <button disabled class="min-w-32 rounded-lg border border-green-500/40">
          <p class="p-3 text-sm text-white">Upgrade level</p>
        </button> -->
      </div>
    </div>
  </main>
  <Bottombar />
  <Modal :show="showModal" :item="item" :variant="variant" @close="closeModal" />
</template>

<script>
import axios from 'axios';
import Bottombar from "@/components/Bottombar.vue";
import Modal from "@/components/Boost/Modal.vue";
import { mapGetters } from "vuex";
import { useToast } from 'vue-toastification';

export default {
  name: "BoostView",
  data() {
    return {
      active: 3,
      showModal: false,
      item: null,
      toast: useToast(),
      variant: 0
    };
  },
  computed: {
    ...mapGetters([
      'getInitData',
      'getPowerStation'
    ])
  },
  components: {
    Bottombar,
    Modal,
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.hide();
    if (this.$route?.query?.power == "active") {
      this.active = 2;
    }
    if(!this.getPowerStation){
      this.getPowerStationData()
    }
  },
  methods: {
    goActive(num) {
      this.active = num;
    },
    showModalHandle(variant) {
      if(!this.getPowerStation.level.level == this.getPowerStation.max_level.level){
        this.toast.error('Это максимальный уровень повысьте грейд!')
      } else{
        this.showModal = true;
        this.item = this.getPowerStation;
        this.variant = variant
      }
    },
    closeModal() {
      this.showModal = false;
      this.item = null;
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
