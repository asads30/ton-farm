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
                <div class="rounded-lg">
                  <div class="p-2 text-center">
                    <div class="font-geist-mono text-2xl font-semibold text-cyan-400">{{ lootbox?.cost }} TON</div>
                  </div>
                </div>
                <div class="main-action--green mt-4" @click="showModalHandle(lootbox, 'lootbox')">
                  <div class="mx-auto flex items-center text-sm">
                    <p class="pr-2 text-xs text-white">{{ $t("info.title") }}</p>
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
              <template v-if="item?.type == 'generator'">
                <div class="relative">
                  <h5 class="text-center font-patsy text-lg text-white">
                    {{ item?.name }}
                    <br />
                    <span class="text-sm">{{ item?.model ? item?.model : item?.info?.model }}</span>
                  </h5>
                  <div class="mx-auto h-28 w-28">
                    <img class="h-full w-full object-contain" :src="item?.info?.image" />
                  </div>
                  <div class="bg-shape-radial--fuchsia h-24 w-64 blur-3xl"></div>
                </div>
                <div class="grid content-center">
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
              </template>
              <template v-else>
                <div class="relative figure-shape">
                  <template v-if="item?.resource?.resources_used_percent > 0">
                    <div class="linear-border--main position-center-x">
                      <span class="text-xs text-cyan-400" v-if="item?.resource?.resources_used_percent > 10 && item?.resource?.working == 0">{{ item?.resource?.resources_used_percent }}%</span>
                      <span class="text-xs text-cyan-400 text-green-used" v-if="item?.resource?.resources_used_percent > 10 && item?.resource?.working == 1">{{ item?.resource?.resources_used_percent }}%</span>
                      <span class="text-xs text-cyan-400 text-red-used" v-if="item?.resource?.resources_used_percent < 11">{{ item?.resource?.resources_used_percent }}%</span>
                    </div>
                    <img class="asic-img" :src="item?.info?.image" />
                    <div class="bg-shape-radial--fuchsia h-3/4 w-3/4 blur-sm"></div>
                    <img class="figure-shape--bg" src="@/assets/images/shapes/hexagon-with-item.png" />
                  </template>
                  <template v-else>
                    <div class="linear-border--rose position-center-x">
                      <span class="text-xs text-rose-500">{{ item?.resource?.resources_used_percent }}%</span>
                    </div>
                    <img class="asic-img" :src="item?.info?.image" />
                    <div class="bg-shape-radial--fuchsia h-3/4 w-3/4 blur-sm"></div>
                    <img class="figure-shape--bg" src="@/assets/images/shapes/hexagon-wrong.png" />
                  </template>
                </div>
                <div class="grid content-center">
                  <div class="flex pb-2">
                    <img
                      class="h-8 w-8 flex-shrink-0 object-contain"
                      src="@/assets/images/icons/ton-slate.png"
                    />
                    <div class="pl-3">
                      <p class="text-xs">
                        {{ $t("total-mined") }}
                      </p>
                      <p class="font-geist-mono font-semibold text-cyan-400">
                        {{ item?.resource?.total_mined }} TON
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
                        {{ $t("power-consumption") }}
                      </p>
                      <p class="font-geist-mono font-semibold text-cyan-400">
                        {{ item?.info?.energy_per_hour }} <span class="text-xs">{{ $t("units-hour") }}</span>
                      </p>
                    </div>
                  </div>
                  <button @click="activateAsic(item?.id, 0)" class="main-action--green mt-4" v-if="item?.status == 0" :disabled="loading1">
                    <div class="mx-auto flex items-center text-sm">
                      <p class="text-white">{{ $t("activate") }}</p>
                    </div>
                  </button>
                  <button @click="activateAsic(item?.id, 1)" class="main-action--amber mt-4" v-if="item?.status == 1" :disabled="loading1">
                    <div class="mx-auto flex items-center text-sm">
                      <p class="text-white">{{ $t("deactivate") }}</p>
                    </div>
                  </button>
                  <button @click="showModalHandle2(item)" class="main-action--amber mt-4" v-if="item?.status == 2">
                    <div class="mx-auto flex items-center text-sm">
                      <p class="text-white">Починить</p>
                    </div>
                  </button>
                  <div class="main-action--amber store-remont not mt-4" v-if="item?.status == 3"><div class="mx-auto flex items-center text-sm">В ремонте</div></div>
                </div>
              </template>
            </div>
            <div class="slate-stander"></div>
          </article>
        </div>
      </div>
    </div>
  </main>
  <Modal :modalType="modalType" :show="showModal" :item="item" @close="closeModal" />
  <Asic :show="showModal2" :item="item2" @close="closeModal2" />
</template>

<script>
import Modal from "@/components/Store/Modal.vue";
import Asic from "@/components/Store/Asic.vue";
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
      showModal2: false,
      item2: null,
      toast: useToast(),
      loading1: false
    };
  },
  computed: {
    ...mapGetters([
      'getShop',
      'getInitData'
    ])
  },
  components: {
    Modal,
    Asic
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.expand();
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goHome);
    if (this.$route?.query?.type == "other") {
      this.active = 3;
    }
    if(!this.getInitData){
      this.$store.commit('setInitData', tg?.initData)
      let data = {
        initData: tg?.initData,
        t: "shop",
        a: "get",
      };
      axios.post("https://api.tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setShop', res?.data?.data)
        } else{
          this.toast.error(res.data.status_text);
        }
      });
    } else{
      this.getShopData()
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
    showModalHandle2(item) {
      this.showModal2 = true;
      this.item2 = item;
    },
    closeModal() {
      this.showModal = false;
      this.item = null;
    },
    closeModal2() {
      this.showModal2 = false;
      this.item2 = null;
    },
    getShopData(){
      let data = {
        initData: this.getInitData,
        t: "shop",
        a: "get",
      };
      axios.post("https://api.tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setShop', res?.data?.data)
        } else{
          this.toast.error(res.data.status_text);
        }
      });
    },
    async activateAsic(id, status) {
      if (this.loading1) return; // Защита от повторных запросов
      this.loading1 = true;
      const action = status === 1 ? 'deactivate' : 'activate';
      const data = {
          initData: this.getInitData,
          t: "asic",
          a: action,
          asic_id: id
      };
      try {
          const res = await axios.post("https://api.tonminefarm.com/request", data);

          if (res.data.status === 200) {
              this.getShopData();
              const successMessage = this.$i18n.locale === 'ru'
                  ? (status === 1 ? 'Вы успешно деактивировали асик!' : 'Вы успешно активировали асик!')
                  : (status === 1 ? 'You have successfully deactivated the ASIC!' : 'You have successfully activated the ASIC!');
              this.toast.success(successMessage);
          } else {
              this.toast.error(res.data.status_text);
          }
      } catch (error) {
          console.error("Ошибка активации/деактивации ASIC:", error);
          this.toast.error("Произошла ошибка при активации/деактивации ASIC.");
      } finally {
          this.loading1 = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .asic-img{
    width: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
  }
</style>