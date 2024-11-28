<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("wallet.title") }}
      </h2>
    </div>
    <ProfileCard />
    <div class="py-4">
      <div class="text-xs font-light text-zinc-300">
        {{ $t("transaction-history") }}
      </div>
      <div class="grid gap-2 py-2 wallet-list" @scroll="handleScroll">
        <template v-if="info?.length > 0">
          <div class="relative p-1" v-for="item in info" :key="item.id">
            <div class="linear-border--slate flex items-center">
              <div class="flex items-center">
                <div class="main-circle-gradient h-10 w-10 p-2">
                  <img class="rounded-[50%]" src="@/assets/images/icons/wallet-receive.png" />
                </div>
                <div class="pl-2 text-left">
                  <p class="text-xs text-white">{{ item.name }}</p>
                  <p class="text-[10px] text-slate-600">
                    {{ formatTimestamp(item?.date) }}
                  </p>
                </div>
              </div>
              <div class="ml-auto" v-if="item?.type == 'payout_request'">
                <div class="flex items-center text-white">
                  <img class="mr-1 h-4 w-4" src="@/assets/images/icons/ton.png" />
                  <p class="font-geist-mono text-xs font-medium">{{ item?.ton }} TON</p>
                </div>
                <div class="flex text-[10px] text-slate-600">
                  <span class="ml-auto" v-if="item?.status == 0">{{ $t("wallet.history.status1") }}</span>
                  <span class="ml-auto" v-if="item?.status == 1">{{ $t("wallet.history.status2") }}</span>
                  <span class="ml-auto" v-if="item?.status == 2">{{ $t("wallet.history.status3") }}</span>
                </div>
              </div>
              <div class="ml-auto" v-else>
                <div class="flex items-center text-green-400">
                  <img class="mr-1 h-4 w-4" src="@/assets/images/icons/ton.png" />
                  <p class="font-geist-mono text-xs font-medium">+{{ item?.ton }} TON</p>
                </div>
                <div class="flex text-[10px] text-slate-600">
                  <span class="ml-auto text-green-400">{{ $t('received') }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="flex min-h-80 items-center" v-else>
          <p class="mx-auto text-sm font-light text-zinc-300">
            {{ $t('transaction-history-empty') }}
          </p>
        </div> 
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import ProfileCard from "@/components/ProfileCard.vue";
import { useToast } from 'vue-toastification';

export default {
  name: "WalletHistoryView",
  data() {
    return {
      info: null,
      lastId: 0,
      toast: useToast()
    }
  },
  components: {
    ProfileCard
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goBack);
    if(!this.getInitData){
      this.$store.commit('setInitData', tg?.initData)
    }
  },
  computed: {
    ...mapGetters([
      'getInitData'
    ])
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goBack);
    if(!this.getInitData){
      this.$store.commit('setInitData', tg?.initData)
    }
    this.loadMore()
  },
  methods: {
    goBack() {
      this.$router.push("/wallet");
    },
    handleScroll(event) {
      const bottomReached =
        event.target.scrollTop + event.target.clientHeight >=
        event.target.scrollHeight - 10;
      console.log(bottomReached)
      if (bottomReached) {
        this.loadMore(); 
      }
    },
    loadMore() {
      this.loading = true;
      try {
        let data = {
          initData: this.getInitData,
          t: "account",
          a: "get_payments",
          type: "bill",
          id: this.lastId
        };
        axios.post("https://api.tonminefarm.com/request", data).then((res) => {
          if (res.data.status === 200) {
            if(this.info){
              this.info = [...this.info, ...res.data.data];
            } else{
              this.info = res.data.data
            }
            this.lastId = res.data.last_id
          } else{
            this.toast.error(res.data.status_text);
          }
        });
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
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
};
</script>

<style lang="scss" scoped>
  .wallet-list{
    height: calc(100vh - 140px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
</style>