<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="header">
        <el-row :gutter="15">
          <el-form ref="elForm" class="demo_ruleForm" :model="formData" size="medium" label-width="100px">
            <el-col :span="5">
              <el-form-item label-width="95px" label="教师姓名" prop="realName">
                <el-input v-model="formData.realName" placeholder="请输入教师姓名" clearable :style="{width: '100%'}" @clear="taskSelect('isSelect')" @keydown.enter.native="taskSelect('isSelect')" />
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
              <el-form-item label-width="0">
                <div class="search_btns">
                  <el-button type="primary" size="medium" @click="taskSelect('isSelect')"> 查询 </el-button>
                  <el-button @click="taskOptionsReset"> 重置 </el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </template>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">在册教师列表</div>
          <div class="contorl_btns">
            <el-button type="text" style="color: rgb(80, 160, 255);" @click="add">添加</el-button>
            <el-button type="text" @click="showDerive(multipleSelection, 'post', '/user/userDownload', '教师信息.xlsx', '2')">下载</el-button>
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
                <el-button style="margin-left: 10px;" size="small" type="warning"><a :href="'./excel/教师信息上传模板.xlsx'" download="教师信息上传模板.xlsx">下载模板</a></el-button>
                <div slot="tip" class="el-upload__tip">只能上传xlxs文件，且不超过2M</div>
              </el-upload>
              <el-button slot="reference" type="text" style="margin-left: 10px;">导入</el-button>
            </el-popover>
          </div>
        </div>

        <Etable selection height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData" :list-loading="loading" align="left" @selectLine="handleSelectionChange">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
          <template slot="operation" slot-scope="{ data }">
            <el-button type="text" size="small" @click="edit(data.row)"> 编辑 </el-button>
            <el-button type="text" size="small" style="color: #F74B4B;" @click="del(data.row)"> 删除 </el-button>
            <el-button type="text" size="small" style="color: rgb(38, 64, 110);" @click="resetPwd(data.row)"> 密码重置 </el-button>
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
            <el-form-item prop="userId" label="职工号：" label-width="95px">
              <el-input v-model="addForm.userId" :disabled="title === '修改教师信息'" :maxlength="20" placeholder="请输入职工号" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item prop="realName" label="教师姓名：" label-width="95px">
              <el-input v-model="addForm.realName" :maxlength="20" placeholder="请输入教师姓名" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addCompanyType">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import PaginationVue from '@/components/Pagination/index.vue'
import { selectUser, addUser, editUser, deleteUser, resetUser } from '@/api/systemSettings/userOpt'
import { mapGetters } from 'vuex'
import { upload } from '@/api/taskCenter'
import exportFile from '@/plugins/mixins/export'
export default {
  name: 'TeacherOpt',
  components: {
    PaginationVue
  },
  mixins: [
    exportFile
  ],
  data() {
    return {
      fileList: [],
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
          label: '职工号',
          value: 'userId',
          tooltip: true
        },
        {
          label: '教师姓名',
          value: 'realName',
          tooltip: true
        },
        {
          label: '账号修改次数',
          value: 'accountModify',
          tooltip: true
        },
        {
          label: '上次登录时间',
          value: 'lastLoginTime',
          tooltip: true
        },
        {
          width: 180,
          label: '操作',
          columnType: 'slot',
          slotName: 'operation'
        }
      ],
      formData: {
        realName: null,
        time: null,
        createStartTime: null,
        createEndTime: null
      },
      title: null,
      rules: {
        realName: [
          { required: true, message: '请输入教师姓名', trigger: 'change' }
        ],
        userId: [
          { required: true, message: '请输入职工号', trigger: 'change' }
        ]
      },
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 100,
      editDialogFormVisible: false,
      addDialogFormVisible: false,
      addForm: {
        realName: null,
        userId: null
      },
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
        realName: '',
        userId: ''
      }
      this.title = '添加教师信息'
      this.addDialogFormVisible = true
      this.closeDialog('newFormRef')
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
        upload('/user/userUpload', form).then(res => {
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
    handleRemove(file, fileList) {
      this.fileList = []
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    closeDialog(name) {
      this.$refs[name].resetFields()
    },
    // 初始化
    init() {
      this.taskSelect()
    },
    taskSelect(type) {
      this.$startLoading('inhert_main')
      type ? (this.currentPage = 1) : null
      const params = { ...this.formData, permissionCode: 2, page: this.currentPage, pageSize: this.pageSize, time: null }
      delete params.time
      selectUser(params).then((res) => {
        this.tableData = res.data.records
        this.pageTotal = +res.data.total
        this.$closeLoading('inhert_main')
      })
    },
    // 重置按钮事件
    taskOptionsReset() {
      // $refs['elForm'].resetFields()重置后搜索接口参数有问题不清空
      this.formData.realName = null
      this.formData.time = null
      this.formData.createStartTime = null
      this.formData.createEndTime = null
      this.taskSelect()
    },
    // addCompanyType
    addCompanyType() {
      this.$refs.newFormRef.validate(valid => {
        if (valid) {
          let method
          let message
          if (this.addForm.editStatus?.length) {
            method = editUser
            message = '修改成功'
          } else {
            method = addUser
            message = '添加成功'
          }
          const params = { ...this.addForm }
          delete params.editStatus
          method({ ...params, permissionCode: 2 }).then((res) => {
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
    edit(row, rowIndex) {
      this.addForm = {
        id: row.id,
        editStatus: '1',
        // ...row
        realName: row.realName,
        userId: row.userId,
        phoneNumber: row.phoneNumber,
        identityNumber: row.identityNumber
      }
      this.addDialogFormVisible = true
      this.title = '修改教师信息'
      // this.editTemp = row
    },
    // editCompanyType
    editCompanyType(row) {
      this.editDialogFormVisible = false
      const params = { ...this.addForm }
      delete params.editStatus
      console.log(params)

      editUser({ ...params, permissionCode: 2 }).then((res) => {
        console.log(res)
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
        this.deleteCompanyType(id)
      }).catch(() => {
        // 取消
      })
    },
    deleteCompanyType(id) {
      deleteUser(id).then((res) => {
        if (res.code) {
          this.$message.success('删除成功')
          this.taskSelect()
        }
      })
    },
    resetPwd(row) {
      resetUser(row.id).then((res) => {
        if (res.code) {
          this.$message.success('密码重置为原始密码123456')
          // this.taskSelect()
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
