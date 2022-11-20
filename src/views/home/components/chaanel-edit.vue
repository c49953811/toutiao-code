<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannelsList"
        :key="index"
        @click="onMychannelClick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fiexChannels.includes(channel.id)"
        ></van-icon>
        <span class="text" :class="{ active: index === active }" slot="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(channel, index) in recommendChannles"
        :key="index"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChanneAPI, addUserChannelAPI, deleteUserChannelAPI } from '@/api'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      allChannels: [],
      myChannelsList: this.myChannels,
      isEdit: false,
      fiexChannels: [0] // 固定频道
    }
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChanneAPI()
        console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('请求失败')
      }
    },
    async onAddChannel(channel) {
      this.myChannelsList.push(channel)
      // 数据持久化
      if (this.user) {
        try {
          // 已登录把数据请求接口放线上
          const { data } = await addUserChannelAPI({
            id: channel.id,
            seq: this.myChannelsList.length
          })
          console.log(data)
        } catch (err) {
          this.$toast('保存失败')
        }
      } else {
        // 未登录把数据存储在本地
        setItem('TOUTIAO_CHANNELS', this.myChannelsList)
      }
    },
    onMychannelClick(channel, index) {
      if (this.isEdit) {
        // 如果是固定频道，不删除
        if (this.fiexChannels.includes(channel.id)) {
          return
        }
        // 如果编辑状态，执行删除频道
        if (index <= this.active) {
          this.$emit('updata-active', this.active - 1, true)
        }
        // 处理持久化
        this.deleteChannel(channel)
        this.myChannelsList.splice(index, 1)
      } else {
        // 如果非编辑，直接切换频道
        this.$emit('updata-active', index, false)
      }
    },
    async deleteChannel(channel) {
      try {
        if (this.user) {
          // 已登录则更新到线上
          await deleteUserChannelAPI(channel.id)
        } else {
          // 未登录，更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannelsList)
        }
      } catch (err) {
        this.$toast('保存失败')
      }
    }
  },
  watch: {},
  computed: {
    // 原始理解方法
    // recommendChannles() {
    //   const channels = []
    //   this.allChannels.forEach((channel) => {
    //     // 遍历找到满足条件的
    //     const ret = this.myChannels.find((myChannel) => {
    //       return myChannel.id === channel.id
    //     })
    //     // 如果我的频道不包含该频道，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   return channels
    // }
    // 极简
    recommendChannles() {
      return this.allChannels.filter((channel) => {
        return !this.myChannelsList.find((myChannel) => {
          return myChannel.id === channel.id
        })
      })
    },
    ...mapState(['user'])
  },
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  components: {}
}
</script>
<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 24px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
