<template>
<div>
  <div class="cart-box" v-if="shopCart.length">
      <div class="cart-top">
         <input class="quanx" type="checkbox"   @click="checkAll()" v-model="checkall">
         <span>全选</span>
      </div>
      <div class="card" v-for="(item,index) in list" :key="index">
          <dl>
            <dt>
              <input class="danx" type="checkbox"  v-model="checkeds" :value="item._id">
              <img :src='serverUrl+item.coverImg'/>
            </dt>
            <dd>
                <p>{{item.name}}</p>
                <p>{{item.descriptions}}</p>
                <p>￥{{item.price}}</p>
                <div class="sl">
                  数量：
                  <button @click="handleReduce(index)">-</button>
                   <span>{{item.num}}</span>
                  <button @click="handleAdd(index)">+</button>
                </div>
                <button class="dela" @click="handleRemove(index)">移除</button>
            </dd>
          </dl>
      </div>
      <div class="zj">
        <div>共<span>{{ count }}</span>件商品</div>
        <div>总金额：<span>￥{{total}}元</span></div>
      </div>
  </div>
  <div v-else>购物车为空</div>
  </div>
</template>
<script>
import { getShopCart } from "../services/users";
import { getProductDetail } from "../services/products";
import { serverUrl } from '../utils/config'
export default {
   data() {
    return {
      shopCart: [],
      list: [],
      serverUrl,
      checkall: false,
      checkeds: [],
    };
  },
  created() {
    this.shopCart = getShopCart();
    for (let i = 0; i < this.shopCart.length; i++) {
      getProductDetail(this.shopCart[i].product)
        .then(res => {
          res.data.num = this.shopCart[i].quantity;
          this.list = this.list.concat(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    count: function() {
      var num = 0;
      for (var i in this.list) {
        num += parseInt(this.list[i].num);
      }
      return num;
    },
    total: function() {
      var total = 0;
      for (var i in this.list) {
        total += this.list[i].price * this.list[i].num;
      }
      return total;
    }
  },
  methods: {
    handleReduce: function(index) {
      if (this.list[index].num == 1) {
        return;
      } else {
        this.list[index].num--;
      }
    },
    handleAdd: function(index) {
      this.list[index].num++;
    },
    handleRemove: function(index) {
      this.list.splice(index, 1);
    },
    checkAll:function() {
      var _this = this;
      if (this.checkall) {
        // 实现反选
        this.checkeds = [];
      } else {
        // 实现全选
        this.checkeds = [];
        this.list.forEach(function(item) {
          _this.checkeds.push(item._id);
        });
      }
      if (this.checkeds.length === this.list.length) {
        this.checkall = true;
      }else{
        this.checkall = false;
      }
    },
  }
}
</script>
<style scoped>
*{
  padding:0;
  margin:0;
  color:#222020dc;
}
.cart-top{
  display: flex;
  align-items: center;
  justify-content: left;
  align-self: flex-start;
}
.quanx{
  margin: 0 0.3rem;
}
.card{
  margin-bottom:0.5rem;
  background:#fff;
  width:100%;
}
dl{
  display: flex;
  align-items: center;
  padding:0.4rem 0;
  width:100%;
}
dt{
  width:40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
dd{
  width:60%;
  flex-direction: column;
  display: flex;
  align-items: left;
  font-size:12px;
  padding:0 0.5rem;
}
img{
  width:80%;
  height:80%;
  background-size:cover;
}
.cart-box{
  padding-bottom:60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
}
p{
  margin-top:0.5rem;
}
.dela{
  margin-top:0.5rem;
  width:20%;
  border:0;
  background:rgb(236, 63, 97);
  color:#fff;
}
.sl{
  margin-top:0.5rem;
}
.sl button{
  border:0;
}
.sl button,.sl span{
  display:inline-block;
  width:10%;
  height:10%;
  text-align:center;
  vertical-align: middle;
}
.zj{
  align-self: flex-start;
  display: flex;
  align-items: center;
  background:#fff;
  width:100%;
  padding:1rem 0;
}
.zj span{
  color:crimson;
}
</style>
