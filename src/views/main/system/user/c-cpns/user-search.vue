<template>
  <div class="search">
    <el-form size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="160">
        <el-col :span="8">
          <el-form-item label="用户名" label-width="80px" prop="name">
            <el-input v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" label-width="80px" prop="realname">
            <el-input v-model="searchForm.realname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" label-width="80px" prop="cellphone">
            <el-input v-model="searchForm.cellphone"></el-input>
          </el-form-item></el-col>
        <el-col :span="8">
          <el-form-item label="状态" label-width="80px" prop="enable">
            <el-select v-model="searchForm.enable" placeholder="请选择查询状态"
              clearable>
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" label-width="80px" prop="createAt">
            <el-date-picker v-model="searchForm.createAt" type="daterange"
              range-separator="-" start-placeholder="开始时间"
              end-placeholder="结束时间" />
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
    <!-- 重置和搜索按钮 -->
    <div class="btns">
      <el-button icon="refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" @click="handleQueryClick"
        icon="search">搜索</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ElForm } from 'element-plus';
import { reactive, ref } from 'vue';
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
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
