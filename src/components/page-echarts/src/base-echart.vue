<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>
<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { onMounted, ref, watchEffect } from 'vue';
import ChinaJson from '../data/china.json';
echarts.registerMap('china', ChinaJson as any)
const echartRef = ref<HTMLElement>()
interface IProps {
  option: EChartsOption
}
const props = defineProps<IProps>()
onMounted(() => {
  const echartInstance = echarts.init(echartRef.value, 'light', {
    renderer: 'canvas'
  })
  watchEffect(() => echartInstance.setOption(props.option))

})
</script>
<style lang="less" scoped>
.echart {
  height: 300px;
}
</style>
