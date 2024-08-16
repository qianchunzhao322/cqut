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
              <div class="title_content">系统访问量</div>
              <div class="page_title">数据总览</div>
            </div>
            <div class="data_contain">
              <div class="data"><span>{{ dataAnalysis && dataAnalysis.classmateConfirmNumber || 0 }}</span>次
              </div>
            </div>
          </div>
          <div class="data_item_footer">
            <div class="data_change icon_up">
              <i class="iconfont icon-chuizhijiantou" />
              <p>日新增 <span>{{ dataAnalysis && dataAnalysis.classmateConfirmTodayIncrease || 0 }}</span></p>
            </div>
            <div class="data_change icon_down">
              <i class="iconfont icon-chuizhijiantou" />
              <p>日减少 <span>{{ dataAnalysis && dataAnalysis.classmateConfirmTodayDecrease || 0 }}</span></p>
            </div>
          </div>
        </li>
        <li class="data_item">
          <div class="data_item_head">
            <div class="data_item_content">
              <div class="data">{{ dataAnalysis && dataAnalysis.classmateWaitConfirmNumber || 0 }}</div>
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
              <div class="data">{{ dataAnalysis && dataAnalysis.companyNumber || 0 }}</div>
              <div class="data_type">服务人次</div>
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
      <userInfo class="echart_container" item-title="用户信息" :item-data="userData" />
    </div>
  </div>
</template>

<script>
//   components
import userInfo from './components/userInfo.vue'
import noticeList from './components/noticeList.vue'
import lineChart from '@/components/dataAnalysis/lineChart/line.vue'

import { dataAnalysisSelectAll } from '@/api/index'
import { getInfo } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  name: 'DataAnalysis',
  components: {
    lineChart,
    userInfo,
    noticeList
  },
  data() {
    return {
      dataAnalysis: null,
      step: true,
      userData: null
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    // this.getAllHeaderData()
    this.init()
  },
  methods: {
    init() {
      this.getUserInfo()
    },
    getUserInfo() {
      getInfo(this.userInfo.id).then((res) => {
        this.userData = [
          { key: '姓名', value: res.data.realName },
          { key: '学号', value: res.data.userId },
          { key: '手机号', value: res.data.phoneNumber },
          { key: '身份证号', value: res.data.identityNumber }
        ]
        if (this.userInfo.id === 3) {
          this.userData.push({ key: '专业', value: res.data.majorId })
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
