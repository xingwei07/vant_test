<template>
  <div>
    <van-cell title="搜索历史">
      <span>全部删除</span>
      <span>取消</span>
      <van-icon name="delete"></van-icon>
    </van-cell>
    <van-cell title="hello">
      <van-icon name="close"></van-icon>
    </van-cell>
    <van-cell title="hello">
      <van-icon name="close"></van-icon>
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
  }
}
</script>

<style>
</style>