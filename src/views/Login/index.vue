<template>
  <div>
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <!-- @submit 是一个提交事件，当你通过校验并点击提交才触发 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="info.mobile"
        label="手机号"
        placeholder="请输入手机号"
        :rules="rules.mobile"
      />
      <van-field
        v-model="info.code"
        label="验证码"
        placeholder="请输入验证码"
        :rules="rules.code"
      />
      <div style="margin: 16px">
        <van-button
          :loading="loading"
          loading-text="加载中..."
          round
          block
          type="info"
          native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
export default {
  data() {
    return {
      loading: false,
      info: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          // 代表必填
          { required: true, message: '请填写手机号' },
          // 我要验证输入内容是不是符合手机号的格式
          { pattern: /^1[2-9]\d{9}$/, message: '请填写正确的手机号' }
        ],

        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请输入6位数字验证码' }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      // 这个后端人员设置了，如果账号密码不对直接给你一个响应报错
      // 但这不是我们代码写错了，所以咱们写代码时要try catch捕捉错误
      try {
        const res = await loginAPI(this.info)
        console.log(res)
        this.$toast.success('登录成功！')
      } catch {
        this.$toast.fail('账号或密码错误')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3196fa !important;

  // 包住文字的部分给文字颜色为白色
  .van-nav-bar__title {
    color: #fff !important;
  }
}
</style>
