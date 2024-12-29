<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">我的本学期课时列表</div>
          <div class="contorl_btns">
            <el-button type="text" @click="showDerive(multipleSelection, 'get', '/teacher/courseSchedulingDownload', '本学期我的全部课时信息.xlsx')">下载</el-button>
          </div>
        </div>
        <Etable height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData" :list-loading="loading" align="left">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
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
import exportFile from '@/plugins/mixins/export'
import { getTeaScheduling } from '@/api/teaCourseOpt'
import { mapGetters } from 'vuex'
export default {
  name: 'TeacherAllCourseIndex',
  components: {
    PaginationVue
  },
  mixins: [
    exportFile
  ],
  data() {
    return {
      loading: false,
      multipleSelection: [],
      tableHeadConfig: [
        {
          label: '序号',
          columnType: 'slot',
          slotName: 'index',
          width: 60,
          tooltip: true
        },
        {
          label: '课时编号',
          value: 'courseId',
          tooltip: true
        },
        {
          label: '课程名称',
          value: 'courseName',
          tooltip: true
        },
        {
          label: '课时日期',
          value: 'courseDay',
          tooltip: true
        },
        {
          label: '上课时间',
          value: 'courseStartTime',
          tooltip: true
        },
        {
          label: '下课时间',
          value: 'courseEndTime',
          tooltip: true
        },
        {
          label: '课时地点',
          value: 'courseSite',
          tooltip: true
        },
        {
          label: '课程周次',
          value: 'courseWeek',
          tooltip: true
        },
        {
          label: '课时容量',
          value: 'courseSchedulingLimit',
          tooltip: true
        },
        {
          label: '课时剩余',
          value: 'courseSchedulingSku',
          tooltip: true
        }
      ],
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0
    }
  },
  computed: {
    ...mapGetters(['userRealId'])
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
    // 任务-条件搜索
    taskSelect(type) {
      this.$startLoading('inhert_main')
      // selectDataByHeaderSearch
      type ? (this.currentPage = 1) : null
      const params = { teaId: this.userRealId, page: this.currentPage, pageSize: this.pageSize }
      getTeaScheduling(params).then((res) => {
        if (res.data === null) this.$closeLoading('inhert_main')
        this.tableData = res.data.records
        this.pageTotal = +res.data.total
        this.$closeLoading('inhert_main')
      })
    }
  }
}
</script>

  <style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  .container{
    // display: flex;
    // flex-direction: column;
    ::v-deep .el-col{
        padding-top: 14px;
      }
  }
  </style>
