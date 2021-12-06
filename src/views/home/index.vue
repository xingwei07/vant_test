<template>
  <div class="home-container">
    <Search />
    首页
  </div>
</template>

<script>
// import { NavBar, Button } from 'vant'
import Search from '@/components/NavBar/Search'

export default {
  name: 'Home',
  components: {
    // [NavBar.name]: NavBar,
    // [Button.name]: Button
    Search
  }

}
</script>

<style scoped>

</style>