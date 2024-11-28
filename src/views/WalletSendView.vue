<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("wallet.title") }}
      </h2>
    </div>
    <ProfileCard />
    <div class="wallet-add">
      <div class="text-sm font-light text-center mb-3">{{ $t('wallet.payout_ton') }}</div>
      <div class="wallet-add-item">
        <label for="address">{{ $t('wallet.address') }}</label>
        <input type="text" :placeholder="$t('wallet.placeholder')" class="wallet-add-input" id="address" v-model="address">
      </div>
      <div class="text-center wallet-add-center" v-if="tonAddress">
        <div class="wallet-add-centertext" @click="useTon">{{ $t('wallet.use_address') }}</div>
      </div>
      <input type="text" :placeholder="$t('wallet.amount')" class="wallet-add-input" v-model="amount">
      <button class="wallet-add-btn" :disabled="amount == 0 || !address || loading" @click="payout">{{ $t('wallet.payout_ton') }}</button>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import ProfileCard from '@/components/ProfileCard.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useTonAddress } from '@townsquarelabs/ui-vue';

export default {
  name: "WalletSendView",
  data() {
    return {
      info: null,
      toast: useToast(),
      amount: 0,
      address: '',
      tonAddress: useTonAddress(),
      loading: false
    }
  },
  components: {
    ProfileCard
  },
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
    ])
  },
  methods: {
    goBack() {
      this.$router.push("/wallet");
    },
    useTon(){
      this.address = this.tonAddress
    },
    payout() {
      this.loading = true
      try {
        let data = {
          t: "transactions",
          a: "payout",
          ton: this.amount,
          address: this.address,
          initData: this.getInitData
        }
        axios.post('https://api.tonminefarm.com/request', data).then(res => {
          if(res.data.status == 200){
            this.amount = 0
            this.address = ''
            if(this.$i18n.locale == 'ru'){
              this.toast.success('Запрос на вывод успешно отправлен!')
            } else{
              this.toast.success('Withdrawal request successfully sent!')
            }
          } else{
            this.toast.error(res.data.status_text);
          }
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .deposit-btn{
    width: 100%;
    height: 40px;
    background: rgb(59,130,246);
    color: #fff;
    text-align: center;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 700;
    margin-top: 10px;
  }
  .wallet-add{
    padding: 20px;
    height: calc(100% - 110px);
    &-title{
      margin-bottom: 20px;
    }
    &-item{
      label{
        color: #464F6E;
        font-size: 12px;
        line-height: 14.88px;
      }
    }
    &-input{
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      padding: 0 15px;
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      background: #212A47;
      font-weight: 300;
      &:focus{
        outline: 0;
        border: 0;
      }
    }
    &-btn{
      width: 100%;
      height: 48px;
      background: none;
      color: #fff;
      text-align: center;
      border-radius: 5px;
      font-size: 14px;
      margin-top: 40px;
      line-height: 48px;
      border: 1px solid rgba(11, 195, 253, 0.57);
    }
  }
  .wallet-add-center{
    text-align: center;
    margin: 5px 0 15px;
  }
  .wallet-add-centertext{
    font-size: 10px;
    background: #121726;
    padding: 5px 20px;
    display: inline-block;
    color: #fff;
    border-radius: 10px;
  }
</style>