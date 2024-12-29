<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="header">
        <el-row :gutter="15">
          <el-form ref="elForm" :model="formData" size="medium" label-width="auto" class="demo_ruleForm">
            <el-col :span="6">
              <el-form-item label-width="80px" label="学号" prop="stuId">
                <el-input v-model="formData.stuId" placeholder="请输入学号" clearable :style="{width: '100%'}" @clear="taskSelect('isSelect')" @keydown.enter.native="taskSelect('isSelect')" />
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
          <div class="contorl_title">学生已选课时列表</div>
        </div>
        <Etable height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData" :list-loading="loading" align="left">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
          <template slot="majorMustCourse" slot-scope="{ data }">
            <el-select
              v-model="data.row.majorMustCourse"
              :style="{width: '100%'}"
              :maxlength="20"
              multiple
              disabled
            >
              <el-option
                v-for="item in courseList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
          <template slot="operation" slot-scope="{ data }">
            <el-button type="text" size="small" @click="edit(data.row)"> 编辑 </el-button>
            <el-button type="text" size="small" style="color: #F74B4B;" @click="del(data.row)"> 删除 </el-button>
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
import { selectChoosed } from '@/api/detail'
import { mapGetters } from 'vuex'
export default {
  name: 'ClassDetailIndex',
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
          label: '课时编号',
          value: 'courseSchedulingId',
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
          label: '授课教师',
          value: 'teaName',
          tooltip: true
        }
      ],
      fileList: [],
      courseList: [],
      formData: {
        stuId: null
      },
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 100
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
      this.taskSelect()
    },
    // 任务-条件搜索
    taskSelect(type) {
      this.$startLoading('inhert_main')
      // selectDataByHeaderSearch
      type ? (this.currentPage = 1) : null
      const params = { ...this.formData, page: this.currentPage, pageSize: this.pageSize }
      selectChoosed(params).then((res) => {
        if (res.data === null) this.$closeLoading('inhert_main')
        this.tableData = res.data.records
        this.pageTotal = +res.data.total
        this.$closeLoading('inhert_main')
      })
    },
    // 重置按钮事件
    taskOptionsReset() {
      // $refs['elForm'].resetFields()重置后搜索接口参数有问题不清空
      this.formData.stuId = null
      this.taskSelect()
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
