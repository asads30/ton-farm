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
  <Modal :show="showModal" :item="item" :variant="variant" @close="closeModal" />
</template>

<script>
import Bottombar from "@/components/Bottombar.vue";
import Farm from "@/components/Boost/Farm/Index.vue";
import PowerStation from "@/components/Boost/PowerStation/Index.vue";
import WorkShop from "@/components/Boost/WorkShop/Index.vue";
import Modal from "@/components/Boost/Modal.vue";

export default {
  name: "BoostView",
  data() {
    return {
      active: 1
    };
  },
  components: {
    Bottombar,
    Modal,
    Farm,
    PowerStation,
    WorkShop
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
  },
  methods: {
    goActive(num) {
      this.active = num;
    }
  }
};
</script>
