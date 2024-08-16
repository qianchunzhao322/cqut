<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">可选课程列表</div>
          <div class="contorl_btns">
          </div>
        </div>
        <Etable height="99%" :table-head-config="chooseTableHeadConfig" :table-load-data="chooseTableData" :list-loading="chooseLoading" align="left">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
          <template slot="operation" slot-scope="{ data }">
            <el-button type="text" size="small" @click="choose(data.row)"> 选课 </el-button>
          </template>
        </Etable>
      </template>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title" style="color: rgb(36, 136, 255);">个人已选课程</div>
          <div class="contorl_btns">
          </div>
        </div>
        <Etable height="100%" :table-head-config="choosedTableHeadConfig" :table-load-data="choosedTableData" :list-loading="choosedLoading" align="left">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
          <template slot="operation" slot-scope="{ data }">
            <el-button type="text" size="small" style="color: #F74B4B;" @click="del(data.row)"> 退课 </el-button>
          </template>
        </Etable>
      </template>
    </base-layout>

  </div>
</template>

<script>
import { selectIndustryType, addIndustryType, editIndustryType, deleteIndustryType } from '@/api/systemSettings/courseOpt'
import { mapGetters } from 'vuex'
export default {
  name: 'CouseOpt',
  components: {
  },
  data() {
    return {
      choosedLoading: false,
      choosedTableHeadConfig: [
      {
          label: '序号',
          columnType: 'slot',
          slotName: 'index',
          width: 60,
          tooltip: true,
          fixed: 'left'
        },
        {
          label: '课程名称',
          value: 'courseName',
          tooltip: true,
          fixed: 'left',
          width: 160,
        },
        {
          label: '课程编号',
          value: 'courseId',
          tooltip: true,
          width: 160,
        },
        {
          label: '课时要求',
          value: 'courseHours',
          tooltip: true,
          width: 90,
        },
        {
          label: '课程容量',
          value: 'courseLimit',
          tooltip: true,
          width: 90,
        },
        {
          label: '课程介绍',
          value: 'courseStr',
          tooltip: true
        },
        {
          width: 90,
          label: '操作',
          columnType: 'slot',
          slotName: 'operation',
          fixed:'right'
        }
      ],
      choosedTableData: [],
      chooseLoading: false,
      chooseTableHeadConfig: [
        {
          label: '序号',
          columnType: 'slot',
          slotName: 'index',
          width: 60,
          tooltip: true,
          fixed: 'left'
        },
        {
          label: '课程名称',
          value: 'courseName',
          tooltip: true,
          fixed: 'left',
          width: 160,
        },
        {
          label: '课程编号',
          value: 'courseId',
          tooltip: true,
          width: 160,
        },
        {
          label: '课时要求',
          value: 'courseHours',
          tooltip: true,
          width: 90,
        },
        {
          label: '课程容量',
          value: 'courseLimit',
          tooltip: true,
          width: 90,
        },
        {
          label: '课程剩余',
          value: 'courseSurplus',
          fixed:'right',
          tooltip: true,
          width: 90,
        },
        {
          label: '课程介绍',
          value: 'courseStr',
          tooltip: true
        },
        {
          width: 90,
          label: '操作',
          columnType: 'slot',
          slotName: 'operation',
          fixed:'right'
        }
      ],
      chooseTableData: [],
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
    // 初始化
    init() {
      this.taskSelect1()
    },
    taskSelect1() {
      this.chooseTableData = [{
        courseId: '12334453',
        courseName: '光信息科学与技术',
        courseHours: '3',
        courseStr: '啊更大的份额啊撒旦飞洒地方',
        courseLimit: '123',
        courseSurplus: '123',
      },{},{},{},{},{},{},{},{},{},{},]
      this.choosedTableData = [{
        courseId: '12334453',
        courseName: '光信息科学与技术',
        courseHours: '3',
        courseStr: '啊更大的份额啊撒旦飞洒地方',
        courseLimit: '123',
      },{},{}]
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
    },
    choose(row) {},
    // 表格-删除
    del(row) {
      this.deleteTemp = row
      this.$prompt('退课原因：', '退课', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const { id } = row
        // 删除
        this.deleteIndustryType(id)
      }).catch(() => {
        // 取消
      })
    },
    // deleteAlumni
    deleteIndustryType(id) {
      deleteIndustryType({ id }).then((res) => {
        if (res.result) {
          this.$message.success('退课成功')
          this.taskSelect()
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
}
</style>
