<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("wallet") }}
      </h2>
    </div>
    <ProfileCard />
    <div class="grid gap-4 py-4">
      <button class="menu-item p-3">
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
              {{ $t("wallet") }}
            </span>
          </p>
          <p class="text-xs font-medium text-green-400">
            {{ $t("connected") }}
          </p>
        </div>
        <button class="menu-item rounded-xl bg-cyan-400/20 p-2">
          <div class="flex items-center px-3">
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

      
      <router-link to="/wallet/add" class="menu-item p-3">
        <div class="flex items-center">
          <img class="mr-3 w-7" src="@/assets/images/icons/plus-circle.png" />
          <p class="mr-auto text-sm text-white">{{ $t("add-ton") }}</p>
          <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
        </div>
      </router-link>
      <router-link to="/wallet/send" class="menu-item p-3">
        <div class="flex items-center">
          <img class="mr-3 w-7" src="@/assets/images/icons/arrow-up-circle.png" />
          <p class="mr-auto text-sm text-white">
            {{ $t("send-ton") }}
          </p>
          <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
        </div>
      </router-link>
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
import {mapGetters} from 'vuex'

export default {
  name: "WalletView",
  data() {
    return {
      address: useTonAddress(),
    }
  },
  components: {
    Bottombar,
    ProfileCard
  },
  computed: {
    ...mapGetters([
      'getInitData'
    ])
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
      axios.post('https://tonminefarm.com/request', data)
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
    }
  },
  setup() {
    const userFriendlyAddress = useTonAddress();
    const { open } = useTonConnectModal();
    const { tonConnectUI } = useTonConnectUI();
    const disconnectWallet = async () => {
      try {
        await tonConnectUI.disconnect();
        console.log("Wallet disconnected");
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
</style>
