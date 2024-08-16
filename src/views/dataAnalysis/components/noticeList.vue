<!-- 消息队列 -->
<template>
  <div class="has_title_box">
    <div class="title_container">
      <div class="left_title">
        <img src="../../../assets/index/circle.png"
             alt="">
        <div class="title_content">消息队列</div>
      </div>
      <div class="right_title">
      </div>
    </div>
    <div class="content">
      <el-table :data="tableData" stripe height="100%" style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="address" label="消息">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getClassmateInfo } from '@/api/index'
export default {
  name: "NoticeList",
  components: {
  },
  computed: {
  },
  data () {
    return {
      tableData: [{
        address: '各位同学注意：光信息实验课于7/7日改为线上教学，望周知！！'
      },{},{},{},{},{}]
    }
  },
  mounted () {
    // this.getClassmateInfomation();
  },
  methods: {
    handleClick () { },
    updateAlumniInfo () {
      this.showResult = false;
      this.currentPage = (this.currentPage) % this.totalPages + 1
      this.getClassmateInfomation()
    },
    getClassmateInfomation () {
      // this.showTipContent = 'loading'
      this.$startLoading('alumni_status_container')
      this.classmateInfo = []
      getClassmateInfo(this.postParams).then((res) => {
        if (res.success)
        {
          const { list, currentPage, totalElements } = res.data
          let totalPages = Math.floor(totalElements / this.pageSize)
          if (list?.length)
          {
            this.classmateInfo = list
            this.totalPages = totalPages
          } else
          {
            this.classmateInfo = []
          }
          this.step = this.classmateInfo.length > 5
        }
      }).finally(() => {
        this.showResult = true;
        this.$closeLoading('alumni_status_container')
      })
    },
  },
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