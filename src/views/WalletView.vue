<template>
    <main>
        <div class="pb-4 text-center">
          <h2 class="font-pixeboy text-3xl text-white">Wallet</h2>
        </div>
        <div class="profile-card">
          <div class="main-circle-gradient h-11 w-11 p-1">
            <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
          </div>
          <div class="pl-2">
            <p class="text-sm text-white">Nick Jay</p>
            <p class="font-pixeboy text-amber-400">Level 8</p>
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
              <p class="text-sm text-white">Connect wallet</p>
            </div>
          </button>
          <div class="linear-border--slate relative p-3">
            <div class="mb-3 flex items-center">
              <img class="mr-3 w-7" src="@/assets/images/icons/wallet.png" />
              <p class="mr-auto text-sm text-white">TON wallet</p>
              <p class="text-xs font-medium text-green-400">Connected</p>
            </div>

            <button class="menu-item rounded-xl bg-cyan-400/20 p-2">
              <div class="flex items-center px-3">
                <p class="mr-auto text-xs text-white">EQDo...IetE</p>
                <p class="p-1 text-xs text-white">Copy</p>
              </div>
            </button>

            <div class="py-1"></div>

            <button class="menu-item rounded-xl p-2">
              <div class="flex justify-center">
                <p class="text-xs text-white">Unlink</p>
              </div>
            </button>
          </div>
          <router-link to="/wallet/send" class="menu-item p-3">
            <div class="flex items-center">
              <img class="mr-3 w-7" src="@/assets/images/icons/plus-circle.png" />
              <p class="mr-auto text-sm text-white">Add TON</p>
              <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
            </div>
          </router-link>
          <router-link to="/wallet/send" class="menu-item p-3">
            <div class="flex items-center">
              <img class="mr-3 w-7" src="@/assets/images/icons/arrow-up-circle.png" />
              <p class="mr-auto text-sm text-white">Send TON</p>
              <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
            </div>
          </router-link>
          <router-link to="/wallet/history" class="menu-item p-3">
            <div class="flex items-center">
              <img class="mr-3 w-7" src="@/assets/images/icons/transactions.png" />
              <p class="mr-auto text-sm text-white">Transaction history</p>
              <img class="mr-2 w-2" src="@/assets/images/icons/chevron-right.png" />
            </div>
          </router-link>
        </div>
    </main>
    <Bottombar />
</template>

<script>
import Bottombar from '@/components/Bottombar.vue'

export default {
    name: 'WalletView',
    components: {
        Bottombar
    }
}
</script>