<template>
  <div class="search" v-if="isQuery">
    <el-form size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="props.searchConfig.gutter ?? 80">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <!-- <component :is="`el-${item.type}`"></component> -->
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 重置和搜索按钮 -->
    <div class="btns">
      <el-button icon="refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" @click="handleQueryClick" icon="search"
        >搜索</el-button
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import usePagePermission from '@/hooks/usePagePermission'
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

interface IProps {
  searchConfig: {
    gutter?: number
    formItems: any[]
    pageName: string
  }
}

const props = defineProps<IProps>()
const isQuery = usePagePermission(`${props.searchConfig.pageName}:query`)
//定义form的数据
const initialForm: any = {}

for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = ''
}
const searchForm = reactive(initialForm)
const emit = defineEmits(['queryClick', 'resetClick'])
const formRef = ref<InstanceType<typeof ElForm>>()

function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>
<style lang="less" scoped>
.search {
  padding: 20px;
  background-color: #fff;

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
