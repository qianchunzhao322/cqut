<template>
  <div class="container">
    <base-layout>
      <template slot="header">
        <el-form ref="params" :model="params" label-width="7em" class="demo_ruleForm">
          <el-row>
            <el-col :span="5">
              <el-form-item label="课程名称" prop="courseId">
                <el-select
                  v-model="params.courseId"
                  clearable
                  class="w-100"
                  placeholder="请选择课程名称"
                >
                  <el-option
                    v-for="item in courseList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="授课教师" prop="teaId">
                <el-select
                  v-model="params.teaId"
                  clearable
                  class="w-100"
                  placeholder="请选择授课教师"
                >
                  <el-option
                    v-for="item in teaList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="上课日期" prop="time">
                <el-date-picker
                  v-model="params.time"
                  clearable
                  class="w-100"
                  type="daterange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <div class="search_btns">
                <el-button type="primary" @click="taskSelect(1)">搜索</el-button>
                <el-button @click="resetForm('params')">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">{{ !isGrid?'课时列表':'课程卡片' }} <i class="iconfont" :class="!isGrid ? 'icon-liebiao' : 'icon-kapian'" @click="isGrid = !isGrid" /> </div>
          <div class="contorl_btns">
            <el-popover v-if="!isGrid" placement="top-end" width="400" trigger="click">
              <el-upload
                ref="upload"
                class="upload-demo"
                action="#"
                :limit="1"
                accept=".xlsx, .xls"
                :before-upload="beforeUpload"
                :on-change="fileChange"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <el-button style="margin-left: 10px;" size="small" type="warning"><a :href="'./excel/课时信息上传模板.xlsx'" download="课时信息上传模板.xlsx">下载模板</a></el-button>
                <div slot="tip" class="el-upload__tip">只能上传xlxs文件，且不超过2M</div>
              </el-upload>
              <el-button slot="reference" type="text" style="margin-left: 10px;">导入</el-button>
            </el-popover>
            <el-button v-if="!isGrid" type="text" @click="showDerive(multipleSelection, 'post','/courseScheduling/courseSchedulingDownload', '课时信息.xlsx', 'ks')">下载</el-button>
          </div>
        </div>
        <!-- 表格列表 -->
        <Etable
          v-if="!isGrid"
          ref="tableRef"
          height="100%"
          :selection="true"
          :table-head-config="tableHeadConfig"
          :table-load-data="tableData"
          :list-loading="loading"
          align="left"
          @selectLine="handleSelectionChange"
        >
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
          <template slot="courseStatus" slot-scope="{ data }">
            <el-button size="medium" :type="data.row.courseStatus ? 'success' : 'warning'" plain>{{ data.row.courseStatus ? '开放选课' : "禁止选课" }}</el-button>
          </template>
          <template slot="courseInterval" slot-scope="{ data }">
            <span>{{ data.row.courseStartTime }} - {{ data.row.courseEndTime }}</span>
          </template>
          <template slot="operation" slot-scope="{ data }">
            <el-button type="text" size="small" style="color: #F74B4B;" @click="open(data.row)"> 塞人 </el-button>
          </template>
        </Etable>
        <!-- 卡片列表 -->
        <div v-else class="card_list_container">
          <courseCardList :selected-list="multipleSelection" :list="cardData" @select="handleSelectionChange" @edit="eidtUnit" @detail="lookUnit" />
        </div>
      </template>
      <template slot="footer">
        <pagination-vue v-if="!isGrid" :current-page.sync="currentPage" :page-size.sync="pageSize" :total="pageTotal" @getList="taskSelect" />
      </template>
    </base-layout>
    <el-dialog title="塞人" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="form.stuId" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="pushPeople">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PaginationVue from '@/components/Pagination/index.vue'
import courseCardList from '@/views/administrators/courseSelection/components/courseCardList.vue'
import { selectCourseScheduling, forceTakeCourseScheduling } from '@/api/courseScheduling'
import { selectCourse } from '@/api/systemSettings/courseOpt'
import { selectUser } from '@/api/systemSettings/userOpt'
import exportFile from '@/plugins/mixins/export'
import { upload } from '@/api/taskCenter'
import { sourceList } from '@/utils/dataOptions'
import { mapGetters } from 'vuex'
export default {
  name: 'UnitManagementIndex',
  components: {
    PaginationVue,
    courseCardList
  },
  mixins: [
    exportFile
  ],
  data() {
    return {
      dialogFormVisible: false,
      form: {
        stuId: ''
      },
      formLabelWidth: '60px',
      checkAll: false,
      isIndeterminate: false,
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      isGrid: true,
      multipleSelection: [],
      sourceList,
      teaList: [],
      courseList: [],
      loading: false,
      dialogVisible: false,
      tableHeadConfig: [
        {
          label: '序号',
          columnType: 'slot',
          slotName: 'index',
          width: 60,
          tooltip: true,
          fixed: 'left'
        },
        {
          label: '课程编号',
          value: 'courseId',
          tooltip: true,
          width: 200,
          fixed: 'left'
        },
        {
          label: '实验名称',
          value: 'courseName',
          tooltip: true,
          width: 200,
          fixed: 'left'
        },
        {
          label: '授课教师职工号',
          value: 'teaId',
          tooltip: true,
          width: 200
        },
        {
          label: '授课教师姓名',
          value: 'teaName',
          tooltip: true,
          width: 200
        },
        {
          label: '课时日期',
          value: 'courseDay',
          tooltip: true,
          width: 200
        },
        {
          label: '课时周次',
          value: 'courseWeek',
          tooltip: true,
          width: 200
        },
        {
          label: '课时人数限制',
          value: 'courseLimit',
          tooltip: true,
          width: 200
        },
        {
          label: '实验课时剩余容量',
          value: 'courseSchedulingSku',
          tooltip: true,
          width: 200
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
          tooltip: true,
          width: 200
        },
        {
          label: '课时日说明',
          value: 'courseDayStr',
          tooltip: true,
          width: 200
        },
        {
          width: 100,
          label: '操作',
          columnType: 'slot',
          fixed: 'right',
          slotName: 'operation'
        }
      ],
      cardData: [],
      params: {
        courseId: null,
        teaId: null,
        time: null,
        courseStartTimeSt: null,
        courseStartTimeEd: null
      },
      paramsException: ['place', 'time'],
      fileList: []
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  watch: {
    'params.time'(val) {
      console.log(val)

      if (val) {
        this.params.courseStartTimeSt = val[0] + ' 00:00:00'
        this.params.courseStartTimeEd = val[1] + ' 23:59:59'
      } else {
        this.params.courseStartTimeSt = null
        this.params.courseStartTimeEd = null
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    this.taskSelect()
    this.getCourse()
  },
  methods: {
    init() {
      this.getTeacher()
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      this.fileList = []
      this.fileList.push(file.raw)
    },
    submitUpload() {
      if (this.fileList.length === 0) {
        this.$message.warning('请上传文件')
      } else {
        const form = new FormData()
        form.append('file', this.fileList[0])
        upload('/courseScheduling/courseSchedulingUpload', form).then(res => {
          if (res.code === 200) {
            this.$message.success('全部课时上传成功')
            this.taskSelect()
          } else if (res.code === 409) {
            this.$message.warning('上传课时存在冲突，请自行检查后上传！！')
            this.fileList = []
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUpload(file) {
      const size = file.size / 1024 / 1024
      if (size > 2) {
        this.$message.warning('文件大小不得超过2M')
      }
    },
    handleRemove(file, fileList) {
      this.fileList = []
    },
    getTeacher() {
      const params = { permissionCode: 2, page: 1, pageSize: 100 }
      selectUser(params).then((res) => {
        res.data.records.forEach(e => {
          var temp = {
            value: e.userId,
            label: e.realName
          }
          this.teaList.push(temp)
        })
      })
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
      // this.$startLoading('inhert_main')
      if (type) {
        this.isGrid ? (this.isGrid = false) : this.isGrid
      }
      this.loading = true
      // selectDataByHeaderSearch
      // type ? (this.currentPage = 1) : null
      const data = { ...this.params, page: this.currentPage, pageSize: this.pageSize, time: null }
      delete data.time
      // delete data.teaId
      selectCourseScheduling(data).then((res) => {
        this.tableData = res.data.records
        this.pageTotal = +res.data.total
        // this.$closeLoading('inhert_main')
        this.loading = false
      })
    },
    handlePreview(file) {
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    resetForm(formName) {
      this.params.courseId = null
      this.params.teaId = null
      this.params.courseStartTimeSt = null
      this.params.courseStartTimeEd = null
      this.$refs[formName].resetFields()
      this.taskSelect()
    },
    lookUnit(row) {
      const { courseId, courseName, courseLimit, courseHours } = row
      this.$router.push({
        path: '/courseSelection/detail',
        query: {
          courseId,
          courseName,
          courseLimit,
          courseHours
        }
      })
    },
    eidtUnit(row) {
      const { courseId, courseName } = row
      this.$router.push({
        path: '/courseSelection/unitform',
        query: {
          courseId,
          courseName
        }
      })
    },
    open(row) {
      this.dialogFormVisible = true
      this.temp = row.id
    },
    pushPeople(row) {
      const data = { courseSchedulingId: this.temp, ...this.form }
      forceTakeCourseScheduling(data).then((res) => {
        if (res.code === 400) this.$message.error(res.msg)
        if (res.code === 200) this.$message.success('塞人成功')
        this.dialogFormVisible = false
        this.taskSelect()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.demo_ruleForm {
	.search_btns {
		display: flex;
		justify-content: flex-end;
	}
}
</style>
