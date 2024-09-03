<template>
  <div class="search">
    <el-form size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="160">
        <el-col :span="8">
          <el-form-item label="部门名称" label-width="80px" prop="name">
            <el-input v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" label-width="80px" prop="leader">
            <el-input v-model="searchForm.leader"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间" label-width="80px" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
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
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
const searchForm = reactive({
  name: '',
  leader: '',
  createAt: ''
})
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
