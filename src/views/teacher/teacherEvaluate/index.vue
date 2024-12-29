<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">评教指标得分列表</div>
          <div class="contorl_btns"><span>总成绩：{{ sum }}</span></div>
        </div>
        <Etable height="99%" :table-head-config="chooseTableHeadConfig" :table-load-data="chooseTableData" :list-loading="chooseLoading" align="left">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
        </Etable>
      </template>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title" style="color: rgb(36, 136, 255);">学生评价列表</div>
          <div class="contorl_btns" />
        </div>
        <Etable height="100%" :table-head-config="choosedTableHeadConfig" :table-load-data="choosedTableData" :list-loading="choosedLoading" align="left">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
        </Etable>
        <pagination-vue :current-page.sync="currentPage" :page-size.sync="pageSize" :total="pageTotal" @getList="taskSelect" />
      </template>
    </base-layout>

  </div>
</template>

<script>
import PaginationVue from '@/components/Pagination/index.vue'
import { getMyEvaluateScore, getAllEvalate } from '@/api/teacherEvaluate'
import { mapGetters } from 'vuex'
export default {
  name: 'CouseOpt',
  components: {
    PaginationVue
  },
  data() {
    return {
      choosedLoading: false,
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
          label: '课程名称',
          value: 'courseName',
          tooltip: true,
          fixed: 'left'
        },
        {
          label: '课程周次',
          value: 'courseWeek',
          tooltip: true
        },
        {
          label: '课程日期',
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
          label: '课程地点',
          value: 'courseSite',
          tooltip: true
        },
        {
          label: '学生评价',
          value: 'evaluateContext',
          tooltip: true
        }
      ],
      choosedTableData: [],
      sum: 0,
      chooseLoading: false,
      chooseTableHeadConfig: [
        {
          label: '序号',
          columnType: 'slot',
          slotName: 'index',
          width: 60,
          tooltip: true,
          fixed: 'left'
        },
        {
          label: '评价指标',
          value: 'label',
          tooltip: true
        },
        {
          label: '平均得分',
          value: 'score',
          tooltip: true
        }
      ],
      chooseTableData: [{
        label: '教师课前准备充分。',
        score: null
      }, {
        label: '教师尊重学生，并能严格要求学生，既教书又育人。',
        score: null
      }, {
        label: '师讲课有激情，言谈举止文明。',
        score: null
      }, {
        label: '真及时批改实验报告，热情解答学生问题。',
        score: null
      }, {
        label: '师课堂讲解熟练、清晰，重点突出，无照本宣科，易于理解。',
        score: null
      }, {
        label: '教师很好地使用了课堂时间，教学过程安排合理。',
        score: null
      }, {
        label: '师充满自信，课堂组织控制好。',
        score: null
      }, {
        label: '实验原理及操作要领讲解清晰，示范熟练。',
        score: null
      }, {
        label: '导学生正确实验，及时纠正操作错误。',
        score: null
      }, {
        label: '重安全教育，培养学生安全意识。',
        score: null
      }, {
        label: '过课程的学习，我掌握了实验方法和技能。',
        score: null
      }, {
        label: '课程激发了我的实验兴趣，锻炼并提高了我的相关能力。',
        score: null
      }],
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
      this.taskSelectOther()
    },
    taskSelect() {
      getMyEvaluateScore().then((res) => {
        let temp = 0
        this.chooseTableData.forEach((item, index) => {
          item.score = res.data.evaluateList[index]
          temp += res.data.evaluateList[index]
        })
        this.sum = (temp / 12).toFixed(1)
      })
    },
    taskSelectOther() {
      getAllEvalate({ teaId: this.userRealId, page: this.currentPage, pageSize: this.pageSize }).then((res) => {
        if (res.code === 200) {
          if (res.data) {
            this.choosedTableData = res.data.records
            this.pageTotal = +res.data.total
          } else {
            this.choosedTableData = []
            this.pageTotal = 0
          }
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
