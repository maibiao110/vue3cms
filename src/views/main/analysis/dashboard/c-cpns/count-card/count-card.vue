<template>
  <div class="count-header">
    <div class="header">
      <span class="totle">{{ title }}</span>
      <el-tooltip :content="tips" placement="bottom" effect="light">
        <el-icon>
          <warning />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span v-if="amount === 'saleroom'">￥</span>

      <span class="count" ref="count1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span class="totle">{{ subTitle }}</span>
      <span v-if="amount === 'saleroom'">￥</span>
      <span class="title" ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CountUp } from 'countup.js'
import { onMounted, ref } from 'vue'
interface IProp {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subTitle?: string
}
const props = withDefaults(defineProps<IProp>(), {
  title: '商品总销量',
  tips: '商品总量',
  number1: 50889,
  number2: 50889,
  subtitle: '商品总销量'
})
const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()

onMounted(() => {
  const countup1 = new CountUp(count1Ref.value!, props.number1)
  const countup2 = new CountUp(count2Ref.value!, props.number2)

  countup1.start()
  countup2.start()
})
</script>
<style lang="less" scoped>
.count-header {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  background-color: #fff;
  height: 130px;

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    margin-left: 0;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;

    align-items: center;
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 16px;
    letter-spacing: 1;
    border-top: 1px solid #f0f0f0;
  }
}
</style>
