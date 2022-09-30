<template>
   <div id="header">
      <van-sticky>
         <van-nav-bar :title="currNavBarTitle">
            <template #left>
               <van-icon name="wap-nav" size="18" color="black" @click="showSidePopoUp" />
            </template>
         </van-nav-bar>
        
      </van-sticky>
   </div>
   <!-- 侧边栏 -->
   <van-popup position="left" v-model:show="sidePopup" :style="{height: '100vh',width: '30vw'}">
      <van-sidebar style="width: 30vw;" v-model="active">
         <van-sidebar-item @click="compSwitch('myFile')" title="我的文件" />
         <van-sidebar-item @click="compSwitch('lanFile')" title="局域网文件" />
         <van-sidebar-item @click="compSwitch('classifyFile','video')" title="视频" />
         <van-sidebar-item @click="compSwitch('classifyFile','audio')" title="音频" />
         <van-sidebar-item @click="compSwitch('classifyFile','image')" title="图片" />
         <van-sidebar-item @click="compSwitch('classifyFile','document')" title="文档" />
      </van-sidebar>
   </van-popup>

   <div id="body">
      <component :is="componentName[currComp]" :name="currClassify"></component>
   </div>
</template>
 
<script setup>
import myFile from './myFile.vue'
import { ref } from 'vue'
import lanFile from './lanFile.vue';
import classifyFile from './classifyFile.vue'
const sidePopup = ref(false);
const active = ref(0);
let currComp = ref('myFile')
let currNavBarTitle = ref('我的文件')
let currClassify = ref('')
let componentName = {
   myFile: myFile,
   lanFile: lanFile,
   classifyFile: classifyFile
}
function showSidePopoUp() {
   sidePopup.value = true
}



function compSwitch(compName,classifyFileName = '') {
   switch (compName) {
      case 'myFile': {
         currComp.value = 'myFile'
         currNavBarTitle.value = '我的文件'
        
      } break;
      case 'lanFile': {
         currComp.value = 'lanFile'
         currNavBarTitle.value = '局域网文件'
      } break;
      case 'classifyFile':{
         currComp.value = 'classifyFile'
         switch(classifyFileName){
            case 'video': {
               currNavBarTitle.value = '视频'
            }break;
            case 'audio': {
               currNavBarTitle.value = '音频'
            }break;
            case 'image': {
               currNavBarTitle.value = '图片'
            }break;
            case 'document': {
               currNavBarTitle.value = '文档'
            }
         }
         currClassify.value = classifyFileName

         
      }break;
   }
}


</script>
 
<style scoped>
:deep() .van-nav-bar {
   background-color: #f1f1f1;
}
</style>
 