<template>
  <div class="main_product_container">
    <ul v-if="mainProductsList && mainProductsList.length != 0" class="main_products_list">
      <li v-for="(item, index) in mainProductsList" :key="'product'+index" class="main_products_item">
        <!-- <el-button @click="deleteItem" style="position: absolute; right: 8px; top: 8px;" type="text" icon="el-icon-delete"></el-button> -->
        <div v-for="(itemChild, indexChild) in item.children" :key="indexChild" class="product_name">
          <span style="font-weight: 700;">课时{{ index+1 }}</span><br>
          上课日期：{{ itemChild.courseDay ? itemChild.courseDay : '--' }}<br>
          上课时间：{{ itemChild.courseStartTime ? itemChild.courseStartTime : '-' }} - {{ itemChild.courseEndTime }}<br>
          上课地点：{{ itemChild.courseSite ? itemChild.courseSite : '--' }}<br>
          授课教师：{{ itemChild.teaName ? itemChild.teaName : '--' }}<br>
          课程周次：{{ itemChild.courseWeek ? '第' + itemChild.courseWeek + '周' : '--' }}
        </div>
        <el-button class="btn" type="text" @click="openEdit(index)"><i
          class="iconfont icon-a-bianzu182"
        />编辑</el-button>
      </li>
    </ul>
    <Empty-com v-else />
    <el-dialog title="修改或删除课时" :visible.sync="dialogFormVisible" width="30%" @closed="closeDialog('newFormRef')">
      <el-row :gutter="15">
        <el-form ref="newFormRef" :rules="rules" :model="info">
          <el-col :span="22">
            <el-form-item prop="courseDay" label="课程日期：" label-width="95px">
              <el-input v-model="info.courseDay" :maxlength="20" placeholder="请选择课程日期" clearable :style="{width: '100%'}" />
            </el-form-item>
            <el-form-item prop="courseInterval" label="课程时间：" label-width="95px">
              <el-time-picker
                v-model="info.courseInterval"
                :format="'HH:mm'"
                value-format="HH:mm"
                is-range
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="请选择课程起止时间"
                clearable
                :style="{width: '100%'}"
                @input="timeChange"
              />
            </el-form-item>
            <el-form-item prop="courseSite" label="课程地点：" label-width="95px">
              <el-input v-model="info.courseSite" :maxlength="20" placeholder="请输入课程地点" clearable :style="{width: '100%'}" />
            </el-form-item>
            <el-form-item prop="teaId" label="授课教师：" label-width="95px">
              <el-select
                v-model="info.teaId"
                clearable
                class="w-100"
                placeholder="请选择授课教师"
              >
                <el-option
                  v-for="item in teaList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="courseWeek" label="课程周次：" label-width="95px">
              <el-input v-model="info.courseWeek" :maxlength="20" placeholder="请输入课程周次" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editInfo">修改</el-button>
        <el-button type="danger" @click="deleteInfo">删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import EmptyCom from '@/components/EmptyCom/index.vue'
import { selectUser } from '@/api/systemSettings/userOpt'
import { courseSchedulingEdit } from '@/api/courseScheduling'
export default {
  name: 'MainProduct',
  components: {
    EmptyCom
  },
  props: {
    mainProductsList: {
      type: Array,
      default: () => []
    },
    courseId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      teaList: [],
      info: {
        courseDay: null,
        courseInterval: null,
        courseStartTime: null,
        courseEndTime: null,
        courseSite: null,
        teaName: null,
        courseWeek: null
      },
      title: '',
      rules: {
        courseDay: [
          { required: true, message: '该项不可为空', trigger: 'change' }
        ],
        courseInterval: [
          { required: true, message: '该项不可为空', trigger: 'change' }
        ],
        courseSite: [
          { required: true, message: '该项不可为空', trigger: 'change' }
        ],
        courseTeacherName: [
          { required: true, message: '该项不可为空', trigger: 'change' }
        ],
        courseWeek: [
          { required: true, message: '该项不可为空', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getTeacher()
  },
  methods: {
    getTeacher() {
      const params = { permissionCode: 2, page: 1, pageSize: 100 }
      selectUser(params).then((res) => {
        res.data.records.forEach(e => {
          var temp = {
            value: e.userId,
            label: e.realName
          }
          this.teaList.push(temp)
        })
      })
    },
    openEdit(index) {
      this.dialogFormVisible = true
      this.info = this.mainProductsList[index].children[0]
      this.info.courseInterval = [this.mainProductsList[index].children[0].courseStartTime, this.mainProductsList[index].children[0].courseEndTime]
      console.log(this.info.courseInterval)
    },
    editInfo() {
      var params = {
        id: this.info.id,
        teaId: this.info.teaId,
        courseId: this.courseId,
        courseSite: this.info.courseSite,
        courseDay: this.info.courseDay,
        courseStartTime: this.info.courseInterval[0],
        courseEndTime: this.info.courseInterval[1]
      }
      const enforceEdit = true
      courseSchedulingEdit(params, enforceEdit).then((res) => {
        if (res.code === 200) {
          this.$message.success('课时信息修改成功')
          this.dialogFormVisible = false
        }
      })
    },
    deleteInfo() {
      this.$emit('del', this.info.id)
      this.dialogFormVisible = false
    },
    timeChange() {
      this.$forceUpdate()
      console.log(this.info.courseInterval)

      this.info.courseStartTime = this.info.courseInterval[0]
      this.info.courseEndTime = this.info.courseInterval[1]
    }
  }
}
</script>

<style lang="scss" scoped>
.main_product_container{
    width: 100%;
    height: 100%;
    .main_products_list{
        display: flex;
        flex-wrap: wrap;
        .main_products_item{
            position: relative;
            margin-right: 20px;
            margin-bottom: 20px;
            width: 274px;
            height: 150px;
            background-image: url('../../../assets/unitManagement/product_bg.png');
            background-repeat: no-repeat;
            background-size: cover;
            border: 1px solid #ecf0f8;
            color: #474646;
            border-radius: 4px;
            padding: 16px 16px;
            cursor: pointer;
            .btn{
              position: absolute;
              top: 3px;
              right: 10px;
            }
            .product_name{
                display: -webkit-box;
                -webkit-line-clamp: 6;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 14px;
            }
            &:hover{
                background-image: url('../../../assets/unitManagement/product_bg_active.png');
                .product_name{
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
