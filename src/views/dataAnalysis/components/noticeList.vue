<!-- 消息队列 -->
<template>
  <div class="has_title_box">
    <div class="title_container">
      <div class="left_title">
        <img
          src="../../../assets/index/circle.png"
          alt=""
        >
        <div class="title_content">消息队列</div>
      </div>
      <div class="right_title" />
    </div>
    <div class="content">
      <Etable height="100%" :table-head-config="tableHeadConfig" :table-load-data="tableData" :list-loading="loading" align="left">
        <template slot="index" slot-scope="{ data }">
          <span>{{ data.$index + 1 }}</span>
        </template>
        <template slot="noticeDes" slot-scope="{ data }">
          <span>{{ data.row.noticeDes }}</span>
          <!-- <el-badge value="new" style="margin-top: 8px; margin-right: 50px;">
            <span>{{ data.row.noticeDes }}</span>
          </el-badge> -->
        </template>
        <template slot="operation" slot-scope="{ data }">
          <el-button type="text" size="small" @click="toInfo(data.row)"> 详情 </el-button>
          <el-button v-if="true" type="text" size="small" :disabled="userInfo.permissionCode==='1'||userInfo.permissionCode==='2'" style="color: #67C23A;" @click="getIt(data.row)"> 确认收到 </el-button>
          <el-button v-else type="text" size="small" :disabled="userInfo.permissionCode==='1'||userInfo.permissionCode==='2'" style="color: #9BA5BB;"> 已收到 </el-button>
        </template>
      </Etable>
    </div>
    <!-- 详情对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%" @closed="closeDialog('newFormRef')">
      <el-row :gutter="15">
        <el-form ref="newFormRef" :model="addForm">
          <el-col :span="22">
            <el-form-item label="发布时间：" prop="noticeDate" label-width="95px">
              <el-input v-model="addForm.noticeDate" placeholder="发布时间" disabled :maxlength="20" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="通知内容：" prop="noticeDes" label-width="95px">
              <el-input v-model="addForm.noticeDes" type="textarea" disabled placeholder="内容" :maxlength="20" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { noticeSelect, noticeGet } from '@/api/notice'
import { mapGetters } from 'vuex'
export default {
  name: 'NoticeList',
  components: {
  },
  data() {
    return {
      loading: false,
      tableData: [],
      tableHeadConfig: [
        {
          label: '序号',
          columnType: 'slot',
          slotName: 'index',
          width: 60,
          tooltip: true
        },
        {
          label: '通知内容',
          columnType: 'slot',
          slotName: 'noticeDes',
          // value: 'noticeDes',
          tooltip: true
        },
        {
          label: '通知发布时间',
          value: 'noticeDate',
          width: 150,
          tooltip: true
        },
        {
          width: 150,
          label: '操作',
          columnType: 'slot',
          slotName: 'operation'
        }
      ],
      title: '通知详情',
      dialogFormVisible: false,
      addForm: {
        noticeDate: '',
        noticeDes: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userRealId'])
  },
  mounted() {
    this.getNotice()
  },
  methods: {
    getNotice() {
      const params = { page: 1, pageSize: 100 }
      if (this.userInfo.permissionCode === '3') params.stuId = this.userRealId
      noticeSelect(params).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.records
        }
      })
    },
    toInfo(row) {
      this.dialogFormVisible = true
      this.addForm.noticeDate = row.noticeDate
      this.addForm.noticeDes = row.noticeDes
    },
    getIt(row) {
      const params = {
        noticeId: row.id,
        stuId: [this.userRealId]
      }
      noticeGet(params).then((res) => {
        if (res.code === 200) {
          this.$message.success('您已成功确认收到该通知！')
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.has_title_box {
  background: #fcfdfe;
  border-radius: 8px;
  border: 1px solid #ecf0f8;
  // padding: 20px 32px 0 32px;
  overflow: hidden;

  .title_container {
    display: flex;
    height: 60px;
    align-items: center;
    padding: 0 20px;
    // padding: 34px 32px 0 20px;
    justify-content: space-between;

    .left_title {
      display: flex;
      align-items: center;
    }

    img {
      width: 18px;
      height: 18px;
    }

    .title_content {
      margin-left: 10px;
      font-size: 16px;
      color: #162c5b;
      font-weight: bold;
    }
  }

  .content {
    padding: 0 0px;
    height: calc(100% - 60px);
  }
}
</style>
