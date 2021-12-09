<template>
  <div class="channel-edit">
    <van-cell>
      <template #title>
        <span class="title-text">我的频道</span>
      </template>
      <template #default>
        <van-button type="danger" size="mini" plain round class="edit-btn"
          >编辑</van-button
        >
      </template>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(channel, index) in myChannels"
        :key="channel.id"
        icon="clear"
        class="grid-item"
      >
        <span class="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell>
      <template #title>
        <span class="title-text">频道推荐</span>
      </template>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        v-for="channel in channels"
        :key="channel.id"
        icon="plus"
        :text="channel.name"
        class="grid-item"
      />
    </van-grid>
  </div>
</template>

<script>
import { Cell, Button, Grid, GridItem, Icon } from 'vant'
import { getUserChannels } from '@/modules/index'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  components: {
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Icon.name]: Icon,
  },
  data () {
    return {
      allChannels: [] //所有频道
    }
  },
  mounted () {
    this.getAllChannels()
  },
  computed: {
    //推荐频道
    channels () {
      const channels = []
      this.allChannels.forEach(channel => {
        let i = 0
        const result = this.myChannels.find(myChannel => {
          console.log(++i)
          return channel.id === myChannel.id
        })
        if (!result) {
          channels.push(channel)
        }
      })
      return channels
    }
  },
  methods: {
    // 获取所有频道列表
    async getAllChannels () {
      const { data } = await getUserChannels()
      this.allChannels.push(...data.data[0].userChannels)
    }
  }
}
</script>

<style>
.channel-edit {
  padding: 85px 0;
}
.channel-edit .title-text {
  font-size: 20px;
  color: #333;
}
.channel-edit .edit-btn {
  width: 85px;
  height: 38px;
  font-size: 16px;
}
.channel-edit .grid-item {
  width: 86px;
  height: 66px;
  background-color: #f4f5f6;
}
.channel-edit .van-grid-item__text {
  margin-top: 0;
  font-size: 14px;
  color: #222;
  white-space: nowrap; /* 禁止换行 */
}
.channel-edit .recommend-grid .van-grid-item__content--center {
  flex-direction: row; /* 水平排列 */
  white-space: nowrap; /* 禁止换行 */
}
.channel-edit .recommend-grid .van-icon {
  font-size: 16px;
  margin-right: 5px;
}
.channel-edit .my-grid .van-icon-clear {
  position: absolute; /* 绝对定位 */
  right: -5px;
  top: -5px;
  font-size: 17px;
  color: #cacaca;
  z-index: 2;
}
.channel-edit .my-grid .text {
  font-size: 14px;
}
.channel-edit .my-grid .active {
  color: red;
}
</style>