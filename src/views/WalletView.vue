<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("wallet.title") }}
      </h2>
    </div>
    <ProfileCard />
    <div class="grid gap-4 py-4">
      <button class="menu-item p-3" @click="open" v-if="!userFriendlyAddress">
        <div class="flex items-center">
          <img class="mr-3 w-7" src="@/assets/images/icons/wallet.png" />
          <p class="text-sm text-white">
            {{ $t("connect-wallet") }}
          </p>
        </div>
      </button>
      <div class="linear-border--slate relative p-3" v-if="userFriendlyAddress">
        <div class="mb-3 flex items-center">
          <img class="mr-3 w-7" src="@/assets/images/icons/wallet.png" />
          <p class="mr-auto text-sm text-white">
            TON
            <span class="lowercase text-xs">
              {{ $t("wallet.title") }}
            </span>
          </p>
          <p class="text-xs font-medium text-green-400">
            {{ $t("connected") }}
          </p>
        </div>
        <button class="menu-item rounded-xl bg-cyan-400/20 p-2">
          <div class="flex items-center wallet-address">
            <p class="mr-auto text-xs text-white">{{ userFriendlyAddress }}</p>
          </div>
        </button>

        <div class="py-1"></div>

        <button class="menu-item rounded-xl p-2" v-if="userFriendlyAddress" @click="disconnectWallet">
          <div class="flex justify-center">
            <p class="text-xs text-white">{{ $t("unlink") }}</p>
          </div>
        </button>
      </div>
      <h3>{{ $t('wallet.types') }}</h3>
      <button @click="depositTonConnect" class="menu-item p-3">
        <div class="flex items-center">
          <img class="mr-3 w-7" src="@/assets/images/icons/plus-circle.png" />
          <p class="mr-auto text-sm text-white">{{ $t('wallet.ton') }}</p>
          <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
        </div>
      </button>
      <button @click="depositTon" class="menu-item p-3" :disabled="loading1">
        <div class="flex items-center">
          <img class="mr-3 w-7" src="@/assets/images/icons/plus-circle.png" />
          <p class="mr-auto text-sm text-white">{{ $t('wallet.p2p') }}</p>
          <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
        </div>
      </button>
      <h3>{{ $t('wallet.other') }}</h3>
      <button @click="payoutTon" class="menu-item p-3">
        <div class="flex items-center">
          <img class="mr-3 w-7" src="@/assets/images/icons/arrow-up-circle.png" />
          <p class="mr-auto text-sm text-white">{{ $t('wallet.payout') }}</p>
          <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
        </div>
      </button>
      <router-link to="/wallet/history" class="menu-item p-3">
        <div class="flex items-center">
          <img class="mr-3 w-7" src="@/assets/images/icons/transactions.png" />
          <p class="mr-auto text-sm text-white">
            {{ $t("transaction-history") }}
          </p>
          <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
        </div>
      </router-link>
    </div>
    <section class="modal border-radiant" v-if="showModal">
        <button class="absolute right-5 top-5" @click="showModal = false">
            <img class="w-6" src="@/assets/images/icons/close.png" />
        </button>
        <div class="pb-4">
            <div class="pb-1 text-center">
                <h4 class="modal-wallet-title">{{ $t('wallet.p2p') }}</h4>
            </div>
            <div class="relative mt-5 pt-2">
              <div class="p-3 wallet-item">
                <div class="linear-border position-center-x -top-2 bg-gray-950">
                  <span class="font-sf text-xs text-blue-500">TON</span>
                </div>
                <div class="break-words pr-10 text-xs text-blue-500">{{ info?.admin_address }}</div>
                <button class="absolute right-4 top-5 p-1" @click="copyLink(info?.admin_address)">
                  <img class="w-4" src="@/assets/images/icons/copy.png" />
                </button>
              </div>
            </div>
            <div class="relative mt-5 pt-2">
              <div class="p-3 wallet-item">
                <div class="linear-border position-center-x -top-2 bg-gray-950">
                  <span class="font-sf text-xs text-blue-500">MEMO</span>
                </div>
                <div class="break-words pr-10 text-xs text-blue-500">{{ info?.hash }}</div>
                <button class="absolute right-4 top-5 p-1" @click="copyLink(info?.hash)">
                  <img class="w-4" src="@/assets/images/icons/copy.png" />
                </button>
              </div>
            </div>
            <div class="relative mt-4 pt-2 text-center">
              <p>{{ $t('wallet.left') }}: {{ formattedTime }}</p>
            </div>
            <div class="wallet-bottom">
                <div class="main-action--green">
                    <div class="mx-auto flex items-center py-1 text-sm">
                        <p class="pr-2 text-white" @click="showModal = false">{{ $t('wallet.translate') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </main>
  <Bottombar />
</template>

<script>
import Bottombar from "@/components/Bottombar.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import { useTonAddress } from '@townsquarelabs/ui-vue';
import { useTonConnectModal } from '@townsquarelabs/ui-vue';
import { useTonConnectUI } from '@townsquarelabs/ui-vue';
import axios from 'axios'
import { useToast } from "vue-toastification";
import {mapGetters} from 'vuex'
import { useRouter } from "vue-router";

export default {
  name: "WalletView",
  data() {
    return {
      address: useTonAddress(),
      toast: useToast(),
      showModal: false,
      info: null,
      remainingTime: 600,
      timer: null,
      router: useRouter(),
      loading1: false
    }
  },
  components: {
    Bottombar,
    ProfileCard
  },
  computed: {
    ...mapGetters([
      'getInitData',
      'getUser'
    ]),
    formattedTime() {
      const minutes = String(Math.floor(this.remainingTime / 60)).padStart(2, '0');
      const seconds = String(this.remainingTime % 60).padStart(2, '0');
      return `${minutes}:${seconds}`;
    },
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.hide();
    if(this.address){
      const data = {
        initData: this.getInitData,
        t: "account",
        a: "set_address",
        address: this.address
      }
      axios.post('https://api.tonminefarm.com/request', data)
    }
    if(!this.getInitData){
      this.$store.commit('setInitData', tg?.initData)
    }
  },
  methods: {
    copyLink(text) {
      navigator.clipboard.writeText(text).then(
        this.toast.success(this.$i18n.locale == 'ru' ? 'Скопировано' : 'Copied')
      );
    },
    startTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.remainingTime = 600;
      this.timer = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime -= 1;
        } else {
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    },
    depositTonConnect(){
      if(this.address){
        this.router.push('/wallet/add')
      } else{
        this.toast.error(this.$i18n.locale == 'ru' ? 'Подключите кошелек' : 'Connect wallet')
      }
    },
    depositTon(){
      this.loading1 = true
      try {
        let data = {
          t: "transactions",
          a: "create",
          initData: this.getInitData
        }
        axios.post('https://api.tonminefarm.com/request', data).then(res => {
          if(res.data.status == 200){
            this.info = res.data.data
            this.showModal = true
            this.startTimer()
          } else{
            this.toast.error(res.data.status_text);
          }
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loading1 = false
      }
    },
    payoutTon(){
      if(this.getUser?.balance > 1){
        this.$router.push('/wallet/send')
      } else{
        if(this.$i18n.locale == 'ru'){
          this.toast.error('Минимальная сумма вывода - 1 TON')
        } else{
          this.toast.error('The minimum withdrawal amount is 1 TON')
        }
      }
    }
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  setup() {
    const userFriendlyAddress = useTonAddress();
    const { open } = useTonConnectModal();
    const { tonConnectUI } = useTonConnectUI();
    const disconnectWallet = async () => {
      try {
        await tonConnectUI.disconnect();
      } catch (error) {
        console.error("Failed to disconnect wallet", error);
      }
    };
    return {
      userFriendlyAddress,
      open,
      disconnectWallet
    }
  }
};
</script>

<style lang="scss">
  #ton-connect-button{
    width: 100% !important;
    div{
      width: 100% !important;
      button{
        width: 100% !important;
      }
    }
  }
  .wallet-item{
    border: 1px dashed rgba(19, 29, 57, 1);
    border-radius: 14px;
  }
  .modal-wallet-title{
    font-size: 24px;
    line-height: 29.76px;
    font-weight: 500;
    width: 226px;
    margin: 0 auto;
  }
  .wallet-bottom{
    padding-top: 100px;
  }
</style>
