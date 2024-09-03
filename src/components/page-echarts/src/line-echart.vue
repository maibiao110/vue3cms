<template>
  <div class="line-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>
<script lang="ts" setup>
import { type EChartsOption } from 'echarts';
import baseEchart from './base-echart.vue';
const option: EChartsOption = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {}
    }
  ]
}
</script>
<style lang="scss" scoped></style>
