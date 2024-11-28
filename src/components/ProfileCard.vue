<template>
    <div class="profile-card">
        <div class="main-circle-gradient h-11 w-11 p-1">
            <img class="rounded-[50%]" src="@/assets/images/avatars/01.png" />
        </div>
        <div class="pl-2 text-sm">
            <p class="text-sm text-white">{{ info?.first_name }}</p>
            <p class="font-patsy text-amber-400">
            #{{ info?.level }}
            </p>
        </div>
        <div class="ml-auto mr-6">
            <div class="flex items-center font-geist-mono text-blue-400">
            <p>{{ info?.balance }}</p>
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
    props: {
        home: {
            type: Boolean
        }
    },
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
        let user = tg?.initDataUnsafe;
        if(!this.getInitData){
            this.$store.commit('setInitData', tg.initData)
            let data = {
                initData: tg.initData,
                t: "account",
                a: "get_me",
                ref: user?.start_param ? user?.start_param : 0,
            }
            axios.post("https://api.tonminefarm.com/request", data).then(res => {
                if(res.data.status == 200){
                    this.info = res.data.account
                    this.$i18n.locale = res?.data?.account?.lang
                    this.$store.commit('setUser', res.data.account)
                }
            })
        } else{
            let data = {
                initData: this.getInitData,
                t: "account",
                a: "get_me"
            }
            axios.post("https://api.tonminefarm.com/request", data).then(res => {
                if(res.data.status == 200){
                    this.info = res.data.account
                    this.$store.commit('setUser', res.data.account)
                }
            })
        }
    }
}
</script>