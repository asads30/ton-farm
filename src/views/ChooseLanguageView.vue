<template>
  <main class="relative">
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">Choose language</h2>
    </div>
    <div class="py-10 px-2 mt-20">
      <label class="main-radio px-2">
        <img class="w-8" src="@/assets/images/icons/flag-english.png" />
        <input type="radio" checked name="language" />
        <span class="pl-4 text-white/75">English</span>
      </label>
      <div class="h-[1px] w-full bg-slate-800 my-3"></div>
      <label class="main-radio px-2">
        <img class="w-8" src="@/assets/images/icons/flag-russian.png" />
        <input type="radio" name="language" />
        <span class="pl-4 text-white/75">Russian</span>
      </label>
    </div>
  </main>
  <div class="sticky bottom-4">
    <div class="main-action--green mx-5">
      <div class="mx-auto flex items-center py-1 text-sm">
        <p class="pr-2 text-white">Ok</p>
      </div>
    </div>
  </div>
</template>
