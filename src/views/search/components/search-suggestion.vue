<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in Suggestion"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <!-- 替换输入字符高亮 -->
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  name: 'SearchSugestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      Suggestion: []
    }
  },
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestionAPI(q)
        console.log(data)
        this.Suggestion = data.data.options
      } catch (err) {
        this.$toast('数据处理失败')
      }
    },

    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      // console.log(text, this.searchText, '11111')
      return text.replace(reg, highlightStr)
    }
  },
  watch: {
    searchText: {
      // handler(value) {
      //   console.log(value, '输入框内容')
      //   this.loadSearchSuggestion(value)
      // },
      handler: debounce(function (value) {
        console.log(value)
        this.loadSearchSuggestion(value)
      }, 500),
      immediate: true
    }
  },
  computed: {},
  created() {},
  mounted() {},
  components: {}
}
</script>
<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
