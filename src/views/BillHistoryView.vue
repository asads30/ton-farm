<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("bill-history") }}
      </h2>
    </div>
    <div class="py-4 px-1 grid gap-2">
      <article class="relative p-1">
        <div class="linear-border--slate flex items-center">
          <div class="flex items-center">
            <div class="main-circle-gradient h-10 w-10 p-2">
              <img src="@/assets/images/icons/light-document.png" />
            </div>
            <div class="pl-2 text-left">
              <p class="text-xs text-white">{{ $t("electricity-bill") }} # 25</p>
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
              <span class="ml-auto">{{ $t("paid") }}</span>
            </div>
          </div>
        </div>
      </article>

      <article class="relative p-1">
        <div class="linear-border--slate flex items-center">
          <div class="flex items-center">
            <div class="main-circle-gradient h-10 w-10 p-2">
              <img src="@/assets/images/icons/light-document.png" />
            </div>
            <div class="pl-2 text-left">
              <p class="text-xs text-white">{{ $t("electricity-bill") }} # 25</p>
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
              <span class="ml-auto">{{ $t("paid") }}</span>
            </div>
          </div>
        </div>
      </article>

      <!-- iF NO TRANSACTIONS -->
      <!-- 
            <div class="flex min-h-80 items-center">
              <p class="mx-auto text-sm font-light text-zinc-300">
                {{ $t('bill-history-empty') }}
              </p>
            </div>
            -->
    </div>
  </main>
</template>

<script>
export default {
  name: 'BillHistoryView',
  mounted() {
    let tg = window?.Telegram?.WebApp;
    tg.expand();
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", this.goBack);
  },
  methods: {
    goBack(){
      this.$router.push('/boost')
    }
  },
}
</script>