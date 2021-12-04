<template>
  <van-nav-bar :title="title" class="page-nav-bar" />
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'NavBar',
  components:{
    [NavBar.name]: NavBar
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
</style>