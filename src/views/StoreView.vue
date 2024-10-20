<template>
  <main class="!p-0">
    <!-- <div class="sticky top-0 z-20 px-1 pt-2"> -->
    <!-- bg-gray-950 -->
    <div class="py-2 text-center">
      <h2 class="font-patsy text-3xl text-cyan-200">
        {{ $t("store") }}
      </h2>
    </div>
    <div class="grid grid-cols-4 gap-1">
      <button
        :class="active === 1 ? 'main-tab-button active' : 'main-tab-button'"
        @click="goActive(1)"
      >
        <span class="text-sm text-white">
          {{ $t("asics") }}
        </span>
      </button>
      <button
        :class="active === 2 ? 'main-tab-button active' : 'main-tab-button'"
        @click="goActive(2)"
      >
        <span class="text-sm text-white">
          {{ $t("loot-box") }}
        </span>
      </button>
      <button
        :class="active === 3 ? 'main-tab-button active' : 'main-tab-button'"
        @click="goActive(3)"
      >
        <span class="text-sm text-white">
          {{ $t("other") }}
        </span>
      </button>
      <button
        :class="active === 4 ? 'main-tab-button active' : 'main-tab-button'"
        @click="goActive(4)"
      >
        <span class="text-sm text-white">
          {{ $t("inventory") }}
        </span>
      </button>
    </div>
    <!-- </div> -->
    <div class="p-1 my-6">
      <!-- TAB 1 CONTENT -->
      <div :class="active === 1 ? 'block' : 'hidden'">
        <div class="inline-aside-lights">
          <article class="relative px-3 pb-10 pt-6" v-for="asic in getShop?.asics" :key="asic?.id">
            <div class="grid grid-cols-2 gap-5">
              <div class="relative">
                <h5 class="text-center font-patsy text-lg text-white">
                  {{ asic?.name }}
                  <br />
                  <span class="text-sm">{{ asic?.model }}</span>
                </h5>
                <div class="mx-auto h-28 w-28">
                  <img class="h-full w-full object-contain" :src="asic?.image" />
                </div>
                <div class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"></div>
              </div>
              <div class="grid content-center">
                <div class="flex pb-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/ton-hour-slate.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">
                      {{ $t("mining-speed") }}
                    </p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      {{ asic?.ton_per_hour }}
                      <span class="text-xs">
                        {{ $t("ton-hour") }}
                      </span>
                    </p>
                  </div>
                </div>
                <div class="main-blue-gradient"></div>
                <div class="flex items-center pt-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/lightning.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">{{ $t("power-consumption") }}</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      {{ utils.formatEnergyPerHour(asic?.energy_per_hour) }}
                      <span class="text-xs">
                        {{ $t("units-hour") }}
                      </span>
                    </p>
                  </div>
                </div>
                <div class="main-action--green mt-4" @click="showModalHandle(asic, 'asic')">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="pr-2 text-xs text-white">{{ $t("buy") }}</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">{{ asic?.cost }} TON</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="slate-stander"></div>
          </article>
        </div>
      </div>
      <!-- TAB 2 CONTENT -->
      <div :class="active === 2 ? 'block' : 'hidden'">
        <div class="inline-aside-lights">
          <article
            class="relative px-3 pb-10 pt-6"
            v-for="lootbox in getShop?.loot_boxes"
            :key="lootbox.id"
          >
            <div class="grid grid-cols-2 gap-3">
              <div class="relative">
                <h5 class="text-center font-patsy text-lg text-white">{{ lootbox?.name }}</h5>
                <div class="mx-auto h-28 w-28">
                  <img class="h-full w-full object-contain" :src="lootbox?.image" />
                </div>
                <div class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"></div>
              </div>
              <div class="grid content-center">
                <div class="rounded-lg border border-dashed border-cyan-400/65">
                  <div class="p-2 text-center">
                    <div class="font-geist-mono text-2xl font-semibold text-cyan-400">{{ lootbox?.cost }} TON</div>
                  </div>
                </div>
                <div class="main-action--green mt-4" @click="showModalHandle(lootbox, 'lootbox')">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="pr-2 text-xs text-white">{{ $t("info") }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="slate-stander"></div>
          </article>
        </div>
      </div>
      <!-- TAB 3 CONTENT -->
      <div :class="active === 3 ? 'block' : 'hidden'">
        <div class="inline-aside-lights">
          <article class="relative px-3 pb-10 pt-6" v-for="item in getShop?.other" :key="item?.id">
            <div class="grid grid-cols-2 gap-5">
              <div class="relative">
                <h5 class="text-center font-patsy text-lg text-white">{{ item?.name }}</h5>
                <div class="mx-auto h-28 w-28">
                  <img class="h-full w-full object-contain" :src="item?.image" />
                </div>
                <div class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"></div>
              </div>
              <div class="grid content-center">
                <div class="flex pb-2" v-if="item?.energy">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/power-consumption.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">
                      {{ $t("power") }}
                    </p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      {{ item?.energy }} {{ $t('units') }}
                    </p>
                  </div>
                </div>
                <div class="main-action--green mt-4" @click="showModalHandle(item, 'other')">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="pr-2 text-xs text-white">{{ $t("buy") }}</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">{{ item?.cost }} TON</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="slate-stander"></div>
          </article>
        </div>
      </div>
      <!-- TAB 4 CONTENT -->
      <div :class="active === 4 ? 'block' : 'hidden'">
        <div class="inline-aside-lights">
          <article class="relative px-3 pb-10 pt-6" v-for="item in getShop?.inventory" :key="item?.id">
            <div class="grid grid-cols-2 gap-5">
              <div class="relative">
                <h5 class="text-center font-patsy text-lg text-white">
                  {{ item?.name }}
                  <br />
                  <span class="text-sm">{{ item?.model }}</span>
                </h5>
                <template v-if="item?.type === 'asic'">
                  <p class="text-red-500 font-geist-mono text-xs text-center py-1" v-if="item?.status == 0">
                    {{ $t('inactive') }}
                  </p>
                  <p class="text-green-500 font-geist-mono text-xs text-center py-1" v-if="item?.status == 1">
                    {{ $t('active') }}
                  </p>
                  <p class="text-red-500 font-geist-mono text-xs text-center py-1" v-if="item?.status == 2">
                    Нуждается в ремонте
                  </p>
                  <p class="text-red-500 font-geist-mono text-xs text-center py-1" v-if="item?.status == 3">
                    Находится в ремонте
                  </p>
                </template>
                <div class="mx-auto h-28 w-28">
                  <img class="h-full w-full object-contain" :src="getShop?.asics[item.asic_id].image" />
                </div>
                <div class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"></div>
              </div>
              <div class="grid content-center" v-if="item?.type == 'asic'">
                <div class="flex pb-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/ton-hour-slate.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">
                      {{ $t("total-mined") }}
                    </p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      {{ item?.total_mined }} TON
                    </p>
                  </div>
                </div>
                <div class="main-blue-gradient"></div>
                <div class="flex items-center pt-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/lightning.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">
                      {{ $t("mining-speed") }}
                    </p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      {{ item?.info?.energy_per_hour }} <span class="text-xs">{{ $t("units-hour") }}</span>
                    </p>
                  </div>
                </div>
                <button @click="activateAsic(item?.id, 0)" class="main-action--amber mt-4" v-if="item?.status == 0">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="text-white">{{ $t("activate") }}</p>
                  </div>
                </button>
                <button @click="activateAsic(item?.id, 1)" class="main-action--amber mt-4" v-if="item?.status == 1">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="text-white">{{ $t("deactivate") }}</p>
                  </div>
                </button>
              </div>
              <div class="grid content-center" v-if="item?.type == 'generator'">
                <div class="flex items-center pt-2">
                  <img
                    class="h-8 w-8 flex-shrink-0 object-contain"
                    src="@/assets/images/icons/power-consumption.png"
                  />
                  <div class="pl-3">
                    <p class="text-xs">
                      {{ $t("power") }}
                    </p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                      {{ item?.info?.energy }} <span class="text-xs">{{ $t("units") }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="slate-stander"></div>
          </article>
        </div>
      </div>
    </div>
  </main>
  <Modal :modalType="modalType" :show="showModal" :item="item" @close="closeModal" />
</template>

<script>
import Modal from "@/components/Store/Modal.vue";
import utils from "@/utils";
import axios from "axios";
import { mapGetters } from 'vuex'
import { useToast } from 'vue-toastification'

export default {
  name: "StoreView",
  data() {
    return {
      utils,
      active: 1,
      showModal: false,
      modalType: null,
      item: null,
      toast: useToast()
    };
  },
  computed: {
    ...mapGetters([
      "getShop",
      "getInitData"
    ])
  },
  components: {
    Modal,
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.expand();
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goHome);
    this.getShopData()
    if (this.$route?.query?.type == "other") {
      this.active = 3;
    }
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goActive(num) {
      this.active = num;
    },
    showModalHandle(item, type) {
      this.modalType = type;
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
    getShopData(){
      let data = {
        initData: this.getInitData ? this.getInitData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
        t: "shop",
        a: "get",
      };
      axios.post("https://tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setShop', res?.data?.data)
        }
      });
    },
    activateAsic(id, status){
      if(status === 1){
        var data = {
          initData: this.getInitData ? this.getInitData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
          t: "asic",
          a: "deactivate",
          asic_id: id
        };
      }
      if(status === 0){
        var data = {
          initData: this.getInitData ? this.getInitData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
          t: "asic",
          a: "activate",
          asic_id: id
        };
      }
      axios.post("https://tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.getShopData()
          this.toast.success('Вы успешно активировали асик!');
        } else{
          this.toast.error(res.data.status_text);
        }
      });
    }
  },
};
</script>
