import hyRequest from '@/service'

export function getAmountListData() {
  return hyRequest.get({
    url: '/goods/amount/list'
  })
}
//商品类别的图表数据
export function getGoodsCategoryCount() {
  return hyRequest.get({
    url: '/goods/category/count'
  })
}
export function getGoodsCategorySale() {
  return hyRequest.get({
    url: '/goods/category/sale'
  })
}
