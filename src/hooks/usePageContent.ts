import PageContent from '@/components/page-content/page-content.vue'

import { ref } from 'vue'

export function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()

  function handleQueryClick(queryInfo: any) {
    contentRef.value?.fetchPageListData(queryInfo)
  }
  function hadleResetClick() {
    contentRef.value?.fetchPageListData()
  }

  return {
    contentRef,
    handleQueryClick,
    hadleResetClick
  }
}
