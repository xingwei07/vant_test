<template>
  <div>
    <van-cell 
      :key="article.id"
      :title="article.title"
      class="cell-list"
    />
  </div>
</template>

<script>
import { Cell } from 'vant'

export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  components: {
    [Cell.name]: Cell
  }
}
</script>

<style>
.cell-list {
  min-height: 100px;
}
</style>