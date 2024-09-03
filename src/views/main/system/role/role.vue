<template>
  <div>
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="hadleResetClick"
    ></page-search>
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></page-content>
    <page-modal
      :modal-config="modalConfig"
      ref="modalRef"
      :other-info="otherInfo"
    >
      <template #btn>
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="hanleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>
<script lang="ts" setup>
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import PageSearch from '@/components/page-search/page-search.vue'
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'
import useRoleStore from '@/stores/main/system/role/role'
import type { ElTree } from 'element-plus'
import { nextTick, ref, toRefs } from 'vue'

import { mapMenuListToIds } from '@/utils/map-menus'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import searchConfig from './config/search.config'
const roleStore = useRoleStore()
const { entireMenus } = toRefs(roleStore)
const { contentRef, hadleResetClick, handleQueryClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal(
  newCallback,
  editCallback
)
const otherInfo = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()
function hanleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]

  otherInfo.value = { menuList }
}
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
function editCallback(row: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(row.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>
<style lang="less" scoped></style>
