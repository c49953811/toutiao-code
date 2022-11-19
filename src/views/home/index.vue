<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        class="search-btn"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs class="channel-tabs" v-model="activeName" animated swipeable>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 自定义组件列表 -->
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>
      <!-- 图标 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
import ArticleList from './components/article-list.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  props: {},
  data() {
    return {
      activeName: 0,
      channels: []
    }
  },
  methods: {
    async loadChannels() {
      try {
        let channels = []
        // 如果已登陆
        if (this.user) {
          const { data } = await getAllChannelsAPI()
          channels = data.data.channels
        } else {
          // 未登陆先判定是都有本地频道数据

          const localChannels = getItem('TOUTIAO_CHANNELS')
          // 有，拿来使用
          if (localChannels) {
            channels = localChannels
          } else {
            // 没有，请求获取默认频道列表
            const { data } = await getAllChannelsAPI()
            channels = data.data.channels
          }
        }

        this.channels = channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    }
  },
  watch: {},
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadChannels()
  },
  mounted() {},
  components: {
    ArticleList
  }
}
</script>
<style lang="less" scoped>
.home-container {
  padding-top: 173px;
  padding-bottom: 100px;
  ::v-deep .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

  ::v-deep .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
  .van-tabs {
    ::v-deep .van-tabs__nav {
      margin-right: 36px;
    }

    .icon-box {
      position: absolute;
      right: 0;
      top: 0;
      background-color: #fff;
      .van-icon {
        font-size: 36px;
      }
    }
  }
}
</style>
