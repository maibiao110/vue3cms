<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PanelAccount from './panel-account.vue'
const rememberPwd = ref<boolean>(localCache.getCache('rememberPwd') ?? false)
const activeName = ref('account')
const accountRef = ref<InstanceType<typeof PanelAccount>>()
watch(rememberPwd, (newValue) => {
  localCache.setCache('rememberPwd', newValue)
})
function handleClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(rememberPwd.value)
  } else {
    console.log('点击了手机')
  }
}
</script>

<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <el-tabs v-model="activeName" class="tabs" stretch>
      <el-tab-pane label="账号登录" name="account">
        <template #label>
          <div class="icon">
            <el-icon>
              <UserFilled />
            </el-icon>
            <span class="text">账号登录</span>
          </div>
        </template>
        <panel-account ref="accountRef"></panel-account>
      </el-tab-pane>
      <el-tab-pane label="手机登录" name="phone"></el-tab-pane>
    </el-tabs>

    <div class="control-account">
      <el-checkbox
        v-model="rememberPwd"
        label="记住密码"
        size="large"
      ></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button
      class="login-btn"
      size="large"
      type="primary"
      @click="handleClick"
      >立即登录</el-button
    >
  </div>
</template>
<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    margin-left: 5px;
  }

  .control-account {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
