<template>
  <div>
    <van-cell
      class="article-item"
      :to="{
        name: 'Article',
        params: {
          articleId: article.id
        }
      }"
    >
      <template #title>
        <span class="title van-multi-ellipsis--l2">
          {{ article.title }}
          吉特任务特区法第三部分年度特人违反收费低功耗法吉特如果是
        </span>
      </template>
      <template #label>
        <div v-if="article.type === 3" class="cover-wrap">
          <div v-for="(image, index) in article.images" :key="index">
            <van-image width="100" height="100" :src="image"></van-image>
          </div>
        </div>
        <span>{{ article.aut_name }}</span
        >&nbsp;&nbsp; <span>{{ article.comm_count }}</span
        >&nbsp;&nbsp;
        <span>{{ pubdate }}</span>
      </template>
      <template #right-icon v-if="article.type === 1">
        <van-image
          width="100"
          height="100"
          :src="article.images[0]"
        ></van-image>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { Cell, Image } from 'vant'
import dayjs from '@/utils/day.js'

export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  components: {
    [Cell.name]: Cell,
    [Image.name]: Image
  },
  computed: {
    pubdate () {
      return dayjs().to(dayjs(this.article.pubdate))
    }
  }
}
</script>

<style>
.article-item {
  min-height: 100px;
}
.article-item .title {
  font-size: 20px;
  color: #3a3a3a;
}
.article-item .van-cell__value {
  flex: unset;
  width: 232px;
  height: 146px;
  padding-left: 25px;
}
.article-item .right-cover {
  width: 132px;
  height: 146px;
}
.article-item .label-info-wrap span {
  font-size: 14px;
  counter-reset: #b4b4b4;
  margin-right: 25px;
}
.article-item .cover-wrap {
  display: flex;
  justify-content: space-between;
}
.article-item .cover-wrap .cover-item {
  /* 平分宽度 */
  flex: 1;
}
</style>