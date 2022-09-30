import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Popup, Cell, Search, List, NavBar, Icon, Sticky, Sidebar, SidebarItem, Button } from 'vant';
import 'vant/lib/index.css';

const app = createApp(App)
app.use(Popup)
app.use(Cell)
app.use(Search)
app.use(List)
app.use(NavBar)
app.use(Icon)
app.use(Sticky)
app.use(Sidebar)
app.use(SidebarItem)
app.use(Button)

app.config.globalProperties.iconHrefAndFileId = (res) => {
   for (const item of res.data) {
      if (typeof item.fileId == 'undefined')
         item.fileId = item.id
      item.iconHref = new URL(`./assets/icons/${item.filetype}.svg`, import.meta.url).href
   }
}

app.mount('#app')
