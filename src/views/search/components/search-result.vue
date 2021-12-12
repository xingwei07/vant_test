<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { List, Cell } from 'vant'
import { getSearchResult } from '@/modules/index'

export default {
  name: 'Search-Result',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  components: {
    [List.name]: List,
    [Cell.name]: Cell
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      pageSize: 10,
      pageNum: 1
    };
  },
  methods: {
    async onLoad () {
      try {
        // 异步获取数据
        const { data } = await getSearchResult({
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          searchText: this.searchText
        })
        if (data.status) {
          this.list.push(...data.data)
          this.pageNum++
          this.loading = false
          this.finished = false
        } else {
          this.loading = false
          this.finished = true
        }
      } catch (error) {
        this.loading = false
        this.finished = true
      }
    },
  },
}
</script>

<style>
</style>