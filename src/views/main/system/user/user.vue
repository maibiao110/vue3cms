<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></user-search>
    <user-content
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    ></user-content>
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>
<script lang="ts" setup>
import UserContent from '@/views/main/system/user/c-cpns/user-content.vue'
import UserModal from '@/views/main/system/user/c-cpns/user-modal.vue'
import UserSearch from '@/views/main/system/user/c-cpns/user-search.vue'
import { ref } from 'vue'
const contentRef = ref<InstanceType<typeof UserContent>>()
const modalRef = ref<InstanceType<typeof UserModal>>()
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
function handleNewBtnClick() {
  modalRef.value?.setModalVisible()
}
function handleEditBtnClick(row: any) {
  modalRef.value?.setModalVisible(false, row)
}
</script>
<style lang="less" scoped>
.user {
  border-radius: 8px;

  overflow: hidden;
}
</style>
