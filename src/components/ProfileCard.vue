<template>
    <div class="profile-card">
        <div class="main-circle-gradient h-11 w-11 p-1">
            <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
        </div>
        <div class="pl-2 text-sm">
            <p class="text-sm text-white">{{ info?.first_name }}</p>
            <p class="font-patsy text-amber-400">
            {{ $t("level") }} {{ info?.level }}
            </p>
        </div>
        <div class="ml-auto mr-10">
            <div class="flex items-center font-geist-mono text-blue-400">
            <p>{{ formatBalance(info?.balance) }}</p>
            <span class="pl-2 text-xs">TON</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from "vuex";

export default {
    name: 'ProfileCard',
    data() {
        return {
            info: null,
        }
    },
    computed: {
        ...mapGetters([
            'getInitData'
        ])
    },
    mounted() {
        let tg = window?.Telegram?.WebApp;
        if(!this.getInitData){
            this.$store.commit('setInitData', tg.initData)
        }
        let data = {
            initData: this.getInitData,
            t: "account",
            a: "get_me"
        }
        axios.post("https://tonminefarm.com/request", data).then(res => {
            if(res.data.status == 200){
                this.info = res.data.account
            }
        })
    },
    methods: {
        formatBalance(value) {
            return Number(value).toFixed(2);
        },
    },
}
</script>