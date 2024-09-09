<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="header">
        <el-row :gutter="15">
          <el-form ref="elForm" class="demo_ruleForm" :model="formData" size="medium" label-width="100px">
            <el-col :span="5">
              <el-form-item label-width="95px" label="课程名称" prop="courseName">
                <el-input v-model="formData.courseName" placeholder="请输入课程名称" clearable :style="{width: '100%'}" @clear="taskSelect('isSelect')" @keydown.enter.native="taskSelect('isSelect')" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
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
            <el-col :span="13">
              <div label-width="0">
                <el-form-item class="search_btns">
                  <div class="search_btns">
                    <el-button type="primary" size="medium" @click="taskSelect('isSelect')"> 查询 </el-button>
                    <el-button @click="taskOptionsReset"> 重置 </el-button>
                  </div>
                </el-form-item>
              </div>
            </el-col>
          </el-form>
        </el-row>
      </template>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">课程列表</div>
          <div class="contorl_btns">
            <el-button type="text" style="color: rgb(80, 160, 255);" @click="add">添加</el-button>
            <el-button type="text" @click="download">下载</el-button>
            <el-popover placement="top-end" width="400" trigger="click">
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
          </div>
        </div>
        <Etable selection height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData" :list-loading="loading" align="left" @selectLine="handleSelectionChange">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
          <template slot="courseStatus" slot-scope="{ data }">
            <el-switch
              v-model="data.row.courseStatus"
              active-text="开放"
              inactive-text="禁止"
              @change="turnStatus(data.row)"
            />
          </template>
          <template slot="courseTarget" slot-scope="{ data }">
            <el-select
              v-model="data.row.courseTarget"
              :style="{width: '100%'}"
              :maxlength="20"
              multiple
              disabled
            >
              <el-option
                v-for="item in majorList"
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
    <!-- 新增对话框 -->
    <el-dialog :title="title" :visible.sync="addDialogFormVisible" width="30%" @closed="closeDialog('newFormRef')">
      <el-row :gutter="15">
        <el-form ref="newFormRef" :rules="rules" :model="addForm">
          <el-col :span="22">
            <el-form-item label="课程编号：" prop="courseId" label-width="95px">
              <el-input v-model="addForm.courseId" placeholder="请输入课程编号" :maxlength="20" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="课程名称：" prop="courseName" label-width="95px">
              <el-input v-model="addForm.courseName" placeholder="请输入课程名称" :maxlength="20" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="课时要求：" prop="courseHours" label-width="95px">
              <el-input v-model="addForm.courseHours" placeholder="请输入课程课时" :maxlength="20" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="选课上限：" prop="courseLimit" label-width="95px">
              <el-input v-model="addForm.courseLimit" placeholder="请输入选课人数上限" :maxlength="20" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="面向专业：" prop="courseTarget" label-width="95px">
              <el-select
                v-model="addForm.courseTarget"
                clearable
                :style="{width: '100%'}"
                :maxlength="20"
                multiple
                placeholder="请选择课程面向专业"
              >
                <el-option
                  v-for="item in majorList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="课程介绍：" prop="courseStr" label-width="95px">
              <el-input v-model="addForm.courseStr" placeholder="请输入课程介绍" :maxlength="20" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addIndustryType">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import PaginationVue from '@/components/Pagination/index.vue'
import { selectMajor } from '@/api/systemSettings/majorOpt'
import { selectCourse, addCourse, editCourse, deleteCourse, turnCourseStatus } from '@/api/systemSettings/courseOpt'
import { mapGetters } from 'vuex'
export default {
  name: 'CouseOpt',
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
          label: '课程编号',
          value: 'courseId',
          tooltip: true
        },
        {
          label: '课程名称',
          value: 'courseName',
          tooltip: true
        },
        {
          label: '课程人数限制',
          value: 'courseLimit',
          tooltip: true
        },
        {
          label: '课时要求',
          value: 'courseHours',
          tooltip: true
        },
        {
          label: '课程介绍',
          value: 'courseStr',
          tooltip: true
        },
        {
          label: '面向专业',
          value: 'courseTarget',
          // tooltip: true
          columnType: 'slot',
          slotName: 'courseTarget'
        },
        {
          label: '开放选课状态',
          columnType: 'slot',
          slotName: 'courseStatus',
          width: 200
        },
        {
          width: 150,
          label: '操作',
          columnType: 'slot',
          slotName: 'operation'
        }
      ],
      formData: {
        courseName: null,
        time: null,
        createStartTime: null,
        createEndTime: null
      },
      rules: {
        courseId: [
          { required: true, message: '请输入课程编号', trigger: 'change' }
        ],
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'change' }
        ],
        courseHours: [
          { required: true, message: '请输入总课时要求', trigger: 'change' }
        ],
        courseLimit: [
          { required: true, message: '请输入选课人数上限', trigger: 'change' }
        ],
        courseStr: [
          { message: '请输入课程介绍', trigger: 'change' }
        ],
        courseTarget: [
          { required: true, message: '请选择面向专业', trigger: 'change' }
        ]
      },
      majorList: [],
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      editDialogFormVisible: false,
      addDialogFormVisible: false,
      addForm: {
        courseId: '',
        courseName: '',
        courseHours: '',
        courseLimit: '',
        courseTarget: [],
        courseStr: ''
      },
      title: '',
      fileList: null,
      multipleSelection: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  watch: {
    'formData.time'(val) {
      if (val) {
        this.formData.createStartTime = val[0] + ' 00:00:00'
        this.formData.createEndTime = val[1] + ' 23:59:59'
      } else {
        this.formData.createStartTime = null
        this.formData.createEndTime = null
      }
    }
  },
  mounted() {
    this.init()
  },
  created() {
  },
  methods: {
    add() {
      this.addForm = {
        courseId: '',
        courseName: '',
        courseHours: '',
        courseLimit: '',
        courseTarget: [],
        courseStr: '',
        courseStatus: null
      }
      this.title = '添加课程'
      this.addDialogFormVisible = true
      this.closeDialog('newFormRef')
    },
    closeDialog(name) {
      this.$refs[name].resetFields()
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
    // 初始化
    init() {
      this.getMajor()
      this.taskSelect()
    },
    getMajor() {
      const params = { page: 1, pageSize: 100 }
      selectMajor(params).then((res) => {
        res.data.records.forEach(e => {
          var temp = {
            value: e.majorId,
            label: e.majorName
          }
          this.majorList.push(temp)
        })
        this.$closeLoading('inhert_main')
      })
    },
    // 任务-条件搜索
    taskSelect(type) {
      this.$startLoading('inhert_main')
      // selectDataByHeaderSearch
      type ? (this.currentPage = 1) : null
      const params = { ...this.formData, page: this.currentPage, pageSize: this.pageSize, time: null }
      delete params.time
      selectCourse(params).then((res) => {
        this.tableData = res.data.records
        this.pageTotal = +res.data.total
        this.$closeLoading('inhert_main')
      })
    },
    // 重置按钮事件
    taskOptionsReset() {
      // $refs['elForm'].resetFields()重置后搜索接口参数有问题不清空
      this.formData.courseName = null
      this.formData.time = null
      this.formData.createStartTime = null
      this.formData.createEndTime = null
      this.taskSelect()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    turnStatus(data) {
      turnCourseStatus(data.id, data.courseStatus).then((res) => {
        if (res.code === 200) {
          this.$message.success('课程待选状态修改成功')
          this.taskSelect()
        }
      })
    },
    // addAlumni
    addIndustryType() {
      this.$refs.newFormRef.validate((valid) => {
        if (valid) {
          let method
          let message
          if (this.addForm.id) {
            method = editCourse
            message = '修改成功'
          } else {
            method = addCourse
            message = '添加成功'
          }
          method({ ...this.addForm }).then((res) => {
            if (res.data === 'Please close the course optional, then update the course') {
              this.$message.warning('已发布的课程禁止修改信息')
            }
            if (res.code === 200) {
              this.addDialogFormVisible = false
              this.$message.success(message)
              this.taskSelect()
            }
          })
        }
      })
    },
    // 表格-编辑
    edit(row) {
      console.log(row)
      this.addForm = {
        ...row
      }
      this.title = '修改课程信息'
      this.addDialogFormVisible = true
    },
    // 表格-删除
    del(row) {
      this.deleteTemp = row
      this.$confirm('请确认是否删除？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const { id } = row
        // 删除
        this.deleteIndustryType(id)
      }).catch(() => {
        // 取消
      })
    },
    // deleteAlumni
    deleteIndustryType(id) {
      deleteCourse(id).then((res) => {
        if (res.code === 200) {
          this.$message.success('删除成功')
          this.taskSelect()
        }
      })
    },
    download() {},
    upload() {}
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
