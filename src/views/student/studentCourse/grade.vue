<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">我的实验成绩列表</div>
          <div class="contorl_btns">实验总成绩：{{ sumGrade }}</div>
        </div>
        <Etable height="100%" :table-head-config="choosedTableHeadConfig" :table-load-data="choosedTableData" :list-loading="loading" align="left">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
        </Etable>
      </template>
    </base-layout>

  </div>
</template>

<script>
// import { getMyGrade } from '@/api/studentCourseOpt'
import { gradeAllSelect } from '@/api/detail'
import { gradeSelect } from '@/api/detail'
import { mapGetters } from 'vuex'
export default {
  name: 'Grade',
  components: {
  },
  data() {
    return {
      loading: false,
      choosedTableHeadConfig: [
        {
          label: '序号',
          columnType: 'slot',
          slotName: 'index',
          width: 60,
          tooltip: true,
          fixed: 'left'
        },
        {
          label: '实验编号',
          value: 'courseSchedulingId',
          tooltip: true,
          fixed: 'left'
        },
        {
          label: '实验名称',
          value: 'courseName',
          tooltip: true,
          fixed: 'left'
        },
        {
          label: '授课教师',
          value: 'teaName',
          tooltip: true
        },
        {
          label: '课程成绩',
          value: 'courseSchedulingScore',
          tooltip: true
        }
      ],
      choosedTableData: [],
      sumGrade: '--'
    }
  },
  computed: {
    ...mapGetters(['userId', 'userRealId'])
  },
  mounted() {
    this.init()
  },
  created() {
  },
  methods: {
    init() {
      this.getMy()
      this.getSumGrade()
    },
    getSumGrade() {
      const params = { userId: this.userRealId, page: this.currentPage, pageSize: this.pageSize }
      gradeAllSelect(params).then((res) => {
        if (res.code === 200) {
          if (res.data) {
            res.data.records[0].grade ? this.sumGrade = res.data.records[0].grade : this.sumGrade = '--'
          } else {
            this.sumGrade = '--'
          }
        }
      })
    },
    getMy() {
      this.$startLoading('inhert_main')
      gradeSelect({ stuId: this.userRealId, page: 1, pageSize: 20 }).then((res) => {
        this.$closeLoading('inhert_main')
        if (res.code === 200) {
          this.choosedTableData = res.data.records
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
