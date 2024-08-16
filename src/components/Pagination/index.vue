<template>
  <div class="pagination">
    <el-pagination
      background
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="maxTotal"
      :layout="layout"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100, 200]
    },
    layout: {
      type: String,
      default: "->, total, prev, pager, next, sizes, jumper, slot"
    }
  },
  computed: {
    maxTotal() {
      return this.total
    }
  },

  methods: {
    handleCurrentChange(currentPage) {
      this.$emit('update:currentPage', currentPage)
      this.$emit('getList')
    },
    handleSizeChange(pageSize) {
      this.$emit('update:pageSize', pageSize)
      this.$emit('getList')
    }
  }
}
</script>

<style scoped>
.pagination {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
