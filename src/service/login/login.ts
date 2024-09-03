import type { Iccount } from '@/views/login/types'
import hyRequest from '..'

export function accountLogin(account: Iccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: '/users/' + id
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(TOKEN)
    // }
  })
}
export function getMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(TOKEN)
    // }
  })
}
