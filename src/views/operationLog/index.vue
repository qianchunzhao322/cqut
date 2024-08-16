<template>
  <div ref="contain" class="container">
    <base-layout>
      <template slot="header">
        <el-row :gutter="15">
          <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px" class="demo_ruleForm">
            <el-col :span="5">
              <el-form-item label-width="75px" label="操作Id" prop="optId">
                <el-input v-model="formData.optId" placeholder="请输入操作ID" clearable :style="{width: '100%'}" @clear="taskSelect('isSelect')" @keydown.enter.native="taskSelect('isSelect')" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label-width="55px" label="角色" prop="optRole">
                <el-select v-model="formData.optRole" placeholder="全部" clearable :style="{width: '100%'}" @clear="taskSelect('isSelect')">
                  <el-option
                    v-for="(item, index) in roleOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label-width="95px" label="操作状态" prop="optRes">
                <el-switch
                  v-model="formData.optRes"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="操作时间" prop="optTime">
                <el-date-picker
                  v-model="formData.optTime"
                  type="daterange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :style="{width: '100%'}"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  range-separator="-"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <div class="search_btns">
                <el-button type="primary" @click="taskSelect('isSelect')">查询</el-button>
                <el-button @click="taskOptionsReset">重置</el-button>
              </div>
            </el-col>
          </el-form>
        </el-row>
      </template>
      <template slot="main">
        <div class="contorl_container">
          <div class="contorl_title">操作列表</div>
        </div>
        <Etable height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData" :list-loading="loading" align="left">
          <template slot="index" slot-scope="{ data }">
            <span>{{ data.$index + 1 }}</span>
          </template>
          <template slot="optRole" slot-scope="{ data }">
            <span>{{ roleMap[data.row.optRole] || '' }}</span>
          </template>
          <template slot="optRes" slot-scope="{ data }">
            <el-button :type="data.row.optRes == 1 ? 'success': 'danger'" size="small" plain>{{ data.row.optRes == 1 ? '成功': '失败' }}</el-button>
          </template>
        </Etable>
      </template>
      <template slot="footer">
        <pagination-vue v-show="pageTotal>0" :current-page.sync="currentPage" :page-size.sync="pageSize" :total="pageTotal" @getList="taskSelect" />
        <!-- <Page class="page" :current-page="currentPage" :page-size="pageSize" :total="pageTotal" @update:pageSize="sizeChange" @update:currentPage="currentChange" /> -->
      </template>
    </base-layout>

  </div>
</template>

<script>
import PaginationVue from '@/components/Pagination/index.vue'
import { selectOptLog } from '@/api/operationLog'
import EmptyCom from '@/components/EmptyCom'
export default {
  name: 'OperationLogIndex',
  components: {
    PaginationVue,
    EmptyCom
  },
  data() {
    return {
      roleMap: {
        '1': '管理员',
        '2': '用户',
        '3': '教师'
      },
      loading: false,
      tableHeadConfig: [
        {
          label: '序号',
          columnType: 'slot',
          slotName: 'index',
          width: 60,
          tooltip: true
        },
        {
          label: '操作ID',
          value: 'optId',
          tooltip: true
        },
        {
          label: '操作角色',
          columnType: 'slot',
          slotName: 'optRole',
          tooltip: true
        },
        {
          label: '请求接口',
          value: 'optInterface',
          tooltip: true
        },
        {
          label: '操作模块',
          value: 'optModule',
          tooltip: true
        },
        {
          label: '响应',
          columnType: 'slot',
          slotName: 'optRes',
          tooltip: true
        },
        {
          label: '操作时间',
          value: 'optTime',
          tooltip: true,
          sortable: true
        }
      ],
      formData: {
        optId: null,
        optRole: null,
        optRes: false,
        time: null,
        startTime: null,
        endTime: null
      },
      rules: {
        optId: [],
        optRole: [],
        optTime: []
      },
      tableData: [],
      roleOptions: [{
        'label': '管理员',
        'value': 1
      }, {
        'label': '用户',
        'value': 2
      }, {
        'label': '教师',
        'value': 3
      }],
      currentPage: 1,
      pageSize: 20,
      pageTotal: 100
    }
  },
  computed: {},
  watch: {
    'formData.time'(val) {
      if (val && val.length === 2) {
        this.formData.startTime = val[0] + ' 00:00:00'
        this.formData.endTime = val[1] + ' 23:59:59'
      } else {
        this.formData.startTime = null
        this.formData.endTime = null
      }
    }
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
    // 任务-条件搜索
    taskSelect1() {
      this.tableData = [{
        optId: '1111111111',
        optRole: '1',
        optInterface: 'add',
        optModule: '学生管理',
        optRes: 1,
        optTime: '2024/7/7-19:33:33'
      }, {
        optId: '1111111111',
        optRole: '2',
        optInterface: 'add',
        optModule: '学生管理',
        optRes: 1,
        optTime: '2024/7/7-19:33:33'
      }, {
        optId: '1111111111',
        optRole: '3',
        optInterface: 'add',
        optMoudle: '学生管理',
        optRes: 2,
        optTime: '2024/7/7-19:33:33'
      }]
    },
    taskSelect(type) {
      this.$startLoading('inhert_main')
      // selectDataByHeaderSearch
      type ? (this.currentPage = 1) : null
      const params = { ...this.formData, page: this.currentPage, pageSize: this.pageSize, time: null }
      selectOptLog(params).then((res) => {
        this.tableData = res.data
        this.pageTotal = +res.total
        this.$closeLoading('inhert_main')
      })
    },
    // 重置按钮事件
    taskOptionsReset() {
      // $refs['elForm'].resetFields()重置后搜索接口参数有问题不清空
      this.formData.user = null
      this.formData.status = null
      this.formData.phone = null
      this.formData.time = null
      this.formData.startTime = null
      this.formData.endTime = null
      this.taskSelect()
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
