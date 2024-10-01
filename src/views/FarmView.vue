<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">Farm</h2>
    </div>
    <div class="grid grid-cols-2 gap-5 py-6">
      <div class="relative">
        <h5 class="-mb-4 text-center font-patsy text-lg">
          <span class="text-white">Level 1</span> /5
        </h5>
        <div class="max-w-40">
          <img class="w-full" src="@/assets/images/sections/farm-2.png" />
        </div>
        <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
      </div>
      <div class="grid content-center pt-10">
        <div class="flex pb-2">
          <img class="h-8 w-8 flex-shrink-0" src="@/assets/images/icons/ton-slate.png" />
          <div class="pl-3">
            <p class="text-xs">Total mined</p>
            <p class="font-geist-mono font-semibold text-cyan-400">
              247 <span class="text-xs">TON</span>
            </p>
          </div>
        </div>
        <div class="main-blue-gradient"></div>
        <div class="flex pt-2">
          <img class="h-8 w-8 flex-shrink-0" src="@/assets/images/icons/power-consumption.png" />
          <div class="pl-3">
            <p class="text-xs">Power consumption</p>
            <p class="font-geist-mono font-semibold text-cyan-400">
              5 units/ <span class="-ml-2 text-xs">hour</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-1 py-2">
      <article class="figure-shape" v-for="item in list" :key="item.id" @click="showModalHandle(item)">
        <template v-if="item.status === 1">
          <img class="figure-shape--bg" src="@/assets/images/shapes/hexagon-empty.png" />
        </template>
        <template v-if="item.status === 2">
          <img class="aboslute position-center w-3/4" src="@/assets/images/stations/01.png" />
          <div class="bg-shape-radial--fuchsia h-3/4 w-3/4 blur-sm"></div>
          <img class="figure-shape--bg" src="@/assets/images/shapes/hexagon-with-item.png" />
        </template>
        <template v-if="item.status === 3">
          <div class="position-center">
            <img class="mx-auto mb-1 block w-8" src="@/assets/images/icons/lock.png" />
            <p class="font-patsy text-sm text-rose-400">Locked</p>
          </div>
          <img class="figure-shape--bg" src="@/assets/images/shapes/hexagon-locked.png" />
        </template>
      </article>
    </div>
  </main>
  <Modal :show="showModal" :item="item" @close="closeModal" />
</template>

<script>
import Modal from '@/components/Farm/Modal.vue'

export default {
  name: 'FarmView',
  data() {
    return {
      list: [
        {
          id: 1,
          title: 'Title 1',
          status: 1
        },
        {
          id: 2,
          title: 'Title 2',
          status: 2
        },
        {
          id: 3,
          title: 'Title 3',
          status: 3
        },
        {
          id: 4,
          title: 'Title 3',
          status: 3
        },
        {
          id: 5,
          title: 'Title 3',
          status: 3
        },
        {
          id: 6,
          title: 'Title 3',
          status: 3
        }
      ],
      showModal: false,
      item: null
    }
  },
  components: {
    Modal
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent('backButtonClicked', this.goHome);
  },
  methods: {
    goHome(){
      this.$router.push('/')
    },
    showModalHandle(item){
      if(item.status === 3){
        return false
      } else{
        this.showModal = true
        this.item = item
      }
    },
    closeModal() {
      this.showModal = false;
      this.item = null;
    }
  },
}
</script>