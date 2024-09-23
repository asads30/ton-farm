import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReferralView from '@/views/ReferralView.vue'
import BoostView from '@/views/BoostView.vue'
import FarmView from '@/views/FarmView.vue'
import InfoView from '@/views/InfoView.vue'
import LeaderboardView from '@/views/LeaderboardView.vue'
import PowerStationView from '@/views/PowerStationView.vue'
import SpinView from '@/views/SpinView.vue'
import StoreView from '@/views/StoreView.vue'
import WalletHistoryView from '@/views/WalletHistoryView.vue'
import WalletView from '@/views/WalletView.vue'
import WalletSendView from '@/views/WalletSendView.vue'
import WorkShopView from '@/views/WorkShopView.vue'

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
    component: BoostView
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
    component: StoreView
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
    path: '/wallet/send',
    name: 'wallet-send',
    component: WalletSendView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
