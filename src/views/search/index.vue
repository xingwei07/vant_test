<template>
  <div class="search-container">
    <form action="/">
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
    <SearchResult v-if="isResultShow" />
    <!-- 联想建议 -->
    <SearchSuggestion v-else-if="searchText" :searchText="searchText" />
    <!-- 搜索历史 -->
    <SearchHistory v-else />
  </div>
</template>

<script>
import { Search } from 'vant'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'

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
      isResultShow: false
    }
  },
  methods: {
    onSearch () {
      this.isResultShow = true
    },
    onCancel () {
      console.log('cancel')
      this.isResultShow = false
    }
  }
}
</script>

<style>
.search-container .van-search__action {
  color: blue;
}
</style>