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
          <el-input v-model="ep" style="width: 92%;" type="text" disabled /><copy-icon :target-value="ep" />
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :key="'product' + index"
          :label="'新课时' + (index + 1) + ':'"
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
      <el-dialog
        width="60%"
        title="课时冲突情况"
        :visible.sync="innerVisible"
        append-to-body
      >
        <div class="card-ul">
          <div v-for="(item,index) in conflictRes" :key="index" class="card-li">
            <div class="card" style="border-right: 1px solid rgb(170, 170, 170);">
              冲突课程{{ index+1 }}：<br>
              教师姓名：{{ item.addConflict.teaName || '--' }} <br>
              课时日期：{{ item.addConflict.courseDay || '--' }} <br>
              课时地点：{{ item.addConflict.courseSite || '--' }} <br>
              课时时间：{{ item.addConflict.courseStartTime }} - {{ item.addConflict.courseEndTime }} <br>
            </div>
            <div class="card">
              冲突条目：<br>
              <div v-if="item.mysqlConflict.includes('teaName')">教师冲突</div>
              <div v-if="item.mysqlConflict.includes('courseSite')">课时地点冲突</div>
              <div v-if="item.mysqlConflict.includes('courseStartTime')">课时时间冲突</div>
              <div v-if="item.mysqlConflict.includes('courseDay')">课时日期冲突</div>
            </div>
          </div>
          <div>请仔细检查后重新提交。若执意保留冲突，请点击强制添加！！！</div>
        </div>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-show="!conflict" type="primary" @click="confirmMainProductList">确 定</el-button>
        <el-button v-show="conflict" type="danger" @click="confirmMainProductList('1')">强制添加</el-button>
        <el-button v-show="conflict" type="warning" @click="innerVisible = true">查看冲突</el-button>
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
    },
    courseName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ep: '于2024-07-07日10:00-11:00上课，教师为李明，上课地点为实训楼A001',
      dialogVisible: false,
      innerVisible: false,
      dynamicValidateForm: {
        domains: ['']
      },
      conflict: false,
      conflictRes: []
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
      // this.conflict = true
      this.conflict = false
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
        this.$message.warning('不可再删了')
        return
      }
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    extractData() {
      const result = this.dynamicValidateForm.domains.filter((o) => o?.length)
      var params = []
      result.forEach(e => {
        const arr = e.split('，')
        var temp = {
          courseId: this.courseId,
          courseName: this.courseName,
          courseDay: arr[0].substring(1, 11),
          courseSite: arr[2].substring(5),
          teaId: this.teaList[arr[1].substring(3)],
          teaName: arr[1].substring(3),
          courseStartTime: arr[0].substring(12, 17),
          courseEndTime: arr[0].substring(18, 23)
        }
        params.push(temp)
      })
      return params
    },
    confirmMainProductList(type) {
      this.$refs.dynamicValidateForm.validate((valid) => {
        if (valid) {
          var params = this.extractData()
          var method, msg, dataInfo, enforceAdd
          if (params.length > 1) {
            method = courseSchedulingBatchAdd
            msg = '全部课时添加成功'
            dataInfo = params
            type.length ? (enforceAdd = true) : (enforceAdd = false)
          } else {
            method = courseSchedulingAdd
            msg = '课时添加成功'
            dataInfo = params[0]
            type.length ? (enforceAdd = true) : (enforceAdd = false)
          }
          method(dataInfo, enforceAdd).then((res) => {
            if (res.code === 200) {
              this.$message.success(msg)
              this.dialogVisible = false
              this.$emit('update')
            }
            if (res.code === 409) {
              this.conflict = true
              this.$message.warning('课时存在冲突，请查看冲突提示并进行修改确认')
              this.conflictRes = res.data.conflictList
            }
            if (res.code === 40) {
              this.$message.warning('您所提交的课时存在冲突，请仔细检查后提交')
            }
          })
        }
      })
    },
    showDialog() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.card-ul{
  width: 100%;
  height: 360px;
  overflow: auto;
  .card-li{
    margin: 16px 0;
    width: 98%;
    height: 160px;
    background-color: #fcbbbb;
    background: linear-gradient(145deg, #faf7f7, #f0f0f0);
    box-shadow:  6px 6px 7px #bebebe;
    display: flex;
    .card{
      flex: 1;
      padding: 16px;
      font-size: 18px;
      color: #f51616;
      div{
        width: 100%;
      }
    }
    .card:first-child{
      color: #000;
    }
  }
}
</style>
