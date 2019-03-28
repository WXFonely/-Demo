<template>
  <div class="list">
    <van-nav-bar title="登录官网" class="nav">
    </van-nav-bar>
    <van-cell-group>
      <van-field v-model="userName" placeholder="请输入用户名" />
      <van-field v-model="password" type="password" placeholder="请输入密码" />
    </van-cell-group>
    <div>
      <van-checkbox class="autoLogin" v-model="checked">自动登录</van-checkbox>
    </div>
    <router-link class="regist" :to="{name: 'Reg'}">忘记密码</router-link>
    <router-link class="regist" :to="{name: 'Reg'}">注册</router-link>
    
    <van-button @click="loginHandle" class="btn-login" type="info" size="large">登录</van-button>
  </div>
</template>
<script>
import { loginIn } from '../utils/auth'
import { post } from 'axios'
export default {
  data() {
    return {
      userName: "",
      password: "",
      checked: true,
    }
  },
  methods: {
    loginHandle() {
      post('http://api.cat-shop.penkuoer.com/api/v1/auth/login', {
        userName: this.userName,
        password: this.password
      })
        .then(res => {
          console.log(res)
          if(res.data.code =='success'){
            loginIn(res.data.token)
            console.log(JSON.parse(res.config.data))
            this.$router.push({name:'UserCenter'})
          }else{
            alert('用户名或密码不正确')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>
<style>
.btn-login {
  margin: 0.5rem 0;
}
.nav{
  background:#ccc;
}
.regist{
  color: #999;
  float: right;
  margin-right: 0.5rem;
  margin: 0.8rem;
}
.autoLogin{
  float: left;
  margin: 0.8rem;
  color: #999 !important;
}
</style>


