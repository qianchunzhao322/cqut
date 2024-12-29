<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="header">
        <el-row :gutter="15">
          <el-form ref="elForm" :model="formData" size="medium" label-width="auto" class="demo_ruleForm">
            <el-col :span="6">
              <el-form-item label-width="110px" label="专业名称" prop="majorName">
                <el-input v-model="formData.majorName" placeholder="请输入专业名称" clearable :style="{width: '100%'}" @clear="taskSelect('isSelect')" @keydown.enter.native="taskSelect('isSelect')" />
              </el-form-item>
            </el-col>
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
            <el-col :span="11">
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
          <div class="contorl_title">在册专业列表</div>
          <div class="contorl_btns">
            <el-button type="text" @click="add">添加</el-button>
            <el-popover placement="top-end" width="400" trigger="click">
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
                <el-button style="margin-left: 10px;" size="small" type="warning"><a :href="'./excel/专业信息上传模板.xlsx'" download="专业信息上传模板.xlsx">下载模板</a></el-button>
                <div slot="tip" class="el-upload__tip">只能上传xlxs文件，且不超过2M</div>
              </el-upload>
              <el-button slot="reference" type="text" style="margin-left: 10px;">导入</el-button>
            </el-popover>
          </div>
        </div>
        <Etable height="98%" :table-head-config="tableHeadConfig" :table-load-data="tableData" :list-loading="loading" align="left">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
          <template slot="majorToCourse" slot-scope="{ data }">
            <el-select
              v-model="data.row.majorToCourse"
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
    <!-- 新增对话框 -->
    <el-dialog :title="title" :visible.sync="addDialogFormVisible" width="30%" @closed="closeDialog('newFormRef')">
      <el-row :gutter="15">
        <el-form ref="newFormRef" :rules="rules" :model="addForm">
          <el-col :span="22">
            <el-form-item label="专业编号：" label-width="95px" prop="majorId">
              <el-input v-model="addForm.majorId" :maxlength="20" placeholder="请输入专业编号" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="专业名称：" label-width="95px" prop="majorName">
              <el-input v-model="addForm.majorName" :maxlength="20" placeholder="请输入专业名称" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="必选课：" prop="majorToCourse" label-width="95px">
              <el-select
                v-model="addForm.majorToCourse"
                clearable
                :style="{width: '100%'}"
                :maxlength="20"
                multiple
                placeholder="请选择课程专业必选课程"
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
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addLabel">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import PaginationVue from '@/components/Pagination/index.vue'
import { selectCourse } from '@/api/systemSettings/courseOpt'
import { selectMajor, addMajor, editMajor, deleteMajor } from '@/api/systemSettings/majorOpt'
import { upload } from '@/api/taskCenter'
import { mapGetters } from 'vuex'
export default {
  name: 'MajorOpt',
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
          label: '专业编号',
          value: 'majorId',
          tooltip: true
        },
        {
          label: '专业名称',
          value: 'majorName',
          tooltip: true
        },
        {
          label: '专业必选课程',
          value: 'majorToCourse',
          columnType: 'slot',
          slotName: 'majorToCourse'
        },
        {
          label: '添加时间',
          value: 'createTime',
          tooltip: true
        },
        {
          width: 150,
          label: '操作',
          columnType: 'slot',
          slotName: 'operation'
        }
      ],
      fileList: [],
      courseList: [],
      formData: {
        majorName: null,
        time: null,
        createStartTime: null,
        createEndTime: null
      },
      typeOptions: [],
      rules: {
        majorId: [
          { required: true, message: '请输入专业编号', trigger: 'change' }
        ],
        majorName: [
          { required: true, message: '请输入专业名称', trigger: 'change' }
        ],
        majorToCourse: [
          { required: true, message: '请选择专业必选课程', trigger: 'change' }
        ]
      },
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 100,
      editDialogFormVisible: false,
      addDialogFormVisible: false,
      addForm: {
        majorId: null,
        majorName: null,
        majorToCourse: null
      },
      editForm: {
        tmajorId: null,
        majorName: null,
        majorToCourse: null
      },
      title: ''
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
        majorId: '',
        majorName: '',
        majorToCourse: []
      }
      this.title = '添加新专业'
      this.addDialogFormVisible = true
      this.closeDialog('newFormRef')
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      this.fileList = []
      this.fileList.push(file.raw)
    },
    handleRemove(file, fileList) {
      this.fileList = []
    },
    submitUpload() {
      if (this.fileList.length === 0) {
        this.$message.warning('请上传文件')
      } else {
        const form = new FormData()
        form.append('file', this.fileList[0])
        upload('/major/majorUpload', form).then(res => {
          if (res.code === 200) {
            this.$message.success('上传成功')
            this.taskSelect()
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
    closeDialog(name) {
      this.$refs[name].resetFields()
    },
    // 初始化
    init() {
      this.taskSelect()
      this.getCourse()
    },
    getCourse() {
      const params = { page: 1, pageSize: 20 }
      selectCourse(params).then((res) => {
        res.data.records.forEach(e => {
          var temp = {
            value: e.courseId,
            label: e.courseName
          }
          this.courseList.push(temp)
        })
      })
    },
    // 任务-条件搜索
    taskSelect(type) {
      this.$startLoading('inhert_main')
      // selectDataByHeaderSearch
      type ? (this.currentPage = 1) : null
      const params = { ...this.formData, page: this.currentPage, pageSize: this.pageSize, time: null }
      delete params.time
      selectMajor(params).then((res) => {
        this.tableData = res.data.records
        this.pageTotal = +res.data.total
        this.$closeLoading('inhert_main')
      })
    },
    // 重置按钮事件
    taskOptionsReset() {
      // $refs['elForm'].resetFields()重置后搜索接口参数有问题不清空
      this.formData.majorName = null
      this.formData.time = null
      this.formData.createStartTime = null
      this.formData.createEndTime = null
      this.taskSelect()
    },
    // addLabel
    addLabel() {
      this.$refs.newFormRef.validate(valid => {
        if (valid) {
          let method
          let message
          console.log(this.addForm)

          if (this.addForm.id) {
            method = editMajor
            message = '修改成功'
          } else {
            method = addMajor
            message = '添加成功'
          }
          method({ ...this.addForm }).then((res) => {
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
      this.addForm = {
        id: row.id,
        majorName: row.majorName,
        majorId: row.majorId,
        majorToCourse: row.majorToCourse
      }
      this.title = '修改专业信息'
      this.addDialogFormVisible = true
    },
    // editLabel
    editLabel() {
      this.editDialogFormVisible = false
      editMajor({ ...this.addForm }).then((res) => {
        this.taskSelect()
      })
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
        this.deleteLabel(id)
      }).catch(() => {
        // 取消
      })
    },
    // deleteLabel
    deleteLabel(id) {
      deleteMajor(id).then((res) => {
        if (res.code) {
          this.$message.success('删除成功')
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
