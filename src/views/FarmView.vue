<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("farm") }}
      </h2>
    </div>
    <div class="grid grid-cols-2 gap-5 py-6">
      <div class="relative">
        <h5 class="-mb-4 text-center font-patsy text-lg">
          <span class="text-white"> {{ $t("level") }} 1</span> /5
        </h5>
        <div class="max-w-40 mt-8">
          <img class="w-full" src="@/assets/images/sections/farm-2.png" />
        </div>
        <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
      </div>
      <div class="grid content-center pt-10">
        <div class="flex py-1">
          <img class="h-9 w-9 flex-shrink-0 grayscale" src="@/assets/images/icons/generator.png" />
          <div class="pl-3">
            <p class="text-xs">
              {{ $t("ups") }}
            </p>
            <p class="font-geist-mono text-xs font-semibold">
              {{ $t("not-installed") }}
              <!-- <span class="text-green-500">{{ $t("installed") }}</span> -->
            </p>
          </div>
        </div>
        <div class="main-blue-gradient"></div>
        <div class="flex py-1 items-center">
          <img class="h-9 w-9 flex-shrink-0" src="@/assets/images/icons/ton-slate.png" />
          <div class="pl-3">
            <p class="text-xs">
              {{ $t("uninterrupted-operation") }}
            </p>
            <p class="font-geist-mono font-semibold text-cyan-400">
              247 <span class="text-xs">TON</span>
            </p>
          </div>
        </div>
        <div class="main-blue-gradient"></div>
        <div class="flex py-1">
          <img class="h-8 w-8 flex-shrink-0" src="@/assets/images/icons/power-consumption.png" />
          <div class="pl-3">
            <p class="text-xs">
              {{ $t("power-consumption") }}
            </p>
            <p class="font-geist-mono font-semibold text-cyan-400">
              5
              <span class="text-xs">
                {{ $t("units-hour") }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="main-action--green m-2">
      <div class="mx-auto flex items-center text-sm">
        <p class="pr-2 text-white">
          {{ $t("boost") }}
        </p>
      </div>
    </div>

    <div class="main-action--amber m-2">
      <div class="mx-auto flex items-center text-sm">
        <p class="pr-2 text-white">
          {{ $t("restart-mining") }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-1 py-2">
      <article
        class="figure-shape"
        v-for="item in list"
        :key="item.id"
        @click="showModalHandle(item)"
      >
        <template v-if="item.status === 1">
          <img class="figure-shape--bg" src="@/assets/images/shapes/hexagon-empty.png" />
        </template>
        <template v-if="item.status === 2">
          <div class="linear-border--main position-center-x">
            <span class="text-xs text-cyan-400">75%</span>
          </div>
          <img class="aboslute position-center w-2/3" src="@/assets/images/stations/01.png" />
          <div class="bg-shape-radial--fuchsia h-3/4 w-3/4 blur-sm"></div>
          <img class="figure-shape--bg" src="@/assets/images/shapes/hexagon-with-item.png" />
        </template>
        <template v-if="item.status === 3">
          <div class="position-center">
            <img class="mx-auto mb-1 block w-8" src="@/assets/images/icons/lock.png" />
            <p class="font-patsy text-xs text-rose-400">
              {{ $t("locked") }}
            </p>
          </div>
          <img class="figure-shape--bg" src="@/assets/images/shapes/hexagon-locked.png" />
        </template>
        <template v-if="item.status === 4">
          <div class="linear-border--rose position-center-x">
            <span class="text-xs text-rose-500">75%</span>
          </div>
          <img class="aboslute position-center w-2/3" src="@/assets/images/stations/01.png" />
          <div class="bg-shape-radial--fuchsia h-3/4 w-3/4 blur-sm"></div>
          <img class="figure-shape--bg" src="@/assets/images/shapes/hexagon-wrong.png" />
        </template>
      </article>
    </div>
  </main>
  <Modal :show="showModal" :item="item" @close="closeModal" />
</template>

<script>
import Modal from "@/components/Farm/Modal.vue";

export default {
  name: "FarmView",
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
          status: 4,
        },
      ],
      showModal: false,
      item: null,
    };
  },
  components: {
    Modal,
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goHome);
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
  },
};
</script>
