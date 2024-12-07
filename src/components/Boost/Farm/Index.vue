<template>
    <div class="grid grid-cols-2 gap-5 py-4" v-if="getFarm">
        <div class="relative">
            <h5 class="text-center font-patsy text-lg"><span class="text-white">{{ $t("building-grade") }} {{ getFarm?.grade?.level }}</span>/{{ getFarm?.max_up?.level }}</h5>
            <div class="cgrade-image">
                <img class="w-full" :src="getFarm?.grade?.image" />
            </div>
            <div class="bg-shape-radial--fuchsia h-28 w-80 blur-3xl"></div>
        </div>
        <div class="grid content-center pt-10">
            <div class="flex py-1">
                <img class="h-9 w-9 flex-shrink-0 grayscale" src="@/assets/images/icons/generator.png" v-if="getFarm?.ups == 0" />
                <img class="h-9 w-9 flex-shrink-0" :src="getFarm?.ups_image" v-else />
                <div class="pl-1">
                    <p class="text-xs">{{ $t("ups") }}</p>
                    <p class="font-geist-mono text-xs font-semibold">
                        <span v-if="getFarm?.ups == 0">{{ $t("not-installed") }}</span>
                        <span class="text-green-500" v-else>{{ $t("installed") }}</span>
                    </p>
                </div>
            </div>
            <div class="main-blue-gradient"></div>
            <div class="flex py-1">
                <img class="mining-speed flex-shrink-0" src="@/assets/images/mining-speed.svg" />
                <div class="pl-3">
                    <p class="text-xs">
                    {{ $t("income-hour") }}
                    </p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                    {{ getFarm?.earn_per_hour }} <span class="text-xs">TON</span> (+{{ formatPercent(getFarm?.level?.percent) }})
                    </p>
                </div>
            </div>
            <div class="main-blue-gradient"></div>
            <div class="flex py-1 items-center">
                <img class="h-7 w-7 flex-shrink-0" src="@/assets/images/icons/ton-slate.png" />
                <div class="pl-3">
                    <p class="text-xs">
                    {{ $t("uninterrupted-operation") }}
                    </p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                    {{ getFarm?.total_mined }} <span class="text-xs">TON</span>
                    </p>
                </div>
            </div>
            <div class="main-blue-gradient"></div>
            <div class="flex py-1">
                <img class="h-7 w-7 flex-shrink-0" src="@/assets/images/icons/power-consumption.png" />
                <div class="pl-3">
                    <p class="text-xs">
                        {{ $t("power-consumption") }}
                    </p>
                    <p class="font-geist-mono font-semibold text-cyan-400">
                    {{ getFarm?.energy_per_hour }}
                    <span class="text-xs">
                        {{ $t("units-hour") }}
                    </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="linear-border--slate relative mt-10 w-full p-4">
        <router-link class="w-full rounded-xl border border-cyan-400/50 block" to="/bill-history?type=farm">
            <p class="p-3 text-sm text-white">{{ $t("view-payments-history") }}</p>
        </router-link>
        <div class="my-4 flex items-center gap-5 mb-8">
            <div class="linear-border--slate relative p-3 min-w-32 text-left">
                <p class="text-xs">{{ $t("building-level") }}</p>
                <p class="text-lg">{{ getFarm?.level?.level }}</p>
            </div>
            <div class="grid min-w-32 flex-1">
                <template v-if="getFarm?.level_up_timer?.total_time">
                    <div class="flex">
                        <div class="text-xs">{{ progressPercent }}%</div>
                        <div class="ml-auto text-xs">{{ formattedTime }}</div>
                    </div>
                    <div class="pb-2 pt-1">
                        <div class="line-progress" :style="'--width:' + progressPercent + '%'"></div>
                    </div>
                    <button class="main-action--green" @click="boost" :disabled="loading1">
                        <div class="mx-auto flex items-center text-xs">
                            <p class="pr-2 text-white">{{ $t("boost.title") }}</p>
                            <p class="font-geist-mono font-semibold text-cyan-400">{{ boostCost.toFixed(2) }} TON</p>
                        </div>
                    </button>
                </template>
                <template v-else>
                    <button :class="getFarm?.level?.level == 12 ? 'main-action--green disable' : 'main-action--green'" @click="showModalHandle(1)">
                        <div class="mx-auto flex items-center text-xs">
                            <p class="pr-2 text-white">{{ $t("level-up") }}</p>
                            <p class="font-geist-mono font-semibold text-cyan-400">{{ getFarm?.next_level?.cost }} TON</p>
                        </div>
                    </button>
                </template>
            </div>
        </div>
        <div class="mb-4 flex items-center gap-5">
            <div class="linear-border--slate relative p-3 min-w-32 text-left">
                <p class="text-xs">{{ $t("building-grade") }}</p>
                <p class="text-lg">{{ getFarm?.grade?.level }}</p>
            </div>
            <div :class="getFarm?.max_level?.level == getFarm?.level?.level && getFarm?.grade?.level !== getFarm?.max_up?.level  ? 'ml-auto grid min-w-32 flex-1' : 'ml-auto grid min-w-32 flex-1 disable'">
                <button class="main-action--green mb-1" @click="showModalHandle(0)">
                    <div class="mx-auto flex items-center text-xs">
                        <p class="pr-2 text-white">{{ $t("level-up") }}</p>
                        <p class="font-geist-mono font-semibold text-cyan-400">{{ getFarm?.next_grade?.cost }} TON</p>
                    </div>
                </button>
                <span class="pt-1 text-center text-xs">{{  $t("building-level-required", { lvl: getFarm?.max_level?.level }) }}</span>
            </div>
        </div>
    </div>
    <section v-if="showModal" class="modal border-radiant">
        <button class="absolute right-5 top-5" @click="closeModal">
        <img class="w-6" src="@/assets/images/icons/close.png" />
        </button>
        <div class="py-4">
        <div class="py-4">
            <img class="mx-auto mb-5 w-28" src="@/assets/images/icons/arrows-upto.png" />
            <div class="mb-10 py-4 text-center" v-if="variant == 1">
            <div class="mb-3 text-sm text-slate-400">{{ $t("upgrade-to-level", { lvl: this.getFarm?.next_level?.level }) }}</div>
            <div class="font-geist-mono text-2xl font-bold text-blue-400">{{ this.getFarm?.next_level?.cost }} TON</div>
            </div>
            <div class="mb-10 py-4 text-center" v-else>
            <div class="mb-3 text-sm text-slate-400">{{ $t("upgrade-to-level", { lvl: this.getFarm?.next_grade?.level }) }}</div>
            <div class="font-geist-mono text-2xl font-bold text-blue-400">{{ this.getFarm?.next_grade?.cost }} TON</div>
            </div>
        </div>
        <button class="main-action--green mt-5" @click="goAction" v-if="variant == 1" :disabled="loading2">
            <div class="mx-auto flex items-center py-1 text-sm">
            <p class="pr-2 text-white">{{ $t("pay") }}</p>
            <p class="font-geist-mono font-semibold text-cyan-400">{{ this.getFarm?.next_level?.cost }} TON</p>
            </div>
        </button>
        <button class="main-action--green mt-5" @click="goAction" v-else :disabled="loading2">
            <div class="mx-auto flex items-center py-1 text-sm">
            <p class="pr-2 text-white">{{ $t("pay") }}</p>
            <p class="font-geist-mono font-semibold text-cyan-400">{{ this.getFarm?.next_grade?.cost }} TON</p>
            </div>
        </button>
        </div>
    </section>
    <div :class="showModal && 'overlay'"></div>
</template>

<script>
import { mapGetters } from "vuex";
import { useToast } from 'vue-toastification';
import axios from 'axios';

export default {
    name: 'FarmBoost',
    data() {
        return {
            showModal: false,
            item: null,
            toast: useToast(),
            variant: 0,
            intervalId: null,
            remainingTime: null,
            loading1: false,
            loading2: false
        }
    },
    computed: {
        ...mapGetters([
            'getInitData',
            'getFarm'
        ]),
        formattedTime() {
            const minutes = Math.floor(this.remainingTime / 60);
            const seconds = this.remainingTime % 60;
            return `${this.pad(minutes)}:${this.pad(seconds)}`;
        },
        progressPercent() {
            const elapsedTime = this.getFarm?.level_up_timer?.total_time - this.remainingTime;
            return Math.floor((elapsedTime / this.getFarm?.level_up_timer?.total_time) * 100);
        },
        boostCost() {
            const remainingSeconds = this.remainingTime;
            const costPerSecond = this.getFarm?.level_up_timer?.boost_cost_per_hour / 3600;
            return remainingSeconds * costPerSecond;
        }
    },
    mounted() {
        if(this.getInitData){
            this.getFarmData()
        }
        this.updateTimer();
        this.intervalId = setInterval(this.updateTimer, 1000);
    },
    methods: {
        getFarmData(){
            let data = {
                initData: this.getInitData,
                t: "farm",
                a: "get",
            };
            axios.post("https://api.tonminefarm.com/request", data).then((res) => {
                if (res.data.status === 200) {
                    this.$store.commit('setFarm', res?.data?.data)
                } else{
                    this.toast.error(res.data.status_text);
                }
            });
        },
        showModalHandle(variant){
            if(!this.getFarm.level.level == this.getFarm.max_level.level){
                if(this.$i18n.locale == 'ru'){
                    this.toast.error('Это максимальный уровень повысьте грейд!')
                } else{
                    this.toast.error('This is the maximum level, upgrade the grade!')
                }
            } else{
                this.showModal = true;
                this.item = this.getFarm;
                this.variant = variant
                this.$store.commit('setShowModal', true)
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
        formatPercent(value){
            return `${Math.round(parseFloat(value))}%`;
        },
        updateTimer() {
            const currentTime = Math.floor(Date.now() / 1000);
            this.remainingTime = this.getFarm?.level_up_timer?.stop_time - currentTime;
            if (this.remainingTime <= 0) {
                clearInterval(this.intervalId);
                this.remainingTime = null;
                this.intervalId = null;
            }
        },
        async boost() {
            if (this.loading1) return; // Блокировка повторного вызова
            this.loading1 = true;
            const data = {
                initData: this.getInitData,
                t: "farm",
                a: "boost_level",
            };
            try {
                const res = await axios.post("https://api.tonminefarm.com/request", data);
                if (res.data.status === 200) {
                    this.getFarmData();
                    const message = this.$i18n.locale === 'ru' 
                        ? 'Успешно! Вы ускорили.' 
                        : 'Success! You have boosted.';
                    this.toast.success(message);
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
                this.loading1 = false; // Сброс состояния загрузки
            }
        },
        async goAction() {
            this.loading2 = true;
            const data = {
                initData: this.getInitData,
                t: "farm",
                a: this.variant === 1 ? "level_up" : "grade_up",
            };
            try {
                const res = await axios.post("https://api.tonminefarm.com/request", data);
                this.closeModal();
                if (res.data.status === 200) {
                    this.getFarmData();
                    const message = this.$i18n.locale === 'ru' 
                        ? 'Вы перешли на следующий уровень!' 
                        : 'You have moved to the next level!';
                    this.toast.success(message);
                    this.updateTimer();
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                    }
                    this.intervalId = setInterval(this.updateTimer, 1000);
                } else {
                    this.toast.error(res.data.status_text);
                }
            } catch (error) {
                console.log(error);
                this.toast.error('Произошла ошибка');
            } finally {
                this.loading2 = false;
            }
        }
    },
    beforeDestroy() {
        clearInterval(this.intervalId);
    }
}
</script>

<style lang="scss" scoped>
    .mining-speed{
        width: 30px;
    }
</style>