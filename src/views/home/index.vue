<template>
  <div class="home-container">
    <Search />
    <van-tabs
      class="channels-tabs"
      v-model="active"
      title-active-color="red"
      line-width="20px"
      line-height="6px"
      swipe-threshold="3"
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
        <van-icon
          name="wap-nav"
          class="hamburger-btn"
          @click="isChannelEditShow = true"
        ></van-icon>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        :myChannels="channels"
        :active="active"
        @updata-active="onUpdateActive"
      />
    </van-popup>
  </div>
</template>

<script>
import { Tabs, Tab, Icon, Popup } from 'vant'
import Search from '@/components/nav-bar/Search'
import { getUserChannels } from '@/modules/index'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'

export default {
  name: 'Home',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    Search,
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  mounted () {
    this.getUserChannels()
  },
  methods: {
    // 获取用户频道列表
    async getUserChannels () {
      const user = this.$store.state.userStore.user
      if (user) {
        // 已登录，查询数据
        const params = {
          userName: user.data.userName
        }
        const { data } = await getUserChannels(params)
        this.channels.push(...data.data)
      } else {
        // 未登录，获取缓存
        const data = getItem('TOUTIAO_CHANNELS')
        if (data) {
          this.channels.push(...data)
        } else {
          // 获取不到缓存
          const params = {
            userName: ""
          }
          const { data } = await getUserChannels(params)
          this.channels.push(...data.data)
        }
      }
    },
    // 切换频道
    onUpdateActive (active, status = false) {
      this.active = Number(active)
      this.isChannelEditShow = status
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
  padding-bottom: 50px;
}
</style>
