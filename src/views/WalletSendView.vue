<template>
    <main>
        <div class="pb-4 text-center">
          <h2 class="font-patsy text-3xl text-white">Wallet</h2>
        </div>
        <div class="profile-card">
          <div class="main-circle-gradient h-11 w-11 p-1">
            <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
          </div>
          <div class="pl-2">
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
          <!-- SEND TON -->
          <input
            class="main-input w-full"
            placeholder="Enter TON address or Domain"
          />

          <!-- ADD TON -->
          <div class="text-xs font-light text-zinc-300 py-6 text-center">
            How do you want to add crypto?
          </div>

          <div class="grid gap-3">
            <button class="menu-item p-3">
              <div class="flex items-center">
                <img class="mr-3 w-7" src="@/assets/images/icons/bank-card.png" />
                <p class="mr-auto text-sm text-white">Bank Card</p>
                <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
              </div>
            </button>
            <button class="menu-item p-3">
              <div class="flex items-center">
                <img class="mr-3 w-7" src="@/assets/images/icons/users.png" />
                <p class="mr-auto text-sm text-white">P2P Market</p>
                <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
              </div>
            </button>
            <button class="menu-item p-3">
              <div class="flex items-center">
                <img class="mr-3 w-7" src="@/assets/images/icons/wallet.png" />
                <p class="mr-auto text-sm text-white">External Wallet</p>
                <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
              </div>
            </button>
          </div>
        </div>
    </main>
</template>

<script>
export default {
  name: 'WalletSendView',
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.BackButton.show();
    tg.onEvent('backButtonClicked', this.goBack);
  },
  methods: {
    goBack(){
      this.$router.push('/wallet')
    }
  },
}
</script>