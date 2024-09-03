<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleNewUserClick" v-if="isCreate">{{
        contentConfig.header?.btnTitle ??
        '新建数据' }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%"
        v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatDate(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button size="small" icon="edit" v-if="isUpdate"
                  @click="editUserDataClick(scope.row)">
                  编辑
                </el-button>
                <el-button size="small" icon="delete" v-if="isDelete"
                  @click="delClick(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop">
                </slot>
              </template>
            </el-table-column>


          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination v-model:current-page="currentPage"
        v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
        :total="pageTotalCount" layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange" @size-change="handleSizeChange" />
    </div>
  </div>
</template>
<script lang="ts" setup>

import usePagePermission from '@/hooks/usePagePermission';
import userListStore from '@/stores/main/system/user';
import { formatDate } from '@/utils/format';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string,
      btnTitle?: string
    }
    propsList: Array<{ label: string, width: string, type: string, prop: string, slotName: string }>,
    childrenTree: {
      rowKey: string,
      treeProps: any
    }
  }
}
const props = defineProps<IProps>()
const emit = defineEmits(['newClick', 'editClick'])

const isCreate = usePagePermission(`${props.contentConfig.pageName}:create`)
const isDelete = usePagePermission(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePagePermission(`${props.contentConfig.pageName}:update`)
const isQuery = usePagePermission(`${props.contentConfig.pageName}:query`)
const userStore = userListStore()
const currentPage = ref(1)
const pageSize = ref(10)

userStore.$onAction(({ name, after }) => {
  after(() => {
    if (name === 'updatePageDataAction' || name === 'newPageDataAction' || name === 'delPageByIdAction') {
      currentPage.value = 1
    }
  })

})

fetchPageListData()
const { pageList, pageTotalCount } = storeToRefs(userStore)


function fetchPageListData(formData: any = {}) {
  if (!isQuery) return
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  //网络请求
  const info = { size, offset }
  const queryInfo = { ...info, ...formData }

  userStore.postPageListAction(props.contentConfig.pageName, queryInfo);
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

  ElMessageBox.confirm(
    '此操作将永久删除该用户, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 用户点击了确定按钮，执行删除操作
    userStore.delPageByIdAction(props.contentConfig.pageName, id).then((res) => {
      if (res.code === 0)
        // 删除成功后的处理
        ElMessage({
          message: '删除成功',
          type: 'success',
          onClose: function () {
            fetchPageListData({ offset: 0, size: 10 })
          }
        })

    }).catch((error) => {
      // 删除失败后的处理
      ElMessage.error('删除失败');
      console.error('Delete failed:', error);
    });
  }).catch(() => {
    // 用户点击了取消按钮
    ElMessage({
      type: 'info',
      message: '已取消删除',
    });
  });

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
    font-size: 22px
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
