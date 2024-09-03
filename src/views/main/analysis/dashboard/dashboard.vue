<template>
  <div>
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6">
          <count-card v-bind="item"></count-card>
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card>
          <pie-echart :pie-data="showGoodsCategoryCount"></pie-echart>
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card> </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card>
          <rose-echart :rose-data="showGoodsCategorySale"></rose-echart>
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>
          <line-echart> </line-echart>
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>柱状图</chart-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import lineEchart from '@/components/page-echarts/src/line-echart.vue'
import pieEchart from '@/components/page-echarts/src/pie-echart.vue'
import roseEchart from '@/components/page-echarts/src/rose-echart.vue'

import useDashbordStore from '@/stores/main/anaysis/dashbord'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import chartCard from './c-cpns/chart-card/chart-card.vue'
import countCard from './c-cpns/count-card/count-card.vue'

const store = useDashbordStore()
store.fetchAnalysisDataAction()
const { amountList, goodsCategoryCount, goodsCategorySale } = storeToRefs(store)

const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showGoodsCategorySale = computed(() => {
  return goodsCategorySale.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 10px;
}

.echart {
  height: 300px;
}
</style>
