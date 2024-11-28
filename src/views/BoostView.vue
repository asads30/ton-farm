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
      <Farm />
    </div>
    <!-- TAB 2 CONTENT -->
    <div :class="active === 2 ? 'block' : 'hidden'">
      <PowerStation />
    </div>
    <!-- TAB 3 CONTENT -->
    <div :class="active === 3 ? 'block' : 'hidden'">
      <WorkShop />
    </div>
  </main>
  <Bottombar />
</template>

<script>
import Bottombar from "@/components/Bottombar.vue";
import Farm from "@/components/Boost/Farm/Index.vue";
import PowerStation from "@/components/Boost/PowerStation/Index.vue";
import WorkShop from "@/components/Boost/WorkShop/Index.vue";
import { mapGetters } from "vuex";
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "BoostView",
  data() {
    return {
      active: 1,
      toast: useToast()
    };
  },
  components: {
    Bottombar,
    Farm,
    PowerStation,
    WorkShop
  },
  computed: {
    ...mapGetters([
        'getInitData'
    ]),
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.hide();
    if (this.$route?.query?.power == "active") {
      this.active = 2;
    } else if(this.$route?.query?.workshop == "active") {
      this.active = 3;
    } else{
      this.active = 1
    }
    if(!this.getInitData){
      this.$store.commit('setInitData', tg?.initData);
      let data = {
        initData: tg.initData,
        t: "farm",
        a: "get",
      };
      axios.post("https://api.tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setFarm', res?.data?.data)
        } else{
          this.toast.error(res.data.status_text);
        }
      });
      let data2 = {
        initData: tg.initData,
        t: "powerstation",
        a: "get",
      };
      axios.post("https://api.tonminefarm.com/request", data2).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setPowerStation', res?.data?.data)
        } else{
          this.toast.error(res.data.status_text);
        }
      });
      let data3 = {
        initData: tg.initData,
        t: "workstation",
        a: "get",
      };
      axios.post("https://api.tonminefarm.com/request", data3).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setWorkShop', res?.data?.data)
        } else{
          this.toast.error(res.data.status_text);
        }
      });
    }
  },
  methods: {
    goActive(num) {
      this.active = num;
    }
  }
};
</script>
