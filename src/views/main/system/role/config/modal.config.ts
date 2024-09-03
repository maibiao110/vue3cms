import type { IProps } from '@/components/page-modal/types'
const modalConfig: IProps['modalConfig'] = {
  pageName: 'role',
  header: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      label: '角色名称',
      prop: 'name',
      type: 'input',
      placeholder: '请输入角色名称'
    },
    {
      label: '权限介绍',
      prop: 'intro',
      type: 'input',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'custom',
      slotName: 'btn'
    }
  ]
}
export default modalConfig
