<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :searchText="searchText" />
    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    />
    <!-- 搜索历史 -->
    <SearchHistory
      v-else
      :searchHistories="searchHistories"
      @onSearch="onSearch"
    />
  </div>
</template>

<script>
import { Search } from 'vant'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'Search',
  components: {
    [Search.name]: Search,
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_HISTORY') || [] // 搜索历史记录
    }
  },
  watch: {
    searchHistories (newValue) {
      setItem('TOUTIAO_HISTORY', newValue)
    }
  },
  methods: {
    onSearch (text) {
      const index = this.searchHistories.indexOf(text)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(text)

      this.searchText = text
      this.isResultShow = true
    },
    onCancel () {
      console.log('cancel')
      this.isResultShow = false
      this.$router.back()
    }
  }
}
</script>

<style>
.search-container {
  padding-top: 50px;
}
.search-container .van-search__action {
  color: blue;
}
.search-container .search-form {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>