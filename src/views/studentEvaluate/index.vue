<template>
  <div
    ref="contain"
    class="container"
  >
    <base-layout>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">在线教评</div>
          <div class="contorl_btns">
            <el-button type="text" style="color: rgb(80, 160, 255);" @click="submit('ruleForm')">提交</el-button>
          </div>
        </div>
        <el-row v-for="(item, index) in formList" :key="index" :gutter="15">
          <el-form ref="ruleForm" :rules="rules" label-width="80px" :model="formData">
            <el-col :span="5">
              <el-form-item label="教师姓名" prop="teacherName">
                <el-input v-model="item.teacherName" :style="{width: '100%'}" disabled placeholder="姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="教师评分" prop="score">
                <el-input v-model="item.score" :style="{width: '100%'}" placeholder="评分" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教师评价" prop="evaluate">
                <el-input v-model="item.evaluate" :style="{width: '100%'}" placeholder="评价" />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </template>
    </base-layout>

  </div>
</template>

<script>
import { selectIndustryType, addIndustryType, editIndustryType, deleteIndustryType } from '@/api/systemSettings/courseOpt'
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  components: {
  },
  data() {
    var checkScore = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('评分不能为空'))
      }
      setTimeout(() => {
        if (value > 100 || value < 0) {
          callback(new Error('必须在0-100之间'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      formList: [
        {
          teacherName: '张三',
          score: '',
          evaluate: ''
        },
        {
          teacherName: '李四',
          score: '',
          evaluate: ''
        }
      ],
      rules: {
        evaluate: [
          { required: true, message: '请填写教师评价', trigger: 'blur' }
        ],
        score: [
          { required: true, validator: checkScore, trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    this.init()
  },
  created() {
  },
  methods: {
    init() {
      this.taskSelect1()
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    taskSelect1() {
      this.tableData = [{
        courseId: '123524',
        courseName: '光信息科学与技术',
        courseGrade: '100',
        courseStr: '阿道夫了法律上地方案例的房间啊'
      }]
    },
    // 任务-条件搜索
    taskSelect(type) {
      this.$startLoading('inhert_main')
      // selectDataByHeaderSearch
      type ? (this.currentPage = 1) : null
      const params = { ...this.formData, page: this.currentPage, pageSize: this.pageSize, time: null }
      selectIndustryType(params).then((res) => {
        this.tableData = res.data
        this.pageTotal = +res.total
        this.$closeLoading('inhert_main')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.container {
  ::v-deep .el-col {
    padding-top: 14px;
  }
}
</style>
