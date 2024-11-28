<template>
  <main class="relative change-box">
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
    <div class="change-bottom">
      <button class="main-action--green change-btn" @click="changeLanguage" :disabled="loading">
        <p class="pr-2 text-white">{{ $t("ok") }}</p>
      </button>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import {mapGetters} from 'vuex';

export default {
  name: 'ChooseLanguageView',
  data() {
    return {
      toast: useToast(),
      loading: false
    }
  },
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
    goHome() {
      this.$router.push("/");
    },
    async changeLanguage() {
      if (this.loading) return; // Предотвращение повторного вызова
      this.loading = true;
      const data = {
          initData: this.getInitData,
          t: "account",
          a: "change_lang",
          lang: this.$i18n.locale,
      };
      try {
          const res = await axios.post("https://api.tonminefarm.com/request", data);

          if (res.data.status === 200) {
              this.$router.push("/info");
          } else {
              this.toast.error(res.data.status_text);
          }
      } catch (error) {
          console.error("Ошибка смены языка:", error);
          this.toast.error("Произошла ошибка при смене языка.");
      } finally {
          this.loading = false;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .change-box{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 0 20px;
  }
  .main-action--green{
    z-index: 5;
  }
  .change-bottom{
    padding: 0 10px;
  }
  .change-btn{
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
  }
</style>