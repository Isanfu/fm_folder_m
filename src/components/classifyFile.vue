<template>
   <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
      :immediate-check="false">

      <van-cell v-for="item in list" :key="item">

         <div class="listItem">
            <van-button :icon="item.iconHref" type="default" size="small">
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
import { ref, watch, inject, getCurrentInstance } from 'vue'
let list = ref([]);
const loading = ref(false);   //是否加载完成
const finished = ref(false);  //是否已经完全加载完成
var pageNum = ref(1)
const host = inject('host')
const userId = inject('userId')
const { proxy } = getCurrentInstance()

const classify = defineProps(['name'])

watch(classify, () => {
   getClassifyData()
})

function PaginationData(res) {
   if (res.data.length > 0) {
      proxy.iconHrefAndFileId(res)
   }
   list.value = list.value.concat(res.data)
   pageNum.value++
   loading.value = false;
   if (res.data.length < 20) {
      finished.value = true
   }
}

function resDataToList(res) {
   if (res.data.length > 0) {
      proxy.iconHrefAndFileId(res)
   }
   list.value = res.data
   loading.value = false;
   if (res.data.length < 20) {
      finished.value = true
   }
}




function getClassifyData() {
   if (classify.name == 'document') {
      axios.get(`http://${host}/getDocClassifyData/document?${userId}?0`).then(res => {
         resDataToList(res)
      })
   } else {
      axios.get(`http://${host}/getClassifyData/${classify.name}?${userId}?0`).then(res => {
         resDataToList(res)
      })
   }
}


getClassifyData()




function downloadFile(item) {
   window.open(`http://${item.ip}/extBrowserDownloadFile/${item.fileId}?${item.userId}`)
}

function onLoad() {
   loading.value = true;
   if (classify.name == 'document') {
      let offset = pageNum.value * 20
      axios.get(`http://${host}/getDocClassifyData/document?${userId}?${offset}`).then(res => {
         PaginationData(res)
      })
   } else {
      let offset = pageNum.value * 20
      axios.get(`http://${host}/getClassifyData/${classify.name}?${userId}?${offset}`).then(res => {
         PaginationData(res)
      })
   }
}

</script>
   
<style scoped>
   @import '../assets/css/app.css'
</style>
   
