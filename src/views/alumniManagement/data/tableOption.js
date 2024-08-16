// 默认表格 headerConfig 适用于 待确认 确认中 非校友库
export const defaultTableOption = [
    {
        label: "序号",
        columnType: "slot",
        slotName: "index",
        width: 60,
        tooltip: true,
        fixed: true,
    },
    {
        label: "姓名",
        value: "name",
        width: 150,
        tooltip: true,
        fixed: true
    },
    {
        label: "性别",
        value: "sex",
        tooltip: true
    },
    {
        label: "出生日期",
        columnType: "slot",
        width: 150,
        slotName: "birthday",
        tooltip: true,
    },
    {
        label: "籍贯",
        columnType: "slot",
        width: 200,
        slotName: "oldProvince",
        tooltip: true,
    },
    {
        label: "政治面貌",
        value: "politics",
        tooltip: true,
    },
    {
      label: "最高学历",
      value: "educationMax",
      tooltip: true,
    },
    {
      label: "校友类型",
      value: "typeName",
      tooltip: true,
    },
    {
      label: "单位",
      value: "company",
        width: 250,
        tooltip: true,
    },
    {
        label: "职务",
        value: "position",
        width: 300,
        tooltip: true,
    },
    {
        label: "工作状态",
        value: "workStatus",
        width: 100,
        tooltip: true,
    },
    {
        label: "标签属性",
        value: "attributeName",
        width: 150,
        tooltip: true,
      },
      {
          label: "联系电话",
          columnType: "slot",
          width: 150,
          slotName: "phone",
          tooltip: true,
      },
      {
        label: "采集时间",
        value: "collectTime",
        width: 200,
        tooltip: true,
        sortable: true
    },
    {
        label: "更新时间",
        width: 200,
        value: "modifyDate",
        tooltip: true,
        sortable: true
    },
    {
        width: 150,
        label: "操作",
        columnType: "slot",
        slotName: "operation",
        fixed: 'right'
    }
]


// 默认表格 headerConfig 适用于 疑似校友
export const pendingTableOption = [
    {
        label: "序号",
        columnType: "slot",
        slotName: "index",
        width: 60,
        tooltip: true,
        fixed: true,
    },
    {
        label: "姓名",
        value: "name",
        width: 150,
        tooltip: true,
        fixed: true
    },
    {
        label: "性别",
        value: "sex",
        tooltip: true
    },
    {
        label: "出生日期",
        columnType: "slot",
        width: 150,
        slotName: "birthday",
        tooltip: true,
    },
    {
        label: "籍贯",
        columnType: "slot",
        width: 200,
        slotName: "oldProvince",
        tooltip: true,
    },
    {
        label: "政治面貌",
        value: "politics",
        tooltip: true,
    },
    {
      label: "最高学历",
      value: "educationMax",
      tooltip: true,
    },
    {
      label: "校友类型",
      value: "typeName",
      tooltip: true,
    },
    {
      label: "单位",
      value: "company",
        width: 250,
        tooltip: true,
    },
    {
        label: "职务",
        value: "position",
        width: 300,
        tooltip: true,
    },
    {
        label: "工作状态",
        value: "workStatus",
        width: 100,
        tooltip: true,
    },
    {
        label: "标签属性",
        value: "attributeName",
        width: 150,
        tooltip: true,
      },
      {
          label: "联系电话",
          columnType: "slot",
          width: 150,
          slotName: "phone",
          tooltip: true,
      },
      {
          label: "确认情况",
          columnType: "slot",
          slotName: "classifyTemp",
          width: 150,
          tooltip: true,
      },
      {
        label: "采集时间",
        value: "collectTime",
        width: 200,
        tooltip: true,
        sortable: true
    },
    {
        label: "更新时间",
        width: 200,
        value: "modifyDate",
        tooltip: true,
        sortable: true
    },
    {
        width: 150,
        label: "操作",
        columnType: "slot",
        slotName: "operation",
        fixed: 'right'
    }
]

// 校友库 表格 headerconfig
export const alumniTableOption = [
    {
        label: "序号",
        columnType: "slot",
        slotName: "index",
        width: 60,
        tooltip: true,
        fixed: true,
    },
    {
        label: "姓名",
        value: "name",
        width: 150,
        tooltip: true,
        fixed: true
    },
    {
        label: "性别",
        value: "sex",
        tooltip: true
    },
    {
        label: "出生日期",
        columnType: "slot",
        width: 150,
        slotName: "birthday",
        tooltip: true,
    },
    {
        label: "籍贯",
        columnType: "slot",
        width: 200,
        slotName: "oldProvince",
        tooltip: true,
    },
    {
        label: "政治面貌",
        value: "politics",
        tooltip: true,
    },
    
    {
        label: "最高学历",
        value: "educationMax",
        tooltip: true,
    },
    {
        label: "校友类型",
        value: "typeName",
        tooltip: true,
    },
    {
        label: "单位",
        value: "companyName",
        width: 250,
        tooltip: true,
    },
    {
        label: "职务",
        value: "position",
        width: 300,
        tooltip: true,
    },
    {
        label: "工作状态",
        value: "workStatus",
        width: 100,
        tooltip: true,
    },
    {
        label: "标签属性",
        value: "attributeName",
        width: 150,
        tooltip: true,
    },
    {
      label: "联系电话",
      columnType: "slot",
      width: 150,
      slotName: "phone",
      tooltip: true,
  },
    {
        label: "采集时间",
        value: "collectTime",
        width: 200,
        tooltip: true,
        sortable: true
    },
    {
        label: "更新时间",
        width: 200,
        value: "modifyDate",
        tooltip: true,
        sortable: true
    },
    {
        width: 250,
        label: "操作",
        columnType: "slot",
        slotName: "operation",
        fixed: 'right'
    }
]