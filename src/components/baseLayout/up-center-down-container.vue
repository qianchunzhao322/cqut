<template>
  <el-container class="wrap content">
    <el-header
      :height="headerHeight"
      :class="{ header_bottom_line: headerBottomLine }"
    >
      <slot name="header" />
    </el-header>
    <el-main class="inhert_main">
      <slot name="main" />
    </el-main>
    <el-footer
      :height="footerHeight"
      :class="{ pageFoot: pageFoot }"
    >
      <div class="inhert_footer">
        <slot name="footer" />
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  props: {
    headerHeight: {
      type: String,
      default: 'auto'
    },
    footerHeight: {
      type: String,
      default: '74px'
    },
    headerBottomLine: {
      type: Boolean,
      default: false
    },
    pageFoot: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header{
  position: relative;
  // padding: 24px 0;
  /* min-height: 60px; */
}
.el-main{
  padding: 0 20px;
}
.wrap{
  height: calc(100% - 53px);
}
.inhert_main {
  display: flex;
  flex-direction: column;
  height: inherit;
  background-color: transparent;
  // padding: 0;
  padding: 0 20px;
  // overflow: hidden;
  .el-table{
    flex: 1;
  }
  .foot_row{
    text-align: center;
  }
  /* margin-top: 10px; */
  /* overflow: hidden; */
}
.inhert_footer {
  width: 100%;
  padding: 0;
  text-align: center;
}
</style>
