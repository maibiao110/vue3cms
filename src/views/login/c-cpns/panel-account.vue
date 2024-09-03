<script setup lang="ts">
import { NAME, PASSWORD } from '@/globle/constant'
import useLoginStore from '@/stores/login/login'
import { localCache } from '@/utils/cache'
import { ElMessage, type ElForm, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import type { Iccount } from '../types'
const account = reactive<Iccount>({
  name: localCache.getCache(NAME) ?? '',
  password: localCache.getCache(PASSWORD) ?? ''
})
const formRef = ref<InstanceType<typeof ElForm>>()
const rules: FormRules = {
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'blur' }
  ]
}
const loginStore = useLoginStore()

function loginAction(rememberPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({ name, password }).then(() => {
        ElMessage.success('登录成功')
        if (rememberPwd) {
          localCache.setCache(NAME, name)
          localCache.setCache(PASSWORD, password)
        } else {
          localCache.removeCache(NAME)
          localCache.removeCache(PASSWORD)
        }
      })
    } else {
      ElMessage.error('请输入正确的格式后再登录')
    }
  })
}
defineExpose({
  loginAction
})
</script>

<template>
  <div class="panel-account">
    <el-form
      label-width="60px"
      :model="account"
      :rules="rules"
      ref="formRef"
      status-icon
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="less" scoped></style>
