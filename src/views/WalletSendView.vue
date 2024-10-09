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
      <!-- SEND TON -->
      <input class="main-input w-full" :placeholder="$t('send-ton-placeholder')" />
    </div>
  </main>
</template>

<script>
export default {
  name: "WalletSendView",
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
