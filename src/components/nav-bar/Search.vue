<template>
  <van-nav-bar class="page-nav-bar" fixed>
    <template #right>
      <van-button
        type="info"
        size="small"
        round
        icon="search"
        class="search-button"
        >搜索</van-button
      >
    </template>
  </van-nav-bar>
</template>

<script>
import { NavBar, Button } from 'vant'

export default {
  name: 'Search',
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  }
}
</script>

<style scoped>
.page-nav-bar {
  background-color: #3296fa;
}
.home-container .search-button {
  color: #fff;
  height: 30px;
  width: 300px;
  background-color: #5babfb;
  border: none;
}
.van-nav-bar .van-icon {
  color: #fff;
}
</style>