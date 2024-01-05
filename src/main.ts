import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import '/@/assets/markdown.css';
import '/@/assets/prism.css';
import { router } from './router/index';
const app = createApp(App);
app.use(router);
app.mount('#app');
