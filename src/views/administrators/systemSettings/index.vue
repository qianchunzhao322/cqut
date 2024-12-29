<template>
  <div ref="contain" class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 24px;font-weight: 700;">全局数据项</span>
        <el-popconfirm icon="el-icon-info" icon-color="red" title="确定重置本学期数据吗？" @onConfirm="handleConfirm">
          <el-button slot="reference" style="float: right;" size="middle" type="danger">学期重置</el-button>
        </el-popconfirm>
        <el-divider />
        <div style="font-size: 16px; color: rgb(22, 44, 91);">学期重置项为学期开始时间、系统学生、学期课程、操作日志，重置前请自行导出数据，重置后数据不可恢复请谨慎操作</div>
      </div>
      <el-form ref="form" label-width="120px">
        <el-form-item label="学期开始时间：">
          <el-date-picker
            v-model="time"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          />
          <el-button type="primary" @click="editStart">修改学期开始时间</el-button>
        </el-form-item>
      </el-form>
      <div class="text item">在册学生数量 -- <span>{{ stuNumber }}</span>人</div>
      <div class="text item">在册教师数量 -- <span>{{ teaNumber }}</span>人</div>
      <div class="text item">实验课程数量 -- <span>{{ courseNumber }}</span>个</div>
      <div class="text item">操作日志数量 -- <span>{{ optNumber }}</span>次</div>
      <div class="text item">系统服务人次 -- <span>{{ visitNumber }}</span>次</div>
    </el-card>
  </div>
</template>

<script>
import { getNewSemesterStartDate, editNewSemesterStartDate, sysInfoSelect, semesterReset } from '@/api/systemSettings/sysOpt'
export default {
  name: 'SemesterResetIndex',
  components: {
  },
  data() {
    return {
      time: '',
      stuNumber: 0,
      teaNumber: 0,
      visitNumber: 0,
      courseNumber: 0,
      optNumber: 0
    }
  },
  mounted() {
  },
  created() {
    this.getStart()
    this.getSysInfo()
  },
  methods: {
    getStart() {
      getNewSemesterStartDate().then((res) => {
        if (res.code === 200) {
          this.time = res.data
        }
      })
    },
    getSysInfo() {
      sysInfoSelect().then((res) => {
        if (res.code === 200) {
          this.stuNumber = res.data[0].stuNumber
          this.teaNumber = res.data[0].teaNumber
          this.visitNumber = res.data[0].visitNumber
          this.optNumber = res.data[0].optNumber
          this.courseNumber = res.data[0].courseNumber
        }
      })
    },
    editStart() {
      editNewSemesterStartDate(this.time).then((res) => {
        if (res.code === 200) {
          this.$message.success('学期开始时间修改成功')
          this.getStart()
        }
      })
    },
    handleConfirm() {
      semesterReset().then((res) => {
        if (res.code === 200) {
          this.$message.success('学期数据重置成功！！！')
          this.getStart()
          this.getSysInfo()
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
    .text {
    font-size: 18px;
    color: rgb(36, 136, 255);
    span{
      color: rgb(27, 82, 135);
    }
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 98%;
  }
}
</style>
