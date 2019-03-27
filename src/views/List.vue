<template>
  <div class="list">
    <van-card
      v-for="product in products"
      :num="product.quantity"
      :price="product.price"
      :desc="product.descriptions"
      :title="product.name"
      :thumb="serverUrl+product.coverImg"
      :key="product._id"
      :thumb-link="`#/list/${product._id}`"
    >
    <div slot="footer">
      <van-button size="mini" @click="addToCartHandle(product._id)"><van-icon class="btn-cart" name="cart" /></van-button>
    </div>
    </van-card>
    <van-button size="large" @click="loadMore">加载更多</van-button>
  </div>
</template>
<script>

import { getProducts } from '../services/products'
import { addToShopCart } from '../services/users'
import { serverUrl } from '../utils/config'
import { get } from 'axios'
export default {
  data() {
    return {
      products:[],
       page: 1,
       serverUrl,
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    addToCartHandle(id) {
      // alert(id)
      addToShopCart(id, 1)
      this.$eventBus.$emit('addToShopCartEnd');
    },
    loadMore() {
      this.page += 1
      this.loadData()
    },
    loadData() {
      // get(`${serverUrl}/api/v1/products?page=${this.page}`)
      getProducts({ page: this.page })
      .then(res => {
        // console.log(res)
        // 拼接服务器端的数据 使用数组的concat方法实现
        this.products = this.products.concat(res.data.products)
        this.pageCount = res.data.pages
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
.list {
  padding-bottom: 60px;
}
.btn-cart{
  color: deeppink;
  font-size: 1.2rem;
}
</style>


