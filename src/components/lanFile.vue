<template>
   <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
      <van-cell>
         <van-button @click="back" v-show="topNav[topNav.length-1].fileId != '0'" icon="src/assets/icons/folder.svg"
            type="default" size="small">

            <span>{{ '返回上一层...' }}</span>
         </van-button>
      </van-cell>

      <van-cell v-for="item in list" :key="item">

         <div class="listItem">
            <van-button :icon="item.iconHref" type="default" size="small" @click="getChildPageData(item)">
               <span>{{ item.filename }}</span>
            </van-button>
         </div>

         <a v-if="item.isDir == 0" style="float: right;" type="default" size="small" @click="downloadFile(item)">
            下载
         </a>
      </van-cell>
   </van-list>
</template>
   
<script setup>
import axios from 'axios'
import { ref, watch, reactive, inject,getCurrentInstance } from 'vue'
let list = ref([]);
const topNav = ref([])
const loading = ref(false);   //是否加载完成
const finished = ref(false);  //是否已经完全加载完成
let currFolder = reactive({})
const host = inject('host')
const userId = inject('userId')
const {proxy} = getCurrentInstance()




watch(topNav, () => {
   let currNav = topNav.value[topNav.value.length - 1]
   if (currNav.fileId == '0') {
      axios.get(`http://${host}/getRemoteFile/${currNav.fileId}?${currNav.userId}`).then(res => {
         if (res.data.length > 0) {
            proxy.iconHrefAndFileId(res)
            list.value = res.data
         }

         // 加载状态结束
         loading.value = false;
         finished.value = true;
      }).catch(() => {
         console.log('连接错误');
      })
   } else {
      axios.get(`http://${currNav.ip}:9797/getFolderData/${currNav.fileId}?${currNav.userId}`).then(res => {
         if (res.data.length > 0) {
            proxy.iconHrefAndFileId(res)
            list.value = res.data
         } else {
            list.value = []
         }

         // 加载状态结束
         loading.value = false;
         finished.value = true;
      }).catch(() => {
         console.log('连接错误');
      })
   }


}, {
   deep: true
})


topNav.value.push({
   fileId: '0',
   userId: userId,
})


//文件下载
function downloadFile(item) {
   window.open(`http://${item.ip}:9797/extBrowserDownloadFile/${item.fileId}?${item.userId}`)
}

function back() {
   topNav.value.pop()
}

function getChildPageData(item) {

   if (item.isDir == 1) {
      topNav.value.push({
         fileId: item.fileId,
         userId: item.userId,
         ip: item.ip
      })
      currFolder = item
   }
}



</script>
   
<style scoped>
    @import '../assets/css/app.css'
</style>
   