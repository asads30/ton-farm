import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReferralView from '@/views/ReferralView.vue'
import BoostView from '@/views/BoostView.vue'
import FarmView from '@/views/FarmView.vue'
import InfoView from '@/views/InfoView.vue'
import LeaderboardView from '@/views/LeaderboardView.vue'
import PowerStationView from '@/views/PowerStationView.vue'
import RoadmapView from '@/views/RoadmapView.vue'
import SpinView from '@/views/SpinView.vue'
import StoreView from '@/views/StoreView.vue'
import WalletHistoryView from '@/views/WalletHistoryView.vue'
import WalletView from '@/views/WalletView.vue'
import WalletSendView from '@/views/WalletSendView.vue'
import WorkShopView from '@/views/WorkShopView.vue'
import BillHistoryView from '@/views/BillHistoryView.vue'
import ChooseLanguageView from '@/views/ChooseLanguageView.vue'
import WalletAddView from '@/views/WalletAddView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/referral',
    name: 'referral',
    component: ReferralView
  },
  {
    path: '/boost',
    name: 'boost',
    component: BoostView,
    props: true
  },
  {
    path: '/bill-history',
    name: 'bill-history',
    component: BillHistoryView
  },
  {
    path: '/language',
    name: 'language',
    component: ChooseLanguageView
  },
  {
    path: '/farm',
    name: 'farm',
    component: FarmView
  },
  {
    path: '/info',
    name: 'info',
    component: InfoView
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: LeaderboardView
  },
  {
    path: '/power-station',
    name: 'power-station',
    component: PowerStationView
  },
  {
    path: '/spin',
    name: 'spin',
    component: SpinView
  },
  {
    path: '/store',
    name: 'store',
    component: StoreView,
    props: true
  },
  {
    path: '/workshop',
    name: 'workshop',
    component: WorkShopView
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: WalletView
  },
  {
    path: '/wallet/history',
    name: 'wallet-history',
    component: WalletHistoryView
  },
  {
    path: '/wallet/add',
    name: 'wallet-add',
    component: WalletAddView
  },
  {
    path: '/wallet/send',
    name: 'wallet-send',
    component: WalletSendView
  },
  {
    path: '/roadmap',
    name: 'roadmap',
    component: RoadmapView
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
