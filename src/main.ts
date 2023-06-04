import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
const app = createApp(App);
app.config.globalProperties.$state = store;
app.mount('#app');
