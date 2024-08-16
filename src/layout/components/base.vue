<template>
    <section class="base_container">
        <router-view />
    </section>
  </template>
  
  <script>
  export default {
    name: 'base',
    computed: {
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .base_container{
    width: 100%;
    height: 100%;
    .container{
        height: 100%;
    }
  }
  </style>
  