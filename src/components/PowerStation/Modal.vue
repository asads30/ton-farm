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
      <button class="main-action--green mt-5" @click="goDebt">
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
import { mapGetters } from "vuex";
import { useToast } from 'vue-toastification'

export default {
  name: "FarmModal",
  data() {
    return {
      toast: useToast()
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
    goDebt(){
      let data = {
        initData: this.getInitData ? this.getInitData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
        t: "powerstation",
        a: "pay_debt"
      };
      axios.post("https://tonminefarm.com/request", data).then(res => {
        if(res.data.status == 200){
          this.$emit("close");
          this.getPowerStationData()
          this.toast.success('Вы успешно погасили долг!');
        }
      })
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