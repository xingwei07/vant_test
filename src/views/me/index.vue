<template>
  <div class="my-container">
    <div class="header no-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" />
        <span class="text">注册 / 登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.my-contaainer .header {
  height: 361px;
  /* background: ; */
  background-size: flex;
}
</style>