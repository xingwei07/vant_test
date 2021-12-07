<template>
  <div>
    <NavBar v-if="$route.meta.title" />
    <van-form @submit="onSubmit">
      <van-field
        name="userName"
        placeholder="请输入用户名"
        left-icon="manager"
        v-model="userName"
        :rules="userFormRules.userName"
      />
      <van-field
        name="userPwd"
        type="password"
        placeholder="请输入密码"
        left-icon="lock"
        v-model="password"
        :rules="userFormRules.userPwd"
      />
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Button, Toast } from 'vant'
import { login } from '@/modules'
import NavBar from '@/components/nav-bar/index'

export default {
  name: 'Login',
  components:{
    NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  data() {
    return {
      userName: '',
      password: '',
      userFormRules: {
        userName: [{required: true, message: '请输入用户名'}],
        userPwd: [
          {required: true, message: '请输入密码'},
          {pattern: /^\d{6}$/, message: '密码格式不正确'}
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      Toast.loading({
        message: '登录中...',
        forbidClick: true
      })
      const { data } = await login({userName: this.userName, password: this.password})
      if(data.code === 0) {
        Toast.success("用户登录成功");
        this.$store.commit('userStore/setUser', data)
        this.$router.push('/my')
      } else {
        Toast.fail(data.data.msg);
      }
    }
  }
}
</script>

<style scoped>
.page-nav-bar {
  background-color: #3296fa;
}
</style>