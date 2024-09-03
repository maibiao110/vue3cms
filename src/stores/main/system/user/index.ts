import { delPageById, newPageData, postPageListData } from '@/service/main/main'
import {
  newUserData,
  postUserListData,
  updateUserData
} from '@/service/main/system/user'
import { defineStore } from 'pinia'
import { updatePageData } from '../../../../service/main/main'
import { delUserById } from '../../../../service/main/system/user/index'
import useRoleStore from '../role/role'
interface IUser {
  userList: any
  totalCount: number
  pageList: any
  pageTotalCount: 0
}
interface ApiResponse {
  code: number
  message: string
  data: any
}
const userListStore = defineStore('user', {
  state(): IUser {
    return {
      userList: [],
      totalCount: 0,
      pageList: [],
      pageTotalCount: 0
    }
  },
  actions: {
    async postUserListDataAction(queryInfo: any) {
      const res = await postUserListData(queryInfo)
      const { totalCount, list } = res.data
      this.userList = list
      this.totalCount = totalCount
    },
    async delUserByIdAction(id: number): Promise<ApiResponse> {
      const res = await delUserById(id)
      return res
    },
    async newUserDataAction(userInfo: any) {
      const newResult = await newUserData(userInfo)
      this.postUserListDataAction({ offset: 0, size: 10 })
    },
    async updateUserDataAction(id: number, userInfo: any) {
      const editResult = await updateUserData(id, userInfo)
      this.postUserListDataAction({ offset: 0, size: 10 })
    },
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async delPageByIdAction(
      pageName: string,
      id: number
    ): Promise<ApiResponse> {
      const delPageResult = await delPageById(pageName, id)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      return delPageResult
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      const roleStore = useRoleStore()
      roleStore.fetchEntireDataAction()
    },
    async updatePageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await updatePageData(pageName, id, pageInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      const roleStore = useRoleStore()
      roleStore.fetchEntireDataAction()
    }
  }
})
export default userListStore
