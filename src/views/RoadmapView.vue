<template>
    <main>
      <div class="pb-4 text-center">
        <h2 class="font-patsy text-3xl text-white">{{ $t('roadmap.title') }}</h2>
      </div>
      <div class="roadmap-list">
       <div class="roadmap-item active">
        <div class="roadmap-item-top">
          <div class="roadmap-item-topicon">
            <img src="@/assets/images/roadmap-success.svg" alt="">
          </div>
          <div class="roadmap-item-topitem">Q2-Q3</div>
          <div class="roadmap-item-topline"></div>
          <div class="roadmap-item-topitem">2024</div>
        </div>
        <div class="roadmap-item-title">{{ $t('roadmap.title1') }}</div>
        <div class="roadmap-item-list">
          <div class="roadmap-item-item">{{ $t('roadmap.item1') }}</div>
          <div class="roadmap-item-item">{{ $t('roadmap.item2') }}</div>
          <div class="roadmap-item-item">{{ $t('roadmap.item3') }}</div>
          <div class="roadmap-item-item">{{ $t('roadmap.item4') }}</div>
        </div>
       </div>
       <div class="roadmap-item">
        <div class="roadmap-item-top">
          <div class="roadmap-item-topicon">
            <img src="@/assets/images/roadmap-done.svg" alt="">
          </div>
          <div class="roadmap-item-topitem">Q4</div>
          <div class="roadmap-item-topline"></div>
          <div class="roadmap-item-topitem">2024</div>
        </div>
        <div class="roadmap-item-title">{{ $t('roadmap.title2') }}</div>
        <div class="roadmap-item-list">
          <div class="roadmap-item-item">{{ $t('roadmap.item5') }}</div>
          <div class="roadmap-item-item">{{ $t('roadmap.item6') }}</div>
          <div class="roadmap-item-item">{{ $t('roadmap.item7') }}</div>
        </div>
       </div>
      <div class="roadmap-item">
        <div class="roadmap-item-top">
          <div class="roadmap-item-topicon">
            <img src="@/assets/images/roadmap-done.svg" alt="">
          </div>
          <div class="roadmap-item-topitem">Q1-Q2</div>
          <div class="roadmap-item-topline"></div>
          <div class="roadmap-item-topitem">2025</div>
        </div>
        <div class="roadmap-item-title">{{ $t('roadmap.title3') }}</div>
        <div class="roadmap-item-list">
          <div class="roadmap-item-item">{{ $t('roadmap.item9') }}</div>
          <div class="roadmap-item-item">{{ $t('roadmap.item10') }}</div>
        </div>
      </div>
      <div class="roadmap-item">
        <div class="roadmap-item-top">
          <div class="roadmap-item-topicon">
            <img src="@/assets/images/roadmap-done.svg" alt="">
          </div>
          <div class="roadmap-item-topitem">Q3</div>
          <div class="roadmap-item-topline"></div>
          <div class="roadmap-item-topitem">2025</div>
        </div>
        <div class="roadmap-item-title">{{ $t('roadmap.title4') }}</div>
        <div class="roadmap-item-list">
          <div class="roadmap-item-item">{{ $t('roadmap.item11') }}</div>
          <div class="roadmap-item-item">{{ $t('roadmap.item12') }}</div>
          <div class="roadmap-item-item">{{ $t('roadmap.item13') }}</div>
          <div class="roadmap-item-item">{{ $t('roadmap.item14') }}</div>
        </div>
      </div>
      <div class="roadmap-item">
        <div class="roadmap-item-top">
          <div class="roadmap-item-topicon">
            <img src="@/assets/images/roadmap-done.svg" alt="">
          </div>
          <div class="roadmap-item-topitem">Q4</div>
          <div class="roadmap-item-topline"></div>
          <div class="roadmap-item-topitem">2025</div>
        </div>
        <div class="roadmap-item-title">{{ $t('roadmap.title5') }}</div>
        <div class="roadmap-item-list">
          <div class="roadmap-item-item">{{ $t('roadmap.item15') }}</div>
        </div>
      </div>
      <div class="roadmap-item">
        <div class="roadmap-item-top">
          <div class="roadmap-item-topicon">
            <img src="@/assets/images/roadmap-done.svg" alt="">
          </div>
          <div class="roadmap-item-topitem">Q1</div>
          <div class="roadmap-item-topline"></div>
          <div class="roadmap-item-topitem">2026</div>
        </div>
        <div class="roadmap-item-title">{{ $t('roadmap.title6') }}</div>
        <div class="roadmap-item-list">
          <div class="roadmap-item-item">{{ $t('roadmap.item16') }}</div>
        </div>
      </div>
      </div>
    </main>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
   
  export default {
    name: "RoadmapView",
    mounted() {
      let tg = window?.Telegram?.WebApp;
      tg.BackButton.show();
      tg.onEvent("backButtonClicked", this.goBack);
      if(!this.getInitData){
        this.$store.commit('setInitData', tg?.initData)
      }
    },
    computed: {
      ...mapGetters([
        'getInitData'
      ]),
    },
    methods: {
      goBack() {
        this.$router.push("/info");
      }
    },
  };
  </script>
  
  <style lang="scss" scoped>
    .roadmap-item{
      padding: 12px 16px;
      border-bottom: 1px solid #1A2846;
      &:last-child{
        border-bottom: 0;
      }
      &-top{
        display: flex;
        align-items: center;
        gap: 8px;
      }
      &-topitem{
        font-size: 12px;
        font-weight: 300;
        color: #D9D9D9;
      }
      &-topline{
        height: 5px;
        width: 1px;
        background: #4970B0;
      }
      &-title{
        margin: 8px 0;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
      }
      &-item{
        position: relative;
        font-size: 14px;
        padding-left: 13px;
        &::before{
          content: '';
          width: 5px;
          height: 5px;
          background: #4970B0;
          position: absolute;
          left: 0;
          top: calc(50% - 2.5px);
          border-radius: 50px;
        }
      }
    }
    .roadmap-item.active{
      .roadmap-item-item{
        &::before{
          background: #4EFF3F !important;
        }
      }
    }
    .wrapper>main{
      padding: 4px 0;
    }
  </style>