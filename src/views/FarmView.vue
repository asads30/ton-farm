<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("farm") }}
      </h2>
    </div>
    <div class="grid grid-cols-2 gap-5 py-6">
      <div class="relative">
        <h5 class="-mb-4 text-center font-patsy text-lg">
          <span class="text-white"> {{ $t("level") }} {{ getFarm?.grade?.level }}</span> /{{ getFarm?.max_up?.level }}
        </h5>
        <div class="max-w-40 mt-8">
          <img class="w-full" :src="getFarm?.grade?.image" />
        </div>
        <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
      </div>
      <div class="grid content-center pt-10">
        <div class="flex py-1">
          <img class="h-9 w-9 flex-shrink-0 grayscale" src="@/assets/images/icons/generator.png" v-if="getFarm?.ups == 0" />
          <img class="h-9 w-9 flex-shrink-0" :src="getFarm?.ups_image" v-else />
          <div class="pl-3">
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
          <img class="h-9 w-9 flex-shrink-0" src="@/assets/images/mining-speed.svg" />
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
          <img class="h-9 w-9 flex-shrink-0" src="@/assets/images/icons/ton-slate.png" />
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
          <img class="h-8 w-8 flex-shrink-0" src="@/assets/images/icons/power-consumption.png" />
          <div class="pl-3">
            <p class="text-xs">
              {{ $t("power-consumption") }}
            </p>
            <p class="font-geist-mono font-semibold text-cyan-400">
              {{ getFarm?.energy_per_hour }}
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
          {{ $t("boost") }}
        </p>
      </div>
    </router-link>

    <button @click="goWorking" class="main-action--amber" v-else>
      <div class="mx-auto flex items-center text-sm">
        <p class="pr-2 text-white">
          {{ $t("restart-mining") }}
        </p>
      </div>
    </button>

    <div class="grid grid-cols-3 gap-1 py-2">
      <article
        class="figure-shape"
        v-for="item in getFarm?.my_slots"
        :key="item.id"
        @click="showModalHandle(item)"
      >
        <template v-if="!item.asic">
          <img class="figure-shape--bg" src="@/assets/images/shapes/hexagon-empty.png" />
        </template>
        <template v-else>
          <template v-if="item?.asic?.resource?.resources_used_percent < 70">
            <div class="linear-border--main position-center-x">
              <span class="text-xs text-cyan-400">{{ item?.asic?.resource?.resources_used_percent }}%</span>
            </div>
            <img class="aboslute position-center w-2/3" :src="item?.asic?.info?.image" />
            <div class="bg-shape-radial--fuchsia h-3/4 w-3/4 blur-sm"></div>
            <img class="figure-shape--bg" src="@/assets/images/shapes/hexagon-with-item.png" />
          </template>
          <template v-else>
            <div class="linear-border--rose position-center-x">
              <span class="text-xs text-rose-500">{{ item?.asic?.resource?.resources_used_percent }}%</span>
            </div>
            <img class="aboslute position-center w-2/3" :src="item?.asic?.info?.image" />
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

export default {
  name: "FarmView",
  data() {
    return {
      list: [
        {
          id: 1,
          title: "Title 1",
          status: 1,
        },
        {
          id: 2,
          title: "Title 2",
          status: 2,
        },
        {
          id: 3,
          title: "Title 3",
          status: 3,
        },
        {
          id: 4,
          title: "Title 3",
          status: 3,
        },
        {
          id: 5,
          title: "Title 3",
          status: 3,
        },
        {
          id: 6,
          title: "Title 3",
          status: 4,
        },
      ],
      showModal: false,
      item: null,
    };
  },
  components: {
    Modal,
  },
  computed: {
    ...mapGetters([
      'getInitData',
      'getFarm'
    ]),
    lockedSlots(){
      return Number(this.getFarm?.max_up?.slots) - Number(this.getFarm?.grade?.slots)
    }
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goHome);
    if(!this.getPowerStation){
      this.getFarmData()
    }
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    showModalHandle(item) {
      if (item.status === 3) {
        return false;
      } else {
        this.showModal = true;
        this.item = item;
      }
    },
    closeModal() {
      this.showModal = false;
      this.item = null;
    },
    getFarmData(){
      let data = {
        initData: this.getInitData ? this.getInitData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
        t: "farm",
        a: "get",
      };
      axios.post("https://tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setFarm', res?.data?.data)
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .main-action--amber{
    width: 100%;
  }
</style>