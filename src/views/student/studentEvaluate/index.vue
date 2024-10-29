<template>
  <div
    ref="contain"
    class="container"
  >
    <base-layout>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">课程教评</div>
          <div class="contorl_btns">
            <el-button type="text" style="color: rgb(80, 160, 255);" @click="submit('ruleForm')">提交</el-button>
          </div>
        </div>
        <el-form v-for="(item, index) in formList" :key="index" ref="ruleForm" :rules="rules" label-width="80px" :model="item">
          <el-row :gutter="15">
            <el-col :span="4">
              <el-form-item label="课程ID：" prop="courseId">
                <el-input v-model="item.courseId" :style="{width: '100%'}" disabled placeholder="课程" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="课程名：" prop="courseName">
                <el-input v-model="item.courseName" :style="{width: '100%'}" disabled placeholder="课程名" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="评分：" prop="evaluateScore">
                <el-input v-model="item.evaluateScore" :style="{width: '100%'}" placeholder="评分" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="评价：" prop="evaluateContext">
                <el-input v-model="item.evaluateContext" :style="{width: '100%'}" placeholder="评价" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </base-layout>

  </div>
</template>

<script>
import { addEvaluate } from '@/api/studentCourseOpt'
import { selectCourse } from '@/api/systemSettings/courseOpt'
import { getInfo } from '@/api/user'
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
        console.log(1)

        if (value > 100 || value < 0) {
          callback(new Error('必须在0-100之间'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      formList: [],
      rules: {
        evaluateContext: [
          { required: true, message: '请填写课程评价', trigger: 'blur' }
        ],
        evaluateScore: [
          { required: true, validator: checkScore, trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    ...mapGetters(['userId', 'userInfo'])
  },
  mounted() {
    this.init()
  },
  created() {
  },
  methods: {
    init() {
      this.getCourse()
      this.getId()
    },
    getId() {
      getInfo(this.userInfo.id).then((res) => {
        this.userRealId = res.data.userId
      })
    },
    getCourse() {
      selectCourse({ page: 1, pageSize: 100 }).then((res) => {
        res.data.records.forEach(e => {
          var temp = {
            courseId: e.courseId,
            courseName: e.courseName,
            evaluateContext: null,
            evaluateScore: null
          }
          this.formList.push(temp)
        })
      })
    },
    submit(formName) {
      var state = true
      this.$refs[formName].forEach(e => {
        e.validate((valid) => {
          if (valid) {
            state = true
          } else {
            state = false
          }
        })
      })
      if (state) {
        var data = []
        this.formList.forEach(e => {
          var temp = {
            courseId: e.courseId,
            evaluateContext: e.evaluateContext,
            evaluateScore: +e.evaluateScore
          }
          data.push(temp)
        })
        const params = { stuId: this.userRealId, evaluateList: data }
        addEvaluate(params).then((res) => {
          if (res.code === 200) {
            this.$message.success('课程评教成功！')
          }
        })
      }
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
