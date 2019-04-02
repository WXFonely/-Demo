<template>
  <div class="detail">
    <van-tabs class="card" type="card">
      <van-tab title="宝贝">
        <img class="pic" :src='serverUrl+product.coverImg' alt="图片出错了" />
        <van-card
          :num="product.quantity"
          :price="product.price"
          :desc="product.descriptions"
          :title="product.name"
        >
        </van-card>
        <van-button type="primary" @click="addToCartHandle(product._id)">加入购物车</van-button>
      </van-tab>
      <van-tab title="详情">
        <div class="cards">
          <h4 :v-model="txt">{{txt}}</h4>
          <p :v-model="dsp">{{dsp}}</p>
          <div class="yhpj">
            <p>欢迎指数：</p>
            <van-rate v-model="value"
            icon="like"
            void-icon="like-o"
            disabled
            />
          </div>
          <img class="pic" :src='serverUrl+product.coverImg' alt="图片出错了"/>
        </div>
      </van-tab>
      <van-tab title="推荐">
        <van-card
          v-for="product in list"
          :num="product.quantity"
          :price="product.price"
          :desc="product.descriptions"
          :title="product.name"
          :thumb="serverUrl+product.coverImg"
          :key="product._id"
          :thumb-link="`#/list/${product._id}`"
        >
        </van-card>
        <van-button size="large" @click="loadMore">加载更多</van-button>
      </van-tab>
    </van-tabs>

  </div>
</template>
<script>
import { getProductDetail } from '../services/products'
import { addToShopCart } from '../services/users'
import { serverUrl } from '../utils/config'
import { getProducts } from '../services/products'
import { Button } from 'vant';
import Vue from 'vue'
import { Rate } from 'vant';

Vue.use(Rate)
Vue.use(Button);

export default {
  data() {
    return {
      product: {},
      serverUrl,
      Button,
      txt:'',
      dsp:'',
      list:[],
      page:1,
      value: 4
    }
  },
  created() {
    getProductDetail(this.$route.params.id)
      .then(res => {
        this.product = res.data;
        this.txt=this.product.name;
        this.dsp=this.product.descriptions;
      })
      .catch(err => {
        console.log(err)
      }),
      this.loadData();
  },
  methods:{
     addToCartHandle(id) {
       var _this=this
      addToShopCart(id, 1,_this)
      this.$eventBus.$emit('navToZX', 'ShopCart')
      this.$router.push({
        name: 'ShopCart',
      })
    },
    loadData(){
      getProducts({ page: this.page })
      .then(res => {
        this.list = this.list.concat(res.data.products)
      })
      .catch(err => {
        console.log(err)
      })
    },
    loadMore(){
      this.page+=1;
      this.loadData();
    }
  }
}
</script>
<style scoped>
.detail{
  background:#fff;
}
h4,p{
  margin-top:1rem;
  margin-bottom:0;
  padding:0;
}
.pic{
  width:100%;
  box-shadow:2px 2px 2px #cecece;
  margin-top:5px;
}
.detail{
  padding-bottom:55px;
}
.card{
  box-shadow:2px 2px 2px #cecece;
}
.van-button{
  width:100%;
}
.van-tabs__nav .van-tabs__nav--card{
  margin:0 !important;
}
.cards{
  background:#fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
  padding:0 1rem;
}
.yhpj{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
}
.yhpj p{
  color:red;
  margin-bottom:0.6rem;
}
</style>

