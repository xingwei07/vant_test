<template>
  <van-nav-bar class="page-nav-bar" fixed>
    <template #title>
      <van-button
        type="info"
        size="small"
        round
        icon="search"
        class="search-button"
        to="/search"
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

<style>
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

.page-nav-bar .van-nav-bar__title {
  max-width: 100%;
}

.van-nav-bar .van-icon {
  color: #fff;
}
</style>