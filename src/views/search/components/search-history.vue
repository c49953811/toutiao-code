<template>
  <div>
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="allDetele">全部删除</span>
        &nbsp; &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else @click="isDeleteShow = true" name="delete" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistorList"
      :key="index"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon v-if="isDeleteShow" name="close"> </van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      searchHistorList: this.searchHistories,
      isDeleteShow: false
    }
  },
  methods: {
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        // 删除状态
        this.searchHistorList.splice(index, 1)
        this.$emit('clear-search-histories', this.searchHistorList)
      } else {
        // 非删除状态，搜索
        this.$emit('search', item)
      }
    },
    allDetele() {
      this.searchHistorList = []
      this.$emit('clear-search-histories', [])
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
