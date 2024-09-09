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
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传xlxs文件，且不超过1M</div>
              </el-upload>
              <el-button slot="reference" type="text" style="margin-left: 10px;">导入</el-button>
            </el-popover>
            <el-button v-if="!isGrid" type="text" @click="showDerive(multipleSelection, 'unit_database')">导出</el-button>
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
        </Etable>
        <!-- 卡片列表 -->
        <div v-else class="card_list_container">
          <courseCardList :selected-list="multipleSelection" :list="cardData" @select="handleSelectionChange" @edit="eidtUnit" @detail="lookUnit" />
        </div>
      </template>
      <template slot="footer">
        <pagination-vue :current-page.sync="currentPage" :page-size.sync="pageSize" :total="pageTotal" @getList="taskSelect" />
      </template>
    </base-layout>
  </div>
</template>

<script>
import EmptyCom from '@/components/EmptyCom/index.vue'
import PaginationVue from '@/components/Pagination/index.vue'
import courseCardList from '@/views/unitManagement/components/courseCardList.vue'
import { selectCourseScheduling } from '@/api/courseScheduling'
import { selectCourse } from '@/api/systemSettings/courseOpt'
import { selectUser } from '@/api/systemSettings/userOpt'
import exportFile from '@/plugins/mixins/export'
import { sourceList } from '@/utils/dataOptions'
import { mapGetters } from 'vuex'
export default {
  name: 'UnitManagementIndex',
  components: {
    PaginationVue,
    EmptyCom,
    courseCardList
  },
  mixins: [
    exportFile
  ],
  data() {
    return {
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
          label: '课程名称',
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
  },
  methods: {
    init() {
      this.getCourse()
      this.getTeacher()
      this.taskSelect()
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
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSelectionChange(val) {
      console.log(val)
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
      console.log(row)
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
      console.log(row)
      const { courseId, courseName } = row
      this.$router.push({
        path: '/courseSelection/unitform',
        query: {
          courseId,
          courseName
        }
      })
    },
    click() {}
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
