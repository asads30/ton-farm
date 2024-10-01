<template>
  <nav class="tabs border-radiant">
    <ul class="tabs__list">
      <li class="tabs__item">
        <router-link class="tabs__link" to="/">
          <img src="@/assets/images/tabs/tabs-home.png" />
          <span>Home</span>
        </router-link>
      </li>
      <li class="tabs__item">
        <router-link class="tabs__link" to="/referral">
          <img src="@/assets/images/tabs/tabs-refferal.png" />
          <span>Refferal</span>
        </router-link>
      </li>
      <li class="tabs__item">
        <router-link class="tabs__link" to="/boost">
          <img src="@/assets/images/tabs/tabs-boost.png" />
          <span>Boost</span>
        </router-link>
      </li>
      <li class="tabs__item">
        <router-link class="tabs__link" to="/wallet">
          <img src="@/assets/images/tabs/tabs-wallet.png" />
          <span>Wallet</span>
        </router-link>
      </li>
      <li class="tabs__item">
        <router-link class="tabs__link" to="/info">
          <img src="@/assets/images/tabs/tabs-info.png" />
          <span>Info</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
