<template>
  <div class="h-[100%] flex items-center justify-center">
    <div class="text-center">
      <img class="w-[300px]" src="@/assets/404_images/noData.png" alt="">
      <span class="text-[#7d87a0] text-[16px]">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Emptycom',
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
