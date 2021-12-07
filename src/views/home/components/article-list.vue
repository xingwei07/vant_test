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
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { List, PullRefresh } from 'vant'
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
  methods: {
    onLoad() {
      this.getListAll(this.channel.id)
    },
    onRefresh() {
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
          this.loading = false
          this.pageNum++
          this.isLoading = false
          this.refreshText = '刷新成功'
        } else {
          // 4. 当数据全部加载完成后，把finished设置为true
          this.finished = true
          this.isLoading = false
        }
      } catch (error) {
        this.isLoading = false
        this.refreshText = "请求失败"
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* .cell-list {
  min-height: 100px;
} */
.article-list {
  margin-top: 80px;
  height: 530px;
  overflow-y: auto;
}
</style>