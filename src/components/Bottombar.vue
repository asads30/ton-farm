<template>
  <nav :class="getShowModal ? 'tabs border-radiant font-sf no-bottombar' : 'tabs border-radiant font-sf'">
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
            {{ $t("referall.title") }}
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
          <span>{{ $t("wallet.title") }}</span>
        </router-link>
      </li>
      <li class="tabs__item">
        <router-link class="tabs__link" to="/info">
          <img src="@/assets/images/tabs/tabs-info.png" />
          <span>{{ $t("info.title") }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Bottombar',
  computed: {
    ...mapGetters([
      'getShowModal'
    ]),
  }
}
</script>