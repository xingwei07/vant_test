<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import NavBar from '@/components/NavBar/index'
import { Toast } from 'vant'

export default {
  name: 'App',
  components: {
    [Toast.name]: Toast
    // NavBar
  },
  data () {
    return {
      undeTab: ['/qa', '/video', '/my']
    }
  },
  mounted () {
    this.$store.dispatch('h5plus/initPlus').then(() => {
      const plus = window.plus
      const webview = plus.webview.currentWebview()
      let first = null
      plus.key.addEventListener('backbutton', () => {
        webview.canBack((e) => {
          if (e.canBack) {
            webview.back()
          } else {
            // 首页返回键处理
            // 处理逻辑：1秒内，连续两次按返回键，则退出应用；

            // 首次按键，提示‘再按一次退出应用’
            if (!first) {
              first = new Date().getTime()
              if (this.$route.path === '/' || this.undeTab.indexOf(this.$route.path) !== -1) {
                Toast('再按一次退出应用')
              }
              setTimeout(() => {
                first = null
              }, 1500)
            } else {
              if (new Date().getTime() - first < 1500 && (this.$route.path === '/' || this.undeTab.indexOf(this.$route.path) !== -1)) {
                plus.runtime.quit()
              }
            }
          }
        })
      })
      plus.push.getClientInfoAsync((info) => {
        localStorage.setItem('MOBILE_MAC', info.clientid)
        console.log(JSON.stringify(info))
      }, (e) => {
        console.log(JSON.stringify(e))
      })
    })
  }
}
</script>

<style>
</style>