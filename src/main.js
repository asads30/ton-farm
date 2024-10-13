import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createI18n } from 'vue-i18n'
import { languages } from '@/i18n/index'
import "@/assets/css/app.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const messages = Object.assign(languages)

const options = {
    // You can set your default options here
};

const i18n = createI18n({
    locale: 'ru',
    messages
})

createApp(App).use(store).use(router).use(i18n).use(Toast, options).mount("#app");
