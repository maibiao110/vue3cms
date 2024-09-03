<script setup lang="ts">
import MainHeader from '@/components/main-header/main-header.vue'
import MainMenu from '@/components/main-menu/main-menu.vue'
import { localCache } from '@/utils/cache'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function Exit() {
  router.push('/login')
  localCache.clearCache()
}
const isCollapse = ref(false)
function handleFoldChange(isFold: boolean) {
  isCollapse.value = isFold
}
</script>

<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <main-menu :isFold="isCollapse"></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <main-header @fold-change="handleFoldChange"></main-header>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <!-- <button @click="Exit">退出</button> -->
  </div>
</template>
<style lang="less" scoped>
.main {
  height: 100%;

  .main-content {
    height: 100%;
  }

  .el-aside {
    transition: width 0.3s ease;
  }
}
</style>
