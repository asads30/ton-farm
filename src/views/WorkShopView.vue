<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("workshop") }}
      </h2>
    </div>
    <div class="grid grid-cols-2 gap-5 py-6">
      <div class="relative">
        <h5 class="-mb-4 text-center font-patsy text-lg">
          <span class="text-white">
            {{ $t("grade") }} {{ getWorkShop?.grade?.level }}</span> /{{ getWorkShop?.max_up?.level }}
        </h5>
        <div class="max-w-40 mt-2">
          <img class="w-full" :src="getWorkShop?.grade?.image" />
        </div>
        <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
      </div>
      <div class="grid content-center pt-10">
        <div class="flex items-center pb-2">
          <img
            class="h-6 w-6 flex-shrink-0 object-contain"
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

    <button @click="goMoreBoost" class="main-action--green">
      <div class="mx-auto flex items-center text-sm">
        <p class="pr-2 text-white">
          {{ $t("boost") }}
        </p>
      </div>
    </button>

    <div class="grid grid-cols-3 gap-1 py-2">
      <article
        class="figure-shape"
        v-for="item in getWorkShop?.my_slots"
        :key="item.id"
        @click="goItem(item)"
      >
        <template v-if="!item.asic">
          <img class="figure-shape--bg" src="@/assets/images/shapes/red-hexagon-empty.png" />
        </template>
        <template v-else>
          <div class="linear-border--red position-center-x" v-if="item?.asic?.info">
            <span class="text-xs text-cyan-400">{{ item?.asic?.repair_percent }}%</span>
          </div>
          <img class="aboslute position-center w-3/4" :src="item?.asic?.info?.image" />
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
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goHome);
    if(!this.getPowerStation){
      this.getWorkShopData()
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
        initData: this.getInitData ? this.getInitData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
        t: "workstation",
        a: "get",
      };
      axios.post("https://tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setWorkShop', res?.data?.data)
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
    }
  },
};
</script>
