<template>
  <!-- 录入成绩 -->
  <base-layout header-height="0">
    <template slot="main">
      <div class="content_container whole_container">
        <div id="whole_container">
          <!-- aside 课程 -->
          <div class="aside_container">
            <el-table
              ref="singleTable"
              :data="tableData"
              highlight-current-row
              style="width: 100%; height: 100%;"
              @current-change="handleCurrentChange"
            >
              <el-table-column
                property="courseName"
                label="课程名称"
              />
            </el-table>
          </div>
          <!-- right 成绩 -->
          <div class="el-main">
            <base-layout footer-height="0">
              <template slot="main">
                <div class="contorl_container">
                  <div class="contorl_title">{{ scoreTableData.length>0? title : '课程成绩列表' }}</div>
                  <div class="contorl_btns">
                    <el-button type="primary" plain @click="edit(data.row)"> 提交全部成绩 </el-button>
                  </div>
                </div>
                <Etable height="100%" :table-head-config="tableHeadConfig" :table-load-data="scoreTableData" :list-loading="scoreLoading" align="left">
                  <template slot="index" slot-scope="{ data }">
                    <span>{{ data.$index + 1 }}</span>
                  </template>
                  <template slot="score" slot-scope="{ data }">
                    <el-input v-model="data.row.score" size="mini" />
                  </template>
                  <template slot="operation" slot-scope="{ data }">
                    <el-button type="text" size="small" @click="edit(data.row)"> 编辑成绩 </el-button>
                  </template>
                </Etable>
              </template>
            </base-layout>
          </div>
        </div>
      </div>
    </template>
  </base-layout>
</template>

<script>
// components
// api
import { getSearchList } from '@/api/alumniInfomation/index'
export default {
  name: 'TeacherGradeIndex',
  components: {
  },
  data() {
    return {
      currentRow: null,
      loading: false,
      scoreLoading: false,
      tableHeadConfig: [
        {
          label: '序号',
          columnType: 'slot',
          slotName: 'index',
          width: 60,
          tooltip: true
        },
        {
          label: '学号',
          value: 'stuId',
          tooltip: true
        },
        {
          label: '姓名',
          value: 'stuName',
          tooltip: true
        },
        {
          label: '研究方向',
          value: 'stuOrient',
          tooltip: true
        },
        {
          label: '手机号',
          value: 'stuPhone',
          tooltip: true
        },
        {
          label: '课程成绩',
          columnType: 'slot',
          slotName: 'score',
          tooltip: true
        },

        {
          width: 100,
          label: '操作',
          columnType: 'slot',
          slotName: 'operation'
        }
      ],
      title: '课程成绩1',
      scoreTableData: [{
        stuId: '5243635',
        stuName: 'zzz',
        stuOrient: 'v那个i人过来',
        stuPhone: '13333333333',
        score: '8'
      }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      tableData: [{
        courseName: '昂贵的是'
      }, {
        courseName: '昂贵的是'
      }, {
        courseName: '昂贵的是'
      }]
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val
    }

  }
}
</script>

<style lang="scss" scoped>
.content_container {
  height: 100%;
  background: #fcfdfe;
  border-radius: 4px;

  #whole_container {
    display: flex;
    height: 100%;
    // padding: 24px 0;

    .aside_container {
      width: 18vw;
      min-width: 18vw;
      border: 1px solid #ecf0f8;
      border-radius: 4px;
      padding: 0px;
    }

    .el-main {
      display: flex;
      flex-direction: column;
      padding: 0;
      overflow-y: auto !important;
      scrollbar-gutter: stable; // 滚动条窗口抖动
    }
  }
}
</style>
