<template>
  <van-nav-bar :title="title" class="page-nav-bar">
    <template #left>
      <van-icon name="cross" size="18" @click="$router.back()" />
    </template>
  </van-nav-bar>
</template>

<script>
import { NavBar, Icon } from 'vant'

export default {
  name: 'NavBar',
  components:{
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  computed: {
    title(){
      return this.$route.meta.title
    }
  }
}
</script>

<style scoped>
  .page-nav-bar {
    background-color: #3296fa;
  }

  .page-nav-bar .van-nav-bar__title {
    color: white;
  }
  .page-nav-bar .van-icon {
    color: #fff;
  }
</style>