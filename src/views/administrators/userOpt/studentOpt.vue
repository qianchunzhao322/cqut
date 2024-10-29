<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="header">
        <el-row :gutter="15">
          <el-form ref="elForm" :model="formData" size="medium" class="demo_ruleForm" label-width="100px">
            <el-col :span="5">
              <el-form-item label-width="95px" label="学生姓名" prop="realName">
                <el-input v-model="formData.realName" placeholder="请输入学生姓名" clearable :style="{width: '100%'}" @clear="taskSelect('isSelect')" @keydown.enter.native="taskSelect('isSelect')" />
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
            <el-col :span="12" :offset="0">
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
          <div class="contorl_title">在册学生列表</div>
          <div class="contorl_btns">
            <el-button type="text" style="color: rgb(80, 160, 255);" @click="add">添加</el-button>
            <el-button type="text" @click="showDerive(multipleSelection, 'post', '/user/userDownload', '学生信息.xlsx', '3')">下载</el-button>
            <!-- <download /> -->
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
            <el-form-item prop="realName" label="学生姓名：" label-width="95px">
              <el-input v-model="addForm.realName" :disabled="title === '修改学生信息'" :maxlength="20" placeholder="请输入学生姓名" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item prop="userId" label="学号：" label-width="95px">
              <el-input v-model="addForm.userId" :disabled="title === '修改学生信息'" :maxlength="20" placeholder="请输入学号" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item prop="identityNumber" label="身份证号：" label-width="95px">
              <el-input v-model="addForm.identityNumber" :disabled="title === '修改学生信息'" :maxlength="20" placeholder="请输入身份证号" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item prop="majorId" label="专业：" label-width="95px">
              <el-input v-model="addForm.majorId" :maxlength="20" placeholder="请输入专业" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item prop="phoneNumber" label="手机号：" label-width="95px">
              <el-input v-model="addForm.phoneNumber" :maxlength="20" placeholder="请输入手机号" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addAlumni">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PaginationVue from '@/components/Pagination/index.vue'
import { selectUser, addUser, editUser, deleteUser, resetUser } from '@/api/systemSettings/userOpt'
import { mapGetters } from 'vuex'
import exportFile from '@/plugins/mixins/export'
import { upload } from '@/api/taskCenter'
export default {
  name: 'StudentOpt',
  components: {
    PaginationVue
  },
  mixins: [
    exportFile
  ],
  data() {
    return {
      limitNum: 1, // 上传excell时，同时允许上传的最大数
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
          label: '学号',
          value: 'userId',
          tooltip: true
        },
        {
          label: '姓名',
          value: 'realName',
          tooltip: true
        },
        {
          label: '研究方向',
          value: 'majorId',
          tooltip: true
        },
        {
          label: '手机号',
          value: 'phoneNumber',
          tooltip: true
        },
        {
          label: '身份证号',
          value: 'identityNumber',
          tooltip: true
        },
        {
          label: '账号修改次数',
          value: 'accountModify',
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
      rules: {
        realName: [
          { required: true, message: '请输入学生姓名', trigger: 'change' }
        ],
        userId: [
          { required: true, message: '请输入学号', trigger: 'change' }
        ],
        identityNumber: [
          { required: true, message: '身份证号不能为空', trigger: ['blur', 'change'] },
          {
            pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: '请输入正确的身份证号',
            trigger: ['blur', 'change']
          }
        ],
        phoneNumber: [{
          required: true,
          message: '联系手机不能为空',
          trigger: ['blur', 'change']
        },
        {
          pattern:
						/^1(3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{8}$/,
          message: '请输入正确的手机号',
          trigger: ['blur', 'change']
        }],
        majorId: [
          { required: true, message: '请输入专业', trigger: 'change' }
        ]
      },
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      addDialogFormVisible: false,
      addForm: {
        realName: null,
        userId: null,
        majorId: null,
        phoneNumber: null,
        identityNumber: null
      },
      title: '',
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
        userId: '',
        majorId: '',
        phoneNumber: '',
        identityNumber: ''
      }
      this.title = '添加学生信息'
      this.addDialogFormVisible = true
      this.closeDialog('newFormRef')
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      this.fileList.push(file.raw)
    },
    submitUpload() {
      if (this.fileList.length === 0) {
        this.$message.warning('请上传文件')
      } else {
        const form = new FormData()
        form.append('file', this.fileList[0])
        upload('/user/userUpload', form).then(res => {
          this.taskSelect()
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
    // 用户-条件搜索
    taskSelect(type) {
      this.$startLoading('inhert_main')
      type ? (this.currentPage = 1) : null
      const params = { ...this.formData, permissionCode: 3, page: this.currentPage, pageSize: this.pageSize, time: null }
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
    addAlumni() {
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
          method({ ...params, permissionCode: 3 }).then((res) => {
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
        majorId: row.majorId,
        phoneNumber: row.phoneNumber,
        identityNumber: row.identityNumber
      }
      this.addDialogFormVisible = true
      this.title = '修改学生信息'
      // this.editTemp = row
    },
    // editAlumni
    editAlumni(row) {
      this.editDialogFormVisible = false
      const params = { ...this.addForm }
      delete params.editStatus

      editUser({ ...params, permissionCode: 3 }).then((res) => {
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
        this.deleteUser(id)
      }).catch(() => {
        // 取消
      })
    },
    deleteUser(id) {
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
