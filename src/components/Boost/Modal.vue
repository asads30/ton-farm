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
      <button class="main-action--green mt-5" @click="levelUp" v-if="variant == 1">
        <div class="mx-auto flex items-center py-1 text-sm">
          <p class="pr-2 text-white">{{ $t("pay") }}</p>
          <p class="font-geist-mono font-semibold text-cyan-400">{{ item?.next_level?.cost }} TON</p>
        </div>
      </button>
      <button class="main-action--green mt-5" @click="gradeUp" v-else>
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
      toast: useToast()
    }
  },
  props: {
    show: Boolean,
    variant: Number,
    item: Object
  },
  computed: {
    ...mapGetters([
      'getInitData'
    ])
  },
  methods: {
    closeModal() {
      this.$emit("close");
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
    },
    levelUp(){
      let data = {
        initData: this.getInitData ? this.getInitData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
        t: "powerstation",
        a: "boost",
        type: "level_up"
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
    },
    gradeUp(){
      let data = {
        initData: this.getInitData ? this.getInitData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
        t: "powerstation",
        a: "boost",
        type: "grade_up"
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
    }
  },
};
</script>
