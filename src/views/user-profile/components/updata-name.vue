<template>
  <div class="updata-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { setUserProfileAPI } from '@/api'
export default {
  name: 'UpdataName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await setUserProfileAPI({
          name: localName
        })
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast('修改失败')
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
<style lang="less" scoped>
.field-wrap {
  padding: 20px;
}
</style>
