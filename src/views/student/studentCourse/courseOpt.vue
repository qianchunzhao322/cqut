<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">可选课程列表</div>
          <div class="contorl_btns" />
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
          <div class="contorl_btns" />
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
import { getAllCourse, takeCourse, getMyCourse, backCourse } from '@/api/studentCourseOpt'
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
          width: 160
        },
        {
          label: '课程编号',
          value: 'courseId',
          tooltip: true,
          width: 160
        },
        {
          label: '课时要求',
          value: 'courseHours',
          tooltip: true,
          width: 90
        },
        {
          label: '课程容量',
          value: 'courseLimit',
          tooltip: true,
          width: 90
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
          fixed: 'right'
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
          width: 160
        },
        {
          label: '课程编号',
          value: 'courseId',
          tooltip: true,
          width: 160
        },
        {
          label: '课时要求',
          value: 'courseHours',
          tooltip: true,
          width: 90
        },
        {
          label: '课程容量',
          value: 'courseLimit',
          tooltip: true,
          width: 90
        },
        {
          label: '课程剩余',
          value: 'courseSku',
          // fixed: 'right',
          tooltip: true,
          width: 90
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
          fixed: 'right'
        }
      ],
      chooseTableData: []
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
      this.getAll()
      this.getMy()
    },
    getAll(type) {
      this.$startLoading('inhert_main')
      getAllCourse().then((res) => {
        if (res.code === 200) {
          this.chooseTableData = res.data
        }
        this.$closeLoading('inhert_main')
      })
    },
    getMy() {
      this.$startLoading('inhert_main')
      getMyCourse({ page: 1, pageSize: 20 }).then((res) => {
        if (res.code === 200) {
          this.choosedTableData = res.data.records
        }
        this.$closeLoading('inhert_main')
      })
    },
    choose(row) {
      takeCourse(row.courseId).then((res) => {
        if (res.code === 200) {
          this.$message.success('选课成功')
          this.getAll()
          this.getMy()
        }
      })
    },
    // 退课
    del(row) {
      this.deleteTemp = row
      this.$prompt('退课原因：', '退课', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const { courseId } = row
        // 删除
        this.deleteCourse(courseId, value)
      }).catch(() => {
        // 取消
        this.$message.info('取消退课')
      })
    },
    deleteCourse(id, reason) {
      backCourse(id, reason).then((res) => {
        if (res.code === 200) {
          this.$message.success('退课成功')
          this.getAll()
          this.getMy()
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
