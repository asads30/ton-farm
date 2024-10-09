<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("wallet") }}
      </h2>
    </div>
    <div class="profile-card">
      <div class="main-circle-gradient h-11 w-11 p-1">
        <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
      </div>
      <div class="pl-2 text-sm">
        <p class="text-sm text-white">Nick Jay</p>
        <p class="font-patsy text-amber-400">{{ $t("level") }} 8</p>
      </div>
      <div class="ml-auto mr-10">
        <div class="flex items-center font-geist-mono text-blue-400">
          <p>28,5</p>
          <span class="pl-2 text-xs">TON</span>
        </div>
      </div>
    </div>
    <div class="grid gap-4 py-4">
      <button class="menu-item p-3">
        <div class="flex items-center">
          <img class="mr-3 w-7" src="@/assets/images/icons/wallet.png" />
          <p class="text-sm text-white">
            {{ $t("connect-wallet") }}
          </p>
        </div>
      </button>
      <div class="linear-border--slate relative p-3">
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
            <p class="mr-auto text-xs text-white">EQDo...IetE</p>
            <p class="p-1 text-xs text-white">{{ $t("copy") }}</p>
          </div>
        </button>

        <div class="py-1"></div>

        <button class="menu-item rounded-xl p-2">
          <div class="flex justify-center">
            <p class="text-xs text-white">{{ $t("unlink") }}</p>
          </div>
        </button>
      </div>

      <div class="py-5">
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

export default {
  name: "WalletView",
  components: {
    Bottombar,
  },
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.hide();
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
  },
};
</script>
