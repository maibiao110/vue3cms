import {
  getAmountListData,
  getGoodsCategoryCount,
  getGoodsCategorySale
} from '@/service/main/analysis/dashbord/dashbord'
import { defineStore } from 'pinia'
interface IDashbord {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
}
const useDashbordStore = defineStore('dashbord', {
  state(): IDashbord {
    return {
      amountList: [],
      goodsCategoryCount: [],
      goodsCategorySale: []
    }
  },
  actions: {
    fetchAnalysisDataAction() {
      getAmountListData().then((res) => {
        this.amountList = res.data
      })

      getGoodsCategoryCount().then((res) => {
        this.goodsCategoryCount = res.data
      })
      getGoodsCategorySale().then((res) => {
        this.goodsCategorySale = res.data
      })
    }
  }
})
export default useDashbordStore
