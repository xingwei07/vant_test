<template>
  <div class="article-container">
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="博学谷头条"
      @click-left="$router.back()"
    ></van-nav-bar>

    <div class="main-wrap">
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>

      <div class="article-detail" v-else-if="article.title">
        <h1 class="article-title">{{ article.title }}</h1>

        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          ></van-image>
          <template #title class="user-name">{{ article.aut_name }}</template>
          <template #label class="publish-date">{{ pubdate }}</template>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            >关注</van-button
          >
        </van-cell>

        <div
          class="article-content"
          v-html="article.content"
          ref="articleContent"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>

      <div class="error-wrap" v-else-if="errStatus">
        <van-icon name="failure"></van-icon>
        <p class="text">该资源不存在或已删除！</p>
      </div>

      <div class="error-wrap" v-else>
        <van-icon name="failure"></van-icon>
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="onLoad">点击重试</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Loading, Cell, Image, Button, Divider, Icon, ImagePreview } from 'vant'
import dayjs from '@/utils/day'
import { getArticleById } from '@/modules/index'

export default {
  name: 'Article',
  props: {
    articleId: {
      // type: String,
      required: true
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Loading.name]: Loading,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Button.name]: Button,
    [Divider.name]: Divider,
    [Icon.name]: Icon
  },
  data () {
    return {
      article: {
        id: "",
        title: "",
        photo: "",
        aut_name: "",
        pubdate: "",
        content: ""
      },
      loading: true,
      errStatus: 0
    }
  },
  computed: {
    pubdate () {
      return dayjs().to(dayjs(this.article.pubdate))
    }
  },
  mounted () {
    this.getListAll()
  },
  methods: {
    // 加载数据
    async getListAll () {
      try {
        const { data } = await getArticleById({ articleId: this.articleId })
        console.log(data)
        if (data.status) {
          this.article = data.data
          // 加入队列，等待页面渲染完成后再执行
          setTimeout(() => {
            // 获取所有img标签
            const imgs = this.$refs.articleContent.querySelectorAll('img')
            const images = []
            imgs.forEach((img, index) => {
              images.push(img.src)
              // 添加点击事件
              img.onclick = () => {
                ImagePreview({
                  images,
                  startPosition: index, // 初始位置
                })
              }
            })
          }, 0)
        } else {
          this.errStatus = true
        }
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    // 重新加载
    onLoad () {
      this.loading = true
      this.getListAll()
    }
  }
}
</script>

<style>
.page-nav-bar {
  background-color: #3296fa;
}
.page-nav-bar .van-icon {
  color: #fff;
}
.article-container .main-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 40px;
  overflow-y: scroll;
  background-color: #fff;
}
.article-container .article-detail .article-title {
  font-size: 18px;
  padding: 50px 32px;
  margin: 0;
  color: #3a3a3a;
}
.article-container .article-detail .user-info {
  padding: 0 32px;
}
.article-container .article-detail .avatar {
  width: 70px;
  height: 70px;
  margin-right: 17px;
}
.article-container .article-detail .van-cell__label {
  margin-top: 0;
}
.article-container .article-detail .user-name {
  font-size: 14px;
  color: #3a3a3a;
}
.publish-date {
  font-size: 14px;
  color: #b7b7b7;
}
.follow-btn {
  width: 130px;
  height: 58px;
}
.article-content {
  padding: 20px 20px;
  font-size: 16px;
}
.article-content p {
  text-align: justify;
}
.loading-wrap {
  padding: 200px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.error-wrap {
  padding: 200px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.van-icon {
  font-size: 60px;
  color: #b4b4b4;
}
.text {
  font-size: 20px;
  color: #666666;
  margin: 33px 0 46px;
}
.retry-btn {
  width: 280px;
  height: 70px;
  line-height: 70px;
  border: 1px solid #c3c3c3;
  font-size: 20px;
  color: #666666;
}
.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 88px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
}
.comment-btn {
  width: 182px;
  height: 46px;
  border: 2px solid #eeeeee;
  font-size: 16px;
  line-height: 46px;
  color: #a7a7a7;
}
.van-icon {
  font-size: 20px;
}
.van-info {
  font-size: 16px;
  background-color: #e22829;
}
</style>