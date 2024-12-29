<template>
  <div class="container">
    <div class="contorls_btn">
      <el-button type="default" @click="cancelUpdate">取消</el-button>
    </div>
    <base-layout>
      <template slot="main">
        <div class="form_container">
          <div class="form_head">
            <div class="head_left">
              <img src="~@/assets/unitManagement/head_left.png" alt="">
              <div class="form_head_title">课程基本信息</div>
            </div>
            <div class="btn">
              <el-button type="primary" size="small" @click="updateCourse">确认修改</el-button>
            </div>
          </div>
          <div class="base_info_container">
            <el-form ref="ruleForm" :model="ruleForm" label-width="7em" class="base_Form">
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label="课程编号："
                    prop="courseId"
                    :rules="{
                      required: true, message: '请输入课程编号', trigger: ['blur']
                    }"
                  >
                    <el-input v-model="ruleForm.courseId" clearable disabled placeholder="请输入课程编号" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="课程名称："
                    prop="courseName"
                    :rules="{
                      required: true, message: '请输入课程名称', trigger: ['blur']
                    }"
                  >
                    <el-input v-model="ruleForm.courseName" clearable disabled placeholder="请输入课程名称" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="人数限制："
                    prop="courseLimit"
                    :rules="{
                      required: false, message: '请输入课程人数限制', trigger: ['blur']
                    }"
                  >
                    <el-input v-model="ruleForm.courseLimit" clearable placeholder="请输入课程人数限制" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="开放状态："
                    prop="courseStatus"
                    :rules="{
                      required: true, trigger: ['blur']
                    }"
                  >
                    <el-switch
                      v-model="ruleForm.courseStatus"
                      inactive-text="禁止"
                      active-text="开放"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="课时要求："
                    prop="courseHours"
                    :rules="{
                      required: true, message: '请输入课时要求', trigger: ['blur']
                    }"
                  >
                    <el-input v-model="ruleForm.courseHours" clearable class="price_input_container" maxlength="6" placeholder="请输入课时要求" />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item
                    label="面向专业："
                    prop="courseTarget"
                    :rules="{
                      required: true, message: '请选择可选课专业', trigger: ['blur']
                    }"
                  >
                    <el-select
                      v-model="ruleForm.courseTarget"
                      clearable
                      multiple
                      disabled
                      class="w-100"
                      placeholder="请选择可选课专业"
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
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="form_container">
          <div class="form_head">
            <div class="head_left">
              <img src="~@/assets/unitManagement/head_left.png" alt="">
              <div class="form_head_title">配置课时 -- {{ courseName }}</div>
            </div>
            <el-button type="text" @click="showEditMainProducts"><i
              class="iconfont icon-a-bianzu182"
            />新增课时</el-button>
          </div>
          <div class="main_products_container">
            <main-product :course-id="courseId" :main-products-list="mainProductsList" @del="delit" />
          </div>
        </div>
      </template>
    </base-layout>
    <addMainProduct ref="addMainProductRef" :course-name="courseName" :course-id="courseId" @update="reset" />
  </div>
</template>

<script>
import { selectCourseScheduling, courseSchedulingDelete } from '@/api/courseScheduling'
import { selectCourse, editCourse } from '@/api/systemSettings/courseOpt'
import { selectMajor } from '@/api/systemSettings/majorOpt'

import mainProduct from './components/mainProduct.vue'
import addMainProduct from './components/addMainProduct.vue'

// import {
//   inductryType
// } from '@/plugins/options'
export default {
  name: 'UnitForm',
  components: {
    mainProduct,
    addMainProduct
  },
  mixins: [
    // inductryType
  ],
  data() {
    return {
      id: '',
      majorList: [],
      courseId: null,
      courseName: null,
      mainProductsList: [],
      ruleForm: {
        courseId: '',
        courseName: '',
        courseHours: '',
        courseStatus: '',
        courseLimit: '',
        courseTarget: ''
      }
    }
  },
  mounted() {
    const { courseId, courseName } = this.$route.query
    if (courseId) {
      this.courseId = courseId
      this.courseName = courseName
      this.getCourseDetail(courseName)
      this.getMajor()
      this.getCourseScheduling(courseName)
    }
  },
  methods: {
    getCourseDetail(courseName) {
      selectCourse({ courseName, page: 1, pageSize: 10 }).then((res) => {
        this.ruleForm = res.data.records[0]
      })
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
      })
    },
    getCourseScheduling(courseName) {
      const data = { courseName, page: 1, pageSize: 100 }
      selectCourseScheduling(data).then((res) => {
        // this.tableData = res.data.records
        this.mainProductsList = []
        res.data.records.forEach((ele, index) => {
          var temp = {}
          temp.children = [ele]
          this.mainProductsList.push(temp)
        })
      })
    },
    delit(data) {
      courseSchedulingDelete(data).then((res) => {
        if (res.code === 200) {
          this.$message.success('课时信息删除成功')
          this.getCourseScheduling(this.courseName)
        }
      })
    },
    reset() {
      this.getCourseScheduling(this.courseName)
    },
    updateCourse() {
      editCourse({ ...this.ruleForm }).then((res) => {
        if (res.code === 200) {
          this.$message.success('课程细节修改成功')
          this.getCourseDetail(this.courseName)
        }
      })
    },
    cancelUpdate() {
      // this.$router.replace({
      // 	path: '/unitManagement/index'
      // })
      this.$router.go(-1)
    },
    showEditMainProducts() {
      this.$refs.addMainProductRef.showDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
.price_input_container {
	position: relative;

	&::after {
		// content: '亿';
		content: '';
		position: absolute;
		color: #BFC4CD;
		right: -1.5em;
		bottom: 0;

	}
}

.container {
	.contorls_btn {
		position: absolute;
		right: 20px;
		top: 0;
		align-items: center;
		height: 53px;
		display: flex;
	}

	.form_container {
		padding: 0 24px;
		background: #fcfdfe;
		border-radius: 4px;
		border: 1px solid #ecf0f8;
		margin-bottom: 14px;

		.form_head {
			height: 55px;
			border-bottom: 1px solid #eceef5;
			display: flex;
			font-size: 14px;
			align-items: center;
			justify-content: space-between;

			.head_left {
				display: flex;
				align-items: center;
			}

			img {
				width: 10px;
				height: 17px;
				margin-right: 4px;
			}

			.iconfont {
				font-size: 18px;
				transform: translateY(2px);
				display: inline-block;
				margin-right: 8px;
			}
		}

		.main_products_container {
			min-height: 300px;
			padding: 20px 0;
		}

		.base_info_container {
			padding: 24px 0;

			.base_Form {
				padding: 0 100px;
			}
		}
	}
}
</style>
