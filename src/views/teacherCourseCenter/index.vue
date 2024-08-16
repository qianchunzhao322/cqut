<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="header">
        <el-row :gutter="15">
          <el-form ref="elForm" :model="formData" size="medium" class="demo_ruleForm" label-width="100px">
            <el-col :span="5">
              <el-form-item label-width="95px" label="课程名称" prop="courseName">
                <el-input v-model="formData.courseName" placeholder="请输入课程名称" clearable :style="{width: '100%'}" @clear="taskSelect('isSelect')" @keydown.enter.native="taskSelect('isSelect')" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label-width="95px" label="上课地点" prop="courseSite">
                <el-input v-model="formData.courseSite" placeholder="请输入上课地点" clearable :style="{width: '100%'}" @clear="taskSelect('isSelect')" @keydown.enter.native="taskSelect('isSelect')" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label-width="95px" label="上课日期" prop="courseDay">
                <el-input v-model="formData.courseDay" placeholder="请输入上课日期" clearable :style="{width: '100%'}" @clear="taskSelect('isSelect')" @keydown.enter.native="taskSelect('isSelect')" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label-width="95px" label="课程时间" prop="courseInterval">
                <el-input v-model="formData.courseInterval" placeholder="请输入课程时间" clearable :style="{width: '100%'}" @clear="taskSelect('isSelect')" @keydown.enter.native="taskSelect('isSelect')" />
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="0">
              <div class="search_btns">
                <el-button type="primary" @click="taskSelect('isSelect')">查询</el-button>
                <el-button @click="taskOptionsReset">重置</el-button>
              </div>
            </el-col>
          </el-form>
        </el-row>
      </template>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">选课学生列表</div>
          <div class="contorl_btns">
            <el-button type="text" @click="download">下载</el-button>
          </div>
        </div>
        <Etable selection height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData" :list-loading="loading" align="left" @selectLine="handleSelectionChange">
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
import { selectAlumniType, addAlumniType, editAlumniType, deleteAlumniType } from '@/api/systemSettings/userOpt'
import { mapGetters } from 'vuex'
import { download } from '@/api/taskCenter'
export default {
  name: 'TeacherCourseCenterIndex',
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
          label: '姓名',
          value: 'stuName',
          tooltip: true
        },
        {
          label: '研究方向',
          value: 'stuOrient',
          tooltip: true
        },
        {
          label: '手机号',
          value: 'stuPhone',
          tooltip: true
        }
      ],
      formData: {
        courseName: null,
        courseDay: null,
        courseSite: null,
        createInterval: null
      },
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      multipleSelection: []
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
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 初始化
    init() {
      this.taskSelect1()
    },
    taskSelect1() {
      this.tableData = [{
        stuId: '1520203396',
        stuName: '1',
        stuOrient: '光信息科学与技术',
        stuPhone: '13315796121',
        stuIdCard: '130927200000000001',
        accountModify: 1
      }, {
        stuId: '1520203396',
        stuName: '1',
        stuOrient: '光信息科学与技术',
        stuPhone: '13315796121',
        stuIdCard: '130927200000000001',
        accountModify: 1
      }, {
        stuId: '1520203396',
        stuName: '1',
        stuOrient: '光信息科学与技术',
        stuPhone: '13315796121',
        stuIdCard: '130927200000000001',
        accountModify: 1
      }
      ]
    },
    // 任务-条件搜索
    taskSelect(type) {
      this.$startLoading('inhert_main')
      type ? (this.currentPage = 1) : null
      const params = { ...this.formData, page: this.currentPage, pageSize: this.pageSize, time: null }
      // delete params.times
      selectAlumniType(params).then((res) => {
        this.tableData = res.data
        this.pageTotal = +res.total
        this.$closeLoading('inhert_main')
      })
    },
    // 重置按钮事件
    taskOptionsReset() {
      // $refs['elForm'].resetFields()重置后搜索接口参数有问题不清空
      this.formData.stuName = null
      this.formData.time = null
      this.formData.createDate = null
      this.formData.createDateEnd = null
      this.taskSelect1()
    },
    download() {}
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
