<template>
    <main>
      <div class="pb-4 text-center">
        <h2 class="font-patsy text-3xl text-white">Roadmap</h2>
      </div>
      <div class="roadmap-text">
        <div v-html="info"></div>
      </div>
    </main>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
   
  export default {
    name: "RoadmapView",
    data() {
      return {
        info: null
      }
    },
    mounted() {
      let tg = window?.Telegram?.WebApp;
      tg.BackButton.show();
      tg.onEvent("backButtonClicked", this.goBack);
      if(!this.getInitData){
        this.$store.commit('setInitData', tg?.initData)
      }
      this.getRoadMap()
    },
    computed: {
      ...mapGetters([
        'getInitData'
      ]),
    },
    methods: {
      goBack() {
        this.$router.push("/info");
      },
      getRoadMap(){
        let data = {
          initData: this.getInitData,
          t: "account",
          a: "get_roadmap"
        }
        axios.post('https://tonminefarm.com/request', data).then(res => {
          if(res.data.status == 200){
            this.info = res.data.data
          }
        })
      }
    },
  };
  </script>
  
  <style lang="scss" scoped>
    .roadmap-text{
      padding: 0 20px 20px;
      h3{
        font-size: 18px;
        font-weight: 700;
        color: #fff;
        margin-top: 20px;
      }
    }
  </style>