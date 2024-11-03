<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("leaderboard") }}
      </h2>
    </div>
    <div class="grid gap-2">
      <article class="relative p-2" v-for="item in leadersList" :key="item">
        <div class="linear-border--slate flex items-center">
          <div class="flex w-1/3 items-center">
            <div class="gold-circle-gradient h-11 w-11 flex-shrink-0 p-[2px]" v-if="item?.level == 1">
              <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
              <div class="linear-border--gold absolute -bottom-1 -right-1 py-[1px]">
                <span class="font-sf text-xs font-semibold text-slate-950">{{ item?.level }}</span>
              </div>
            </div>
            <div class="silver-circle-gradient h-11 w-11 flex-shrink-0 p-[2px]" v-else-if="item?.level == 2">
              <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
              <div class="linear-border--silver absolute -bottom-1 -right-1 py-[1px]">
                <span class="font-sf text-xs font-semibold text-slate-950">{{ item?.level }}</span>
              </div>
            </div>
            <div class="bronze-circle-gradient h-11 w-11 flex-shrink-0 p-[2px]" v-else-if="item?.level == 3">
              <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
              <div class="linear-border--bronze absolute -bottom-1 -right-1 py-[1px]">
                <span class="font-sf text-xs font-semibold text-slate-950">{{ item?.level }}</span>
              </div>
            </div>
            <div class="main-circle-gradient h-11 w-11 flex-shrink-0 p-[2px]" v-else>
              <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
              <div class="linear-border--main absolute -bottom-1 -right-1 py-[1px]">
                <span class="font-sf text-xs font-semibold text-blue-400">{{ item?.level }}</span>
              </div>
            </div>
            <div class="pl-1 text-[10px] text-white">{{ item?.first_name }}</div>
          </div>
          <div class="pl-2">
            <div class="flex text-[10px] text-slate-600">
              <span class="ml-auto py-1">{{ $t("income") }}</span>
            </div>
            <div class="flex items-center text-white">
              <p class="font-geist-mono text-xs font-medium">{{ item?.ton_per_hour }} {{$t("ton-hour")}}</p>
            </div>
          </div>
          <div class="ml-auto">
            <div class="flex text-[10px] text-slate-600">
              <span class="ml-auto py-1">
                {{ $t('total-mined') }}
              </span>
            </div>
            <div class="flex items-center text-white">
              <img class="mr-1 h-4 w-4" src="@/assets/images/icons/ton.png" />
              <p class="font-geist-mono text-xs font-medium">{{ item?.total_mined }} TON</p>
            </div>
          </div>
        </div>
      </article>
      <div class="position-center-x bottom-2 top-auto w-full px-1">
        <article class="linear-border--slate relative my-2 p-1">
          <div class="flex items-center rounded-xl bg-slate-950/50 p-2">
            <div class="flex w-1/3 items-center">
              <div class="gold-circle-gradient h-11 w-11 flex-shrink-0 p-[2px]" v-if="info?.me?.level == 1">
                <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
                <div class="linear-border--gold absolute -bottom-1 -right-1 py-[1px]">
                  <span class="font-sf text-xs font-semibold text-blue-400">1</span>
                </div>
              </div>
              <div class="silver-circle-gradient h-11 w-11 flex-shrink-0 p-[2px]" v-else-if="info?.me?.level == 2">
                <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
                <div class="linear-border--silver absolute -bottom-1 -right-1 py-[1px]">
                  <span class="font-sf text-xs font-semibold text-blue-400">2</span>
                </div>
              </div>
              <div class="bronze-circle-gradient h-11 w-11 flex-shrink-0 p-[2px]" v-else-if="info?.me?.level == 2">
                <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
                <div class="linear-border--bronze absolute -bottom-1 -right-1 py-[1px]">
                  <span class="font-sf text-xs font-semibold text-blue-400">3</span>
                </div>
              </div>
              <div class="main-circle-gradient h-11 w-11 flex-shrink-0 p-[2px]" v-else>
                <img class="rounded-[50%]" src="@/assets/images/avatars/03.png" />
                <div class="linear-border--main absolute -bottom-1 -right-1 py-[1px]">
                  <span class="font-sf text-xs font-semibold text-blue-400">{{ info?.me?.level }}</span>
                </div>
              </div>
              <div class="pl-1 text-[10px] text-white">{{ info?.me?.first_name }}</div>
            </div>
            <div class="pl-2">
              <div class="flex text-[10px] text-slate-600">
                <span class="ml-auto py-1">{{ $t("income") }}</span>
              </div>
              <div class="flex items-center text-white">
                <p class="font-geist-mono text-xs font-medium">{{ info?.me?.ton_per_hour }} {{$t("ton-hour")}}</p>
              </div>
            </div>
            <div class="ml-auto">
              <div class="flex text-[10px] text-slate-600">
                <span class="ml-auto py-1">{{ $t('total-mined') }}</span>
              </div>
              <div class="flex items-center text-white">
                <img class="mr-1 h-4 w-4" src="@/assets/images/icons/ton.png" />
                <p class="font-geist-mono text-xs font-medium">{{ info?.me?.total_mined }} TON</p>
              </div>
            </div>
          </div>
          <div class="linear-border--cyan absolute left-4 top-1 px-4 py-1">
            <span class="font-sf text-[10px] block text-white">{{ $t('you') }}</span>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: "LeaderboardView",
  data() {
    return {
      info: null
    }
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goBack);
    if(!this.getInitData){
      this.$store.commit('setInitData', tg?.initData)
    }
    this.getLeadersData()
  },
  computed: {
    ...mapGetters([
      'getInitData'
    ]),
    leadersList(){
      return this.info?.data.sort((a, b) => Number(a.level) - Number(b.level));
    }
  },
  methods: {
    goBack() {
      this.$router.push("/info");
    },
    getLeadersData(){
      let data = {
        initData: this.getInitData,
        t: "account",
        a: "get_leaders"
      }
      axios.post('https://tonminefarm.com/request', data).then(res => {
        if(res.data.status == 200){
          this.info = res.data
        }
      })
    }
  },
};
</script>
