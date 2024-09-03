import {
  postEmtireDepartments,
  postEmtireMenus,
  postEmtireRoles
} from '@/service/main/system/role'
import { defineStore } from 'pinia'
interface IRole {
  entireRoles: any[]
  entireDepartment: any[]
  entireMenus: any[]
}
const useRoleStore = defineStore('role', {
  state(): IRole {
    return {
      entireRoles: [],
      entireDepartment: [],
      entireMenus: []
    }
  },
  actions: {
    async fetchEntireDataAction() {
      const roleResult = await postEmtireRoles()
      const departmentResult = await postEmtireDepartments()
      const menusResult = await postEmtireMenus()

      this.entireDepartment = departmentResult.data.list
      this.entireRoles = roleResult.data.list
      this.entireMenus = menusResult.data.list
    }
  }
})
export default useRoleStore
