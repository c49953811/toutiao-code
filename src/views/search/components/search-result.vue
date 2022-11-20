<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1,
      perPage: 10
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResultAPI({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        // console.log(data)
        // 模拟请求失败
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsaaga')
        // }
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
        this.$toast('数据获取失败')
      }
    }
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  components: {}
}
</script>
<style lang="less" scoped></style>
