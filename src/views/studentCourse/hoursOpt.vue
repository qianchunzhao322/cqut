<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="header">
        <el-row :gutter="15">
          <el-form ref="elForm" :model="formData" size="medium" class="demo_ruleForm" label-width="100px">
            <el-col :span="6">
              <el-form-item label-width="95px" label="本人课程：" prop="courseId">
                <el-select v-model="formData.courseId" placeholder="请选择">
                  <el-option v-for="item in courseList" :key="item.value" :label="item.label" :value="item.value" />
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
            <el-button type="text" :disabled="data.row.hasBack" size="small" style="color: #F74B4B;" @click="del(data.row)"> 退课时 </el-button>
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
import { getMyCourseScheduling, backCourseScheduling } from '@/api/studentCourseOpt'
import { selectCourse } from '@/api/systemSettings/courseOpt'
import { getInfo } from '@/api/user'
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
          label: '课时状态',
          columnType: 'slot',
          slotName: 'hasBack',
          fixed: 'right'
        },
        {
          width: 80,
          label: '操作',
          columnType: 'slot',
          fixed: 'right',
          slotName: 'operation'
        }
      ],
      formData: {
        courseId: null
      },
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
      this.getCourse()
      this.taskSelect()
    },
    getCourse() {
      selectCourse({ page: 1, pageSize: 100 }).then((res) => {
        res.data.records.forEach(e => {
          var temp = {
            value: e.courseId,
            label: e.courseName
          }
          this.courseList.push(temp)
        })
        this.cardData = res.data.records
      })
    },
    taskSelect(type) {
      this.$startLoading('inhert_main')
      type ? (this.currentPage = 1) : null
      getInfo(this.userInfo.id).then((res) => {
        this.userRealId = res.data.userId
        const params = { ...this.formData, stuId: this.userRealId, page: this.currentPage, pageSize: this.pageSize }
        getMyCourseScheduling(params).then((res) => {
          this.tableData = res.data.records
          this.pageTotal = +res.data.total
          this.$closeLoading('inhert_main')
        })
      })
    },
    taskOptionsReset() {
      // $refs['elForm'].resetFields()重置后搜索接口参数有问题不清空
      this.formData.courseId = null
      this.taskSelect()
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
      backCourseScheduling(this.userRealId, id).then((res) => {
        if (res.code === 200) {
          this.$message.success('退课时成功')
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
  ::v-deep .el-col{
      padding-top: 14px;
    }
}
</style>
