import useLoginStore from '@/stores/login/login'

function usePagePermission(permissionId: string) {
  const loginStore = useLoginStore()
  const { permission } = loginStore
  return !!permission.find((item) => item.includes(permissionId))
}
export default usePagePermission
