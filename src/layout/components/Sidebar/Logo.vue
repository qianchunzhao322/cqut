<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img src="../../../assets/sidebar/logo.png" class="sidebar-logo-small">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="../../../assets/sidebar/logo.png" class="sidebar-logo">
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
#app{
  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 175px;
    line-height: 175px;
    background: #F1F5FB;
    text-align: center;
    overflow: hidden;
  
    & .sidebar-logo-link {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
  
      & .sidebar-logo {
        width: 88px;
        height: 88px;
        vertical-align: middle;
      }
      & .sidebar-logo-small{
        width: 55px;
        height: 55px;
        vertical-align: middle;
      }
  
      & .sidebar-title {
        display: inline-block;
        margin: 0;
        color: #fff;
        font-weight: 600;
        line-height: 50px;
        font-size: 14px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
      }
    }
  
    &.collapse {
      .sidebar-logo {
        margin-right: 0px;
      }
    }
  }
}
</style>
