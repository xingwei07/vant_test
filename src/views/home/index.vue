<template>
  <div class="home-container">
    <Search />
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
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

<style scoped>

</style>