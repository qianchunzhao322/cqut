<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">课程成绩列表</div>
          <div class="contorl_btns" />
        </div>
        <Etable height="100%" :table-head-config="choosedTableHeadConfig" :table-load-data="choosedTableData" :list-loading="loading" align="left">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
        </Etable>
      </template>
    </base-layout>

  </div>
</template>

<script>
import { getMyCourse } from '@/api/studentCourseOpt'
import { mapGetters } from 'vuex'
export default {
  name: 'Grade',
  components: {
  },
  data() {
    return {
      loading: false,
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
          label: '课程成绩',
          value: 'courseScore',
          tooltip: true,
          width: 90
        }
      ],
      choosedTableData: []
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
      this.getMy()
    },
    getMy() {
      this.$startLoading('inhert_main')
      getMyCourse({ page: 1, pageSize: 20 }).then((res) => {
        if (res.code === 200) {
          this.choosedTableData = res.data.records
        }
        this.$closeLoading('inhert_main')
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
