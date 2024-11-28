<template>
  <section v-if="show" class="modal border-radiant">
    <button class="absolute right-5 top-5" @click="closeModal">
      <img class="w-6" src="@/assets/images/icons/close.png" />
    </button>
    <div class="py-4 overflow-y-auto" v-if="variant == 1">
      <div class="pb-1 text-center">
        <h4 class="font-patsy text-lg text-white">{{ item?.info?.name }}</h4>
      </div>
      <div class="mx-auto max-w-36 pb-4">
        <img :src="item?.info?.image" />
      </div>
      <div class="rounded-lg border border-dashed border-cyan-400/65">
        <div class="grid content-center p-3">
          <div class="flex items-center">
              <img
                class="h-8 w-8 flex-shrink-0 object-contain"
                src="@/assets/images/icons/lightning.png"
              />
              <div class="mr-auto pl-3 text-xs">{{ $t("power") }}</div>
              <div class="font-geist-mono text-sm font-bold text-cyan-400">{{ item?.info?.energy }} {{ $t("units") }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4" v-else>
      <img class="mx-auto mb-5 w-28" src="@/assets/images/icons/light-document.png" />
      <div class="mb-10 py-4 text-center">
        <div class="mb-3 text-sm text-slate-400">{{ $t("current-electricity-debt") }}</div>
        <div class="font-geist-mono text-2xl font-bold text-red-500/90">
            {{ summ }} TON
        </div>
      </div>
      <button class="main-action--green mt-5" @click="goDebt" :disabled="loading1">
        <div class="mx-auto flex items-center py-1 text-sm">
          <p class="pr-2 text-white">{{ $t("pay") }}</p>
          <p class="font-geist-mono font-semibold text-cyan-400">{{ summ }} TON</p>
        </div>
      </button>
    </div>
  </section>
  <div :class="show && 'overlay'"></div>
</template>

<script>
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { mapGetters } from "vuex";

export default {
  name: "FarmModal",
  data() {
    return {
      toast: useToast(),
      loading1: false
    }
  },
  props: {
    show: Boolean,
    item: Object,
    variant: Number,
    summ: Number
  },
  computed: {
    ...mapGetters([
        'getInitData'
    ]),
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    getPowerStationData(){
      let data = {
        initData: this.getInitData,
        t: "powerstation",
        a: "get",
      };
      axios.post("https://api.tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setPowerStation', res?.data?.data)
        } else{
          this.toast.error(res.data.status_text)
        }
      });
    },
    async goDebt() {
      if (this.loading1) return; // Защита от повторного вызова
      this.loading1 = true;
      const data = {
          initData: this.getInitData,
          t: "powerstation",
          a: "pay_debt",
      };
      try {
          const res = await axios.post("https://api.tonminefarm.com/request", data);

          if (res.data.status === 200) {
              this.$emit("close");
              this.getPowerStationData();
              const message = this.$i18n.locale === 'ru' 
                  ? 'Вы успешно погасили долг!' 
                  : 'You have successfully paid off the debt!';
              this.toast.success(message);
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