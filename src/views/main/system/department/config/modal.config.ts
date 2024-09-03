import type { IProps } from '@/components/page-modal/types'
const modalConfig: IProps['modalConfig'] = {
  pageName: 'department',
  header: {
    newTitle: '新建部门',
    editTitle: '编辑部门'
  },
  formItems: [
    {
      label: '部门名称',
      prop: 'name',
      type: 'input',
      placeholder: '请输入部门名称',
      initialValue: 'aaa'
    },
    {
      label: '部门领导',
      prop: 'leader',
      type: 'input',
      placeholder: '请输入部门领导'
    },
    {
      label: '上级部门',
      prop: 'parentId',
      type: 'select',
      placeholder: '请选择上级部门',
      options: []
    }
  ]
}
export default modalConfig
