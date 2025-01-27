import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import Maska from 'maska';
import { DefaultApolloClient } from '@vue/apollo-composable';
import apiClient from './api/apiClient';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(PerfectScrollbar);
app.use(VueTablerIcons);
app.use(Maska);
app.use(VueApexCharts);
app.use(pinia);
app.use(Toast, {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 5000,
});
app.provide(DefaultApolloClient, apiClient);
app.use(vuetify).mount('#app');
