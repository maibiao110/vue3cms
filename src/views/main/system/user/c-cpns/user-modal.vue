<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="90px" size="large"
          :rules="rules" ref="formRef">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="isNewRef">
            <el-input v-model="formData.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone"></el-input>
          </el-form-item>

          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色"
              style="width: 100%">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formData.departmentId">
              <template v-for="item in entireDepartment" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>

            </el-select>
          </el-form-item>
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
import useRoleStore from '@/stores/main/system/role/role';
import userListStore from '@/stores/main/system/user';
import { type ElForm, type FormRules } from 'element-plus';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';
//定义内部的属性
const dialogVisible = ref(false);
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const editData = ref()
const isNewRef = ref(true)
//获取角色/部门信息
const roleStore = useRoleStore();
const { entireDepartment, entireRoles } = storeToRefs(roleStore)
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
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' },
  ],
  realname: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' },
    { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' },
  ],
  cellphone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { validator: validateCellphone, trigger: 'blur' }
  ]
}
//点击确认
function confirmClick() {
  //创建用户
  const userStore = userListStore()
  formRef.value?.validate((valid) => {
    if (valid) {
      if (!isNewRef.value && editData) {
        //编辑
        userStore.updateUserDataAction(editData.value.id, formData).then(() => {
          ElMessage.success("编辑成功")
          dialogVisible.value = false;
        })
      } else {

        //新建
        userStore.newUserDataAction(formData).then(() => {
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
