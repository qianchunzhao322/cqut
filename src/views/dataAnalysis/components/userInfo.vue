<template>
  <div class="has_title_box">
    <div class="title_container">
      <div class="left_title">
        <img src="../../../assets/index/circle.png" alt="">
        <div class="title_content">{{ itemTitle }}</div>
      </div>
      <div class="right_title" />
    </div>
    <div class="content">
      <div v-for="(item, index) in itemData" :key="index" class="user_content">
        <div style="width: 27%; height: 100%;float: left;text-align: right;line-height: 33px;font-size:16px;">{{ item.key?item.key:'--' }}：</div>
        <div style="width: 73%; height: 100%;float: left;text-align: left;color: rgb(194, 87, 246);font-size: 20px;">{{ item.value?item.value:'--' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    itemTitle: {
      type: String,
      default: ''
    },
    itemData: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>
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
            color: #162C5B;
            font-weight: bold;
        }
    }

    .content {
        padding: 0 20px;
        height: calc(100% - 60px);
        .user_content{
          width: 100%;
          height: 36px;
          border-bottom: 1px solid rgb(218, 224, 247);
          &:last-child{
            border-bottom: none;
          }
        }
    }
}
</style>
