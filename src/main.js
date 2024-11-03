import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createI18n } from 'vue-i18n'
import { languages } from '@/i18n/index'
import "@/assets/css/app.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { TonConnectUIPlugin } from '@townsquarelabs/ui-vue';

const messages = Object.assign(languages)

const options = {
    position: "top-right",
    timeout: 2000,
    closeOnClick: false,
    pauseOnHover: false,
    hideProgressBar: true,
    closeButton: false,
    icon: false
};

const i18n = createI18n({
    locale: 'ru',
    messages
})

createApp(App).use(store).use(router).use(i18n).use(Toast, options).use(TonConnectUIPlugin,{ manifestUrl: "https://tonfarm.netlify.app/tonconnect-manifest.json" }).mount("#app");
