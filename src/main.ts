import 'normalize.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.less'
import registerIcons from './globle/registerIcon'
import router from './router'
import useLoginStore from './stores/login/login'
const app = createApp(App)

app.use(createPinia())
const loginStore = useLoginStore()
loginStore.loadLocalCacheAction()
app.use(router)
app.use(registerIcons)
app.mount('#app')
