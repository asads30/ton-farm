<template>
  <main>
    <div class="pb-4 text-center">
      <h2 class="font-patsy text-3xl text-white">
        {{ $t("wallet.title") }}
      </h2>
    </div>
    <ProfileCard />
    <div class="wallet-add">
      <div class="text-md font-light text-center wallet-add-title">{{ $t('wallet.ton') }}</div>
      <div class="wallet-add-item">
        <label for="amount">{{ $t('wallet.amount_ton') }}</label>
        <input type="text" :placeholder="$t('wallet.amount')" class="wallet-add-input" id="amount" v-model="amount">
      </div>
      <button class="wallet-add-btn" :disabled="amount < 1 || loading" @click="sendTransaction">{{ $t('wallet.deposit') }}</button>
    </div>
  </main>
</template>

<script>
import ProfileCard from '@/components/ProfileCard.vue';
import { useTonConnectUI, useTonAddress } from '@townsquarelabs/ui-vue';
import { mapGetters } from 'vuex';
import {ref, computed} from 'vue'
import axios from 'axios'
import { useStore } from 'vuex';
import {beginCell} from '@ton/ton'
import { useToast } from 'vue-toastification';

export default {
  name: "WalletAddView",
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
  },
  setup(){
    const {tonConnectUI, setOptions} = useTonConnectUI();
    const store = useStore();
    const initData = computed(() => store.state.initData);
    const amount = ref(0);
    const address = useTonAddress()
    const toast = useToast()
    const loading = ref(false)
    setOptions({ 
      language: 'ru',
      twaReturnUrl: "https://t.me/asadslavatestbot/myapp"
    });
    const sendTransaction = () => {
      loading.value = true
      try {
        let amountVal = amount.value * 1000000000
        const data = {
          t: "transactions",
          a: "create",
          initData: initData.value,
          address: address.value,
          ton: amount.value
        }
        axios.post(`https://api.tonminefarm.com/request`, data).then(res => {
          if(res.data.status == 200){
            const myTransaction = {
              validUntil: Math.floor(Date.now() / 1000) + 60,
              messages: [
                {
                  address: 'UQCSXbU-BReOwsRCKAMJGwIV5-fLQfMBeoAdB9c3QnEuVFHc',
                  amount: amountVal,
                  payload: beginCell().storeUint(0,32).storeStringTail(res.data.hash).endCell().toBoc().toString('base64')
                }
              ]
            }
            tonConnectUI.sendTransaction(myTransaction).then(res => {
              if(res){
                if(this.$i18n.locale == 'ru'){
                  toast.success('Баланс успешно пополнен, ожидайте поступление')
                } else{
                  toast.success('Balance successfully replenished, please wait for the funds to arrive.')
                }
              }
            }).catch(err => {
              toast.error(err)
            });
          } else{
            toast.error(res.data.status_text)
          }
        })
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    };

    return { sendTransaction, amount };
  }
};
</script>

<style lang="scss" scoped>
  .wallet-add{
    padding: 20px;
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
</style>