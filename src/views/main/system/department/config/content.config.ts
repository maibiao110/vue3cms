const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propsList: [
    {
      label: '序号',
      width: '60px',
      type: 'index'
    },
    {
      label: '选择',
      width: '60px',
      type: 'selection'
    },
    {
      label: '部门名称',
      prop: 'name',
      width: '150px',
      type: 'normal'
    },
    {
      label: '部门领导',
      prop: 'leader',
      width: '150px',
      type: 'normal'
    },
    {
      label: '部门领导',
      prop: 'leader',
      width: '150px',
      type: 'custom',
      slotName: 'leader'
    },
    {
      label: '上级部门',
      prop: 'parentId',
      width: '150px',
      type: 'normal'
    },
    {
      label: '创建时间',
      prop: 'createAt',
      type: 'timer'
    },
    {
      label: '更新时间',
      prop: 'updateAt',
      type: 'timer'
    },
    {
      label: '操作',
      type: 'handler',
      width: '180px'
    }
  ]
}
export default contentConfig
