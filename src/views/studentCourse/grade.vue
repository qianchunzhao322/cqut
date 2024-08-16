<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">课程成绩列表</div>
          <div class="contorl_btns">
          </div>
        </div>
        <Etable height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData" :list-loading="loading" align="left">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
        </Etable>
      </template>
    </base-layout>

  </div>
</template>

<script>
import { selectIndustryType, addIndustryType, editIndustryType, deleteIndustryType } from '@/api/systemSettings/courseOpt'
import { mapGetters } from 'vuex'
export default {
  name: 'Grade',
  components: {
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
          tooltip: true
        },
        {
          label: '课程编号',
          value: 'courseId',
          tooltip: true
        },
        {
          label: '课程名称',
          value: 'courseName',
          tooltip: true
        },
        {
          label: '课程介绍',
          value: 'courseStr',
          tooltip: true
        },
        {
          label: '课程成绩',
          value: 'courseGrade',
          tooltip: true
        },
        
      ],
      tableData: [],
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    this.init()
  },
  created() {
  },
  methods: {
    init() {
      this.taskSelect1()
    },
    taskSelect1() {
      this.tableData = [{
        courseId: '123524',
        courseName: '光信息科学与技术',
        courseGrade: '100',
        courseStr: '阿道夫了法律上地方案例的房间啊',
      }]
    },
    // 任务-条件搜索
    taskSelect(type) {
      this.$startLoading('inhert_main')
      // selectDataByHeaderSearch
      type ? (this.currentPage = 1) : null
      const params = { ...this.formData, page: this.currentPage, pageSize: this.pageSize, time: null }
      selectIndustryType(params).then((res) => {
        this.tableData = res.data
        this.pageTotal = +res.total
        this.$closeLoading('inhert_main')
      })
    },
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
