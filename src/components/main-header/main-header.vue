<template>
  <div class="main-header">
    <div class="menu-icon">
      <el-icon size="28px" @click="handleMenuIconClick">
        <component :is="isFold ? 'expand' : 'fold'"></component>
      </el-icon>
      <div class="crumb">
        <header-crumb></header-crumb>
      </div>
    </div>

    <div class="info">
      <el-dropdown>
        <el-button @click="handleClick"> 退出登录 </el-button>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import HeaderCrumb from '@/components/main-header/c-cpns/header-crumb.vue'
import { localCache } from '@/utils/cache'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const isFold = ref(false)
const emit = defineEmits(['foldChange'])
const router = useRouter()
function handleMenuIconClick() {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
function handleClick() {
  // localCache.removeCache(TOKEN)
  localCache.clearCache()
  router.push('/login')
}
</script>
<style lang="less" scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;

    .crumb {
      margin-left: 15px;
    }
  }

  /* 使用 v-deep 指令穿透作用域 */
  :deep(.el-button:active) {
    border-color: #fff;
  }

  :deep(.el-button:focus-visible) {
    background-color: transparent;
    outline: none;
  }
}
</style>
