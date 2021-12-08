<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshText"
      success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad(channel.id)"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem 
          v-for="article in channels"
          :key="article.id"
          class="cell-list"
          :article="article"
        />
        <van-empty v-if="channels.length === 0" name="notes-o" description="暂无记录" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { List, PullRefresh, Empty } from 'vant'
import { getArticles } from '@/modules/index'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true,
      error: false
    }
  },
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Empty.name]: Empty,
    ArticleItem
  },
  data() {
    return {
      channels: [],
      loading: false,
      finished: false,
      pageSize: 10,
      pageNum: 1,
      error: false,
      isLoading: false,
      refreshText: ""
    }
  },
  mounted() {
    this.isLoading = true //默认展示下拉动作，实际加载数据由onload执行
  },
  methods: {
    onLoad() {
      this.error = false
      this.getListAll(this.channel.id)
    },
    onRefresh() {
      this.error = false //清除加载失败提示
      this.channels = []
      this.pageNum = 1
      this.getListAll(this.channel.id)
    },
    async getListAll(id){
      try {
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
          this.pageNum++
          this.loading = false // 重置加载状态，才能够触发下一次加载
          this.isLoading = false // 重置下拉刷新状态
          this.finished = false // 第一次通过上划将列表加载完毕后finished为true，此时通过下拉刷新无法加载第二页
          this.refreshText = '刷新成功'
        } else {
          // 4. 当数据全部加载完成后，把finished设置为true
          this.loading = false // 重置上划加载状态，否则会一直显示加载中
          this.finished = true // 数据全部加载后，把finished设置为true
          this.isLoading = false // 重置下拉刷新状态，否则会一直显示加载中
        }
      } catch (error) {
        this.refreshText = "请求失败"
        this.isLoading = false // 重置上划加载状态，否则会一直显示加载中
        this.error = true //显示失败提示
        this.loading = false // 重置上划加载状态，否则会一直显示加载中
      }
    }
  }
}
</script>

<style scoped>
.article-list {
  margin-top: 80px;
  height: 530px;
  overflow-y: auto;
}
</style>