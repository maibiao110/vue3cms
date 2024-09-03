import PageModal from '@/components/page-modal/page-modal.vue'
import { ref } from 'vue'
type CallbackFn = (data?: any) => void

export function usePageModal(
  newCallback?: CallbackFn,
  editCallback?: CallbackFn
) {
  //点击content modal的操作
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }
  function handleEditClick(row: any) {
    modalRef.value?.setModalVisible(false, row)
    if (editCallback) editCallback(row)
  }
  return {
    modalRef,
    handleNewClick,
    handleEditClick
  }
}
