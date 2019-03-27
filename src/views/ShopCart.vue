<template>
  <div class="list">
    <h1>我的购物车</h1>
    <ul>
      <li v-for="s in shopCart" :key="s.product">{{s.product}}-{{s.quantity}}</li>
    </ul>
    <router-link :to="{ name: 'Home' }">【首页】</router-link>
    <router-link :to="{ name: 'Detail', params: { id: 1 } }">【详情】</router-link>
    <router-link :to="{ name: 'UserCenter' }">【个人中心】</router-link>
  </div>
</template>
<script>
import { getShopCart } from '../services/users'

export default {
  data() {
    return {
      shopCart: []
    }
  },
  created() {
    this.shopCart = getShopCart()
  }  
}
</script>

