<template>
  <div class="edit_main_product_container">
    <el-dialog
      :modal-append-to-body="false"
      title="新增课时"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="720px"
      @closed="resetForm('dynamicValidateForm')"
    >
      <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item :label="'强制示例格式'">
          <el-input v-model="ep" type="text" disabled />
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :key="'product' + index"
          :label="'课时' + (index + 1)"
          :prop="'domains.' + index"
          :rules="{
            required: true,
            message: '课时添加不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="dynamicValidateForm.domains[index]" type="text" maxlength="50">
            <!-- <i slot="suffix" class="el-input__icon icon-a-xingzhuang2beifen" @click.stop="removeMainProduct(domain)" /> -->
            <div slot="suffix" class="input_contorl_btns">
              <i v-show="index === 0" class="iconfont icon-tianjia" @click.stop="addMainProduct" />
              <el-popconfirm title="是否确定删除？" @onConfirm="removeMainProduct(domain)">
                <i slot="reference" class="iconfont icon-a-xingzhuang2beifen" />
              </el-popconfirm>
            </div>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmMainProductList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { selectUser } from '@/api/systemSettings/userOpt'
import { courseSchedulingAdd, courseSchedulingBatchAdd } from '@/api/courseScheduling'
export default {
  name: 'EditMainProduct',
  props: {
    courseId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ep: '于2024-07-07日10:00-11:00上课，教师为李明，上课地点为实训楼A001',
      dialogVisible: false,
      dynamicValidateForm: {
        domains: ['']
      }
    }
  },
  watch: {
    dialogVisible(newval) {
      if (newval) {
        if (this.mainProductsList?.length) {
          this.dynamicValidateForm.domains = this.mainProductsList.slice(0)
        } else {
          this.dynamicValidateForm.domains = ['']
        }
      }
    }
  },
  mounted() {
    const params = { permissionCode: 2, page: 1, pageSize: 100 }
    selectUser(params).then((res) => {
      this.teaList = {}
      res.data.records.forEach(e => {
        this.teaList[e.realName] = e.userId
      })
    })
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dynamicValidateForm = {
        domains: []
      }
    },
    addMainProduct() {
      if (this.dynamicValidateForm.domains.length >= 10) {
        this.$message.warning('一次最多添加十个')
      } else {
        this.dynamicValidateForm.domains.push('')
      }
    },
    removeMainProduct(item) {
      if (this.dynamicValidateForm.domains?.length === 1) {
        this.dynamicValidateForm.domains = ['']
        return
      }
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    confirmMainProductList() {
      this.$refs.dynamicValidateForm.validate((valid) => {
        if (valid) {
          const result = this.dynamicValidateForm.domains.filter((o) => o?.length)
          var params = []
          result.forEach(e => {
            const arr = e.split('，')
            var temp = {
              courseId: this.courseId,
              courseDay: arr[0].substring(1, 11),
              courseSite: arr[2].substring(5),
              teaId: this.teaList[arr[1].substring(3)], // 此为teaName
              courseStartTime: arr[0].substring(12, 17),
              courseEndTime: arr[0].substring(18, 23)
            }
            params.push(temp)
          })
          var method, msg, dataInfo
          if (params.length > 1) {
            method = courseSchedulingBatchAdd
            msg = '全部课时添加成功'
            dataInfo = params
          } else {
            method = courseSchedulingAdd
            msg = '课时添加成功'
            dataInfo = params[0]
          }
          method(dataInfo).then((res) => {
            if (res.code === 200) {
              this.$message.success(msg)
              this.$emit('update')
            }
          })
          this.dialogVisible = false
        }
      })
    },
    showDialog() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
