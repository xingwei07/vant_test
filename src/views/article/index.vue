<template>
  <div @click="aa">文章详情</div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  methods: {
    aa () {
      console.log(this.articleId)
    }
  }
}
</script>

<style>
</style>