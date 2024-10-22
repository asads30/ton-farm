<template>
  <nav class="tabs border-radiant font-sf">
    <ul class="tabs__list">
      <li class="tabs__item">
        <router-link class="tabs__link" to="/">
          <img src="@/assets/images/tabs/tabs-home.png" />
          <span>{{ $t("home.title") }}</span>
        </router-link>
      </li>
      <li class="tabs__item">
        <router-link class="tabs__link" to="/referral">
          <img src="@/assets/images/tabs/tabs-referral.png" />
          <span>
            {{ $t("refferal.title") }}
          </span>
        </router-link>
      </li>
      <li class="tabs__item">
        <router-link class="tabs__link" to="/boost">
          <img src="@/assets/images/tabs/tabs-boost.png" />
          <span>{{ $t("boost-tab") }}</span>
        </router-link>
      </li>
      <li class="tabs__item">
        <router-link class="tabs__link" to="/wallet">
          <img src="@/assets/images/tabs/tabs-wallet.png" />
          <span>{{ $t("wallet") }}</span>
        </router-link>
      </li>
      <li class="tabs__item">
        <router-link class="tabs__link" to="/info">
          <img src="@/assets/images/tabs/tabs-info.png" />
          <span>{{ $t("info") }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
