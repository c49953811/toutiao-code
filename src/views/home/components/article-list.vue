<template>
  <div class="article-list">
    <van-pull-refresh
      :success-text="resText"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      resText: '刷新成功'
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        // 模拟请求失败
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsaaga')
        // }
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id,
          timestamp: this.timestamp
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false
        this.resText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.resText = '刷新失败'
        this.isLoading = false
      }
    }
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  components: {
    ArticleItem
  }
}
</script>
<style lang="less" scoped>
.article-list {
  //父元素没有固定高度，也不方便设置高度时候，用VH Vm做单位
  height: 79vh;
  overflow-y: auto;
}
</style>
