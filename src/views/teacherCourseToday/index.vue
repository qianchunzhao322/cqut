<template>
  <!-- 今日课程 -->
  <base-layout header-height="0">
    <template slot="main">
      <div class="content_container whole_container">
        <div id="whole_container">
          <!-- aside 课程 -->
          <div class="aside_container">
            <div class="header">
              课程
              <el-button v-show="courseList && courseList.length" style="position: absolute;top: 12px;right: 6px;" size="small" type="primary">下载今日课程</el-button>
            </div>
            <div class="cards">
              <div v-if="courseList && courseList.length" style="width: 100%; height: 100%;">
                <div v-for="item in courseList" :key="item.courseId" class="card">
                  课程名称： {{ item.courseName }}<br>
                  上课时间： {{ item.courseInterval }}<br>
                  上课地点： {{ item.courseSite }}<br>
                  学生数量： {{ item.courseStudentNum }}/{{ item.courseLimit }}<br>
                  <img src="@/assets/class.png">
                </div>
              </div>
              <EmptyCom v-else />
            </div>
          </div>

          <!-- right 日历 -->
          <div class="el-main">
            <el-calendar v-model="value" style="height: 100%;">
              <template slot="dateCell" slot-scope="{date, data}">
                <p :class="data.isSelected ? 'is-selected' : ''">
                  {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}
                </p>
              </template>
            </el-calendar>
          </div>
        </div>
      </div>
    </template>
  </base-layout>
</template>

<script>
// components
import EmptyCom from '@/components/EmptyCom'
// api
import { getSearchList } from '@/api/alumniInfomation/index'
export default {
  name: 'TeacherCourseTodayIndex',
  components: {
    EmptyCom
  },
  data() {
    return {
      value: '2024-7-29',
      loading: false,
      courseList: [{
        courseId: '12223',
        courseName: '光信息科学与技术',
        courseInterval: '12:22-14:33',
        courseSite: '实验楼A111',
        courseLimit: '25',
        courseStudentNum: '22'
      }, {}, {}, {}, {}, {}]
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {

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

      .header{
        position: relative;
        height: 52px;
        width: 100%;
        border-bottom: 1px rgb(233, 233, 233) solid;
        font-size: 18px;
        line-height: 52px;
        padding-left: 10px;
        color: rgb(36, 136, 255);
      }
      .cards{
        width: 100%;
        height: calc(100% - 52px);
        padding: 5px;
        overflow-y: auto !important;
        scrollbar-gutter: stable; // 滚动条窗口抖动
        .card{
          position: relative;
          width: 100%;
          height: 140px;
          line-height: 26px;
          border: 1px rgb(233, 233, 233) solid;
          background-color: #fff;
          border-radius: 4px;
          padding-top: 16px;
          padding-left: 10px;
          margin-bottom: 6px;
          transition: all 300ms linear;
          &:hover{
            box-shadow:  3px 3px 12px #bebebe,
             -3px -3px 12px #ffffff;
          }
          img{
            height: 60px;
            width: 60px;
            position: absolute;
            right: 10px;
            bottom: 16px;
          }
        }
      }
    }

    .el-main {
      // display: flex;
      // flex-direction: column;
      padding: 0;
      // overflow-y: auto !important;
      // scrollbar-gutter: stable; // 滚动条窗口抖动
      .is-selected {
    color: #1989FA;
  }
    }
  }
}
</style>
