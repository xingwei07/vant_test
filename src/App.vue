<template>
  <div>
    <NavBar v-if="$route.meta.title" />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
import NavBar from '@/components/NavBar/index'

export default {
  name: 'App',
  components: {
    NavBar
  },
  mounted(){
    console.log(this.$store.state.userStore.user)
  }
}
</script>

<style>

</style>