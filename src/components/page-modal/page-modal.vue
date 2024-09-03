<template>
  <div>
    <el-dialog v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="90px" size="large"
          :rules="rules" ref="formRef">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item v-bind="item">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]"></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select v-model="formData[item.prop]">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label"
                      :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
              <template v-else-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmClick">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import userListStore from '@/stores/main/system/user';
import { type ElForm, type FormRules } from 'element-plus';

import { reactive, ref } from 'vue';
import type { IProps } from './types';
const props = defineProps<IProps>()
//定义内部的属性
const dialogVisible = ref(false);
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive(initialData)
const editData = ref()
const isNewRef = ref(true)


//自定义规则
function validateCellphone(rule: any, value: any, callback: any) {
  // 手机号码正则表达式
  const cellphoneRE = /^1[3-9]\d{9}$/;
  if (value === '') {
    // 当值为空时，传递错误信息给callback
    return callback(new Error('请输入手机号'));
  } else if (!cellphoneRE.test(value)) {
    // 当值不符合正则表达式时，传递错误信息给callback
    return callback(new Error('手机号格式不正确'));
  }
  // 如果验证通过，调用callback无参数
  callback();
}
const formRef = ref<InstanceType<typeof ElForm>>()
const rules: FormRules = {
  name: [
    { required: true, message: '请输入部门名称', trigger: 'blur' },
    { min: 2, max: 10, message: 'Length should be 2 to 10', trigger: 'blur' },
  ]

}
//点击确认
function confirmClick() {
  let infoData = { ...formData }
  if (props.otherInfo) {
    infoData = { ...formData, ...props.otherInfo }
  }
  //创建用户
  const userStore = userListStore()
  formRef.value?.validate((valid) => {
    if (valid) {
      if (!isNewRef.value && editData) {
        //编辑
        userStore.updatePageDataAction(props.modalConfig.pageName, editData.value.id, infoData).then(() => {
          ElMessage.success("编辑成功")
          dialogVisible.value = false;
        })
      } else {

        //新建
        userStore.newPageDataAction(props.modalConfig.pageName, infoData).then(() => {
          ElMessage.success("添加成功")
          dialogVisible.value = false;
        })
      }


    } else {
      ElMessage.error("请检查输入的内容格式是否正确")
    }
  })

}
function setModalVisible(isnew: boolean = true, row?: any) {
  dialogVisible.value = true
  isNewRef.value = isnew
  if (!isnew && row) {
    //编辑弹窗
    for (const key in formData) {
      formData[key] = row[key]
    }
    editData.value = row
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}
defineExpose({
  setModalVisible
})
</script>
<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
