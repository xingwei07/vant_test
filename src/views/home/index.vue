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
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
      <van-tab title="标签 6">内容 6</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vant'
import Search from '@/components/NavBar/Search'

export default {
  name: 'Home',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    Search
  },
  data() {
    return {
      active: 2,
    };
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
</style>