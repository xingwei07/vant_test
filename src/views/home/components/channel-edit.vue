<template>
  <div class="channel-edit">
    <van-cell>
      <template #title>
        <span class="title-text">我的频道</span>
      </template>
      <van-button type="danger" size="mini" plain round class="edit-btn"
        >编辑</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        icon="clear"
        text="文字"
        class="grid-item"
      >
      </van-grid-item>
    </van-grid>
    <van-cell>
      <template #title>
        <span class="title-text">频道推荐</span>
      </template>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        icon="plus"
        text="文字"
        class="grid-item"
      />
    </van-grid>
  </div>
</template>

<script>
import { Cell, Button, Grid, GridItem, Icon } from "vant";
export default {
  name: "ChannelEdit",
  components: {
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Icon.name]: Icon,
  },
};
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
  font-size: 16px;
  color: #222;
}
.channel-edit .recommend-grid .van-grid-item__content--center {
  flex-direction: row; /* 水平排列 */
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
</style>