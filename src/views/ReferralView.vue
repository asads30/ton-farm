<template>
  <main>
    <div class="pb-2 text-center px-1">
      <h2 class="font-patsy text-3xl text-white mb-2">
        {{ $t("invite-friends") }}
      </h2>
      <div class="flex items-center text-xs font-light">
        <p class="text-zinc-300">
          {{ $t("receive-bonuses") }}
        </p>
      </div>
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
    <div class="linear-border--slate relative p-3 my-2">
      <div class="flex items-center text-left">
        <p class="mr-auto font-light text-zinc-300 text-xs">
          {{ $t("referral-total-income") }}
        </p>
        <p class="font-geist-mono text-lg">5%</p>
      </div>
      <div class="h-[1px] w-full bg-slate-800 my-2"></div>
      <div class="flex items-center text-left">
        <p class="mr-auto font-light text-zinc-300">
          {{ $t("total-referrals") }}
        </p>
        <p class="font-geist-mono text-lg">17</p>
      </div>
    </div>
    <div class="relative mt-5 pt-2">
      <div class="linear-border--slate p-3">
        <div class="linear-border position-center-x -top-2 bg-gray-950">
          <span class="font-sf text-xs text-blue-500">
            {{ $t("referral-link") }}
          </span>
        </div>
        <div class="break-words pr-10 text-xs text-blue-500">
          0x790b44b9863599568a5b154e1a66de67f1bfd6d8f363ab03bb2b1e4e3350c313
        </div>
        <button class="absolute right-4 top-5 p-1" @click="copyLink">
          <img class="w-4" src="@/assets/images/icons/copy.png" />
        </button>
      </div>
    </div>
    <div class="pt-1 text-center text-[10px] text-slate-600">
      {{ $t("copy-referral") }}
    </div>
    <button class="linear-border--slate relative ml-auto mt-2 w-100 share-btn">
      <div class="flex items-center gap-1 p-1 justify-center">
        <img class="w-5" src="@/assets/images/icons/share.png" />
        <span class="text-white">
          {{ $t("share") }}
        </span>
      </div>
    </button>
    <div class="py-4">
      <div class="flex px-5 text-xs text-zinc-300">
        <p>{{ $t("name") }}</p>
        <p class="ml-auto">{{ $t("income-hour") }}</p>
      </div>
      <div class="py-2 grid gap-2">
        <div class="relative p-2">
          <div class="linear-border--slate flex items-center">
            <div class="main-circle-gradient h-11 w-11 p-1">
              <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
            </div>
            <div class="text-sm text-white pl-2">Nick Jay</div>
            <div class="flex items-center text-white ml-auto">
              <img class="mr-1 h-4 w-4" src="@/assets/images/icons/ton.png" />
              <p class="font-geist-mono text-xs font-medium">1324.73 TON</p>
            </div>
          </div>
        </div>
        <div class="relative p-2">
          <div class="linear-border--slate flex items-center">
            <div class="main-circle-gradient h-11 w-11 p-1">
              <img class="rounded-[50%]" src="@/assets/images/avatars/02.png" />
            </div>
            <div class="text-sm text-white pl-2">Marcus</div>
            <div class="flex items-center text-white ml-auto">
              <img class="mr-1 h-4 w-4" src="@/assets/images/icons/ton.png" />
              <p class="font-geist-mono text-xs font-medium">1324.73 TON</p>
            </div>
          </div>
        </div>
        <div class="relative p-2">
          <div class="linear-border--slate flex items-center">
            <div class="main-circle-gradient h-11 w-11 p-1">
              <img class="rounded-[50%]" src="@/assets/images/avatars/07.png" />
            </div>
            <div class="text-sm text-white pl-2">Lenny</div>
            <div class="flex items-center text-white ml-auto">
              <img class="mr-1 h-4 w-4" src="@/assets/images/icons/ton.png" />
              <p class="font-geist-mono text-xs font-medium">1324.73 TON</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Bottombar />
</template>

<script>
import Bottombar from "@/components/Bottombar.vue";

export default {
  name: "Referral",
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
