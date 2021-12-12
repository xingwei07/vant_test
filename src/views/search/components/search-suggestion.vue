<template>
  <div>
    <van-cell
      v-for="(text, index) in suggestion"
      :key="index"
      icon="search"
      @click="onSearch(text.title)"
    >
      <template #title>
        <span v-html="highLight(text.title)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { Cell } from 'vant'
import { debounce } from 'debounce'
import { getSuggestion } from '@/modules/index'

export default {
  name: 'SearchSuggestion',
  components: {
    [Cell.name]: Cell
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestion: []
    }
  },
  watch: {
    searchText: {
      immediate: true, //加载后立即执行监视
      handler (newValue) {
        this.loadSuccestion(newValue)
      }
    }
  },
  methods: {
    loadSuccestion: debounce(async function (newValue) {
      this.suggestion = []
      const params = {
        title: newValue
      }
      // 查询联想建议
      const { data } = await getSuggestion(params)
      this.suggestion.push(...data.data)
    }, 3000),
    highLight (title) {
      const hightStr = `<span style="color:red;">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, "gi") // 匹配this.searchText
      return title.replace(reg, hightStr)
    },
    onSearch (searchText) {
      this.$emit('search', searchText)
    }
  }
}
</script>

<style>
</style>