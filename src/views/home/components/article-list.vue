<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { List, Cell } from 'vant'

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    [List.name]: List,
    [Cell.name]: Cell
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 1. 发送异步请求获取数据
      setTimeout(() => {
        // 2. 获取到服务端返回的数据，将其填充到list数据
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 3. 本次数据加载完成后，要把加载状态设置为结束，loading设置为false以后，才能够触发下一次的加载更多的操作
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        // 4. 当数据全部加载完成后，把finished设置为true
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    }
  }
}
</script>

<style>

</style>