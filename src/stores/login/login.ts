import { TOKEN, USER_INFO, USER_MENU } from '@/globle/constant'
import router from '@/router'
import {
  accountLogin,
  getMenusByRoleId,
  getUserInfoById
} from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { mapMenuListToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import type { Iccount } from '@/views/login/types'
import { defineStore } from 'pinia'
import useRoleStore from '../main/system/role/role'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permission: string[]
}
const useLoginStore = defineStore('login', {
  state(): ILoginState {
    return {
      token: localCache.getCache(TOKEN) ?? '',
      userInfo: localCache.getCache(USER_INFO) ?? {},
      userMenus: localCache.getCache(USER_MENU) ?? [],
      permission: []
    }
  },
  actions: {
    async loginAccountAction(account: Iccount) {
      const res = await accountLogin(account)
      const id = res.data.id
      this.token = res.data.token
      localCache.setCache(TOKEN, this.token)
      //获取登录用户的角色信息
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data
      localCache.setCache(USER_INFO, userInfoResult.data)
      //根据角色获取菜单
      const userMenusResult = await getMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenusResult.data
      localCache.setCache(USER_MENU, userMenusResult.data)
      //请求所有的角色/部门列表
      const roleStore = useRoleStore()
      roleStore.fetchEntireDataAction()
      //获取登录角色的所有按钮权限
      const permission = mapMenuListToPermissions(this.userMenus)
      this.permission = permission
      //动态添加路由
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))
      router.push('/main')
    },

    loadLocalCacheAction() {
      const token = localCache.getCache(TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const userMenus = localCache.getCache(USER_MENU)
      if (token && userInfo && userMenus) {
        const roleStore = useRoleStore()
        roleStore.fetchEntireDataAction()
        //获取登录角色的所有按钮权限
        const permission = mapMenuListToPermissions(this.userMenus)
        this.permission = permission
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
export default useLoginStore
