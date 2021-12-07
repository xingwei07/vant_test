<template>
  <div class="home-container">
    <Search />
    <van-tabs 
      class="channels-tabs"
      v-model="active"
      title-active-color="red"
      line-width="20px"
      line-height="6px"
    >
      <van-tab 
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <ArticleList :channel="channel" />
      </van-tab>
      <template #nav-right>
        <i class="placeholder"></i>
        <van-icon name="wap-nav" class="hamburger-btn"></van-icon>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab, Icon } from 'vant'
import Search from '@/components/nav-bar/Search'
import { getUserChannels } from '@/modules/index'
import ArticleList from './components/article-list'

export default {
  name: 'Home',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Icon.name]: Icon,
    Search,
    ArticleList
  },
  data() {
    return {
      active: 0,
      channels: []
    }
  },
  mounted() {
    this.getUserChannels()
  },
  methods: {
    async getUserChannels() {
      const { data } = await getUserChannels()
      this.channels.push(...data.data)
    }
  }
}
</script>

<style>
.channels-tabs .van-tab {
  min-width: 120px;
  border-right: 1px solid #edeff3;
  font-size: 16px;
  color: #777;
}
.channels-tabs .van-tabs__line {
  background-color: #3296fa;
}
.channels-tabs .hamburger-btn {
  /* 固定定位 */
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 32px;
  background-color: #fff;
  /* 设置透明度 */
  opacity: 0.902;
  /* 设置图标大小 */
  font-size: 23px;
}
.channels-tabs .placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 32px;
}
.channels-tabs .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 1;
}
.home-container {
  padding-bottom:50px;
}
</style>