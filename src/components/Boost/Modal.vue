<template>
    <section class="modal border-radiant hidden">
        <button class="absolute right-5 top-5">
            <img class="w-6" src="@/assets/images/icons/close.png" />
        </button>
        <div class="py-4">
            <!-- 
                <div class="py-4">
                    <img
                    class="mx-auto mb-5 w-28"
                    src="@/assets/images/icons/light-document.png"
                    />
                    <div class="mb-10 py-4 text-center">
                    <div class="mb-3 text-sm text-slate-400">Your current electricity bill debt is</div>
                    <div class="font-geist-mono text-2xl font-bold text-red-500/90">
                        0.43 TON
                    </div>
                    </div>
                </div>
                -->
            <!-- SECOND VARIANT -->
            <div class="py-4">
                <img class="mx-auto mb-5 w-28" src="@/assets/images/icons/arrows-upto.png" />
                <div class="mb-10 py-4 text-center">
                    <div class="mb-3 text-sm text-slate-400">Upgrade to 2nd level</div>
                    <div class="font-geist-mono text-2xl font-bold text-blue-400">0.43 TON</div>
                </div>
            </div>
            <div class="main-action--green mt-5">
                <div class="mx-auto flex items-center py-1 text-sm">
                    <p class="pr-2 text-white">Pay</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">0.43 TON</p>
                </div>
            </div>
        </div>
    </section>
</template>