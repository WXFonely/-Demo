<template>
  <div class="home">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(img, index) in images" :key="index">
        <img class="swipe-img" :src="img"/>
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar
      text="4.17发布会上将锤子ROM的三个特色概括为：“漂亮、细节规划、人性化的功用”。 [3]  锤子ROM追求规划和个人体验，而且寻求超越苹果的操作和外观。"
      left-icon="volume-o"
    />
  <van-nav-bar class="top1">
    <span>热销商品</span>
    <van-icon class-prefix="my-icon" name="arrow" />
  </van-nav-bar>

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
      <van-button size="mini" class="tj">特惠</van-button>
      <van-button size="mini" class="yh">特惠</van-button>
      <van-button size="mini" @click="addToCartHandle(product._id)" class="car"><van-icon class="btn-cart" name="cart" /></van-button>
    </div>
    </van-card>
    <van-button size="large" @click="loadMore">加载更多</van-button>
  </div>
</template>

<script>
// @ is an alias to /src

import { images } from '../data'
import { getProducts } from '../services/products'
import { addToShopCart } from '../services/users'
import { serverUrl } from '../utils/config'


export default {
   name: 'home',
  data() {
    return {
      images,
      products: [],
      page: 1,
      pageCount: 1,
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
.swipe-img {
  width: 100%;
}
.tj{
  background: blue;
  color: #fff
}
.yh{
  background: pink;
}


.list {
  padding-bottom: 60px;
}
.btn-cart{
  color: deeppink;
  font-size: 1.2rem;
}
.nav{background:#ccc;
      color:#fff;
}
#car{

}
.top1{
  border-bottom:1px solid #ccc; 
  background:#ccc;
}
</style>

