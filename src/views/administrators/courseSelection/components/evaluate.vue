<template>
  <div class="main_product_container">
    <base-layout>
      <template slot="main">
        <Etable
          height="100%"
          :table-head-config="tableHeadConfig"
          :table-load-data="tableData"
          :list-loading="loading"
          align="left"
        >
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
        </Etable>
      </template>
      <template slot="footer">
        <pagination-vue :current-page.sync="currentPage" :page-size.sync="pageSize" :total="pageTotal" @getList="taskSelect" />
      </template>
    </base-layout>
  </div>
</template>

<script>
import PaginationVue from '@/components/Pagination/index.vue'
import { getCourseEvaluate } from '@/api/courseScheduling'
export default {
  name: 'Evaluate',
  components: {
    PaginationVue
  },
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      pageSize: 20,
      pageTotal: 0,
      tableHeadConfig: [{
        label: '序号',
        columnType: 'slot',
        slotName: 'index',
        width: 60,
        tooltip: true,
        fixed: 'left'
      }, {
        label: '学号',
        value: 'stuId',
        width: '100px',
        tooltip: true
      },
      {
        label: '课程评分',
        value: 'evaluateScore',
        width: '100px',
        tooltip: true
      }, {
        label: '课程意见',
        value: 'evaluateContext',
        tooltip: true
      }],
      tableData: []
    }
  },
  mounted() {
    this.$nextTick(() => { this.taskSelect() })
  },
  methods: {
    taskSelect() {
      getCourseEvaluate({ courseId: this.message, page: this.currentPage, pageSize: this.pageSize }).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.records
          this.pageTotal = +res.data.total
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main_product_container{
    width: 100%;
    height: 100%;

}
</style>
