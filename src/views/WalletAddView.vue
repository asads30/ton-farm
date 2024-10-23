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
    <div class="py-4">
      <div class="text-md font-light text-center">Пополнить TON через TonConnect</div>
      <input type="text" placeholder="Введите сумму">
      <button>Пополнить</button>
    </div>
  </main>
</template>

<script>
export default {
  name: "WalletAddView",
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goBack);
  },
  methods: {
    goBack() {
      this.$router.push("/wallet");
    },
  },
};
</script>
