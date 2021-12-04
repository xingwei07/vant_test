<template>
  <div class="my-container">
    <div class="header no-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" />
        <span class="text">注册 / 登录</span>
      </div>
    </div>
    <div class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            src="http://img.yzcdn.cn/vant/cat.jpeg"
            class="avatar"
            round
            fit="cover"
          ></van-image>
          <span class="name">博学谷头条号</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">头条</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Button } from 'vant'
export default {
  name: 'NavBar',
  components: {
    [Image.name]: Image,
    [Button.name]: Button
  }
}
</script>

<style scoped>
.my-container .header {
  height: 361px;
  background: skyblue;
  background-size: cover;
}
.my-container .not-login {
  /* 没有登录的效果样式 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.my-contaainer .not-login .login-btn {
  display: flex;
  flex-direction: colums;
  justify-content: center;
  align-items: center;
}
.mobile-img {
  width: 132px;
  height: 132px;
  margin-bottom: 15px;
}
.text {
  font-size: 18px;
  color: #fff;
}
.user-info .base-info {
  height: 131px;
  padding: 70px 32px 23px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-info .left {
  display: flex;
  align-items: center;
}
.user-info .left .avatar {
  width: 132px;
  height: 132px;
  margin-right: 13px;
  border: 1px solid #fff;
}
</style>