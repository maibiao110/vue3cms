<template>
  <div>
    <el-card :header="header">
      <slot>默认的内容</slot>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
interface IProp {
  header?: string
}
withDefaults(defineProps<IProp>(), {
  header: '卡片的头部标题'
})
</script>
<style lang="less" scoped></style>
