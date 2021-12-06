<template>
  <div>
    <div>文章列表组件</div>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>