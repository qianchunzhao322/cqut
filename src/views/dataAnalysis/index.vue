<template>
  <div class="container data_analysis_container">
    <div class="data_analysis_content">
      <div class="map_container has_title_box">
        <div class="title_container">
          <div class="left_title">
            <img src="../../assets/index/circle.png" alt="">
            <div class="title_content">系统访问量</div>
          </div>
          <div class="right_title" />
        </div>
        <div class="content">
          <lineChart />
        </div>
      </div>

      <ul class="data_list">
        <li class="data_item custom_data_item">
          <div class="data_item_head">
            <div class="data_item_content">
              <div class="title_content">系统总访问量</div>
              <div class="page_title">数据总览</div>
            </div>
            <div class="data_contain">
              <div class="data"><span>{{ visitNumber || 0 }}</span>次
              </div>
            </div>
          </div>
          <div class="data_item_footer">
            <div class="data_change icon_up">
              <i class="iconfont icon-chuizhijiantou" />
              <p>日新增 <span>{{ visitTodayUp || 0 }}</span></p>
            </div>
            <div class="data_change icon_down">
              <i class="iconfont icon-chuizhijiantou" />
              <p>日减少 <span>{{ visitTodayDown || 0 }}</span></p>
            </div>
          </div>
        </li>
        <li class="data_item">
          <div class="data_item_head">
            <div class="data_item_content">
              <div class="data">{{ stuNumber || 0 }}</div>
              <div class="data_type">系统学生数量</div>
            </div>
            <div class="data_item_avatar">
              <i class="iconfont icon-bianzu2 avatar" />
            </div>
          </div>
        </li>
        <li class="data_item">
          <div class="data_item_head">
            <div class="data_item_content">
              <div class="data">{{ optNumber || 0 }}</div>
              <div class="data_type">操作人次</div>
            </div>
            <div class="data_item_avatar">
              <i class="iconfont icon-suoshudanwei avatar" />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="data_analysis_footer">
      <noticeList class="alumni_info_container" />
      <userInfo v-if="userInfo.permissionCode === '1'" class="echart_container" item-title="用户信息" :item-data="userData" />
      <comment v-else class="echart_container" :comments="commentData" @getData="getItem" />
    </div>
  </div>
</template>

<script>
import userInfo from './components/userInfo.vue'
import noticeList from './components/noticeList.vue'
import comment from './components/comment.vue'
import lineChart from '@/components/dataAnalysis/lineChart/line.vue'
import { sysInfoSelect } from '@/api/systemSettings/sysOpt'
import { getComment } from '@/api/comment'

import { dataAnalysisSelectAll } from '@/api/index'
import { getInfo } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  name: 'DataAnalysis',
  components: {
    lineChart,
    userInfo,
    noticeList,
    comment
  },
  data() {
    return {
      visitNumber: null,
      optNumber: null,
      stuNumber: null,
      dataAnalysis: null,
      visitTodayUp: null,
      visitTodayDown: null,
      step: true,
      userData: null,
      commentData: []
      // commentData: {
      //   status: '成功',
      //   code: 200,
      //   data: [
      //     {
      //       id: 'comment0001', // 评论id
      //       commentDate: '2018-07-05 08:30', // 评论时间
      //       ownerId: 'stu01', // 学生的id
      //       userId: 'stu01', // 学生id
      //       userName: '犀利的评论家', // 学生姓名
      //       objectId: 'tea01', // 被评论者id-被评论的教师ID
      //       content: '非常靠谱的程序员', // 评论内容
      //       reply: [ // 回复，或子评论
      //         {
      //           id: '34523244545', // 评论id
      //           commentId: 'comment0001', // 父评论id，即父亲的id
      //           fromId: 'tea01', // 评论者id-教师Id
      //           fromName: '夕阳红', // 评论者昵称-教师姓名
      //           toId: 'stu01', // 被评论者id-被评论的学生ID
      //           toName: '犀利的评论家', // 被评论者昵称-被评论的学生姓名
      //           content: '赞同，很靠谱，水平很高', // 评论内容
      //           commentDate: '2018-07-05 08:35' // 评论时间
      //         },
      //         {
      //           id: '34523244544',
      //           commentId: 'comment0001',
      //           fromId: 'stu01',
      //           fromName: '犀利的评论家',
      //           toId: 'tea01',
      //           toName: '夕阳红',
      //           content: '大神一个！',
      //           commentDate: '2018-07-05 08:50'
      //         }
      //       ]
      //     },
      //     {
      //       id: 'comment0002',
      //       commentDate: '2018-07-05 08:30',
      //       ownerId: 'talents100020',
      //       fromId: 'errhefe232213',
      //       fromName: '毒蛇郭德纲',
      //       content: '从没见过这么优秀的人',
      //       reply: []
      //     },
      //     {
      //       id: 'comment0003',
      //       commentDate: '2018-07-05 08:30',
      //       ownerId: 'talents100020',
      //       fromId: 'errhefe232213',
      //       fromName: '毒蛇郭德纲',
      //       content: '从没见过这么优秀的人',
      //       reply: []
      //     }
      //   ]
      // }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userRealId'])
  },
  mounted() {
    // this.getAllHeaderData()
    this.init()
  },
  methods: {
    init() {
      this.getUserInfo()
      this.getSysInfo()
      this.getItem()
    },
    // 获取评论
    getItem() {
      const params = { page: 1, pageSize: 100 }
      // if(this.userInfo.permissionCode === 2){
      //   params.userId= this.userRealId,
      // }
      this.userInfo.permissionCode === '2' ? params.objectId = this.userRealId : params.userId = this.userRealId
      getComment(params).then((res) => {
        if (res.code === 200) {
          this.commentData = res.data.records
        }
      })
    },
    getSysInfo() {
      sysInfoSelect().then((res) => {
        if (res.code === 200) {
          this.stuNumber = res.data[0].stuNumber
          this.visitNumber = res.data[0].visitNumber
          this.optNumber = res.data[0].optNumber
          res.data[0].visitTodayDiff > 0 ? this.visitTodayUp = res.data[0].visitTodayDiff : this.visitTodayDown = res.data[0].visitTodayDiff
        }
      })
    },
    getUserInfo() {
      getInfo(this.userInfo.id).then((res) => {
        this.userData = [
          { key: '姓名', value: res.data.realName },
          { key: '手机号', value: res.data.phoneNumber },
          { key: '身份证号', value: res.data.identityNumber }
        ]
        if (this.userInfo.permissionCode === '1') {
          this.userData.splice(1, 0, { key: '编号', value: res.data.userId })
        }
        if (this.userInfo.permissionCode === '2') {
          this.userData.splice(1, 0, { key: '教师号', value: res.data.userId })
        }
        if (this.userInfo.permissionCode === '3') {
          this.userData.splice(1, 0, { key: '学号', value: res.data.userId })
          // this.userData.push({ key: '专业', value: res.data.majorId })
        }
      })
    },
    getAllHeaderData() {
      dataAnalysisSelectAll().then((res) => {
        this.dataAnalysis = res.data
      })
    },
    drilling(value, chart) {
      console.log(value, chart)
    }
  }
}
</script>

  <style lang="scss" scoped>
  .data_analysis_container {
    .has_title_box {
      background: #FCFDFE;
      border-radius: 8px;
      border: 1px solid #ECF0F8;
      // padding: 20px 32px 0 32px;
      overflow: hidden;

      .title_container {
        display: flex;
        height: 60px;
        align-items: center;
        padding: 0 20px;
        // padding: 34px 32px 0 20px;
        justify-content: space-between;
        .left_title{
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
          color: #162C5B;
          font-weight: bold;
        }
      }

      .content {
        padding: 0 20px;
        height: calc(100% - 60px);
      }
    }

    .data_analysis_content {
      display: flex;
      width: 100%;
      height: 55%;

      .map_container {
        flex: 2.5;
        height: 100%;
      }

      .data_list {
        flex: 1;
        display: flex;
        height: 100%;
        margin-left: 16px;
        flex-direction: column;

        .data_item {
          flex: 1;
          height: 100%;
          padding: 0 32px;
          background: #FCFDFE;
          border-radius: 8px;
          border: 1px solid #ECF0F8;
          display: flex;
          flex-direction: column;

          &:not(:first-child) {
            margin-top: 16px;
          }

          &:nth-child(2) {
            .avatar {
              color: #2488FF;
            }
          }

          &:nth-child(3) {
            .avatar {
              color: #7C54F4;
            }
          }

          .data_item_head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex: 1;

            .data_item_content {
              .title_content {
                font-size: 20px;
                color: #FFFFFF;
                font-weight: bold;
              }

              .page_title {
                font-size: 14px;
                color: #FFFFFF;
              }

              .data {
                font-size: 32px;
                color: #162C5B;
                font-weight: 100;
                font-family: DINEngschrift;
              }

              .data_type {
                font-size: 14px;
                color: #9BA5BB;
                margin-top: 6px;
              }
            }

            .data_item_avatar {

              background: #FFFFFF;
              box-shadow: 0px 7px 10px 0px #EEF5FB;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 88px;
              height: 88px;

              .avatar {
                font-size: 36px;
              }
              .icon-suoshudanwei{
                font-size: 46px;
              }
            }
          }

          .data_item_footer {
            display: flex;
            height: 32px;
            font-size: 12px;

            .data_change {
              margin-right: 24px;
              font-size: 12px;
              display: flex;
              align-items: center;
              margin-bottom: 30px;

              &.icon_up {
                .iconfont {
                  background-color: #E6F5DF;
                  color: #67C23A;
                }

                p {
                  color: #67C23A;
                }
              }

              &.icon_down {
                .iconfont {
                  background-color: #F8D8D9;
                  color: #ED6363;
                  transform: rotate(180deg);
                }

                p {
                  color: #ED6363;
                }
              }

              .iconfont {
                display: inline-block;
                width: 14px;
                height: 14px;
                font-size: 9px;
                border-radius: 50%;
                text-align: center;
                line-height: 14px;
                margin-right: 8px;
              }
            }
          }
        }

        .custom_data_item {
          color: #FFFFFF;
          background-image: url('../../assets/index/item_bg.png');
          background-repeat: no-repeat;
          background-size: cover;
          border-radius: 14px;

          .data_item_head {
            .data_item_content {
              .page_title {
                margin-top: 6px;
              }
            }

            .data_contain {
              .data {
                font-size: 12px;

                span {
                  font-weight: 100;
                  font-size: 50px;
                  margin-right: 11px;
                  font-family: DINEngschrift;
                }
              }
            }
          }

          .data_item_footer {
            .data_change {
              p {
                color: #FFFFFF !important;
              }
            }
          }
        }
      }
    }

    .data_analysis_footer {
      display: flex;
      height: 40%;
      margin-top: 16px;

      .alumni_info_container {
        flex: 2.5;
      }

      .echart_container {
        flex: 1;
        margin-left: 16px;
      }
    }
  }</style>
