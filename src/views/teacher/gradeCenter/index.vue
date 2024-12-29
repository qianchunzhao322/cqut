<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="header">
        <el-row :gutter="15">
          <el-form ref="elForm" :model="formData" size="medium" label-width="auto" class="demo_ruleForm">
            <el-col :span="6">
              <el-form-item label-width="110px" label="学号" prop="userId">
                <el-input v-model="formData.userId" placeholder="请输入学号" clearable :style="{width: '100%'}" @clear="taskSelect('isSelect')" @keydown.enter.native="taskSelect('isSelect')" />
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <div class="search_btns">
                <el-button type="primary" @click="taskSelect('isSelect')">搜索</el-button>
                <el-button @click="taskOptionsReset">重置</el-button>
              </div>
            </el-col>
          </el-form>
        </el-row>
      </template>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">学生成绩列表</div>
        </div>
        <Etable height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData" :list-loading="loading" align="left">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
          <template slot="courseschedulingScore" slot-scope="{ data }">
            <el-input-number v-if="data.row.teaId === userRealId" v-model="data.row.courseSchedulingScore" :min="0" :max="100" size="mini" @change="edit(data.row)" />
            <span v-else>{{ data.row.courseSchedulingScore }}</span>
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
import { addGrade } from '@/api/teaCourseOpt'
import { gradeSelect } from '@/api/detail'
import { mapGetters } from 'vuex'
export default {
  name: 'GradeCenterIndex',
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
          tooltip: true
        },
        {
          label: '学号',
          value: 'stuId',
          tooltip: true
        },
        {
          label: '学生姓名',
          value: 'stuName',
          tooltip: true
        },
        {
          label: '实验名称',
          value: 'courseName',
          tooltip: true
        },
        {
          label: '课程成绩',
          columnType: 'slot',
          slotName: 'courseschedulingScore',
          tooltip: true
        }
      ],
      fileList: [],
      courseList: [],
      formData: {
        userId: null
      },
      type: 1,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0
    }
  },
  computed: {
    ...mapGetters(['userRealId'])
  },
  watch: {
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
      type ? (this.currentPage = 1) : null
      const params = { stuId: this.formData.userId, page: this.currentPage, pageSize: this.pageSize }
      gradeSelect(params).then((res) => {
        this.$closeLoading('inhert_main')
        if (res.data) {
          this.tableData = res.data.records
          this.pageTotal = +res.data.total
        } else {
          this.tableData = []
          this.pageTotal = 0
        }
      })
    },
    // 重置按钮事件
    taskOptionsReset() {
      // $refs['elForm'].resetFields()重置后搜索接口参数有问题不清空
      this.formData.userId = null
      this.formData.type = 2
      this.taskSelect()
    },
    edit(row) {
      console.log(row)
      var params = []
      var temp = {
        courseSchedulingId: row.courseSchedulingId,
        courseSchedulingScore: +row.courseSchedulingScore,
        stuId: row.stuId
      }
      params.push(temp)
      addGrade(params).then((res) => {
        if (res.code === 200) {
          this.$message.success('提交成功')
          this.taskSelect()
        }
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
