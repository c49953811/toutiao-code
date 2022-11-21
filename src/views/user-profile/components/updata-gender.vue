<template>
  <div>
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { setUserProfileAPI } from '@/api'
export default {
  name: 'UpdataGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
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
        const localGender = this.localGender

        await setUserProfileAPI({
          gender: localGender
        })
        this.$emit('input', localGender)
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast('修改失败')
      }
    },
    onPickerChange(picker, value, index) {
      this.localGender = index
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
