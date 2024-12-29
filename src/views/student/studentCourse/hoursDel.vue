<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">课时列表</div>
          <div class="contorl_btns" />
        </div>
        <Etable height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData" :list-loading="loading" align="left">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
          <template slot="courseInterval" slot-scope="{ data }">
            <span>{{ data.row.courseStartTime }} - {{ data.row.courseEndTime }}</span>
          </template>
          <template slot="hasBack" slot-scope="{ data }">
            <el-button size="medium" :type="!data.row.hasBack ? 'success' : 'warning'" disabled plain>{{ !data.row.hasBack ? '已选课时' : "已退课时" }}</el-button>
          </template>
          <template slot="operation" slot-scope="{ data }">
            <el-button type="text" :disabled="data.row.delStatus" size="small" style="color: #F74B4B;" @click="withdraw(data.row)"> 退课时 </el-button>
            <el-button type="text" :disabled="data.row.status" size="small" style="color: #2488FF;" @click="turn(data.row)"> 评教 </el-button>
          </template>
        </Etable>
      </template>
      <template slot="footer">
        <pagination-vue :current-page.sync="currentPage" :page-size.sync="pageSize" :total="pageTotal" @getList="taskSelect" />
      </template>
    </base-layout>
  </div>
</template>

<script>
import PaginationVue from '@/components/Pagination/index.vue'
import { getMyAllCourseScheduling, backCourseScheduling } from '@/api/studentCourseOpt'
import { mapGetters } from 'vuex'
export default {
  name: 'HoursDel',
  components: {
    PaginationVue
  },
  data() {
    return {
      loading: false,
      tableHeadConfig: [
        {
          label: '序号',
          columnType: 'slot',
          slotName: 'index',
          width: 60,
          fixed: 'left',
          tooltip: true
        },
        {
          label: '课程名称',
          value: 'courseName',
          fixed: 'left',
          tooltip: true,
          width: 160
        },
        {
          label: '教师姓名',
          value: 'teaName',
          tooltip: true
        },
        {
          label: '课时日期',
          value: 'courseDay',
          tooltip: true
        },
        {
          label: '课时时间',
          columnType: 'slot',
          slotName: 'courseInterval',
          width: 200
        },
        {
          label: '课时地点',
          value: 'courseSite',
          tooltip: true
        },
        {
          label: '课时周次',
          value: 'courseWeek',
          tooltip: true
        },
        {
          label: '课时日说明',
          value: 'courseDayStr',
          tooltip: true
        },
        {
          width: 160,
          label: '操作',
          columnType: 'slot',
          fixed: 'right',
          slotName: 'operation'
        }
      ],
      userRealId: null,
      courseList: [],
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0
    }
  },
  computed: {
    ...mapGetters(['userId', 'userInfo'])
  },
  mounted() {
    this.init()
  },
  created() {
  },
  methods: {
    // 初始化
    init() {
      this.taskSelect()
    },
    isTimeDelOver(row) {
      const time = row.courseDay + ' ' + row.courseStartTime
      const givenDate = new Date(time)
      const currentDate = new Date()
      console.log(givenDate < currentDate)

      return givenDate < currentDate
    },
    isTimeOver(row) {
      const time = row.courseDay + ' ' + row.courseEndTime
      const givenDate = new Date(time)
      const currentDate = new Date()
      return givenDate > currentDate
    },
    taskSelect(type) {
      this.$startLoading('inhert_main')
      type ? (this.currentPage = 1) : null
      const params = { page: this.currentPage, pageSize: this.pageSize }
      getMyAllCourseScheduling(params).then((res) => {
        if (res.code === 200) {
          this.$closeLoading('inhert_main')
          if (res.data) {
            res.data.records.forEach(e => {
              e.delStatus = this.isTimeDelOver(e)
              // e.status = this.isTimeOver(e)
              if (this.isTimeOver(e)) {
                e.status = true
              } else {
                e.evaluateStates ? e.status = true : e.status = false
              }
            })
            this.tableData = res.data.records
            this.pageTotal = +res.data.total
          } else {
            this.tableData = []
            this.pageTotal = 0
          }
        }
      })
    },
    withdraw(row) {
      const courseSchedulingId = row.id
      backCourseScheduling(courseSchedulingId).then((res) => {
        if (res.code === 200) {
          this.$message.success('退课时成功')
          this.taskSelect()
        }
      })
    },
    turn(row) {
      const courseSchedulingId = row.id
      this.$router.push({
        path: '/studentEvaluate/index',
        query: {
          courseSchedulingId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.container{
  ::v-deep .el-col{
      padding-top: 14px;
    }
}
</style>
