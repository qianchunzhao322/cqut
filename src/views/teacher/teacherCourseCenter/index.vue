<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="header">
        <div class="contorl_btns">
          <el-button type="primary" plain @click="goBack">返回</el-button>
        </div>
      </template>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">该课时学生列表</div>
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
import { getSchedulingAllStu } from '@/api/teaCourseOpt'

export default {
  name: 'TeacherCourseCenterIndex',
  components: {
    PaginationVue
  },
  mixins: [
  ],
  data() {
    return {
      loading: false,
      tableHeadConfig: [
        {
          label: '序号',
          columnType: 'slot',
          slotName: 'index',
          width: 60,
          tooltip: true
        },
        {
          label: '学号',
          value: 'stuId',
          tooltip: true
        },
        {
          label: '姓名',
          value: 'stuName',
          tooltip: true
        }
      ],
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0
    }
  },
  mounted() {
    this.id = this.$route.query.classId
    this.url = '/courseScheduling/todayClassStudentDownload?courseSchedulingId=' + this.$route.query.classId
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
      type ? (this.currentPage = 1) : null
      const params = { courseSchedulingId: +this.id, page: this.currentPage, pageSize: this.pageSize }
      // delete params.times
      getSchedulingAllStu(params).then((res) => {
        if (res.code === 200) {
          this.$closeLoading('inhert_main')
          this.tableData = res.data.records
          this.pageTotal = +res.data.total
        }
      })
    },
    goBack() {
      this.$router.go(-1)
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
