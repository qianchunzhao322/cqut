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
import EmptyCom from '@/components/EmptyCom/index.vue'
import PaginationVue from '@/components/Pagination/index.vue'
export default {
  name: 'Grade',
  components: {
    EmptyCom,
    PaginationVue
  },
  props: {
    str: {
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
        tooltip: true
      },
      {
        label: '学生姓名',
        value: 'stuName',
        tooltip: true
      },
      {
        label: '课程成绩',
        value: 'courseScore',
        tooltip: true
      }],
      tableData: [{
        stuId: '344',
        stuName: '344',
        courseScore: '344'
      }]
    }
  },
  computed: {
    list() {
      if (this.str?.length) {
        return this.str.split(',')
      } else {
        return []
      }
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
