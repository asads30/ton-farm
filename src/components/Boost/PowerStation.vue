<template>
    <div class="grid grid-cols-2 gap-5 py-4" v-if="getPowerStation">
        <div class="relative">
            <h5 class="text-center font-patsy text-lg"><span class="text-white">{{ $t("level") }} {{ getPowerStation?.grade?.level }}</span>/{{ getPowerStation?.max_up?.level }}</h5>
            <div class="w-40 mt-8">
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
                <img class="h-6 w-6 flex-shrink-0 object-contain" src="@/assets/images/icons/lightning.png"/>
                <div class="pl-3">
                    <p class="text-xs">{{ $t("power_station.income_power") }}</p>
                    <p class="font-geist-mono text-sm font-semibold text-cyan-400">{{ getPowerStation?.grade?.power_per_hour }} {{ $t("units-hour") }}</p>
                </div>
            </div>
            <div class="main-blue-gradient"></div>
            <div class="flex items-center pt-2">
                <img class="h-6 w-6 flex-shrink-0 object-contain" src="@/assets/images/icons/debt.png" />
                <div class="pl-3">
                    <p class="text-xs">{{ $t("debt") }}</p>
                    <p class="font-geist-mono text-sm font-semibold text-red-600">{{ getPowerStation?.debt }} TON</p>
                </div>
            </div>
        </div>
    </div>
    <div class="linear-border--slate relative mt-10 w-full p-4">
        <router-link class="w-full rounded-xl border border-cyan-400/50 block" to="/bill-history">
            <p class="p-3 text-sm text-white">{{ $t("view-payments-history") }}</p>
        </router-link>
        <div class="my-4 flex items-center gap-5 mb-8">
            <div class="linear-border--slate relative p-3 min-w-32 text-left">
                <p class="text-xs">{{ $t("building-level") }}</p>
                <p class="text-lg">{{ getPowerStation?.level?.level }}</p>
            </div>
            <div :class="getPowerStation?.level?.level == 12 ? 'grid min-w-32 flex-1 disable' : 'grid min-w-32 flex-1'">
                <template v-if="getPowerStation?.level_up_timer?.total_time">
                    <div class="flex">
                        <div class="text-xs">{{ progressPercent }}%</div>
                        <div class="ml-auto text-xs">{{ formattedTime }}</div>
                    </div>
                    <div class="pb-2 pt-1">
                        <div class="line-progress" :style="'--width:' + progressPercent + '%'"></div>
                    </div>
                    <button class="main-action--green" @click="boostPowerStation">
                        <div class="mx-auto flex items-center text-xs">
                            <p class="pr-2 text-white">{{ $t("boost") }}</p>
                            <p class="font-geist-mono font-semibold text-cyan-400">{{ boostCost.toFixed(2) }} TON</p>
                        </div>
                    </button>
                </template>
                <template v-else>
                    <button class="main-action--green" @click="showModalHandle(1)">
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
                <button class="main-action--green mb-1" @click="showModalHandle(2)">
                    <div class="mx-auto flex items-center text-xs">
                        <p class="pr-2 text-white">{{ $t("level-up") }}</p>
                        <p class="font-geist-mono font-semibold text-cyan-400">{{ getPowerStation?.next_grade?.cost }} TON</p>
                    </div>
                </button>
                <span class="pt-1 text-center text-xs">{{  $t("building-level-required", { lvl: getPowerStation?.max_level?.level }) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: 'PowerStationBoost',
    computed: {
        ...mapGetters([
            'getPowerStation',
            'getInitData'
        ]),
    },
    mounted() {
        if(!this.getPowerStation){
            this.getPowerStationData()
        }
    },
    methods: {
        getPowerStationData(){
            let data = {
                initData: this.getInitData ? this.getInitData : "user=%7B%22id%22%3A5850887936%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22webmonster_uz%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1442677966141426206&chat_type=group&auth_date=1727613930&hash=08188303ad38ea8c0213a6df5da80738a9395e33ff55438820988a30274542f4",
                t: "powerstation",
                a: "get",
            };
            axios.post("https://tonminefarm.com/request", data).then((res) => {
                if (res.data.status === 200) {
                    this.$store.commit('setPowerStation', res?.data?.data)
                }
            });
        }
    },
}
</script>