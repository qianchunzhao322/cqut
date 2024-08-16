<template>
  <div class="base_info_value" :title="content">
    {{ content || defaultSettings.defaultTableEmptyText }}
    <copy-icon v-if="item.copyabled && content.length" :target-value="content" />
  </div>
</template>

<script>
export default {
  name: 'BaseInfoValue',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    unitDetail: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    content() {
      let content = ''
      const { name } = this.item
      content = this.unitDetail[name] || ''
      return content
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
