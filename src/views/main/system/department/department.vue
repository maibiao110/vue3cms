<template>
  <div class="department">
    <page-search :searchConfig="searchConfig" @query-click="handleQueryClick"
      @reset-click="hadleResetClick"></page-search>
    <page-content :content-config="contentConfig" ref="contentRef"
      @new-click="handleNewClick" @edit-click="handleEditClick">
      <template #leader="scope">
        <span>哈哈哈哈:{{ scope.row[scope.prop] }}</span>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import PageContent from '@/components/page-content/page-content.vue';
import PageModal from '@/components/page-modal/page-modal.vue';
import PageSearch from '@/components/page-search/page-search.vue';

import { usePageContent } from '@/hooks/usePageContent';
import { usePageModal } from '@/hooks/usePageModal';
import useRoleStore from '@/stores/main/system/role/role';
import { computed } from 'vue';
import contentConfig from './config/content.config';
import modalConfig from './config/modal.config';
import searchConfig from './config/search.config';
const { contentRef, handleQueryClick, hadleResetClick } = usePageContent()
const { handleEditClick, modalRef, handleNewClick } = usePageModal()
const modalConfigRef = computed(() => {
  const roleStore = useRoleStore()
  const departments = roleStore.entireDepartment.map(item => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach(item => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modalConfig
})


</script>

<style scoped></style>
