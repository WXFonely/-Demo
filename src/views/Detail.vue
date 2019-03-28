<template>
  <div class="list">
    <h1>我是详情页</h1>
    <p>{{this.product.name}}</p>
    <router-link :to="{ name: 'Home' }">【首页】</router-link>
    <router-link :to="{ name: 'ShopCart' }">【购物车】</router-link>
    <router-link :to="{ name: 'List' }">【列表页】</router-link>
  </div>
</template>
<script>
import { getProductDetail } from '../services/products'
import { serverUrl } from '../utils/config'
export default {
  data() {
    return {
      product: {},
    }
  },
  created() {
    getProductDetail(this.$route.params.id)
      .then(res => {
        this.product = res.data;
      })
      .catch(err => {

      })
  }
}
</script>

