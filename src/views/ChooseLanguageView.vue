<template>
  <main class="relative">
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">{{ $t("choose-language") }}</h2>
    </div>
    <div class="py-10 px-2 mt-20">
      <label class="main-radio px-2">
        <img class="w-8" src="@/assets/images/icons/flag-english.png" />
        <input type="radio" name="language" value="en" v-model="$i18n.locale" />
        <span class="pl-4 text-white/75">{{ $t("english") }}</span>
      </label>
      <div class="h-[1px] w-full bg-slate-800 my-3"></div>
      <label class="main-radio px-2">
        <img class="w-8" src="@/assets/images/icons/flag-russian.png" />
        <input type="radio" name="language" value="ru" v-model="$i18n.locale" />
        <span class="pl-4 text-white/75">{{ $t("russian") }}</span>
      </label>
    </div>
  </main>
  <div class="sticky bottom-4">
    <div class="main-action--green mx-5">
      <button class="mx-auto flex items-center py-1 text-sm" @click="changeLanguage">
        <p class="pr-2 text-white">{{ $t("ok") }}</p>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from 'vuex';

export default {
  name: 'ChooseLanguageView',
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.expand();
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goHome)
    if(!this.getInitData){
      this.$store.commit('setInitData', tg?.initData)
    }
  },
  computed: {
    ...mapGetters([
        'getInitData'
    ]),
  },
  methods: {
    changeLanguage(){
      let data = {
        initData: this.getInitData,
        t: "account",
        a: "change_lang",
        lang: this.$i18n.locale
      };
      try {
        axios.post("https://tonminefarm.com/request", data).then((res) => {
          if(res.data.status == 200){
            this.$router.push('/info')
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    goHome() {
      this.$router.push("/");
    }
  },
}
</script>