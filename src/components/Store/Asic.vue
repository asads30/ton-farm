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
          <button @click="repair" class="main-action--green" :disabled="loading1">
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
  import { useToast } from 'vue-toastification'
  import { mapGetters } from "vuex";

  export default {
    name: "AsicModal",
    data() {
      return {
        toast: useToast(),
        initData: null,
        loading1: false
      }
    },
    computed: {
      ...mapGetters([
          'getInitData'
      ]),
    },
    props: {
      show: Boolean,
      item: Object,
    },
    methods: {
      closeModal2() {
        this.$emit("close");
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
            this.toast.error(res.data.status_text)
          }
        });
      },
      async repair() {
        if (this.loading1) return; // Защита от повторного вызова
        this.loading1 = true;
        const data = {
            initData: this.getInitData,
            t: "asic",
            a: "repair",
            asic_id: this.item.id,
        };
        try {
            const res = await axios.post("https://api.tonminefarm.com/request", data);

            if (res.data.status === 200) {
                this.getShopData();
                const message = this.$i18n.locale === 'ru' 
                    ? 'Починили!' 
                    : 'Repaired!';
                this.toast.success(message);
                this.$emit("close");
            } else {
                this.toast.error(res.data.status_text);
            }
        } catch (error) {
            console.error(error);
            this.toast.error('Произошла ошибка');
        } finally {
            this.loading1 = false;
        }
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