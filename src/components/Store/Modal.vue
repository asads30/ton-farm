<template>
  <section v-if="show" class="modal border-radiant">
    <button class="absolute right-5 top-5" @click="closeModal">
      <img class="w-6" src="@/assets/images/icons/close.png" />
    </button>
    <div class="py-4">
      <template v-if="modalType === 'asic'">
        <div class="pb-1 text-center">
          <h4 class="font-patsy text-lg text-white">
            {{ item?.name }}
            <br />
            <span class="text-sm">{{ item?.model }}</span>
          </h4>
        </div>
        <div class="mx-auto max-w-32">
          <img class="w-full h-32" :src="item?.image" />
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
              <div class="font-geist-mono text-sm font-bold text-cyan-400">
                {{ item?.ton_per_hour }} {{ $t("ton-hour") }}
              </div>
            </div>
            <div class="main-blue-gradient"></div>
            <div class="flex items-center pt-3">
              <img
                class="h-8 w-8 flex-shrink-0 object-contain"
                src="@/assets/images/icons/lightning.png"
              />
              <div class="mr-auto pl-3 text-xs">
                {{ $t("mining-speed") }}
              </div>
              <div class="font-geist-mono text-sm font-bold text-cyan-400">
                {{ utils.formatEnergyPerHour(item?.energy_per_hour) }} {{ $t("units-hour") }}
              </div>
            </div>
          </div>
        </div>
        <div class="pt-3">
          <button @click="buyItem(modalType, item?.level)" class="main-action--green">
            <div class="mx-auto flex items-center py-1 text-sm">
              <p class="pr-2 text-white">{{ $t("buy") }}</p>
              <p class="font-geist-mono font-semibold text-cyan-400">{{ item?.cost }} TON</p>
            </div>
          </button>
        </div>
      </template>
      <template v-if="modalType === 'lootbox'">
        <div class="pb-1 text-center">
          <h4 class="font-patsy text-lg text-white">{{ item?.name }}</h4>
        </div>
        <div class="mx-auto max-w-32 pb-10">
          <img class="w-full h-32" :src="item?.image" />
        </div>
        <div class="rounded-lg border border-dashed border-cyan-400/65">
          <div class="p-2 text-center">
            <p><strong>{{ $t('lootbox.variants') }}</strong></p>
            <div class="pb-1 text-[10px]" v-for="asic in item?.asics" :key="asic?.id">{{ asic?.model }}</div>
          </div>
        </div>
        <button @click="buyLootbox(item)" class="main-action--green mt-10">
          <div class="mx-auto flex items-center py-1 text-sm">
            <p class="pr-2 text-white">{{ $t("buy") }}</p>
            <p class="font-geist-mono font-semibold text-cyan-400">{{ item?.cost }} TON</p>
          </div>
        </button>
      </template>
      <template v-if="modalType === 'other'">
        <div class="mx-auto max-w-36 pb-8">
          <img :src="item?.image" />
        </div>
        <div class="rounded-lg border border-dashed border-cyan-400/65">
          <div class="grid content-center p-3" v-if="item?.type == 'UPS'">
            <p class="mx-auto pl-3 text-xs">Обеспечивает беcперебойную работу фермы</p>
          </div>
          <div class="grid content-center p-3" v-else>
            <div class="flex items-center">
              <img
                class="h-8 w-8 flex-shrink-0 object-contain"
                src="@/assets/images/icons/lightning.png"
              />
              <div class="mr-auto pl-3 text-xs">{{ $t("power") }}</div>
              <div class="font-geist-mono text-sm font-bold text-cyan-400">{{ item?.energy }} {{ $t("units") }}</div>
            </div>
          </div>
        </div>
        <div class="pt-6">
          <button @click="buyItem(item?.type, item?.level)" class="main-action--green">
            <div class="mx-auto flex items-center py-1 text-sm">
              <p class="pr-2 text-white">{{ $t("buy") }}</p>
              <p class="font-geist-mono font-semibold text-cyan-400">{{ item?.cost }} TON</p>
            </div>
          </button>
        </div>
      </template>
    </div>
  </section>
  <div :class="show && 'overlay'"></div>
  <Win :isVisible="isVisible" @close="isVisible = false">
    <div class="win-content">
      <h2>Вы выиграли</h2>
      <h4>{{ win?.model }}</h4>
      <img :src="win?.image" alt="">
    </div>
  </Win>
</template>

<script>
import utils from "@/utils";
import axios from 'axios'
import { mapGetters } from "vuex";
import { useToast } from 'vue-toastification'
import Win from './Win.vue'
import confetti from 'canvas-confetti';

export default {
  name: "StoreModal",
  data() {
    return {
      utils,
      toast: useToast(),
      isVisible: false,
      win: null
    };
  },
  components: {
    Win
  },
  computed: {
    ...mapGetters([
      "getInitData"
    ])
  },
  props: {
    show: Boolean,
    item: Object,
    modalType: "asic" | "lootbox" | "other" | "inventory",
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    buyItem(type, level){
      const data = {
        initData: this.getInitData ? this.getInitData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
        t: "shop",
        a: "buy",
        item: type,
        level: level
      }
      axios.post('https://tonminefarm.com/request', data).then(res => {
        if(res.data.status === 200){
          this.$emit("close");
          this.toast.success('Успешно куплено!');
          this.$router.push('/farm')
          this.getShopData();
        } else{
          this.toast.error(res.data.status_text)
        }
      })
    },
    buyLootbox(item){
      const data = {
        initData: this.getInitData ? this.getInitData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
        t: "shop",
        a: "buy",
        level: item?.level,
        item: "loot_box"
      }
      axios.post('https://tonminefarm.com/request', data).then(res => {
        if(res.data.status === 200){
          this.win = res?.data?.win_asic
          this.$emit("close");
          this.getShopData();
          confetti({
            particleCount: 100, // Количество частиц конфетти
            spread: 70,         // Распределение частиц
            origin: { y: 0.6 }  // Место, откуда летят конфетти
          });
          this.$emit("close");
          this.isVisible = true
        } else{
          this.toast.error(res.data.status_text)
        }
      })      
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
    }
  },
};
</script>

<style lang="scss" scoped>
.main-action--green{
  width: 100%;
}
.win-content{
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2{
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  img{
    width: 140px;
  }
}
</style>