<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("bill-history") }}
      </h2>
    </div>
    <div class="py-4 px-1 grid gap-2">
      <template v-if="list.length > 0">
        <article class="relative p-1" v-for="item in list" :key="item.id">
          <div class="linear-border--slate flex items-center">
            <div class="flex items-center">
              <div class="main-circle-gradient h-10 w-10 p-2">
                <img src="@/assets/images/icons/light-document.png" />
              </div>
              <div class="pl-2 text-left">
                <p class="text-xs text-white bh-title">{{ item?.name }}</p>
                <p class="text-[10px] text-slate-600">
                  {{ formatTimestamp(item?.date) }}
                </p>
              </div>
            </div>
            <div class="ml-auto" v-if="item?.income == 1">
              <div class="flex items-center text-green-400">
                <img class="mr-1 h-4 w-4" src="@/assets/images/icons/ton.png" />
                <p class="font-geist-mono text-xs font-medium">+{{ item?.ton }} TON</p>
              </div>
              <div class="flex text-[10px] text-slate-600">
                <span class="ml-auto text-green-400">{{ $t('received') }}</span>
              </div>
            </div>
            <div class="ml-auto" v-else>
              <div class="flex items-center text-white">
                <img class="mr-1 h-4 w-4" src="@/assets/images/icons/ton.png" />
                <p class="font-geist-mono text-xs font-medium">{{ item?.ton }} TON</p>
              </div>
              <div class="flex text-[10px] text-slate-600">
                <span class="ml-auto">{{ $t("sent") }}</span>
              </div>
            </div>
          </div>
        </article>
      </template>
      <div class="flex min-h-80 items-center" v-else>
        <p class="mx-auto text-sm font-light text-zinc-300">
          {{ $t('bill-history-empty') }}
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { mapGetters } from 'vuex';

export default {
  name: 'BillHistoryView',
  data() {
    return {
      list: [],
      toast: useToast()
    }
  },
  computed: {
    ...mapGetters([
      'getInitData'
    ])
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.expand();
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goBack);
    if (this.$route?.query?.type) {
      if(!this.getInitData){
        this.$store.commit('setInitData', tg?.initData)
        let data = {
          initData: tg?.initData,
          t: "account",
          a: "get_payments",
          type: this.$route?.query?.type,
          id: "0"
        };
        axios.post("https://api.tonminefarm.com/request", data).then((res) => {
          if(res.data.status == 200){
            this.list = res.data.data
          } else{
            this.toast.error(res.data.status_text);
          }
        })
      } else{
        this.getBillHistory(this.$route?.query?.type)
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/boost')
    },
    getBillHistory(type){
      let data = {
        initData: this.getInitData,
        t: "account",
        a: "get_payments",
        type: type,
        id: "0"
      };
      axios.post("https://api.tonminefarm.com/request", data).then((res) => {
        if(res.data.status == 200){
          this.list = res.data.data
        } else{
          this.toast.error(res.data.status_text);
        }
      })
    },
    formatTimestamp(unixTime) {
      const date = new Date(unixTime * 1000);
      const options = {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
      };
      return date.toLocaleDateString('ru-RU', options);
    }
  },
}
</script>

<style lang="scss" scoped>
  .bh-title{
    width: calc(100% - 10px);
  }
</style>