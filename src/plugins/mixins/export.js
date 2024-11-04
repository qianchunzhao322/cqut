// 导出
import { mapGetters } from 'vuex'
import { download } from '@/api/taskCenter'
export default {
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    // 导出
    showDerive(list, method, url, fileName, role) {
      if (list?.length) {
        this.down('请确定是否导出?', list, method, url, fileName, role)
        console.log(list)
      } else {
        this.down('您未选择任何数据，将下载全部在册数据', list, method, url, fileName, role)
      }
    },
    down(msg, list, method, url, fileName, role) {
      this.$confirm(msg, '下载', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          // 导出
          var data = {}
          if (role === 'ks') {
            var classIdList = []
            list.forEach(el => {
              el.id ? classIdList.push(el.id) : classIdList.push(el)
            })
            classIdList
          }
          if (role === '2' || role === '3') {
            var temp = []
            list.forEach(el => {
              temp.push(el.userId)
            })
            data.userIdList = temp
            data.userRole = role
            list.length ? data : data = { userIdList: [], userRole: role }
          }
          // list.length ? data : data = null
          download(method, url, classIdList || data).then((res) => {
            if (res.code) {
              this.$message.error(res.msg)
            } else {
              const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
              const link = document.createElement('a')
              link.style.display = 'none'
              link.href = URL.createObjectURL(blob)
              link.setAttribute('download', fileName)
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }
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
