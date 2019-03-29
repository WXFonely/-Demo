<template>
  <div class="list">
   <van-cell-group>
      <van-field v-model="nickName" placeholder="请输入昵称" />
      <van-field v-model="userName" placeholder="请输入用户名" />
      <van-field v-model="password" type="password" placeholder="请输入密码" />
      <van-field v-model="repassword" type="password" placeholder="请再次输入密码" />
    </van-cell-group>
    <van-button @click="regHandle" class="btn-login" type="info" size="large">注册</van-button>
  </div>
</template>
<script>
import { reg } from '../services/users'
import { loginIn } from '../utils/auth'
export default {
  data() {
    return {
      userName: '',
      password: '',
      repassword: '',
      nickName:'',
      avator:''
    }
  },
  methods: {
    async regHandle() {
      if (!this.userName || !this.password) {
        alert('请输入账号和密码')
        return
      }
      if (this.password != this.repassword) {
        alert('两次输入的密码不一致')
        return
      }
      const result = await reg({
        userName: this.userName,
        password: this.password,
        nickName: this.nickName,
        avator: this.avator
      })
      if (result.data.code == "success") {
        loginIn(result.data.token) // 写token到本地
        // 页面跳转
        this.$router.push({
          name: 'login'
        })
      } else {
        alert('注册失败！该用户名已被占用')
      }
    }
  }
}
</script>

