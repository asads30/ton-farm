<template>
  <main>
    <div class="pb-2 text-center px-1">
      <h2 class="font-patsy text-3xl text-white mb-2">
        {{ $t("invite-friends") }}
      </h2>
      <div class="flex items-center text-xs font-light">
        <p class="text-zinc-300">
          {{ $t("receive-bonuses") }}
        </p>
      </div>
    </div>
    <ProfileCard />
    <div class="linear-border--slate relative p-3 my-2">
      <div class="flex items-center text-left">
        <p class="mr-auto font-light text-zinc-300 text-xs">
          {{ $t("referral-total-income") }}
        </p>
        <p class="font-geist-mono text-lg">5%</p>
      </div>
      <div class="h-[1px] w-full bg-slate-800 my-2"></div>
      <div class="flex items-center text-left">
        <p class="mr-auto font-light text-zinc-300 text-xs">
          {{ $t("refferal.level") }}
        </p>
        <p class="font-geist-mono text-lg">{{ getReferrals?.ref_level }}</p>
      </div>
      <div class="h-[1px] w-full bg-slate-800 my-2"></div>
      <div class="flex items-center text-left">
        <p class="mr-auto font-light text-zinc-300">
          {{ $t("total-referrals") }}
        </p>
        <p class="font-geist-mono text-lg">{{ getReferrals?.count }}</p>
      </div>
    </div>
    <div class="relative mt-5 pt-2">
      <div class="linear-border--slate p-3">
        <div class="linear-border position-center-x -top-2 bg-gray-950">
          <span class="font-sf text-xs text-blue-500">
            {{ $t("referral-link") }}
          </span>
        </div>
        <div class="break-words pr-10 text-xs text-blue-500">{{ url }}</div>
        <button class="absolute right-4 top-5 p-1" @click="copyLink">
          <img class="w-4" src="@/assets/images/icons/copy.png" />
        </button>
      </div>
    </div>
    <div class="pt-1 text-center text-[10px] text-slate-600">
      {{ $t("copy-referral") }}
    </div>
    <button @click="share" class="linear-border--slate relative ml-auto mt-2 w-100 share-btn">
      <div class="flex items-center gap-1 p-1 justify-center">
        <img class="w-5" src="@/assets/images/icons/share.png" />
        <span class="text-white">
          {{ $t("share") }}
        </span>
      </div>
    </button>
    <div class="py-4">
      <div class="flex px-5 text-xs text-zinc-300">
        <p>{{ $t("name") }}</p>
        <p class="ml-auto">{{ $t("income-hour") }}</p>
      </div>
      <div class="py-2 grid gap-2">
        <div class="relative p-2" v-for="referall in getReferrals?.data" :key="referall">
          <div class="linear-border--slate flex items-center">
            <div class="main-circle-gradient h-11 w-11 p-1">
              <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
            </div>
            <div class="text-sm text-white pl-2">{{ referall?.first_name }}</div>
            <div class="flex items-center text-white ml-auto">
              <img class="mr-1 h-4 w-4" src="@/assets/images/icons/ton.png" />
              <p class="font-geist-mono text-xs font-medium">{{ referall?.ton_per_hour }} TON</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Bottombar />
</template>

<script>
import Bottombar from "@/components/Bottombar.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import { mapGetters } from "vuex";
import axios from 'axios'

export default {
  name: "Referral",
  data() {
    return {
      url: null
    }
  },
  components: {
    Bottombar,
    ProfileCard
  },
  computed: {
    ...mapGetters([
      'getReferrals',
      'getInitData'
    ]),
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    let user = tg?.initDataUnsafe;
    this.url = 'https://t.me/asadslavatestbot/tonfarm?startapp=' + user?.user?.id
    this.id = user?.user?.id
    tg.BackButton.hide();
    if(!this.getReferrals){
      this.getReferralsData()
    }
    if(!this.getInitData){
      this.$store.commit('setInitData', tg?.initData)
    }
  },
  methods: {
    copyLink() {
      const copyText = "https://t.me/";
      navigator.clipboard.writeText(copyText).then(
        function () {
          alert("Ссылка скопирована: " + copyText);
        },
        function (err) {
          console.error("Ошибка копирования ссылки: ", err);
        }
      );
    },
    getReferralsData(){
      let data = {
        initData: this.getInitData,
        t: "account",
        a: "get_ref",
      };
      axios.post("https://tonminefarm.com/request", data).then((res) => {
        if (res.data.status === 200) {
          this.$store.commit('setReferrals', res?.data)
        }
      });
    },
    share(){
      let url = 'https://t.me/share/url?url=https://t.me/asadslavatestbot/tonfarm?startapp=' + this.id + '&text=Ton%20Farm%0AStart%20mining%20now%21'
      window.open(url)
    }
  },
};
</script>
