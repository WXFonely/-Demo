<template>
  <div class="list">
    <router-link :to="{ name: 'Home' }">【首页】</router-link>
    <router-link :to="{ name: 'ShopCart' }">【购物车】</router-link>
    <router-link :to="{ name: 'Orders' }">【我的订单】</router-link>
    <a>【收货地址管理】</a>
    <a>【修改密码】</a>
    <a>【修改个人信息】</a>
    <a>【我的优惠券】</a>
    <a>【我的钱包】</a>
    <a>【银行卡管理】</a>
    <br>
    <button @click="logOutHandle">退出</button>
  </div>
</template>
<script>
import { logOut } from '../utils/auth'
export default {
  methods: {
    logOutHandle() {
      logOut()
      // 派发跳转事件 控制底部导航栏选中效果
      this.$eventBus.$emit('navToZX', 'Home')
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>

