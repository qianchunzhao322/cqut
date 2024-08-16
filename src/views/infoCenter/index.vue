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
              <el-form-item label="通知类型" prop="type">
                <el-select v-model="formData.type" placeholder="请选择" clearable :style="{width: '100%'}">
                  <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="formData.format === 1" :span="24">
              <el-form-item label="通知内容" prop="txt">
                <el-input v-model="formData.txt" type="textarea" placeholder="请输入文本分析内容" :maxlength="500" :autosize="{minRows: 4, maxRows: 6}" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col v-if="formData.format === 2" :span="24">
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
                  <el-button size="small" type="primary">上传图片</el-button>
                  <div slot="tip" class="el-upload__tip">注：支持任何图片格式，大小不要超过500K。</div>
                </el-upload>
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
            <el-col v-if="formData.format === 4" :span="24">
              <el-form-item label="分析内容" prop="txt">
                <el-input v-model="formData.txt" type="textarea" placeholder="请输入网址" :maxlength="500" :autosize="{minRows: 1, maxRows: 1}" :style="{width: '100%'}" />
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
          <div class="contorl_btns">
            <el-button type="text">复制</el-button>
          </div>
        </div>
        <div v-if="!formData.type" style="width: 100%;height: 100%; display: flex; justify-content: center; align-items: center;">
          <img style="width: 300px;height: 154px;" src="@/assets/404_images/noMessage.png" alt="">
        </div>
        <el-table border v-if="formData.type" ref="multipleTable" :data="tableData" style="width: 100%" :max-height="tableHeight" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" align="center" label="序号" width="80" fixed />
          <el-table-column v-if="formData.type === 1" prop="name" align="center" label="姓名" />
          <el-table-column v-if="formData.type === 1" prop="sex" align="center" label="性别" />
          <el-table-column v-if="formData.type === 1" prop="unit" align="center" label="单位" />
          <el-table-column v-if="formData.type === 1" prop="zw" align="center" label="职务" />
          <el-table-column v-if="formData.type === 2" prop="unit" align="center" label="单位名称" />
          <el-table-column v-if="formData.type === 2" prop="zw" align="center" label="地理位置" />
          <el-table-column v-if="formData.type === 3" prop="unit" align="center" label="地址" />
          <el-table-column v-if="formData.type === 3" prop="zw" align="center" label="经纬度" />
        </el-table>
      </template>
      <template slot="footer">
        <Page v-show="pageTotal>0" ref="footPage" class="page" :current-page="currentPage" :page-size="pageSize" :total="pageTotal" @update:pageSize="sizeChange" @update:currentPage="currentChange" />
      </template>
    </base-layout>
  </div>
</template>

<script>
import page from '@/components/Pagination'
export default {
  name: 'InfoCenterIndex',
  components: {
    Page: page
  },
  data() {
    return {
      tableHeight: null,
      fileList: [],
      tableData: [{
        name: '22',
        sex: '22',
        unit: '11',
        zw: '23'
      }, {
        name: '22',
        sex: '22',
        unit: '11',
        zw: '23'
      }, {
        name: '22',
        sex: '22',
        unit: '11',
        zw: '23'
      }, {
        name: '22',
        sex: '22',
        unit: '11',
        zw: '23'
      }, {
        name: '22',
        sex: '22',
        unit: '11',
        zw: '23'
      }, {
        name: '22',
        sex: '22',
        unit: '11',
        zw: '23'
      }, {
        name: '22',
        sex: '22',
        unit: '11',
        zw: '23'
      }],
      multipleSelection: [],
      formData: {
        format: 1,
        type: null,
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
        'label': '图片',
        'value': 2
      }, {
        'label': '文档',
        'value': 3
      }, {
        'label': '网址',
        'value': 4
      }],
      typeOptions: [{
        'label': '人物',
        'value': 1
      }, {
        'label': '单位',
        'value': 2
      }, {
        'label': '地址',
        'value': 3
      }],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 20
    }
  },
  mounted() {
    this.liquidHeight()
    console.log(this.tableData.length)
  },
  created() {
  },
  methods: {
    // 检测-动态表格高度
    liquidHeight() {
      console.log(this.$refs)
      this.tableHeight = +(this.$refs.contain.offsetHeight - this.$refs.elRow.$el.offsetHeight - this.$refs.footPage.$el.offsetHeight - this.$refs.mainHeader.offsetHeight - 66)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    // 分页器-更新当前页
    currentChange(current) {
      this.currentPage = current
    },
    // 分页器-更新分页大小
    sizeChange(size) {
      this.pageSize = size
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
