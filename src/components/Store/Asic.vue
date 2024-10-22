<template>
    <section v-if="show" class="modal border-radiant">
      <button class="absolute right-5 top-5" @click="closeModal2">
        <img class="w-6" src="@/assets/images/icons/close.png" />
      </button>
      <div class="py-4 overflow-y-auto">
        <div class="pb-1 text-center">
          <h4 class="font-patsy text-lg text-white">{{ item?.info?.model }}</h4>
        </div>
        <div class="mx-auto max-w-36 pb-4">
          <img :src="item?.info?.image" />
        </div>
        <div class="asic-id">#{{ item?.asic_number }}</div>
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
                {{ item?.info?.ton_per_hour }} {{ $t("ton-hour") }}
              </div>
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
        <div class="pt-6">
          <button @click="repair" class="main-action--green">
            <div class="mx-auto flex items-center py-1 text-sm">
              <p class="pr-2 text-white">
                {{ $t("repair") }}
              </p>
              <p class="font-geist-mono font-semibold text-cyan-400">{{ item?.resource?.repair_cost }} TON</p>
            </div>
          </button>
        </div>
      </div>
    </section>
    <div :class="show && 'overlay'"></div>
  </template>
  
  <script>
  import axios from 'axios'
  import { mapGetters } from "vuex";
  import { useToast } from 'vue-toastification'
  
  export default {
    name: "AsicModal",
    data() {
      return {
        toast: useToast()
      }
    },
    props: {
      show: Boolean,
      item: Object,
    },
    computed: {
      ...mapGetters([
        "getInitData"
      ])
    },
    methods: {
      closeModal2() {
        this.$emit("close");
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
      repair(){
        let data = {
          initData: this.getInitData ? this.getInitData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
          t: "asic",
          a: "repair",
          asic_id: this.item.id
        };
        axios.post("https://tonminefarm.com/request", data).then((res) => {
          if (res.data.status === 200) {
            this.getShopData();
            this.toast.success('Починили');
            this.$emit("close");
          } else{
            this.toast.error(res.data.status_text)
          }
        });
      }
    },
  };
  </script>
  
  <style lang="scss" scoped>
    .asic-id{
      font-size: 20px;
      font-weight: 700;
      color: rgb(34 211 238);
      display: flex;
      justify-content: flex-end;
      margin-bottom: 5px;
      margin-right: 10px;
    }
    .main-action--amber{
      width: 100%;
    }
  </style>