<template>
  <div
    ref="contain"
    class="container"
  >
    <base-layout>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">课程教评</div>
          <div class="contorl_btns">
            <el-button type="text" style="color: rgb(80, 160, 255);" @click="submit()">提交</el-button>
          </div>
        </div>
        <Etable stripe height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData" :list-loading="loading" align="center">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
          <template slot="score" slot-scope="{ data }">
            <el-input-number v-model="data.row.score" :min="0" :max="100" placeholder="请输入得分" clearable />
          </template>
        </Etable>
        <el-input v-model="evaluateDes" type="textarea" maxlength="30" show-word-limit placeholder="请输入此次实验课程整体评价……" clearable />
      </template>
    </base-layout>

  </div>
</template>

<script>
import { addEvaluate } from '@/api/teacherEvaluate'
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
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
          fixed: 'left',
          tooltip: true
        },
        {
          label: '评教指标',
          value: 'label',
          tooltip: true
        },
        {
          label: '得分',
          columnType: 'slot',
          slotName: 'score'
        }
      ],
      evaluateDes: '',
      tableData: [{
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
      }]
    }
  },
  computed: {
    ...mapGetters(['userRealId'])
  },
  mounted() {
    const { courseSchedulingId } = this.$route.query
    this.courseSchedulingId = courseSchedulingId
  },
  created() {
  },
  methods: {
    submit() {
      var data = []
      this.tableData.forEach(e => {
        data.push(e.score)
      })
      const params = { courseSchedulingId: this.courseSchedulingId, evaluateList: data, evaluateDes: this.evaluateDes }
      addEvaluate(params).then((res) => {
        if (res.code === 200) {
          this.$message.success('课程评教成功！')
          this.$router.push({
            path: '/stuCourse/hoursDel'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.container {
  ::v-deep .el-col {
    padding-top: 14px;
  }
}
</style>
