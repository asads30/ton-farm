<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("wallet") }}
      </h2>
    </div>
    <ProfileCard />
    <div class="py-4">
      <div class="text-sm font-light text-center">{{ $t("add-ton-crypto-transfer") }}</div>
      <div class="relative mt-5 pt-2">
        <div class="linear-border--slate p-3">
          <div class="linear-border position-center-x -top-2 bg-gray-950">
            <span class="font-sf text-xs text-blue-500">{{ $t("wallet-address") }}</span>
          </div>
          <div class="relative break-words pb-8">
            <div class="pr-10 text-xs text-blue-500 absolute w-11/12">
              0x790b44b9863599568a5b154e1a66de67f1bfd6d8f363ab03bb2b1e4e3350c313
            </div>
          </div>
          <button class="absolute right-4 top-5 p-1" @click="copyLink">
            <img class="w-4" src="@/assets/images/icons/copy.png" />
          </button>
          <div class="h-[1px] w-full bg-slate-800 my-2"></div>
          <div class="flex items-center text-blue-500 text-sm">
            <p>{{ $t("network") }}:</p>
            <p class="ml-auto">TON</p>
          </div>
        </div>
      </div>
      <div class="text-center text-white/80 text-xs font-light p-1">
        {{ $t("copy-wallet-address") }}
      </div>
    </div>
    <div class="wallet-add">
      <div class="text-md font-light text-center wallet-add-title">Пополнить TON через TonConnect</div>
      <input type="text" placeholder="Введите сумму" class="wallet-add-input">
      <button class="wallet-add-btn" @click="sendTransaction">Пополнить</button>
    </div>
  </main>
</template>

<script>
import ProfileCard from '@/components/ProfileCard.vue';
import { useTonConnectUI } from '@townsquarelabs/ui-vue';
import { mapGetters } from 'vuex';

export default {
  name: "WalletAddView",
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
  methods: {
    goBack() {
      this.$router.push("/wallet");
    },
  },
  setup(){
    const {tonConnectUI, setOptions} = useTonConnectUI();
    setOptions({ 
      language: 'ru',
      twaReturnUrl: "https://t.me/asadslavatestbot/myapp"
    });
    const myTransaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60,
      messages: [
        {
          address: "0:6946c7a425ba3a32c25a7d764f5f5d713935ef668a77bb7c8c929f4b9dd5f9d0",
          amount: "100000000"
        }
      ]
    }
    const sendTransaction = () => {
      tonConnectUI.sendTransaction(myTransaction).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
    };

    return { sendTransaction };
  }
};
</script>

<style lang="scss" scoped>
  .wallet-add{
    padding: 0 20px;
    &-title{
      margin-bottom: 20px;
    }
    &-input{
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      padding: 0 15px;
      font-size: 14px;
      color: #000;
      margin-bottom: 10px;
      &:focus{
        outline: 0;
        border: 0;
      }
    }
    &-btn{
      width: 100%;
      height: 40px;
      background: rgb(59,130,246);
      color: #fff;
      text-align: center;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 700;
    }
  }
</style>