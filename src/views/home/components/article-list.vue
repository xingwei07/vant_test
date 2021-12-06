<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad(channel.id)"
    >
      <van-cell v-for="channel in channels" :key="channel.id" :title="channel.title" />
    </van-list>
  </div>
</template>

<script>
import { List, Cell } from 'vant'
import { getArticles } from '@/modules/index'

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
      channels: [],
      loading: false,
      finished: false,
      pageSize: 10,
      pageNum: 1
    }
  },
  methods: {
    onLoad(id) {
      this.getListAll(id)
    },
    async getListAll(id){
      //请求参数
      const params = {
        channel_id: id,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      // 1. 发送异步请求获取数据
      const { data } = await getArticles(params)
      if(data.status) {
        // 2. 获取到服务端返回的数据，将其填充到channels
        this.channels.push(...data.data)
        // 3. 本次数据加载完成后，要把加载状态设置为结束，loading设置为false以后，才能够触发下一次的加载更多的操作
        this.loading = false
        this.pageNum++
      } else {
        // 4. 当数据全部加载完成后，把finished设置为true
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>