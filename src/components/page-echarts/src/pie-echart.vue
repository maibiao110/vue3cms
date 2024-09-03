<template>
  <div class="pie-chart">
    <base-echart :option="option"></base-echart>
  </div>
</template>
<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';
import { type IEchartValueType } from '../types/index';
import baseEchart from './base-echart.vue';
interface IProps {
  pieData: IEchartValueType[]
}
const props = defineProps<IProps>()
const option = computed<EChartsOption>(() => {
  return {
    // 手指放上去的时候显示的文本
    tooltip: {
      trigger: 'item'
    },
    // 图例:
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        bottom: '-10%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>
<style lang="scss" scoped></style>
