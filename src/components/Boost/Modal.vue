<template>
  <section v-if="show" class="modal border-radiant">
    <button class="absolute right-5 top-5" @click="closeModal">
      <img class="w-6" src="@/assets/images/icons/close.png" />
    </button>
    <div class="py-4">
      <div class="py-4">
        <img class="mx-auto mb-5 w-28" src="@/assets/images/icons/arrows-upto.png" />
        <div class="mb-10 py-4 text-center" v-if="variant == 1">
          <div class="mb-3 text-sm text-slate-400">{{ $t("upgrade-to-level", { lvl: item?.next_level?.level }) }}</div>
          <div class="font-geist-mono text-2xl font-bold text-blue-400">{{ item?.next_level?.cost }} TON</div>
        </div>
        <div class="mb-10 py-4 text-center" v-else>
          <div class="mb-3 text-sm text-slate-400">{{ $t("upgrade-to-level", { lvl: item?.next_grade?.level }) }}</div>
          <div class="font-geist-mono text-2xl font-bold text-blue-400">{{ item?.next_grade?.cost }} TON</div>
        </div>
      </div>
      <button class="main-action--green mt-5" @click="goAction" v-if="variant == 1">
        <div class="mx-auto flex items-center py-1 text-sm">
          <p class="pr-2 text-white">{{ $t("pay") }}</p>
          <p class="font-geist-mono font-semibold text-cyan-400">{{ item?.next_level?.cost }} TON</p>
        </div>
      </button>
      <button class="main-action--green mt-5" @click="goAction" v-else>
        <div class="mx-auto flex items-center py-1 text-sm">
          <p class="pr-2 text-white">{{ $t("pay") }}</p>
          <p class="font-geist-mono font-semibold text-cyan-400">{{ item?.next_grade?.cost }} TON</p>
        </div>
      </button>
    </div>
  </section>
  <div :class="show && 'overlay'"></div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios'
import { useToast } from 'vue-toastification'

export default {
  name: "BoostModal",
  data() {
    return {
      toast: useToast(),
    }
  },
  props: {
    show: Boolean,
    variant: Number,
    item: Object,
    type: "farm" | "powerstation" | "workshop"
  },
  computed: {
    ...mapGetters([
      'getInitData'
    ])
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    goAction(){
      if(this.type == 'powerstation'){
        if(this.variant == 1){
          let data = {
            initData: this.getInitData,
            t: "powerstation",
            a: "level_up"
          };
          axios.post("https://tonminefarm.com/request", data).then(res => {
            this.$emit("close");
            if (res.data.status === 200) {
              this.getPowerStationData();
              this.toast.success('Вы перешли на следующий уровень!');
            } else{
              this.toast.error(res.data.status_text);
            }
          })
        } else{
          let data = {
            initData: this.getInitData,
            t: "powerstation",
            a: "grade_up"
          };
          axios.post("https://tonminefarm.com/request", data).then(res => {
            this.$emit("close");
            if (res.data.status === 200) {
              this.getPowerStationData();
              this.toast.success('Вы перешли на следующий уровень!');
              this.$forceUpdate();
            } else{
              this.toast.error(res.data.status_text);
            }
          })
        }
      }
    },
    getPowerStationData(){
      let data = {
        initData: this.getInitData,
        t: "powerstation",
        a: "get",
      };
      axios.post("https://tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setPowerStation', res?.data?.data)
        }
      });
    },
    getWorkShopData(){
      let data = {
        initData: this.getInitData,
        t: "workstation",
        a: "get",
      };
      axios.post("https://tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setWorkShop', res?.data?.data)
        }
      });
    }
  }
};
</script>
