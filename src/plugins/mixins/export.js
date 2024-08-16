// 导出
import { exportCompany } from '@/api/courseScheduling'
import { exportClassmateWaitconfirm } from '@/api/alumniManage'
import { exportClassmate } from '@/api/alumniManage/alumniDatabase'
import { mapGetters } from 'vuex'
import { download } from '@/api/taskCenter'
export default {
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    // 导出
    // type
    // '0' 待确认 '1' 确认中 '3' 非校友库
    // 'alumni_database' 校友库
    // 'unit_database' 单位管理
    showDerive(list, type) {
      if (list?.length) {
        this.down('请确定是否导出?', list, type)
      } else {
        this.down('您未选择任何数据，将下载全部在册数据', list, type)
      }
    },
    down(msg, list, type) {
      this.$confirm(msg, '下载', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          // 导出
          const data = {
            ids: list.map((o) => o.id),
            userName: this.name
          }
          switch (type) {
            case '0':
            case '1':
            case '3':
              exportClassmateWaitconfirm({ data, classify: type }).then((res) => {
                this.$message.success('导出成功，请前往任务中心查看')
                this.$refs.tableRef.clearSelection()
              })
              break
            case 'alumni_database':
              exportClassmate(data).then((res) => {
                this.$message.success('导出成功，请前往任务中心查看')
                this.$refs.tableRef.clearSelection()
              })
              break
            case 'unit_database':
              exportCompany(data).then((res) => {
                this.$message.success('导出成功，请前往任务中心查看')
                this.$refs.tableRef.clearSelection()
              })
              break
            default:
              break
          }
          this.multipleSelection = []
        })
        .catch(() => {
          // 取消
          this.$refs.tableRef.clearSelection()
        })
    }
  }
}
