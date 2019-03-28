<template>
  <div class="shopCart">
    <div v-if="shopCart.length">
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox"   @click="checkAll()" v-model="checkall">
            </th>
            <th>商品名称</th>
            <th>单价</th>
            <th>购买数量</th>
            <th>合计</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(goods,index) in list" :key="index">
            <td>
              <input type="checkbox"  v-model="checkeds" :value="goods._id">
            </td>
            <td>{{ goods.name }}</td>
            <td>{{ goods.price }}</td>
            <td>
              <button @click="handleReduce(index)">-</button>
              {{goods.num}}
              <button @click="handleAdd(index)">+</button>
            </td>
            <td>{{ goods.price * goods.num}}</td>
            <td><button @click="handleRemove(index)">移除</button></td>
          </tr>
        </tbody>
      </table>
      <div>共{{ count }}件商品 购物车总金额：￥{{total}}元</div>
    </div>
    <div v-else>购物车为空</div>
  </div>
</template>
<script>
import { getShopCart } from "../services/users";
import { getProductDetail } from "../services/products";
export default {
  data() {
    return {
      shopCart: [],
      list: [],
      checkall: false,
      checkeds: []
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
      var _this=this
      if (this.list[index].num == 0) {
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
};
</script>

