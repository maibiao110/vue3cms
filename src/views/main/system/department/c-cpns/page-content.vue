<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
    </div>
    <div>
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column type="selection" />
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="60px"
        />

        <el-table-column
          align="center"
          prop="name"
          label="部门名称"
          width="120px"
        />
        <el-table-column
          align="center"
          prop="leader"
          label="部门领导"
          width="120px"
        />
        <el-table-column
          align="center"
          prop="parentId"
          label="上级部门"
          width="150px"
        />

        <el-table-column align="center" prop="createAt" label="创建日期">
          <template #default="scope">
            {{ formatDate(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新日期">
          <template #default="scope">
            {{ formatDate(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="170px">
          <template #default="scope">
            <el-button
              size="small"
              icon="edit"
              @click="editUserDataClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              icon="delete"
              @click="delClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :total="pageTotalCount"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import userListStore from '@/stores/main/system/user'
import { formatDate } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const emit = defineEmits(['newClick', 'editClick'])
const userStore = userListStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()
const { pageList, pageTotalCount } = storeToRefs(userStore)

function fetchPageListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  //网络请求
  const info = { size, offset }
  const queryInfo = { ...info, ...formData }

  userStore.postPageListAction('department', queryInfo)
}
function handleCurrentChange() {
  fetchPageListData()
}
function handleSizeChange() {
  fetchPageListData()
}

//编辑按钮
function editUserDataClick(row: any) {
  emit('editClick', row)
}
//删除按钮
function delClick(id: number) {
  ElMessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 用户点击了确定按钮，执行删除操作
      userStore
        .delPageByIdAction('department', id)
        .then((res) => {
          if (res.code === 0)
            // 删除成功后的处理
            ElMessage({
              message: '删除成功',
              type: 'success',
              onClose: function () {
                fetchPageListData({ offset: 0, size: 10 })
              }
            })
        })
        .catch((error) => {
          // 删除失败后的处理
          ElMessage.error('删除失败')
          console.error('Delete failed:', error)
        })
    })
    .catch(() => {
      // 用户点击了取消按钮
      ElMessage({
        type: 'info',
        message: '已取消删除'
      })
    })
}
//新建用户
function handleNewUserClick() {
  emit('newClick')
}
defineExpose({
  fetchPageListData
})
</script>
<style lang="less" scoped>
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 15px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.el-message-box {
  position: relative;
  z-index: 10000 !important;
}
</style>
