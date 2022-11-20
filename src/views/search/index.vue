<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="srarchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 历史记录 -->
    <SearchResult v-if="isResultShow" :search-text="srarchText"></SearchResult>
    <!-- 历史记录 -->
    <!-- 联想建议 -->

    <!-- 如果输入框有数据就显示 -->
    <SearchSugestion
      v-else-if="srarchText"
      :search-text="srarchText"
      @search="onSearch"
    ></SearchSugestion>
    <!-- 联想建议 -->

    <!-- 搜索历史记录 -->
    <SearchHistory
      v-else
      :search-histories="searchHistories"
      @clear-search-histories="onSearchHistory"
      @search="onSearch"
    ></SearchHistory>
    <!-- 搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSugestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  props: {},
  data() {
    return {
      srarchText: '',
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 历史记录数据
    }
  },
  methods: {
    onSearch(val) {
      console.log(val, 'aaa')
      this.srarchText = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
    onSearchHistory(val) {
      this.searchHistories = val
    }
  },
  watch: {
    searchHistories(value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  computed: {},
  created() {},
  mounted() {},
  components: {
    SearchHistory,
    SearchSugestion,
    SearchResult
  }
}
</script>
<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
