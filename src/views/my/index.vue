<template>
  <div class="My-container">
    <!-- 未登录 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 已登陆 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" alt="" />
        <span class="text">登陆/注册</span>
      </div>
    </div>
    <!--  -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- tongzhi -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" class="md9" is-link />
    <van-cell
      v-if="user"
      title="退出登陆"
      class="lgout-cell"
      clickable
      @click="onlogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfoAPI } from '@/api'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {}
    }
  },
  watch: {},
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onlogout() {
      // 退出提示
      this.$dialog
        .confirm({
          title: '确认退出'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('no')
        })
      // 清除登陆状态
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfoAPI()
        console.log(data)
        this.userInfo = data.data
      } catch (err) {
        console.log(err)
        this.$toast('获取数据失败')
      }
    }
  },
  created() {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.My-container {
  .header {
    height: 361px;
    background: url('@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 1px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      // height: 130px;
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 144px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9b1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .lgout-cell {
    text-align: center;
    color: #d86262;
  }
  .md9 {
    margin-top: 9px;
  }
}
</style>
