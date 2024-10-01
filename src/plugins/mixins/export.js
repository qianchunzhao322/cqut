// 导出
import { mapGetters } from 'vuex'
import { download } from '@/api/taskCenter'
export default {
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    // 导出
    showDerive(list, url, fileName) {
      if (list?.length) {
        this.down('请确定是否导出?', list, url, fileName)
      } else {
        this.down('您未选择任何数据，将下载全部在册数据', list, url, fileName)
      }
    },
    down(msg, list, url, fileName) {
      this.$confirm(msg, '下载', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          // 导出
          const data = {
            ids: list.map((o) => o.id)
            // userName: this.name
          }
          download(url).then((res) => {
            console.log(res)
            const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            const link = document.createElement('a')
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }).catch(error => {
            this.$message.error('下载失败')
            console.log(error)
          })
          this.multipleSelection = []
        })
        .catch(() => {
          // 取消
          this.$refs.tableRef.clearSelection()
        })
    }
  }
}
