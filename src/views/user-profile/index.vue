<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="个人信息"
      @click-left="$router.back()"
    />
    <!-- 导航栏 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdataNameShow = true"
    />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdataGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    />
    <!-- 个人信息 -->

    <!-- 编辑昵称 -->
    <van-popup
      v-model="isUpdataNameShow"
      style="height: 100%"
      position="bottom"
    >
      <updata-name
        v-if="isUpdataNameShow"
        @close="isUpdataNameShow = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- 编辑昵称 -->
    <!-- 编辑性别 -->
    <van-popup v-model="isUpdataGenderShow" position="bottom">
      <updata-gender
        v-if="isUpdataGenderShow"
        v-model="user.gender"
        @close="isUpdataGenderShow = false"
      />
    </van-popup>
    <!-- 编辑性别  -->
    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <update-birthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      />
    </van-popup>
    <!-- /编辑生日 -->
    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <!-- <update-photo
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      /> -->
      <update-photo
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserProfileAPI } from '@/api'
import UpdataName from './components/updata-name'
import UpdataGender from './components/updata-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/updata-photo'
export default {
  name: 'UserProfile',
  props: {},
  data() {
    return {
      user: {}, // 用户个人信息
      isUpdataNameShow: false,
      isUpdataGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null // 预览的图片
    }
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfileAPI()
        console.log(data)
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]

      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)
      console.log(this.img)
      // 展示预览图片弹出层
      this.isUpdatePhotoShow = true
      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      this.$refs.file.value = ''
    }
  },
  watch: {},
  computed: {},
  created() {
    this.loadUserProfile()
  },
  mounted() {},
  components: {
    UpdataName,
    UpdataGender,
    UpdateBirthday,
    UpdatePhoto
  }
}
</script>
<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 68px;
    height: 68px;
  }

  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
