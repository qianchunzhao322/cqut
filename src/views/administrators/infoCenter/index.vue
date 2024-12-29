<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="header">
        <el-row ref="elRow" :gutter="15">
          <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px" label-position="top">
            <el-col :span="12">
              <el-form-item label="通知格式" prop="format">
                <el-select v-model="formData.format" placeholder="请选择文件格式" clearable :style="{width: '100%'}">
                  <el-option v-for="(item, index) in formatOptions" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="通知面向课程" prop="course">
                <el-select v-model="formData.course" multiple placeholder="请选择通知到的课程" clearable :style="{width: '100%'}">
                  <el-option v-for="(item, index) in courseList" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="formData.format === 1" :span="24">
              <el-form-item label="通知内容" prop="txt">
                <el-input v-model="formData.txt" type="textarea" placeholder="请输入文本通知内容" :maxlength="500" :autosize="{minRows: 4, maxRows: 6}" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col v-if="formData.format === 3" :span="24">
              <el-form-item label="通知内容" prop="txt">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">上传文档</el-button>
                  <div slot="tip" class="el-upload__tip">注：支持支持word、pdf格式的文档，大小不要超过20M。</div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="btnArr" size="large">
                <el-button type="primary" size="small" @click="submitForm">提交</el-button>
                <el-button size="small" @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </template>
      <template slot="main">
        <div ref="mainHeader" class="contorl_container">
          <div class="contorl_title" style="color: #0E1050; font-weight: 700;">通知列表</div>
        </div>
        <Etable height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData" :list-loading="loading" align="left">
          <template slot="operation" slot-scope="{ data }">
            <el-button type="text" size="small" @click="toInfo(data.row)"> 详情 </el-button>
            <el-button type="text" size="small" style="color: #F74B4B;" @click="delInfo(data.row)"> 撤回 </el-button>
          </template>
        </Etable>
      </template>
      <template slot="footer">
        <Page v-show="pageTotal>0" ref="footPage" class="page" :current-page="currentPage" :page-size="pageSize" :total="pageTotal" @update:pageSize="sizeChange" @update:currentPage="currentChange" />
      </template>
    </base-layout>
    <!-- 详情对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%" @closed="closeDialog('newFormRef')">
      <el-row :gutter="15">
        <el-form ref="newFormRef" :rules="rules" :model="addForm">
          <el-col :span="22">
            <el-form-item label="发布时间：" prop="noticeDate" label-width="95px">
              <el-input v-model="addForm.noticeDate" placeholder="发布时间" disabled :maxlength="20" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="面向专业：" prop="noticeTo" label-width="95px">
              <el-select
                v-model="addForm.noticeTo"
                clearable
                disabled
                :style="{width: '100%'}"
                :maxlength="20"
                multiple
                placeholder="请选择课程面向专业"
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
          <el-col :span="22">
            <el-form-item label="通知内容：" prop="noticeDes" label-width="95px">
              <el-input v-model="addForm.noticeDes" type="textarea" disabled placeholder="内容" :maxlength="20" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import page from '@/components/Pagination'
import { selectCourse } from '@/api/systemSettings/courseOpt'
import moment from 'moment'
import { noticeAdd, noticeSelect, noticeDelete } from '@/api/notice'
export default {
  name: 'InfoCenterIndex',
  components: {
    Page: page
  },
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      addForm: {
        noticeDate: '',
        noticeDes: '',
        noticeTo: null
      },
      title: '通知详情',
      tableHeight: null,
      fileList: [],
      tableHeadConfig: [
        {
          label: '通知编号',
          value: 'id',
          width: 100,
          tooltip: true
        },
        {
          label: '通知内容',
          value: 'noticeDes',
          tooltip: true
        },
        {
          label: '通知发布时间',
          value: 'noticeDate',
          width: 150,
          tooltip: true
        },
        {
          label: '通知面向人数',
          value: 'noticeSum',
          width: 120,
          tooltip: true
        },
        {
          label: '通知确认人数',
          value: 'noticeGet',
          width: 120,
          tooltip: true
        },
        {
          width: 100,
          label: '操作',
          columnType: 'slot',
          slotName: 'operation'
        }
      ],
      tableData: [],
      formData: {
        format: 1,
        course: null,
        txt: ''
      },
      rules: {
        format: [],
        type: [],
        txt: [{
          required: false,
          message: '请输入文本分析内容',
          trigger: 'blur'
        }]
      },
      formatOptions: [{
        'label': '文字',
        'value': 1
      }, {
        'label': '文档（暂停使用）',
        'value': 3
      }],
      courseList: [],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0
    }
  },
  mounted() {
    this.liquidHeight()
    this.init()
  },
  created() {
  },
  methods: {
    init() {
      this.getCourse()
      this.getNotice()
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
    getNotice() {
      const params = { page: this.currentPage, pageSize: this.pageSize }
      noticeSelect(params).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.records
        }
      })
    },
    toInfo(row) {
      this.dialogFormVisible = true
      this.addForm.noticeDate = row.noticeDate
      this.addForm.noticeDes = row.noticeDes
      this.addForm.noticeTo = row.noticeTo
    },
    delInfo(row) {
      noticeDelete(row.id).then((res) => {
        if (res.code === 200) {
          this.$message.success('撤回通知')
          this.getNotice()
        }
      })
    },
    closeDialog(name) {
      this.$refs[name].resetFields()
    },
    // 检测-动态表格高度
    liquidHeight() {
      console.log(this.$refs)
      this.tableHeight = +(this.$refs.contain.offsetHeight - this.$refs.elRow.$el.offsetHeight - this.$refs.footPage.$el.offsetHeight - this.$refs.mainHeader.offsetHeight - 66)
    },
    submitForm() {
      const params = {
        noticeDes: this.formData.txt,
        noticeTo: this.formData.course,
        noticeDate: moment().format('yyyy-MM-DD')
      }
      noticeAdd(params).then((res) => {
        if (res.code === 200) {
          this.$message.success('通知发布成功')
          this.getNotice()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
      this.formData.format = 1
    },
    // 分页器-更新当前页
    currentChange(current) {
      this.currentPage = current
      this.getNotice()
    },
    // 分页器-更新分页大小
    sizeChange(size) {
      this.pageSize = size
      this.getNotice()
    }
  }
}
</script>

<style lang="scss" scoped>
.btnArr{
  display: flex;
  justify-content: flex-end;
}
// ::v-deep .el-button{
//   height: 32px;
// }
::v-deep .el-upload-list{
  width: 326px;
  .el-upload-list__item-name{
    color: #2488FF;
  }
  .el-upload-list__item-name [class^=el-icon]{
    color: #2488FF;
  }
  .el-icon-close{
    color: #2488FF;
  }
}
::v-deep .el-upload__tip{
  width: 360px;
  display: inline-block;
  margin-top: 0;
  vertical-align: text-top;
  margin-left: 7px;
}
::v-deep .el-form-item__label{
  font-weight: normal;
  color: #262A32;
}
</style>
