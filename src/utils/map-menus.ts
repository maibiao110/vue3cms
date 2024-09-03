import type { RouteRecordRaw } from 'vue-router'
//获取本地的所有路由
function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  //1.获取到所有的路由对象放到数组中,读取router/main下的所有ts文件
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )

  for (const file in files) {
    const module = files[file]
    localRoutes.push(module.default)
  }
  return localRoutes
}
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  //加载所有的本地路由
  const localRoutes = loadLocalRoutes()
  //根据菜单去匹配路由
  const routes: RouteRecordRaw[] = []

  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route })
        }

        routes.push(route)
      }
      //记录第一个被匹配到的菜单
      if (firstMenu === null && route) firstMenu = submenu
    }
  }
  return routes
}
//根据当前活跃的路由匹配菜单
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

export function mapPathToCrumb(path: string, userMenus: any[]) {
  //定义面包屑
  const breadcrumbs: any[] = []
  //遍历层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
//菜单映射id
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []
  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)
  return ids
}

//按钮权限映射
export function mapMenuListToPermissions(menuList: any[]) {
  const permissions: string[] = []
  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)
  return permissions
}
