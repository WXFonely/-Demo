<template>
  <div class="list">
    <van-cell-group>
      <van-field v-model="userName" placeholder="请输入用户名" />
      <van-field v-model="password" type="password" placeholder="请输入密码" />
    </van-cell-group>
    <router-link :to="{name: 'Reg'}">注册</router-link>
    <van-button @click="loginHandle" class="btn-login" type="info" size="large">登录</van-button>
  </div>
</template>
<script>
import { loginIn } from '../utils/auth'
import { post } from 'axios'

export default {
  data() {
    return {
      userName: '',
      password: '',
    }
  },
  methods: {
    loginHandle() {
      post('http://localhost:3000/api/v1/auth/login', {
        userName: this.userName,
        password: this.password
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      // loginIn()
      // this.$eventBus.$emit('navToZX', 'UserCenter')
      // // this.$router表示路由对象,可以在其上执行路由跳转方法
      // //  编程方式实现跳转,通过.push一个路由对象实现
      // // 当登录成功之后跳回个人中心
      // this.$router.push({
      //   name: 'UserCenter'
      // })
    }
  }
}
</script>
<style>
.btn-login {
  margin: 0.5rem 0;
}
</style>


