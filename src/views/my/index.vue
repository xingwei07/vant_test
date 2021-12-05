<template>
  <div class="my-container">
    <!-- 未登录 -->
    <div v-if="!user" class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="../../assets/user.png" />
        <span class="text">注册 / 登录</span>
      </div>
    </div>
    <!-- 已登录 -->
    <div v-else class="header user-info">
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
    <!-- 导航 -->
    <van-grid :column-num="2" clickable>
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" />
    </van-grid>
    <!-- 消息通知与退出登录布局 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell v-if="user" @click="onLogout" title="退出登录" class="layout-cell" />
  </div>
</template>

<script>
import { Image, Button, Grid, GridItem, Cell, Dialog } from 'vant'
export default {
  name: 'My',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Cell.name]: Cell,
    [Dialog.name]: Dialog
  },
  computed: {
    user() {
      return this.$store.state.userStore.user
    }
  },
  methods: {
    //退出登录
    onLogout() {
      Dialog.confirm({
        title: '是否确认退出'
      }).then(() => {
        this.$store.commit('userStore/setUser', null)
      }).catch(()=> {
        console.log('取消操作')
      });
    }
  }
}
</script>

<style>
.my-container .header {
  height: 261px;
  background: skyblue;
  background-size: cover;
}
.my-container .not-login {
  /* 没有登录的效果样式 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.my-container .not-login .login-btn {
  display: flex;
  flex-direction: column;
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
.user-info .left .name {
  font-size: 16px;
  color: #fff;
}
.user-info .data-stats {
  display: flex;
}
.user-info .data-stats .data-item {
  height: 130px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.user-info .data-stats .count {
  font-size: 18px;
}
.user-info .data-stats .text {
  font-size: 18px;
}
.van-grid-item__icon {
  color: #eb5253;
}
.layout-cell {
  text-align: center;
  color: #d86262;
  height: 120px;
  margin-top: 9px;
}
</style>