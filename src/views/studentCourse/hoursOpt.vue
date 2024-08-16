<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="header">
        <el-row :gutter="15">
          <el-form ref="elForm" :model="formData" size="medium" class="demo_ruleForm" label-width="100px">
            <el-col :span="6">
              <el-form-item label-width="95px" label="本人课程" prop="stuName">
                <el-select v-model="formData.courseId" placeholder="请选择">
                  <el-option v-for="item in courseOpt" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="0">
              <div class="search_btns">
                <el-button type="primary" @click="taskSelect('isSelect')">筛选</el-button>
                <el-button @click="taskOptionsReset">重置</el-button>
              </div>
            </el-col>
          </el-form>
        </el-row>
      </template>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">课时列表</div>
          <div class="contorl_btns">
          </div>
        </div>

        <Etable  height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData" :list-loading="loading" align="left">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
          <template slot="operation" slot-scope="{ data }">
            <el-button type="text" size="small" style="color: #F74B4B;" @click="del(data.row)"> 退课时 </el-button>
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
export default {
  name: 'HoursOpt',
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
          value: 'courseTeacherName',
          tooltip: true
        },
        {
          label: '课程地点',
          value: 'courseSite',
          tooltip: true
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
          label: '课程时间',
          value: 'courseInterval',
          tooltip: true,
          width: 160
        },
        {
          label: '课时要求',
          value: 'courseHours',
          tooltip: true
        },
        {
          label: '课程日说明',
          value: 'courseDayStr',
          tooltip: true
        },
        {
          label: '课程周说明',
          value: 'courseWeekStr',
          tooltip: true
        },
        {
          width: 80,
          label: '操作',
          columnType: 'slot',
          fixed: 'right',
          slotName: 'operation'
        }
      ],
      courseOpt: [{
        label: '光信息1',
        value: '1243421'
      },{
        label: '光信息2',
        value: '124341'
      }],
      formData: {
        courseId: null,
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0,
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
    // 初始化
    init() {
      this.taskSelect1()
    },
    taskSelect1() {
      this.tableData = [{
        courseName: '光信息科学与技术',
        courseTeacherName: '张三',
        courseWeek: '3',
        courseDay: '2024/7/7',
        courseInterval: '18:33:33-19:33:33',
        courseDayStr: '星期四',
        courseWeekStr: '',
        courseHours: '6',
        courseSite: '文山楼302',
      },{
        courseName: '光信息科学与技术',
        courseTeacherName: '张三',
        courseWeek: '3',
        courseDay: '2024/7/7',
        courseInterval: '18:33:33-19:33:33',
        courseDayStr: '星期四',
        courseWeekStr: '',
        courseHours: '6',
        courseSite: '文山楼302',
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
      this.formData.courseId = null
      this.taskSelect1()
    },
    // 表格-删除
    del(row) {
      this.deleteTemp = row
      this.$confirm('请确认是否退选该课时？', '退课时', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const { id } = row
        // 删除
        this.deleteAlumni(id)
      }).catch(() => {
        // 取消
      })
    },
    // deleteAlumni
    deleteAlumni(id) {
      deleteAlumniType({ id }).then((res) => {
        if (res.result) {
          this.$message.success('退课时成功')
          this.taskSelect()
        }
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
