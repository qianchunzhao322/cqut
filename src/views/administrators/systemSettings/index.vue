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
            value-format="yyyy/MM/dd"
          />
          <el-button type="primary">提交</el-button>
        </el-form-item>
      </el-form>
      <div class="text item">在册学生数量 -- <span>9</span>人</div>
      <div class="text item">在册教师数量 -- <span>9</span>人</div>
      <div class="text item">课程数量 -- <span>9</span>节</div>
      <div class="text item">操作日志数量 -- <span>996467</span>次</div>
      <div class="text item">系统服务人次 -- <span>9757</span>次</div>
    </el-card>
  </div>
</template>

<script>
import { selectOptLog } from '@/api/operationLog'
export default {
  name: 'SemesterResetIndex',
  components: {
  },
  data() {
    return {
      time: ''
    }
  },
  mounted() {
  },
  created() {
  },
  methods: {
    handleConfirm() {
      console.log('yes')
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
