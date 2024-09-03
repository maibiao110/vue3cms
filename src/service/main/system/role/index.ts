import hyRequest from '@/service'
//获取所有的角色
export function postEmtireRoles() {
  return hyRequest.post({
    url: '/role/list'
  })
}
//获取所有的部门
export function postEmtireDepartments() {
  return hyRequest.post({
    url: '/department/list'
  })
}
//获取所有的菜单
export function postEmtireMenus() {
  return hyRequest.post({
    url: '/menu/list'
  })
}
