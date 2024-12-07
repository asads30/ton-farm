<template>
    <div class="grid grid-cols-2 gap-5 py-4" v-if="getPowerStation">
        <div class="relative">
            <h5 class="text-center font-patsy text-lg"><span class="text-white">{{ $t("building-grade") }} {{ getPowerStation?.grade?.level }}</span>/{{ getPowerStation?.max_up?.level }}</h5>
            <div class="cgrade-image">
                <img class="w-full" :src="getPowerStation?.grade?.image" />
            </div>
            <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
        </div>
        <div class="grid content-center pt-10">
            <div class="flex items-center pb-2">
                <img class="h-7 w-7 flex-shrink-0 object-contain" src="@/assets/images/icons/ton-slate.png" />
                <div class="pl-3">
                    <p class="text-xs">{{ $t("energy-unit-price") }}</p>
                    <p class="font-geist-mono text-sm font-semibold text-cyan-400">{{ getPowerStation?.power_cost_per_hour }} TON</p>
                </div>
            </div>
            <div class="main-blue-gradient"></div>
            <div class="flex items-center py-2">
                <img class="h-7 w-7 flex-shrink-0 object-contain" src="@/assets/images/icons/lightning.png"/>
                <div class="pl-3">
                    <p class="text-xs">{{ $t("power_station.income_power") }}</p>
                    <p class="font-geist-mono text-sm font-semibold text-cyan-400">{{ getPowerStation?.grade?.power_per_hour }} {{ $t("units-hour") }}</p>
                </div>
            </div>
            <div class="main-blue-gradient"></div>
            <div class="flex items-center pt-2">
                <img class="h-7 w-7 flex-shrink-0 object-contain" src="@/assets/images/icons/debt.png" />
                <div class="pl-3">
                    <p class="text-xs">{{ $t("debt") }}</p>
                    <p class="font-geist-mono text-sm font-semibold text-red-600">{{ getPowerStation?.debt }} TON</p>
                </div>
            </div>
            <div class="mt-2" v-if="getPowerStation?.debt > 0">
              <button class="min-w-32 rounded-xl border border-cyan-400/50" @click="showModalHandle(2)">
                <p class="p-2 text-sm text-white">{{ $t("pay") }}</p>
              </button>
            </div>
        </div>
    </div>
    <div class="linear-border--slate relative mt-10 w-full p-4">
        <router-link class="w-full rounded-xl border border-cyan-400/50 block" to="/bill-history?type=powerstation">
            <p class="p-3 text-sm text-white">{{ $t("view-payments-history") }}</p>
        </router-link>
        <div class="my-4 flex items-center gap-5 mb-8">
            <div class="linear-border--slate relative p-3 min-w-32 text-left">
                <p class="text-xs">{{ $t("building-level") }}</p>
                <p class="text-lg">{{ getPowerStation?.level?.level }}</p>
            </div>
            <div class="grid min-w-32 flex-1">
                <template v-if="getPowerStation?.level_up_timer?.total_time">
                    <div class="flex">
                        <div class="text-xs">{{ progressPercent }}%</div>
                        <div class="ml-auto text-xs">{{ formattedTime }}</div>
                    </div>
                    <div class="pb-2 pt-1">
                        <div class="line-progress" :style="'--width:' + progressPercent + '%'"></div>
                    </div>
                    <button class="main-action--green" @click="boost" :disabled="loading2">
                        <div class="mx-auto flex items-center text-xs">
                            <p class="pr-2 text-white">{{ $t("boost.title") }}</p>
                            <p class="font-geist-mono font-semibold text-cyan-400">{{ boostCost.toFixed(2) }} TON</p>
                        </div>
                    </button>
                </template>
                <template v-else>
                    <button :class="getPowerStation?.level?.level == 12 ? 'main-action--green disable' : 'main-action--green'" @click="showModalHandle(1)">
                        <div class="mx-auto flex items-center text-xs">
                            <p class="pr-2 text-white">{{ $t("level-up") }}</p>
                            <p class="font-geist-mono font-semibold text-cyan-400">{{ getPowerStation?.next_level?.cost }} TON</p>
                        </div>
                    </button>
                </template>
            </div>
        </div>
        <div class="mb-4 flex items-center gap-5">
            <div class="linear-border--slate relative p-3 min-w-32 text-left">
                <p class="text-xs">{{ $t("building-grade") }}</p>
                <p class="text-lg">{{ getPowerStation?.grade?.level }}</p>
            </div>
            <div :class="getPowerStation?.max_level?.level == getPowerStation?.level?.level ? 'ml-auto grid min-w-32 flex-1' : 'ml-auto grid min-w-32 flex-1 disable'">
                <button class="main-action--green mb-1" @click="showModalHandle(0)">
                    <div class="mx-auto flex items-center text-xs">
                        <p class="pr-2 text-white">{{ $t("level-up") }}</p>
                        <p class="font-geist-mono font-semibold text-cyan-400">{{ getPowerStation?.next_grade?.cost }} TON</p>
                    </div>
                </button>
                <span class="pt-1 text-center text-xs">{{  $t("building-level-required", { lvl: getPowerStation?.max_level?.level }) }}</span>
            </div>
        </div>
    </div>
    <section v-if="showModal" class="modal border-radiant">
        <button class="absolute right-5 top-5" @click="closeModal">
            <img class="w-6" src="@/assets/images/icons/close.png" />
        </button>
        <div class="py-4">
            <template v-if="variant == 2">
                <img class="mx-auto mb-5 w-28" src="@/assets/images/icons/light-document.png" />
                <div class="mb-10 py-4 text-center">
                    <div class="mb-3 text-sm text-slate-400">{{ $t("current-electricity-debt") }}</div>
                    <div class="font-geist-mono text-2xl font-bold text-red-500/90">
                        {{ getPowerStation?.debt }} TON
                    </div>
                </div>
                <button @click="goDebt" class="main-action--green mt-5" :disabled="loading1">
                    <div class="mx-auto flex items-center py-1 text-sm">
                    <p class="pr-2 text-white">{{ $t("pay") }}</p>
                    <p class="font-geist-mono font-semibold text-cyan-400">{{ getPowerStation?.debt }} TON</p>
                    </div>
                </button>
            </template>
            <template v-else>
                <div class="py-4">
                    <img class="mx-auto mb-5 w-28" src="@/assets/images/icons/arrows-upto.png" />
                    <div class="mb-10 py-4 text-center" v-if="variant == 1">
                        <div class="mb-3 text-sm text-slate-400">{{ $t("upgrade-to-level", { lvl: this.getPowerStation?.next_level?.level }) }}</div>
                        <div class="font-geist-mono text-2xl font-bold text-blue-400">{{ this.getPowerStation?.next_level?.cost }} TON</div>
                    </div>
                    <div class="mb-10 py-4 text-center" v-if="variant == 0">
                        <div class="mb-3 text-sm text-slate-400">{{ $t("upgrade-to-level", { lvl: this.getPowerStation?.next_grade?.level }) }}</div>
                        <div class="font-geist-mono text-2xl font-bold text-blue-400">{{ this.getPowerStation?.next_grade?.cost }} TON</div>
                    </div>
                </div>
                <button class="main-action--green mt-5" @click="goAction" v-if="variant == 1" :disabled="loading3">
                    <div class="mx-auto flex items-center py-1 text-sm">
                        <p class="pr-2 text-white">{{ $t("pay") }}</p>
                        <p class="font-geist-mono font-semibold text-cyan-400">{{ this.getPowerStation?.next_level?.cost }} TON</p>
                    </div>
                </button>
                <button class="main-action--green mt-5" @click="goAction" v-if="variant == 0" :disabled="loading3">
                    <div class="mx-auto flex items-center py-1 text-sm">
                        <p class="pr-2 text-white">{{ $t("pay") }}</p>
                        <p class="font-geist-mono font-semibold text-cyan-400">{{ this.getPowerStation?.next_grade?.cost }} TON</p>
                    </div>
                </button>
            </template>
        </div>
    </section>
    <div :class="showModal && 'overlay'"></div>
</template>

<script>
import { mapGetters } from "vuex";
import { useToast } from 'vue-toastification';
import axios from 'axios';

export default {
    name: 'PowerStationBoost',
    data() {
        return {
            showModal: false,
            item: null,
            toast: useToast(),
            variant: 0,
            intervalId: null,
            remainingTime: null,
            loading1: false,
            loading2: false,
            loading3: false
        }
    },
    computed: {
        ...mapGetters([
            'getPowerStation',
            'getInitData'
        ]),
        formattedTime() {
            const minutes = Math.floor(this.remainingTime / 60);
            const seconds = this.remainingTime % 60;
            return `${this.pad(minutes)}:${this.pad(seconds)}`;
        },
        progressPercent() {
            const elapsedTime = this.getPowerStation?.level_up_timer?.total_time - this.remainingTime;
            return Math.floor((elapsedTime / this.getPowerStation?.level_up_timer?.total_time) * 100);
        },
        boostCost() {
            const remainingSeconds = this.remainingTime;
            const costPerSecond = this.getPowerStation?.level_up_timer?.boost_cost_per_hour / 3600;
            return remainingSeconds * costPerSecond;
        }
    },
    mounted() {
        if(this.getInitData){
            this.getPowerStationData()
        }
        this.updateTimer();
        this.intervalId = setInterval(this.updateTimer, 1000);
    },
    methods: {
        getPowerStationData(){
            let data = {
                initData: this.getInitData,
                t: "powerstation",
                a: "get",
            };
            axios.post("https://api.tonminefarm.com/request", data).then((res) => {
                if (res.data.status === 200) {
                    this.$store.commit('setPowerStation', res?.data?.data)
                } else{
                    this.toast.error(res.data.status_text);
                }
            });
        },
        showModalHandle(variant){
            if(!this.getPowerStation.level.level == this.getPowerStation.max_level.level){
                if(this.$i18n.locale == 'ru'){
                    this.toast.error('Это максимальный уровень повысьте грейд!')
                } else{
                    this.toast.error('This is the maximum level, upgrade the grade!')
                }
            } else{
                this.showModal = true;
                this.$store.commit('setShowModal', true)
                this.item = this.getPowerStation;
                this.variant = variant
            }
        },
        closeModal() {
            this.showModal = false;
            this.$store.commit('setShowModal', false)
            this.item = null;
        },
        pad(value) {
            return value < 10 ? '0' + value : value;
        },
        updateTimer() {
            const currentTime = Math.floor(Date.now() / 1000);
            this.remainingTime = this.getPowerStation?.level_up_timer?.stop_time - currentTime;
            if (this.remainingTime <= 0) {
                clearInterval(this.intervalId);
                this.remainingTime = null;
                this.intervalId = null;
            }
        },
        async boost() {
            if (this.loading2) return; // Блокировка повторного вызова
            this.loading2 = true;

            const data = {
                initData: this.getInitData,
                t: "powerstation",
                a: "boost_level",
            };

            try {
                const res = await axios.post("https://api.tonminefarm.com/request", data);
                if (res.data.status === 200) {
                    this.getPowerStationData();
                    this.toast.success('Успешно! Вы ускорили');
                    this.updateTimer();
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                    }
                    this.intervalId = setInterval(this.updateTimer, 1000);
                } else {
                    this.toast.error(res.data.status_text);
                }
            } catch (error) {
                console.error(error);
                this.toast.error('Произошла ошибка');
            } finally {
                this.loading2 = false; // Сброс состояния загрузки
            }
        },
        async goAction() {
            if (this.loading3) return; // Блокировка повторного вызова
            this.loading3 = true;

            const action = this.variant === 1 ? "level_up" : "grade_up";
            const data = {
                initData: this.getInitData,
                t: "powerstation",
                a: action,
            };

            try {
                const res = await axios.post("https://api.tonminefarm.com/request", data);
                this.closeModal();
                if (res.data.status === 200) {
                    this.getPowerStationData();
                    this.toast.success('Вы перешли на следующий уровень!');
                    this.updateTimer();
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                    }
                    this.intervalId = setInterval(this.updateTimer, 1000);
                } else {
                    this.toast.error(res.data.status_text);
                }
            } catch (error) {
                console.error(error);
                this.toast.error('Произошла ошибка');
            } finally {
                this.loading3 = false; // Сброс состояния загрузки
            }
        },
        async goDebt() {
            if (this.loading1) return; // Блокировка повторного вызова
            this.loading1 = true;

            const data = {
                initData: this.getInitData,
                t: "powerstation",
                a: "pay_debt",
            };

            try {
                const res = await axios.post("https://api.tonminefarm.com/request", data);
                if (res.data.status === 200) {
                    this.closeModal();
                    this.getPowerStationData();
                    const message = this.$i18n.locale === 'ru' 
                        ? 'Вы успешно погасили долг!' 
                        : 'You have successfully paid off the debt!';
                    this.toast.success(message);
                } else {
                    this.toast.error(res.data.status_text);
                }
            } catch (error) {
                console.error(error);
                this.toast.error('Произошла ошибка');
            } finally {
                this.loading1 = false; // Сброс состояния загрузки
            }
        }
    },
    beforeDestroy() {
        clearInterval(this.intervalId);
    }
}
</script>