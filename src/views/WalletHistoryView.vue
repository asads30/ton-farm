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
        <p class="font-patsy text-amber-400">Level 8</p>
      </div>
      <div class="ml-auto mr-10">
        <div class="flex items-center font-geist-mono text-blue-400">
          <p>28,5</p>
          <span class="pl-2 text-xs">TON</span>
        </div>
      </div>
    </div>
    <div class="py-4">
      <div class="text-xs font-light text-zinc-300">
        {{ $t("transaction-history") }}
      </div>
      <div class="grid gap-2 py-2">
        <div class="relative p-1">
          <div class="linear-border--slate flex items-center">
            <div class="flex items-center">
              <div class="main-circle-gradient h-10 w-10 p-2">
                <img class="rounded-[50%]" src="@/assets/images/icons/wallet-receive.png" />
              </div>
              <div class="pl-2 text-left">
                <p class="text-xs text-white">{{ $t("transfer-to") }} TON Space</p>
                <p class="text-[10px] text-slate-600">
                  {{ $t("day-month-time", { day: 6, month: "апрель", time: "11:43" }) }}
                </p>
              </div>
            </div>
            <div class="ml-auto">
              <div class="flex items-center text-white">
                <img class="mr-1 h-4 w-4" src="@/assets/images/icons/ton.png" />
                <p class="font-geist-mono text-xs font-medium">18.05 TON</p>
              </div>
              <div class="flex text-[10px] text-slate-600">
                <span class="ml-auto">{{ $t("sent") }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="relative p-1">
          <div class="linear-border--slate flex items-center">
            <div class="flex items-center">
              <div class="main-circle-gradient h-10 w-10 p-2">
                <img class="rounded-[50%]" src="@/assets/images/icons/wallet-accept.png" />
              </div>
              <div class="pl-2 text-left">
                <p class="text-xs text-white">{{ $t("top-up-from") }} EQ...uf0g</p>
                <p class="text-[10px] text-slate-600">
                  {{ $t("day-month-time", { day: 6, month: "апрель", time: "11:43" }) }}
                </p>
              </div>
            </div>
            <div class="ml-auto">
              <div class="flex items-center text-green-400">
                <img class="mr-1 h-4 w-4" src="@/assets/images/icons/ton.png" />
                <p class="font-geist-mono text-xs font-medium">+18.9613 TON</p>
              </div>
              <div class="flex text-[10px] text-slate-600">
                <span class="ml-auto text-green-400">
                  {{ $t("received") }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- iF NO TRANSACTIONS -->
        <!-- 
            <div class="flex min-h-80 items-center">
              <p class="mx-auto text-sm font-light text-zinc-300">
                {{ $t('transaction-history-empty') }}
              </p>
            </div>
            -->
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "WalletHistoryView",
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
