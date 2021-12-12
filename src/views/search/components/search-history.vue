<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template #default>
        <div v-if="isDeleteShow">
          <span @click="delHistory(0)">全部删除</span>
          <span @click="isDeleteShow = false">完成</span>
        </div>
        <van-icon v-else @click="isDeleteShow = true" name="delete"></van-icon>
      </template>
    </van-cell>
    <van-cell
      v-for="(history, index) in searchHistories"
      :key="index"
      :title="history"
      @click="delHistory(history, index)"
    >
      <van-icon name="close" v-if="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
import { Cell, Icon } from 'vant'

export default {
  name: 'SearchHistory',
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon
  },
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    delHistory (history, index) {
      if (this.isDeleteShow) {
        // 删除历史记录
        if (history) {
          // 删除一个
          this.searchHistories.splice(index, 1)
        } else {
          // 全部删除
          this.searchHistories = []
        }
      } else {
        // 跳转搜索
        this.$emit('onSearch', history)
      }
    }
  }
}
</script>

<style>
.search-history span {
  padding-left: 10px;
}
</style>