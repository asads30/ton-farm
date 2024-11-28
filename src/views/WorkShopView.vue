<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("workshop") }}
      </h2>
    </div>
    <div class="grid grid-cols-2 gap-5 py-6">
      <div class="relative">
        <h5 class="text-center font-patsy text-lg">
          <span class="text-white">
            {{ $t("building-grade") }} {{ getWorkShop?.grade?.level }}</span> /{{ getWorkShop?.max_up?.level }}
        </h5>
        <div class="cgrade-image">
          <img class="w-full" :src="getWorkShop?.grade?.image" />
        </div>
        <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
      </div>
      <div class="grid content-center pt-10">
        <div class="flex items-center pb-2">
          <img class="h-7 w-7 flex-shrink-0 object-contain" src="@/assets/images/icons/ton-slate.png" />
          <div class="pl-3">
            <p class="text-xs">{{ $t("boost.workshop.price") }}</p>
            <p class="font-geist-mono text-sm font-semibold text-cyan-400">{{ getWorkShop?.grade?.percent }}%</p>
          </div>
        </div>
        <div class="main-blue-gradient"></div>
        <div class="flex items-center py-2">
            <img class="h-7 w-7 flex-shrink-0 object-contain" src="@/assets/images/icons/ton-hour-slate.png"/>
            <div class="pl-3">
                <p class="text-xs">{{ $t("boost.workshop.time") }}</p>
                <p class="font-geist-mono text-sm font-semibold text-cyan-400">{{ getWorkShop?.grade?.work_time_hours }} часа</p>
            </div>
        </div>
        <div class="main-blue-gradient"></div>
        <div class="flex items-center py-2">
          <img
            class="h-7 w-7 flex-shrink-0 object-contain"
            src="@/assets/images/icons/empty-hexagon.png"
          />
          <div class="pl-3">
            <p class="text-xs">
              {{ $t("slots-available") }}
            </p>
            <p class="font-geist-mono text-sm font-semibold text-cyan-400">{{ getWorkShop?.grade?.slots }}</p>
          </div>
        </div>
        <div class="main-blue-gradient"></div>
        <div class="flex items-center pt-2">
          <img
            class="h-7 w-7 flex-shrink-0 object-contain"
            src="@/assets/images/icons/filled-hexagon.png"
          />
          <div class="pl-3">
            <p class="text-xs">
              {{ $t("slots-used") }}
            </p>
            <p class="font-geist-mono text-sm font-semibold text-cyan-400">{{ getWorkShop?.all_slots_used_count }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="button-wrap">
      <button @click="goMoreBoost" class="main-action--green">
        <div class="mx-auto flex items-center text-sm">
          <p class="pr-2 text-white">
            {{ $t("boost.title") }}
          </p>
        </div>
      </button>
    </div>

    <div class="grid grid-cols-3 gap-1 py-2">
      <article
        class="figure-shape"
        v-for="item in getWorkShop?.my_slots"
        :key="item.id"
        @click="goItem(item)"
      >
        <template v-if="!item.asic">
          <div class="poly-item">
            <img src="@/assets/images/shapes/red-hexagon-empty.png" />
          </div>
          <PolyEmpty :animationData="lottieJson" />
        </template>
        <template v-else>
          <div class="linear-border--red position-center-x" v-if="item?.asic?.info">
            <span class="text-xs text-cyan-400">{{ item?.asic?.repair_percent }}%</span>
          </div>
          <img class="aboslute position-center asic-icon" :src="item?.asic?.info?.image" />
          <div class="bg-shape-radial--fuchsia h-3/4 w-3/4 blur-sm"></div>
          <img class="figure-shape--bg" src="@/assets/images/shapes/red-hexagon-with-item.png" />
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
import Modal from "@/components/WorkShop/Modal.vue";
import { mapGetters } from "vuex";
import axios from 'axios'
import { useToast } from "vue-toastification";
import PolyEmpty from "@/components/WorkShop/PolyEmpty.vue";
import animationData from "@/assets/anim1.json";

export default {
  name: "WorkShopView",
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
          status: 3,
        },
      ],
      showModal: false,
      item: null,
      initData: null,
      toast: useToast(),
      lottieJson: animationData
    };
  },
  computed: {
    ...mapGetters([
      'getInitData',
      'getWorkShop'
    ]),
    lockedSlots(){
      return Number(this.getWorkShop?.max_up?.slots) - Number(this.getWorkShop?.grade?.slots)
    }
  },
  components: {
    Modal,
    PolyEmpty
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goHome);
    if(!this.getInitData){
      this.$store.commit('setInitData', tg?.initData)
      let data = {
        initData: tg?.initData,
        t: "workstation",
        a: "get",
      };
      axios.post("https://api.tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setWorkShop', res?.data?.data)
        } else{
          this.toast.error(res.data.status_text)
        }
      });
    } else{
      this.getWorkShopData()
    }
    if (this.$route?.query?.id) {
      try {
        this.getWorkShopData()
      } catch (error) {
      }
      setTimeout(() => {
        this.findAsicById(this.$route?.query?.id);
      }, 1000);
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
    getWorkShopData(){
      let data = {
        initData: this.getInitData,
        t: "workstation",
        a: "get",
      };
      axios.post("https://api.tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setWorkShop', res?.data?.data)
        } else{
          this.toast.error(res.data.status_text)
        }
      });
    },
    goMoreBoost() {
      this.$router.push({ name: "boost", query: { workshop: "active" } });
    },
    goItem(item){
      if(item?.asic){
        this.showModal = true
        this.item = item?.asic
      } else{
        this.$router.push('/farm')
      }
    },
    findAsicById(id){
      let result = this.getWorkShop?.my_slots.find(item => item.id == id);
      this.item = result.asic
      this.showModal = true;
    }
  },
};
</script>

<style lang="scss" scoped>
  .button-wrap{
    width: 100%;
    padding: 0 10px;
  }
  .asic-icon{
    width: 55%;
  }
  .cgrade-image{
    padding: 0 2px 0 14px;
  }
</style>