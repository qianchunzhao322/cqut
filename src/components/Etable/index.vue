<!--
 * @Descripttion: Element Ui Table 表格二次封装
 -->
<template>
  <div class="table-list">
    <el-table
      v-if="tableData && tableData.length"
      ref="dataTable"
      :key="tableKey"
      v-loading="listLoading"
      element-loading-spinner="el-icon-loading"
      :data="tableData"
      style="width: 100%;"
      border
      :height="height"
      :max-height="maxHeight"
      :tree-props="tableTree.treeProps"
      :row-key="tableTree.key"
      :cell-style="tableCellStyle"
      @sort-change="sortChange"
      @selection-change="selectLine"
      @cell-click="handleCellClick"
      @row-click="handleRowClick"
    >
      <!-- 多选框 -->
      <el-table-column v-if="selection" type="selection" width="55" align="center" />
      <!-- 文本数据渲染 -->
      <template v-for="item in tableHead">
        <el-table-column
          v-if="item.columnType === 'slot'"
          :key="item.value"
          :sortable="item.sortable"
          :prop="item.value"
          :label="item.label"
          :width="item.width"
          :align="item.align ? item.align : align"
          :fixed="item.fixed"
          :min-width="item.minWidth"
          :show-overflow-tooltip="item.tooltip"
        >
          <template slot-scope="scope">
            <div v-if="item.slotName == 'editable'">
              <el-input
                v-if="scope.row[item.slotName]"
                v-model="scope.row[item.value]"
                size="small"
                @blur="onblur(scope.row)"
              />
              <span v-else style="margin-left: 10px">{{ scope.row[item.value] }}</span>
            </div>
            <div v-else-if="item.slotName == 'textLink'">
              <el-link type="primary" @click="getJump(scope.row)">{{ scope.row[item.value] }}</el-link>
            </div>
            <slot v-else :name="item.slotName" :data="scope" />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="item.value"
          :sortable="item.sortable"
          :prop="item.value"
          :label="item.label"
          :width="item.width"
          :align="item.align ? item.align : align"
          :fixed="item.fixed"
          :min-width="item.minWidth"
          :show-overflow-tooltip="item.tooltip"
        >
          <template slot-scope="scope">{{ scope.row[item.value]||scope.row[item.value]===0 ? scope.row[item.value] : defaultSettings.defaultTableEmptyText }}</template>
        </el-table-column>
      </template>
    </el-table>
    <EmptyCom v-else />
  </div>
</template>

<script>
import EmptyCom from '@/components/EmptyCom'
export default {
  name: 'Etable',
  components: {
    EmptyCom
  },
  /**
     * @name:
     * @test: test font
     * @msg:
     * @param {
     *  接收参数:
     *      tableHeadConfig           列的名称、接收值     |     Array
     *        label         列的名称                      |     String
     *        value         列的对应值                    |     String
     *        columnType    定义当前列为插槽    |   slot   |     String
     *        slotName      定义当前列插槽的名字           |     String
     *        width         定义当前列的宽度               |     String
     *        fiexed        定义当前列是否固定 | String
     *        sortable      定义当前列是否可排序            |     Boolean
     *        tableCellStyle定义单元格样式
     *  示例：配置
     *      tableHeadConfig:[
     *              {
     *                label       : "缩略图",
     *                value       : "skuName",
     *                columnType  : "slot",
     *                slotName    : "thumbnail",
     *                width       : 240,
     *                fixed      : "right",
     *                sortable      : true,
     *              }
     *            ]
     *
     *      tableLoadData     异步获取的table文本数据信息
     *      align             表格单元格内容排列顺序      left|center|right
     *      selection         表格是否可多选
     *      height            表格默认撑开高度
     *      tableCellStyle:{
              style:{
                background:'#1C3A5B',
              },
              columnIndex: 0,
              rowIndex:0
            }
     *  事件：
     *      获取当前选中行
     *      调用页面用  @selectLine="xxx" 进行监听处理
     * }
     * @return:
     */
  props: {
    tableHeadConfig: {
      type: Array,
      default: () => {
        return [
          {
            label: 'skuId',
            value: 'skuId'
          },
          {
            label: '商品名称',
            value: 'skuName'
          },
          {
            label: '缩略图',
            columnType: 'slot',
            slotName: 'thumbnail'
          },
          {
            label: '库存数量',
            value: 'onStockNum'
          },
          {
            label: '码类型',
            value: 'hasUniCode'
          },
          {
            label: '状态',
            value: 'status',
            columnType: 'slot',
            slotName: 'status'
          },
          {
            label: '操作',
            columnType: 'slot',
            slotName: 'operation'
          }
        ]
      }
    },
    tableLoadData: {
      type: Array,
      default: () => {
        return [
          {
            skuId: '111',
            skuName: '222'
          }
        ]
      }
    },
    align: {
      type: String,
      default: 'center'
    },
    selection: {
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, String]
    },
    maxHeight: {
      type: [Number, String]
    },
    listLoading: {
      type: Boolean,
      default: true
    },
    paddingTop: {
      type: String,
      default: '160px'
    },
    showTable: {
      type: Boolean,
      default: false
    },
    tableTree: {
      type: Object,
      default: () => ({
        treeProps: {},
        key: ''
      })
    },
    cellStyleConfig: {
      type: Object,
      default: () => ({
      })
    }
  },
  data() {
    return {
      tableKey: ''
    }
  },
  computed: {
    tableData() {
      return this.tableLoadData
    },
    tableHead() {
      return this.tableHeadConfig
    }
  },
  watch: {
    tableTree: {
      handler(val) {
        this.tableKey = Math.random()
      },
      deep: true // true 深度监听
    }
  },
  created() { },
  mounted() { },
  methods: {
    tableCellStyle({ row, column, rowIndex, columnIndex }) {
      // 列的样式
      if (this.cellStyleConfig && columnIndex === this.cellStyleConfig.columnIndex) {
        return this.cellStyleConfig.style
      }
    },
    handleRowClick(row, column, event) {
      this.$emit('rowClick', row, column, event)
    },
    handleCellClick(row, column, cell, event) {
      this.$emit('cellClick', row, column, cell, event)
    },
    sortChange(column) {
      this.$emit('sortChange', column)
    },
    selectLine() {
      // if (
      //   this.$refs.dataTable.selection &&
      //   this.$refs.dataTable.selection.length > 0
      // ) {
      this.$emit('selectLine', this.$refs.dataTable.selection)
      // }
    },
    clearSelection() {
      this.$refs.dataTable.clearSelection()
    },
    onblur(item) {
      this.$emit('onblur', item)
    },
    getJump(item) {
      this.$emit('getJump', item)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/common/mixin.scss";

// 点击的时候添加的class样式
.el-table__body tr.current-row>td {
    background-color: #1f2d3da1 !important;
    color: #fff;
}

.table-list {
    height: calc(100% - 48px);

    ::v-deep .el-table {
        height: 100%;
    }
}

::v-deep.el-icon-loading {
    font-size: 26px;
}

.handleTypeTextStyle {
    background: red;
}
</style>
