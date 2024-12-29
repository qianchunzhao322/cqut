<template>
  <!-- 录入成绩 -->
  <base-layout header-height="0">
    <template slot="main">
      <div class="content_container whole_container">
        <div id="whole_container">
          <!-- aside 课程 -->
          <div class="aside_container">
            <base-layout foor-height="0">
              <template slot="header">
                <el-row :gutter="15">
                  <el-form ref="elForm" :model="formData" size="medium" label-width="auto" class="demo_ruleForm">
                    <el-col :span="7">
                      <el-form-item label="添加时间" prop="time">
                        <el-date-picker
                          v-model="formData.time"
                          type="daterange"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          :style="{width: '100%'}"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          range-separator="-"
                          clearable
                        />
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
                  <div class="contorl_title">实验课时列表</div>
                </div>
                <Etable height="100%" :table-head-config="leftTableHeadConfig" :table-load-data="leftTableData" :list-loading="leftLoading" align="center">
                  <template slot="index" slot-scope="{ data }">
                    <span>{{ data.$index + 1 }}</span>
                  </template>
                  <template slot="operation" slot-scope="{ data }">
                    <el-button type="text" :disabled="data.row.status" size="small" style="color: #00DF16;" @click="open(data.row)"> 录入成绩 </el-button>
                  </template>
                </Etable>

              </template>
              <template slot="footer">
                <pagination-vue :current-page.sync="currentPage" :page-size.sync="pageSize" :total="pageTotal" @getList="taskSelect" />
              </template>
            </base-layout>
          </div>
          <!-- right 成绩 -->
          <div class="el-main">
            <base-layout footer-height="0">
              <template slot="main">
                <div class="contorl_container">
                  <div class="contorl_title">{{ scoreTableData.length>0? '课程：'+title : '学生成绩列表' }}</div>
                  <div class="contorl_btns">
                    <el-button type="primary" plain @click="upload"> 提交成绩 </el-button>
                  </div>
                </div>
                <Etable height="100%" :table-head-config="tableHeadConfig" :table-load-data="scoreTableData" :list-loading="scoreLoading" align="left">
                  <template slot="courseSchedulingScore" slot-scope="{ data }">
                    <el-input-number v-model="data.row.courseSchedulingScore" :min="0" :max="100" size="mini" />
                  </template>
                </Etable>
              </template>
            </base-layout>
          </div>
        </div>
      </div>
    </template>
  </base-layout>
</template>

<script>
// components
// api
import PaginationVue from '@/components/Pagination/index.vue'
import { addGrade, getTeaScheduling, getSchedulingStu } from '@/api/teaCourseOpt'
import { mapGetters } from 'vuex'
export default {
  name: 'TeacherGradeIndex',
  components: {
    PaginationVue
  },
  data() {
    return {
      leftLoading: false,
      scoreLoading: false,
      tableHeadConfig: [
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
          label: '课程成绩',
          columnType: 'slot',
          slotName: 'courseSchedulingScore',
          tooltip: true
        }
      ],
      leftTableHeadConfig: [
        {
          label: '序号',
          columnType: 'slot',
          slotName: 'index',
          width: 60,
          tooltip: true
        },
        {
          label: '课时编号',
          value: 'courseId',
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
          label: '课程周次',
          value: 'courseWeek',
          tooltip: true
        },
        {
          label: '课时容量',
          value: 'courseSchedulingLimit',
          tooltip: true
        },
        {
          label: '课时剩余',
          value: 'courseSchedulingSku',
          tooltip: true
        },
        {
          width: 100,
          label: '操作',
          columnType: 'slot',
          fixed: 'right',
          slotName: 'operation'
        }
      ],
      formData: {
        time: null,
        courseStartTimeSt: null,
        courseStartTimeEd: null
      },
      title: '',
      schedulingId: null,
      scoreTableData: [],
      leftTableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0
    }
  },
  computed: {
    ...mapGetters(['userRealId'])
  },
  watch: {
    'formData.time'(val) {
      if (val) {
        this.formData.courseStartTimeSt = val[0] + ' 00:00:00'
        this.formData.courseStartTimeEd = val[1] + ' 23:59:59'
      } else {
        this.formData.courseStartTimeSt = null
        this.formData.courseStartTimeEd = null
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(val) {
      this.taskSelect()
    },
    isTimeOver(row) {
      const time = row.courseDay + ' ' + row.courseEndTime
      const givenDate = new Date(time)
      const currentDate = new Date()
      return givenDate > currentDate
    },
    taskSelect(type) {
      this.$startLoading('inhert_main')
      type ? (this.currentPage = 1) : null
      const params = { teaId: this.userRealId, ...this.formData, page: this.currentPage, pageSize: this.pageSize }
      delete params.time
      getTeaScheduling(params).then((res) => {
        if (res.code === 200) {
          this.$closeLoading('inhert_main')
          if (res.data) {
            res.data.records.forEach(e => {
              // e.status = this.isTimeOver(e)
              if (this.isTimeOver(e)) {
                e.status = true
              } else {
                e.hasCompleteGrade ? e.status = true : e.status = false
              }
            })
            this.leftTableData = res.data.records
            this.pageTotal = +res.data.total
          } else {
            this.leftTableData = []
            this.pageTotal = 0
          }
        }
      })
    },
    taskOptionsReset() {
      // $refs['elForm'].resetFields()重置后搜索接口参数有问题不清空
      this.formData.time = null
      this.formData.courseStartTimeSt = null
      this.formData.courseStartTimeEd = null
      this.taskSelect()
    },
    open(row) {
      this.title = row.courseName
      this.schedulingId = row.id
      getSchedulingStu({ courseSchedulingId: row.id, page: 1, pageSize: 100 }).then((res) => {
        if (res.code === 200) {
          var temp = res.data.records
          temp.forEach(item => {
            item.courseSchedulingScore = null
          })
          this.scoreTableData = temp
        }
      })
    },
    upload() {
      this.edit(this.scoreTableData)
    },
    edit(row) {
      // row = [row]
      console.log(row)

      var params = []
      row.forEach(item => {
        var temp = {
          courseSchedulingId: this.schedulingId,
          courseSchedulingScore: +item.courseSchedulingScore,
          stuId: item.stuId
        }
        console.log(temp)

        params.push(temp)
      })
      addGrade(params).then((res) => {
        if (res.code === 200) {
          this.$message.success('提交成功')
          this.taskSelect()
          this.scoreTableData = []
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content_container {
  height: 100%;
  background: #fcfdfe;
  border-radius: 4px;

  #whole_container {
    display: flex;
    height: 100%;
    // padding: 24px 0;

    .aside_container {
      width: 56vw;
      min-width: 18vw;
      border: 1px solid #ecf0f8;
      border-radius: 4px;
      padding: 0px;
    }

    .el-main {
      display: flex;
      flex-direction: column;
      padding: 0;
      overflow-y: auto !important;
      scrollbar-gutter: stable; // 滚动条窗口抖动
    }
  }
}
</style>
